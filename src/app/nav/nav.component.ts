import { Component } from '@angular/core';
import {ModalService} from "src/app/services/modal.service";
import {AuthService} from "src/app/services/auth.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public modal: ModalService, public authService: AuthService, private afAuth: AngularFireAuth) {}

  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

  async logout($event: Event) {
    $event.preventDefault();
    await this.afAuth.signOut();
  }

}
