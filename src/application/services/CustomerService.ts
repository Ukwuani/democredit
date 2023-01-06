import {UniqueEntityID, Email, Phone} from "domain/utils/Types"
import { Customer } from 'domain/customer/aggregators/Customer';
import {ICustomer} from "domain/customer/interfaces/ICustomer"
import {SignUpPayLoad} from 'application/payloads/SignUpPayload'

export abstract class CustomerService {
    
    abstract createCustomer(payload: SignUpPayLoad, countryCode: string): Promise<Customer>;
    // abstract findCustomerByPhoneNo(phone: Phone): Customer;
    abstract getCustomer(customerId: UniqueEntityID): ICustomer;
    // abstract getByCustomerEmailAddress(emailAddress: Email): Customer;

    /**
     * Create a customer phone no in int'l format of the provided country code
     * @param phoneNo
     * @param countryCode
     * @return string 
     */
    // abstract getCustomerPhoneNo(phone: string, countryCode: string): string;
}
