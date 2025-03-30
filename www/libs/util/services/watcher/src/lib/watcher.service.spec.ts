import { TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-util/config';
import { TOASTER_TOKEN } from '@casper-util/toaster';

import { WatcherService } from './watcher.service';
import { SDK_TOKEN } from '@casper-util/wasm';

describe('WatcherService', () => {
  let service: WatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WatcherService,
        { provide: TOASTER_TOKEN, useValue: {} },
        { provide: ENV_CONFIG, useValue: config },
        { provide: SDK_TOKEN, useValue: {} },
      ],
    });
    service = TestBed.inject(WatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
