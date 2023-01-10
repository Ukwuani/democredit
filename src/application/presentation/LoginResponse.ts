import { ICustomer } from '../../domain/customer/interfaces/ICustomer';
import { Builder } from 'builder-pattern';
export interface ILoginResponse {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accessToken: string
}

export const loginResponse = (customerData: ICustomer, token: string) => {
    return Builder<ILoginResponse>().accessToken(token)
    .customerId(customerData.customerId)
    .firstName(customerData.firstName)
    .lastName(customerData.lastName)
    .email(customerData.email)
    .phoneNumber(customerData.phoneNumber)
    .build()
}