import { Component, OnInit } from '@angular/core';
import { ScanService } from '../services/scan.service';
import { ErrormodalComponent } from '../errormodal/errormodal.component';

@Component({
  selector: 'app-away',
  templateUrl: './away.component.html',
  styleUrls: ['./away.component.css']
})
export class AwayComponent implements OnInit {

  constructor(
    private _scan: ScanService
  ) { }

  ngOnInit() {
  }
  showmodal() {
    this._scan.showError();
  }
}
