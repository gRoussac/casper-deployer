import { Injectable } from '@nestjs/common';
import { DeployReturn, Peer, Users } from '@casper-api/api-interfaces';
import { environment } from '../environments/environment';
import { SDKService } from '../sdk/sdk.service';
import {
  Deploy,
  DictionaryItemStrParams,
  GetDeployResult,
  getSpeculativeExecOptions,
} from 'casper-rust-wasm-sdk-nodejs';

@Injectable()
export class AppService {
  constructor(private readonly sdkService: SDKService) {}

  getUsers(): Users {
    return environment.users;
  }

  async getPeers(apiUrl: string): Promise<Peer[]> {
    return (await this.sdkService.getCasperSDK(apiUrl).get_peers()).peers?.map(
      (peer) => {
        const address = peer.address.split(':');
        peer.address = ['http://', address.shift(), ':', '7777'].join('');
        return peer;
      },
    );
  }

  async getStatus(apiUrl: string): Promise<string> {
    return JSON.stringify(
      (await this.sdkService.getCasperSDK(apiUrl).get_node_status())
        .api_version && 'status',
    );
  }

  async getStateRootHash(apiUrl: string, stringify = false): Promise<string> {
    const stateRootHash = (
      await this.sdkService.getCasperSDK(apiUrl).get_state_root_hash()
    ).toString();
    if (stringify) {
      return JSON.stringify(stateRootHash);
    }
    return stateRootHash;
  }

  async getPurseURef(
    publicKey: string,
    apiUrl: string,
    stringify = false,
  ): Promise<string> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const options = sdk.get_account_options({
      account_identifier_as_string: publicKey,
    });
    const account = (await sdk.state_get_account_info(options)).account;
    if (stringify) {
      return JSON.stringify(account.main_purse);
    }
    return account.main_purse;
  }

  async getBlockState(
    stateRootHash: string,
    key: string,
    path: string[] = [],
    apiUrl: string,
  ): Promise<object> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const options = sdk.query_global_state_options({
      state_root_hash_as_string: stateRootHash,
      key_as_string: key,
      path,
    });
    return (await sdk.query_global_state(options)).stored_value;
  }

  async getBalance(
    stateRootHash: string,
    purseURef: string,
    apiUrl: string,
    stringify = false,
  ) {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    if (!stateRootHash) {
      stateRootHash = await this.getStateRootHash(apiUrl);
    }
    const options = sdk.get_balance_options({
      purse_uref_as_string: purseURef,
      state_root_hash_as_string: stateRootHash,
    });
    const balance_value = (await sdk.get_balance(options)).balance_value;
    if (stringify) {
      return JSON.stringify(balance_value);
    }
    return balance_value;
  }

  async getBalanceOfByPublicKey(
    publicKey: string,
    apiUrl: string,
    stringify = false,
  ): Promise<string> {
    if (!publicKey) {
      return;
    }
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const stateRootHash = await this.getStateRootHash(apiUrl);
    const purse_identifier_as_string = await this.getPurseURef(
      publicKey,
      apiUrl,
    );
    const options = sdk.query_balance_options({
      state_root_hash_as_string: stateRootHash,
      purse_identifier_as_string,
    });
    const balance_value = (await sdk.query_balance(options)).balance;
    if (stringify) {
      return JSON.stringify(balance_value);
    }
    return balance_value;
  }

  async getDeploy(
    deployHash: string,
    apiUrl: string,
  ): Promise<GetDeployResult> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const options = sdk.get_deploy_options({
      deploy_hash_as_string: deployHash,
    });
    // TODO add checkbox finalized_approvals
    return (
      await this.sdkService.getCasperSDK(apiUrl).get_deploy(options)
    ).toJson();
  }

  async putDeploy(
    signedDeploy: Deploy,
    speculative = false,
    apiUrl: string,
  ): Promise<DeployReturn> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    if (signedDeploy && !signedDeploy.validateDeploySize()) {
      console.error(signedDeploy);
      return;
    }
    if (speculative) {
      console.debug('speculative', speculative);
      return (
        await sdk.speculative_exec({
          deploy: signedDeploy,
        } as getSpeculativeExecOptions)
      ).toJson();
    }
    return (await sdk.put_deploy(signedDeploy)).toJson();
  }

  async getDictionaryItemByURef(
    stateRootHash: string,
    dictionaryItemKey: string,
    seedUref: string,
    apiUrl: string,
  ): Promise<object> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const dictionary_item_params = new DictionaryItemStrParams();
    dictionary_item_params.setUref(seedUref, dictionaryItemKey);
    const options = sdk.get_dictionary_item_options({
      state_root_hash_as_string: stateRootHash,
      dictionary_item_params: dictionary_item_params.toJson(),
    });
    return (await sdk.get_dictionary_item(options)).stored_value;
  }

  async getDictionaryItemByName(
    stateRootHash: string,
    contractHash: string,
    dictionaryName: string,
    dictionaryItemKey: string,
    apiUrl: string,
  ): Promise<object> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const dictionary_item_params = new DictionaryItemStrParams();
    dictionary_item_params.setContractNamedKey(
      contractHash,
      dictionaryName,
      dictionaryItemKey,
    );
    const options = sdk.get_dictionary_item_options({
      state_root_hash_as_string: stateRootHash,
      dictionary_item_params: dictionary_item_params.toJson(),
    });
    return (await sdk.get_dictionary_item(options)).stored_value;
  }
}
