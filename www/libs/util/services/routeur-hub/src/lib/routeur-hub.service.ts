import { Injectable } from '@angular/core';
import { State } from '@casper-api/api-interfaces';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class RouteurHubService {
  private readonly connectSource = new Subject<void>();
  private readonly refreshPurseSource = new Subject<void>();
  connect$ = this.connectSource.asObservable();
  refreshPurse$ = this.refreshPurseSource.asObservable();
  private readonly state = new ReplaySubject<State>();

  connect() {
    this.connectSource.next();
  }

  refreshPurse() {
    this.refreshPurseSource.next();
  }

  setHubState(state: State) {
    this.state.next(state);
  }

  getHubState() {
    return this.state.asObservable();
  }
}
