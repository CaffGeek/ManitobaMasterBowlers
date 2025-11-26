import { Directive, Injectable, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Observable, map, catchError, of } from 'rxjs';

//see: https://angular.io/guide/form-validation#implementing-a-custom-async-validator

@Injectable({ providedIn: 'root' })
export class BowlerExistsValidator implements AsyncValidator {
  constructor(private api: ApiService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.api.bowlers$()
      .pipe(
        map(bowlers => bowlers.filter(x => x.Name === control.value).length === 1 ? null : { 
          message: `${control.value} is not found`,
          type: 'MissingBowler',
        }),
        catchError(() => of(null))
      );
  }
}

@Directive({
  selector: '[appBowlerExists]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => BowlerExistsValidatorDirective), multi: true}],
  standalone: false,
})
export class BowlerExistsValidatorDirective implements Validator {
  constructor(private validator: BowlerExistsValidator) { }
  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
