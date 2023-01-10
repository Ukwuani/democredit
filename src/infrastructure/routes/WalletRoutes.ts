import {Router} from "express";
import { APIContext } from "application/config/APIWrapper";
import { WalletController } from "application/controller/WalletController";

export const router = Router();

router.post('/', APIContext({
  controller: WalletController.create, 
  requireAuth: false
}));

//this could be more liberal incase we want to fund with other methods
router.post('/fund', APIContext({
  controller: WalletController.fundWalletFromBank, 
  requireAuth: false
}));

router.post('/withdraw', APIContext({
  controller: WalletController.fundWalletFromBank, 
  requireAuth: false
}))

router.post('/transfer', APIContext({
  controller: WalletController.peerWalletTransfer, 
  requireAuth: true
}))

router.post('/transactions', APIContext({
  controller: WalletController.fetchTransactions, 
  requireAuth: false
}))
