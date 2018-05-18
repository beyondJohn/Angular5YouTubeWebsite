import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrormodalComponent } from '../errormodal/errormodal.component';
import { CacheService } from '../services/cache.service';
import { CacheFactory } from 'cachefactory';

@Component({
  selector: 'app-away',
  templateUrl: './away.component.html',
  styleUrls: ['./away.component.css']
})
export class AwayComponent implements OnInit {

  constructor(
    private _router: Router,
    private _cache: CacheFactory,
    private _cacheS: CacheService
  ) { }
  cache;
  check;
  check1;
  ngOnInit() {
    let mycache = this._cacheS._cache;
    this.cache = mycache.exists('my-cache') ? mycache.get('my-cache')
      : mycache.createCache('my-cache', {
        maxAge: 60 * 60 * 1000,
        deleteOnExpire: 'aggressive'
      });
      this.check = this.cache.get("homecache") || "";
      this.check1 = "stophere to test cache, should have home cache avaiable";
  }
  showmodal() {
    
  }
  back() {
    this._router.navigate(['/home']);
  }
}
