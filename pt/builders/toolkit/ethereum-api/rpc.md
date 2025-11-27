---
title: JSON-RPC API Methods
description: Learn about the supported JSON-RPC API methods for querying your Tanssi EVM network, including standard Ethereum methods and custom methods unique to Tanssi.
icon: material-code-json
categories: Reference
---

## { "source_path": "builders/toolkit/ethereum-api/rpc.md", "source_language": "EN", "target_language": "PT", "checksum": "45b68aaae9145a902980b03531ab2f2abba95d504cc926cfeac273512294fb2a", "content": "--- title: JSON-RPC API Methods description: Learn about the supported JSON-RPC API methods for querying your Tanssi EVM network, including standard Ethereum methods and custom methods unique to Tanssi. icon: material-code-json categories: Reference

# JSON-RPC API Methods

## Standard Ethereum JSON-RPC Methods {: #standard-rpc-methods }

As Tanssi's EVM Compatibility is derived from [Frontier](https://github.com/polkadot-evm/frontier){target=\_blank} and closely modeled after Moonbeam's Ethereum compatibility, Tanssi nodes support a wide variety of standard supported Ethereum JSON-RPC methods.

Nevertheless, not all Ethereum JSON-RPC methods are supported; some of those supported return default values (those related to Ethereum's PoW consensus mechanism in particular). This guide provides a comprehensive list of supported Ethereum JSON-RPC methods on Tanssi. Developers can quickly reference this list to understand the available functionality for interfacing with Tanssi EVM networks.

The basic JSON-RPC methods from the Ethereum API supported by Tanssi are:

- **[eth_protocolVersion](https://ethereum.org/developers/docs/apis/json-rpc/#eth_protocolversion){target=\_blank}** — returns `1` by default
- **[eth_syncing](https://ethereum.org/developers/docs/apis/json-rpc/#eth_syncing){target=\_blank}** — returns an object with data about the sync status or `false`
- **[eth_hashrate](https://ethereum.org/developers/docs/apis/json-rpc/#eth_hashrate){target=\_blank}** — returns `"0x0"` by default
- **[eth_coinbase](https://ethereum.org/developers/docs/apis/json-rpc/#eth_coinbase){target=\_blank}** — returns the latest block author. Not necessarily a finalized block
- **[eth_mining](https://ethereum.org/developers/docs/apis/json-rpc/#eth_mining){target=\_blank}** — returns `false` by default
- **[eth_chainId](https://ethereum.org/developers/docs/apis/json-rpc/#eth_chainid){target=\_blank}** — returns the chain ID used for signing at the current block
- **[eth_gasPrice](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gasprice){target=\_blank}** — returns the base fee per unit of gas used. This is currently the minimum gas price for each network
- **[eth_accounts](https://ethereum.org/developers/docs/apis/json-rpc/#eth_accounts){target=\_blank}** — returns a list of addresses owned by the client
- **[eth_blockNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_blocknumber){target=\_blank}** — returns the highest available block number
- **[eth_getBalance](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getbalance){target=\_blank}** — returns the balance of the given address
- **[eth_getStorageAt](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getstorageat){target=\_blank}** — returns the content of the storage at a given address
- **[eth_getBlockByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblockbyhash){target=\_blank}** — returns information about the block of the given hash, including `baseFeePerGas` on post-London blocks
- **[eth_getBlockByNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblockbynumber){target=\_blank}** — returns information about the block specified by block number, including `baseFeePerGas` on post-London blocks
- **[eth_getBlockReceipts](https://www.alchemy.com/docs/node/ethereum/ethereum-api-endpoints/eth-get-block-receipts){target=\_blank}** — returns all transaction receipts for a given block
- **[eth_getTransactionCount](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactioncount){target=\_blank}** — returns the number of transactions sent from the given address (nonce)
- **[eth_getBlockTransactionCountByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash){target=\_blank}** — returns the number of transactions in a block with a given block hash
- **[eth_getBlockTransactionCountByNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber){target=\_blank}** — returns the number of transactions in a block with a given block number
- **[eth_getUncleCountByBlockHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclecountbyblockhash){target=\_blank}** —  returns `"0x0"` by default
- **[eth_getUncleCountByBlockNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclecountbyblocknumber){target=\_blank}** — returns `"0x0"` by default
- **[eth_getCode](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getcode){target=\_blank}** — returns the code at the given address at the given block number
- **[eth_sendTransaction](https://ethereum.org/developers/docs/apis/json-rpc/#eth_sendtransaction){target=\_blank}** — creates a new message call transaction or a contract creation, if the data field contains code. Returns the transaction hash or the zero hash if the transaction is not yet available
- **[eth_sendRawTransaction](https://ethereum.org/developers/docs/apis/json-rpc/#eth_sendrawtransaction){target=\_blank}** — creates a new message call transaction or a contract creation for signed transactions. Returns the transaction hash or the zero hash if the transaction is not yet available
- **[eth_call](https://ethereum.org/developers/docs/apis/json-rpc/#eth_call){target=\_blank}** — executes a new message call immediately without creating a transaction on the blockchain, returning the value of the executed call
- **[eth_estimateGas](https://ethereum.org/developers/docs/apis/json-rpc/#eth_estimategas){target=\_blank}** — returns an estimated amount of gas necessary for a given transaction to succeed. You can optionally specify a `gasPrice` or `maxFeePerGas` and `maxPriorityFeePerGas`
- **[eth_feeHistory](https://www.alchemy.com/docs/node/ethereum/ethereum-api-endpoints/eth-fee-history){target=\_blank}** — returns `baseFeePerGas`, `gasUsedRatio`, `oldestBlock`, and `reward` for a specified range of up to 1024 blocks
- **[eth_getTransactionByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyhash){target=\_blank}** — returns the information about a transaction with a given hash. EIP-1559 transactions have `maxPriorityFeePerGas` and `maxFeePerGas` fields
- **[eth_getTransactionByBlockHashAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyblockhashandindex){target=\_blank}** — returns information about a transaction at a given block hash and a given index position. EIP-1559 transactions have `maxPriorityFeePerGas` and `maxFeePerGas` fields
- **[eth_getTransactionByBlockNumberAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyblocknumberandindex){target=\_blank}** — returns information about a transaction at a given block number and a given index position. EIP-1559 transactions have `maxPriorityFeePerGas` and `maxFeePerGas` fields
- **[eth_getTransactionReceipt](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionreceipt){target=\_blank}** — returns the transaction receipt of a given transaction hash
- **[eth_getUncleByBlockHashAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclebyblockhashandindex){target=\_blank}** — returns `null` by default
- **[eth_getUncleByBlockNumberAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclebyblocknumberandindex){target=\_blank}** — returns `null` by default
- **[eth_getLogs](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getlogs){target=\_blank}** — returns an array of all logs matching a given filter object
- **[eth_newFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_newfilter){target=\_blank}** — creates a filter object based on the input provided. Returns a filter ID
- **[eth_newBlockFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_newblockfilter){target=\_blank}** — creates a filter in the node to notify when a new block arrives. Returns a filter ID
- **[eth_getFilterChanges](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getfilterchanges){target=\_blank}** — polling method for filters (see methods above). Returns an array of logs that occurred since the last poll
- **[eth_getFilterLogs](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getfilterlogs){target=\_blank}** — returns an array of all the logs matching the filter with a given ID
- **[eth_uninstallFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_uninstallfilter){target=\_blank}** — uninstall a filter with a given ID. It should be used when polling is no longer needed. Filters timeout when they are not requested using `eth_getFilterChanges` after some time

## Custom JSON-RPC Methods {: #custom-json-rpc-methods }

Tanssi nodes support two custom JSON-RPC endpoints: `frnt_isBlockFinalized` and `frnt_isTxFinalized`. Tanssi features deterministic finality (as opposed to probabilistic like Bitcoin's finality), which means that at any point of time, the answer to whether a block or transaction is finalized or not can be answered with a definitive yes or no. Tanssi has built these two custom endpoints to provide valuable functionality for checking the finality of on-chain events.

???+ function "frnt_isBlockFinalized - checks for the finality of the block given by its block hash"

````
    ```bash

=== "Parameters"

    - `block_hash` ++"string"++ - the hash of the block, accepts either Substrate-style or Ethereum-style block hash as its input

=== "Returns"

    ```
        ```bash

=== "Example"

    ```bash
    curl -H "Content-Type: application/json" -X POST --data '{
      "jsonrpc": "2.0",
      "id": "1",
        ```

      "params": ["INSERT_BLOCK_HASH"]
    }' {{ networks.dancelight.demo_evm_rpc_url }}

    ```
````

???+ function "frnt_isTxFinalized - checks for the finality of a transaction given its EVM transaction hash"

````
    ```bash

=== "Parameters"

    - `tx_hash` ++"string"++ - the EVM transaction hash of the transaction 

        ```bash

    ```

=== "Example"

    ```bash
        ```

      "jsonrpc": "2.0",
      "id": "1",
      "method": "frnt_isTxFinalized",
      "params": ["INSERT_TRANSACTION_HASH"]
    }' {{ networks.dancelight.demo_evm_rpc_url }}

    ```
````

## ", "translated_content": "--- title: Métodos de API JSON-RPC description: Saiba mais sobre os métodos de API JSON-RPC suportados para consultar sua rede Tanssi EVM, incluindo métodos Ethereum padrão e métodos personalizados exclusivos para Tanssi. icon: material-code-json categories: Reference

# Métodos de API JSON-RPC

## Métodos JSON-RPC Ethereum Padrão {: #standard-rpc-methods }

Como a Compatibilidade EVM da Tanssi é derivada de [Frontier](https://github.com/polkadot-evm/frontier){target=\_blank} e modelada de perto com a compatibilidade Ethereum da Moonbeam, os nós Tanssi suportam uma ampla variedade de métodos JSON-RPC Ethereum padrão.

No entanto, nem todos os métodos JSON-RPC Ethereum são suportados; alguns dos suportados retornam valores padrão (aqueles relacionados ao mecanismo de consenso PoW da Ethereum em particular). Este guia fornece uma lista abrangente de métodos JSON-RPC Ethereum suportados no Tanssi. Os desenvolvedores podem consultar rapidamente esta lista para entender a funcionalidade disponível para interagir com as redes Tanssi EVM.

Os métodos JSON-RPC básicos da API Ethereum suportados pelo Tanssi são:

- **[eth_protocolVersion](https://ethereum.org/developers/docs/apis/json-rpc/#eth_protocolversion){target=\_blank}** — retorna `1` por padrão
- **[eth_syncing](https://ethereum.org/developers/docs/apis/json-rpc/#eth_syncing){target=\_blank}** — retorna um objeto com dados sobre o status de sincronização ou `false`
- **[eth_hashrate](https://ethereum.org/developers/docs/apis/json-rpc/#eth_hashrate){target=\_blank}** — retorna `"0x0"` por padrão
- **[eth_coinbase](https://ethereum.org/developers/docs/apis/json-rpc/#eth_coinbase){target=\_blank}** — retorna o autor do bloco mais recente. Não necessariamente um bloco finalizado
- **[eth_mining](https://ethereum.org/developers/docs/apis/json-rpc/#eth_mining){target=\_blank}** — retorna `false` por padrão
- **[eth_chainId](https://ethereum.org/developers/docs/apis/json-rpc/#eth_chainid){target=\_blank}** — retorna o ID da cadeia usado para assinatura no bloco atual
- **[eth_gasPrice](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gasprice){target=\_blank}** — retorna a taxa base por unidade de gás usada. Esta é atualmente a taxa mínima de gás para cada rede
- **[eth_accounts](https://ethereum.org/developers/docs/apis/json-rpc/#eth_accounts){target=\_blank}** — retorna uma lista de endereços pertencentes ao cliente
- **[eth_blockNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_blocknumber){target=\_blank}** — retorna o número do bloco disponível mais alto
- **[eth_getBalance](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getbalance){target=\_blank}** — retorna o saldo do endereço fornecido
- **[eth_getStorageAt](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getstorageat){target=\_blank}** — retorna o conteúdo do armazenamento em um determinado endereço
- **[eth_getBlockByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblockbyhash){target=\_blank}** — retorna informações sobre o bloco do hash fornecido, incluindo `baseFeePerGas` em blocos pós-Londres
- **[eth_getBlockByNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblockbynumber){target=\_blank}** — retorna informações sobre o bloco especificado pelo número do bloco, incluindo `baseFeePerGas` em blocos pós-Londres
- **[eth_getBlockReceipts](https://www.alchemy.com/docs/node/ethereum/ethereum-api-endpoints/eth-get-block-receipts){target=\_blank}** — retorna todos os recibos de transação para um determinado bloco
- **[eth_getTransactionCount](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactioncount){target=\_blank}** — retorna o número de transações enviadas do endereço fornecido (nonce)
- **[eth_getBlockTransactionCountByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash){target=\_blank}** — retorna o número de transações em um bloco com um determinado hash de bloco
- **[eth_getBlockTransactionCountByNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber){target=\_blank}** — retorna o número de transações em um bloco com um determinado número de bloco
- **[eth_getUncleCountByBlockHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclecountbyblockhash){target=\_blank}** — retorna `"0x0"` por padrão
- **[eth_getUncleCountByBlockNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclecountbyblocknumber){target=\_blank}** — retorna `"0x0"` por padrão
- **[eth_getCode](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getcode){target=\_blank}** — retorna o código no endereço fornecido no número do bloco fornecido
- **[eth_sendTransaction](https://ethereum.org/developers/docs/apis/json-rpc/#eth_sendtransaction){target=\_blank}** — cria uma nova transação de chamada de mensagem ou uma criação de contrato, se o campo de dados contiver código. Retorna o hash da transação ou o hash zero se a transação ainda não estiver disponível
- **[eth_sendRawTransaction](https://ethereum.org/developers/docs/apis/json-rpc/#eth_sendrawtransaction){target=\_blank}** — cria uma nova transação de chamada de mensagem ou uma criação de contrato para transações assinadas. Retorna o hash da transação ou o hash zero se a transação ainda não estiver disponível
- **[eth_call](https://ethereum.org/developers/docs/apis/json-rpc/#eth_call){target=\_blank}** — executa uma nova chamada de mensagem imediatamente sem criar uma transação na blockchain, retornando o valor da chamada executada
- **[eth_estimateGas](https://ethereum.org/developers/docs/apis/json-rpc/#eth_estimategas){target=\_blank}** — retorna uma quantidade estimada de gás necessária para que uma determinada transação seja bem-sucedida. Você pode opcionalmente especificar um `gasPrice` ou `maxFeePerGas` e `maxPriorityFeePerGas`
- **[eth_feeHistory](https://www.alchemy.com/docs/node/ethereum/ethereum-api-endpoints/eth-fee-history){target=\_blank}** — retorna `baseFeePerGas`, `gasUsedRatio`, `oldestBlock` e `reward` para uma faixa especificada de até 1024 blocos
- **[eth_getTransactionByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyhash){target=\_blank}** — retorna as informações sobre uma transação com um determinado hash. As transações EIP-1559 têm campos `maxPriorityFeePerGas` e `maxFeePerGas`
- **[eth_getTransactionByBlockHashAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyblockhashandindex){target=\_blank}** — retorna informações sobre uma transação em um determinado hash de bloco e em uma determinada posição de índice. As transações EIP-1559 têm campos `maxPriorityFeePerGas` e `maxFeePerGas`
- **[eth_getTransactionByBlockNumberAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyblocknumberandindex){target=\_blank}** — retorna informações sobre uma transação em um determinado número de bloco e em uma determinada posição de índice. As transações EIP-1559 têm campos `maxPriorityFeePerGas` e `maxFeePerGas`
- **[eth_getTransactionReceipt](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionreceipt){target=\_blank}** — retorna o recibo da transação de um determinado hash de transação
- **[eth_getUncleByBlockHashAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclebyblockhashandindex){target=\_blank}** — retorna `null` por padrão
- **[eth_getUncleByBlockNumberAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclebyblocknumberandindex){target=\_blank}** — retorna `null` por padrão
- **[eth_getLogs](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getlogs){target=\_blank}** — retorna uma matriz de todos os logs correspondentes a um determinado objeto de filtro
- **[eth_newFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_newfilter){target=\_blank}** — cria um objeto de filtro com base na entrada fornecida. Retorna um ID de filtro
- **[eth_newBlockFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_newblockfilter){target=\_blank}** — cria um filtro no nó para notificar quando um novo bloco chega. Retorna um ID de filtro
- **[eth_getFilterChanges](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getfilterchanges){target=\_blank}** — método de consulta para filtros (consulte os métodos acima). Retorna uma matriz de logs que ocorreram desde a última consulta
- **[eth_getFilterLogs](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getfilterlogs){target=\_blank}** — retorna uma matriz de todos os logs correspondentes ao filtro com um determinado ID
- **[eth_uninstallFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_uninstallfilter){target=\_blank}** — desinstala um filtro com um determinado ID. Ele deve ser usado quando a consulta não for mais necessária. Os filtros expiram quando não são solicitados usando `eth_getFilterChanges` após algum tempo

## Métodos JSON-RPC Personalizados {: #custom-json-rpc-methods }

Os nós Tanssi suportam dois endpoints JSON-RPC personalizados: `frnt_isBlockFinalized` e `frnt_isTxFinalized`. Tanssi apresenta finalidade determinística (em oposição à probabilística como a finalidade do Bitcoin), o que significa que, a qualquer momento, a resposta para saber se um bloco ou transação é finalizado ou não pode ser respondida com um sim ou não definitivo. Tanssi construiu esses dois endpoints personalizados para fornecer funcionalidade valiosa para verificar a finalidade de eventos on-chain.

???+ function "frnt_isBlockFinalized - verifica a finalidade do bloco fornecido por seu hash de bloco"

````
=== \"Parâmetros\"

    - `block_hash` ++\"string\"++ - o hash do bloco, aceita o hash de bloco no estilo Substrate ou no estilo Ethereum como entrada

=== \"Retorna\"

    ++\"boolean\"++ - `true` se o bloco for finalizado, `false` se o bloco não for finalizado ou não for encontrado

=== \"Exemplo\"

    ```bash

    curl -H \"Content-Type: application/json\" -X POST --data '{
      \"jsonrpc\": \"2.0\",
      \"id\": \"1\",
      \"method\": \"frnt_isBlockFinalized\",
      \"params\": [\"INSERT_BLOCK_HASH\"]
    }' {{ networks.dancelight.demo_evm_rpc_url }}

    ```
````

???+ function "frnt_isTxFinalized - verifica a finalidade de uma transação fornecida seu hash de transação EVM"

````
=== \"Parâmetros\"

    - `tx_hash` ++\"string\"++ - o hash da transação EVM da transação

=== \"Retorna\"

    ++\"boolean\"++ - `true` se a transação for finalizada, `false` se a transação não for finalizada ou não for encontrada

=== \"Exemplo\"

    ```bash

    curl -H \"Content-Type: application/json\" -X POST --data '{
      \"jsonrpc\": \"2.0\",
      \"id\": \"1\",
      \"method\": \"frnt_isTxFinalized\",
      \"params\": [\"INSERT_TRANSACTION_HASH\"]
    }' {{ networks.dancelight.demo_evm_rpc_url }}

    ```
````

",
"branch": "origin/main",
"commit": "730d1002d79d2768953bf457e466ad35881f1040"
}
