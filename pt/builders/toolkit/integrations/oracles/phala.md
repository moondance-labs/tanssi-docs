---
title: Usando Phala para oráculos de feeds de preço
description: Aprenda a usar a rede de computação off-chain da Phala para obter feeds de preço Chainlink (Ethereum Mainnet) na sua rede EVM com tecnologia Tanssi.
icon: octicons-eye-24
categories: EVM-Template
---

# Lançando feeds de preços com Phala

## Introdução {: #introduction }

[Phala Network](https://phala.com/){target=_blank} é uma rede de computação off-chain apoiada por [Secure Enclaves](https://docs.phala.com/network/tech-specs/blockchain/overview#the-architecture){target=_blank} que permite a desenvolvedores criar contratos inteligentes potentes conectados a componentes off-chain, chamados Phat Contracts. Os Phat Contracts foram projetados para oferecer funcionalidades que superam as limitações de contratos tradicionais (armazenamento, custo, computação), mantendo-se trustless, verificáveis e sem permissão. Para saber mais sobre a arquitetura da Phala, consulte a [documentação](https://docs.phala.com/overview/phala-network){target=_blank}.

A Phala não é, por si só, uma rede de oráculos; ela habilita várias capacidades de computação off-chain, incluindo uma rede descentralizada de oráculos. A Phala também oferece o [Phala Bricks](https://bricks.phala.network){target=_blank}, um conjunto de ferramentas que facilita lançar rapidamente esse tipo de funcionalidade sem precisar construir tudo do zero.

Este tutorial mostra um demo de [como interagir com feeds de preço](#fetch-price-data) habilitados por Phat Contracts na rede EVM de demonstração do Tanssi. Em seguida, você verá como [implantar feeds de preço na sua rede EVM com tecnologia Tanssi](#launching-price-feeds-on-an-evm-network). Para produção, é altamente recomendável [contatar a equipe Phala](https://dashboard.phala.network){target=_blank} para auxiliar no lançamento e garantir a integridade do processo.

Se você já usa outro provedor de oráculos, a Phala serve como camada de execução confidencial para trazer esses dados para sua rede Tanssi. É possível adaptar o fluxo descrito aqui para outros feeds ou APIs, mantendo a mesma interface de consumo no contrato EVM.

Além disso, por usar enclaves seguros, a Phala reduz a superfície de ataque ao processar dados sensíveis ou agregados de múltiplas fontes, reforçando a confiança no resultado final consumido pelos dApps.

## Como a Phala habilita feeds de preço {: #how-phala-enables-price-feeds }

A Phala espelha os [Chainlink Price Feeds](https://docs.chain.link/data-feeds/price-feeds){target=_blank} do Ethereum Mainnet. Esses feeds são amplamente adotados e sua coleta/agragação é feita por vários operadores de nó independentes, evitando dependência de uma única fonte de verdade e reduzindo risco de manipulação.

O componente central do desenho do sistema é o [Secure Enclave](https://docs.phala.com/network/tech-specs/blockchain/overview#the-architecture){target=_blank}, que processa as mensagens recebidas da blockchain Phala (fila de mensagens criptografada) e garante execução fiel mesmo com trabalhadores maliciosos. A blockchain Phala solicita a atualização do feed; os workers off-chain buscam os preços no Ethereum Mainnet e devolvem para a blockchain Phala.

Além de replicar oráculos existentes, é possível criar novos oráculos buscando dados off-chain via Phat Contracts. No [exemplo de Phat-EVM Oracle](https://github.com/Phala-Network/phat-offchain-rollup/blob/main/EvmRollup.md){target=_blank}, os preços vêm da API do CoinGecko e podem ser enviados continuamente (push) ou solicitados pelo contrato EVM (pull).

Em resumo: a Phala funciona como uma ponte segura entre dados externos e sua rede EVM, permitindo reutilizar feeds consolidados da Chainlink ou construir integrações sob medida usando Phat Contracts.

## Buscar dados de preço {: #fetch-price-data }

Há vários feeds disponíveis na rede EVM demo. Os feeds habilitados por Phat Contracts usam a mesma interface dos feeds Chainlink. Cada feed fica em um contrato e pode ser consultado pela interface agregadora:

Você também pode reutilizar a mesma interface para feeds personalizados que a sua equipe decidir publicar, mantendo uma API consistente para contratos e frontends.

???+ code "AggregatorV3Interface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/phala/AggregatorV3Interface.sol'
    ```

A interface expõe cinco funções: `decimals`, `description`, `version`, `getRoundData` e `latestRoundData`. Para mais detalhes, veja a [referência da Chainlink](https://docs.chain.link/data-feeds/api-reference){target=_blank}.

Essas funções permitem consultar metadados do feed, verificar o par de ativos, e obter o preço mais recente ou de uma rodada específica.

### Ativos suportados {: #supported-assets }

A Phala obtém os feeds espelhando os feeds Chainlink do Ethereum Mainnet. Há contratos para a [rede EVM demo](/builders/tanssi-network/testnet/demo-evm-network/){target=_blank} e para o Ethereum Mainnet:

=== "Rede EVM demo Tanssi"
    | Par de Ativos | Contrato agregador |
    |:--:|:--:|
    | AAVE/USD | [{{ networks.demo_evm.oracles.phala.aave_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x2E1640853bB2dD9f47831582665477865F9240DB){target=_blank} |
    | BTC/USD  | [{{ networks.demo_evm.oracles.phala.btc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x89BC5048d634859aef743fF2152363c0e83a6a49){target=_blank} |
    | CRV/USD  | [{{ networks.demo_evm.oracles.phala.crv_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xf38b25b79A72393Fca2Af88cf948D98c64726273){target=_blank} |
    | DAI/USD  | [{{ networks.demo_evm.oracles.phala.dai_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x1f56d8c7D72CE2210Ef340E00119CDac2b05449B){target=_blank} |
    | ETH/USD  | [{{ networks.demo_evm.oracles.phala.eth_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x739d71fC66397a28B3A3b7d40eeB865CA05f0185){target=_blank} |
    | USDC/USD | [{{ networks.demo_evm.oracles.phala.usdc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x4b8331Ce5Ae6cd33bE669c10Ded9AeBA774Bf252){target=_blank} |
    | USDT/USD | [{{ networks.demo_evm.oracles.phala.usdt_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x5018c16707500D2C89a0446C08f347A024f55AE3){target=_blank} |

=== "Ethereum Mainnet"
    | Par de Ativos | Contrato agregador |
    |:--:|:--:|
    | AAVE/USD | [0x547a514d5e3769680Ce22B2361c10Ea13619e8a9](https://etherscan.io/address/0x547a514d5e3769680Ce22B2361c10Ea13619e8a9){target=_blank} |
    | BTC/USD  | [0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c](https://etherscan.io/address/0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c){target=_blank} |
    | CRV/USD  | [0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f](https://etherscan.io/address/0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f){target=_blank} |
    | DAI/USD  | [0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9](https://etherscan.io/address/0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9){target=_blank} |
    | ETH/USD  | [0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419](https://etherscan.io/address/0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419){target=_blank} |
    | USDC/USD | [0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6](https://etherscan.io/address/0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6){target=_blank} |
    | USDT/USD | [0x3E7d1eAB13ad0104d2750B8863b489D65364e32D](https://etherscan.io/address/0x3E7d1eAB13ad0104d2750B8863b489D65364e32D){target=_blank} |

### Interagir com feeds na rede EVM demo {: #interacting-with-price-feeds-demo-evm-network }

1. Conecte a MetaMask à rede EVM demo (veja o guia [Implantar contratos com Remix](/builders/toolkit/ethereum-api/dev-env/remix/){target=_blank}) e certifique-se de que a MetaMask está nessa rede.  
2. Cole o [contrato Aggregator](https://github.com/smartcontractkit/chainlink-evm/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=_blank} em um novo arquivo no Remix e compile.  
3. Vá para **Deploy and Run Transactions** → **ENVIRONMENT** = **Injected Provider -- MetaMask**.  
4. Selecione **AggregatorV3Interface** em **CONTRACT**.  
5. No campo **At Address**, insira o endereço do feed desejado (ex.: BTC/USD `{{ networks.demo_evm.oracles.phala.btc_usd }}`) e clique em **At Address**.

![Compilar contrato agregador](/images/builders/toolkit/integrations/oracles/phala/phala-1.webp)
![Acessar contrato agregador](/images/builders/toolkit/integrations/oracles/phala/phala-2.webp)

Para consultar:

1. Expanda **AggregatorV3Interface**.  
2. Clique em **decimals** para ver quantas casas decimais o feed usa.  
3. Clique em **description** para verificar o par.  
4. Clique em **latestRoundData** para ver o preço mais recente (**int256 answer**).

![Ver dados de preço](/images/builders/toolkit/integrations/oracles/phala/phala-3.webp)

Para obter um preço legível, ajuste pelo valor de `decimals()`. Ex.: se o retorno for `5230364122303` e `decimals=8`, o preço é `52.303,64`.

Se preferir outro feed (DAI, ETH etc.), basta repetir os passos usando o endereço correspondente da tabela de ativos suportados.

Caso esteja depurando valores inesperados, valide se o `decimals()` retornado confere com o esperado para aquele par. Divergências de escala são a causa mais comum de leituras “estranhas” no front-end.

## Lançando feeds de preço em uma rede EVM {: #launching-price-feeds-on-an-evm-network }

É fácil lançar feeds em uma rede EVM do Tanssi! As etapas a seguir funcionam para redes Trial e dedicadas em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=_blank}. Este guia é demonstrativo; para produção, [contate a equipe Phala](https://dashboard.phala.network){target=_blank}.

### Setup {: #setup }

Clone o repositório [Phala Mirrored Price Feed](https://github.com/Phala-Network/mirrored-price-feed){target=_blank} e instale dependências:

```bash
cd mirrored-price-feed/ && yarn install
```

Crie o `.env` a partir do exemplo:

```bash
cp env.example .env
```

Edite o `.env` e insira a chave privada de uma conta financiada na sua rede e o RPC da sua rede. Se estiver na sua própria rede, financie uma conta de teste via Sudo (dados no [Tanssi dApp](https://apps.tanssi.network){target=_blank}). Os demais campos podem ficar em branco.

```bash
--8<-- 'code/builders/toolkit/integrations/oracles/phala/env.txt'
```

!!! nota
    Nunca compartilhe frase semente ou chave privada. Este guia é apenas educacional.

### Configurar script de implantação {: #configure-deployment-script }

Edite `scripts/OffchainAggregator.s.sol`. Ele recebe `decimals` (mantenha `8`) e a descrição do feed (ex.: `BTC / USD`). Use exatamente as descrições suportadas listadas em [Ativos suportados](#supported-assets), ou o feed não funcionará.

???+ code "OffchainAggregator.s.sol"
    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/phala/OffchainAggregator.s.sol'
    ```

Em `feeder.ts`, insira os detalhes da sua cadeia (RPC, chainId). O array `mainnetFeedContracts` (endereços do Mainnet) permanece. Limpe `aggregatorContracts` por enquanto — mais adiante você adicionará os endereços implantados na sua rede.

???+ code "feeder.ts"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/oracles/phala/feeder.ts'
    ```

### Build e testes {: #build-and-test }

```bash
yarn build
yarn test
```

Saída esperada:

--8<-- 'code/builders/toolkit/integrations/oracles/phala/terminal/build.md'

### Deploy {: #deploy }

Para implantar o contrato agregador do par escolhido:

```bash
yarn deploy
```

Anote o endereço retornado.

--8<-- 'code/builders/toolkit/integrations/oracles/phala/terminal/deploy.md'

### Acessar o contrato agregador {: #access-aggregator-contract }

No Remix, com a MetaMask na sua rede EVM, cole o endereço implantado em **At Address**. Expanda **AggregatorV3Interface** e clique em **latestRoundData** — inicialmente deve retornar `0` (sem preço atualizado ainda).

![Acessar contrato agregador](/images/builders/toolkit/integrations/oracles/phala/phala-4.webp)
![Saída do contrato implantado](/images/builders/toolkit/integrations/oracles/phala/phala-5.webp)

Se ainda não tiver sua rede configurada na MetaMask, use o botão **Add to MetaMask** no dashboard do [Tanssi dApp](https://apps.tanssi.network){target=_blank} para adicioná-la rapidamente.

### Disparar atualização de preço {: #Trigger Price Feed Update }

Inclua o endereço do agregador em `aggregatorContracts` no `feeder.ts`:

```ts
const aggregatorContracts = {
  'BTC-USD': 'INSIRA_ENDERECO_DO_AGREGADOR',
}
```

Depois execute:

```bash
npx tsx feeder.ts
```

--8<-- 'code/builders/toolkit/integrations/oracles/phala/terminal/update.md'

No Remix, chame **latestRoundData** novamente para ver o preço atualizado.

![Ver preço após atualização](/images/builders/toolkit/integrations/oracles/phala/phala-6.webp)

Para mais informações sobre uso da Phala para dados off-chain, veja os [docs da Phala](https://docs.phala.com/overview/phala-network){target=_blank}.

Essa abordagem completa (contrato + script + atualização via feeder) garante que os feeds fiquem sincronizados com as fontes da Chainlink no Mainnet e que sua rede Tanssi receba preços confiáveis.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
