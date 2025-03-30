import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateRootHashComponent } from '../state-root-hash/state-root-hash.component';
import { QueryGlobalStateComponent } from '../query-global-state/query-global-state.component';
import { GetDeployComponent } from '../get-deploy/get-deploy.component';
import { PutDeployComponent } from '../put-deploy/put-deploy.component';
import { PublicKeyComponent } from '../public-key/public-key.component';
import { BalanceComponent } from '../balance/balance.component';
import { ResultComponent } from '../result/result.component';
import { ResultService } from '../result/result.service';
import { UtilHihlightWebworkerModule } from '@casper-util/hightlight-webworker';
import { TransferComponent } from '../transfer/transfer.component';
import { DictionaryComponent } from '../dictionary/dictionary.component';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { State } from '@casper-api/api-interfaces';
import { Subscription } from 'rxjs';
import { ArgBuilderComponent } from '../arg-builder/arg-builder.component';
import { DeployerService } from '@casper-data/data-access-deployer';
import { DeployService } from '@casper-util/deploy';

@Component({
  selector: 'casper-deployer',
  standalone: true,
  imports: [
    CommonModule,
    UtilHihlightWebworkerModule,
    StateRootHashComponent,
    PublicKeyComponent,
    TransferComponent,
    BalanceComponent,
    QueryGlobalStateComponent,
    GetDeployComponent,
    PutDeployComponent,
    ResultComponent,
    DictionaryComponent,
    ArgBuilderComponent,
  ],
  providers: [ResultService, DeployerService, DeployService],
  templateUrl: './deployer.component.html',
  styleUrls: ['./deployer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeployerComponent implements OnInit, OnDestroy {
  private routeurHubSubscription!: Subscription;

  isBuilderOpened!: boolean;
  argument!: string;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly routeurHubService: RouteurHubService,
  ) {}

  ngOnInit(): void {
    this.setRouteurHubSubscription();
  }

  ngOnDestroy() {
    this.routeurHubSubscription && this.routeurHubSubscription.unsubscribe();
  }

  private setRouteurHubSubscription() {
    this.routeurHubSubscription = this.routeurHubService
      .getHubState()
      .subscribe((state: State) => {
        if (state.user) {
          this.deployerService.setState({ user: state.user });
        }
      });
  }

  connect() {
    this.routeurHubService.connect();
  }

  edit() {
    this.isBuilderOpened = true;
  }

  closeBuilder() {
    this.isBuilderOpened = false;
  }

  argumentChanged(argument: string) {
    this.argument = argument;
    this.closeBuilder();
  }

  refreshPurse() {
    this.routeurHubService.refreshPurse();
  }
}
