import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyHttpLogInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('authToken');
    // add a custom header
    console.log('inside interceptor');
    let customReq: HttpRequest<any> = undefined;
    if (request.url.indexOf('pse.online.scea.com') !== -1) {
      const headers = request.headers.set('Authorization', 'Token token=' + token) 
      customReq = request.clone({
        headers
      });
      return next.handle(customReq).catch(() => {
        request.clone({
          headers
        });
        return next.handle(customReq);
      });
    }
    else {
       const headers = request.headers.set('Client-ID', 'z1hu6d9wa4s6my6oq4vrazewza5nlt')
      .set('Accept', 'application/vnd.twitchtv.v5+json')
      customReq = request.clone({
        headers
      });
      return next.handle(customReq).catch(() => {
        
        return next.handle(customReq);
      });

    }
    // pass on the modified request object
    
  }

}
