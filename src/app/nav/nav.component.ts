import {Component} from '@angular/core';
import {ModalService} from "src/app/services/modal.service";
import {AuthService} from "src/app/services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(
    public modal: ModalService,
    public authService: AuthService,
  ) {
  }

  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

}
