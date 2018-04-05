import { Injectable } from '@angular/core';
import { CacheFactory } from 'cachefactory';

@Injectable()
export class CacheService {

  constructor(
    public _cache: CacheFactory
  ) { }
  init() {
    const cacheFactory = new CacheFactory();
    let newcache = this._cache.createCache('my-cache', {
      // 1 hour
      maxAge: 60 * 60 * 1000,
      deleteOnExpire: 'aggressive'
    });
  }
}
