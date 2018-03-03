import { Injectable } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ErrormodalComponent } from '../errormodal/errormodal.component';

@Injectable()
export class ScanService {

  constructor(
    private _modalservice: ModalService
  ) { }
  showError() {
      const mycomponent = {component:ErrormodalComponent};
      let modal = this._modalservice.open('error',mycomponent);
  }
}
