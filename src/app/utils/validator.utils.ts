import { AbstractControl, ValidatorFn } from '@angular/forms';
import { StringUtils } from 'src/app/utils/string.utils';

export abstract class ValidadorUtil {
	static validatePassword(): ValidatorFn{
		return (control: AbstractControl): any => {
			return !StringUtils.hasSpace(control.value)
				? null
				: { invalidpassword: true };
		};
	}
}
