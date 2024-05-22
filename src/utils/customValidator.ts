import { Constraints } from "src/interfaces/common-interfaces";


// Function to validate the values enter by user
// value should not be empty
// if value type is integer than it should not accept string, it should be not negative and it should have min max validation if provided in contraints
// if value is string then is should not accpet integer or number
export function checkValueType(type: string, value: string, constraints?:Constraints): {status:'INVALID', msg:string} | null {

  const intRegex = /^\d+$/;
  const floatRegex = /^\d+[.]\d+$/;

  if(type !== 'bool' && !value){
    return {status:'INVALID',msg: $localize`:@@101:Value should not be empty`};
  }

  if (type.toLowerCase() == 'float') {
    if (!floatRegex.test(value)) {
      return { status: 'INVALID', msg: $localize`:@@102:Value is not a valid ${type}` };
    } else if (constraints?.min && parseFloat(value) < constraints.min) {
      return { status: 'INVALID', msg: $localize`:@@103:Value is less than ${constraints.min}` };
    } else if (constraints?.max && parseFloat(value) > constraints.max) {
      return { status: 'INVALID', msg: $localize`:@@104:Value is greater than ${constraints.max}` };
    }
    return null;
  }

  if (type.toLowerCase() == 'integer' || type.toLowerCase() == 'int') {
    if(!intRegex.test(value)){
      return {status:'INVALID',msg: $localize`:@@102:Value is not a valid ${type}`};
    }else if(parseInt(value) < 0){
      return {status:'INVALID',msg: $localize`:@@105:Value should not be negative`};
    }else if(constraints?.min && parseInt(value) < constraints.min){
      return {status:'INVALID',msg: $localize`:@@103:Value is less than ${constraints.min}`};
    }else if(constraints?.max && parseInt(value) > constraints.max){
      return {status:'INVALID',msg: $localize`:@@104:Value is greater than ${constraints.max}`};;
    }
    return null
  }

  if (type.toLowerCase() == 'string' && (type.toLowerCase() !== typeof (value) || !isNaN(parseInt(value)))) {
    return {status:'INVALID',msg: $localize`:@@102:Value is not a valid ${type}`};

  }

  return null;
}