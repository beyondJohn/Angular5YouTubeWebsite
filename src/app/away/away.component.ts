import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScanService } from '../services/scan.service';
import { ErrormodalComponent } from '../errormodal/errormodal.component';

@Component({
  selector: 'app-away',
  templateUrl: './away.component.html',
  styleUrls: ['./away.component.css']
})
export class AwayComponent implements OnInit {

  constructor(
    private _scan: ScanService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  showmodal() {
    this._scan.showError();
  }
  back(){
    this._router.navigate(['/home']);
  }
}
