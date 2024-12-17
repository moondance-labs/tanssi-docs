---
title: EVM Transactions & Contracts with Web3.js
description: Learn how to use the Ethereum Web3 JavaScript Library to send transactions and deploy Solidity smart contracts to your Tanssi EVM appchain.
icon: octicons-code-24
---

# Web3.js JavaScript Library

## Introduction {: #introduction }

[Web3.js](https://web3js.readthedocs.io){target=\_blank} is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with JavaScript. Tanssi EVM appchains have an Ethereum-like API that is fully compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the Web3.js library to interact with a Tanssi EVM appchain node as if they were doing so on Ethereum. For more information on Web3.js, check out their [documentation site](https://web3js.readthedocs.io/en/v1.10.0){target=\_blank}.

In this guide, you'll learn how to set up the Web3.js library for your Tanssi EVM appchain. Next, to showcase the library in action, you'll use the Web3.js library to send a transaction and deploy a contract on a Tanssi EVM appchain running in Tanssi's [Dancebox](/builders/tanssi-network/testnet/dancebox/){target=\_blank} TestNet. This guide can be adapted for your own Tanssi EVM appchain by simply changing the endpoint.

--8<-- 'text/_common/general-js-tutorial-check.md'

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- An account with funds in the Tanssi EVM appchain you are testing with

## Installing Web3Js {: #installing-web3js }

For this guide, you'll need to install the Web3.js library and the Solidity compiler. To install both NPM packages, you can run the following command:

=== "npm"

    ```bash
    npm install web3 solc@0.8.0
    ```

=== "yarn"

    ```bash
    yarn add web3 solc@0.8.0
    ```

## Setting up the Web3 Provider {: #setting-up-the-web3-provider }

Throughout this guide, you'll be creating a bunch of scripts that provide different functionality such as sending a transaction, deploying a contract, and interacting with a deployed contract. In most of these scripts you'll need to create an Web3.js provider to interact with the network.

To set up a Web3 provider, you can take the following steps:

1. Import the `Web3` library.
2. Create the Web3 provider and specify the RPC url. You can configure Web3.js to work with a Tanssi EVM appchain running in Tanssi's Dancebox TestNet, or your own Tanssi EVM appchain by simply changing the endpoint.

```js
// 1. Import Web3
const Web3 = require('web3');

// 2. Create Web3 provider and insert your RPC url
const web3 = new Web3(
  'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'
);
```

Save this code snippet as you'll need it for the scripts that are used in the following sections.

## Send a Transaction {: #send-a-transaction }

During this section, you'll be creating a couple of scripts. The first one will be to check the balances of your accounts before trying to send a transaction. The second script will actually send the transaction.

You can also use the balance script to check the account balances after the transaction has been sent.

### Check Balances Script {: #check-balances-script }

You'll only need one file to check the balances of both addresses before and after the transaction is sent. To get started, you can create a `balances.js` file by running:

```bash
touch balances.js
```

Next, you will create the script for this file and complete the following steps:

1. [Set up the Web3 provider](#setting-up-the-web3-provider)
2. Define the `addressFrom` and `addressTo` variables
3. Create the asynchronous `balances` function which wraps the `web3.eth.getBalance` method
4. Use the `web3.eth.getBalance` function to fetch the balances for the `addressFrom` and `addressTo` addresses. You can also leverage the `web3.utils.fromWei` function to transform the balance into a more readable number in `TANGO`
5. Lastly, run the `balances` function

```js
// 1. Add the Web3 provider logic here:
// {...}

// 2. Create address variables
const addressFrom = 'INSERT_ADDRESS_FROM';
const addressTo = 'INSERT_ADDRESS_TO';

// 3. Create balances function
const balances = async () => {
  // 4. Fetch balance info
  const balanceFrom = web3.utils.fromWei(
    await web3.eth.getBalance(addressFrom),
    'ether'
  );
  const balanceTo = web3.utils.fromWei(
    await web3.eth.getBalance(addressTo),
    'ether'
  );

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} TANGO`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} TANGO`);
};

// 5. Call balances function
balances();
```

??? code "View the complete script"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/balances.js'
    ```

To run the script and fetch the account balances, you can run the following command:

```bash
node balances.js
```

If successful, the balances for the origin and receiving address will be displayed in your terminal in ETH.

![Check balance Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-1.webp)

### Send Transaction Script {: #send-transaction-script }

You'll only need one file to execute a transaction between accounts. For this example, you'll be transferring 1 TANGO token from an origin address (from which you hold the private key) to another address. To get started, you can create a `transaction.js` file by running:

```bash
touch transaction.js
```

Next, you will create the script for this file and complete the following steps:

1. [Set up the Web3 provider](#setup-web3-with-tanssi)
2. Define the `addressFrom`, including the `privateKey`, and the `addressTo` variables. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**
3. Create the asynchronous `send` function, which wraps the transaction object, and the sign and send transaction functions
4. Create and sign the transaction using the `web3.eth.accounts.signTransaction` function. Pass in the `gas`, `addressTo`, and `value` for the transaction along with the sender's `privateKey`
5. Send the signed transaction using the `web3.eth.sendSignedTransaction` method and pass in the raw transaction. Then use `await` to wait until the transaction is processed and the transaction receipt is returned
6. Lastly, run the `send` function

```js
// 1. Add the Web3 provider logic here:
// {...}

// 2. Create account variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
  address: 'INSERT_PUBLIC_ADDRESS_OF_PK',
};
const addressTo = 'INSERT_ADDRESS_TO'; // Change to address

