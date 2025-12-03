---
title: Usando Phala para Oráculos de Feed de Preço
description: Use a rede de computação off-chain da Phala para obter feeds de preço Chainlink (Ethereum Mainnet) na sua rede EVM com tecnologia Tanssi.
icon: octicons-eye-24
categories: EVM-Template
---

# Lançando feeds de preços com Phala

## Introdução {: #introduction }

[Phala](https://phala.com/){target=\_blank} é uma rede de computação off-chain baseada em Enclaves Seguros que permite contratos Phat — componentes off-chain sem permissão e verificáveis. Com eles, você pode criar oráculos (entre outras funções) sem construir toda a infraestrutura.

Este guia mostra como consumir feeds espelhados da Chainlink na rede EVM de demonstração Tanssi e como lançar feeds próprios. Para produção, contate a [equipe Phala](https://dashboard.phala.network){target=\_blank}.

## Como a Phala habilita feeds {: #how-phala-enables-price-feeds }

Phala espelha feeds Chainlink do Ethereum Mainnet: off-chain workers buscam e agregam preços e os disponibilizam via contratos compatíveis com Chainlink Aggregator. Também é possível criar novos oráculos a partir de dados externos via Phat Contracts (push ou pull).

## Buscar dados de preço {: #fetch-price-data }

Feeds usam a interface Chainlink Aggregator:

???+ code "AggregatorV3Interface.sol"
    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/phala/AggregatorV3Interface.sol'
    ```

Funções: `decimals`, `description`, `version`, `getRoundData`, `latestRoundData` (veja a [API Chainlink](https://docs.chain.link/data-feeds/api-reference){target=\_blank}).

### Ativos suportados {: #supported-assets }

Feeds na rede demo EVM:

| Par | Contrato agregador |
|:--:|:--:|
| AAVE/USD | [{{ networks.demo_evm.oracles.phala.aave_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x2E1640853bB2dD9f47831582665477865F9240DB){target=\_blank} |
| BTC/USD | [{{ networks.demo_evm.oracles.phala.btc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x89BC5048d634859aef743fF2152363c0e83a6a49){target=\_blank} |
| CRV/USD | [{{ networks.demo_evm.oracles.phala.crv_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xf38b25b79A72393Fca2Af88cf948D98c64726273){target=\_blank} |
| DAI/USD | [{{ networks.demo_evm.oracles.phala.dai_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x1f56d8c7D72CE2210Ef340E00119CDac2b05449B){target=\_blank} |
| ETH/USD | [{{ networks.demo_evm.oracles.phala.eth_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x739d71fC66397a28B3A3b7d40eeB865CA05f0185){target=\_blank} |
| USDC/USD | [{{ networks.demo_evm.oracles.phala.usdc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x4b8331Ce5Ae6cd33bE669c10Ded9AeBA774Bf252){target=\_blank} |
| USDT/USD | [{{ networks.demo_evm.oracles.phala.usdt_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x5018c16707500D2C89a0446C08f347A024f55AE3){target=\_blank} |

## Interagir com feeds na demo EVM {: #interacting-with-price-feeds-demo-evm-network }

1. Conecte MetaMask à rede demo EVM.  
2. Cole e compile `AggregatorV3Interface` no Remix.  
3. Em **At Address**, insira o endereço do par desejado (ex.: BTC/USD `{{ networks.demo_evm.oracles.phala.btc_usd }}`).  
4. Chame `decimals`, `description`, `latestRoundData`. Ajuste o valor retornado pela escala (`decimals`).

![Check price data](/images/builders/toolkit/integrations/oracles/phala/phala-3.webp)

## Lançar feeds na sua rede EVM {: #lançando-feeds-de-preços-em-uma-rede-evm }

Siga o fluxo do repositório [mirrored-price-feed](https://github.com/Phala-Network/mirrored-price-feed){target=\_blank}.

### Setup {: #setup }

```bash
cd mirrored-price-feed && yarn install
cp env.example .env   # preencha PRIVATE_KEY e RPC da sua rede
```

### Configurar scripts {: #configure-deployment-script }

Em `scripts/OffchainAggregator.s.sol`, ajuste `description` (ex.: `"BTC / USD"`, `decimals=8`).  
Em `feeder.ts`, configure sua cadeia (RPC, chainId) e deixe `aggregatorContracts` vazio por enquanto.

???+ code "OffchainAggregator.s.sol"
    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/phala/OffchainAggregator.s.sol'
    ```

???+ code "feeder.ts"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/oracles/phala/feeder.ts'
    ```

### Build e testes {: #build-and-test }

```bash
yarn build
yarn test
```

### Deploy {: #deploy }

```bash
yarn deploy
```

Anote o endereço do agregador retornado.

### Acessar o agregador {: #access-aggregator-contract }

No Remix, informe o endereço implantado em **At Address** e abra `latestRoundData` (inicialmente zeros).

![Access aggregator contract](/images/builders/toolkit/integrations/oracles/phala/phala-5.webp)

### Disparar atualização de preço {: #Trigger Price Feed Update }

Inclua o contrato em `aggregatorContracts` em `feeder.ts`:

```ts
const aggregatorContracts = {
  'BTC-USD': 'SEU_ENDERECO_AQUI',
};
```

Execute:

```bash
npx tsx feeder.ts
```

Volte ao Remix e chame `latestRoundData` para ver o preço atualizado.

![Check price data](/images/builders/toolkit/integrations/oracles/phala/phala-6.webp)

Para mais detalhes, veja os [docs da Phala](https://docs.phala.com/overview/phala-network){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.pt.md'
