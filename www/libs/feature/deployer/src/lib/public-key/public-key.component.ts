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
import { State, User } from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Subscription } from 'rxjs';
import { ResultService } from '../result/result.service';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';

@Component({
  selector: 'casper-deployer-public-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-key.component.html',
  styleUrls: ['./public-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicKeyComponent implements AfterViewInit, OnDestroy {
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshPurse: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('stateRootHashElt') stateRootHashElt!: ElementRef;
  @ViewChild('activePublicKeyElt') activePublicKeyElt!: ElementRef;

  apiUrl?: string;
  activePublicKey?: string;
  user?: User;

  private getStateSubscription!: Subscription;
  private getPurseURefSubscription!: Subscription;
  private getBalanceOfByPublicKeySubscription!: Subscription;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
  ) {}

  ngAfterViewInit(): void {
    this.setStateSubscription();
  }

  ngOnDestroy(): void {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getPurseURefSubscription &&
      this.getPurseURefSubscription.unsubscribe();
    this.getBalanceOfByPublicKeySubscription &&
      this.getBalanceOfByPublicKeySubscription.unsubscribe();
  }

  setStateSubscription(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        state.stateRootHash &&
          (this.stateRootHashElt.nativeElement.value = state.stateRootHash);
        state.apiUrl && (this.apiUrl = state.apiUrl);
        state.user?.activePublicKey &&
          (this.activePublicKey = this.activePublicKeyElt.nativeElement.value =
            state.user.activePublicKey);
        this.user = state.user;
        this.changeDetectorRef.markForCheck();
      });
  }

  setActivePublicKey($event: Event) {
    const public_key = ($event.target as HTMLSelectElement).value || '';
    if (public_key) {
      this.user = { activePublicKey: public_key };
      this.deployerService.setState({ user: this.user });
    }
  }

  getPurseURef(): void {
    if (!this.isFormValid()) {
      return;
    }
    const stateRootHash = this.stateRootHashElt?.nativeElement.value;
    const publicKey = this.activePublicKeyElt?.nativeElement.value;
    stateRootHash &&
      publicKey &&
      (this.getPurseURefSubscription = this.deployerService
        .getPurseURef(stateRootHash, publicKey, this.apiUrl)
        .subscribe((purse_uref) => {
          purse_uref &&
            this.resultService.setResult<string>('Purse URef', purse_uref);
          this.getPurseURefSubscription.unsubscribe();
        }));
  }

  balanceOfByPublicKey(): void {
    const activePublicKey = this.activePublicKeyElt?.nativeElement.value;
    activePublicKey &&
      (this.getBalanceOfByPublicKeySubscription = this.deployerService
        .getBalanceOfByPublicKey(activePublicKey, this.apiUrl)
        .subscribe((balance) => {
          balance && this.resultService.setResult<string>('Balance', balance);
          this.refreshPurse.emit();
          this.getBalanceOfByPublicKeySubscription.unsubscribe();
        }));
  }

  get isPurseButtonDisabled(): boolean {
    return !this.isFormValid();
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  onConnect(): void {
    this.connect.emit();
  }

  reset($event: Event) {
    $event.preventDefault();
    this.activePublicKeyElt.nativeElement.value = '';
    this.stateRootHashElt.nativeElement.value = '';
  }

  private isFormValid(): boolean {
    return (
      this.activePublicKeyElt?.nativeElement.value &&
      this.stateRootHashElt?.nativeElement.value
    );
  }
}
