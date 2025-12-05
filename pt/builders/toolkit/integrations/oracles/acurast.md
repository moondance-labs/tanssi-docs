---
title: Usando Acurast para oráculos de feeds de preço
description: Aprenda a usar a nuvem serverless descentralizada da Acurast para obter feeds de preço confiáveis na sua rede EVM com tecnologia Tanssi.
icon: octicons-eye-24
categories: EVM-Template
---

# Acessando feeds de preço com Acurast

## Introdução {: #introduction }

[Acurast](https://acurast.com){target=_blank} oferece computação permissionless, confiável e acessível para implantar aplicações. Um dos usos é permitir que desenvolvedores criem oráculos push/pull, consultando APIs off-chain para trazer preços on-chain. Os dados são processados de forma confidencial pelos Processors e enviados a contratos de redes EVM compatíveis com Tanssi via a [interface padrão Chainlink Aggregator](https://github.com/smartcontractkit/chainlink-evm/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=_blank}.

Este tutorial mostra um demo de [como interagir com feeds de preço](#fetch-price-data) fornecidos pela Acurast na [rede EVM de demonstração do Tanssi](/builders/tanssi-network/testnet/demo-evm-network/){target=_blank}. Você também pode implantar seus próprios feeds na sua rede EVM com tecnologia Tanssi. Para produção, é altamente recomendável contatar a [equipe Acurast](https://acurast.com){target=_blank} para auxiliar no lançamento e garantir a integridade do processo.

## O que é Acurast? {: #what-is-acurast }

Acurast é uma nuvem descentralizada e sem servidor em que qualquer pessoa pode contribuir poder de computação (inclusive com celulares) e receber recompensas. Esses Processors formam uma rede distribuída mundialmente. Processors e desenvolvedores interagem pelo [Acurast Console](https://console.acurast.com){target=_blank}.

## Obter dados de preço {: #fetch-price-data }

Você pode desenhar o feed de preço Acurast como quiser. Os dados ficam em uma série de contratos (um por feed) e podem ser consultados via a interface do agregador. O feed demo usa a mesma interface de preço da Chainlink:

???+ code "AggregatorV3Interface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/AggregatorV3Interface.sol'
    ```

Na interface, cinco funções retornam dados: `decimals`, `description`, `version`, `getRoundData` e `latestRoundData`. Consulte a [referência da Chainlink](https://docs.chain.link/data-feeds/api-reference){target=_blank} para detalhes.

## Interagir com feeds na rede EVM demo do Tanssi {: #interacting-with-price-feeds-demo-evm-network }

Vamos usar o feed BTC/USDT já implantado (veja [Ativos suportados](#supported-assets)). O contrato do agregador no Blockscout:

```text
{{ networks.demo_evm.oracles.acurast.btc_usd }}
```

Como interagir pelo Remix:

1. Conecte a MetaMask à rede EVM demo ([guia Remix](/builders/toolkit/ethereum-api/dev-env/remix/){target=_blank}).  
2. Cole o [contrato Aggregator](https://github.com/smartcontractkit/chainlink-evm/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=_blank} em um novo arquivo e compile.  
3. Em **Deploy and Run**, defina **ENVIRONMENT** para **Injected Provider -- MetaMask**.  
4. Selecione **AggregatorV3Interface** em **CONTRACT**.  
5. No campo **At Address**, informe `{{ networks.demo_evm.oracles.acurast.btc_usd }}` e clique **At Address**.

![Compilar contrato agregador](/images/builders/toolkit/integrations/oracles/acurast/acurast-1.webp)

![Acessar contrato do agregador](/images/builders/toolkit/integrations/oracles/acurast/acurast-2.webp)

Para consultar:

1. Expanda **AggregatorV3Interface**.  
2. Clique em **decimals** para ver quantas casas decimais o preço usa.  
3. Clique em **description** para verificar o par.  
4. Clique em **latestRoundData** para ver o preço mais recente (retornado em **int256 answer**).

![Consultar dados de preço](/images/builders/toolkit/integrations/oracles/acurast/acurast-3.webp)

Lembre-se de ajustar pelo número de decimais informado por `decimals()`. Ex.: se o feed retorna `51933620000` e `decimals = 6`, o preço é `51,933.62`.

### Ativos suportados {: #supported-assets }

Exemplo de chamada de API usada no demo:

```bash
curl "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
```

Saída de exemplo:

--8<-- 'code/builders/toolkit/integrations/oracles/acurast/terminal/api.md'

!!! nota
    Este exemplo usa apenas uma fonte (uma exchange). É possível construir scripts que agreguem múltiplas fontes.

Por design, a Acurast pode suportar o feed de qualquer ativo acessível por API.

Feeds implantados na rede EVM demo:

| Ativo/Par | Contrato agregador |
|:--:|:--:|
| AAVE/USDT | [{{ networks.demo_evm.oracles.acurast.aave_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x6239Ff749De3a21DC219bcFeF9d27B0dfE171F42){target=_blank} |
| BTC/USDT | [{{ networks.demo_evm.oracles.acurast.btc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x02093b190D9462d964C11587f7DedD92718D7B56){target=_blank} |
| CRV/USDT | [{{ networks.demo_evm.oracles.acurast.crv_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x01F143dfd745861902dA396ad7dfca962e5C83cA){target=_blank} |
| DAI/USDT | [{{ networks.demo_evm.oracles.acurast.dai_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x73aF6b14b73059686a9B93Cd28b2dEABF76AeC92){target=_blank} |
| ETH/USDT | [{{ networks.demo_evm.oracles.acurast.eth_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x007c3F3cc99302c19792F73b7434E3eCbbC3db25){target=_blank} |
| USDC/USDT | [{{ networks.demo_evm.oracles.acurast.usdc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xe4a46ef4cFbf87D026C3eB293b7672998d932F62){target=_blank} |
| USDT/USD | [{{ networks.demo_evm.oracles.acurast.usdt_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xf9c885E3A5846CEA887a0D69655BC08e52afe569){target=_blank} |

Esses endereços estão disponíveis para testes, mas você pode implantar feeds adicionais para outros pares conforme necessário.

## Criar e lançar seu próprio feed de preço {: #designing-and-launching-your-own-price-feed }

Você pode criar seu próprio feed Acurast na rede EVM do Tanssi. Este tutorial é apenas demonstrativo; para produção, [contate a equipe Acurast](https://acurast.com){target=_blank}.

São necessários dois componentes: contrato e script. No exemplo anterior de [interação com BTC/USD](#interacting-with-price-feeds-demo-evm-network) usamos a interface Chainlink porque é simples de demonstrar. O contrato subjacente segue a [interface Chainlink Aggregator](https://github.com/smartcontractkit/chainlink-evm/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=_blank}, mas o demo adiciona eventos e lógica exemplo. Código de contrato e script estão no [repositório da Acurast](https://github.com/Acurast/acurast-evm-oracle-sample/tree/main){target=_blank}.

O contrato de demo `InsecureDummyPriceFeed.sol` emite eventos quando o preço é atualizado e quando um novo round inicia. O método `setPrice` é inseguro e serve apenas para mostrar onde adicionar consenso, controle de acesso etc.

???+ code "InsecureDummyPriceFeed.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/InsecureDummyPriceFeed.sol'
    ```

!!! atenção
    O contrato de demonstração tem vulnerabilidades e não possui controles de acesso; não use em produção.

Antes de prosseguir, implante o contrato do seu feed na rede EVM do Tanssi (ou na rede demo). Guarde o endereço, pois será usado no script Acurast.

### Construindo o script Acurast

O script Acurast atualiza o oracle on-chain com os preços, fazendo a ponte entre o feed de preço da rede Tanssi e a rede Acurast. No console você define parâmetros como frequência, agenda e recompensa dos Processors. Para publicar jobs você precisará de tokens cACU (pegue no [faucet](https://faucet.acurast.com){target=_blank}) — eles são a moeda nativa da rede Canary da Acurast.

O script atualiza o oracle on-chain com preços. Exemplo de script:

???+ code "AcurastScript.js"
    ```js
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/AcurastScript.js'
    ```

Se você reutilizar o script de exemplo da Acurast, lembre-se de atualizar o endereço do contrato e o RPC da sua rede.

No [console Acurast](https://console.acurast.com/create){target=_blank}, configure o job:

1. **Create Jobs** → cadeia **Moonbeam**, ambiente **Moonbase** (Tanssi herda a compatibilidade EVM do Moonbeam).  
2. Selecione **Price Feeds**.  
3. Cole o script (altere o endereço do contrato implantado e o RPC da sua rede — disponível no [Tanssi dApp](https://apps.tanssi.network){target=_blank}).  
4. Opcional: teste o código; erros aparecem no console do navegador.  
5. Em seguida, defina **Use Public Processors**, **Interval**, horário de início/fim, intervalo em minutos, duração e max start delay.  
6. Defina o **Number of processors** (mais processadores exigem mais cACU; obtenha no [faucet](https://faucet.acurast.com){target=_blank}).  
7. Defina o **Max Reward** por execução (exemplo: `0.01` cACU).  
8. Revise e clique **Publish Job**. Depois acompanhe o status na mesma página.

![Configuração do job no console Acurast](/images/builders/toolkit/integrations/oracles/acurast/acurast-4.webp)

![Configuração do job no console Acurast (continuação)](/images/builders/toolkit/integrations/oracles/acurast/acurast-5.webp)

Na tela seguinte você pode monitorar o status do job publicado.

Para mais detalhes sobre como construir e acessar feeds de preço na sua rede EVM Tanssi, consulte a [documentação da Acurast](https://docs.acurast.com){target=_blank}.

Com isso você tem um fluxo completo: contrato on-chain, script de atualização e job publicado na Acurast para manter o feed de preços ativo.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