// 3. Create send function
const send = async () => {
  console.log(
    `Attempting to send transaction from ${accountFrom.address} to ${addressTo}`
  );

  // 4. Sign tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      gas: 21000,
      to: addressTo,
      value: web3.utils.toWei('1', 'ether'),
    },
    accountFrom.privateKey
  );

  // 5. Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(
    `Transaction successful with hash: ${createReceipt.transactionHash}`
  );
};

// 6. Call send function
send();
```

??? code "View the complete script"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/transaction.js'
    ```

To run the script, you can run the following command in your terminal:

```bash
node transaction.js
```

If the transaction was successful, in your terminal, you'll see the transaction hash has been printed out.

You can also use the `balances.js` script to check that the balances for the origin and receiving accounts have changed. The entire workflow would look like this:

![Send Tx Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-2.webp)

## Deploy a Contract {: #deploy-a-contract }

--8<-- 'text/builders/toolkit/ethereum-api/libraries/contract.md'

### Compile Contract Script {: #compile-contract-script }

--8<-- 'text/builders/toolkit/ethereum-api/libraries/compile.md'

### Deploy Contract Script {: #deploy-contract-script }

With the script for compiling the `Incrementer.sol` contract in place, you can then use the results to send a signed transaction that deploys it. To do so, you can create a file for the deployment script called `deploy.js`:

```bash
touch deploy.js
```

Next, you will create the script for this file and complete the following steps:

1. Import the contract file from `compile.js`
2. [Set up the Web3 provider](#setup-web3-with-tanssi)
3. Define the `addressFrom`, including the `privateKey`, and the `addressTo` variables. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**
4. Save the `bytecode` and `abi` for the compiled contract
5. Create the asynchronous `deploy` function that will be used to deploy the contract
6. Create the contract instance using the `web3.eth.Contract` function
7. Create the constructor and pass in the `bytecode` and the initial value for the incrementer. For this example, you can set the initial value to `5`
8. Create and sign the transaction using the `web3.eth.accounts.signTransaction` function. Pass in the `data` and the `gas` for the transaction along with the sender's `privateKey`
9. Send the signed transaction using the `web3.eth.sendSignedTransaction` method and pass in the raw transaction. Then use `await` to wait until the transaction is processed and the transaction receipt is returned
10. Lastly, run the `deploy` function

```js
// 1. Import the contract file
const contractFile = require('./compile');

// 2. Add the Web3 provider logic here:
// {...}

// 3. Create address variables
const accountFrom = {
  privateKey: 'INSERT_PRIVATE_KEY',
  address: 'INSERT_PUBLIC_ADDRESS_OF_PK',
};

// 4. Get the bytecode and API
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// 5. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account ${accountFrom.address}`);

  // 6. Create contract instance
  const incrementer = new web3.eth.Contract(abi);

  // 7. Create constructor tx
  const incrementerTx = incrementer.deploy({
    data: bytecode,
    arguments: [5],
  });

  // 8. Sign transacation and send
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      data: incrementerTx.encodeABI(),
      gas: await incrementerTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 9. Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

// 10. Call deploy function
deploy();
```

??? code "View the complete script"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/deploy.js'
    ```

To run the script, you can enter the following command into your terminal:

```bash
node deploy.js
```

If successful, the contract's address will be displayed in the terminal.

![Deploy Contract Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-3.webp)

### Read Contract Data (Call Methods) {: #read-contract-data }

Call methods are the type of interactions that don't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.

To get started, you can create a file and name it `get.js`:

```bash
touch get.js
```

Then you can take the following steps to create the script:

