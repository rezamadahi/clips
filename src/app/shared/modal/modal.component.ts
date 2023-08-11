import {Component, Input, OnInit, ElementRef } from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

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

}
