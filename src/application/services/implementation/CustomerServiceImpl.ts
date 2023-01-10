import { UniqueEntityID, Email, Phone } from 'domain/utils/Types';
import { Customer } from 'domain/customer/aggregators/Customer';
import {ICustomer} from "domain/customer/interfaces/ICustomer"
import {SignUpPayLoad} from 'application/payloads/SignUpPayload'
import { CustomerService } from "../CustomerService";
import {CustomerRepository} from "infrastructure/repository/CustomerRepository"
import { RuntypeBrand } from "runtypes";
import { OnboardingValidator } from 'application/validators/OnboardingValidator';
import { Builder } from 'builder-pattern';
import {v4} from "uuid"
import { LoginPayLoad } from 'src/application/payloads/LoginPayload';
import { CustomerOperations } from 'src/domain/customer/entities/CustomerOperation';
import { accessToken } from '../../security/JWT';
import { BadRequest } from '../../config/Exception';
import { loginResponse } from 'src/application/presentation/LoginResponse';

export class CustomerServiceImpl implements CustomerService{
    protected publicFields = ["customerId","firstName", "lastName", "email", "phoneNumber", "dateOfBirth", "avatar", "createdAt", "updatedAt"]

    protected customerRepository: CustomerRepository;
    protected onboardingValidator: OnboardingValidator;
    constructor(customerRepository: CustomerRepository, onboardingValidator: OnboardingValidator) {
        this.customerRepository = customerRepository;
        this.onboardingValidator = onboardingValidator;
    }

    private async loginOperationResponse(loginOperation: CustomerOperations) {
        const loginOperationProps = loginOperation.getProps();
        if(loginOperationProps.status.success) {
            const token = accessToken({customer: loginOperationProps.customer.customerId})
            return loginResponse(loginOperationProps.customer, token);
        }
        throw BadRequest(loginOperationProps.status.code)
    }

    async login(payload: LoginPayLoad): Promise<any> {
        await this.onboardingValidator.validateLoginPayload(payload);
        const rawUserData = await this.customerRepository.findCustomerByEmailorPhoneNumber(payload.loginId as string);// Get data from repo
        const customer = Customer.getInstance(rawUserData); // Domain level stuff        
        const loginOperation: CustomerOperations = customer.login(payload.password);        
        return this.loginOperationResponse(loginOperation);
    }


    async createCustomer(payload: SignUpPayLoad, countryCode: string): Promise<any> {
        //validation
        await this.onboardingValidator.validateSignUpPayload(payload);
        let customer: ICustomer = Builder<ICustomer>()
        .customerId(UniqueEntityID.check(v4()))
        .firstName(payload.firstName)
        .lastName(payload.lastName)
        .email(Email.check(payload.email))
        .phoneNumber(payload.phoneNumber)
        .password(payload.password)
        .build()
        return this.customerRepository.createUniqueCustomer(customer)
    }
   
    async getAllCustomers(): Promise<any> {
        return await this.customerRepository.find({}, this.publicFields)
    }

    async getCustomer(customerId: UniqueEntityID): Promise<any> {
        return await this.customerRepository.find()
    }

    

}
