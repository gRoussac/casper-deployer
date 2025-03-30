import { Inject, Injectable } from '@angular/core';
import PromiseWorker from 'promise-worker';
import { HIGHLIGHT_WEBWORKER_FACTORY } from './util-hihlight-webworker.token';

@Injectable()
export class HighlightService {
  private webworker?: Worker;
  private hightlightWebworker!: PromiseWorker;

  constructor(
    @Inject(HIGHLIGHT_WEBWORKER_FACTORY)
    private readonly highlightWebworkerFactory: () => [Worker, PromiseWorker],
  ) {}

  async highlightMessage<T>(message: T): Promise<string> {
    this.activateWorker();
    const hightlight =
      this.hightlightWebworker &&
      (await this.hightlightWebworker
        .postMessage<string, T>(message)
        .catch((error) => {
          console.error(error);
        }));
    this.terminateWorker();
    return hightlight as string;
  }

  private activateWorker() {
    if (this.webworker) {
      return;
    }
    const factory = this.highlightWebworkerFactory();
    this.webworker = factory[0] as Worker;
    this.hightlightWebworker = factory[1] as PromiseWorker;
  }

  private terminateWorker() {
    if (!this.webworker) {
      return;
    }
    this.webworker.terminate();
    delete this.webworker;
  }
}
