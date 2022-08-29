class Schema {
  constructor() {
    this.rules = [];
  }

  isValid(value) {
    return this.rules.every(fn => fn(value));
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

