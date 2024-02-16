---
title: Index Your Substrate AppChain with Subsquid
description: Learn how to use Subsquid, a query node framework for Substrate-based chains, to index and process Substrate data on Your Tanssi Substrate Appchain.
---

# Indexing Your Substrate Appchain with Subsquid

## Introduction {: #introduction }

[Subsquid](https://subsquid.io){target=\_blank} is a data network that allows rapid and cost-efficient retrieval of blockchain data from 100+ chains using Subsquid’s decentralized data lake and open-source SDK. In simple terms, Subsquid can be thought of as an ETL (extract, transform, and load) tool with a GraphQL server included. It enables comprehensive filtering, pagination, and even full-text search capabilities. Subsquid has native and full support for both EVM and Substrate data, even within the same project.

This quick-start guide will show you how to create a Subsquid project and configure it to index data on your Tanssi Substrate Appchain. For a more comprehensive end-to-end tutorial, be sure to check out [Using Subsquid to Index Your Appchain](/builders/tutorials/subsquid/){target=\_blank}.

## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

 - [Node.js](https://nodejs.org/en/download/){target=\_blank} version 16 or newer
 - [Docker](https://docs.docker.com/get-docker/){target=\_blank}
 - [Squid CLI](https://docs.subsquid.io/squid-cli/installation/){target=\_blank}

## Index Substrate Data on Your Appchain {: #index-substrate-data-on-your-appchain }

To get started indexing Substrate data on your Appchain, you'll need to create a Subsquid project and configure it for your Appchain by taking the following steps:

1. Create a Subsquid project based on the Substrate template by running:

    ```bash
    sqd init INSERT_SQUID_NAME --template substrate
    ```

    For more information on getting started with this template, please check out the [Quickstart: Substrate chains](https://docs.subsquid.io/quickstart/quickstart-substrate/){target=\_blank} guide on Subsquid's documentation site.

2. Navigate into the root directory of your Squid project and install dependencies by running:  

    ```bash
    npm ci
    ```


3. Modify the `src/processor.ts` file to set the data source to the RPC URL of your Appchain. Remove the `archive: lookupArchive` line as a Squid archive will not be used. Here, you'll need to specify the RPC URL of your Tanssi Substrate Appchain, as the endpoint is used to ingest chain data

    ```ts
      const processor = new EvmBatchProcessor();
      processor.setDataSource({
        chain: 'https://fraa-dancebox-rpc.a.dancebox.tanssi.network/',
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

And that's all you have to do to configure your Subsquid project to index Substrate data on your Tanssi Substrate Appchain! Now you can update the `schema.graphql`, `src/main.ts`, `typegen.json`, and `src/processor.ts` files to index the data you need for your project!

If you're interested in a more comprehensive step-by-step tutorial to get started indexing data for your Appchain, you can check out the [Using Subsquid to Index Your Appchain](/builders/tutorials/subsquid/){target=\_blank} tutorial!

--8<-- 'text/_disclaimers/third-party-content.md'
