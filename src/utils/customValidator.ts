function isBool(value: string) {
  return value.toLowerCase() === 'true' || value.toLowerCase() === 'false'
}

export function checkValueType(type: string, value: string): 'INVALID' | null {

  if (type.toLowerCase() == 'number') {
    if (isNaN(parseInt(value))) {
      return 'INVALID';
    }
    if (parseInt(value) < 0) {
      return 'INVALID';
    }
    return null;
  }

  if ((type.toLowerCase() == 'integer' || type.toLowerCase() == 'int') && isNaN(parseInt(value))) {
    return 'INVALID'
  }

  if (type.toLowerCase() == 'string' && (type.toLowerCase() !== typeof (value) || !isNaN(parseInt(value)))) {
    return 'INVALID'
  }

  if ((type.toLowerCase() == 'boolean' || type.toLowerCase() == 'bool') && !isBool(value)) {
    return 'INVALID'
  }

  return null;
}