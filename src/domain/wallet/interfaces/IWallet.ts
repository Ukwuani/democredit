import { UniqueEntityID } from 'domain/utils/Types';
import { Currency } from 'domain/wallet/enums/Currency';

export interface IWallet {
    walletId: UniqueEntityID;
    customerId: UniqueEntityID;
    accountInfoId: UniqueEntityID;
    balance: BigInt;
    currency: string;
    transactionPin: string
    meta?: Object;
}