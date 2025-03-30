import { CasperWallet, Deploy } from 'casper-rust-wasm-sdk';

export class WalletService {
  private wallet!: CasperWallet;

  constructor() {
    this.wallet = new CasperWallet();
  }

  public async getVersion(): Promise<string> {
    try {
      return this.wallet.getVersion();
    } catch (err) {
      console.warn(err);
    }
    return '';
  }

  private async connect(): Promise<boolean> {
    try {
      return this.wallet.connect();
    } catch (err) {
      console.warn(err);
    }
    return false;
  }

  public async isConnected(): Promise<boolean> {
    try {
      return this.wallet.isConnected();
    } catch (err) {
      console.warn(err);
    }
    return false;
  }

  public async switchAccount(): Promise<boolean> {
    try {
      return this.wallet.switchAccount();
    } catch (err) {
      console.warn(err);
    }
    return false;
  }

  public async getActivePublicKey(): Promise<string> {
    const is_connected = await this.connect();
    return (is_connected && (await this.wallet.getActivePublicKey())) || '';
  }

  public async signDeploy(
    deploy: Deploy,
    public_key?: string,
  ): Promise<Deploy> {
    const is_connected = await this.connect();
    if (!is_connected) {
      console.warn('Casper Wallet is not connected');
    }
    return this.wallet.signDeploy(new Deploy(deploy), public_key);
  }
}
