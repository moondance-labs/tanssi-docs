---
title: How to use the Polkadot.js API
description: Learn how to use the Polkadot.js API to interact with a ContainerChain to get chain data and send transactions (extrinsics) via the Substrate API.
---

# Polkadot.js API Library

<!-- ![Intro diagram](/images/builders/build/substrate-api/polkadot-js-api/polkadot-js-api-banner.png) -->

## Introduction {: #introduction }

[Polkadot.js](https://wiki.polkadot.network/docs/polkadotjs){target=_blank} is a collection of tools that allow you to interact with Substrate-based blockchains, such as your ContainerChain! The [Polkadot.js API](https://polkadot.js.org/docs/api/){target=_blank} is one component of the Polkadot.js, and is a library that allows application developers to query a ContainerChain and interact with the node's Substrate interfaces using JavaScript, enabling you to read and write data to the network.

You can use the Polkadot.js API to query on-chain data and send extrinsics from the Substrate side of your ContainerChain. You can query runtime constants, chain state, events, transaction (extrinsic) data, and more.

Here you will find an overview of the available functionalities and some commonly used code examples to get you started on interacting with your ContainerChain using the Polkadot.js API library.

--8<-- 'text/common/node-npm.md'

## Install Polkadot.js API {: #installing-polkadot.js-api-library } 

First, you need to install the Polkadot.js API library for your project through a package manager such as `yarn`. Install it in your project directory with the following command:

=== "npm"
    ```
    npm i @polkadot/api
    ```
=== "yarn"
    ```
    yarn add @polkadot/api
    ```

The library also include other core components like Keyring for account management, or some utilities that are used throughout this guide.

## Create an API Provider Instance {: #creating-an-API-provider-instance }

To start interacting with your ContainerChain using the Polkadot.js API, you first need to instantiate an API instance of the Polkadot.js API. Create the `WsProvider` using the websocket endpoint of your ContainerChain.

```javascript
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

const main = async () => {
  // Construct API provider
  const wsProvider = new WsProvider('ContainerChain_WSS_ENDPOINT');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Code goes here

  await api.disconnect();
};

main();
```

### Metadata and Dynamic API Decoration {: #metadata-and-dynamic-api-decoration }

Before diving into the details of performing different tasks via the Polkadot.js API library, it's useful to understand some of the basic workings of the library. 

When the Polkadot.js API connects to a node, one of the first things it does is retrieve the metadata and decorate the API based on the metadata information. The metadata effectively provides data in the form of:

```
api.<type>.<module>.<section>
```

Where `<type>` can be either: 

- `query` - for endpoints to read all the state queries
- `tx` - for endpoints related to transactions 
- `rpc` - for endpoints specific to RPC calls
- `consts` - for endpoints specific to runtime constants

And therefore, none of the information contained in the `api.{query, tx, rpc, consts}.<module>.<method>` endpoints are hard-coded in the API. This allows the Polkadot.js API library to be modular and adapt to any Substrate-based chains with different like [modules](/builders/pallets-precompiles/pallets/){target=_blank}, like your ContainerChain!

## Query On-Chain Data {: #querying-for-information }

In this section, you will learn how to query for on-chain information using the Polkadot.js API library. 

### Chain State Queries {: #state-queries }

This category of queries retrieves information related to the current state of the chain. These endpoints are generally of the form, `api.query.<module>.<method>`, where the module and method decorations are generated through metadata. You can see a list of all available endpoints by examining the `api.query` object, for example via: 

```javascript
console.log(api.query)
```

For example, assuming you've [initialized the API](#creating-an-API-provider-instance), you can retrieve basic account information with the following snippet:

```javascript
// Define wallet address
const addr = 'ADDRESS_HERE';

// Retrieve the last timestamp
const now = await api.query.timestamp.now();

// Retrieve the account balance & current nonce via the system module
const { nonce, data: balance } = await api.query.system.account(addr);

console.log(`${now}: balance of ${balance.free} and a current nonce of ${nonce}`);
```

??? code "View the complete script"
    ```js
    --8<-- 'code/substrate-api/state-queries.js'
    ```

### RPC Queries {: #rpc-queries }

The RPC calls provide the backbone for the transmission of data to and from the node. This means that all API endpoints such as `api.query`, `api.tx` or `api.derive` just wrap RPC calls, providing information in the encoded format as expected by the node. You can see a list of all available endpoints by examining the `api.rpc` object, for example via: 

```javascript
console.log(api.rpc)
```

The `api.rpc` interface follows the a similar format to `api.query`. For instance, assuming you've [initialized the API](#creating-an-API-provider-instance), you can get chain data and latest header with the following snippet:

```javascript
// Retrieve the chain name
const chain = await api.rpc.system.chain();

// Retrieve the latest header
const lastHeader = await api.rpc.chain.getHeader();

// Log the information
console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
```

??? code "View the complete script"
    ```js
    --8<-- 'code/substrate-api/rpc-queries.js'
    ```

### Query Subscriptions {: #query-subscriptions }

The `rpc` API also provide endpoints for subscriptions. Assuming you've [initialized the API](#creating-an-API-provider-instance), you can adapt the previous example to start using subscriptions to listen to new blocks.

```javascript
// Retrieve the chain name
const chain = await api.rpc.system.chain();

// Subscribe to the new headers
await api.rpc.chain.subscribeNewHeads((lastHeader) => {
  console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
});
```

The general pattern for `api.rpc.subscribe*` functions is to pass a callback into the subscription function, and this will be triggered on each new entry as they are imported. 

Other calls under `api.query.*` can be modified in a similar fashion to use subscription by providing a callback function, including calls that have parameters. Here is an example of how to subscribe to balance changes in an account:

```javascript
// Define wallet address
const addr = 'ADDRESS_HERE';

// Subscribe to balance changes for a specified account
await api.query.system.account(addr, ({ nonce, data: balance }) => {
  console.log(`Free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
});

