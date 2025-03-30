import { api_interface, DeployReturn, Peer } from '@casper-api/api-interfaces';
import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from '../../app.service';
import { Deploy, GetDeployResult } from 'casper-rust-wasm-sdk-nodejs';

@Controller(api_interface.Deployer)
export class DeployerController {
  constructor(private readonly appService: AppService) {}

  @Get(api_interface.GetStateRootHash)
  async getStateRootHash(
    @Query('apiUrl') apiUrl?: string,
  ): Promise<string | Error> {
    try {
      const stringify = true;
      return await this.appService.getStateRootHash(apiUrl, stringify);
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.Peers)
  async getPeers(@Query('apiUrl') apiUrl: string): Promise<Peer[] | Error> {
    try {
      return await this.appService.getPeers(apiUrl);
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.Status)
  async getStatus(@Query('apiUrl') apiUrl?: string): Promise<string | Error> {
    try {
      return await this.appService.getStatus(apiUrl);
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.PurseURef)
  async getPurseURef(
    @Query('publicKey') publicKey?: string,
    @Query('apiUrl') apiUrl?: string,
  ): Promise<string | Error> {
    try {
      const stringify = true;
      return await this.appService.getPurseURef(publicKey, apiUrl, stringify);
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.State)
  async getBlockState(
    @Query('stateRootHash') stateRootHash: string,
    @Query('key') key: string,
    @Query('path') path?: string,
    @Query('apiUrl') apiUrl?: string,
  ): Promise<object | Error> {
    try {
      return await this.appService.getBlockState(
        stateRootHash,
        key,
        path && JSON.parse(path),
        apiUrl,
      );
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.Balance)
  async getBalance(
    @Query('apiUrl') apiUrl?: string,
    @Query('stateRootHash') stateRootHash?: string,
    @Query('purseURef') purseURef?: string,
  ): Promise<string | Error> {
    try {
      const stringify = true;
      return (
        await this.appService.getBalance(
          stateRootHash,
          purseURef,
          apiUrl,
          stringify,
        )
      ).toString();
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.BalanceOfByPublicKey)
  async getBalanceOfByPublicKey(
    @Query('publicKey') publicKey: string,
    @Query('apiUrl') apiUrl?: string,
  ): Promise<string | Error> {
    try {
      const stringify = true;
      return (
        await this.appService.getBalanceOfByPublicKey(
          publicKey,
          apiUrl,
          stringify,
        )
      ).toString();
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.Deploy_info)
  async getDeploy(
    @Query('apiUrl') apiUrl?: string,
    @Query('deployHash') deployHash?: string,
  ): Promise<GetDeployResult | Error> {
    try {
      return await this.appService.getDeploy(deployHash, apiUrl);
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Post(api_interface.Put_Deploy)
  async putDeploy(
    @Body('signedDeploy') signedDeploy: string,
    @Body('speculative') speculative?: boolean,
    @Body('apiUrl') apiUrl?: string,
  ): Promise<DeployReturn | Error> {
    try {
      const signedDeployFromJson = JSON.parse(signedDeploy);
      if (signedDeployFromJson.err) {
        console.error(signedDeployFromJson.val.message);
        return;
      }
      const deploy = new Deploy(signedDeployFromJson);
      return await this.appService.putDeploy(deploy, speculative, apiUrl);
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }

  @Get(api_interface.Dictionary)
  async getDictionary(
    @Query('stateRootHash') stateRootHash: string,
    @Query('contractHash') contractHash: string,
    @Query('dictionaryName') dictionaryName: string,
    @Query('dictionaryItemKey') dictionaryItemKey: string,
    @Query('seedUref') seedUref?: string,
    @Query('rawData') rawData?: boolean,
    @Query('apiUrl') apiUrl?: string,
  ): Promise<object | Error> {
    try {
      if (seedUref) {
        return await this.appService.getDictionaryItemByURef(
          stateRootHash,
          dictionaryItemKey,
          seedUref,
          apiUrl,
        );
      }
      return await this.appService.getDictionaryItemByName(
        stateRootHash,
        contractHash,
        dictionaryName,
        dictionaryItemKey,
        apiUrl,
      );
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }
}
