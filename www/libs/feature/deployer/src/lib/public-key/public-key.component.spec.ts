import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeployerService } from '@casper-data/data-access-deployer';
import { config, ENV_CONFIG } from '@casper-util/config';
import {
  HIGHLIGHT_WEBWORKER_FACTORY,
  HighlightService,
} from '@casper-util/hightlight-webworker';
import { ResultService } from '../result/result.service';
import { PublicKeyComponent } from './public-key.component';

describe('PublicKeyComponent', () => {
  let component: PublicKeyComponent;
  let fixture: ComponentFixture<PublicKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicKeyComponent, HttpClientModule],
      providers: [
        HighlightService,
        DeployerService,
        ResultService,
        { provide: ENV_CONFIG, useValue: config },
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY,
          useValue: { HIGHLIGHT_WEBWORKER_FACTORY },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
