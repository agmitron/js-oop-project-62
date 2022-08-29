class Schema {
  constructor(customRules) {
    this.rules = [];
    this.customRules = customRules;
  }

  isValid(value) {
    return this.rules.every(fn => fn(value));
  }

  test(rule, param) {
    const customRule = this.customRules[rule];

    if (customRule) {
      const validate = (value) => customRule(value, param);
      this.rules = [...this.rules, validate];
    }

    return this;
  }
}

export class StringSchema extends Schema {
  contains(substring) {
    this.rules = [...this.rules, string => string.includes(substring)];
    return this;
  }

  required() {
    this.rules = [...this.rules, Boolean];
    return this;
  }
}

export class NumberSchema extends Schema {
  required() {
    this.rules = [...this.rules, num => typeof num === 'number'];
    return this;
  }

  positive() {
    this.rules = [...this.rules, num => num >= 0];
    return this;
  }

  range(from, to) {
    this.rules = [...this.rules, num => num >= from && num <= to];
    return this;
  }
}

export class ArraySchema extends Schema {
  required() {
    this.rules = [...this.rules, Array.isArray];
    return this;
  }

  sizeof(length) {
    this.rules = [...this.rules, array => array?.length === length];
    return this;
  }
}

export class ObjectSchema extends Schema {
  shape(shapeSchema) {
    const validateShape = shape => Object.entries(shapeSchema)
      .reduce((result, [key, schema]) => result && schema.isValid(shape[key]), true)

    this.rules = [...this.rules, validateShape];
    return this;
  }
}
