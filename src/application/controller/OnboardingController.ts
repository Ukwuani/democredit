// import { ApiError } from '@nc/utils/errors';

import { Router } from 'express';
import {Customer} from "domain/customer/aggregators/Customer"
import { CustomerService } from 'src/application/services/CustomerService';
import { run } from 'application/config/Async';
import { APIError, BadRequest } from 'application/config/Exception';
import { APIContext, Context } from '../config/APIWrapper';
import { SignUpPayLoad } from '../payloads/SignUpPayload';
import { APIErrorType } from '../config/Exception';
import { CustomerServiceImpl } from 'src/application/services/implementation/CustomerServiceImpl';
import {CustomerRepository} from "infrastructure/repository/CustomerRepository"
import { OnboardingValidator } from 'application/validators/OnboardingValidator';
import { LoginPayLoad } from '../payloads/LoginPayload';

//could be injected with a lib
const customerRepository = new CustomerRepository()
const onboardingValidator = new OnboardingValidator()
const customerService: CustomerService = new CustomerServiceImpl(customerRepository, onboardingValidator)



export class OnboardingController{

  static async createCustomer(ctx: Context): Promise<Customer> {
      return await customerService.createCustomer(ctx.params as SignUpPayLoad, "NGN")
  }

  static async listCustomer(ctx: Context){
    return await customerService.getAllCustomers()
  }

  static async login(ctx: Context){
    return await customerService.login(ctx.params as LoginPayLoad)
  }
}