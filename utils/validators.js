const { BASE_URL } = require('../config');

const UrlRegExp = /^((http|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,12}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
const SafeCodeRegExp = new RegExp(/^[a-zA-Z0-9-]+$/);

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_URL = 'URL';
const VALIDATOR_TYPE_SAFECODE = 'SAFECODE';

exports.VALIDATOR_REQUIRE = ValidatorFunctionType = () => ({
  type: VALIDATOR_TYPE_REQUIRE,
});
exports.VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
exports.VALIDATOR_MINLENGTH = ValidatorFunctionType = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val,
});
exports.VALIDATOR_MAXLENGTH = ValidatorFunctionType = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val,
});
exports.VALIDATOR_MIN = ValidatorFunctionType = (val) => ({
  type: VALIDATOR_TYPE_MIN,
  val,
});
exports.VALIDATOR_MAX = ValidatorFunctionType = (val) => ({
  type: VALIDATOR_TYPE_MAX,
  val,
});
exports.VALIDATOR_URL = ValidatorFunctionType = () => ({
  type: VALIDATOR_TYPE_URL,
});
exports.VALIDATOR_SAFECODE = ValidatorFunctionType = () => ({
  type: VALIDATOR_TYPE_SAFECODE,
});

exports.validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= (validator.val || 0);
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= (validator.val || Infinity);
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= (validator.val || 0);
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= (validator.val || Infinity);
    }
    if (validator.type === VALIDATOR_TYPE_URL) {
      isValid =
        isValid &&
        UrlRegExp.test(value) &&
        value.toLowerCase().indexOf(BASE_URL.replace(/^https?:\/\//, '')) ===
          -1;
    }
    if (validator.type === VALIDATOR_TYPE_SAFECODE) {
      isValid = isValid && (value === '' || SafeCodeRegExp.test(value));
    }
  }
  return isValid;
};