```

??? code "View the complete script"
    ```js
    --8<-- 'code/substrate-api/query-subscriptions.js'
    ```

## Create a Keyring for a Account {: #keyrings }

The Keyring object is used for maintaining key pairs, and the signing of any data, whether it's a transfer, a message, or a contract interaction.  

### Create a Keyring Instance {: #creating-a-keyring-instance }

You can create an instance by just creating an instance of the Keyring class, and specifying the default type of wallet address used. The default wallet type is `SR25519`, but for Ethereum-compatible ContainerChains, the wallet type should be `ethereum`.

```javascript
// Import the keyring as required
import Keyring from '@polkadot/keyring';

// Create a keyring instance (ECDSA)
const keyringECDSA = new Keyring({ type: 'ethereum' });

// Create a keyring instance (SR25519)
const keyring = new Keyring({ type: 'sr25519' });
```

### Add an Account to a Keyring {: #adding-accounts }

There are a number of ways to add an account to the keyring instance, including from the mnemonic phrase and from the shortform private key. The following sample code will provide some examples:

=== "From Mnemonic (ECDSA)"
    ```javascript
    --8<-- 'code/substrate-api/adding-accounts-mnemonic-ecdsa.js'
    ```
=== "From Private Key (ECDSA)"
    ```javascript
    --8<-- 'code/substrate-api/adding-accounts-private-key-ecdsa.js'
    ```
=== "From Mnemonic (SR25519)"
    ```javascript
    --8<-- 'code/substrate-api/adding-accounts-mnemonic-sr25519.js'
    ```

## Sending Transactions  {: #transactions }

Transaction endpoints are exposed on endpoints generally of the form, `api.tx.<module>.<method>`, where the module and method decorations are generated through metadata. These allow you to submit transactions for inclusion in blocks, be it transfers, interacting with pallets, or anything else Moonbeam supports. You can see a list of all available endpoints by examining the `api.tx` object, for example via: 

```javascript
console.log(api.tx)
```

### Send a Basic Transaction {: #sending-basic-transactions }

The Polkadot.js API library can be used to send transactions to the network. For example, assuming you've [initialized the API](#creating-an-API-provider-instance) and a [keyring instance](#creating-a-keyring-instance), you can use the following snippet to send a basic transaction (this code sample will also retrieve the encoded calldata of the transaction as well as the transaction hash after submitting): 

```javascript
// Initialize wallet key pairs
const alice = keyring.addFromUri('ALICE_ACCOUNT_PRIVATE_KEY');
const bob = 'BOB_ACCOUNT_PUBLIC_KEY';

