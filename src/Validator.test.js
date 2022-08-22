import { expect, test } from '@jest/globals';
import Validator from './Validator.js';

test('Validator creates and contains .string(), .isValid(), .contains() methods', () => {
  const v = new Validator;

  expect(v).not.toBe(undefined);
  expect(v).toBeInstanceOf(Validator);
  expect(typeof v.string).toBe('function');
  expect(typeof v.isValid).toBe('function');
  expect(typeof v.contains).toBe('function');
})