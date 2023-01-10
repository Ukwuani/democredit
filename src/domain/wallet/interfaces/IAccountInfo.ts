import { UniqueEntityID } from '../../utils/Types';
export interface IAccountInfo {
    accountInfoId: UniqueEntityID;
    accountNumber: string;
    provider: string;
    bankName: string;
    bankCode: string;
    currency: string;
}