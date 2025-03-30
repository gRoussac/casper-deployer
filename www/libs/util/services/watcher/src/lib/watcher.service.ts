import { Inject, Injectable, isDevMode } from '@angular/core';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { Toaster, TOASTER_TOKEN } from '@casper-util/toaster';
import { SDK_TOKEN } from '@casper-util/wasm';
import {
  SDK,
  EventParseResult,
  DeploySubscription,
} from 'casper-rust-wasm-sdk';

@Injectable()
export class WatcherService {
  private readonly events = 'events';
  private readonly api_url = 'api_url';

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
  ) {}

  async watchDeploy(deployHash: string, apiUrl?: string) {
    const config = this.config;
    apiUrl = apiUrl?.replace(config['rpc_port'], config['sse_port']);
    apiUrl = apiUrl?.replace(
      config['rpc_port_localhost'],
      config['sse_port_localhost'],
    );
    const eventsUrl = [
      config['events_url_localhost'].replace(
        config['sse_port_localhost'],
        config['current_port'],
      ),
      ,
      `/${this.events}?${this.api_url}=`,
      apiUrl,
      apiUrl?.includes('node.testnet')
        ? `/${this.events}?` // TODO 2.0
        : config['events_main_suffix'],
    ].join('');
    // console.debug(eventsUrl, apiUrl, config['events_url_default']);
    // console.log((!isDevMode() && eventsUrl) || config['events_url_default']);
    const watcher = this.sdk.watchDeploy(
      (!isDevMode() && eventsUrl) || config['events_url_default'],
    );
    try {
      const eventHandlerFn = this.getEventHandlerFn(deployHash);
      const deploySubscription: DeploySubscription = new DeploySubscription(
        deployHash,
        eventHandlerFn,
      );
      watcher.subscribe([deploySubscription]);
      this.toastr.info(
        `
      <b>Hash:</b>
      ${deployHash}
      <br><b>Waiting for process...</b>`,
        'Deploy accepted!',
      );
      await watcher.start();
    } catch (err) {
      watcher.stop();
      watcher.unsubscribe(deployHash);
      console.error(err);
    }
  }

  private getEventHandlerFn(deployHash: string) {
    const eventHandlerFn = (eventParseResult: EventParseResult) => {
      if (eventParseResult.err) {
        this.toastr.error(
          `${deployHash} ${eventParseResult.err}`,
          '<b>Deploy not successful!</b>',
        );
        console.error(eventParseResult);
      } else if (
        eventParseResult.body?.DeployProcessed?.execution_result.Success
      ) {
        // console.warn(eventParseResult.body.DeployProcessed);
        this.toastr.clear();
        this.toastr.success(
          `
        <b>Hash:</b>
        ${deployHash}
        <br><b>Block:</b>
        ${eventParseResult.body?.DeployProcessed?.block_hash}
        <br><b>Cost:</b> ${eventParseResult.body?.DeployProcessed?.execution_result.Success.cost} motes`,
          'Deploy successful!',
        );
      } else {
        //   console.warn(eventParseResult.body.DeployProcessed);
        this.toastr.warning(
          `<b>Hash:</b>
        ${deployHash}
        <br><b>Block:</b>
        ${eventParseResult.body?.DeployProcessed?.block_hash}
        <br><b>Error:</b> "<b>${eventParseResult.body?.DeployProcessed?.execution_result.Failure?.error_message}"</b>`,
          '<b>Deploy warning!<b>',
        );
      }
    };
    return eventHandlerFn;
  }
}
