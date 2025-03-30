import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  Provider,
  ImportProvidersSource,
} from '@angular/core';

import { CommonModule, DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '@casper-ui/header';
import { UsersService } from '@casper-data/data-access-users';
import { Users, User, Roles } from '@casper-api/api-interfaces';
import { DEPLOYER_TOKEN } from '@casper-util/wasm';
import { Deployer } from 'deployer';
import { RouterModule } from '@angular/router';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { StorageService } from '@casper-util/storage';
import { DeployerService } from '@casper-data/data-access-deployer';
import { motesToCSPR } from 'casper-rust-wasm-sdk';
import { WalletService } from '@casper-util/wallet';
const imports = [CommonModule, RouterModule, HeaderComponent];

@Component({
  selector: 'casper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
  providers: [
    UsersService,
    RouteurHubService,
    StorageService,
    DeployerService,
    WalletService,
  ],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  window!: (Window & typeof globalThis) | null;
  isConnected!: boolean;
  activePublicKey!: string;
  users!: Users;
  user?: User;
  balance!: string;
  apiUrl!: string;
  walletVersion!: string;

  readonly Roles = Roles;

  private usersSubscription!: Subscription;
  private accountInformationSubscription!: Subscription;
  private subscriptions: Subscription[] = [];
  private _activePublicKey!: string; // memoize activePublicKey
  private handler: EventListener = async () => {
    await this.getActivePublicKey();
    await this.refreshData();
  };
  private eventTypes: any;
  private eventListeners: (() => void)[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(DEPLOYER_TOKEN) private readonly deployer: Deployer,
    private readonly usersService: UsersService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly routeurHubService: RouteurHubService,
    private readonly storageService: StorageService,
    private readonly walletService: WalletService,
    private readonly renderer: Renderer2,
  ) {}

  async ngOnInit(): Promise<void> {
    this.setRouteurHubSubscriptions();
    this.setUsersSubscription();
    this.window = this.document.defaultView;
    this.eventTypes = (this.window as any)?.CasperWalletEventTypes;
    this.deployer.hello();
  }

  async ngAfterViewInit() {
    this.apiUrl = this.storageService.get('apiUrl');
    this.walletVersion = await this.walletService.getVersion();
    if (this.walletVersion) {
      this.listenCasperWalletEvents();
    }
    try {
      this.isConnected = await this.walletService.isConnected();
    } catch (err) {
      console.warn(err);
    }
    if (this.isConnected) {
      await this.getActivePublicKey();
      this.isConnected = await this.walletService.isConnected();
      setTimeout(async () => {
        await this.refreshData();
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription && subscription.unsubscribe();
    });
    this.removeCasperWalletEvents();
  }

  async connect() {
    try {
      if (!this.isConnected) {
        await this.getActivePublicKey();
        this.isConnected = await this.walletService.isConnected();
        this.isConnected && (await this.refreshData());
      } else {
        await this.walletService.switchAccount();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private listenCasperWalletEvents = () => {
    if (!this.eventTypes || !this.eventTypes.ActiveKeyChanged) {
      console.warn(
        'CasperWalletEventTypes or ActiveKeyChanged is not defined.',
      );
      return;
    }

    this.eventListeners.push(
      this.renderer.listen(
        this.window,
        this.eventTypes.ActiveKeyChanged,
        this.handler!,
      ),
    );
    this.eventListeners.push(
      this.renderer.listen(
        this.window,
        this.eventTypes.Unlocked,
        this.handler!,
      ),
    );
    // this.window!.addEventListener(eventTypes.Connected, this.handler!);
  };

  private removeCasperWalletEvents = () => {
    this.eventListeners.forEach((unlisten) => unlisten());
    this.eventListeners = [];
  };

  private refreshPurse() {
    this.setAccountInformationSubscription();
  }

  private setRouteurHubSubscriptions() {
    this.subscriptions.push(
      this.routeurHubService.connect$.subscribe(async () => {
        this.connect();
      }),
    );
    this.subscriptions.push(
      this.routeurHubService.refreshPurse$.subscribe(async () => {
        this.refreshPurse();
      }),
    );
    this.subscriptions.push(
      this.routeurHubService.getHubState().subscribe(async (state) => {
        if (state.apiUrl) {
          this.apiUrl = state.apiUrl;
          this.storageService.setState(state);
        }
      }),
    );
  }

  private setUsersSubscription() {
    this.usersSubscription = this.usersService.get().subscribe((users) => {
      this.users = users;
      this.changeDetectorRef.markForCheck();
      this.usersSubscription.unsubscribe();
    });
  }

  private async refreshData() {
    this.setActiveUser();
    this.setPurse();
  }

  private async getActivePublicKey() {
    const getActivePublicKey = await this.walletService.getActivePublicKey();
    if (getActivePublicKey && this.activePublicKey != getActivePublicKey) {
      this.activePublicKey = await this.walletService.getActivePublicKey();
    }
  }

  private setActiveUser() {
    this.user = this.users?.find(
      (user: User) => user.activePublicKey == this.activePublicKey,
    ) as User;
    !this.user &&
      this.activePublicKey &&
      (this.user = { activePublicKey: this.activePublicKey });
    this.routeurHubService.setHubState({ user: this.user });
  }

  private setPurse() {
    if (
      !this.isConnected ||
      !this.activePublicKey ||
      // Do not retrieve activePublicKey if it has not changed
      this._activePublicKey === this.activePublicKey
    ) {
      return;
    }
    // memoize activePublicKey
    this._activePublicKey = this.activePublicKey;
    this.setAccountInformationSubscription();
  }

  private setAccountInformationSubscription() {
    this.activePublicKey &&
      (this.accountInformationSubscription = this.usersService
        .getBalanceOfByPublicKey(this.activePublicKey, this.apiUrl)
        .subscribe((purse) => {
          if (JSON.parse(purse)?.name) {
            return;
          }
          this.balance = motesToCSPR(purse);
          this.changeDetectorRef.markForCheck();
          this.accountInformationSubscription.unsubscribe();
        }));
  }
}
