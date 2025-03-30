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
import { DEPLOYER_TOKEN } from '@casper-util/wasm';
import { ResultService } from '../result/result.service';
import { DictionaryComponent } from './dictionary.component';

describe('DictionaryComponent', () => {
  let component: DictionaryComponent;
  let fixture: ComponentFixture<DictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryComponent, HttpClientModule],
      providers: [
        DeployerService,
        ResultService,
        HighlightService,
        { provide: ENV_CONFIG, useValue: config },
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY,
          useValue: { HIGHLIGHT_WEBWORKER_FACTORY },
        },
        { provide: TOASTER_TOKEN, useValue: {} },
        {
          provide: DEPLOYER_TOKEN,
          useValue: { account_hash_to_base64_encode: jest.fn() },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
