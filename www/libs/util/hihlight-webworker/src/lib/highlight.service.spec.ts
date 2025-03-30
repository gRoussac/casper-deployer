import { TestBed } from '@angular/core/testing';
import { HighlightService } from './highlight.service';
import { HIGHLIGHT_WEBWORKER_FACTORY } from './util-hihlight-webworker.token';

describe('HighlightService', () => {
  let service: HighlightService;
  const test = 'test',
    postMessage = jest.fn().mockResolvedValue(test),
    webWorker = { terminate: jest.fn() },
    promiseWorker = { postMessage };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HighlightService,
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY,
          useValue: jest.fn().mockReturnValue([webWorker, promiseWorker]),
        },
      ],
    });
    service = TestBed.inject(HighlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should highlightMessage', async () => {
    expect(await service.highlightMessage(test)).toStrictEqual(test);
  });

  it('highlightMessage should console on error', async () => {
    const spy = jest.spyOn(console, 'error');
    postMessage.mockRejectedValue(test);
    await service.highlightMessage(test);
    expect(spy).toHaveBeenNthCalledWith(1, test);
  });
});
