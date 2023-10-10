const validators = {
  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  },
  isEmptyArray(arr) {
    return arr.length === 0 || arr[0] === "";
  },
  isFalsy(val) {
    return Boolean(val);
  },
  validateString(string) {
    return string.length > 0;
  },
  validateNumber(num) {
    return typeof num === "number";
  },
};

export default validators;
