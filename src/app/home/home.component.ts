import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScanService } from '../services/scan.service';
import { ErrormodalComponent } from '../errormodal/errormodal.component';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _scan: ScanService,
    private _activemodal: NgbActiveModal,
    private _modalService: NgbModal,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  showmodal() {
    this._scan.showError();
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
