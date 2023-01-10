import {UniqueEntityID, Email, Phone} from "domain/utils/Types"
import { Customer } from 'domain/customer/aggregators/Customer';
import {ICustomer} from "domain/customer/interfaces/ICustomer"
import {SignUpPayLoad} from 'application/payloads/SignUpPayload'
import {LoginPayLoad} from "application/payloads/LoginPayload"

export abstract class CustomerService {
    
    abstract createCustomer(payload: SignUpPayLoad, countryCode: string): Promise<Customer>;
    // abstract findCustomerByPhoneNo(phone: Phone): Customer;
    abstract getAllCustomers(): Promise<any>;
    abstract getCustomer(customerId: UniqueEntityID): Promise<any>;
    abstract login(payload: LoginPayLoad): Promise<any>;
    // abstract getByCustomerEmailAddress(emailAddress: Email): Customer;

    /**
     * Create a customer phone no in int'l format of the provided country code
     * @param phoneNo
     * @param countryCode
     * @return string 
     */
    // abstract getCustomerPhoneNo(phone: string, countryCode: string): string;
}
