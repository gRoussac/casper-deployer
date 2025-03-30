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
import { QueryGlobalStateComponent } from './query-global-state.component';
import { StorageService } from '@casper-util/storage';

describe('QueryGlobalStateComponent', () => {
  let component: QueryGlobalStateComponent;
  let fixture: ComponentFixture<QueryGlobalStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryGlobalStateComponent, HttpClientModule],
      providers: [
        HighlightService,
        StorageService,
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

    fixture = TestBed.createComponent(QueryGlobalStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