1. Import the `abi` from the `compile.js` file
2. [Set up the Web3 provider](#setup-web3-with-tanssi)
3. Create the `contractAddress` variable using the address of the deployed contract
4. Create an instance of the contract using the `web3.eth.Contract` function and passing in the `abi` and `contractAddress`
5. Create the asynchronous `get` function
6. Use the contract instance to call one of the contract's methods and pass in any inputs if necessary. For this example, you will call the `number` method, which doesn't require any inputs. You can use `await`, which will return the value requested once the request promise resolves
7. Lastly, call the `get` function

```js
// 1. Import the contract abi
const { abi } = require('./compile');

// 2. Add the Web3 provider logic here:
// {...}

// 3. Create address variables
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// 4. Create contract instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 5. Create get function
const get = async () => {
  console.log(`Making a call to contract at address: ${contractAddress}`);

  // 6. Call contract
  const data = await incrementer.methods.number().call();

  console.log(`The current number stored is: ${data}`);
};

// 7. Call get function
get();
```

??? code "View the complete script"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/get.js'
    ```

To run the script, you can enter the following command in your terminal:

```bash
node get.js
```

If successful, the value will be displayed in the terminal.

![Get contract variable value Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-4.webp)

### Interact with Contract (Send Methods) {: #interact-with-contract }

Send methods are the type of interactions that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. In this section, you'll create two scripts: one to increment and one to reset the incrementer. To get started, you can create a file for each script and name them `increment.js` and `reset.js`:

```bash
touch increment.js reset.js
```

Open the `increment.js` file and take the following steps to create the script:

1. Import the `abi` from the `compile.js` file
2. [Set up the Web3 provider](#setup-web3-with-tanssi)
3. Define the `privateKey` for the origin account, the `contractAddress` of the deployed contract, and the `_value` to increment by. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**
4. Create an instance of the contract using the `web3.eth.Contract` function and passing in the `abi` and `contractAddress`
5. Use the contract instance to build the increment transaction using the `methods.increment` function and passing in the `_value` as an input
6. Create the asynchronous `increment` function
7. Use the contract instance and the increment transaction you previously created to sign the transaction with the sender's private key. You'll use the `web3.eth.accounts.signTransaction` function and specify the `to` address, the `data`, and the `gas` for the transaction
8. Send the signed transaction using the `web3.eth.sendSignedTransaction` method and pass in the raw transaction. Then use `await` to wait until the transaction is processed and the transaction receipt is returned
9. Lastly, call the `increment` function

```js
// 1. Import the contract abi
const { abi } = require('./compile');

// 2. Add the Web3 provider logic here:
// {...}

// 3. Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';
const _value = 3;

// 4. Create contract instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 5. Build increment tx
const incrementTx = incrementer.methods.increment(_value);

// 6. Create increment function
const increment = async () => {
  console.log(
    `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
  );

  // 7. Sign Tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: incrementTx.encodeABI(),
      gas: await incrementTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 8. Send Tx and Wait for Receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

// 9. Call increment function
increment();
```

??? code "View the complete script"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/increment.js'
    ```

To run the script, you can enter the following command in your terminal:

```bash
node increment.js
```

If successful, the transaction hash will be displayed in the terminal. You can use the `get.js` script alongside the `increment.js` script to make sure that the value is changing as expected.

![Increment and check value Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-5.webp)

Next you can open the `reset.js` file and take the following steps to create the script:

1. Import the `abi` from the `compile.js` file
2. [Set up the Web3 provider](#setup-web3-with-moonbeam)
3. Define the `privateKey` for the origin account and the `contractAddress` of the deployed contract. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**
4. Create an instance of the contract using the `web3.eth.Contract` function and passing in the `abi` and `contractAddress`
5. Use the contract instance to build the reset transaction using the `methods.reset` function
6. Create the asynchronous `reset` function
7. Use the contract instance and the reset transaction you previously created to sign the transaction with the sender's private key. You'll use the `web3.eth.accounts.signTransaction` function and specify the `to` address, the `data`, and the `gas` for the transaction
8. Send the signed transaction using the `web3.eth.sendSignedTransaction` method and pass in the raw transaction. Then use `await` to wait until the transaction is processed and the transaction receipt is returned
9. Lastly, call the `reset` function

```js
// 1. Import the contract abi
const { abi } = require('./compile');

// 2. Add the Web3 provider logic here:
// {...}

// 3. Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// 4. Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 5. Build reset tx
const resetTx = incrementer.methods.reset();

// 6. Create reset function
const reset = async () => {
  console.log(
    `Calling the reset function in contract at address: ${contractAddress}`
  );

  // 7. Sign tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: resetTx.encodeABI(),
      gas: await resetTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 8. Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

// 9. Call reset function
reset();
```

??? code "View the complete script"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/reset.js'
    ```

To run the script, you can enter the following command in your terminal:

```bash
node reset.js
```

If successful, the transaction hash will be displayed in the terminal. You can use the `get.js` script alongside the `reset.js` script to make sure that the value is changing as expected.

![Reset contract Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-6.webp)

--8<-- 'text/_disclaimers/third-party-content.md'
