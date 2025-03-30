import { TestBed } from '@angular/core/testing';
import { DEPLOYER_TOKEN } from '@casper-util/wasm';
import { AppComponent } from './app.component';
import { UsersService } from '@casper-data/data-access-users';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ENV_CONFIG, config } from '@casper-util/config';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

jest.mock('casper-rust-wasm-sdk', () => ({
  CasperWallet: jest.fn().mockImplementation(() => ({})),
}));

describe('AppComponent', () => {
  let mockHttpClient: Partial<HttpClient>;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn().mockReturnValue(of({})), // Mock HTTP methods
      post: jest.fn().mockReturnValue(of({})),
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent],
      providers: [
        UsersService,
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: DEPLOYER_TOKEN, useValue: { hello: jest.fn() } },
        { provide: ENV_CONFIG, useValue: config },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  xit('should ngOnInit', () => {
    // TODO
  });
  xit('should connect', () => {
    //
  });
  xit('should refreshPurse', () => {
    //
  });
});
