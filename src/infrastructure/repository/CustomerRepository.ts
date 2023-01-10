import Repository from "./Repository";
import {ICustomer} from "domain/customer/interfaces/ICustomer"
import {encryptPasskey} from "application/security/PasskeyCrypt"
import { LoginPayLoad } from '../../application/payloads/LoginPayload';
import {NotFound} from "application/config/Exception"
import _ from "lodash";
export class CustomerRepository extends Repository {
    constructor() {
     super("dcb_customer");
    }

    async createUniqueCustomer(data: Partial<ICustomer>): Promise<any>{
        data.password = encryptPasskey(data.password!!);
        return this.insert(data)
    }

    async findCustomerByEmailorPhoneNumber(data: string): Promise<any> {
        const user = await Repository.getModel(this.tableName).where({email: data}).orWhere({phoneNumber: data}).first();
        if(_.isEmpty(user)) throw NotFound("Customer not found");
        return user;
    }

    async deleteById(id: string) {
        return await Repository.getModel(this.tableName).where("customer_id", id).del();
    }
 }