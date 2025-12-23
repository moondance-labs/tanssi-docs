---
title: Transferências Nativas de Tokens Entre Cadeias
description: Aprenda a usar o precompile da interface XCM para transferir tokens de qualquer rede EVM powered by Tanssi, aproveitando as capacidades nativas de interoperabilidade.
categories: EVM-Template
---

# Transferências Nativas de Tokens Entre Cadeias

## Introdução {: #introduction }

Como apresentado no artigo sobre [Comunicação Nativa Entre Cadeias](/pt/learn/framework/xcm/){target=\_blank} na seção Learn, redes powered by Tanssi contam com a capacidade nativa de se comunicar e interoperar com qualquer outra rede do ecossistema. Essa comunicação entre cadeias permite transferências de tokens seguras e rápidas usando o formato Cross-Consensus Message (XCM), que facilita a comunicação entre diferentes sistemas de consenso.

O protocolo de comunicação que possibilita as transferências é construído sobre o [Substrate](/pt/learn/framework/overview/#substrate-framework){target=\_blank} e opera em um nível mais baixo que o EVM, o que dificulta o acesso direto para desenvolvedores EVM.

Ainda assim, redes EVM contam com um precompile XCM que preenche a lacuna entre as camadas de execução, expondo uma interface de smart contract que abstrai as complexidades subjacentes e torna a execução de transferências cross-chain tão simples quanto qualquer chamada de contrato.

Este guia mostra como interagir com o precompile [XCM Interface](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank} para executar transferências de tokens entre cadeias via Ethereum API.

O precompile XCM está localizado no seguinte endereço:

```text
{{networks.demo_evm.precompiles.xcm_interface }}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## A Interface Solidity XCM {: #the-xcm-solidity-interface }

A interface [`XCMInterface.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank} nas redes EVM da Tanssi é uma interface Solidity que permite aos desenvolvedores interagir com as funções do precompile.

