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