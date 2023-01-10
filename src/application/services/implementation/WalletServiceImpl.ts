import {UniqueEntityID, Email, Phone} from "domain/utils/Types"
import { CreateWalletPayload } from 'application/payloads/CreateWalletPayload';
import { WalletService } from '../WalletService';
import { WalletRepository } from "src/infrastructure/repository/WalletRepository";
import { AccountInfoRepository } from "src/infrastructure/repository/AccountInfoRepository";
import { v4 } from "uuid";
import { Builder } from 'builder-pattern';
import { IWallet } from '../../../domain/wallet/interfaces/IWallet';
import { IAccountInfo } from '../../../domain/wallet/interfaces/IAccountInfo';

export class WalletServiceImpl implements WalletService {
    protected walletRepository: WalletRepository;
    protected accountInfoRepository: AccountInfoRepository;
    constructor(walletRepository: WalletRepository, accountInfoRepository: AccountInfoRepository) {
        this.walletRepository = walletRepository
        this.accountInfoRepository = accountInfoRepository
    }

    getDummyAccountNumber(): string {
        return Math.random().toString().substring(2,12);
    }
    
    async createWallet(payload: CreateWalletPayload, countryCode?: string): Promise<any>{
        let newWalletId = v4()
        let newAccountInfoId = v4()
        let newWallet  = Builder<IWallet>()
        .walletId(UniqueEntityID.check(newWalletId))
        .accountInfoId(UniqueEntityID.check(newAccountInfoId))
        .customerId(UniqueEntityID.check(payload.customerId))
        .currency(payload.currency)
        .transactionPin(payload.transactionPin)
        .build()
        console.log(newWallet)

        let newAccountInfo = Builder<IAccountInfo>()
        .accountInfoId(newWallet.accountInfoId)
        .accountNumber(this.getDummyAccountNumber())
        .bankCode("056")
        .bankName("Wema Bank")
        .currency("NGN")
        .provider("PayStuck")
        .build()
        console.log(newAccountInfo)


        await this.walletRepository.createWallet(newWallet).then(() => {
            this.accountInfoRepository.createAccount(newAccountInfo)
        })
        newWallet.transactionPin="" //terrible
        return {
            wallet: newWallet,
            accountInfo: newAccountInfo
        }
    }
    
   }
