import { Injectable } from '@angular/core';
import { CacheService } from '../services/cache.service';

@Injectable()
export class RunService {
  constructor(
    private _cache: CacheService
  ) { }
  token;
  init(){
    this._cache.init();
    const lastpath = localStorage.getItem('psnlastpath') || '/';
    if (window.location.href.indexOf('consumer_token=') !== -1) {
      this.token = window.location.href.substr(window.location.href.indexOf('consumer_token') + 15);
      localStorage.setItem('authToken', this.token);
      window.location.href = window.location.href.split("?")[0] + lastpath;
    } else if (window.location.href.indexOf("consumer_errors") !== -1) {
      window.location.href = window.location.href.split("?")[0] + "" + lastpath;
    }
  }
}
