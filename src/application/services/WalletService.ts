import {UniqueEntityID, Email, Phone} from "domain/utils/Types"
import { CreateWalletPayload } from '../payloads/CreateWalletPayload';

export abstract class WalletService {
    
    abstract createWallet(payload: CreateWalletPayload, countryCode?: string): Promise<any>;
    
   }
