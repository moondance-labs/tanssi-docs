---
title: Indexando uma Rede Tanssi com SQD
description: Aprenda a usar o Squid SDK, um framework de query node para cadeias baseadas em Substrate, para indexar e processar dados em uma rede EVM ou Substrate com tecnologia Tanssi.
icon: octicons-rocket-24
categories: EVM-Template, Substrate-Template
---

# Indexando uma Rede Tanssi com SQD

## Introdução {: #introduction }

[SQD](https://www.sqd.ai/){target=_blank} é uma rede de dados que permite recuperar dados de blockchain de mais de 100 cadeias de forma rápida e econômica usando o data lake descentralizado da SQD e o SDK open-source. Em termos simples, o SQD funciona como uma ferramenta ETL (extrair, transformar e carregar) com um servidor GraphQL incluído. Ele oferece filtragem abrangente, paginação e até pesquisa de texto completo. O SQD tem suporte nativo e completo para dados EVM e Substrate, até no mesmo projeto.

Este guia rápido mostra como criar um projeto Squid e configurá-lo para indexar dados em uma rede com tecnologia Tanssi. Há uma seção para [redes Substrate](#index-substrate-networks) e outra para [redes EVM](#index-evm-networks). Se você estiver em uma rede EVM, pode usar a seção Substrate caso também precise indexar dados Substrate.

Para um tutorial mais completo para redes EVM, confira [Indexando Transferências ERC-20 em uma Rede EVM Tanssi](/pt/builders/toolkit/integrations/indexers/sqd/erc20-transfers/){target=_blank}.

## Verificando pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você vai precisar de:

- [Node.js](https://nodejs.org/en/download){target=_blank} versão 16 ou superior
- [Docker](https://docs.docker.com/get-started/get-docker/){target=_blank}
- [Squid CLI](https://docs.sqd.ai/squid-cli/installation/){target=_blank}

## Indexar uma rede Substrate Tanssi {: #index-substrate-networks }

Para começar a indexar dados Substrate na sua rede Tanssi, crie um projeto Squid e configure-o para sua rede com estes passos:

1. Crie um projeto Squid baseado no template Substrate executando:

    ```bash
    sqd init INSERT_SQUID_NAME --template substrate
    ```

    Para mais detalhes sobre este template, veja o guia [Primeiros passos: Cadeias Substrate](https://docs.sqd.ai/sdk/how-to-start/squid-development/?template-tech=substrate){target=_blank} na documentação da SQD.

2. No diretório raiz do projeto, instale as dependências:

    ```bash
    npm ci
    ```

3. Ajuste `src/processor.ts` para apontar para o RPC da sua rede Tanssi. Remova a linha `archive: lookupArchive`, pois não será usado um arquivo Squid. Especifique o RPC da sua rede Substrate Tanssi, pois o endpoint é usado para ingerir os dados da cadeia:

    ```ts
    const processor = new EvmBatchProcessor();
    processor.setDataSource({
      chain: 'INSERT_RPC_URL',
    })
    ```

4. Suba o Postgres executando:

    ```bash
    sqd up
    ```

5. Inspecione e execute o processador:

    ```bash
    sqd process
    ```

6. Em outro terminal, no mesmo diretório, inicie o servidor GraphQL:

    ```bash
    sqd serve
    ```

7. Consulte o Squid Substrate de template com a query abaixo. Se você modificar o template para indexar dados diferentes, ajuste a query conforme necessário:

    ```graphql
    query MyQuery {
      accountsConnection(orderBy: id_ASC) {
        totalCount
      }
    }
    ```

Pronto! Agora você pode atualizar `schema.graphql`, `src/main.ts`, `typegen.json` e `src/processor.ts` para indexar os dados que precisa.

## Indexar uma rede EVM Tanssi {: #index-evm-networks }

Para indexar dados EVM em uma rede EVM Tanssi, crie um projeto Squid e configure-o assim:

1. Crie um projeto Squid para EVM usando o [template EVM](https://github.com/subsquid-labs/squid-evm-template){target=_blank} genérico ou o [template ABI](https://github.com/subsquid-labs/squid-abi-template){target=_blank} para dados de um contrato específico.

    === "EVM"

        ```bash
        sqd init INSERT_SQUID_NAME --template evm
        ```

    === "ABI"

        ```bash
        sqd init INSERT_SQUID_NAME --template abi
        ```

    Para saber mais sobre esses templates, consulte:

    - [Primeiros passos: Cadeias EVM](https://docs.sqd.ai/sdk/how-to-start/squid-development/?template-tech=evm){target=_blank}
    - [Início rápido: Ferramentas de geração Squid](https://docs.sqd.ai/sdk/resources/tools/squid-gen/){target=_blank}

2. No diretório raiz do projeto, instale as dependências:

    ```bash
    npm ci
    ```

3. Ajuste `src/processor.ts` para apontar para o RPC da sua rede Tanssi. Remova a linha `archive: lookupArchive('eth-mainnet')`, pois não será usado um arquivo Squid. Abaixo, o RPC da rede EVM de demonstração é usado como exemplo; substitua pelo seu:

    ```ts
    const processor = new EvmBatchProcessor();
    processor.setDataSource({
      chain: 'INSERT_RPC_URL',
    })
    ```

    !!! nota
        Para testar na rede EVM de demonstração, você pode usar este RPC:

        ```text
        {{ networks.dancelight.demo_evm_rpc_url }}
        ```

4. Suba o Postgres executando:

    ```bash
    sqd up
    ```

5. Inspecione e execute o processador:

    ```bash
    sqd process
    ```

6. Em outro terminal, inicie o servidor GraphQL:

    ```bash
    sqd serve
    ```

7. Execute consultas no playground GraphQL em `http://localhost:4350/graphql`, por exemplo:

    ```graphql
    query MyQuery {
      burns(orderBy: value_DESC) {
        address
        block
        id
        txHash
        value
      }
    }
    ```

Pronto! Agora você pode atualizar `schema.graphql`, `src/main.ts` e `src/processor.ts` para indexar os dados necessários.

Para um guia passo a passo mais completo, veja o tutorial [Indexando Transferências ERC-20 em uma Rede EVM Tanssi](/pt/builders/toolkit/integrations/indexers/sqd/erc20-transfers/){target=_blank}.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