// Form the transaction
const tx = await api.tx.balances
  .transfer(bob, 12345n)

// Retrieve the encoded calldata of the transaction
const encodedCalldata = tx.method.toHex()
console.log(`Encoded calldata: ${encodedCallData}`);

// Sign and send the transaction
const txHash = await tx
    .signAndSend(alice);

// Show the transaction hash
console.log(`Submitted with hash ${txHash}`);
```

??? code "View the complete script"
    ```js
    --8<-- 'code/substrate-api/basic-transactions.js'
    ```

Note that the `signAndSend` function can also accept optional parameters, such as the `nonce`. For example, `signAndSend(alice, { nonce: aliceNonce })`. You can use the [sample code from the State Queries](#state-queries){target=_blank} section to retrieve the correct nonce, including transactions in the mempool.

### Transaction Events {: #transaction-events }

Any transaction will emit events, as a bare minimum this will always be either a `system.ExtrinsicSuccess` or `system.ExtrinsicFailed` event for the specific transaction. These provide the overall execution result for the transaction, that is, either the execution has succeeded or failed.

Depending on the transaction sent, some other events may however be emitted, for instance for a balance transfer event, this could include one or more `balance.Transfer` events.

### Batch Transactions {: #batching-transactions }

The Polkadot.js API allows transactions to be batch processed via the `api.tx.utility.batch` method. The batched transactions are processed sequentially from a single sender. The transaction fee can be estimated using the `paymentInfo` helper method. 

For example, assuming you've [initialized the API](#creating-an-API-provider-instance), a [keyring instance](#creating-a-keyring-instance) and [added an account](#adding-accounts), the following example makes a couple of transfers in one transaction:

```javascript
// Construct a list of transactions to batch
const txs = [
  api.tx.balances.transfer('BOB_ADDRESS', BigInt(12345)),
  api.tx.balances.transfer('CHARLEY_ADDRESS', BigInt(12345)),
];

// Estimate the fees as RuntimeDispatchInfo, using the signer (either
// address or locked/unlocked keypair) 
const info = await api.tx.utility
  .batch(txs)
  .paymentInfo(alice);

console.log(`Estimated fees: ${info}`);

// Construct the batch and send the transactions
api.tx.utility
  .batch(txs)
  .signAndSend(alice, ({ status }) => {
    if (status.isInBlock) {
      console.log(`included in ${status.asInBlock}`);

      // Disconnect API here!
    }
  });
```

??? code "View the complete script"
    ```js
    --8<-- 'code/substrate-api/batch-transactions.js'
    ```

## Utility Functions {: #utilities }

The Polkadot.js API also includes a number of utility libraries for computing commonly used cryptographic primitives and hash functions. 

The following example computes the deterministic transaction hash of a raw Ethereum legacy transaction by first computing its RLP ([Recursive Length Prefix](https://eth.wiki/fundamentals/rlp){target=_blank}) encoding, then hashing the result with keccak256. 

```javascript
import { encode } from '@polkadot/util-rlp';
import { keccakAsHex } from '@polkadot/util-crypto';
import { numberToHex } from '@polkadot/util';

// Define the raw signed transaction
const txData = {
    nonce: numberToHex(1),
    gasPrice: numberToHex(21000000000),
    gasLimit: numberToHex(21000),
    to: '0xc390cC49a32736a58733Cf46bE42f734dD4f53cb',
    value: numberToHex(1000000000000000000),
    data: '',
    v: "0507",
    r: "0x5ab2f48bdc6752191440ce62088b9e42f20215ee4305403579aa2e1eba615ce8",
    s: "0x3b172e53874422756d48b449438407e5478c985680d4aaa39d762fe0d1a11683"
}

// Extract the values to an array
var txDataArray = Object.keys(txData)
    .map(function (key) {
        return txData[key];
    });

// Calculate the RLP encoded transaction
var encoded_tx = encode(txDataArray)

// Hash the encoded transaction using keccak256
console.log(keccakAsHex(encoded_tx))
```

You can check the respective [NPM repository page](https://www.npmjs.com/package/@polkadot/util-crypto/){target=_blank} for a list of available methods in the @polkadot/util-crypto library and their descriptions.
