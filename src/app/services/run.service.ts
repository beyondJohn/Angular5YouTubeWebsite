import { Injectable } from '@angular/core';
import { CacheService } from '../services/cache.service';

@Injectable()
export class RunService {

  constructor(
    private _cache: CacheService
  ) { }
  init(){
    this._cache.init();
  }
}
