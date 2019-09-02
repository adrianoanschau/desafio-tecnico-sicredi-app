import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subscriber} from 'rxjs';
import {HttpCacheService} from './http-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {

  private forceUpdate = false;

  constructor(
    private httpCacheService: HttpCacheService
  ) {}

  configure(options?: { update?: boolean } | null): CacheInterceptor {
    const instance = new CacheInterceptor(this.httpCacheService);
    if (options && options.update) {
      instance.forceUpdate = true;
    }
    return instance;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    return new Observable((subscriber: Subscriber<HttpEvent<any>>) => {
      const cachedData = this.forceUpdate ? null : this.httpCacheService.getCacheData(req.urlWithParams);
      if (cachedData !== null) {
        subscriber.next(new HttpResponse(cachedData as object));
        subscriber.complete();
      } else {
        next.handle(req).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.httpCacheService.setCacheData(req.urlWithParams, event);
            }
            subscriber.next(event);
          },
          error => subscriber.error(error),
          () => subscriber.complete()
        );
      }
    });
  }
}
