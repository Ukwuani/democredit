import { UniqueEntityID } from 'domain/utils/Types';
import { Currency } from 'domain/wallet/enums/Currency';

export interface IWallet {
    id: UniqueEntityID;
    customerID: UniqueEntityID;
    balance: BigInt;
    bookBalance: BigInt;
    currency: Currency;
    provider: string;
    accountNumner: string;
    meta: Object;
}