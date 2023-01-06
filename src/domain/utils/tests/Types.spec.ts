import {describe, expect, test} from '@jest/globals';
import {Phone, Email, UniqueEntityID} from '../Types';
import { hash, hashSync } from 'bcryptjs';
import {v1} from "uuid"
import { ValidationError } from 'runtypes';

const data = {
  email: "email@email.com",
  wrongEmail: "email.email.com",
  uniqueEntityID: v1(),
  wrongUniqueEntityID: "dddxxxsjsjssk"
}
  
describe("[ Domain Utils > Types ] Email ", () => {
  test('Email type should not be safe when email value is invalid', () => {
    try{
      Email.check(data.wrongEmail)
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    } 
  });

  test('Email type should be safe when email value is valid', () => {
    expect(Email.check(data.email)).toBeTruthy();
  });
});

describe("[ Domain Utils > Types ] UniqueEntityID ", () => {
  test('UniqueEntityId type should be safe when email value is valid', () => {
    expect(UniqueEntityID.check(data.uniqueEntityID)).toBeTruthy();
  });

  test('UniqueEntityId type should not be safe when email value is invalid', () => {
    try{
      UniqueEntityID.check(data.wrongUniqueEntityID)
    } catch (e) { 
      expect(e).toBeInstanceOf(ValidationError);
    }
  });
});