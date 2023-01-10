import {describe, expect, test} from '@jest/globals';
import {Customer} from '../Customer';
import { hashSync } from 'bcryptjs';
import {v1} from "uuid"
import { UniqueEntityID } from '../../../utils/Types';

const salt = 12
const password: string = "string"
const wrongPassword: string = "trings"
const customer = Customer.getInstance({
  customerId: v1(), 
  firstName: "customerId",
  lastName: "customerId",
  email: "email@gmail.com",
  phoneNumber: "08135606725",
  password: hashSync(password, salt),
  verified: true})

const customer2 = Customer.getInstance({
  customerId: v1(), 
  firstName: "customerId",
  lastName: "customerId",
  phone: "phone",
  phoneNumber: "08135606725",
  email: "email@gmail.com",
  password: hashSync(password, salt),
  verified: true})

  describe("[Customer Domain > Aggregate] Customer ", () => {
    test('Customer Entity should be same when id, props and tag are same', () => {
      expect(customer.equals(customer)).toBeTruthy();
    });
  
    test('Customer Entity should be different when props are same but id and tag are different', () => {
      expect(customer.equals(customer2)).toBeFalsy();
    });
  });

describe("[Customer Domain > Aggregate] Customer.checkPassword ", () => {
  test('checkPassword should be false when password is invalid', () => {
    expect(customer.checkPassword(wrongPassword)).toBeFalsy();
  });

  test('checkPassword should be true when password is valid', () => {
    expect(customer.checkPassword(password)).toBeTruthy();
  });
});

describe("[Customer Domain > Aggregate ] Customer.login", () => {
  test('login should fail on invalid password', () => {
    const customerLoginOperation = customer.login(wrongPassword);
    expect(customerLoginOperation.getProps().status.success).toBeFalsy();
  });

  test('checkPassword should return true when password is invalid', () => {
    const customerLoginOperation = customer.login(password);
    expect(customerLoginOperation.getProps().status.success).toBeTruthy();
  });
});