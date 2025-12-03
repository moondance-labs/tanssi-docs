---
title: Usando Acurast para Oráculos de Feeds de Preço
description: Use a nuvem serverless descentralizada da Acurast para obter feeds de preço confiáveis na sua rede EVM com tecnologia Tanssi.
icon: octicons-eye-24
categories: EVM-Template
---

# Acessando feeds de preço com Acurast

## Introdução {: #introduction }

[Acurast](https://acurast.com){target=\_blank} fornece computação sem permissão, confiável e acessível para aplicativos. Um caso comum é implantar oráculos push/pull que consultam APIs off-chain e publicam preços em contratos EVM usando a [interface Chainlink Aggregator](https://github.com/smartcontractkit/chainlink-evm/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank}.

Este guia mostra como consumir feeds de preço na [rede EVM de demonstração Tanssi](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank} e como estruturar seu próprio feed. Para produção, contate a [equipe Acurast](https://acurast.com){target=\_blank}.

## O que é Acurast? {: #what-is-acurast }

Uma nuvem descentralizada e sem servidor em que qualquer pessoa contribui poder de computação (inclusive via celulares) e é recompensada. Processadores e desenvolvedores interagem pelo [Acurast Console](https://console.acurast.com){target=\_blank}.

## Obter dados de preço {: #fetch-price-data }

Os feeds usam a interface Chainlink Aggregator:

???+ code "AggregatorV3Interface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/AggregatorV3Interface.sol'
    ```

Funções úteis: `decimals`, `description`, `version`, `getRoundData`, `latestRoundData` (veja a [referência Chainlink](https://docs.chain.link/data-feeds/api-reference){target=\_blank}).

## Interagir com feeds na demo EVM {: #interacting-with-price-feeds-demo-evm-network }

Exemplo BTC/USDT já implantado:

```text
{{ networks.demo_evm.oracles.acurast.btc_usd }}
```

Passos no Remix:
1. Conecte MetaMask à rede demo EVM.  
2. Cole e compile `AggregatorV3Interface`.  
3. Em **At Address**, informe `{{ networks.demo_evm.oracles.acurast.btc_usd }}`.  
4. Chame `decimals`, `description`, `latestRoundData` para ver o preço (ajuste pela escala retornada).

![Check price data](/images/builders/toolkit/integrations/oracles/acurast/acurast-3.webp)

### Ativos suportados {: #supported-assets }

Exemplo de chamada usada na demo:

```bash
curl "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
```

Feeds disponíveis na demo EVM:

| Ativo/Par | Contrato agregador |
|:--:|:--:|
| AAVE/USDT | [{{ networks.demo_evm.oracles.acurast.aave_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x6239Ff749De3a21DC219bcFeF9d27B0dfE171F42){target=\_blank} |
| BTC/USDT | [{{ networks.demo_evm.oracles.acurast.btc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x02093b190D9462d964C11587f7DedD92718D7B56){target=\_blank} |
| CRV/USDT | [{{ networks.demo_evm.oracles.acurast.crv_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x01F143dfd745861902dA396ad7dfca962e5C83cA){target=\_blank} |
| DAI/USDT | [{{ networks.demo_evm.oracles.acurast.dai_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x73aF6b14b73059686a9B93Cd28b2dEABF76AeC92){target=\_blank} |
| ETH/USDT | [{{ networks.demo_evm.oracles.acurast.eth_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x007c3F3cc99302c19792F73b7434E3eCbbC3db25){target=\_blank} |
| USDC/USDT | [{{ networks.demo_evm.oracles.acurast.usdc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xe4a46ef4cFbf87D026C3eB293b7672998d932F62){target=\_blank} |
| USDT/USD | [{{ networks.demo_evm.oracles.acurast.usdt_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xf9c885E3A5846CEA887a0D69655BC08e52afe569){target=\_blank} |

## Criar e lançar seu próprio feed {: #designing-and-launching-your-own-price-feed }

Requer um contrato agregador e um script Acurast.

Contrato de exemplo (interface Chainlink) e script estão no repo da Acurast: [amostra BTC/USD](https://github.com/Acurast/acurast-evm-oracle-sample/tree/main){target=\_blank}.

???+ code "InsecureDummyPriceFeed.sol"
    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/InsecureDummyPriceFeed.sol'
    ```

!!! warning
    O contrato de demonstração é inseguro e sem controle de acesso; não use em produção.

### Script Acurast

Atualiza o contrato on-chain com preços. Exemplo:

???+ code "AcurastScript.js"
    ```js
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/AcurastScript.js'
    ```

No [console Acurast](https://console.acurast.com/create){target=\_blank}:

1. **Create Jobs** → cadeia **Moonbeam**, ambiente **Moonbase**.  
2. Escolha **Price Feeds**.  
3. Cole o script (ajuste endereço do contrato e RPC da sua rede).  
4. Defina intervalo, tempo inicial/final, número de processadores, recompensa (cACU via [faucet](https://faucet.acurast.com){target=\_blank}).  
5. Publique e acompanhe o job.

--8<-- 'text/_disclaimers/third-party-content.pt.md'
