import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeployerService } from '@casper-data/data-access-deployer';
import { ENV_CONFIG, config } from '@casper-util/config';
import {
  HighlightService,
  HIGHLIGHT_WEBWORKER_FACTORY,
} from '@casper-util/hightlight-webworker';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { TOASTER_TOKEN } from '@casper-util/toaster';
import { ResultService } from '../result/result.service';
import { StateRootHashComponent } from './state-root-hash.component';
import { StorageService } from '@casper-util/storage';

describe('StateRootHashComponent', () => {
  let component: StateRootHashComponent;
  let fixture: ComponentFixture<StateRootHashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateRootHashComponent, HttpClientModule],
      providers: [
        DeployerService,
        HighlightService,
        StorageService,
        ResultService,
        { provide: ENV_CONFIG, useValue: config },
        HighlightService,
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY,
          useValue: { HIGHLIGHT_WEBWORKER_FACTORY },
        },
        { provide: TOASTER_TOKEN, useValue: {} },
        RouteurHubService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StateRootHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
