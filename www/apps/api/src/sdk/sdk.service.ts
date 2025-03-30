import { SDK, Verbosity } from 'casper-rust-wasm-sdk-nodejs';
import { UrlService } from '../util/url/url.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SDKService {
  private node_address!: string;
  private casperSDK!: SDK;
  private verbosity: Verbosity.Low;

  constructor(private readonly urlService: UrlService) {}

  getCasperSDK(node_address: string) {
    if (node_address && this.node_address === node_address) {
      return this.casperSDK;
    }
    node_address = this.urlService.shortUrl(node_address);
    if (node_address && !this.urlService.isValidHttpUrl(node_address)) {
      throw TypeError('node_address seems invalid');
    }
    this.node_address = node_address;
    if (node_address) {
      this.casperSDK = new SDK(node_address, this.verbosity);
    } else {
      this.casperSDK = new SDK(undefined, this.verbosity);
    }
    return this.casperSDK;
  }
}
