import { UniqueEntityID, Email, Phone } from "domain/utils/Types";

export interface ICustomer{
    customerId: UniqueEntityID;
    firstName: string;
    lastName: string;
    email: Email;
    phoneNumber: string;
    password: string;
    dateOfBirth?: string;
    avatar?: string
    phoneVerified?: boolean;
}


