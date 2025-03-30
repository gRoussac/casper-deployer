import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeployerService } from '@casper-data/data-access-deployer';
import { config, ENV_CONFIG } from '@casper-util/config';
import {
  HIGHLIGHT_WEBWORKER_FACTORY,
  HighlightService,
} from '@casper-util/hightlight-webworker';
import { TOASTER_TOKEN } from '@casper-util/toaster';
import { ResultService } from '../result/result.service';

import { TransferComponent } from './transfer.component';
import { SDK_TOKEN } from '@casper-util/wasm';
import { StorageService } from '@casper-util/storage';
import { WalletService } from '@casper-util/wallet';

jest.mock('casper-rust-wasm-sdk', () => ({
  CasperWallet: jest.fn().mockImplementation(() => ({})),
}));

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferComponent, HttpClientModule],
      providers: [
        DeployerService,
        ResultService,
        HighlightService,
        StorageService,
        WalletService,
        { provide: ENV_CONFIG, useValue: config },
        { provide: SDK_TOKEN, useValue: {} },
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY,
          useValue: { HIGHLIGHT_WEBWORKER_FACTORY },
        },
        { provide: TOASTER_TOKEN, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
