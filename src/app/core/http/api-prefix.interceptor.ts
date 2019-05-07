import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@env/environment';
import {Credentials} from '@app/core';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  private _credentials: Credentials | null;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let setHeaders: any = {};

    if (!/^(http|https):/i.test(request.url)) {
      const savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
      if (savedCredentials) {
        this._credentials = JSON.parse(savedCredentials);
        setHeaders = {
          Authorization: `Bearer ${this._credentials.tokens.accessToken}`
        };
      }
      request = request.clone({setHeaders, url: environment.serverUrl + request.url});
    }
    return next.handle(request);
  }
}
