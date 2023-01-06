import OperationStatus from "domain/utils/IOperationStatus";
import { CustomerOperationType } from "domain/customer/enums/CustomerOperationType";
import { CustomerOperationStatus } from "domain/customer/enums/CustomerOperationStatus";
import {ICustomer} from "./ICustomer";

export interface ICustomerOperations{
    id: string;
    customer: ICustomer;
    status: OperationStatus<CustomerOperationStatus>;
    type: CustomerOperationType;
}
