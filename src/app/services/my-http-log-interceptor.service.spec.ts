import { TestBed, inject } from '@angular/core/testing';

import { MyHttpLogInterceptorService } from './my-http-log-interceptor.service';

describe('MyHttpLogInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyHttpLogInterceptorService]
    });
  });

  it('should be created', inject([MyHttpLogInterceptorService], (service: MyHttpLogInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
