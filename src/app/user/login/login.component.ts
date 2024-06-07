import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$';

  login() {
    console.log(this.credentials);
  }

}
