import { TestBed } from '@angular/core/testing';

import { CacheInterceptorService } from './cache.interceptor';

describe('CacheInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheInterceptorService = TestBed.get(CacheInterceptorService);
    expect(service).toBeTruthy();
  });
});
