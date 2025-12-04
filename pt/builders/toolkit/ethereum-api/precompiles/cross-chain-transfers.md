---
title: Transferências de Tokens Cross-Chain Nativas
description: Aprenda a usar a pré-compilação XCM para transferir tokens entre redes com tecnologia Tanssi, aproveitando a comunicação cross-chain nativa.
categories: EVM-Template
---

# Transferências de Tokens Cross-Chain Nativas

## Introdução {: #introduction }

As redes com tecnologia Tanssi possuem comunicação cross-chain nativa via XCM, permitindo transferências rápidas e seguras entre cadeias. O precompile XCM expõe uma interface de contrato que abstrai a complexidade da camada Substrate, permitindo iniciar transferências cross-chain como qualquer outra chamada de contrato.

O precompile XCM está localizado no endereço:

```text
{{networks.demo_evm.precompiles.xcm_interface}}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## Interface Solidity XCM {: #the-xcm-solidity-interface }

[`XCMInterface.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank} define as estruturas e funções do precompile.

??? code "XCMInterface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/xcm-interface/XcmInterface.sol'
    ```

Principais funções:

???+ function "**transferAssetsToPara20**(paraId, beneficiary, assets, feeAssetItem, weight) — envia ativos para outra rede compatível com EVM"

    === "Parâmetros"
        - `paraId` ++uint32++ — ID da rede de destino  
        - `beneficiary` ++address++ — conta ECDSA na cadeia de destino  
        - `assets` ++AssetAddressInfo[]++ — lista de ativos e quantidades  
        - `feeAssetItem` ++uint32++ — índice do ativo usado para taxas  
        - `weight` ++Weight++ — peso máximo (gás); `uint64::MAX` em `refTime` equivale a ilimitado  

??? function "**transferAssetsToPara32**(paraId, beneficiary, assets, feeAssetItem, weight) — envia ativos para uma rede Substrate"

    === "Parâmetros"
        - `paraId` ++uint32++ — ID da rede de destino  
        - `beneficiary` ++bytes32++ — conta SR25519 na cadeia de destino  
        - `assets` ++AssetAddressInfo[]++ — lista de ativos e quantidades  
        - `feeAssetItem` ++uint32++ — índice do ativo usado para taxas  
        - `weight` ++Weight++ — peso máximo  

??? function "**transferAssetsToRelay**(beneficiary, assets, feeAssetItem, weight) — envia ativos para a relay chain"

??? function "**transferAssetsLocation**(dest, beneficiary, assets, feeAssetItem, weight) — envia ativos usando multilocations genéricos"

## Interaja com a interface Solidity {: #interact-with-the-solidity-interface }

### Pré-requisitos {: #checking-prerequisites }

- Carteira EVM configurada e conta com tokens nativos.  
- Canais XCM configurados com a cadeia de destino (veja [Gerenciar canais cross-chain](/pt/builders/manage/dapp/xcm-channels/){target=\_blank}).  
- Se o token for nativo da sua rede, a cadeia de destino deve registrar o ativo estrangeiro.

### Configuração no Remix {: #remix-set-up }

1. Abra [Remix](https://remix.ethereum.org){target=\_blank}.  
2. Crie **XcmInterface.sol** com o conteúdo da interface.  
3. Compile em **Compile XCMInterface.sol**.

### Acesse o precompile {: #access-the-contract }

1. Aba **Deploy and Run** → **Injected Provider - MetaMask**.  
2. Selecione **XCM - XcmInterface.sol** em **CONTRACT**.  
3. No campo **At Address**, informe `{{networks.demo_evm.precompiles.xcm_interface}}` e clique **At Address**. O contrato aparecerá em **Deployed Contracts**.

### Enviar tokens para outra rede EVM {: #transfer-to-evm-chains }

1. Expanda **transferAssetsToPara20**.  
2. Preencha `paraId`, `beneficiary` (endereço EVM), `assets` (ex.: `[[ "0x0000000000000000000000000000000000000800", 1000000000000000000 ]]`), `feeAssetItem` e `weight`.  
3. Clique **transact** e confirme no MetaMask. Aguarde alguns blocos para o saldo chegar à cadeia de destino.

### Enviar tokens para uma rede Substrate {: #transfer-to-substrate-chains }

Use **transferAssetsToPara32** com `beneficiary` SR25519 (bytes32) e demais campos análogos.

### Enviar tokens para a relay chain {: #transfer-to-relay-chain }

Use **transferAssetsToRelay** com `beneficiary` SR25519, `assets`, `feeAssetItem`, `weight`.

### Usar multilocations genéricas {: #transfer-locations }

**transferAssetsLocation** aceita `dest`, `beneficiary` e `assets` como multilocations XCM, permitindo destinos mais genéricos. Preencha os arrays conforme a multilocation desejada, o índice do ativo para taxas e o `weight`, então chame **transact**.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
