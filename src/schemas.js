class Schema {
  constructor() {
    this.rules = [];
  }

  isValid(value) {
    return this.rules.every(fn => fn(value));
  }
}

export class String extends Schema {
  contains(substring) {
    this.rules = [...this.rules, string => string.includes(substring)];
    return this;
  }

  required() {
    this.rules = [...this.rules, Boolean];
    return this;
  }
}

export class Number extends Schema {
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
