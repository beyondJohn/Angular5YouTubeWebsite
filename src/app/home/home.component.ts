import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrormodalComponent } from '../errormodal/errormodal.component';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CacheService } from '../services/cache.service';
import { CacheFactory } from 'cachefactory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _activemodal: NgbActiveModal,
    private _modalService: NgbModal,
    private _router: Router,
    private _cache: CacheFactory,
    private _cacheS: CacheService
  ) { }
  cache
  ngOnInit() {
    let mycache = this._cacheS._cache;
    
    this.cache = mycache.exists('my-cache') ? mycache.get('my-cache')
      : mycache.createCache('my-cache', {
        maxAge: 60 * 60 * 1000,
        deleteOnExpire: 'aggressive'
      });
      this.cache.put("homecache", "hi there, test cache from home component");
  }

  showmodal() {
  }
  showmodal1() {
    this._modalService.open(ErrormodalComponent).result.then((result) => {
      console.log('service object listening for close event');

    }, (reason) => {
    });;
  }
  back() {
    this._router.navigate(['/away'])
  }

}