??? code "XCMInterface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/xcm-interface/XcmInterface.sol'
    ```

A interface inclui as estruturas de dados necessárias e as funções a seguir:

???+ function "**transferAssetsToPara20**(_paraId, beneficiary, assets, feeAssetItem, weight_) — envia assets para outra rede compatível com EVM usando a transação `transfer_assets()` do pallet XCM"

    === "Parâmetros"

        - `paraId` ++"uint32"++ - ID da rede de destino
        - `beneficiary` ++"address"++ - conta do tipo ECDSA na cadeia de destino que receberá os tokens
        - `assets` ++"AssetAddressInfo[] memory"++ - array de assets a enviar
        - `feeAssetItem` ++"uint32"++ - índice do asset que pagará as taxas
        - `weight` ++"Weight memory"++ - gás máximo de toda a operação. Definir `uint64::MAX` em `refTime` equivale na prática a *weight ilimitado*

    === "Exemplo"

        - `paraId` - 888
        - `beneficiary` - 0x3f0Aef9Bd799F1291b80376aD57530D353ab0217
        - `assets` - [["0x0000000000000000000000000000000000000800", 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]

??? function "**transferAssetsToPara32**(_paraId, beneficiary, assets,feeAssetItem, weight_) — envia assets para uma rede Substrate usando a transação `transfer_assets()` do pallet XCM"

    === "Parâmetros"

        - `paraId` ++"uint32"++ - ID da rede de destino
        - `beneficiary` ++"bytes32"++ - conta do tipo SR25519 na cadeia de destino que receberá os tokens
        - `assets` ++"AssetAddressInfo[] memory"++ - array de assets a enviar
        - `feeAssetItem` ++"uint32"++ - índice do asset que pagará as taxas
        - `weight` ++"Weight memory"++ - gás máximo de toda a operação. Definir `uint64::MAX` em `refTime` equivale na prática a *weight ilimitado*

    === "Exemplo"

        - `paraId` - 888
        - `beneficiary` - 0xf831d83025f527daeed39a644d64d335a4e627b5f4becc78fb67f05976889a06
        - `assets` - [["0x0000000000000000000000000000000000000800", 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]

??? function "**transferAssetsToRelay**(_beneficiary, assets, feeAssetItem, weight_) — envia assets para a relay chain usando a transação `transfer_assets()` do pallet XCM"

    === "Parâmetros"

        - `beneficiary` ++"bytes32"++ - conta do tipo sr25519 na relay chain que receberá os tokens
        - `assets` ++"AssetAddressInfo[] memory"++ - array de assets a enviar
        - `feeAssetItem` ++"uint32"++ - índice do asset que pagará as taxas
        - `weight` ++"Weight memory"++ - gás máximo de toda a operação. Definir `uint64::MAX` em `refTime` equivale na prática a *weight ilimitado*

    === "Exemplo"

        - `beneficiary` - 0xf831d83025f527daeed39a644d64d335a4e627b5f4becc78fb67f05976889a06
        - `assets` - [["0x0000000000000000000000000000000000000800", 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]

??? function "**transferAssetsLocation**(_dest, beneficiary, assets, feeAssetItem, weight_) — envia assets usando a transação `transfer_assets()` do pallet XCM"

    === "Parâmetros"
        - `dest` ++"Location memory"++ - cadeia de destino
        - `beneficiary` ++"Location memory"++ - conta na cadeia de destino que receberá os tokens
        - `assets` ++"AssetLocationInfo[] memory"++ - array de assets a enviar
        - `feeAssetItem` ++"uint32"++ - índice do asset que pagará as taxas
        - `weight` ++"Weight memory"++ - gás máximo de toda a operação. Definir `uint64::MAX` em `refTime` equivale na prática a *weight ilimitado*

    === "Exemplo"
        - `dest` - ["1",[]]
        - `beneficiary` - [0, ["0x01f831d83025f527daeed39a644d64d335a4e627b5f4becc78fb67f05976889a0600"]]
        - `assets` - [[[1, ["0x010000000000000000000000000000000000000800"]], 1000000000000000000]]
        - `feeAssetItem` - 0
        - `weight` - [9223372036854775807, 9223372036854775807]
    
## Interaja com a Interface Solidity {: #interact-with-the-solidity-interface }

### Verificando Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, configure sua carteira para sua rede EVM e tenha uma conta com tokens nativos. Você pode adicionar sua rede EVM à MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network){target=\_blank}. Ou [configurar a MetaMask para a Tanssi com a rede EVM de demonstração](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

!!! note
    É necessário ter canais de comunicação estabelecidos com a cadeia de destino antes de usar a funcionalidade deste precompile. Para isso, consulte o guia [Gerenciar Canais de Comunicação Entre Cadeias](/pt/builders/manage/dapp/xcm-channels/){target=\_blank}. Além disso, se o token transferido for nativo da sua rede, a cadeia de destino deve ter registrado o asset estrangeiro.

### Configuração do Remix {: #remix-set-up }

Você pode interagir com o precompile XCM Interface usando o [Remix](https://remix.ethereum.org){target=\_blank}. Para adicioná-lo ao Remix, siga:

1. Obtenha uma cópia de [`XCMInterface.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/XcmInterface.sol){target=\_blank}
2. Cole o conteúdo em um arquivo do Remix chamado `XcmInterface.sol`

### Compile o Contrato {: #compile-the-contract }

Em seguida, compile a interface no Remix:

1. Clique na aba **Compile** (segunda de cima)
2. Clique em **Compile XCMInterface.sol** para compilar

![Compiling XcmInterface.sol](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-1.webp)

Quando a compilação concluir, um check verde aparecerá ao lado da aba **Compile**.

### Acesse o Contrato {: #access-the-contract }

Em vez de implantar o precompile, acesse a interface informando o endereço do contrato pré-compilado:

1. Clique na aba **Deploy and Run** logo abaixo de **Compile** no Remix. Os contratos pré-compilados já estão acessíveis em seus endereços, portanto não há etapa de deployment
2. Certifique-se de que **Injected Provider - Metamask** está selecionado em **ENVIRONMENT**. Ao selecionar, a MetaMask pode solicitar conexão com o Remix
3. Garanta que a conta correta apareça em **ACCOUNT**
4. Selecione **XCM - XCMInterface.sol** em **CONTRACT**. Como é um contrato pré-compilado, não há deployment; apenas informe o endereço do precompile no campo **At Address**
5. Informe o endereço do precompile: `{{networks.demo_evm.precompiles.xcm_interface}}` e clique em **At Address**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-2.webp)

