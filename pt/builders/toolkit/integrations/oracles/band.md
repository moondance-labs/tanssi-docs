---
title: Usando o Band Protocol para Oráculos de Feed de Preços
description: Aprenda a usar a rede de oráculos descentralizada do Band Protocol para obter preços de tokens confiáveis, permitindo acesso seguro a dados para sua rede EVM da Tanssi.
icon: octicons-eye-24
categories: EVM-Template
---

# Acessando Feeds de Preços com o Band Protocol

## Introdução {: #introduction }

[Band Protocol](https://www.bandprotocol.com/){target=\_blank} é uma rede de oráculos descentralizada que fornece dados confiáveis, seguros e em tempo real para contratos inteligentes em várias redes blockchain.

O protocolo é construído sobre o BandChain, uma rede projetada para ser compatível com a maioria das cadeias compatíveis com EVM, como as redes EVM com tecnologia Tanssi, e com frameworks de desenvolvimento. O protocolo busca oferecer uma solução:

- Descentralizada, aproveitando o poder computacional de uma rede de validadores
- Flexível, suportando ampla variedade de fontes e formatos de dados, facilitando integrações
- Escalável, projetada para lidar com alto volume de requisições
- Acessível, permitindo solicitar dados apenas quando necessário e pagar apenas as taxas associadas

Para implantar o oráculo na sua rede, entre em contato diretamente com a equipe do [Band Protocol](https://www.bandprotocol.com/){target=\_blank}.

Este tutorial percorre as etapas para interagir com feeds de preços usando o oráculo do Band Protocol na [rede EVM de demonstração da Tanssi](https://apps.tanssi.network/demo){target=\_blank}. 

## Configuração na Rede de Demonstração EVM da Tanssi {: #setup-on-demo-evm-network }

O oráculo do Band Protocol já está implantado na rede EVM de demonstração da Tanssi e configurado para fornecer preços para os tokens `ETH` e `DOT`.

Os feeds de preços são enviados regularmente para um contrato inteligente acessível no endereço:

```text
{{ networks.demo_evm.oracles.band.smart_contract }}
```

O contrato pode ser utilizado via a interface:

???+ code "IStdReference.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/band/IStdReference.sol'
    ```

Como visto acima, há duas funções para buscar dados:

???+ function "**getReferenceData**(_base, _quote) — busca o preço de um par base/cotação"

    === "Parâmetros"

        - `_base` ++"string memory"++ - token cujo preço você quer obter
        - `_quote` ++"string memory"++ - token (ou `USD`) em que o preço é expresso
        
    === "Exemplo"

        - `_base` - ETH
        - `_quote` - USD
        
??? function "**getReferenceDataBulk**(_bases, _quotes) — busca preços para os pares base/cotação fornecidos simultaneamente"

    === "Parâmetros"

        - `_bases` ++"string[] memory"++ - lista de tokens base para os quais deseja obter preços
        - `_quotes` ++"string[] memory"++ - lista de tokens (ou `USD`) em que os preços são expressos

    === "Exemplo"

        - `_bases` - ["ETH", "DOT"]
        - `_quotes` - ["USD", "USD"]

A resposta de ambas as funções é composta pelos seguintes dados, agrupados em uma tupla no caso de `getReferenceData` e em uma lista de tuplas (uma por par) no caso de `getReferenceDataBulk`:

- `rate` ++"uint256"++ - preço do par base/cotação fornecido. Ajuste o resultado para considerar 18 casas decimais
- `lastUpdatedBase` ++"uint256"++ - timestamp de atualização do parâmetro `_base`, em epoch UNIX (segundos desde `01-01-1970 00:00:00 UT`)
- `lastUpdatedQuote` ++"uint256"++ - timestamp de atualização do parâmetro `_quote`, em epoch UNIX (segundos desde `01-01-1970 00:00:00 UT`)

### Buscar Feeds de Preço usando Remix {: #fetching-price-feeds-remix }

Nesta seção, usaremos o Remix para buscar o preço do par `ETH/USD`.

Primeiro, certifique-se de ter uma [carteira compatível com EVM](/pt/builders/toolkit/ethereum-api/wallets/){target=\_blank} conectada à [rede EVM de demonstração](https://apps.tanssi.network/demo){target=\_blank}. [MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} é usada como exemplo. Em seguida, acesse o [Remix](https://remix.ethereum.org/){target=\_blank}, cole a interface [`IStdReference`](#setup-on-demo-evm-network) em um novo arquivo e compile.

![Compilar contrato de interface](/images/builders/toolkit/integrations/oracles/band/band-1.webp)

Depois, siga:

1. Vá para a aba **Deploy & Run Transactions**
2. Defina **ENVIRONMENT** como **Injected Provider -- MetaMask**
3. Selecione o contrato `IStdReference.sol` no menu **CONTRACT**
4. Informe o endereço do contrato de feed de dados `{{ networks.demo_evm.oracles.band.smart_contract }}` da rede EVM de demonstração no campo **At Address** e clique em **At Address**

![Acessar contrato de interface](/images/builders/toolkit/integrations/oracles/band/band-2.webp)

O contrato estará acessível. Para interagir:

1. Expanda o contrato **IStdReference** para ver as funções disponíveis
2. Expanda **getReferenceData** e defina `_base` e `_quote` como `ETH` e `USD`
3. Clique em **Call**
4. O resultado exibirá três valores: o preço, o horário de atualização do parâmetro `_base` e o horário de atualização do parâmetro `_quote`

![Checar dados de preço](/images/builders/toolkit/integrations/oracles/band/band-3.webp)

Para obter um preço legível, ajuste pelas casas decimais do feed (18). No exemplo, `2361167929271984201806` corresponde a um preço de `ETH` de `$2,361.167929271984201806` em `USD`. Observe também que os timestamps de atualização estão em epoch UNIX, ou seja, segundos desde `01-01-1970 00:00:00 UT`. 

--8<-- 'text/_disclaimers/third-party-content.md'
