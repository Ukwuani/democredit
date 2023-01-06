// import { ApiError } from '@nc/utils/errors';

import { Router } from 'express';
import {Customer} from "domain/customer/aggregators/Customer"
import { CustomerService } from 'src/application/services/CustomerService';
import { CustomerServiceImpl } from 'src/application/services/implementation/CustomerServiceImpl';
import { run } from 'application/config/Async';
import { ApiError } from 'application/config/Exception';
import { APIContext, Context } from '../config/APIWrapper';
import { SignUpPayLoad } from '../payloads/SignUpPayload';


const customerService: CustomerService = new CustomerServiceImpl()
export class OnboardingController{

  static async createCustomer(ctx: Context): Promise<Customer>{
    return customerService.createCustomer(ctx.params as SignUpPayLoad, "234")
  }
}