 export interface BankWithdrawal {
    accountNumber: string;
    bankID: string;
    transactionPin: string;
    amount: BigInt;
}