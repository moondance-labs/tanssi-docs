---
title: Index ERC-20 Transfers on an EVM Network
description: Learn how to use the Squid SDK, a query node framework that can index both Substrate and EVM data, to process blockchain data for your Tanssi-powered network.
icon: octicons-arrow-switch-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/integrations/indexers/sqd/erc20-transfers.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "8340df0a0f7ecdd08e09e3e6616645121fddc568d2b553ffdca2c7eb9a54fa46",
  "content": "--- \ntitle: Index ERC-20 Transfers on an EVM Network\ndescription: Learn how to use the Squid SDK, a query node framework that can index both Substrate and EVM data, to process blockchain data for your Tanssi-powered network.\nicon: octicons-arrow-switch-24\ncategories: EVM-Template\n---\n\n# Indexing ERC-20 Transfers on a Tanssi EVM Network\n\n## Introduction {: #introduction }\n\n[SQD](https://www.sqd.ai/){target=\\_blank} is a data network that allows rapid and cost-efficient retrieval of blockchain data from 100+ chains using SQD’s decentralized data lake and open-source SDK. In very simple terms, SQD can be thought of as an ETL (extract, transform, and load) tool with a [GraphQL](https://graphql.org){target=\\_blank} server included. It enables comprehensive filtering, pagination, and even full-text search capabilities.\n\nSQD has native and full support for both EVM and Substrate data. SQD offers a Substrate Archive and Processor and an EVM Archive and Processor. The Substrate Archive and Processor can be used to index both Substrate and EVM data. This allows developers to extract on-chain data from any Tanssi-powered network and process EVM logs as well as Substrate entities (events, extrinsics, and storage items) in one single project and serve the resulting data with one single GraphQL endpoint. If you exclusively want to index EVM data, it is recommended to use the EVM Archive and Processor.\n\nThis tutorial is a step-by-step guide to building a Squid to index EVM data from start to finish. It's recommended that you follow along, taking each step described on your own, but you can also find a [complete version of the Squid built in this tutorial in the tanssiSquid GitHub repository](https://github.com/themacexpert/tanssiSquid){target=\\_blank}.\n\n## Check Prerequisites {: #check-prerequisites }\n\nTo follow along with this tutorial, you'll need to have:\n\n- [Docker installed](https://docs.docker.com/get-started/get-docker/){target=\\_blank}\n- [Docker Compose installed](https://docs.docker.com/compose/install){target=\\_blank}\n- An empty Hardhat project. For step-by-step instructions, please refer to the [Creating a Hardhat Project](/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\\_blank} section of our Hardhat documentation page\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Deploy an ERC-20 with Hardhat {: #deploy-an-erc20-with-hardhat }\n\nBefore we can index anything with SQD we need to make sure we have something to index! This section will walk through deploying an ERC-20 token to your Tanssi-powered network so you can get started indexing it. However, you can feel free to skip to [Create a Squid Project](#create-a-squid-project) if either of the two scenarios apply:\n\n- You have already deployed an ERC-20 token to your network (and made several transfers)\n- You would prefer to use an existing ERC-20 token deployed to the demo EVM network (of which there are already several transfer events)\n\nIf you'd like to use an existing ERC-20 token on the demo EVM network, you can use the below `MyTok.sol` contract. The hashes of the token transfers are provided as well to assist with any debugging.\n\nIn this section, we'll show you how to deploy an ERC-20 to your EVM network and we'll write a quick script to fire off a series of transfers that will be picked up by our SQD indexer. Ensure that you have initialized an empty Hardhat project via the instructions in the [Creating a Hardhat Project](/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\\_blank} section of our Hardhat documentation page.\n\nBefore we dive into creating our project, let's install a couple of dependencies that we'll need: the [Hardhat Ethers plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=\\_blank} and [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts/4.x){target=\\_blank}. The Hardhat Ethers plugin provides a convenient way to use the [Ethers](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\\_blank} library to interact with the network. We'll use OpenZeppelin's base ERC-20 implementation to create an ERC-20. To install both of these dependencies, you can run:\n\n=== \"npm\"\n\n    ```bash\n    npm install @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts\n    ```\n\nNow we can edit `hardhat.config.js` to include the following network and account configurations for our network. You can replace the demo EVM network values with the respective parameters for your own Tanssi-powered EVM network which can be found at [apps.tanssi.network](https://apps.tanssi.network){target=\\_blank}.\n\n???+ code \"hardhat.config.js\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/hardhat-config.js'\n    ```\n\n!!! remember\n    You should never store your private keys in a JavaScript or Python file. It is done in this tutorial for ease of demonstration only. You should always manage your private keys with a designated secret manager or similar service.\n\n### Create an ERC-20 Contract {: #create-an-erc-20-contract }\n\nFor the purposes of this tutorial, we'll be creating a simple ERC-20 contract. We'll rely on OpenZeppelin's ERC-20 base implementation. We'll start by creating a file for the contract and naming it `MyTok.sol`:\n\n```bash\nmkdir -p contracts && touch contracts/MyTok.sol\n```\n\nNow we can edit the `MyTok.sol` file to include the following contract, which will mint an initial supply of MYTOKs and allow only the owner of the contract to mint additional tokens:\n\n???+ code \"MyTok.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/MyTok.sol'\n    ```\n\n### Deploy an ERC-20 Contract {: #deploy-erc-20-contract }\n\nNow that we have our contract set up, we can compile and deploy our contract.\n\nTo compile the contract, you can run:\n\n```bash\nnpx hardhat compile\n```\n\n![Compile contracts using Hardhat](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-1.webp)\n\nThis command will compile our contract and generate an `artifacts` directory containing the ABI of the contract.\n\nTo deploy our contract, we'll need to create a deployment script that deploys our ERC-20 contract and mints an initial supply of MYTOKs. We'll use Alith's account to deploy the contract, and we'll specify the initial supply to be 1000 MYTOK. The initial supply will be minted and sent to the contract owner, which is Alith.\n\nLet's take the following steps to deploy our contract:\n\n1.  Create a directory and file for our script:\n\n    ```bash\n    mkdir -p scripts && touch scripts/deploy.js\n    ```\n\n2.  In the `deploy.js` file, go ahead and add the following script:\n\n    ???+ code \"deploy.js\"\n\n        ```ts\n        --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/deploy.js'\n        ```\n\n3.  Run the script using the `dev` network configurations we set up in the `hardhat.config.js` file:\n\n    ```bash\n    npx hardhat run scripts/deploy.js --network demo\n    ```\n\nThe address of the deployed contract should be printed to the terminal. Save the address, as we'll need it to interact with the contract in the following section.\n\n### Transfer ERC-20s {: #transfer-erc-20s }\n\nSince we'll be indexing `Transfer` events for our ERC-20, we'll need to send a few transactions that transfer some tokens from Alith's account to our other test accounts. We'll do this by creating a simple script that transfers 10 MYTOKs to Baltathar, Charleth, Dorothy, and Ethan. We'll take the following steps:\n\nCreate a new file script to send transactions:\n\n```bash\ntouch scripts/transactions.js\n```\n\nIn the `transactions.js` file, add the following script and insert the contract address of your deployed MyTok contract (output in the console in the prior step):\n\n???+ code \"transactions.js\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/transactions.js'\n    ```\n\nRun the script to send the transactions:\n\n```bash\nnpx hardhat run scripts/transactions.js --network demo\n```\n\nAs each transaction is sent, you'll see a log printed to the terminal.\n\n![Send transactions using Hardhat](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-2.webp)\n\nNow we can move on to creating our Squid to index the data on our local development node.\n\n## Create a Squid Project {: #create-a-squid-project }\n\nNow we're going to create our Subquid project. First, we'll need to install the [Squid CLI](https://docs.sqd.ai/squid-cli/){target=\\_blank}:\n\n```bash\nnpm i -g @subsquid/cli@latest\n```\n\nTo verify successful installation, you can run:\n\n```bash\nsqd --version\n```\n\nNow we'll be able to use the `sqd` command to interact with our Squid project. To create our project, we're going to use the `--template` (`-t`) flag, which will create a project from a template. We'll be using the EVM Squid template, which is a starter project for indexing EVM chains.\n\nYou can run the following command to create an EVM Squid named `tanssi-squid`:\n\n```bash\nsqd init tanssi-squid --template evm\n```\n\nThis will create a Squid with all of the necessary dependencies. You can go ahead and install the dependencies:\n\n```bash\ncd tanssi-squid && npm ci\n```\n\nNow that we have a starting point for our project, we'll need to configure our project to index ERC-20 `Transfer` events taking place on our Tanssi network.\n\n##  Set Up the Indexer for ERC-20 Transfers {: #set-up-the-indexer-for-erc-20-transfers}\n\nIn order to index ERC-20 transfers, we'll need to take a series of actions:\n\n1.  Define the database schema and generate the entity classes\n2.  Use the `ERC20` contract's ABI to generate TypeScript interface classes\n3.  Configure the processor by specifying exactly what data to ingest\n4.  Transform the data and insert it into a TypeORM database in `main.ts`\n5.  Run the indexer and query the squid\n\nAs mentioned, we'll first need to define the database schema for the transfer data. To do so, we'll edit the `schema.graphql` file, which is located in the root directory, and create a `Transfer` entity and `Account` entity. You can copy and paste the below schema, ensuring that any existing schema is first removed.\n\n???+ code \"schema.graphql\"\n\n    ```graphql\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/schema.graphql'\n    ```\n\nNow we can generate the entity classes from the schema, which we'll use when we process the transfer data. This will create new classes for each entity in the `src/model/generated` directory.\n\n```bash\nsqd codegen\n```\n\nIn the next step, we'll use the ERC-20 ABI to automatically generate TypeScript interface classes. Below is a generic ERC-20 standard ABI. Copy and paste it into a file named `erc20.json` in the `abi` folder at the root level of the project.\n\n??? code \"ERC-20 ABI\"\n\n    ```json\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/erc20.json'\n    ```\n\nNext, we can use our contract's ABI to generate TypeScript interface classes. We can do this by running:\n\n```bash\nsqd typegen\n```\n\n![Run Squid commands](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-3.webp)\n\nThis will generate the related TypeScript interface classes in the `src/abi/erc20.ts` file. For this tutorial, we'll be accessing the `events` specifically.\n\n### Configure the Processor {: #configure-the-processor }\n\nThe `processor.ts` file tells SQD exactly what data you'd like to ingest. Transforming that data into the exact desired format will take place at a later step. In `processor.ts`, we'll need to indicate a data source, a contract address, the event(s) to index, and a block range.\n\nOpen up the `src` folder and head to the `processor.ts` file. First, we need to tell the SQD processor which contract we're interested in. Create a constant for the address in the following manner:\n\n```ts\nexport const CONTRACT_ADDRESS = 'INSERT_CONTRACT_ADDRESS'.toLowerCase();\n```\n\nThe `.toLowerCase()` is critical because the SQD processor is case-sensitive, and some block explorers format contract addresses with capitalization. Next, you'll see the line `export const processor = new EvmBatchProcessor()`, followed by `.setDataSource`. We'll need to make a few changes here. SQD has [available archives for many chains](https://docs.sqd.ai/subsquid-network/reference/networks/){target=\\_blank} that can speed up the data retrieval process, but it's unlikely your network has a hosted archive already. But not to worry, SQD can easily get the data it needs via your network's RPC URL. Go ahead and comment out or delete the archive line. Once done, your code should look similar to the below:\n\n```ts\n.setDataSource({\n  chain: {\n    url: assertNotNull(\n      '{{ networks.dancelight.demo_evm_rpc_url }}'\n    ),\n    rateLimit: 300,\n  },\n})\n```\n\nThe Squid template comes with a variable for your RPC URL defined in your `.env` file. You can replace that with the RPC URL for your network. For demonstration purposes, the RPC URL for the demo EVM network is hardcoded directly, as shown above. If you're setting the RPC URL in your `.env`, the respective line will look like this:\n\n```text\nRPC_ENDPOINT={{ networks.dancelight.demo_evm_rpc_url }}\n```\n\nNow, let's define the event that we want to index by adding the following:\n\n```ts\n.addLog({\n  address: [contractAddress],\n  topic0: [erc20.events.Transfer.topic],\n  transaction: true,\n})\n```\n\nThe `Transfer` event is defined in `erc20.ts`, which was auto-generated when `sqd typegen` was run. The import `import * as erc20 from './abi/erc20'` is already included as part of the Squid EVM template.\n\nBlock range is an important value to modify to narrow the scope of the blocks you're indexing. For example, if you launched your ERC-20 at block `650000`, there is no need to query the chain before that block for transfer events. Setting an accurate block range will improve the performance of your indexer. You can set the earliest block to begin indexing in the following manner:\n\n```ts\n.setBlockRange({from: 632400,})\n```\n\nThe chosen start block here corresponds to the relevant block to begin indexing on the demo EVM network, but you should change it to one relevant to your Tanssi-powered network and indexer project.\n\nChange the `setFields` section to specify the following data for our processor to ingest:\n\n```ts\n.setFields({\n  log: {\n    topics: true,\n    data: true,\n  },\n  transaction: {\n    hash: true,\n  },\n})\n```\n\nWe also need to add the following imports to our `processor.ts` file:\n\n```ts\nimport { Store } from '@subsquid/typeorm-store';\nimport * as erc20 from './abi/erc20';\n```\n\nOnce you've completed the prior steps, your `processor.ts` file should look similar to this:\n\n???+ code \"processor.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/processor.ts'\n    ```\n\n### Transform and Save the Data {: #transform-and-save-the-data }\n\nWhile `processor.ts` determines the data being consumed, `main.ts` determines the bulk of actions related to processing and transforming that data. In the simplest terms, we are processing the data that was ingested via the SQD processor and inserting the desired pieces into a TypeORM database. For more detailed information on how SQD works, be sure to check out the [SQD docs on Developing a Squid](https://docs.sqd.ai/sdk/how-to-start/squid-development/){target=\\_blank}.\n\nOur `main.ts` file is going to scan through each processed block for the `Transfer` event and decode the transfer details, including the sender, receiver, and amount. The script also fetches account details for involved addresses and creates transfer objects with the extracted data. The script then inserts these records into a TypeORM database, enabling them to be easily queried. Let's break down the code that comprises `main.ts` in order:\n\n1.  The job of `main.ts` is to run the processor and refine the collected data. In `processor.run`, the processor will iterate through all selected blocks and look for `Transfer` event logs. Whenever it finds a `Transfer` event, it's going to store it in an array of transfer events where it awaits further processing\n2.  The `transferEvent` interface is the type of structure that stores the data extracted from the event logs\n3.  `getTransfer` is a helper function that extracts and decodes ERC-20 `Transfer` event data from a log entry. It constructs and returns a `TransferEvent` object, which includes details such as the transaction ID, block number, sender and receiver addresses, and the amount transferred. `getTransfer` is called at the time of storing the relevant transfer events into the array of transfers\n4.  `processTransfers` enriches the transfer data and then inserts these records into a TypeORM database using the `ctx.store` methods. The account model, while not strictly necessary, allows us to introduce another entity in the schema to demonstrate working with multiple entities in your Squid\n5.  `getAccount` is a helper function that manages the retrieval and creation of account objects. Given an account ID and a map of existing accounts, it returns the corresponding account object. If the account doesn't exist in the map, it creates a new one, adds it to the map, and then returns it\n\nWe'll demo a sample query in a later section. You can copy and paste the below code into your `main.ts` file:\n\n???+ code \"main.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/main.ts'\n    ```\n\nNow we've taken all of the steps necessary and are ready to run our indexer!\n\n### Run the Indexer {: #run-the-indexer }\n\nTo run our indexer, we're going to run a series of `sqd` commands:\n\nBuild our project:\n\n   ```bash\n   sqd build\n   ```\n\nLaunch the database:\n\n   ```bash\n   sqd up\n   ```\n\nRemove the database migration file that comes with the EVM template and generate a new one for our new database schema:\n\n   ```bash\n   sqd migration:generate\n   ```\n\n   ```bash\n   sqd migration:apply\n   ```\n\nLaunch the processor:\n\n   ```bash\n   sqd process\n   ```\n\nIn your terminal, you should see your indexer starting to process blocks!\n\n![Get Squid running](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-4.webp)\n\n## Query Your Squid {: #query-your-squid }\n\nTo query your squid, open up a new terminal window within your project and run the following command:\n\n```bash\nsqd serve\n```\n\nAnd that's it! You can now run queries against your Squid on the GraphQL playground at `http://localhost:4350/graphql`. Try crafting your own GraphQL query, or use the below one:\n\n???+ code \"Example query\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sample-query.graphql'\n    ```\n\n![Running queries in GraphQL playground](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-5.webp)\n\n## Debug Your Squid {: #debug-your-squid }\n\nIt may seem tricky at first to debug errors when building your Squid, but fortunately, there are several techniques you can use to streamline this process. First and foremost, if you're facing errors with your Squid, you should enable debug mode in your `.env` file by uncommenting the debug mode line. This will trigger much more verbose logging and will help you locate the source of the error.\n\n```text\n# Uncommenting the below line enables debug mode\nSQD_DEBUG=*\n```\n\nYou can also add logging statements directly to your `main.ts` file to indicate specific parameters like block height and more. For example, see this version of `main.ts`, which has been enhanced with detailed logging:\n\n??? code \"main.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/main-with-logging.ts'\n    ```\n\nSee the [SQD guide to logging](https://docs.sqd.ai/sdk/reference/logger/){target=\\_blank} for more information on debug mode.\n\n### Common Errors {: #common-errors }\n\nBelow are some common errors you may face when building a project and how you can solve them.\n\n```text\nError response from daemon: driver failed programming external connectivity on endpoint my-awesome-squid-db-1\n(49df671a7b0531abbb5dc5d2a4a3f5dc7e7505af89bf0ad1e5480bd1cdc61052):\nBind for 0.0.0.0:23798 failed: port is already allocated\n```\n\nThis error indicates that you have another instance of SQD running somewhere else. You can stop that gracefully with the command `sqd down` or by pressing the **Stop** button next to the container in Docker Desktop.\n\n```text\nError: connect ECONNREFUSED 127.0.0.1:23798\n     at createConnectionError (node:net:1634:14)\n     at afterConnectMultiple (node:net:1664:40) {errno: -61,code: 'ECONNREFUSED',syscall: 'connect',\n     address: '127.0.0.1',port: 23798}\n```\n\nTo resolve this, run `sqd up` before you run `sqd migration:generate`\n\nIs your Squid error-free, yet you aren't seeing any transfers detected? Make sure your log events are consistent and identical to the ones your processor is looking for. Your contract address also needs to be lowercase, which you can be assured of by defining it as follows:\n\n```ts\nexport const contractAddress = '0x37822de108AFFdd5cDCFDaAa2E32756Da284DB85'.toLowerCase();\n```\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Indexar Transferências ERC-20 em uma Rede EVM\ndescription: Aprenda como usar o Squid SDK, uma estrutura de nó de consulta que pode indexar dados Substrate e EVM, para processar dados de blockchain para sua rede com tecnologia Tanssi.\nicon: octicons-arrow-switch-24\ncategories: EVM-Template\n---\n\n# Indexando Transferências ERC-20 em uma Rede EVM Tanssi\n\n## Introdução {: #introduction }\n\n[SQD](https://www.sqd.ai/){target=\\_blank} é uma rede de dados que permite a recuperação rápida e eficiente de dados de blockchain de mais de 100 cadeias usando o data lake descentralizado da SQD e o SDK de código aberto. Em termos muito simples, o SQD pode ser pensado como uma ferramenta ETL (extrair, transformar e carregar) com um servidor [GraphQL](https://graphql.org){target=\\_blank} incluído. Ele permite filtragem abrangente, paginação e até mesmo recursos de pesquisa de texto completo.\n\nA SQD tem suporte nativo e completo para dados EVM e Substrate. A SQD oferece um Arquivo e Processador Substrate e um Arquivo e Processador EVM. O Arquivo e Processador Substrate pode ser usado para indexar dados Substrate e EVM. Isso permite que os desenvolvedores extraiam dados on-chain de qualquer rede com tecnologia Tanssi e processem logs EVM, bem como entidades Substrate (eventos, extrínsecos e itens de armazenamento) em um único projeto e sirvam os dados resultantes com um único endpoint GraphQL. Se você deseja indexar exclusivamente dados EVM, é recomendável usar o Arquivo e Processador EVM.\n\nEste tutorial é um guia passo a passo para construir um Squid para indexar dados EVM do início ao fim. É recomendável que você acompanhe, seguindo cada etapa descrita por conta própria, mas você também pode encontrar uma [versão completa do Squid construída neste tutorial no repositório GitHub do tanssiSquid](https://github.com/themacexpert/tanssiSquid){target=\\_blank}.\n\n## Verificar Pré-requisitos {: #check-prerequisites }\n\nPara acompanhar este tutorial, você precisará ter:\n\n- [Docker instalado](https://docs.docker.com/get-started/get-docker/){target=\\_blank}\n- [Docker Compose instalado](https://docs.docker.com/compose/install){target=\\_blank}\n- Um projeto Hardhat vazio. Para obter instruções passo a passo, consulte a seção [Criando um Projeto Hardhat](/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\\_blank} da nossa página de documentação do Hardhat\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Implantar um ERC-20 com Hardhat {: #deploy-an-erc20-with-hardhat }\n\nAntes de podermos indexar qualquer coisa com a SQD, precisamos ter certeza de que temos algo para indexar! Esta seção mostrará como implantar um token ERC-20 em sua rede com tecnologia Tanssi para que você possa começar a indexá-lo. No entanto, sinta-se à vontade para pular para [Criar um Projeto Squid](#create-a-squid-project) se alguma das duas situações se aplicar:\n\n- Você já implantou um token ERC-20 em sua rede (e fez várias transferências)\n- Você prefere usar um token ERC-20 existente implantado na rede de demonstração EVM (da qual já existem vários eventos de transferência)\n\nSe você deseja usar um token ERC-20 existente na rede de demonstração EVM, pode usar o contrato `MyTok.sol` abaixo. Os hashes das transferências de tokens também são fornecidos para ajudar na depuração.\n\nNesta seção, mostraremos como implantar um ERC-20 em sua rede EVM e escreveremos um script rápido para disparar uma série de transferências que serão captadas pelo nosso indexador SQD. Certifique-se de ter inicializado um projeto Hardhat vazio por meio das instruções na seção [Criando um Projeto Hardhat](/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\\_blank} da nossa página de documentação do Hardhat.\n\nAntes de mergulharmos na criação do nosso projeto, vamos instalar algumas dependências que precisaremos: o [plugin Hardhat Ethers](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=\\_blank} e os [contratos OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x){target=\\_blank}. O plugin Hardhat Ethers fornece uma maneira conveniente de usar a biblioteca [Ethers](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\\_blank} para interagir com a rede. Usaremos a implementação base do ERC-20 da OpenZeppelin para criar um ERC-20. Para instalar ambas as dependências, você pode executar:\n\n=== \"npm\"\n\n    ```bash\n    npm install @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts\n    ```\n\nAgora podemos editar `hardhat.config.js` para incluir as seguintes configurações de rede e conta para nossa rede. Você pode substituir os valores da rede EVM de demonstração pelos parâmetros respectivos para sua própria rede EVM com tecnologia Tanssi, que podem ser encontrados em [apps.tanssi.network](https://apps.tanssi.network){target=\\_blank}.\n\n???+ code \"hardhat.config.js\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/hardhat-config.js'\n    ```\n\n!!! remember\n    Você nunca deve armazenar suas chaves privadas em um arquivo JavaScript ou Python. Ele é feito neste tutorial apenas para facilitar a demonstração. Você sempre deve gerenciar suas chaves privadas com um gerenciador de segredos designado ou serviço semelhante.\n\n### Criar um Contrato ERC-20 {: #create-an-erc-20-contract }\n\nPara os fins deste tutorial, criaremos um contrato ERC-20 simples. Confiaremos na implementação base do ERC-20 da OpenZeppelin. Começaremos criando um arquivo para o contrato e nomeando-o `MyTok.sol`:\n\n```bash\nmkdir -p contracts && touch contracts/MyTok.sol\n```\n\nAgora podemos editar o arquivo `MyTok.sol` para incluir o seguinte contrato, que cunhará um fornecimento inicial de MYTOKs e permitirá apenas ao proprietário do contrato cunhar tokens adicionais:\n\n???+ code \"MyTok.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/MyTok.sol'\n    ```\n\n### Implantar um Contrato ERC-20 {: #deploy-erc-20-contract }\n\nAgora que temos nosso contrato configurado, podemos compilar e implantar nosso contrato.\n\nPara compilar o contrato, você pode executar:\n\n```bash\nnpx hardhat compile\n```\n\n![Compilar contratos usando Hardhat](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-1.webp)\n\nEste comando compilará nosso contrato e gerará um diretório `artifacts` contendo o ABI do contrato.\n\nPara implantar nosso contrato, precisaremos criar um script de implantação que implante nosso contrato ERC-20 e cunhe um suprimento inicial de MYTOKs. Usaremos a conta de Alith para implantar o contrato e especificaremos o fornecimento inicial como 1000 MYTOK. O fornecimento inicial será cunhado e enviado ao proprietário do contrato, que é Alith.\n\nVamos seguir as seguintes etapas para implantar nosso contrato:\n\n1. Crie um diretório e um arquivo para nosso script:\n\n    ```bash\n    mkdir -p scripts && touch scripts/deploy.js\n    ```\n\n2. No arquivo `deploy.js`, vá em frente e adicione o seguinte script:\n\n    ???+ code \"deploy.js\"\n\n        ```ts\n        --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/deploy.js'\n        ```\n\n3. Execute o script usando as




























    ```bash

    ```



    ```bash

    ```





    ```js

    ```








```bash

```

````

```solidity

```

    ```solidity

    ```


````
```bash

```
```bash

```


    ```ts

    ```



```bash

```
    ```bash

    ```


````

```ts
```


```bash


    ```


```bash

```

```bash


```


````
```graphql

    ```ts
```


```bash


```

```json

```

````

```bash

```

```ts

```bash

```



```bash

```



```text
```bash

```
```ts


```bash

```


```ts

```

```ts









```

    ```graphql
```ts

    ```


```bash

```ts
```





    ```json

    ```



```bash

```




```ts

```

````

```bash

```ts

```


```ts

```

```bash

```

```bash
```


```bash
```text

```
````

```ts

````

```text


```

````
```ts

```
```ts

```




```ts





```

```ts

```



```ts


```





    ```ts

    ```

















    ```ts

    ```









   ```bash

   ```



   ```bash

   ```



   ```bash

   ```

   ```bash

   ```



   ```bash

   ```









```bash

```





    ```ts

    ```







```text


```





    ```ts

    ```







```text



```



```text





```





```ts

```
