---
title: Rede de Demonstração EVM Tanssi
description: Teste nossa rede de demonstração EVM Tanssi para descobrir as capacidades de uma rede totalmente compatível com Ethereum, implantada através da Tanssi em apenas alguns minutos.
icon: material-ethereum
categories: Appchain, EVM-Template
---

## Introdução

Explore as funcionalidades de uma rede totalmente compatível com Ethereum, implantada através da Tanssi, interagindo com a rede EVM de demonstração em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}.

Esta página de referência rápida oferece todos os elementos essenciais de que você precisa para interagir com esta rede de demonstração.

## Faucet para Tokens TestNet {: #faucet }

Você pode acessar tokens {{ networks.dancelight.demo_evm_token_symbol }}, a moeda nativa da rede de demonstração EVM, na faucet no [Tanssi dApp](https://apps.tanssi.network/demo){target=\_blank}. Você pode receber até 100 tokens {{ networks.dancelight.demo_evm_token_symbol }} a cada 12 horas.

Para solicitar tokens da faucet, acesse o [Tanssi dApp](https://apps.tanssi.network/demo){target=\_blank} e pressione **Adicionar ao MetaMask**.

![Adicionar ao MetaMask](/images/builders/tanssi-network/testnet/demo-evm-network/demo-1.webp)

Em seguida, siga estas etapas:

1. Pressione **Solicitar Tokens**
1. Selecione a conta que você gostaria de receber tokens {{ networks.dancelight.demo_evm_token_symbol }} e pressione **Avançar**
1. Pressione **Conectar**

![Solicitar tokens](/images/builders/tanssi-network/testnet/demo-evm-network/demo-2.webp)

!!! nota
    Tokens {{ networks.dancelight.demo_evm_token_symbol }} não têm valor. Por favor, não envie spam para a faucet com solicitações desnecessárias.

Seus tokens serão distribuídos em breve, e você pode verificar seu saldo de tokens {{ networks.dancelight.demo_evm_token_symbol }} pesquisando seu endereço no \[explorador\]({{ networks.dancelight.demo_evm_blockscout_url }}){target=\_blank}.

## Endpoints de Rede {: #network-endpoints }

Os endpoints HTTPS e WSS da rede EVM de demonstração são os seguintes:

=== "HTTPS"

    ```text
    {{ networks.dancelight.demo_evm_rpc_url }}
    ```

=== "WSS"

    ```text
    {{ networks.dancelight.demo_evm_rpc_wss_url }}
    ```

## Exploradores de Blocos {: #block-explorers }

Para a rede EVM de demonstração, você pode usar qualquer um dos seguintes exploradores:

- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc={{ networks.dancelight.demo_evm_rpc_wss_url }}){target=\_blank} (API Substrate)
- [Blockscout]({{ networks.dancelight.demo_evm_blockscout_url }}){target=\_blank} (API Ethereum)
- [Expedition](https://evmexplorer.tanssi-chains.network/?rpcUrl={{ networks.dancelight.demo_evm_rpc_url }}){target=\_blank} (API Ethereum)

## ID da Cadeia {: #chain-id }

A rede EVM de demonstração tem um [ID de cadeia](https://chainlist.org/chain/{{ networks.dancelight.demo_evm_chain_id }}){target=\_blank} de: `{{ networks.dancelight.demo_evm_chain_id }}`, que é `{{ networks.dancelight.demo_evm_chain_hex_id }}` em hexadecimal.

## Início Rápido {: #quick-start }

Você pode interagir com uma rede EVM alimentada por Tanssi usando bibliotecas Ethereum padrão, como [Ethers.js](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, [Web3.js](/builders/toolkit/ethereum-api/libraries/web3js/){target=\_blank} e [Web3.py](/builders/toolkit/ethereum-api/libraries/web3py/){target=\_blank}. Para começar rapidamente, você precisará criar um provedor conectado a uma rede EVM Tanssi:
// Insira sua URL RPC aqui

=== "Ethers.js"

    ```js
    import { ethers } from "ethers";

    const providerRPC = {
      evmNetwork: {
        name: 'dancelight-evm-network',
        // Insira sua URL RPC aqui
        rpc: '{{ networks.dancelight.demo_evm_rpc_url }}', 
        chainId: {{ networks.dancelight.demo_evm_chain_id }}, // {{ networks.dancelight.demo_evm_chain_hex_id }} em hexadecimal,
      },
    };
    const provider = new ethers.JsonRpcProvider(
      providerRPC.evmNetwork.rpc, 
      {
        chainId: providerRPC.evmNetwork.chainId,
        name: providerRPC.evmNetwork.name,
      }
    );
    ```

=== "Web3.js"

    ```js
    const Web3 = require('web3');

    const web3 = new Web3(
      '{{ networks.dancelight.demo_evm_rpc_url }}'
    );
    ```

=== "Web3.py"

    ```python
    from web3 import Web3

    web3 = Web3(Web3.HTTPProvider('{{ networks.dancelight.demo_evm_rpc_url }}')) 
    ```
