import { ICustomerOperations } from "domain/customer/interfaces/ICustomerOperation";
import BaseEntity from "domain/utils/BaseEntity";
import {compareSync} from "bcryptjs";
import {CustomerOperations} from "domain/customer/entities/CustomerOperation";
import {CustomerOperationStatus} from "domain/customer/enums/CustomerOperationStatus";
import { CustomerOperationType } from "domain/customer/enums/CustomerOperationType";
import { UniqueEntityID } from "domain/utils/Types";
import { IAggregateRoot } from "domain/utils/IAggregateRoot";
import { ICustomer } from "domain/customer/interfaces/ICustomer";

export class Customer extends BaseEntity<ICustomer> implements IAggregateRoot {
    public readonly tag: string = `customer-aggregate-${this.id}`;

    public static getInstance(rawUserData: any): Customer {
         const customer = Customer.getBuilder<ICustomer>()
        .id(rawUserData.id)
        .name(rawUserData.name)
        .email(rawUserData.email)
        .phone(rawUserData.phone)
        .password(rawUserData.password)
        .verified(rawUserData.verified)
        .build();
        return new Customer(customer,  UniqueEntityID.check(customer.id));
    }

    public login(password: string): CustomerOperations {
        const customerData: ICustomerOperations = CustomerOperations
            .iBuilder()
            .id(this.props.id)
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

    private isVerified() {
        return this.props.verified;
    }
}
