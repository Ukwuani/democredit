import { UniqueEntityID, Email, Phone } from "domain/utils/Types";

export interface ICustomer{
    id: UniqueEntityID;
    name: string;
    phone: Phone;
    email: Email;
    password: string;
    verified: boolean;
}
