import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import IUser from "src/app/models/user.model";
import { RegisterValidators } from "src/app/user/validators/register-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$')]),
    confirmPassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    age: new FormControl(18, [Validators.required, Validators.min(18), Validators.max(120)]),
  }, [ RegisterValidators.match ]);

  alertMsg = 'Please wait! Your account is being created.';
  showAlert = false;
  alertColor = 'blue';
  inSubmission = false;

  constructor(private authService: AuthService) {}

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.authService.createUser(this.registerForm.value as IUser);
    } catch (e) {
      console.log(e);
      this.alertMsg = 'An error occurred.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }

}
