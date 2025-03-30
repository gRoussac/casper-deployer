import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Subscription } from 'rxjs';
import { ResultService } from '../result/result.service';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { StorageService } from '@casper-util/storage';
import { PublicKey } from 'casper-rust-wasm-sdk';

type NamedKeysType = { [key: string]: string };

@Component({
  selector: 'casper-deployer-query-global-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-global-state.component.html',
  styleUrls: ['./query-global-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryGlobalStateComponent implements AfterViewInit, OnDestroy {
  apiUrl?: string;
  stateRootHash?: string;
  activePublicKey?: string;
  status? = '';
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('keyElt') keyElt!: ElementRef;
  @ViewChild('pathElt') pathElt!: ElementRef;
  @ViewChild('selectKeyElt') selectKeyElt!: ElementRef;
  options: string[] = [''];

  private getStateSubscription!: Subscription;
  private getBlockStateSubscription!: Subscription;
  private _hasPrevious!: boolean;

  // TODO Extract share regex
  private readonly key_regex = /[a-z-]+-([a-z0-9]{64})/;
  private readonly exclude_regex = /contract-(wasm|package-wasm)-?[a-z0-9]+/;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    private readonly storageService: StorageService,
  ) {}

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        state.apiUrl && (this.apiUrl = state.apiUrl);
        if (state.status !== undefined) {
          this.status = state.status;
        }
        if (state.user?.activePublicKey) {
          this.activePublicKey = state.user.activePublicKey;
        }
        if (state.stateRootHash) {
          this.stateRootHash = state.stateRootHash;
          const key = this.keyElt.nativeElement.value;
          if (key) {
            const no_result = true;
            this.getBlockState(no_result);
          }
        }
        if (state.key) {
          this.keyElt.nativeElement.value = state.key;
          this.onKeyChange();
        }
        // if (!state.path && !state.stateRootHash) {
        //   console.debug(state);
        //   this.pathElt.nativeElement.value = "";
        //   this.getBlockState();
        // }
        this.changeDetectorRef.markForCheck();
      });
    const key = this.storageService.get('key');
    key && (this.keyElt.nativeElement.value = key);
    const path = this.storageService.get('path');
    path && (this.pathElt.nativeElement.value = path);
    const keyOld = this.storageService.get('key-old');
    keyOld && (this._hasPrevious = true);
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getBlockStateSubscription &&
      this.getBlockStateSubscription.unsubscribe();
  }

  getBlockState(no_result?: boolean) {
    const key = this.keyElt.nativeElement.value;
    if (this.exclude_regex.test(key)) {
      return;
    }
    const newkey = key.replace(/["']/g, '').replace('contract-', 'hash-');
    newkey && (this.keyElt.nativeElement.value = newkey);
    const path = this.pathElt.nativeElement.value;
    newkey &&
      this.stateRootHash &&
      (this.getBlockStateSubscription = this.deployerService
        .getBlockState(this.stateRootHash, newkey, path, this.apiUrl)
        .subscribe(async (storedValue: object | string): Promise<void> => {
          const isString = typeof storedValue === 'string';
          if (!isString) {
            const account_keys: NamedKeysType[] | undefined = (
              storedValue as { Account?: { named_keys?: NamedKeysType[] } }
            ).Account?.named_keys;
            const contract_keys: NamedKeysType[] | undefined = (
              storedValue as { Contract?: { named_keys?: NamedKeysType[] } }
            ).Contract?.named_keys;
            const keys = account_keys || contract_keys;
            if (keys) {
              const old_key = this.pathElt.nativeElement.value;
              this.options = [old_key ? old_key : ''];
              keys.forEach((key: NamedKeysType) => {
                !old_key && this.options.push(key['name']);
                old_key && this.options.push([old_key, key['name']].join('/'));
              });
              setTimeout(() => {
                this.selectKeyElt.nativeElement.selectedIndex = 0;
              });
            } else {
              this.options = [''];
            }
            this.changeDetectorRef.markForCheck();
          }
          if (!no_result) {
            storedValue &&
              this.resultService.setResult<object>('Stored Value', storedValue);
          }
          this.getBlockStateSubscription.unsubscribe();
        }));
  }

  get isBlockStateDisabled() {
    return !this.stateRootHash || !this.keyElt?.nativeElement.value;
  }

  get hasPrevious() {
    return this._hasPrevious;
  }

  setPrevious() {
    const keyOld = this.storageService.get('key-old');
    const keyCurrent = this.storageService.get('key');
    keyOld && (this.keyElt.nativeElement.value = keyOld);
    if (keyOld && keyCurrent && keyOld !== keyCurrent) {
      this.storageService.setState({ 'key-old': keyCurrent });
      this._hasPrevious = true;
    } else {
      this.storageService.setState({ 'key-old': '' });
      this._hasPrevious = false;
    }
    keyOld && this.storageService.setState({ key: keyOld });
    this.getBlockState();
  }

  setAccountHash() {
    if (!this.activePublicKey) {
      return;
    }
    const account_hash = new PublicKey(this.activePublicKey)
      .toAccountHash()
      .toFormattedString();
    this.keyElt.nativeElement.value = account_hash;
    this.onKeyChange();
    this.getBlockState();
  }

  selectKey($event: Event) {
    const path = ($event.target as HTMLSelectElement).value;
    this.pathElt.nativeElement.value = path;
    path && this.storageService.setState({ path });
    this.getBlockState();
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  select($event: Event) {
    ($event.target as HTMLInputElement).select();
  }

  onKeyChange() {
    const key = this.keyElt.nativeElement.value;
    const parsing = key.match(this.key_regex);
    if (parsing.length !== 2 || parsing[1].length !== 64) {
      return;
    }
    const keyCurrent = this.storageService.get('key');
    if (key && keyCurrent && key !== keyCurrent) {
      this.storageService.setState({ 'key-old': keyCurrent });
      this._hasPrevious = true;
    }
    key && this.storageService.setState({ key });
  }

  onPathChange() {
    const path = this.pathElt.nativeElement.value;
    this.getBlockState();
    this.storageService.setState({ path });
  }

  reset() {
    const key = this.keyElt.nativeElement.value;
    this.storageService.setState({ 'key-old': key, path: '' });
    this._hasPrevious = true;
    this.keyElt.nativeElement.value = '';
    this.pathElt.nativeElement.value = '';
    this.storageService.setState({ key: '', path: '' });
  }

  pop() {
    const sep = '/';
    const value = this.pathElt.nativeElement.value;
    if (!value.includes(sep)) {
      this.pathElt.nativeElement.value = '';
    } else {
      const remove = value.split(sep).pop();
      this.pathElt.nativeElement.value =
        this.pathElt.nativeElement.value.replace([sep, remove].join(''), '');
    }
    this.onPathChange();
  }
}
