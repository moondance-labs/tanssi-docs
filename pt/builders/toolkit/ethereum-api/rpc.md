---
title: Métodos da API JSON-RPC
description: Saiba quais métodos JSON-RPC são suportados para consultar sua rede EVM da Tanssi, incluindo métodos Ethereum padrão e métodos personalizados da Tanssi.
icon: material-code-json
categories: Reference
---

# Métodos da API JSON-RPC

## Métodos Ethereum padrão {: #standard-rpc-methods }

A compatibilidade EVM da Tanssi é derivada do [Frontier](https://github.com/polkadot-evm/frontier){target=\_blank} e segue de perto a compatibilidade Ethereum do Moonbeam. Os nós da Tanssi suportam uma ampla variedade de métodos JSON-RPC padrão do Ethereum.

Nem todos os métodos são suportados; alguns retornam valores padrão (especialmente os ligados ao PoW). Abaixo está a lista dos métodos Ethereum JSON-RPC suportados na Tanssi para que os desenvolvedores saibam o que está disponível ao interagir com redes EVM da Tanssi.

Métodos básicos da API Ethereum suportados:

- **[eth_protocolVersion](https://ethereum.org/developers/docs/apis/json-rpc/#eth_protocolversion){target=\_blank}** — retorna `1` por padrão
- **[eth_syncing](https://ethereum.org/developers/docs/apis/json-rpc/#eth_syncing){target=\_blank}** — retorna um objeto com o status de sincronização ou `false`
- **[eth_hashrate](https://ethereum.org/developers/docs/apis/json-rpc/#eth_hashrate){target=\_blank}** — retorna `"0x0"` por padrão
- **[eth_coinbase](https://ethereum.org/developers/docs/apis/json-rpc/#eth_coinbase){target=\_blank}** — retorna o autor do último bloco (não necessariamente finalizado)
- **[eth_mining](https://ethereum.org/developers/docs/apis/json-rpc/#eth_mining){target=\_blank}** — retorna `false` por padrão
- **[eth_chainId](https://ethereum.org/developers/docs/apis/json-rpc/#eth_chainid){target=\_blank}** — retorna o chain ID usado para assinar no bloco atual
- **[eth_gasPrice](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gasprice){target=\_blank}** — retorna a base fee por unidade de gas. Atualmente é o gas price mínimo da rede
- **[eth_accounts](https://ethereum.org/developers/docs/apis/json-rpc/#eth_accounts){target=\_blank}** — lista de endereços do cliente
- **[eth_blockNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_blocknumber){target=\_blank}** — maior número de bloco disponível
- **[eth_getBalance](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getbalance){target=\_blank}** — saldo do endereço fornecido
- **[eth_getStorageAt](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getstorageat){target=\_blank}** — conteúdo do storage em um endereço
- **[eth_getBlockByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblockbyhash){target=\_blank}** — informações do bloco por hash, incluindo `baseFeePerGas` em blocos pós-London
- **[eth_getBlockByNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblockbynumber){target=\_blank}** — informações do bloco por número, incluindo `baseFeePerGas` em blocos pós-London
- **[eth_getBlockReceipts](https://www.alchemy.com/docs/node/ethereum/ethereum-api-endpoints/eth-get-block-receipts){target=\_blank}** — todos os receipts de transações de um bloco
- **[eth_getTransactionCount](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactioncount){target=\_blank}** — número de transações (nonce) enviadas pelo endereço
- **[eth_getBlockTransactionCountByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash){target=\_blank}** — número de transações em um bloco por hash
- **[eth_getBlockTransactionCountByNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber){target=\_blank}** — número de transações em um bloco por número
- **[eth_getUncleCountByBlockHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclecountbyblockhash){target=\_blank}** — retorna `"0x0"` por padrão
- **[eth_getUncleCountByBlockNumber](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclecountbyblocknumber){target=\_blank}** — retorna `"0x0"` por padrão
- **[eth_getCode](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getcode){target=\_blank}** — código no endereço informado e bloco informado
- **[eth_sendTransaction](https://ethereum.org/developers/docs/apis/json-rpc/#eth_sendtransaction){target=\_blank}** — cria transação de chamada ou criação de contrato (se houver código em `data`). Retorna o hash da transação ou zero hash se ainda não disponível
- **[eth_sendRawTransaction](https://ethereum.org/developers/docs/apis/json-rpc/#eth_sendrawtransaction){target=\_blank}** — cria transação de chamada ou criação para transações assinadas. Retorna hash ou zero hash se ainda não disponível
- **[eth_call](https://ethereum.org/developers/docs/apis/json-rpc/#eth_call){target=\_blank}** — executa chamada sem criar transação, retornando o valor da execução
- **[eth_estimateGas](https://ethereum.org/developers/docs/apis/json-rpc/#eth_estimategas){target=\_blank}** — estima o gas necessário para uma transação. Pode receber `gasPrice` ou `maxFeePerGas` e `maxPriorityFeePerGas`
- **[eth_feeHistory](https://www.alchemy.com/docs/node/ethereum/ethereum-api-endpoints/eth-fee-history){target=\_blank}** — retorna `baseFeePerGas`, `gasUsedRatio`, `oldestBlock` e `reward` para um intervalo de até 1024 blocos
- **[eth_getTransactionByHash](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyhash){target=\_blank}** — informações de uma transação por hash; transações EIP-1559 incluem `maxPriorityFeePerGas` e `maxFeePerGas`
- **[eth_getTransactionByBlockHashAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyblockhashandindex){target=\_blank}** — informações de uma transação por hash do bloco e índice; inclui campos EIP-1559
- **[eth_getTransactionByBlockNumberAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionbyblocknumberandindex){target=\_blank}** — informações de uma transação por número do bloco e índice; inclui campos EIP-1559
- **[eth_getTransactionReceipt](https://ethereum.org/developers/docs/apis/json-rpc/#eth_gettransactionreceipt){target=\_blank}** — receipt de uma transação por hash
- **[eth_getUncleByBlockHashAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclebyblockhashandindex){target=\_blank}** — retorna `null` por padrão
- **[eth_getUncleByBlockNumberAndIndex](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getunclebyblocknumberandindex){target=\_blank}** — retorna `null` por padrão
- **[eth_getLogs](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getlogs){target=\_blank}** — array de logs que correspondem ao filtro
- **[eth_newFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_newfilter){target=\_blank}** — cria filtro com base nos parâmetros fornecidos; retorna o ID do filtro
- **[eth_newBlockFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_newblockfilter){target=\_blank}** — cria filtro para avisar quando chegar um novo bloco; retorna ID
- **[eth_getFilterChanges](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getfilterchanges){target=\_blank}** — método de polling para filtros; retorna logs desde o último poll
- **[eth_getFilterLogs](https://ethereum.org/developers/docs/apis/json-rpc/#eth_getfilterlogs){target=\_blank}** — array de logs que correspondem ao filtro com ID fornecido
- **[eth_uninstallFilter](https://ethereum.org/developers/docs/apis/json-rpc/#eth_uninstallfilter){target=\_blank}** — remove um filtro pelo ID; use quando o polling não for mais necessário (filtros expiram se não forem consultados)

## Métodos JSON-RPC personalizados {: #custom-json-rpc-methods }

Os nós da Tanssi expõem dois endpoints personalizados: `frnt_isBlockFinalized` e `frnt_isTxFinalized`. Como a Tanssi tem finalização determinística, é possível saber com certeza se um bloco ou transação está finalizado ou não. Esses endpoints ajudam a verificar a finalização de eventos on-chain.

???+ function "frnt_isBlockFinalized - verifica a finalização do bloco pelo hash"

    === "Parâmetros"

        - `block_hash` ++"string"++ - hash do bloco (aceita hash estilo Substrate ou Ethereum)

    === "Retorno"

        ++"boolean"++ - `true` se o bloco estiver finalizado; `false` se não estiver finalizado ou não encontrado

    === "Exemplo"

        ```bash
        curl -H "Content-Type: application/json" -X POST --data '{
          "jsonrpc": "2.0",
          "id": "1",
          "method": "frnt_isBlockFinalized",
          "params": ["INSERT_BLOCK_HASH"]
        }' {{ networks.dancelight.demo_evm_rpc_url }}
        ```

???+ function "frnt_isTxFinalized - verifica a finalização de uma transação pelo hash EVM"

    === "Parâmetros"

        - `tx_hash` ++"string"++ - hash EVM da transação

    === "Retorno"

        ++"boolean"++ - `true` se a transação estiver finalizada; `false` se não estiver finalizada ou não encontrada

    === "Exemplo"

        ```bash
        curl -H "Content-Type: application/json" -X POST --data '{
          "jsonrpc": "2.0",
          "id": "1",
          "method": "frnt_isTxFinalized",
          "params": ["INSERT_TRANSACTION_HASH"]
        }' {{ networks.dancelight.demo_evm_rpc_url }}
        ```
