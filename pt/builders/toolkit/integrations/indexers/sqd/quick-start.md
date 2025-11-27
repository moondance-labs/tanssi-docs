---
title: Indexando uma Rede Tanssi com SQD
description: Learn how to use the Squid SDK, a query node framework for Substrate-based chains, to index and process data on a Tanssi-powered EVM or Substrate network.
icon: octicons-rocket-24
categories: EVM-Template, Substrate-Template
---

# Indexando uma Rede Tanssi com SQD

## Introdução {: #introduction }

[SQD](https://www.sqd.ai/){target=\_blank} é uma rede de dados que permite a recuperação rápida e econômica de dados de blockchain de mais de 100 cadeias usando o data lake descentralizado da SQD e o SDK de código aberto. Em termos simples, o SQD pode ser considerado uma ferramenta ETL (extrair, transformar e carregar) com um servidor GraphQL incluído. Ele permite filtragem abrangente, paginação e até mesmo recursos de pesquisa de texto completo. O SQD tem suporte nativo e completo para dados EVM e Substrate, mesmo dentro do mesmo projeto.

Este guia de início rápido mostrará como criar um projeto Squid e configurá-lo para indexar dados em uma rede alimentada por Tanssi. Há uma seção voltada para [redes Substrate](#index-substrate-networks) e outra para [redes EVM](#index-evm-networks). No entanto, se você estiver construindo em uma rede EVM, você também pode consultar a seção Substrate, se também precisar indexar dados Substrate.

Para um tutorial mais abrangente de ponta a ponta para redes EVM, certifique-se de verificar o tutorial [Indexando Transferências ERC-20 em uma Rede EVM Tanssi](/builders/toolkit/integrations/indexers/sqd/erc20-transfers/){target=\_blank}.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará ter o seguinte:

- [Node.js](https://nodejs.org/en/download){target=\_blank} versão 16 ou mais recente
- [Docker](https://docs.docker.com/get-started/get-docker/){target=\_blank}
- [Squid CLI](https://docs.sqd.ai/squid-cli/installation/){target=\_blank}

## Indexar uma Rede Substrate Tanssi {: #index-substrate-networks }

Para começar a indexar dados Substrate em sua rede alimentada por Tanssi, você precisará criar um projeto Squid e configurá-lo para sua rede, seguindo as seguintes etapas:

1. Crie um projeto Squid com base no modelo Substrate executando

   ```bash
   ```

   Para obter mais informações sobre como começar com este modelo, consulte o guia [Primeiros passos: Cadeias Substrate](https://docs.sqd.ai/sdk/how-to-start/squid-development/?template-tech=substrate){target=\_blank} no site da documentação da SQD.

1. Navegue até o diretório raiz do seu projeto Squid e instale as dependências executando

   ```bash
   ```

1. Modifique o arquivo `src/processor.ts` para definir a fonte de dados para o URL RPC da sua rede Tanssi. Remova a linha `archive: lookupArchive` pois um arquivo Squid não será usado. Aqui, você precisará especificar o URL RPC da sua rede Substrate Tanssi, pois o endpoint é usado para ingerir dados da cadeia

   ```ts
   processor.setDataSource({
     chain: 'INSERT_RPC_URL',
   })
   ```

1. Inicie o Postgres executando

   ```bash
   ```

1. Inspecione e execute o processador

   ```bash
   ```

1. Abra uma janela de terminal separada no mesmo diretório e inicie o servidor GraphQL

   ```bash
   ```

1. Você pode consultar seu Squid Substrate de modelo com a consulta de exemplo abaixo. Se você modificou o Squid Substrate de modelo para indexar dados diferentes, precisará modificar esta consulta de acordo

   ```graphql
     accountsConnection(orderBy: id_ASC) {
       totalCount
     }
   }
   ```

E é tudo o que você precisa fazer para configurar seu projeto Squid para indexar dados Substrate em sua rede Substrate alimentada por Tanssi! Agora você pode atualizar os arquivos `schema.graphql`, `src/main.ts`, `typegen.json` e `src/processor.ts` para indexar os dados de que você precisa para seu projeto!

## Indexar uma Rede EVM Tanssi {: #index-evm-networks }

Para começar a indexar dados EVM em uma rede EVM alimentada por Tanssi, você precisará criar um projeto Squid e configurá-lo para sua rede, seguindo as seguintes etapas:

1. Você pode criar um projeto Squid para dados EVM usando o [modelo EVM](https://github.com/subsquid-labs/squid-evm-template){target=\_blank} genérico ou você pode usar o [modelo ABI](https://github.com/subsquid-labs/squid-abi-template){target=\_blank} para indexar dados relacionados a um contrato específico

   === "EVM"

   ````
        ```bash

    sqd init INSERT_SQUID_NAME --template evm

        ```
   ````

   === "ABI"

        ```bash
   ````

        ```
    sqd init INSERT_SQUID_NAME --template abi
    ```

   ````

   Para obter mais informações sobre como começar com ambos os modelos, consulte os seguintes documentos da SQD:

   - [Primeiros passos: Cadeias EVM](https://docs.sqd.ai/sdk/how-to-start/squid-development/?template-tech=evm){target=\_blank}
   - [Início rápido: Ferramentas de geração Squid](https://docs.sqd.ai/sdk/resources/tools/squid-gen/){target=\_blank}
    ```bash

1. Navegue até o diretório raiz do seu projeto Squid e instale as dependências executando

    ```
   ```bash

   npm ci

   ```
    ```ts

1. Modifique o arquivo `src/processor.ts` para definir a fonte de dados para o URL RPC da sua rede Tanssi. Remova a linha `archive: lookupArchive('eth-mainnet')` pois um arquivo Squid não será usado. Aqui, o URL RPC da rede EVM de demonstração é especificado. O projeto Squid usará o endpoint RPC para ingerir os dados relevantes

   ```ts
   const processor = new EvmBatchProcessor();
    ```

     chain: 'INSERT_RPC_URL',
   })

   ```

        ```text

   Para experimentar isso na rede EVM de demonstração, você pode usar o seguinte URL RPC:

        ```
   ````

    ```text
    {{ networks.dancelight.demo_evm_rpc_url }}
    ```bash

   ````
    ```

1. Inicie o Postgres executando

   ```bash
   ```

1. Inspecione e execute o processador

   ```bash
   ```

1. Abra uma janela de terminal separada no mesmo diretório, depois inicie o servidor GraphQL

   ```bash
    ```graphql

   ```

1. Agora você pode executar consultas, como a consulta de exemplo abaixo, em seu Squid no playground GraphQL em `http://localhost:4350/graphql`. Se você modificou o Squid Substrate de modelo para indexar dados diferentes, precisará modificar esta consulta de acordo

   ```graphql

   query MyQuery {
     burns(orderBy: value_DESC) {
       address
       block

    ```
       txHash
       value
     }
   }
   ```

E é tudo o que você precisa fazer para configurar seu projeto Squid para indexar dados EVM em sua rede EVM alimentada por Tanssi! Agora você pode atualizar os arquivos `schema.graphql`, `src/main.ts` e `src/processor.ts` para indexar os dados de que você precisa para seu projeto!

Se você estiver interessado em um tutorial mais abrangente passo a passo para começar a indexar dados para sua rede Tanssi, você pode consultar o tutorial [Indexando Transferências ERC-20 em uma Rede EVM Tanssi](/builders/toolkit/integrations/indexers/sqd/erc20-transfers/){target=\_blank}!

--8\<-- 'text/\_disclaimers/third-party-content.md'
