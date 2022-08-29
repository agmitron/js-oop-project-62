export class String {
  rules = [];

  isValid(string) {
    return this.rules.every(fn => fn(string));
  }

  contains(substring) {
    this.rules = [...this.rules, string => string.includes(substring)];
    return this;
  }

  required() {
    this.rules = [...this.rules, Boolean];
    return this;
  }
}