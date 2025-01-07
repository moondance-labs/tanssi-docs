---
title: Index a Tanssi Network with SQD
description: Learn how to use the Squid SDK, a query node framework for Substrate-based chains, to index and process data on a Tanssi-powered EVM or Substrate network.
icon: octicons-rocket-24
---

# Indexing a Tanssi Network with SQD

## Introduction {: #introduction }

[SQD](https://www.sqd.dev/){target=\_blank} is a data network that allows rapid and cost-efficient retrieval of blockchain data from 100+ chains using SQD's decentralized data lake and open-source SDK. In simple terms, SQD can be thought of as an ETL (extract, transform, and load) tool with a GraphQL server included. It enables comprehensive filtering, pagination, and even full-text search capabilities. SQD has native and full support for both EVM and Substrate data, even within the same project.

This quick-start guide will show you how to create a Squid project and configure it to index data on a Tanssi-powered network. There is one section catered towards [Substrate networks](#index-substrate-networks) and another towards [EVM networks](#index-evm-networks). However, if you're building on an EVM network, you may also reference the Substrate section, if you also need to index Substrate data.

For a more comprehensive end-to-end tutorial for EVM networks, be sure to check out the [Indexing ERC-20 Transfers on a Tanssi EVM Network](/builders/toolkit/integrations/indexers/sqd/erc20-transfers/){target=\_blank} tutorial.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - [Node.js](https://nodejs.org/en/download){target=\_blank} version 16 or newer
 - [Docker](https://docs.docker.com/get-docker){target=\_blank}
 - [Squid CLI](https://docs.sqd.dev/squid-cli/installation){target=\_blank}

## Index a Tanssi Substrate Network {: #index-substrate-networks }

To get started indexing Substrate data on your Tanssi-powered network, you'll need to create a Squid project and configure it for your network by taking the following steps:

1. Create a Squid project based on the Substrate template by running

    ```bash
    sqd init INSERT_SQUID_NAME --template substrate
    ```

    For more information on getting started with this template, please check out the [Getting started: Substrate chains](https://docs.sqd.dev/sdk/how-to-start/squid-development/?template-tech=substrate){target=\_blank} guide on SQD's documentation site.

2. Navigate into the root directory of your Squid project and install dependencies by running

    ```bash
    npm ci
    ```

3. Modify the `src/processor.ts` file to set the data source to the RPC URL of your Tanssi network. Remove the `archive: lookupArchive` line as a Squid archive will not be used. Here, you'll need to specify the RPC URL of your Tanssi Substrate network, as the endpoint is used to ingest chain data

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

And that's all you have to do to configure your Squid project to index Substrate data on your Tanssi-powered Substrate network! Now you can update the `schema.graphql`, `src/main.ts`, `typegen.json`, and `src/processor.ts` files to index the data you need for your project!

## Index a Tanssi EVM Network {: #index-evm-networks }

To get started indexing EVM data on a Tanssi-powered EVM network, you'll need to create a Squid project and configure it for your network by taking the following steps:

1. You can create a Squid project for EVM data by using the generic [EVM template](https://github.com/subsquid-labs/squid-evm-template){target=\_blank} or you can use the [ABI template](https://github.com/subsquid-labs/squid-abi-template){target=\_blank} for indexing data related to a specific contract

    === "EVM"

        ```bash
        sqd init INSERT_SQUID_NAME --template evm
        ```

    === "ABI"

        ```bash
        sqd init INSERT_SQUID_NAME --template abi
        ```

    For more information on getting started with both of these templates, please check out the following SQD docs:

      - [Getting started: EVM chains](https://docs.sqd.dev/sdk/how-to-start/squid-development/?template-tech=evm){target=\_blank}
      - [Quickstart: Squid generation tools](https://docs.sqd.dev/sdk/resources/tools/squid-gen/){target=\_blank}

2. Navigate into the root directory of your Squid project and install dependencies by running

    ```bash
    npm ci
    ```

3. Modify the `src/processor.ts` file to set the data source to the RPC URL of your Tanssi network. Remove the `archive: lookupArchive('eth-mainnet')` line as a Squid archive will not be used. Here, the RPC URL of the demo EVM network is specified. The Squid project will use the RPC endpoint to ingest the relevant data

    ```ts
    const processor = new EvmBatchProcessor();
    processor.setDataSource({
      chain: 'INSERT_RPC_URL',
    })
    ```

    !!! note
        To try this out on the demo EVM network, you can use the following RPC URL:

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

7. You can now run queries, such as the sample query below, against your Squid on the GraphQL playground at [http://localhost:4350/graphql](http://localhost:4350/graphql){target=\_blank}. If you've modified the template Substrate squid to index different data, you'll need to modify this query accordingly

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

And that's all you have to do to configure your Squid project to index EVM data on your Tanssi-powered EVM network! Now you can update the `schema.graphql`, `src/main.ts`, and `src/processor.ts` files to index the data you need for your project!

If you're interested in a more comprehensive step-by-step tutorial to get started indexing data for your Tanssi network, you can check out the [Indexing ERC-20 Transfers on a Tanssi EVM Network](/builders/toolkit/integrations/indexers/sqd/erc20-transfers/){target=\_blank} tutorial!

--8<-- 'text/_disclaimers/third-party-content.md'
