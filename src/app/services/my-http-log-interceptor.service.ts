import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyHttpLogInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('authToken'); 
    // add a custom header
    console.log('inside interceptor');
    const customReq = request.clone({
      headers: request.headers.set('Authorization', 'Token token=' + token)
    });
console.log("customReq: ", customReq);
    // pass on the modified request object
    return next.handle(customReq);
  }

}
