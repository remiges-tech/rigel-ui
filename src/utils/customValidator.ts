import { Constraints } from "src/models/common-interfaces";


// Function to validate the values enter by user
// value should not be empty
// if value type is integer than it should not accept string, it should be not negative and it should have min max validation if provided in contraints
// if value is string then is should not accpet integer or number
export function checkValueType(type: string, value: string, constraints?:Constraints): {status:'INVALID', msg:string} | null {

  if(type !== 'bool' && !value){
    return {status:'INVALID',msg: 'Value should not be empty'};
  }

  if (type.toLowerCase() == 'integer' || type.toLowerCase() == 'int') {
    if(isNaN(parseInt(value))){
      return {status:'INVALID',msg: 'Value is not a integer'};
    }else if(parseInt(value) < 0){
      return {status:'INVALID',msg: 'Value should not be negative'};
    }else if(constraints && constraints.min && parseInt(value) < constraints.min){
      return {status:'INVALID',msg: `Value is less than ${constraints.min}`};
    }else if(constraints && constraints.max && parseInt(value) > constraints.max){
      return {status:'INVALID',msg: `Value is greater than ${constraints.max}`};;
    }
    return null
  }

  if (type.toLowerCase() == 'string' && (type.toLowerCase() !== typeof (value) || !isNaN(parseInt(value)))) {
    return {status:'INVALID',msg: 'Value is not a string'};

  }

  return null;
}