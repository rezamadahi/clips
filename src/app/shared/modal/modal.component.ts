import {Component, Input, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {ModalService} from "src/app/services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modalId: string = '';

  constructor(public modalService: ModalService, private el: ElementRef) {
  }

  ngOnInit(): void {
    // this.modalService.register(this.modalId);
    document.body.appendChild(this.el.nativeElement);
  }

  closeModal() {
    this.modalService.toggleModal(this.modalId);
  }

  ngOnDestroy() {
    document.body.removeChild(this.el.nativeElement);
  }

}
