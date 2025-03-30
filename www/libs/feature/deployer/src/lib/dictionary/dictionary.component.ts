import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeployerService } from '@casper-data/data-access-deployer';
import { ResultService } from '../result/result.service';
import { State } from '@casper-api/api-interfaces';
import { Deployer } from 'deployer';
import { DEPLOYER_TOKEN } from '@casper-util/wasm';
import { PublicKey } from 'casper-rust-wasm-sdk';

@Component({
  selector: 'casper-deployer-state-dictionary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contractHashElt') contractHashElt!: ElementRef;
  @ViewChild('dictionaryNameElt') dictionaryNameElt!: ElementRef;
  @ViewChild('dictionaryItemKeyElt') dictionaryItemKeyElt!: ElementRef;
  @ViewChild('seedUrefElt') seedUrefElt!: ElementRef;

  apiUrl?: string;
  stateRootHash?: string;
  activePublicKey = '';

  private getStateSubscription!: Subscription;
  private getDictionarySubscription!: Subscription;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    @Inject(DEPLOYER_TOKEN) private readonly deployer: Deployer,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        state.stateRootHash && (this.stateRootHash = state.stateRootHash);
        state.apiUrl && (this.apiUrl = state.apiUrl);
        if (state.user?.activePublicKey) {
          this.activePublicKey = state.user.activePublicKey;
        }
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getDictionarySubscription &&
      this.getDictionarySubscription.unsubscribe();
  }

  getDictionary() {
    this.stateRootHash &&
      (this.getDictionarySubscription = this.deployerService
        .getDictionaryItem(
          this.stateRootHash,
          this.contractHash,
          this.dictionaryName,
          this.dictionaryItemKey,
          this.seedUref,
          this.apiUrl,
        )
        .subscribe((dict) => {
          dict && this.resultService.setResult<object>('Dictionnary', dict);
          this.getDictionarySubscription.unsubscribe();
        }));
  }

  get contractHash(): string {
    return this.contractHashElt?.nativeElement?.value;
  }

  get dictionaryName(): string {
    return this.dictionaryNameElt?.nativeElement.value;
  }

  get dictionaryItemKey(): string {
    return this.dictionaryItemKeyElt?.nativeElement.value;
  }

  get seedUref(): string {
    return this.seedUrefElt?.nativeElement.value;
  }

  get isButtonDisabled(): boolean {
    const firstCondition = !this.dictionaryItemKey;
    const secondCondition =
      !this.seedUref && (!this.dictionaryName || !this.contractHash);
    return firstCondition || secondCondition;
  }

  get isSeedUrefDisabled(): boolean {
    return !!this.contractHash || !!this.dictionaryName;
  }

  get isDictionaryNameorHashDisabled(): boolean {
    return !!this.seedUref;
  }

  setAccountBase64() {
    const account_hash = new PublicKey(this.activePublicKey)
      .toAccountHash()
      .toFormattedString();
    const base64 = this.deployer.account_hash_to_base64_encode(account_hash);
    base64 && (this.dictionaryItemKeyElt.nativeElement.value = base64);
  }

  setAccountHash() {
    if (!this.activePublicKey) {
      return;
    }
    const account_hash = new PublicKey(this.activePublicKey)
      .toAccountHash()
      .toHexString();
    this.dictionaryItemKeyElt.nativeElement.value = account_hash || '';
  }

  reset() {
    this.seedUrefElt.nativeElement.value = '';
    this.contractHashElt.nativeElement.value = '';
    this.dictionaryNameElt.nativeElement.value = '';
    this.dictionaryItemKeyElt.nativeElement.value = '';
  }
}
