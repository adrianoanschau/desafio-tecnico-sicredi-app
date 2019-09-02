import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import {HttpCacheService} from './http-cache.service';
import {HttpClient, HttpInterceptor} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ErrorHandlerInterceptor} from './error-handler.interceptor';
import {CacheInterceptor} from './cache.interceptor';
import {ApiInterceptor} from './api.interceptor';
import {Type} from '@angular/core';

describe('HttpService', () => {
  let httpCacheService: HttpCacheService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let interceptors: HttpInterceptor[];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ErrorHandlerInterceptor,
          CacheInterceptor,
          ApiInterceptor,
          HttpCacheService,
          {
            provide: HttpClient,
            useClass: HttpService,
          }
        ],
    });
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController as Type<HttpTestingController>);
    httpCacheService = TestBed.get(HttpCacheService);

    const realRequest = http.request;
    spyOn(HttpService.prototype, 'request').and.callFake(function(
      this: any,
      method: string,
      url: string,
      options?: any,
    ) {
      interceptors = this.interceptos;
      return realRequest.call(this, method, url, options);
    });
  });

  afterEach(() => {
    httpCacheService.cleanCache();
    httpMock.verify();
  });

  it('should use error handler, API and no cache by default', () => {
    const request = http.get('/toto');

    request.subscribe(() => {
      expect(http.request).toHaveBeenCalled();
      expect(interceptors.some(i => i instanceof ApiInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });

  it('should use cache', () => {
    const request = http.cache().get('/toto');

    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ApiInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });

  it('should skip error handler', () => {
    const request = http.skipErrorHandler().get('/toto');

    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ApiInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeFalsy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });
});
