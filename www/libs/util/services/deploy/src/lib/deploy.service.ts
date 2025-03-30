import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@casper-util/config';
import { TOASTER_TOKEN, Toaster } from '@casper-util/toaster';
import { SDK_TOKEN } from '@casper-util/wasm';
import {
  Bytes,
  Deploy,
  DeployStrParams,
  PaymentStrParams,
  SDK,
  SessionStrParams,
} from 'casper-rust-wasm-sdk';

@Injectable()
export class DeployService {
  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
  ) {}

  makeDeploy(
    deployStrParams: {
      chain_name: string;
      session_account: string;
      private_key?: string;
      timestamp?: string;
      ttl?: string;
    },
    sessionStrParams: {
      session_path?: string;
      session_name?: string;
      session_hash?: string;
      session_entry_point?: string;
      session_version?: string;
      session_args_json?: string;
      session_call_package?: boolean;
    },
    payment_amount: string,
    wasm?: Uint8Array,
  ): Deploy | undefined {
    const { chain_name, session_account, private_key, timestamp, ttl } =
      deployStrParams;

    const {
      session_path,
      session_name,
      session_hash,
      session_entry_point,
      session_version,
      session_args_json,
      session_call_package,
    } = sessionStrParams;

    const payment_params = new PaymentStrParams();
    payment_params.payment_amount = payment_amount;

    const deploy_params: DeployStrParams = new DeployStrParams(
      chain_name,
      session_account,
      private_key,
      timestamp,
      ttl,
    );

    const session_params = new SessionStrParams();
    if (!session_path) {
      if (!session_call_package) {
        if (session_hash) {
          session_params.session_hash = session_hash;
        } else if (session_name) {
          session_params.session_name = session_name;
        }
      } else {
        if (session_hash) {
          session_params.session_package_hash = session_hash;
        } else if (session_name) {
          session_params.session_package_name = session_name;
        }
      }
      session_entry_point &&
        (session_params.session_entry_point = session_entry_point);
      session_version && (session_params.session_version = session_version);
    } else {
      session_path &&
        wasm &&
        (session_params.session_bytes = Bytes.fromUint8Array(wasm));
    }
    session_args_json && (session_params.session_args_json = session_args_json);

    try {
      const deploy = this.sdk.make_deploy(
        deploy_params,
        session_params,
        payment_params,
      );
      if (!deploy.validateDeploySize()) {
        console.error(deploy);
        this.toastr.error('', 'Error with invalid deploy');
      }
      return deploy.toJson();
    } catch (err) {
      console.error(err);
      this.toastr.error(err as string, 'Error with arg');
    }
    return;
  }

  makeTransfer(
    deployStrParams: {
      chain_name: string;
      session_account: string;
      private_key?: string;
      timestamp?: string;
      ttl?: string;
    },
    target_account: string,
    amount: string,
  ) {
    const { chain_name, session_account, private_key, timestamp, ttl } =
      deployStrParams;

    const deploy_params = new DeployStrParams(
      chain_name,
      session_account,
      private_key,
      timestamp,
      ttl,
    );

    const payment_params = new PaymentStrParams();
    payment_params.payment_amount = '100000000';

    // Transfer minimum amount of tokens to recipient;
    const deploy = this.sdk.make_transfer(
      amount,
      target_account,
      undefined, // transfer_id
      deploy_params,
      payment_params,
    );
    if (!deploy.validateDeploySize()) {
      console.error(deploy);
      this.toastr.error('', 'Error with invalid transfer deploy');
    }
    return deploy.toJson();
  }
}
