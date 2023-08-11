import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnDestroy, OnInit {

  constructor(private modal: ModalService) {
  }
  ngOnDestroy(): void {
    this.modal.unregister('auth');
  }

  ngOnInit(): void {
    this.modal.register('auth');
  }
}
