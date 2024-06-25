import { ValidationErrors, AbstractControl } from "@angular/forms";

export class RegisterValidators {

  static match(group: AbstractControl): ValidationErrors | null {
    const control = group.get('password');
    const matchingControl = group.get('confirmPassword');

    if (!control || !matchingControl) {
      return { controlNotFound: false };
    }

    return control.value === matchingControl.value ? null : { noMatch: true };
  }
}

// new RegisterValidators.match() <~ Without static
// RegisterValidators.match() <~ With static
