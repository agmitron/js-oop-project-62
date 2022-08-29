import * as schemas from './schemas.js';

class Validator {
  string() {
    return new schemas.String();
  }

  number() {
    return new schemas.Number();
  }
}

export default Validator;