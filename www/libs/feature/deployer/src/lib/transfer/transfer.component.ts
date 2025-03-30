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
import { ResultService } from '../result/result.service';
import { DeployReturn, State } from '@casper-api/api-interfaces';
import { Subscription } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { WatcherService } from '@casper-util/watcher';
import { Deploy, PublicKey, motesToCSPR } from 'casper-rust-wasm-sdk';
import { DeployService } from '@casper-util/deploy';
import { TOASTER_TOKEN, Toaster } from '@casper-util/toaster';
import { StorageService } from '@casper-util/storage';
import { WalletService } from '@casper-util/wallet';
import { DeployerService } from '@casper-data/data-access-deployer';

@Component({
  selector: 'casper-deployer-transfer',
  standalone: true,
  imports: [CommonModule],
  providers: [WatcherService, DeployService],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferComponent implements AfterViewInit, OnDestroy {
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('amountElt') amountElt!: ElementRef;
  @ViewChild('transferToElt') transferToElt!: ElementRef;
  @ViewChild('transferFromElt') transferFromElt!: ElementRef;

  activePublicKey?: string;
  apiUrl?: string;

  private getStateSubscription!: Subscription;
  private deploy?: Deploy;
  private chain_name?: string;

  constructor(
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly watcherService: WatcherService,
    private readonly deployService: DeployService,
    private readonly storageService: StorageService,
    private readonly walletService: WalletService,
  ) {}

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        if (state.user?.activePublicKey) {
          this.activePublicKey = state.user.activePublicKey;
        }
        state.apiUrl && (this.apiUrl = state.apiUrl);
        state.chain_name && (this.chain_name = state.chain_name);
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
  }

  async transfer() {
    if (!this.activePublicKey) {
      this.connect.emit();
      return;
    }
    const public_key = new PublicKey(this.activePublicKey);
    const amount = this.amountElt?.nativeElement.value.trim();
    const session_account = this.transferFromElt?.nativeElement.value.trim();
    const target_account =
      this.transferToElt?.nativeElement.value.trim() || public_key;

    this.deploy = this.deployService.makeTransfer(
      {
        chain_name: this.chain_name || this.config['chain_name_localhost'],
        session_account,
      },
      target_account,
      amount,
    );

    const signedDeploy =
      this.deploy &&
      (await this.walletService.signDeploy(this.deploy, this.activePublicKey));

    if (signedDeploy && !signedDeploy.validateDeploySize()) {
      this.toastr.error(signedDeploy.toString(), 'Error with validateDeploy');
      console.error(this.deploy);
      return;
    }
    const deploy = signedDeploy!.toJson();
    if (!deploy) {
      this.toastr.error('', 'Error with validateDeploy');
      console.error(signedDeploy);
    }
    this.deployerService
      .putDeploy(JSON.stringify(deploy), this.apiUrl)
      .subscribe((deploy) => {
        const deploy_hash = (deploy as DeployReturn).deploy_hash;
        deploy_hash &&
          this.resultService.setResult<Deploy>(
            'Deploy Hash',
            deploy_hash || deploy,
          );
        deploy_hash && this.deployerService.setState({ deploy_hash });
        deploy_hash &&
          this.watcherService.watchDeploy(deploy_hash, this.apiUrl);
        deploy_hash && this.storageService.setState({ deploy_hash });
      });
  }

  get isButtonDisabled() {
    return (
      !this.transferToElt?.nativeElement.value ||
      !this.amountElt?.nativeElement.value
    );
  }

  convert() {
    const amount = this.amountElt?.nativeElement.value.trim();
    if (!amount) {
      return;
    }
    return motesToCSPR(amount);
  }
}
