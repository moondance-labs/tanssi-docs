---
title: Index a Tanssi Appchain with Subsquid
description: Learn how to use Subsquid, a query node framework for Substrate-based chains, to index and process data on a Tanssi EVM or Substrate Appchain.
---

# Indexing a Tanssi Appchain with Subsquid

## Introduction {: #introduction }

[Subsquid](https://subsquid.io/){target=\_blank} is a data network that allows rapid and cost-efficient retrieval of blockchain data from 100+ chains using Subsquid’s decentralized data lake and open-source SDK. In simple terms, Subsquid can be thought of as an ETL (extract, transform, and load) tool with a GraphQL server included. It enables comprehensive filtering, pagination, and even full-text search capabilities. Subsquid has native and full support for both EVM and Substrate data, even within the same project.

This quick-start guide will show you how to create a Subsquid project and configure it to index data on a Tanssi appchain. There is one section catered towards [Substrate appchains](#index-substrate-appchains) and another towards [EVM appchains](#index-evm-appchains). However, if you're building on an EVM appchain, you may also reference the Substrate section, if you also need to index Substrate data.

For a more comprehensive end-to-end tutorial for EVM appchains, be sure to check out the [Indexing ERC-20 Transfers on a Tanssi EVM Appchain](/builders/toolkit/integrations/indexers/subsquid/erc20-transfers/){target=\_blank} tutorial.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - [Node.js](https://nodejs.org/en/download/){target=\_blank} version 16 or newer
 - [Docker](https://docs.docker.com/get-docker/){target=\_blank}
 - [Squid CLI](https://docs.subsquid.io/squid-cli/installation/){target=\_blank}

## Index a Tanssi Substrate Appchain {: #index-substrate-appchains }

To get started indexing Substrate data on your Tanssi appchain, you'll need to create a Subsquid project and configure it for your Tanssi appchain by taking the following steps:

1. Create a Subsquid project based on the Substrate template by running

    ```bash
    sqd init INSERT_SQUID_NAME --template substrate
    ```

    For more information on getting started with this template, please check out the [Quickstart: Substrate chains](https://docs.subsquid.io/quickstart/quickstart-substrate/){target=\_blank} guide on Subsquid's documentation site.

2. Navigate into the root directory of your Squid project and install dependencies by running

    ```bash
    npm ci
    ```

3. Modify the `src/processor.ts` file to set the data source to the RPC URL of your Tanssi appchain. Remove the `archive: lookupArchive` line as a Squid archive will not be used. Here, you'll need to specify the RPC URL of your Tanssi Substrate appchain, as the endpoint is used to ingest chain data

    ```ts
    const processor = new EvmBatchProcessor();
    processor.setDataSource({
      chain: 'INSERT_RPC_URL',
    })
    ```

4. Launch Postgres by running

    ```bash
    sqd up
    ```

5. Inspect and run the processor

    ```bash
    sqd process
    ```

6. Open a separate terminal window in the same directory, then start the GraphQL server

    ```bash
    sqd serve
    ```

7. You can query your template Substrate Squid with the below sample query. If you've modified the template Substrate squid to index different data, you'll need to modify this query accordingly

    ```graphql
    query MyQuery {
      accountsConnection(orderBy: id_ASC) {
        totalCount
      }
    }
    ```

And that's all you have to do to configure your Subsquid project to index Substrate data on your Tanssi Substrate appchain! Now you can update the `schema.graphql`, `src/main.ts`, `typegen.json`, and `src/processor.ts` files to index the data you need for your project!

## Index a Tanssi EVM Appchain {: #index-evm-appchains }

To get started indexing EVM data on a Tanssi EVM appchain, you'll need to create a Subsquid project and configure it for your Tanssi appchain by taking the following steps:

1. You can create a Subsquid project for EVM data by using the generic [EVM template](https://github.com/subsquid-labs/squid-evm-template/){target=\_blank} or you can use the [ABI template](https://github.com/subsquid-labs/squid-abi-template/){target=\_blank} for indexing data related to a specific contract

    === "EVM"

        ```bash
        sqd init INSERT_SQUID_NAME --template evm
        ```

    === "ABI"

        ```bash
        sqd init INSERT_SQUID_NAME --template abi
        ```

    For more information on getting started with both of these templates, please check out the following Subsquid docs:

      - [Quickstart: EVM chains](https://docs.subsquid.io/quickstart/quickstart-ethereum/){target=\_blank}
      - [Quickstart: generate from ABI](https://docs.subsquid.io/quickstart/quickstart-abi/){target=\_blank}

2. Navigate into the root directory of your Squid project and install dependencies by running

    ```bash
    npm ci
    ```

3. Modify the `src/processor.ts` file to set the data source to the RPC URL of your Tanssi appchain. Remove the `archive: lookupArchive('eth-mainnet')` line as a Squid archive will not be used. Here, the RPC URL of the demo EVM appchain is specified. The Squid project will use the RPC endpoint to ingest the relevant data

    ```ts
    const processor = new EvmBatchProcessor();
    processor.setDataSource({
      chain: 'INSERT_RPC_URL',
    })
    ```

    !!! note
        To try this out on the demo EVM appchain, you can use the following RPC URL:

        ```text
        https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network
        ```

4. Launch Postgres by running

    ```bash
    sqd up
    ```

5. Inspect and run the processor

    ```bash
    sqd process
    ```

6. Open a separate terminal window in the same directory, then start the GraphQL server

    ```bash
    sqd serve
    ```

7. You can now run queries, such as the sample query below, against your Squid on the GraphQL playground at [http://localhost:4350/graphql](http://localhost:4350/graphql/){target=\_blank}. If you've modified the template Substrate squid to index different data, you'll need to modify this query accordingly

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

And that's all you have to do to configure your Subsquid project to index EVM data on your Tanssi EVM appchain! Now you can update the `schema.graphql`, `src/main.ts`, and `src/processor.ts` files to index the data you need for your project!

If you're interested in a more comprehensive step-by-step tutorial to get started indexing data for your Tanssi appchain, you can check out the [Indexing ERC-20 Transfers on a Tanssi EVM Appchain](/builders/toolkit/integrations/indexers/subsquid/erc20-transfers/){target=\_blank} tutorial!

--8<-- 'text/_disclaimers/third-party-content.md'
