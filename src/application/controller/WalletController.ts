// import { ApiError } from '@nc/utils/errors';

import { Context } from '../config/APIWrapper';
import { WalletRepository } from 'src/infrastructure/repository/WalletRepository';
import { AccountInfoRepository } from 'src/infrastructure/repository/AccountInfoRepository';
import { WalletServiceImpl } from '../services/implementation/WalletServiceImpl';
import { WalletService } from '../services/WalletService';
import { CreateWalletPayload } from '../payloads/CreateWalletPayload';

const walletRepository = new WalletRepository()
const accountInfoRepository = new AccountInfoRepository()
// const walletValidator = new WalletValidator()
const walletService: WalletService = new WalletServiceImpl(walletRepository, accountInfoRepository)

export class WalletController{

  static async create(context: Context) {
    //create single wallet then create account info
    return await walletService.createWallet(context.params as CreateWalletPayload)
  }

  static async fundWalletFromBank(context: Context) {
    return {
      transaction: "transactionId",
      amount: 4000000,
      ref: "mxmxndnd"
    }
  }

  static async bankAccountLookUp(context: Context) {
    //check bank account
    return {
      transaction: "transactionId",
      amount: 4000000,
      ref: "mxmxndnd"
    }
  }

  static async withdrawFromWalletToBank(context: Context) {
    return {
      transaction: "transactionId",
      amount: 4000000,
      ref: "mxmxndnd"
    }
  }

  static async peerWalletTransfer(context: Context) {
    return {
      meta: context.meta,
      action: context.$action,
      params: context.params,
      headers: context.headers,
      req: context.meta,
      transaction: "transactionId",
      amount: 4000000,
      ref: "mxmxndnd"
    }
  }

  static async fetchTransactions(context: Context) {
    return {
      transaction: "transactionId",
      amount: 4000000,
      ref: "mxmxndnd"
    }
  }

}