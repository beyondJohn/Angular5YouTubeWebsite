import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {
  isactive: Boolean = false;
  closeResult: string = '';
  source: string = '';
  constructor(
    public _activemodal: NgbActiveModal,
    private _modalService: NgbModal
  ) { }
  close(componentname): void {
    // here we send back the name of the modal which is displaying modal.
    // Since this is a service called by multiple components
    // we will need to let component subscribers know which modal is getting closed
    // so that each component can act on or ignore when modals are closed
    // (written originally for the rewards service)

    //this.isClosedSubject.next(componentname);
  }
  openremote() {
    return this._modalService;
  }
  open(source: string, component: Object) {
    this.source = source;
    const componentref = component['component'];

    if (!this.isactive) {
      this.isactive = true;
      const modalref = this._modalService.open(componentref).result.then((result) => {
        console.log('service object listening for close event');
        this.isactive = false;
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.isactive = false;
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.close(source);
      });
      return modalref.then;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private isClosedResult(): string {
    return this.closeResult;
  }
}