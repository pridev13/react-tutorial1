export const updateObject = (oldObj, updValues) => {

  return {
    ...oldObj,
    ...updValues
  }

}

export const checkValidity = (value, rules) => {

  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = (value.trim() !== '' && isValid);
  }

  if (rules.minLength) {
    isValid = (value.trim().length >= rules.minLength && isValid);
  }

  if (rules.maxLength) {
    isValid = (value.trim().length <= rules.maxLength && isValid);
  }

  if (rules.isEmail) {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;

}