import { ICustomerOperations } from "domain/customer/interfaces/ICustomerOperation";
import BaseEntity from "domain/utils/BaseEntity";
import {compareSync} from "bcryptjs";
import {CustomerOperations} from "domain/customer/entities/CustomerOperation";
import {CustomerOperationStatus} from "domain/customer/enums/CustomerOperationStatus";
import { CustomerOperationType } from "domain/customer/enums/CustomerOperationType";
import { UniqueEntityID, Email } from "domain/utils/Types";
import { IAggregateRoot } from "domain/utils/IAggregateRoot";
import { ICustomer } from "domain/customer/interfaces/ICustomer";

export class Customer extends BaseEntity<ICustomer> implements IAggregateRoot {
    public readonly tag: string = `customer-aggregate-${this.id}`;

    public static getInstance(rawUserData: any): Customer {
         const customer = Customer.getBuilder<ICustomer>()
        .customerId(UniqueEntityID.check(rawUserData.customerId))
        .firstName(rawUserData.firstName)
        .lastName(rawUserData.lastName)
        .email(Email.check(rawUserData.email))
        .phoneNumber(rawUserData.phone)
        .password(rawUserData.password)
        .phoneNumber(rawUserData.verified)
        .build();
        return new Customer(customer,  UniqueEntityID.check(customer.customerId));
    }

    public login(password: string): CustomerOperations {
        const customerData: ICustomerOperations = CustomerOperations
            .iBuilder()
            .id(this.props.customerId)
            .customer(this.props)
            .type(CustomerOperationType.LOGIN)
            .build();
        const customerOperation = CustomerOperations.getInstance(customerData);
        if(!this.checkPassword(password)) {
            customerOperation.setStatus(CustomerOperationStatus.INVALID_PASSWORD, false);
        } 
        // else if(!this.isVerified) {
        //     customerOperation.setStatus(CustomerOperationStatus.PHONE_NUMBER_UNVERIFIED, false);
        // } 
        else {
            customerOperation.setStatus(CustomerOperationStatus.SUCCESS, true);
        }
        return customerOperation;
    }

    checkPassword(password: string): boolean {
        return  compareSync(password, this.props.password);
    }

    private isPhoneVerified() {
        return this.props.phoneVerified;
    }
}
