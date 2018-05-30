import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export const API_URL = new InjectionToken<string>('apiUrl');


@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {

  constructor(@Inject(API_URL) private apiUrl: string) {
    console.log('apiUrl: ' + apiUrl);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    request = request.clone({url: this.prepareUrl(request.url)});
    return next.handle(request);

  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    // url = this.isAbsoluteUrl(url) ? url : this.apiUrl + '/' + url;
    url = this.isAbsoluteUrl(url) ? url : this.apiUrl + '/' + url;
    console.log('URL: ' + url);
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
