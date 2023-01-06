import { Builder, IBuilder } from "builder-pattern";
import { ICustomerOperations } from "domain/customer/interfaces/ICustomerOperation";
import BaseEntity from "domain/utils/BaseEntity";
import {UniqueEntityID} from "domain/utils/Types";
import { CustomerOperationStatus } from "../enums/CustomerOperationStatus";
import IOperationStatus from "domain/utils/IOperationStatus";


export class CustomerOperations extends BaseEntity<ICustomerOperations>{

    public static iBuilder(): IBuilder<ICustomerOperations> {
        return CustomerOperations.getBuilder<ICustomerOperations>();
    }

    public static getInstance(customerOperation: ICustomerOperations): CustomerOperations {
        const id: UniqueEntityID = UniqueEntityID.check(customerOperation.id);
        return new CustomerOperations(customerOperation, id);
    }

    public setStatus(code: CustomerOperationStatus, status: boolean) {
        this.props.status = Builder<IOperationStatus<CustomerOperationStatus>>()
            .code(code)
            .success(status)
            .build();
    }
}
