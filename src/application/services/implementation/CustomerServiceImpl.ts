import { UniqueEntityID, Email, Phone } from 'domain/utils/Types';
import { Customer } from 'domain/customer/aggregators/Customer';
import {ICustomer} from "domain/customer/interfaces/ICustomer"
import {SignUpPayLoad} from 'application/payloads/SignUpPayload'
import { CustomerService } from "../CustomerService";
import { RuntypeBrand } from "runtypes";

export class CustomerServiceImpl implements CustomerService{
    async createCustomer(payload: SignUpPayLoad, countryCode: string): Promise<Customer> {
        return new Customer({ id: UniqueEntityID.check("ddd"), name: "customerId",  phone: Phone.check("Phone"),
        email: Email.check("Email@gmail.com"),
        password: "string",
        verified: true}, UniqueEntityID.check("ddd"))
    }
   
    getCustomer(customerId: UniqueEntityID): ICustomer {
        return new Customer(
            {
             id: UniqueEntityID.check("ddd"), name: "customerId",  phone: Phone.check("Phone"),
        email: Email.check("Email@gmail.com"),
        password: "string",
        verified: true}, UniqueEntityID.check("ddd")).getProps()
    }

}
