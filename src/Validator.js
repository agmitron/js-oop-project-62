import * as schemas from './schemas.js';

class Validator {
  string() {
    return new schemas.StringSchema();
  }

  number() {
    return new schemas.NumberSchema();
  }

  array() {
    return new schemas.ArraySchema();
  }

  object() {
    return new schemas.ObjectSchema();
  }
}

export default Validator;