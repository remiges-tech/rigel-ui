import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

function isBool(value:string){
  return value.toLowerCase() === 'true' || value.toLowerCase() === 'false'
}

export function checkValueType(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
  
      const type:string = formGroup.get('type')?.value;
      const value = formGroup.get('value')?.value;

      if(!type){
        return {typeIsRequired: true};
      }

      if(!value){
        return {valueIsRequired: true};
      }

      if(type.toLowerCase() == 'number'){
        if(isNaN(parseInt(value))){
          return { validation: true  };
        }
        if(parseInt(value) < 0){
          return { lessThanZero: true  };
        }
        return null;
      }

      if(type.toLowerCase() == 'integer' && isNaN(parseInt(value))){
        return {Validation: true}
      }

      if(type.toLowerCase() == 'string' && type.toLowerCase() !== typeof(value)){
        return {
          validation: true
        }
      }

      if (type.toLowerCase() == 'boolean' && !isBool(value) ) {
        return { validation: true  };
      }

      return null;
    };
  }