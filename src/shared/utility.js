export const updateObject = (oldObject,updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(!rules){
        return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLen) {
      isValid = +value.trim().length >= rules.minLen && isValid;
    }
    if(rules.isEmail){
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };