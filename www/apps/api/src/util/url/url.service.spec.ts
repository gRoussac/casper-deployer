import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;
  const test = 'test';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should isValidHttpUrl', () => {
    expect(service.shortUrl('')).toStrictEqual('');
    expect(service.shortUrl(test)).toStrictEqual(test);
    expect(service.shortUrl('http://127.0.0.1:11101/rpc')).toStrictEqual(
      'http://127.0.0.1:11101/rpc',
    );
    expect(
      service.shortUrl('http://127.0.0.1:11101/rpc?test=test'),
    ).toStrictEqual('http://127.0.0.1:11101/rpc');
  });

  it('should shortUrl', () => {
    expect(service).toBeDefined();
    expect(service.isValidHttpUrl('')).toStrictEqual(false);
    expect(service.isValidHttpUrl(test)).toStrictEqual(false);
    expect(service.isValidHttpUrl('http://127.0.0.1:11101/rpc')).toStrictEqual(
      true,
    );
    expect(service.isValidHttpUrl('https://127.0.0.1:11101/rpc')).toStrictEqual(
      true,
    );
  });
});
