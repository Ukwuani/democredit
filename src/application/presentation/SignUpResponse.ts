import { ICustomer } from '../../domain/customer/interfaces/ICustomer';
import { Builder } from 'builder-pattern';
export interface ISignUpResponse {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export const signUpResponse = (customerData: ICustomer) => {
    return Builder<ISignUpResponse>()
    .customerId(customerData.customerId)
    .firstName(customerData.firstName)
    .lastName(customerData.lastName)
    .email(customerData.email)
    .phoneNumber(customerData.phoneNumber)
    .build()
}