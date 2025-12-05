---
title: Pré-compilado Batch
description: Aprenda a combinar várias transferências e interações de contrato por meio de uma interface Solidity usando o Batch Precompile em redes EVM com tecnologia Tanssi.
keywords: solidity, ethereum, batch, transação, tanssi, precompiled, contratos
icon: octicons-stack-24
categories: EVM-Template
---

# Interagindo com o Batch Precompile

## Introdução {: #introduction }

O Batch Precompile em redes EVM com tecnologia Tanssi permite que desenvolvedores agrupem várias chamadas EVM em uma única transação.

Sem o precompile, um usuário precisaria confirmar várias transações (por exemplo, aprovar um token e logo em seguida transferi-lo). Com o Batch Precompile, a experiência melhora porque o usuário confirma apenas uma transação, reduzindo também o gás pago por taxas básicas múltiplas.

O precompile interage diretamente com o [pallet EVM do Substrate](https://polkadot-evm.github.io/frontier){target=\_blank}. A conta que chama a função em lote atua como `msg.sender` para todas as subtransações e cada contrato de destino altera o seu próprio armazenamento (diferente de `delegatecall`).

O Batch Precompile está localizado no seguinte endereço:

```text
{{ networks.demo_evm.precompiles.batch }}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## A interface Solidity em lote {: #the-batch-interface }

[`Batch.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Batch.sol){target=\_blank} é a interface Solidity para os três métodos do precompile.

??? code "Batch.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/batch.sol'
    ```

A interface inclui as funções:

???+ function "**batchSome**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — executa várias chamadas. Cada índice dos arrays compõe uma subchamada. Se uma subchamada reverter, as seguintes ainda serão tentadas"

    === "Parâmetros"

        - `to` - lista de endereços das subtransações
        - `value` - valores em moeda nativa para cada subtransação; se a lista for menor que `to`, os demais valores serão 0
        - `callData` - dados de chamada para cada subtransação; se a lista for menor que `to`, as restantes não terão dados
        - `gasLimit` - limite de gás de cada subtransação; 0 encaminha todo o gás restante. Se a lista for menor que `to`, as seguintes receberão todo o gás restante

??? function "**batchSomeUntilFailure**(... ) — igual ao anterior, porém interrompe ao primeiro erro"

??? function "**batchAll**(... ) — executa várias chamadas de forma atômica. Se uma subchamada reverter, todas revertem"

Eventos emitidos:

- **SubcallSucceeded**(*uint256* index) — emitido quando uma subchamada com o índice informado é bem-sucedida
- **SubcallFailed**(*uint256* index) — emitido quando uma subchamada com o índice informado falha

## Interaja com a interface Solidity {: #interact-with-the-solidity-interface }

### Verifique os pré-requisitos {: #checking-prerequisites }

- Carteira compatível com EVM configurada para sua rede (por exemplo, [MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank})
- Conta com tokens nativos suficientes
- Opcional: rede de demonstração EVM no [Tanssi dApp](https://apps.tanssi.network){target=\_blank}

### Contrato de exemplo {: #example-contract }

Usaremos `SimpleContract.sol` para demonstrar interações em lote:

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/simple-contract.sol'
```

### Configuração do Remix {: #remix-set-up }

1. Abra [Remix](https://remix.ethereum.org){target=\_blank}.
2. Crie os arquivos **Batch.sol** e **SimpleContract.sol** com o conteúdo correspondente.

### Compile os contratos {: #compile-the-contract }

1. Abra **Batch.sol** e clique em **Compile Batch.sol** (aba **Compile**).  
2. Repita para **SimpleContract.sol**.

### Acesse o precompile {: #access-the-precompile }

1. Na aba **Deploy and Run**, escolha **Injected Provider - MetaMask** em **ENVIRONMENT**.  
2. Selecione **Batch.sol** em **CONTRACT**.  
3. No campo **At Address**, insira `{{networks.demo_evm.precompiles.batch}}` e clique em **At Address**.  
   O contrato **BATCH** aparecerá em **Deployed Contracts**.

### Implemente o contrato de exemplo {: #deploy-example-contract }

1. Ainda na aba **Deploy and Run**, selecione **SimpleContract** em **CONTRACT**.  
2. Clique em **Deploy** e confirme no MetaMask.  
   O **SIMPLECONTRACT** aparecerá em **Deployed Contracts**.

### Envie moeda nativa via precompile {: #send-native-currency-via-precompile }

Para usar **batchAll** e enviar tokens nativos de forma atômica:

1. Expanda o contrato **BATCH** em **Deployed Contracts**.
2. Abra **batchAll**.
3. Preencha:  
   - **to**: `[\"ENDERECO_1\",\"ENDERECO_2\"]`  
   - **value**: `[\"1000000000000000000\",\"2000000000000000000\"]` (exemplo: 1 e 2 tokens)  
   - **callData**: `[]`  
   - **gasLimit**: `[]`
4. Clique em **transact** e confirme no MetaMask.

### Obtenha o call data de uma interação de contrato {: #find-a-contract-interactions-call-data }

1. Em **SIMPLECONTRACT**, expanda **setMessage**.  
2. Preencha **id** (ex.: `1`) e **message** (ex.: `"tanssi"`).  
3. Clique no ícone de copiar ao lado de **transact** para obter o call data codificado.

### Interaja com funções via precompile {: #function-interaction-via-precompile }

Para chamar duas vezes `setMessage` de forma atômica:

1. Copie o endereço de **SIMPLECONTRACT**.  
2. Em **batchAll**, preencha:  
   - **to**: `[\"ENDERECO_CONTRATO\",\"ENDERECO_CONTRATO\"]`  
   - **value**: `[0,0]`  
   - **callData**: `[\"CALLDATA_1\",\"CALLDATA_2\"]` (obtidos no passo anterior)  
   - **gasLimit**: `[]` (ou limites específicos)
3. Clique em **transact** e confirme no MetaMask.

Após a execução, consulte a função **messages** do `SimpleContract.sol` para verificar os valores definidos.

### Combinando subtransações {: #combining-subtransactions }

Você pode mesclar transferências nativas e chamadas de contrato na mesma transação em lote. Forneça arrays alinhados (mesmo tamanho ou valores padrão) para `to`, `value`, `callData` e `gasLimit`. O precompile cuida do roteamento e garante a execução conforme a função escolhida (`batchSome`, `batchSomeUntilFailure` ou `batchAll`).

## Bibliotecas de desenvolvimento Ethereum {: #ethereum-development-libraries }

As funções do precompile também podem ser usadas por bibliotecas:

=== "Ethers.js"

     ```js
     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/ethers-batch.js'
     ```

=== "Web3.js"

     ```js
     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/web3js-batch.js'
     ```

=== "Web3.py"

     ```py
     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/web3py-batch.py'
     ```

!!! nota
    Adapte os exemplos para produção e garanta validação de entradas, controle de gás e tratamento de erros adequados.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
