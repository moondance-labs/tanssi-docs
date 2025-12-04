---
title: Usando o Band Protocol para oráculos de feed de preços
description: Aprenda a usar a rede de oráculos descentralizada do Band Protocol para obter preços de tokens confiáveis, permitindo o acesso seguro a dados para sua rede Tanssi EVM.
icon: octicons-eye-24
categories: EVM-Template
---

# Acessando feeds de preços com o Band Protocol

## Introdução {: #introduction }

[Band Protocol](https://www.bandprotocol.com/){target=\_blank} é uma rede de oráculos descentralizada que fornece dados confiáveis, seguros e em tempo real para contratos inteligentes em várias redes blockchain.

O protocolo é construído sobre o BandChain, uma rede projetada para ser compatível com a maioria das cadeias compatíveis com EVM, como as redes EVM movidas a Tanssi e estruturas de desenvolvimento de blockchain. O protocolo visa fornecer uma solução que seja:

- Descentralizada, aproveitando o poder computacional de uma rede de validadores
- Flexível, suportando uma ampla gama de fontes e formatos de dados, facilitando as integrações
- Escalável, projetada para lidar com altos volumes de solicitações de dados
- Acessível, permitindo que os usuários solicitem dados apenas quando precisarem e paguem as taxas associadas

O Band Protocol está atualmente implantado em muitos blockchains ([Moonbeam](https://docs.moonbeam.network/builders/integrations/oracles/band-protocol/){target=\_blank}, por exemplo) em diferentes ecossistemas. Para implantar o oráculo em sua rede, entre em contato diretamente com a equipe do [Band Protocol](https://www.bandprotocol.com/){target=\_blank}.

Este tutorial irá guiá-lo pelas etapas para interagir com feeds de preços usando o oráculo do Band Protocol na [rede compatível com EVM de demonstração da Tanssi](https://apps.tanssi.network/demo){target=\_blank}.

## Configuração na rede de demonstração EVM da Tanssi {: #setup-on-demo-evm-network }

O oráculo do Band Protocol já está implantado na rede de demonstração EVM da Tanssi e configurado para fornecer preços para os tokens `ETH` e `DOT`.

Os feeds de preços são enviados regularmente para um contrato inteligente que pode ser acessado no seguinte endereço:

```text
{{ networks.demo_evm.oracles.band.smart_contract }}
```

O smart pode ser interagir com usando a interface:

???+ code "IStdReference.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/band/IStdReference.sol'
    ```

Como visto acima na interface, existem duas funções para buscar dados:

???+ function "**getReferenceData** (_base, _quote) — busca o preço de um determinado par base/cotação"


    === "Parâmetros"

        - `_base` ++"string memory"++ - o token para o qual você deseja obter o preço
        - `_quote` ++"string memory"++ - o token (ou `USD`) no qual o preço é expresso
        
    === "Exemplo"

        - `_base` - ETH
        - `_quote` - USD


??? function "**getReferenceDataBulk** (_bases, _quotes) — busca preços para os pares base/cotação fornecidos simultaneamente"


    === "Parâmetros"

        - `_bases` ++"string[] memory"++ - a lista de tokens base para os quais você deseja obter os preços
        - `_quotes` ++"string[] memory"++ - a lista de tokens (ou `USD`) nos quais os preços são expressos

    === "Exemplo"

        - `_bases` - ["ETH", "DOT"]
        - `_quotes` - ["USD", "USD"]


A resposta para ambas as funções consiste nos seguintes dados, agrupados em uma tupla no caso de `getReferenceData` e uma lista de tuplas (uma tupla por par) no caso de `getReferenceDataBulk`:

- `rate` ++"uint256"++ - preço para o par base/cotação fornecido. Observe que o resultado deve ser ajustado para considerar dezoito casas decimais
- `lastUpdatedBase` ++"uint256"++ - carimbo de data/hora da atualização para o parâmetro `_base`, expresso em épocas UNIX, que é o número de segundos que se passaram desde `01-01-1970 00:00:00 UT`
- `lastUpdatedQuote` ++"uint256"++ - carimbo de data/hora da atualização para o parâmetro `_quote`, expresso em épocas UNIX, que é o número de segundos que se passaram desde `01-01-1970 00:00:00 UT`

### Obtendo feeds de preço usando o Remix {: #fetching-price-feeds-remix }

Nesta seção, usaremos o remix para buscar o preço do par `ETH/USD`.

Primeiro, certifique-se de ter uma [carteira compatível com EVM](/pt/builders/toolkit/ethereum-api/wallets/){target=\_blank} conectada à [rede de demonstração EVM](https://apps.tanssi.network/demo){target=\_blank}. [MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} é usado como exemplo neste guia. Agora, acesse o [Remix](https://remix.ethereum.org/){target=\_blank}, cole a interface [`IStdReference`](#setup-on-demo-evm-network) em um novo arquivo e compile-o.

![Compile interface contract](/images/builders/toolkit/integrations/oracles/band/band-1.webp)

Em seguida, siga estas etapas:

1. Vá para a aba **Deploy & Run Transactions**
2. Defina o **ENVIRONMENT** como **Injected Provider -- MetaMask**
3. Selecione o contrato `IStdReference.sol` no menu suspenso **CONTRACT**
4. Insira o endereço do contrato do feed de dados, que é `{{ networks.demo_evm.oracles.band.smart_contract }}` na rede de demonstração EVM no campo **At Address** e clique no botão **At Address**

![Access Interface contract](/images/builders/toolkit/integrations/oracles/band/band-2.webp)

O contrato agora deve estar acessível. Para interagir com ele, siga estas etapas:

1. Expanda o contrato **IStdReference** para revelar as funções disponíveis
2. Expanda **getReferenceData** e defina os parâmetros de entrada `_base` e `_quote` como `ETH` e `USD`, respectivamente
3. Clique em **Call**
4. O resultado mostrará três valores: o preço, a hora da atualização para o parâmetro `_base` e a hora da atualização para o parâmetro `_quote`

![Check price data](/images/builders/toolkit/integrations/oracles/band/band-3.webp)

Observe que, para obter um preço legível do feed de preços, é essencial ajustar as casas decimais do feed, que são dezoito. Por exemplo, o exemplo acima mostra um valor de `2361167929271984201806`, correspondente a um preço de `ETH` de `$2,361.167929271984201806` expresso em `USD`. Além disso, observe que os valores do carimbo de data/hora da atualização são expressos em tempo de época UNIX, expresso como o número de segundos que se passaram desde `01-01-1970 00:00:00 UT`.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
