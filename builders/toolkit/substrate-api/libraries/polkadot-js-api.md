---
title: How to use the Polkadot.js API
description: Learn how to use the Polkadot.js API to interact with a Tanssi appchain to get chain data and send transactions (extrinsics) via the Substrate API.
---

# Polkadot.js API Library

## Introduction {: #introduction }

[Polkadot.js](https://wiki.polkadot.network/docs/polkadotjs){target=\_blank} is a collection of tools that allow you to interact with Substrate-based blockchains, such as your appchain! The [Polkadot.js API](https://polkadot.js.org/docs/api){target=\_blank} is one component of Polkadot.js and is a library that allows application developers to query an appchain and interact with the node's Substrate interfaces using JavaScript, enabling you to read and write data to the network.

You can use the Polkadot.js API to query on-chain data and send extrinsics from the Substrate side of your Tanssi appchain. You can query runtime constants, chain state, events, transaction (extrinsic) data, and more.

Here you will find an overview of the available functionalities and some commonly used [TypeScript](https://www.typescriptlang.org){target=\_blank} code examples to get you started on interacting with your Tanssi appchain using the Polkadot.js API library.

--8<-- 'text/_common/general-js-tutorial-check.md'

## Install Polkadot.js API {: #installing-polkadot.js-api-library }

First, you need to install the Polkadot.js API library and the RLP library through a package manager such as `yarn`. Both dependencies are required to run the examples in this guide successfully.

Install them in your project directory with the following command:

=== "npm"

    ```bash
    npm i @polkadot/api
    npm i @polkadot/util-rlp
    ```

=== "yarn"

    ```bash
    yarn add @polkadot/api
    yarn add @polkadot/util-rlp
    ```

The library also includes other core components, like Keyring for account management or some utilities that are used throughout this guide.

## Create an API Provider Instance {: #creating-an-API-provider-instance }

To start interacting with your Tanssi appchain using the Polkadot.js API, you first need to create an instance of the Polkadot.js API. Create the `WsProvider` using the WebSocket endpoint of your Tanssi appchain.

```typescript
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

const main = async () => {
  // Construct API provider
  const wsProvider = new WsProvider('INSERT_APPCHAIN_WSS_ENDPOINT');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Code goes here

  await api.disconnect();
};

main();
```

### Metadata and Dynamic API Decoration {: #metadata-and-dynamic-api-decoration }

Before diving into the details of performing different tasks via the Polkadot.js API library, it's useful to understand some of the basic workings of the library.

When the Polkadot.js API connects to a node, one of the first things it does is retrieve the metadata and decorate the API based on the metadata information. The metadata effectively provides data in the form of:

```text
api.<type>.<module>.<section>
```

Where `<type>` can be either:

- `query` - for endpoints to read all the state queries
- `tx` - for endpoints related to transactions
- `rpc` - for endpoints specific to RPC calls
- `consts` - for endpoints specific to runtime constants

And therefore, none of the information contained in the `api.{query, tx, rpc, consts}.<module>.<method>` endpoints are hard-coded in the API. This allows the Polkadot.js API library to be modular and adapt to any Substrate-based chains with different [modules](/learn/framework/modules){target=\_blank}, like your Tanssi appchain!

## Query On-Chain Data {: #querying-for-information }

In this section, you will learn how to query for on-chain information using the Polkadot.js API library.

### Chain State Queries {: #state-queries }

This category of queries retrieves information related to the current state of the chain. These endpoints are generally of the form `api.query.<module>.<method>`, where the module and method decorations are generated through metadata. You can see a list of all available endpoints by examining the `api.query` object, for example via:

```typescript
console.log(api.query);
```

For example, assuming you've [initialized the API](#creating-an-API-provider-instance), you can retrieve basic account information with the following snippet:

```typescript
// Define wallet address
const addr = 'INSERT_ADDRESS';

// Retrieve the last timestamp
const now = await api.query.timestamp.now();

// Retrieve the account balance & current nonce via the system module
const { nonce, data: balance } = await api.query.system.account(addr);

console.log(
  `${now}: balance of ${balance.free} and a current nonce of ${nonce}`
);
```

??? code "View the complete script"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/state-queries.ts'
    ```

### RPC Queries {: #rpc-queries }

The RPC calls provide the backbone for the transmission of data to and from the node. This means that all API endpoints such as `api.query`, `api.tx` or `api.derive` just wrap RPC calls, providing information in the encoded format as expected by the node. You can see a list of all available endpoints by examining the `api.rpc` object, for example, via:

```typescript
console.log(api.rpc);
```

The `api.rpc` interface follows the a similar format to `api.query`. For instance, assuming you've [initialized the API](#creating-an-API-provider-instance), you can get chain data and latest header with the following snippet:

```typescript
// Retrieve the chain name
const chain = await api.rpc.system.chain();

// Retrieve the latest header
const lastHeader = await api.rpc.chain.getHeader();

// Log the information
console.log(
  `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`
);
```

??? code "View the complete script"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/rpc-queries.ts'
    ```

### Query Subscriptions {: #query-subscriptions }

The `rpc` API also provides endpoints for subscriptions. Assuming you've [initialized the API](#creating-an-API-provider-instance), you can adapt the previous example to start using subscriptions to listen to new blocks.

```typescript
// Retrieve the chain name
const chain = await api.rpc.system.chain();

// Subscribe to the new headers
await api.rpc.chain.subscribeNewHeads((lastHeader) => {
  console.log(
    `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`
  );
});
```

The general pattern for `api.rpc.subscribe*` functions is to pass a callback into the subscription function, and this will be triggered on each new entry as they are imported.

Other calls under `api.query.*` can be modified in a similar fashion to use subscription by providing a callback function, including calls that have parameters. Here is an example of how to subscribe to balance changes in an account:

```typescript
// Define wallet address
const addr = 'INSERT_ADDRESS';

// Subscribe to balance changes for a specified account
await api.query.system.account(addr, ({ nonce, data: balance }) => {
  console.log(
    `Free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`
  );
});
```

??? code "View the complete script"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/query-subscriptions.ts'
    ```

## Create a Keyring for an Account {: #keyrings }

The Keyring object is used for maintaining key pairs, and the signing of any data, whether it's a transfer, a message, or a contract interaction.  

### Create a Keyring Instance {: #creating-a-keyring-instance }

You can create an instance by just creating an instance of the Keyring class and specifying the default type of wallet address used. The default wallet type is `SR25519`, but for Tanssi EVM-compatible appchains, the wallet type should be `ethereum`.

```typescript
// Import the keyring as required
import Keyring from '@polkadot/keyring';

// Create a keyring instance (ECDSA)
const keyringECDSA = new Keyring({ type: 'ethereum' });

// Create a keyring instance (SR25519)
const keyring = new Keyring({ type: 'sr25519' });
```

### Add an Account to a Keyring {: #adding-accounts }

There are a number of ways to add an account to the keyring instance, including from the mnemonic phrase and the short-form private key. The following sample code will provide some examples:

=== "From Mnemonic (ECDSA)"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-ecdsa.ts'
    ```

=== "From Private Key (ECDSA)"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-private-key-ecdsa.ts'
    ```

=== "From Mnemonic (SR25519)"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-sr25519.ts'
    ```

## Sending Transactions  {: #transactions }

Transaction endpoints are exposed on endpoints generally of the form `api.tx.<module>.<method>`, where the module and method decorations are generated through metadata. These allow you to submit transactions for inclusion in blocks, be they transfers, interactions with pallets, or anything else Moonbeam supports. You can see a list of all available endpoints by examining the `api.tx` object, for example, via:

```typescript
console.log(api.tx);
```

### Send a Basic Transaction {: #sending-basic-transactions }

The Polkadot.js API library can be used to send transactions to the network. For example, assuming you've [initialized the API](#creating-an-API-provider-instance) and a [keyring instance](#creating-a-keyring-instance), you can use the following snippet to send a basic transaction (this code sample will also retrieve the encoded calldata of the transaction as well as the transaction hash after submitting):

```typescript
// Initialize wallet key pairs
const alice = keyring.addFromUri('INSERT_ALICES_PRIVATE_KEY');

// Form the transaction
const tx = await api.tx.balances.transferAllowDeath(
  'INSERT_BOBS_ADDRESS',
  BigInt(INSERT_VALUE)
);

// Retrieve the encoded calldata of the transaction
const encodedCallData = tx.method.toHex()
console.log(`Encoded calldata: ${encodedCallData}`);

// Sign and send the transaction
const txHash = await tx.signAndSend(alice);

// Show the transaction hash
console.log(`Submitted with hash ${txHash}`);
```

??? code "View the complete script"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/basic-transactions.ts'
    ```

Note that the `signAndSend` function can also accept optional parameters, such as the `nonce`. For example, `signAndSend(alice, { nonce: aliceNonce })`. You can use the [sample code from the State Queries](#state-queries){target=\_blank} section to retrieve the correct nonce, including transactions in the mempool.

### Fee Information {: #fees}

The transaction endpoint also offers a method to obtain weight information for a given `api.tx.<module>.<method>`. To do so, you'll need to use the `paymentInfo` function after having built the entire transaction with the specific `module` and `method`.

The `paymentInfo` function returns weight information in terms of `refTime` and `proofSize`, which can be used to determine the transaction fee. This is extremely helpful when crafting remote execution calls via XCM.

For example, assuming you've [initialized the API](#creating-an-API-provider-instance), the following snippet shows how you can get the weight info for a simple balance transfer between two accounts:

```typescript
// Transaction to get weight information
const tx = api.tx.balances.transferAllowDeath('INSERT_BOBS_ADDRESS', BigInt(INSERT_VALUE));

// Get weight info
const { partialFee, weight } = await tx.paymentInfo('INSERT_SENDERS_ADDRESS');

console.log(`Transaction weight: ${weight}`);
console.log(`Transaction fee: ${partialFee.toHuman()}`);
```

??? code "View the complete script"
    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/payment-info.ts'
    ```


### Transaction Events {: #transaction-events }

Any transaction will emit events; at a bare minimum, this will always be a `system.ExtrinsicSuccess` or `system.ExtrinsicFailed` event for the specific transaction. These provide the overall execution result for the transaction, that is, whether the execution has succeeded or failed.

Depending on the transaction sent, some other events may be emitted; for instance, for a balance transfer event, this could include one or more `balance.Transfer` events.

### Batch Transactions {: #batching-transactions }

The Polkadot.js API allows transactions to be batch processed via the `api.tx.utility.batch` method. The batched transactions are processed sequentially from a single sender. The transaction fee can be estimated using the `paymentInfo` helper method.

For example, assuming you've [initialized the API](#creating-an-API-provider-instance), a [keyring instance](#creating-a-keyring-instance) and [added an account](#adding-accounts), the following example makes a couple of transfers in one transaction:

```typescript
// Construct a list of transactions to batch
const txs = [
  api.tx.balances.transferAllowDeath('INSERT_BOBS_ADDRESS', BigInt(INSERT_VALUE)),
  api.tx.balances.transferAllowDeath('INSERT_CHARLEYS_ADDRESS', BigInt(INSERT_VALUE)),
];

// Estimate the fees as RuntimeDispatchInfo, using the signer (either
// address or locked/unlocked keypair) 
const info = await api.tx.utility
  .batch(txs)
  .paymentInfo(alice);

console.log(`Estimated fees: ${info}`);

// Construct the batch and send the transactions
await api.tx.utility
  .batch(txs)
  .signAndSend(alice, ({ status }) => {
    if (status.isInBlock) {
      console.log(`included in ${status.asInBlock}`);

      // Disconnect API here!
    }
  });
```

??? code "View the complete script"

    ```typescript
    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/batch-transactions.ts'
    ```

## Sample Code for Monitoring Native Token Transfers { #sample-code-for-monitoring-native-token-transfers }

The following code samples will demonstrate how to listen to both types of native token transfers, sent via Substrate or Ethereum API, using either the [Polkadot.js API library](https://polkadot.js.org/docs/api/start){target=\_blank} or [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar){target=\_blank}. The following code snippets are for demo purposes only and should not be used without modification and further testing in a production environment.

The following code snippet uses [`subscribeFinalizedHeads`](https://polkadot.js.org/docs/substrate/rpc/#subscribefinalizedheads-header){target=\_blank} to subscribe to new finalized block headers, and loops through extrinsics fetched from the block, and retrieves the events of each extrinsic.

Then, it checks if any event corresponds to a `balances.Transfer` event. If so, it will extract the `from`, `to`, `amount`, and the `tx hash` of the transfer and display it on the console. Note that the `amount` is shown in the smallest unit (Wei).  You can find all the available information about Polkadot.js and the Substrate JSON RPC in their [official documentation site](https://polkadot.js.org/docs/substrate/rpc){target=\_blank}.

```typescript
--8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/balance-event.ts'
```

In addition, you can find more sample code snippets related to more specific cases around balance transfers at this [GitHub page](https://gist.github.com/crystalin/b2ce44a208af60d62b5ecd1bad513bce){target=\_blank}.

## Utility Functions {: #utilities }

The Polkadot.js API also includes a number of utility libraries for computing commonly used cryptographic primitives and hash functions.

The following example computes the deterministic transaction hash of a raw Ethereum legacy transaction by first computing its RLP ([Recursive Length Prefix](https://eth.wiki/fundamentals/rlp){target=\_blank}) encoding and then hashing the result with keccak256.

```typescript
import { encode } from '@polkadot/util-rlp';
import { keccakAsHex } from '@polkadot/util-crypto';
import { numberToHex } from '@polkadot/util';

// Set the key type to string
type txType = {
  [key: string]: any;
};

// Define the raw signed transaction
const txData: txType = {
  nonce: numberToHex(1),
  gasPrice: numberToHex(21000000000),
  gasLimit: numberToHex(21000),
  to: '0xc390cC49a32736a58733Cf46bE42f734dD4f53cb',
  value: numberToHex(1000000000000000000),
  data: '',
  v: '0507',
  r: '0x5ab2f48bdc6752191440ce62088b9e42f20215ee4305403579aa2e1eba615ce8',
  s: '0x3b172e53874422756d48b449438407e5478c985680d4aaa39d762fe0d1a11683',
};

// Extract the values to an array
var txDataArray = Object.keys(txData).map(function (key) {
  return txData[key];
});

// Calculate the RLP encoded transaction
var encoded_tx = encode(txDataArray);

// Hash the encoded transaction using keccak256
console.log(keccakAsHex(encoded_tx));
```

You can check the respective [NPM repository page](https://www.npmjs.com/package/@polkadot/util-crypto){target=\_blank} for a list of available methods in the `@polkadot/util-crypto` library and their descriptions.

--8<-- 'text/_disclaimers/third-party-content.md'
