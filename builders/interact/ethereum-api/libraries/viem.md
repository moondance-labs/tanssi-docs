---
title: How to use viem Ethereum Library
description: In this tutorial use the viem TypeScript interface for Ethereum to send transactions and deploy Solidity smart contracts to your Tanssi EVM ContainerChain.
---

# viem TypeScript Ethereum Library

## Introduction {: #introduction }

[viem](https://viem.sh/){target=\_blank} is a modular TypeScript library that allows developers to interact with abstractions over the JSON-RPC API, making it easy to interact with Ethereum nodes. Since Tanssi EVM ContainerChains have an Ethereum API available that is fully compatible with Ethereum-style JSON-RPC invocations, developers can leverage this compatibility to interact with any EVM ContainerChain. For more information on viem, check out their [documentation site](https://viem.sh/docs/getting-started.html){target=\_blank}.

In this guide, you'll learn how to use viem to send a transaction and deploy a contract on the demo EVM ContainerChain. This guide can be adapted for use with any EVM ContainerChain.

--8<-- 'text/_common/general-js-tutorial-check.md'

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - An account with funds in the Tanssi EVM ContainerChain you are testing with

## Installing viem {: #installing-viem }

To get started, you'll need to create a basic TypeScript project. First, create a directory to store all of the files you'll be creating throughout this guide, and initialize the project with the following command:

```bash
mkdir viem-examples && cd viem-examples && npm init --y
```

For this guide, you'll need to install the viem library and the Solidity compiler. To install both packages, you can run the following command:

=== "npm"

    ```bash
    npm install typescript ts-node viem solc@0.8.0
    ```

=== "yarn"

    ```bash
    yarn add typescript ts-node viem solc@0.8.0
    ```

You can create a TypeScript configuration file by running:

```bash
npx tsc --init
```

!!! note
    This tutorial was created using Node.js v18.18.0.

## Set Up a viem Client (Provider) {: #setting-up-a-viem-provider }

Throughout this guide, you'll be creating a bunch of scripts that provide different functionality, such as sending a transaction, deploying a contract, and interacting with a deployed contract. In most of these scripts, you'll need to create a [viem client](https://docs.ethers.org/v6/api/providers/){target=\_blank} to interact with the network.

You can create a viem client for reading chain data, like balances or contract data, using the `createPublicClient` function, or you can create a viem client for writing chain data, like sending transactions, using the `createWalletClient` function.

Creating a viem client to interact with your Tanssi EVM ContainerChain is a two-step process. First, you'll need to import the `defineChain` function from viem. This will allow you to specify the details of your EVM ContainerChain (or any arbitrary EVM chain). You'll then need to provide all of the chain details, as shown in the next section.

### For Reading Chain Data {: #for-reading-chain-data }

To create a client for reading chain data, you can take the following steps:

1. Import the `createPublicClient`, `http`, and `defineChain`functions from `viem`
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. Create the `client` using the `createPublicClient` function and pass in the network and the HTTP RPC endpoint

```ts
--8<-- 'code/builders/interact/ethereum-api/libraries/viem/read-chain-data.ts'
```

### For Writing Chain Data {: #for-writing-chain-data }

To create a client for writing chain data, you can take the following steps:

1. Import the `createWalletClient`, `http`, and `defineChain` functions from `viem`, and the `privateKeyToAccount` function from `viem/accounts`
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. Create your account using the `privateKeyToAccount` function
4. Create the `client` using the `createWalletClient` function and pass in the account, network, and the HTTP RPC endpoint

!!! remember
    This is for demo purposes only. Never store your private key in a TypeScript file.



```ts
--8<-- 'code/builders/interact/ethereum-api/libraries/viem/write-chain-data.ts'
```

!!! note
    To interact with browser-based wallets, you can use the following code to create an account. In this snippet, `demo` refers to the demo EVM ContainerChain created with `defineChain`.
    ```ts
    --8<-- 'code/builders/interact/ethereum-api/libraries/viem/browser-based-wallets.ts'
    ```

## Send a Transaction {: #send-transaction }

During this section, you'll be creating a couple of scripts. The first one will be to check the balances of your accounts before trying to send a transaction. The second script will actually send the transaction. You can also use the balance script to check the account balances after the transaction has been sent.

### Check Balances Script {: #check-balances-script }

You'll only need one file to check the balances of both addresses before and after the transaction is sent. To get started, you can create a `balances.ts` file by running:

```bash
touch balances.ts
```

Next, you will create the script for this file and complete the following steps:

1. Update your imports to include the `createPublicClient`, `http`,`formatEther`, and `defineChain `functions from `viem` 
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. [Set up a public viem client](#for-reading-chain-data), which can be used for reading chain data, such as account balances
4. Define the `addressFrom` and `addressTo` variables
5. Create the asynchronous `balances` function that wraps the `publicClient.getBalance` method
6. Use the `publicClient.getBalance` function to fetch the balances for the `addressFrom` and `addressTo` addresses. You can also leverage the `formatEther` function to transform the balance into a more readable number (in UNIT for the demo EVM ContainerChain)
7. Lastly, run the `balances` function

???+ code "View balances.ts"

    ```ts
    --8<-- 'code/builders/interact/ethereum-api/libraries/viem/balances.ts'
    ```

To run the script and fetch the account balances, you can run the following command:

```bash
npx ts-node balances.ts
```

If successful, the balances for the origin and receiving address will be displayed in your terminal in UNIT.

![The result of running the balances script in the terminal](/images/builders/interact/ethereum-api/libraries/viem/viem-1.png)

### Send Transaction Script {: #send-transaction-script }

You'll only need one file to execute a transaction between accounts. For this example, you'll be transferring 1 UNIT token from an origin address on the demo EVM ContainerChain (from which you hold the private key) to another address. To get started, you can create a `transaction.ts` file by running:

```bash
touch transaction.ts
```

Next, you will create the script for this file and complete the following steps:

1. Update your imports to include `createPublicClient`, `createWalletClient`, `http`, `parseEther`, and `defineChain` functions from `viem`, as well as the `privateKeyToAccount` function from `viem/accounts`
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which can be used along with your private key to send transactions. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**
4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to wait for the transaction receipt
5. Define the `addressTo` variable
6. Create the asynchronous `send` function, which wraps the transaction object and the `walletClient.sendTransaction` method
7. Use the `walletClient.sendTransaction` function to sign and send the transaction. You'll need to pass in the transaction object, which only requires the recipient's address and the amount to send. Note that `parseEther` can be used, which handles the necessary unit conversions from Ether to Wei, similar to using `parseUnits(value, decimals)`. Use `await` to wait until the transaction is processed and the transaction hash is returned
8. Use the `publicClient.waitForTransactionReceipt` function to wait for the transaction receipt, signaling that the transaction has been completed. This is particularly helpful if you need the transaction receipt or if you're running the `balances.ts` script directly after this one to check if the balances have been updated as expected
9. Lastly, run the `send` function

???+ code "View transaction.ts"

    ```ts
    --8<-- 'code/builders/interact/ethereum-api/libraries/viem/transaction.ts'
    ```

To run the script, you can run the following command in your terminal:

```bash
npx ts-node transaction.ts
```

If the transaction was successful, in your terminal, you'll see the transaction hash has been printed out. You can also use the `balances.ts` script to check that the balances for the origin and receiving accounts have changed. The entire workflow would look like this:

![The result of running the transaction and balances scripts in the terminal](/images/builders/interact/ethereum-api/libraries/viem/viem-2.png)

## Deploy a Contract {: #deploy-contract }

--8<-- 'text/builders/interact/ethereum-api/libraries/contract.md'

### Compile Contract Script {: #compile-contract-script }

--8<-- 'text/builders/interact/ethereum-api/libraries/compile-ts.md'

```js
--8<-- 'code/builders/interact/ethereum-api/libraries/viem/compile.ts'
```

### Deploy Contract Script {: #deploy-contract-script }

With the script for compiling the `Incrementer.sol` contract in place, you can then use the results to send a signed transaction that deploys it. To do so, you can create a file for the deployment script called `deploy.ts`:

```bash
touch deploy.ts
```

Next, you will create the script for this file and complete the following steps:

1. Update your imports to include the `createPublicClient`, `createWalletClient`, `http`, and `defineChain` functions from `viem`, the `privateKeyToAccount` function from `viem/accounts`, and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which will be used along with your private key to deploy the `Incrementer` contract. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**
4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to read the transaction receipt for the deployment
5. Load the contract `bytecode` and `abi` for the compiled contract
6. Create the asynchronous `deploy` function that will be used to deploy the contract via the `walletClient.deployContract` method
7. Use the `walletClient.deployContract` function to sign and send the transaction. You'll need to pass in the contract's ABI and bytecode, the account to deploy the transaction from, and the initial value for the incrementer. Use `await` to wait until the transaction is processed and the transaction hash is returned
8. Use the `publicClient.readContract` function to get the transaction receipt for the deployment. Use `await` to wait until the transaction is processed and the contract address is returned
9. Lastly, run the `deploy` function

???+ code "View deploy.ts"

    ```ts
    --8<-- 'code/builders/interact/ethereum-api/libraries/viem/deploy.ts'
    ```


To run the script, you can enter the following command into your terminal:

```bash
npx ts-node deploy.ts
```

If successful, the contract's address will be displayed in the terminal.

![The result of running the deploy script in the terminal](/images/builders/interact/ethereum-api/libraries/viem/viem-3.png)

### Read Contract Data (Call Methods) {: #read-contract-data }

Call methods are the type of interaction that doesn't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.

To get started, you can create a file and name it `get.ts`:

```bash
touch get.ts
```

Then you can take the following steps to create the script:

1. Update your imports to include the `createPublicClient`, `http`, and `defineChain` functions from `viem`, and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to read the current number of the `Incrementer` contract
4. Create the `contractAddress` variable using the address of the deployed contract and the `abi` variable using the `contractFile` from the `compile.ts` file
5. Create the asynchronous `get` function
6. Call the contract using the `publicClient.readContract` function, passing in the `abi`, the name of the function, the `contractAddress`, and any arguments (if needed). You can use `await`, which will return the value requested once the request promise resolves
7. Lastly, call the `get` function

???+ code "View get.ts"

    ```ts
    --8<-- 'code/builders/interact/ethereum-api/libraries/viem/get.ts'
    ```

To run the script, you can enter the following command in your terminal:

```bash
npx ts-node get.ts
```

If successful, the value will be displayed in the terminal.

![The result of running the get script in the terminal](/images/builders/interact/ethereum-api/libraries/viem/viem-4.png)

### Interact with Contract (Send Methods) {: #interact-with-contract }

Send methods are the type of interactions that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. In this section, you'll create two scripts: one to increment and one to reset the incrementer. To get started, you can create a file for each script and name them `increment.ts` and `reset.ts`:

```bash
touch increment.ts reset.ts
```

Open the `increment.ts` file and take the following steps to create the script:

1. Update your imports to include the `createPublicClient`, `createWalletClient` `http`, and `defineChain` functions from `viem`, the  `privateKeyToAccount` from `viem/accounts'` and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which will be used along with your private key to send a transaction. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**
4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to wait for the transaction receipt
5. Create the `contractAddress` variable using the address of the deployed contract, the `abi` variable using the `contractFile` from the `compile.ts` file, and the `_value` to increment the contract by
6. Create the asynchronous `increment` function
7. Call the contract using the `walletClient.writeContract` function, passing in the `abi`, the name of the function, the `contractAddress`, and the `_value`. You can use `await`, which will return the transaction hash once the request promise resolves
8. Use the `publicClient.waitForTransactionReceipt` function to wait for the transaction receipt, signaling that the transaction has been completed. This is particularly helpful if you need the transaction receipt or if you're running the `get.ts` script directly after this one to check that the current number has been updated as expected
9. Lastly, call the `increment` function

???+ code "View increment.ts"

    ```ts
    --8<-- 'code/builders/interact/ethereum-api/libraries/viem/increment.ts'
    ```


To run the script, you can enter the following command in your terminal:

```bash
npx ts-node increment.ts
```

If successful, the transaction hash will be displayed in the terminal. You can use the `get.ts` script alongside the `increment.ts` script to make sure that value is changing as expected.

![The result of running the increment and get scripts in the terminal](/images/builders/interact/ethereum-api/libraries/viem/viem-5.png)

Next, you can open the `reset.ts` file and take the following steps to create the script:

1. Update your imports to include the `createPublicClient`, `createWalletClient` `http`, and `defineChain` functions from `viem`, the  `privateKeyToAccount` from `viem/accounts'` and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section
2. Define the chain details of your EVM ContainerChain, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same
3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which will be used along with your private key to send a transaction. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**
4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to wait for the transaction receipt
5. Create the `contractAddress` variable using the address of the deployed contract and the `abi` variable using the `contractFile` from the `compile.ts` file to increment the contract by
6. Create the asynchronous `reset` function
7. Call the contract using the `walletClient.writeContract` function, passing in the `abi`, the name of the function, the `contractAddress`, and an empty array for the arguments. You can use `await`, which will return the transaction hash once the request promise resolves
8. Use the `publicClient.waitForTransactionReceipt` function to wait for the transaction receipt, signaling that the transaction has been completed. This is particularly helpful if you need the transaction receipt or if you're running the `get.ts` script directly after this one to check that the current number has been reset to `0`
9. Lastly, call the `reset` function

???+ code "View reset.ts"

    ```ts
    --8<-- 'code/builders/interact/ethereum-api/libraries/viem/reset.ts'
    ```


To run the script, you can enter the following command in your terminal:

```bash
npx ts-node reset.ts
```

If successful, the transaction hash will be displayed in the terminal. You can use the `get.ts` script alongside the `reset.ts` script to make sure that value is changing as expected.

![The result of running the reset and get scripts in the terminal](/images/builders/interact/ethereum-api/libraries/viem/viem-6.png)

--8<-- 'text/_disclaimers/third-party-content.md'
