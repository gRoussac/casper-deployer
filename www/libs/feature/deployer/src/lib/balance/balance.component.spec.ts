import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ENV_CONFIG, config } from '@casper-util/config';
import { HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-util/hightlight-webworker';
import { ResultService } from '../result/result.service';
import { BalanceComponent } from './balance.component';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceComponent, HttpClientModule],
      providers: [
        ResultService,
        {
          provide: ENV_CONFIG, useValue: config
        },
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY, useValue: {
            HIGHLIGHT_WEBWORKER_FACTORY
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
