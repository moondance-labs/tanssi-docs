---
title: EVM Transactions & Contracts with Web3.py
description: Learn how to use the Ethereum Web3 Python Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered Ethereum compatible network.
icon: octicons-code-24
---

# Web3.py Python Library

## Introduction {: #introduction }

[Web3.py](https://web3py.readthedocs.io/en/stable/){target=\_blank} is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with Python. Tanssi EVM networks have an Ethereum-like API available that is fully compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the Ethers.js library to interact with a Tanssi EVM network node as if they were doing so on Ethereum. For more information on Web3.py, check their [documentation site](https://web3py.readthedocs.io/en/stable/){target=\_blank}.

In this guide, you'll learn how to use setup the Web3.py library for your Tanssi-powered EVM network. Next, to showcase the library in action, you'll use Web3.py to send a transaction and deploy a contract on a Tanssi EVM network running in Tanssi's [Dancebox](/builders/tanssi-network/testnet/dancebox/){target=\_blank} TestNet. This guide can be adapted for your own Tanssi EVM network by simply changing the endpoint.

--8<-- 'text/_common/general-py-tutorial-check.md'

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - An account with funds in the Tanssi EVM network you are testing with

## Installing Web3.py {: #install-web3py }

For this guide, you'll need to install the Web3.py library and the Solidity compiler. To install both packages, you can run the following command:

```bash
pip3 install web3 py-solc-x
```

## Setting up the Web3.py Provider {: #setting-up-the-web3py-provider }

Throughout this guide, you'll be creating a bunch of scripts that provide different functionality such as sending a transaction, deploying a contract, and interacting with a deployed contract. In most of these scripts you'll need to create an [Web3.py provider](https://web3py.readthedocs.io/en/stable/providers.html){target=\_blank} to interact with the network.

To create a provider, you can take the following steps:

1. Import the `web3` library
2. Create the `web3` provider suing using the `Web3(Web3.HTTPProvider()))` method and providing the Tanssi EVM network URL

```python
# 1. Import web3.py
from web3 import Web3

# 2. Create web3.py provider
# Insert your RPC URL here
web3 = Web3(Web3.HTTPProvider('{{ networks.dancelight.demo_evm_rpc_url }}')) 
```

Save this code snippet as you'll need it for the scripts that are used in the following sections.

## Send a Transaction {: #send-a-transaction }

During this section, you'll be creating a couple of scripts. The first one will be to check the balances of your accounts before trying to send a transaction. The second script will actually send the transaction.

You can also use the balance script to check the account balances after the transaction has been sent.

### Check Balances Script {: #check-balances-script }

You'll only need one file to check the balances of both addresses before and after the transaction is sent.  To get started, you can create a `balances.py` file by running:

``` bash
touch balances.py
```

Next, you will create the script for this file and complete the following steps:

1. [Set up the Web3 provider](#setting-up-the-web3py-provider)
2. Define the `address_from` and `address_to` variables
3. Get the balance for the accounts using the `web3.eth.get_balance` function and format the results using the `web3.from_wei`

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/balances.py'
```

To run the script and fetch the account balances, you can run the following command:

```bash
python3 balances.py
```

If successful, the balances for the origin and receiving address will be displayed in your terminal in {{ networks.dancelight.demo_evm_token_symbol }}.

![Check Balance Ethers.js](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-1.webp)


### Send Transaction Script {: #send-transaction-script }

You'll only need one file for executing a transaction between accounts. For this example, you'll be transferring 1 DEV token from an origin address (from which you hold the private key) to another address. To get started, you can create a `transaction.py` file by running:

```bash
touch transaction.py
```

Next, you will create the script for this file and complete the following steps:

1. Add imports, including Web3.py and the `rpc_gas_price_strategy`, which will be used in the following steps to get the gas price used for the transaction
2. [Set up the Web3 provider](#setting-up-the-web3py-provider)
3. Define the `account_from`, including the `private_key`, and the `address_to` variables. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**
4. Use the [Web3.py Gas Price API](https://web3py.readthedocs.io/en/stable/gas_price.html){target=\_blank} to set a gas price strategy. For this example, you'll use the imported `rpc_gas_price_strategy`
5. Create and sign the transaction using the `web3.eth.account.sign_transaction` function. Pass in the `nonce` `gas`, `gasPrice`, `to`, and `value` for the transaction along with the sender's `private_key`. To get the `nonce` you can use the `web3.eth.get_transaction_count` function and pass in the sender's address. To predetermine the `gasPrice` you'll use the `web3.eth.generate_gas_price` function. For the `value`, you can format the amount to send from an easily readable format to Wei using the `web3.to_wei` function
6. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/transaction.py'
```

To run the script, you can run the following command in your terminal:

```bash
python3 transaction.py
```

If the transaction was succesful, in your terminal you'll see the transaction hash has been printed out.

You can also use the `balances.py` script to check that the balances for the origin and receiving accounts have changed. The entire workflow would look like this:

![Send Tx Web3.py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-2.webp)

## Deploy a Contract {: #deploy-a-contract }

--8<-- 'text/builders/toolkit/ethereum-api/libraries/contract.md'

### Compile Contract Script {: #compile-contract-script }

In this section, you'll create a script that uses the Solidity compiler to output the bytecode and interface (ABI) for the `Incrementer.sol` contract. To get started, you can create a `compile.py` file by running:

```bash
touch compile.py
```

Next, you will create the script for this file and complete the following steps:

1. Import the `solcx` package
2. **Optional** - If you haven't already installed the Solidity compiler, you can do so with by using the `solcx.install_solc` function
3. Compile the `Incrementer.sol` function using the `solcx.compile_files` function
4. Export the contract's ABI and bytecode

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/compile.py'
```

!!! note
    If you see an error stating that `Solc is not installed`, uncomment the step 2 described in the code snippet.

### Deploy Contract Script {: #deploy-contract-script }

With the script for compiling the `Incrementer.sol` contract in place, you can then use the results to send a signed transaction that deploys it. To do so, you can create a file for the deployment script called `deploy.py`:

```bash
touch deploy.py
```

Next, you will create the script for this file and complete the following steps:

1. Add imports, including Web3.py and the ABI and bytecode of the `Incrementer.sol` contract
2. [Set up the Web3 provider](#setting-up-the-web3py-provider)
3. Define the `account_from`, including the `private_key`. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**
4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and bytecode of the contract
5. Build a constructor transaction using the contract instance and passing in the value to increment by. For this example, you can use `5`. You'll then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function
6. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the constructor transaction and the `private_key` of the sender
7. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/deploy.py'
```

To run the script, you can enter the following command into your terminal:

```bash
python3 deploy.py
```

If successful, the contract's address will be displayed in the terminal.

![Deploy Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-3.webp)

### Read Contract Data (Call Methods) {: #read-contract-data }

Call methods are the type of interaction that don't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.

To get started, you can create a file and name it `get.py`:

```bash
touch get.py
```

Then you can take the following steps to create the script:

1. Add imports, including Web3.py and the ABI of the `Incrementer.sol` contract
2. [Set up the Web3 provider](#setting-up-the-web3py-provider)
3. Define the `contract_address` of the deployed contract
4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract
5. Using the contract instance, you can then call the `number` function

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/get.py'
```

To run the script, you can enter the following command in your terminal:

```bash
python3 get.py
```

If successful, the value will be displayed in the terminal.

![Read from Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-4.webp)

### Interact with Contract (Send Methods) {: #interact-with-contract }

Send methods are the type of interaction that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. In this section, you'll create two scripts: one to increment and one to reset the incrementer. To get started, you can create a file for each script and name them `increment.py` and `reset.py`:

```bash
touch increment.py reset.py
```

Open the `increment.py` file and take the following steps to create the script:

1. Add imports, including Web3.py and the ABI of the `Incrementer.sol` contract
2. [Set up the Web3 provider](#setting-up-the-web3py-provider)
3. Define the `account_from`, including the `private_key`, the `contract_address` of the deployed contract, and the `value` to increment by. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**
4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract
5. Build the increment transaction using the contract instance and passing in the value to increment by. You'll then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function
6. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the increment transaction and the `private_key` of the sender
7. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/increment.py'
```

To run the script, you can enter the following command in your terminal:

```bash
python3 increment.py
```

If successful, the transaction hash will be displayed in the terminal. You can use the `get.py` script alongside the `increment.py` script to make sure that value is changing as expected:

![Increment Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-5.webp)

Next you can open the `reset.py` file and take the following steps to create the script:

1. Add imports, including Web3.py and the ABI of the `Incrementer.sol` contract
2. [Set up the Web3 provider](#setting-up-the-web3py-provider)
3. Define the `account_from`, including the `private_key`, and the `contract_address` of the deployed contract. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**
4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract
5. Build the reset transaction using the contract instance. You'll then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function
6. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the reset transaction and the `private_key` of the sender
7. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function

```python
--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/reset.py'
```

To run the script, you can enter the following command in your terminal:

```bash
python3 reset.py
```

If successful, the transaction hash will be displayed in the terminal. You can use the `get.py` script alongside the `reset.py` script to make sure that value is changing as expected:

![Reset Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-6.webp)

--8<-- 'text/_disclaimers/third-party-content.md'
