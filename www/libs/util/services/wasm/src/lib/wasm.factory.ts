import {
  ApplicationInitStatus,
  APP_INITIALIZER,
  inject,
  InjectionToken,
  Provider,
} from '@angular/core';
import * as deployer from 'deployer';
import init, { InitInput, SDK } from 'casper-rust-wasm-sdk';
import { config } from '@casper-util/config';

const initDeployer = deployer.default;
const Deployer = deployer.Deployer;

export const DEPLOYER_TOKEN = new InjectionToken<deployer.Deployer>('deployer');
export const SDK_TOKEN = new InjectionToken<SDK>('sdk');

export const fetchWasmFactory = async (): Promise<deployer.Deployer> => {
  const wasm = await initDeployer({
    module_or_path: 'assets/deployer_bg.wasm',
  });
  return wasm && new Deployer();
};

export const fetchSDKFactory = async (): Promise<SDK> => {
  const wasm = await init({
    module_or_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  });
  const casperSDK = new SDK(config['default_node_localhost']);
  return wasm && casperSDK;
};

export function provideSafeAsync<T>(
  token: T | InjectionToken<T>,
  initializer: () => Promise<T>,
): Provider[] {
  const container: { value?: T } = { value: undefined };
  return [
    {
      provide: APP_INITIALIZER,
      useValue: async () => {
        container.value = await initializer();
      },
      multi: true,
    },
    {
      provide: token,
      useFactory: () => {
        if (!inject(ApplicationInitStatus).done) {
          throw new Error(
            `Cannot inject ${token} until bootstrap is complete.`,
          );
        }
        return container.value;
      },
    },
  ];
}
