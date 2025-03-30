import { TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-util/config';
import { TOASTER_TOKEN } from '@casper-util/toaster';

import { WalletService } from './wallet.service';
import { SDK_TOKEN } from '@casper-util/wasm';

jest.mock('casper-rust-wasm-sdk', () => ({
  CasperWallet: jest
    .fn()
    .mockImplementation(() => ({
      getVersion: jest.fn().mockResolvedValue('1.0.0'),
      connect: jest.fn().mockResolvedValue(true),
      isConnected: jest.fn().mockResolvedValue(true),
      switchAccount: jest.fn().mockResolvedValue(true),
      getActivePublicKey: jest.fn().mockResolvedValue('mocked-public-key'),
      signDeploy: jest.fn().mockResolvedValue({}),
    })),
  Deploy: jest.fn(),
}));

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WalletService,
        { provide: TOASTER_TOKEN, useValue: {} },
        { provide: ENV_CONFIG, useValue: config },
        { provide: SDK_TOKEN, useValue: {} },
      ],
    });
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
