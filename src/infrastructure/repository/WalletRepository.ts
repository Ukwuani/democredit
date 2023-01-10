import { Knex } from "knex";
import Repository from "./Repository";
import { IWallet } from '../../domain/wallet/interfaces/IWallet';
import { encryptPasskey } from "src/application/security/PasskeyCrypt";

export class WalletRepository extends Repository {
   constructor() {
    super("dcb_wallet");
   }

   //TODO: incorrect code scoping: adjust later
   async createWallet(data: IWallet){
        data.transactionPin = encryptPasskey(data.transactionPin!!)
        await this.insert(data)
   }
   
}