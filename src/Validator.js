import * as schemas from './schemas.js';

class Validator {
  string() {
    return new schemas.String();
  }
}

export default Validator;