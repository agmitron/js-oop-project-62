import { expect, test } from '@jest/globals';
import Validator from './Validator.js';

test('Validator creates and contains .string() method', () => {
  const v = new Validator;

  expect(v).not.toBe(undefined);
  expect(v).toBeInstanceOf(Validator);
  expect(typeof v.string).toBe('function');
})

test('.string() creates a String schema with .contains, .isValid and .required methods', () => {
  const v = new Validator;
  const schema = v.string();

  expect(schema).not.toBe(undefined);
  expect(typeof schema.required).toBe('function');
  expect(typeof schema.isValid).toBe('function');
  expect(typeof schema.contains).toBe('function');
})

test('v.string().isValid(), .required()', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBe(true);
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);

  schema.required();

  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('hexlet')).toBe(true);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid('')).toBe(false);

  expect(schema.contains('what').isValid('what does the fox say')).toBe(true);
  expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false);

  expect(schema.isValid('what does the fox say')).toBe(false);
  // уже false, так как добавлена ещё одна проверка contains('whatthe')
})

test('.number().required(), .positive(), .range()', () => {
  const v = new Validator();

  const schema = v.number();

  expect(schema.isValid(null)).toBe(true);

  schema.required();

  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(7)).toBe(true);

  expect(schema.positive().isValid(10)).toBe(true);

  schema.range(-5, 5);

  expect(schema.isValid(-3)).toBe(false);
  expect(schema.isValid(5)).toBe(true);
})

test('v.array(), .required(), .sizeof()', () => {
  const v = new Validator();

  const schema = v.array();

  expect(schema.isValid(null)).toBe(true); // true

  schema.required();

  expect(schema.isValid(null)).toBe(false); // false
  expect(schema.isValid([])).toBe(true); // true
  expect(schema.isValid(['hexlet'])).toBe(true); // true

  schema.sizeof(2);

  expect(schema.isValid(['hexlet'])).toBe(false); // false
  expect(schema.isValid(['hexlet', 'code-basics'])).toBe(true); // true
})

test('v.object(), .shape({...})', () => {
  const v = new Validator();

  const schema = v.object();

  // Позволяет описывать валидацию для свойств объекта
  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: 'kolya', age: 100 })).toBe(true);
  expect(schema.isValid({ name: 'maya', age: null })).toBe(true);
  expect(schema.isValid({ name: '', age: null })).toBe(false);
  expect(schema.isValid({ name: 'ada', age: -5 })).toBe(false);
})

test('custom validators', () => {
  const v = new Validator();

  const fn1 = (value, start) => value.startsWith(start);
  // Метод добавления новых валидаторов
  // addValidator(type, name, fn)
  v.addValidator('string', 'startWith', fn1);

  // Новые валидаторы вызываются через метод test
  const schema1 = v.string().test('startWith', 'H');
  expect(schema1.isValid('exlet')).toBe(false); // false
  expect(schema1.isValid('Hexlet')).toBe(true); // true

  const fn2 = (value, min) => value >= min;
  v.addValidator('number', 'min', fn2);

  const schema2 = v.number().test('min', 5);
  expect(schema2.isValid(4)).toBe(false); // false
  expect(schema2.isValid(6)).toBe(true); // true
})
