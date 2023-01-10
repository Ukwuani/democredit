# DemoCredit MVP

## Assumptions
```
1. Wallets have virtual account numbers provided by a third party provider
2. Bank 
```

## Architecture (Data Driven Design and Clean Architecture)

## Scripts
## Install
``` 
yarn install
```
### DB Migration 

### Testing (Jest)
``` 
yarn run test -- coverage
```
## E-R Diagram


## Structure
  - __src__
     - __application__
       - [Readme.md](src/application/Readme.md)
       - __config__
         - [APIWrapper.ts](src/application/config/APIWrapper.ts)
         - [Async.ts](src/application/config/Async.ts)
         - [Exception.ts](src/application/config/Exception.ts)
       - __controller__
         - [OnboardingController.ts](src/application/controller/OnboardingController.ts)
         - [WalletController.ts](src/application/controller/WalletController.ts)
       - __payloads__
         - [BankWithdrawalPayload.ts](src/application/payloads/BankWithdrawalPayload.ts)
         - [CreateWalletPayload.ts](src/application/payloads/CreateWalletPayload.ts)
         - [FundFromBankPayload.ts](src/application/payloads/FundFromBankPayload.ts)
         - [SignUpPayload.ts](src/application/payloads/SignUpPayload.ts)
         - [WalletTransferPayload.ts](src/application/payloads/WalletTransferPayload.ts)
       - __routes__
         - [OnboardingRoutes.ts](src/application/routes/OnboardingRoutes.ts)
       - __security__
         - [Auth.ts](src/application/security/Auth.ts)
         - [JWT.ts](src/application/security/JWT.ts)
         - [PasskeyCrypt.ts](src/application/security/PasskeyCrypt.ts)
       - __services__
         - [CustomerService.ts](src/application/services/CustomerService.ts)
         - __implementation__
           - [CustomerServiceImpl.ts](src/application/services/implementation/CustomerServiceImpl.ts)
     - __domain__
       - [Readme.md](src/domain/Readme.md)
       - __customer__
         - __aggregators__
           - [Customer.ts](src/domain/customer/aggregators/Customer.ts)
           - __tests__
             - [Customer.spec.ts](src/domain/customer/aggregators/tests/Customer.spec.ts)
         - __entities__
           - [CustomerOperation.ts](src/domain/customer/entities/CustomerOperation.ts)
         - __enums__
           - [CustomerOperationStatus.ts](src/domain/customer/enums/CustomerOperationStatus.ts)
           - [CustomerOperationType.ts](src/domain/customer/enums/CustomerOperationType.ts)
         - __interfaces__
           - [ICustomer.ts](src/domain/customer/interfaces/ICustomer.ts)
           - [ICustomerOperation.ts](src/domain/customer/interfaces/ICustomerOperation.ts)
         - __valueObjects__
       - __loanManager__
         - __aggregators__
         - __entities__
         - __valueObjects__
       - __utils__
         - [BaseEntity.ts](src/domain/utils/BaseEntity.ts)
         - [IAggregateRoot.ts](src/domain/utils/IAggregateRoot.ts)
         - [IOperationStatus.ts](src/domain/utils/IOperationStatus.ts)
         - [Types.ts](src/domain/utils/Types.ts)
         - __tests__
           - [Types.spec.ts](src/domain/utils/tests/Types.spec.ts)
       - __wallet__
         - __aggregators__
         - __entities__
         - __enums__
           - [Currency.ts](src/domain/wallet/enums/Currency.ts)
         - __interfaces__
           - [IWallet.ts](src/domain/wallet/interfaces/IWallet.ts)
         - __valueObjects__
     - __infrastructure__
       - [Readme.md](src/infrastructure/Readme.md)
       - __db__
         - [db.config.ts](src/infrastructure/db/db.config.ts)
         - __schema__
       - __repository__
       - __security__
       - __server__
         - [index.ts](src/infrastructure/server/index.ts)




