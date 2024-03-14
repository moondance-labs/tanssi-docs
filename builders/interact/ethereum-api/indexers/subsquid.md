---
title: Index Your Tanssi EVM AppChain with Subsquid
description: Learn how to use Subsquid, a query node framework for Substrate-based chains, to index and process EVM data Your Tanssi EVM appchain.
---

# Indexing Your EVM Appchain with Subsquid

## Introduction {: #introduction }

[Subsquid](https://subsquid.io){target=\_blank} is a data network that allows rapid and cost-efficient retrieval of blockchain data from 100+ chains using Subsquid’s decentralized data lake and open-source SDK. In simple terms, Subsquid can be thought of as an ETL (extract, transform, and load) tool with a GraphQL server included. It enables comprehensive filtering, pagination, and even full-text search capabilities. Subsquid has native and full support for both EVM and Substrate data, even within the same project.

This quick-start guide will show you how to create a Subsquid project and configure it to index data on your Tanssi EVM appchain. For a more comprehensive end-to-end tutorial, be sure to check out [Using Subsquid to Index Your Tanssi appchain](/builders/tooling/indexers/subsquid/){target=\_blank}.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - [Node.js](https://nodejs.org/en/download/){target=\_blank} version 16 or newer
 - [Docker](https://docs.docker.com/get-docker/){target=\_blank}
 - [Squid CLI](https://docs.subsquid.io/squid-cli/installation/){target=\_blank}

## Index EVM Data on Your Appchain {: #index-evm-data-on-your-Appchain}

To get started indexing EVM data on your Tanssi EVM, you'll need to create a Subsquid project and configure it for your Tanssi appchain by taking the following steps:

1. You can create a Subsquid project for EVM data by using the generic [EVM template](https://github.com/subsquid-labs/squid-evm-template){target=\_blank} or you can use the [ABI template](https://github.com/subsquid-labs/squid-abi-template){target=\_blank} for indexing data related to a specific contract:

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

2. Navigate into the root directory of your Squid project and install dependencies by running: 

    ```bash
    npm ci
    ```

3. Modify the `src/processor.ts` file to set the data source to the RPC URL of your Tanssi appchain. Remove the `archive: lookupArchive('eth-mainnet')` line as a Squid archive will not be used. Here, the RPC URL of the demo EVM appchain is specified. The Squid project will use the RPC endpoint to ingest the relevant data

    ```ts
      const processor = new EvmBatchProcessor();
      processor.setDataSource({
        chain: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network',
      })
    ```

4. Launch Postgres by running:

    ```bash
    sqd up
    ```

5. Inspect and run the processor:

    ```bash
    sqd process
    ```

6. Open a separate terminal window in the same directory, then start the GraphQL server: 

    ```bash
    sqd serve
    ```

7. You can now run queries, such as the sample query below, against your Squid on the GraphQL playground at [http://localhost:4350/graphql](http://localhost:4350/graphql){target=\_blank}. If you've modified the template EVM squid to index different data, you'll need to modify this query accordingly

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

If you're interested in a more comprehensive step-by-step tutorial to get started indexing data for your Tanssi appchain, you can check out the [Using Subsquid to Index Your Tanssi appchain](/builders/tooling/indexers/subsquid/){target=\_blank} tutorial!

--8<-- 'text/_disclaimers/third-party-content.md'
