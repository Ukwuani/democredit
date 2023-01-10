import { ICustomerOperations } from "domain/customer/interfaces/ICustomerOperation";
import BaseEntity from "domain/utils/BaseEntity";
import {compareSync} from "bcryptjs";
import { UniqueEntityID } from "domain/utils/Types";
import { IAggregateRoot } from "domain/utils/IAggregateRoot";
import { IWallet } from '../interfaces/IWallet';
import { Unauthorized } from '../../../application/config/Exception';

export class Wallet extends BaseEntity<IWallet> implements IAggregateRoot {
    public readonly tag: string = `wallet-aggregate-${this.id}`;

    public static getInstance(rawUserData: any): Wallet {
         const wallet = Wallet.getBuilder<IWallet>()
         .walletId(rawUserData.walletId)
         .accountInfoId(rawUserData.accountInfoId)
         .balance(rawUserData.balance)
         .transactionPin(rawUserData.transactionPin)
         .currency(rawUserData.currency)
        .customerId(rawUserData.id)
        .build();
        return new Wallet(wallet,  UniqueEntityID.check(wallet.customerId));
    }

    public fundFromBank(source: Object, amount: BigInt, transactionPin: string) {
      if(!this.checkTransactionPin(transactionPin)) throw Unauthorized("Invalid Transaction Pin")
        //flow 1: (assuming payment is made via paystack) payment made by user via whatever platform, returns a payment ref, which is sent via paystack to create a transaction 
        // webhook waits for the payment data, then deposits into account
        // flow 2: Wallet is attatched to virtual account and money is sent via virtual account, listen just for webhook.
        //
        this.deposit(amount)

        // return customerOperation;
    }

    checkTransactionPin(pin: string): boolean {
      return compareSync(pin, this.props.transactionPin)
    }

    deposit(amount: BigInt) {
        // return WalletOperation and Transaction Id;
    }

    withdraw(amount: BigInt) {
        // return WalletOperation and Transaction Id;
    }
}
