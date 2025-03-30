import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Peer } from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Subscription } from 'rxjs';
import { ResultService } from '../result/result.service';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { StorageService } from '@casper-util/storage';

@Component({
  selector: 'casper-deployer-state-root-hash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-root-hash.component.html',
  styleUrls: ['./state-root-hash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateRootHashComponent implements OnDestroy, AfterViewInit {
  stateRootHash!: string;
  private getStateRootHashSubscription!: Subscription;
  private getPeersSubscription!: Subscription;
  private getStatusSubscription!: Subscription;
  private window!: (Window & typeof globalThis) | null;

  peers!: Peer[];
  status = '';
  apiUrl!: string;
  @ViewChild('apiUrlElt') apiUrlElt!: HTMLInputElement;
  defaults!: string[];

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(DOCUMENT) private document: Document,
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly routeurHubService: RouteurHubService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService,
  ) {
    this.window = this.document.defaultView;
    this.defaults = [
      this.config['default_node_localhost'],
      this.config['default_node_launcher'],
      this.config['default_node_testnet'],
      this.config['default_node_mainnet'],
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const apiUrl = this.storageService.get('apiUrl');
      if (apiUrl) {
        this.apiUrl = apiUrl;
        if (!this.defaults.includes(this.apiUrl)) {
          this.defaults.push(this.apiUrl);
        }
        this.deployerService.setState({ apiUrl });
      } else {
        const currentHost = this.window?.location.hostname;
        if (currentHost && this.defaults[0].includes(currentHost)) {
          this.apiUrl = this.defaults[0];
        } else {
          this.apiUrl = this.defaults[2];
        }
        this.routeurHubService.setHubState({ apiUrl: this.apiUrl });
        this.deployerService.setState({ apiUrl: this.apiUrl });
      }
      this.getPeers();
    });
  }

  ngOnDestroy(): void {
    this.getStateRootHashSubscription &&
      this.getStateRootHashSubscription.unsubscribe();
    this.getPeersSubscription && this.getPeersSubscription.unsubscribe();
    this.getStatusSubscription && this.getStatusSubscription.unsubscribe();
  }

  selectApiUrl(event: Event): void {
    let apiUrl = (event.target as HTMLInputElement).value;
    if (!apiUrl) {
      return;
    }
    let url: URL;
    try {
      url = new URL(apiUrl);
      apiUrl = (url.origin + url.pathname).replace(/\/$/, '');
    } catch (error) {
      console.error(error);
    }
    this.apiUrl = apiUrl;
    this.apiUrlElt.value = this.apiUrl;
    this.deployerService.setState({ apiUrl: this.apiUrl });
    this.routeurHubService.setHubState({ apiUrl: this.apiUrl });
    if (!this.defaults.includes(this.apiUrl)) {
      this.defaults.push(this.apiUrl);
    }
    this.getPeers();
    this.routeurHubService.refreshPurse();
  }

  getStateRootHash(): void {
    this.apiUrl &&
      (this.getStateRootHashSubscription = this.deployerService
        .getStateRootHash(this.apiUrl)
        .subscribe((stateRootHash) => {
          stateRootHash &&
            this.resultService.setResult<string>(
              'State root hash',
              stateRootHash,
            );
          this.getStateRootHashSubscription.unsubscribe();
        }));
  }

  getPeers(): void {
    this.apiUrl &&
      (this.getPeersSubscription = this.deployerService
        .getPeers(this.apiUrl)
        .subscribe((peersResult) => {
          this.peers = peersResult as Peer[];
          this.getStatus();
          this.getStateRootHash();
          this.getPeersSubscription.unsubscribe();
          this.changeDetectorRef.markForCheck();
        }));
  }

  getStatus(): void {
    this.status = '';
    this.apiUrl &&
      (this.getStatusSubscription = this.deployerService
        .getStatus(this.apiUrl)
        .subscribe((status) => {
          this.status = status;
          this.changeDetectorRef.markForCheck();
          this.getStatusSubscription.unsubscribe();
        }));
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  trackByFn = (index: number, item: Peer): string => item.node_id;
}
