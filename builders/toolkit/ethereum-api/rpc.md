---
title: JSON-RPC API Methods
description: Learn about the supported JSON-RPC API methods for querying your Tanssi EVM appchain, including standard Ethereum methods and custom methods unique to Tanssi.
icon: material-code-json
---

# JSON-RPC API Methods

## Standard Ethereum JSON-RPC Methods {: #standard-rpc-methods }

As Tanssi's EVM Compatibility is derived from [Frontier](https://github.com/polkadot-evm/frontier){target=\_blank} and closely modeled after Moonbeam's Ethereum compatibility, Tanssi nodes support a wide variety of standard supported Ethereum JSON-RPC methods.

Nevertheless, not all Ethereum JSON-RPC methods are supported; some of those supported return default values (those related to Ethereum's PoW consensus mechanism in particular). This guide provides a comprehensive list of supported Ethereum JSON-RPC methods on Tanssi. Developers can quickly reference this list to understand the available functionality for interfacing with Tanssi EVM Appchains.

The basic JSON-RPC methods from the Ethereum API supported by Tanssi are:

- **[eth_protocolVersion](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_protocolversion){target=\_blank}** — returns `1` by default
- **[eth_syncing](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_syncing){target=\_blank}** — returns an object with data about the sync status or `false`
- **[eth_hashrate](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_hashrate){target=\_blank}** — returns `"0x0"` by default
- **[eth_coinbase](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_coinbase){target=\_blank}** — returns the latest block author. Not necessarily a finalized block
- **[eth_mining](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_mining){target=\_blank}** — returns `false` by default
- **[eth_chainId](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid){target=\_blank}** — returns the chain ID used for signing at the current block
- **[eth_gasPrice](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice){target=\_blank}** — returns the base fee per unit of gas used. This is currently the minimum gas price for each network
- **[eth_accounts](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts){target=\_blank}** — returns a list of addresses owned by the client
- **[eth_blockNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber){target=\_blank}** — returns the highest available block number
- **[eth_getBalance](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance){target=\_blank}** — returns the balance of the given address
- **[eth_getStorageAt](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat){target=\_blank}** — returns the content of the storage at a given address
- **[eth_getBlockByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash){target=\_blank}** — returns information about the block of the given hash, including `baseFeePerGas` on post-London blocks
- **[eth_getBlockByNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber){target=\_blank}** — returns information about the block specified by block number, including `baseFeePerGas` on post-London blocks
- **[eth_getBlockReceipts](https://docs.alchemy.com/reference/eth-getblockreceipts){target=\_blank}** — returns all transaction receipts for a given block
- **[eth_getTransactionCount](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount){target=\_blank}** — returns the number of transactions sent from the given address (nonce)
- **[eth_getBlockTransactionCountByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash){target=\_blank}** — returns the number of transactions in a block with a given block hash
- **[eth_getBlockTransactionCountByNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber){target=\_blank}** — returns the number of transactions in a block with a given block number
- **[eth_getUncleCountByBlockHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclecountbyblockhash){target=\_blank}** —  returns `"0x0"` by default
- **[eth_getUncleCountByBlockNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclecountbyblocknumber){target=\_blank}** — returns `"0x0"` by default
- **[eth_getCode](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode){target=\_blank}** — returns the code at the given address at the given block number
- **[eth_sendTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction){target=\_blank}** — creates a new message call transaction or a contract creation, if the data field contains code. Returns the transaction hash or the zero hash if the transaction is not yet available
- **[eth_sendRawTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction){target=\_blank}** — creates a new message call transaction or a contract creation for signed transactions. Returns the transaction hash or the zero hash if the transaction is not yet available
- **[eth_call](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call){target=\_blank}** — executes a new message call immediately without creating a transaction on the blockchain, returning the value of the executed call
- **[eth_estimateGas](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas){target=\_blank}** — returns an estimated amount of gas necessary for a given transaction to succeed. You can optionally specify a `gasPrice` or `maxFeePerGas` and `maxPriorityFeePerGas`
- **[eth_feeHistory](https://docs.alchemy.com/reference/eth-feehistory){target=\_blank}** — returns `baseFeePerGas`, `gasUsedRatio`, `oldestBlock`, and `reward` for a specified range of up to 1024 blocks
- **[eth_getTransactionByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyhash){target=\_blank}** — returns the information about a transaction with a given hash. EIP-1559 transactions have `maxPriorityFeePerGas` and `maxFeePerGas` fields
- **[eth_getTransactionByBlockHashAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyblockhashandindex){target=\_blank}** — returns information about a transaction at a given block hash and a given index position. EIP-1559 transactions have `maxPriorityFeePerGas` and `maxFeePerGas` fields
- **[eth_getTransactionByBlockNumberAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyblocknumberandindex){target=\_blank}** — returns information about a transaction at a given block number and a given index position. EIP-1559 transactions have `maxPriorityFeePerGas` and `maxFeePerGas` fields
- **[eth_getTransactionReceipt](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionreceipt){target=\_blank}** — returns the transaction receipt of a given transaction hash
- **[eth_getUncleByBlockHashAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclebyblockhashandindex){target=\_blank}** — returns `null` by default
- **[eth_getUncleByBlockNumberAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclebyblocknumberandindex){target=\_blank}** — returns `null` by default
- **[eth_getLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs){target=\_blank}** — returns an array of all logs matching a given filter object
- **[eth_newFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter){target=\_blank}** — creates a filter object based on the input provided. Returns a filter ID
- **[eth_newBlockFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newblockfilter){target=\_blank}** — creates a filter in the node to notify when a new block arrives. Returns a filter ID
- **[eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges){target=\_blank}** — polling method for filters (see methods above). Returns an array of logs that occurred since the last poll
- **[eth_getFilterLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs){target=\_blank}** — returns an array of all the logs matching the filter with a given ID
- **[eth_uninstallFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallfilter){target=\_blank}** — uninstall a filter with a given ID. It should be used when polling is no longer needed. Filters timeout when they are not requested using `eth_getFilterChanges` after some time

## Custom JSON-RPC Methods {: #custom-json-rpc-methods }

Tanssi nodes support two custom JSON-RPC endpoints: `frnt_isBlockFinalized` and `frnt_isTxFinalized`. Tanssi features deterministic finality (as opposed to probabilistic like Bitcoin's finality), which means that at any point of time, the answer to whether a block or transaction is finalized or not can be answered with a definitive yes or no. Tanssi has built these two custom endpoints to provide valuable functionality for checking the finality of on-chain events.

???+ function "frnt_isBlockFinalized - checks for the finality of the block given by its block hash"

    === "Parameters"

        - `block_hash` ++"string"++ - the hash of the block, accepts either Substrate-style or Ethereum-style block hash as its input

    === "Returns"

        ++"boolean"++ - `true` if the block is finalized, `false` if the block is not finalized or not found

    === "Example"

        ```bash
        curl -H "Content-Type: application/json" -X POST --data '{
          "jsonrpc": "2.0",
          "id": "1",
          "method": "frnt_isBlockFinalized",
          "params": ["INSERT_BLOCK_HASH"]
        }' {{ networks.dancebox.rpc_url }}
        ```

???+ function "frnt_isTxFinalized - checks for the finality of a transaction given its EVM transaction hash"

    === "Parameters"

        - `tx_hash` ++"string"++ - the EVM transaction hash of the transaction 

    === "Returns"

        ++"boolean"++ - `true` if the transaction is finalized, `false` if the transaction is not finalized or not found

    === "Example"

        ```bash
        curl -H "Content-Type: application/json" -X POST --data '{
          "jsonrpc": "2.0",
          "id": "1",
          "method": "frnt_isTxFinalized",
          "params": ["INSERT_TRANSACTION_HASH"]
        }' {{ networks.dancebox.rpc_url }}
        ```