O precompile **XCM Interface** aparecerá em **Deployed Contracts**.

### Envie tokens para outra rede compatível com EVM {: #transfer-to-evm-chains }

Para enviar tokens a uma conta em outra rede compatível com EVM, siga:

1. Expanda a função **transferAssetsToPara20**
2. Informe o ID da rede (`paraId`)
3. Informe a conta de destino (20 bytes, estilo Ethereum)
4. Especifique os tokens a transferir. Este parâmetro é um array com pelo menos um asset; cada asset é definido por seu endereço e montante

    --8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

5. Informe o índice do asset que pagará as taxas (baseado em zero)
6. Informe o gás máximo da transação, derivado de `refTime` e `proofSize`. Na prática, definir `refTime` como `uint64::MAX` equivale a *weight ilimitado*
7. Clique em **transact**
8. A MetaMask aparecerá para revisão; clique em **Confirm** para enviar

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-3.webp)

Após a confirmação, aguarde alguns blocos para o saldo aparecer na cadeia de destino.

### Envie Tokens para uma Rede Substrate {: #transfer-to-substrate-chains }

Para enviar tokens a uma conta em uma rede Substrate, siga:

1. Expanda a função **transferAssetsToPara32**
2. Informe o ID da rede (`paraId`)
3. Informe a conta de destino do tipo sr25519
4. Especifique os tokens a transferir. Este parâmetro é um array com pelo menos um asset; cada asset é definido por seu endereço e montante
    
    --8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

5. Informe o índice do asset que pagará as taxas (baseado em zero)
6. Informe o gás máximo da transação, derivado de `refTime` e `proofSize`. Na prática, definir `refTime` como `uint64::MAX` equivale a *weight ilimitado*
7. Clique em **transact**
8. A MetaMask aparecerá para revisão; clique em **Confirm** para enviar

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-4.webp)

Após a confirmação, aguarde alguns blocos para o saldo aparecer na cadeia de destino.

### Envie Tokens para a Relay Chain {: #transfer-to-relay-chain }

Para enviar tokens a uma conta na relay chain, siga:

1. Expanda a função **transferAssetsToRelay**
2. Informe a conta de destino do tipo sr25519
3. Especifique os tokens a transferir. Este parâmetro é um array com pelo menos um asset; cada asset é definido por seu endereço e montante
    
    --8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

4. Informe o índice do asset que pagará as taxas (baseado em zero)
5. Informe o gás máximo da transação, derivado de `refTime` e `proofSize`. Na prática, definir `refTime` como `uint64::MAX` equivale a *weight ilimitado*
6. Clique em **transact**
7. A MetaMask aparecerá para revisão; clique em **Confirm** para enviar

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-5.webp)

Após a confirmação, aguarde alguns blocos para o saldo aparecer na cadeia de destino.

### Envie Tokens para Locais Específicos {: #transfer-locations }

Esta função é mais genérica e permite especificar cadeia de destino, conta e assets usando [XCM Multilocations](/pt/learn/framework/xcm/#message-destinations){target=\_blank}. Para enviar tokens para locais específicos:

1. Expanda a função **transferAssetsLocation**
2. Informe a multilocation que especifica a cadeia de destino. Qualquer cadeia pode ser informada, independentemente de tipo ou configuração
3. Informe a multilocation que especifica a conta de destino. Qualquer conta pode ser informada, independentemente do tipo (ECDSA, sr25519 ou outro)
4. Especifique os tokens a transferir. Este parâmetro é um array com pelo menos um asset; cada asset é definido por sua multilocation e montante
    
    --8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/xcm-interface/erc-20-note.md'

5. Informe o índice do asset que pagará as taxas (baseado em zero)
6. Informe o gás máximo da transação, derivado de `refTime` e `proofSize`. Na prática, definir `refTime` como `uint64::MAX` equivale a *weight ilimitado*
7. Clique em **transact**
8. A MetaMask aparecerá para revisão; clique em **Confirm** para enviar

![Confirm Approve Transaction](/images/builders/toolkit/ethereum-api/precompiles/xcm-interface/xcm-interface-6.webp)

Após a confirmação, aguarde alguns blocos para o saldo aparecer na cadeia de destino.

--8<-- 'text/_disclaimers/third-party-content.md'
