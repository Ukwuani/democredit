import { Knex } from "knex";
import Repository from "./Repository";
import { IAccountInfo } from "src/domain/wallet/interfaces/IAccountInfo";

export class AccountInfoRepository extends Repository {
   constructor() {
    super("dcb_account_info");
   }

   async createAccount(payload: IAccountInfo): Promise<any>{
      return await this.insert(payload);
   }
   
}