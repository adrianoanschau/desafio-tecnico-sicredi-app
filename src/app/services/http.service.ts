import {Inject, Injectable, InjectionToken, Injector, Optional, Type} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiInterceptor} from './api.interceptor';
import {ErrorHandlerInterceptor} from './error-handler.interceptor';
import {CacheInterceptor} from './cache.interceptor';

declare module '@angular/common/http/http' {
  export interface HttpClient {
    cache(forceUpdate?: boolean): HttpClient;
    skipErrorHandler(): HttpClient;
    disableApiPrefix(): HttpClient;
  }
}

class HttpInterceptorHandler implements HttpHandler {

  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {

  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private readonly interceptors: HttpInterceptor[] = [],
  ) {
    super(httpHandler);
    if (!this.interceptors) {
      this.interceptors = [
        this.injector.get(ApiInterceptor),
        this.injector.get(ErrorHandlerInterceptor),
      ];
    }
  }

  cache(forceUpdate?: boolean): HttpClient {
    const cacheInterceptor = this.injector
      .get(CacheInterceptor as Type<CacheInterceptor>)
      .configure({ update: forceUpdate });
    return this.addInterceptor(cacheInterceptor);
  }

  skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorHandlerInterceptor);
  }

  request(method?: any, url?: string, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.httpHandler
    );
    return new HttpClient(handler).request(method, url, options);
  }

  private addInterceptor(cacheInterceptor: CacheInterceptor) {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.concat([cacheInterceptor])
    );
  }

  private removeInterceptor(interceptorType: Type<HttpInterceptor>): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType))
    );
  }

}
