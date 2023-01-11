import { ICustomer } from '../../domain/customer/interfaces/ICustomer';
import { Builder } from 'builder-pattern';
import { IWallet } from '../../domain/wallet/interfaces/IWallet';
import { IAccountInfo } from '../../domain/wallet/interfaces/IAccountInfo';

export interface IAccountInfoResponse {
    accountNumber: string;
    provider: string;
    bankName: string;
    currency: string;
    bankCode: string;
};

export interface ICreateWalletResponse {
    walletId: string;
    balance: BigInt;
    currency: string;
    accountInfo: IAccountInfoResponse;
}

export const createWalletResponse = (wallet: IWallet, accountInfo: IAccountInfo) => {
    const accountInfoResponse = Builder<IAccountInfoResponse>()
    .accountNumber(accountInfo.accountNumber)
    .bankName(accountInfo.bankName)
    .bankCode(accountInfo.bankCode)
    .provider(accountInfo.provider)
    .currency(accountInfo.currency)
    .build();

    return Builder<ICreateWalletResponse>()
    .walletId(wallet.walletId)
    .balance(wallet.balance)
    .currency(wallet.currency)
    .accountInfo(accountInfoResponse)
    .build()
}