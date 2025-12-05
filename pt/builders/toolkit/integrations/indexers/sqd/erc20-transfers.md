---
title: Indexar transferências ERC-20 em uma rede EVM
description: Aprenda a usar o Squid SDK, que indexa dados Substrate e EVM, para processar dados on-chain da sua rede com tecnologia Tanssi.
icon: octicons-arrow-switch-24
categories: EVM-Template
---

# Indexando transferências ERC-20 em uma rede EVM Tanssi

## Introdução {: #introduction }

[SQD](https://www.sqd.ai/){target=\_blank} é uma rede de dados que permite recuperar informações de mais de 100 cadeias usando um data lake descentralizado e um SDK open source. Em termos simples, é um ETL com servidor [GraphQL](https://graphql.org){target=\_blank} embutido, oferecendo filtragem, paginação e busca em texto.

A SQD oferece suporte nativo a EVM e Substrate, com arquivos/processadores para ambos. Assim, é possível extrair logs EVM e entidades Substrate (eventos, extrínsecos, storage) em um único projeto e servir via um único endpoint GraphQL. Para apenas dados EVM, use o arquivo/processador EVM.

Este tutorial mostra, passo a passo, como criar um Squid para indexar dados EVM. Há uma [versão completa no repositório tanssiSquid](https://github.com/themacexpert/tanssiSquid){target=\_blank}.

## Verificar pré-requisitos {: #check-prerequisites }

Você precisará de:

- [Docker instalado](https://docs.docker.com/get-started/get-docker/){target=\_blank}
- [Docker Compose instalado](https://docs.docker.com/compose/install){target=\_blank}
- Um projeto Hardhat vazio (veja [Criando um Projeto Hardhat](/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\_blank})

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

## Implantar um ERC-20 com Hardhat {: #deploy-an-erc20-with-hardhat }

Implante um token para ter eventos a indexar (ou use um já existente na demo EVM). Exemplo de contrato `MyTok.sol`:

1) Instale dependências:

=== "npm"
```bash
npm install @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
```
=== "yarn"
```bash
yarn add @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
```

2) Ajuste `hardhat.config.js` com sua RPC/conta:

???+ code "hardhat.config.js"
    ```js
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/hardhat-config.js'
    ```

!!! remember
    Não armazene chaves privadas em arquivos de código; use um gerenciador de segredos.

3) Crie o contrato:

```bash
mkdir -p contracts && touch contracts/MyTok.sol
```

???+ code "MyTok.sol"
    ```solidity
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/MyTok.sol'
    ```

4) Compile:

```bash
npx hardhat compile
```

5) Implante e registre o endereço:

```bash
mkdir -p scripts && touch scripts/deploy.js
npx hardhat run scripts/deploy.js --network demo
```

???+ code "deploy.js"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/deploy.js'
    ```

6) Dispare algumas transferências para gerar eventos:

```bash
touch scripts/transactions.js
npx hardhat run scripts/transactions.js --network demo
```

???+ code "transactions.js"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/transactions.js'
    ```

## Criar um projeto Squid {: #create-a-squid-project }

Instale o CLI e inicie o template EVM:

```bash
npm i -g @subsquid/cli@latest
sqd init tanssi-squid --template evm
cd tanssi-squid && npm ci
```

## Configurar o indexador de transferências ERC-20 {: #set-up-the-indexer-for-erc-20-transfers }

1) Definir esquema GraphQL:

???+ code "schema.graphql"
    ```graphql
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/schema.graphql'
    ```

```bash
sqd codegen
```

2) Adicionar ABI genérica do ERC-20 em `abi/erc20.json` e gerar interfaces:

??? code "ERC-20 ABI"
    ```json
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/erc20.json'
    ```

```bash
sqd typegen
```

3) Configurar `processor.ts`: fonte de dados, endereço do contrato, evento `Transfer`, intervalo de blocos e campos.

```ts
.setDataSource({
  chain: {
    url: assertNotNull('{{ networks.dancelight.demo_evm_rpc_url }}'),
    rateLimit: 300,
  },
})
.addLog({
  address: [contractAddress],
  topic0: [erc20.events.Transfer.topic],
  transaction: true,
})
.setBlockRange({ from: 632400 })
.setFields({
  log: { topics: true, data: true },
  transaction: { hash: true },
})
```

Imports necessários:

```ts
import { Store } from '@subsquid/typeorm-store';
import * as erc20 from './abi/erc20';
```

???+ code "processor.ts"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/processor.ts'
    ```

## Transformar e salvar os dados {: #transform-and-save-the-data }

Em `main.ts`, decodifique o evento `Transfer`, obtenha contas envolvidas, crie entidades e grave via TypeORM.

???+ code "main.ts"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/main.ts'
    ```

## Executar o indexador {: #run-the-indexer }

```bash
sqd build
sqd up
sqd migration:generate
sqd migration:apply
sqd process
```

## Consultar seu Squid {: #query-your-squid }

```bash
sqd serve
```

Acesse `http://localhost:4350/graphql` e faça queries, por exemplo:

???+ code "Exemplo de query"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sample-query.graphql'
    ```

## Depurar seu Squid {: #debug-your-squid }

Habilite logs detalhados no `.env`:

```text
SQD_DEBUG=*
```

Você pode adicionar logs em `main.ts` (veja exemplo com logging):

??? code "main-with-logging.ts"
    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/main-with-logging.ts'
    ```

Erros comuns:

- Porta ocupada pelo banco: pare instâncias anteriores (`sqd down`).  
- `ECONNREFUSED`: suba o banco com `sqd up` antes de gerar/apply migrations.  
- Sem eventos detectados: confirme o endereço do contrato em minúsculas (`.toLowerCase()`) e tópicos corretos.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
