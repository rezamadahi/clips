import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import IUser from "src/app/models/user.model";
import { RegisterValidators } from "src/app/user/validators/register-validators";
import {EmailTaken} from "src/app/user/validators/email-taken";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  emailController = new FormControl('', [
    Validators.email,
    Validators.required
  ], [this.emailTaken.validate]);
  nameController = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  passwordController = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$')
  ]);
  confirmPasswordController = new FormControl('', [
    Validators.required
  ]);
  phoneNumberController = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ]);
  ageController = new FormControl(18, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]);

  registerForm = new FormGroup({
    email: this.emailController,
    name: this.nameController,
    password: this.passwordController,
    confirmPassword: this.confirmPasswordController,
    phoneNumber: this.phoneNumberController,
    age: this.ageController,
  }, [ RegisterValidators.match('password', 'confirmPassword') ]);

  alertMsg = 'Please wait! Your account is being created.';
  showAlert = false;
  alertColor = 'blue';
  inSubmission = false;

  constructor(private authService: AuthService, private emailTaken: EmailTaken) {}

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
