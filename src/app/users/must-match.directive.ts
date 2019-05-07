import {Directive, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, ValidationErrors, FormGroup} from '@angular/forms';


@Directive({
  selector: '[appMustMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true}]
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') mustMatch: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors {
    if (this.mustMatch) {
      const control = formGroup.controls[this.mustMatch[0]];
      const matchingControl = formGroup.controls[this.mustMatch[1]];

      // return null if controls haven't initialised yet
      if (!control || !matchingControl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    } else {
      return null;
    }
  }
}
