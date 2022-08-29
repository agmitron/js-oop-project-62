import * as schemas from './schemas.js';

class Validator {
  customRules = {
    string: {},
    number: {},
    array: {},
    object: {}
  };

  string() {
    return new schemas.StringSchema(this.customRules.string);
  }

  number() {
    return new schemas.NumberSchema(this.customRules.number);
  }

  array() {
    return new schemas.ArraySchema(this.customRules.array);
  }

  object() {
    return new schemas.ObjectSchema(this.customRules.object);
  }

  addValidator(type, name, fn) {
    this.customRules[type][name] = fn;
  }
}

export default Validator;