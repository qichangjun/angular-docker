import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors,AsyncValidatorFn } from '@angular/forms';

export class CustomValidator {
    static validateConfirmPassword: ValidatorFn = (control: AbstractControl):
        ValidationErrors => {
        let _form = control.parent
        if (!_form) {
            return null
        }
        return (control.value !== _form.get('password').value) ?
            { 'notSame': true } : null;
    };

    static validateCounterRange: ValidatorFn = (control: AbstractControl):
        ValidationErrors => {
        return (control.value.length == 0) ?
            { 'lengthError': { current: control.value, min: 1 } } : null;
    };
}