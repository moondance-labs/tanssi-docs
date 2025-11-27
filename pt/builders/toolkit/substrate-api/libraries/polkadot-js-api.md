---
title: How to use the Polkadot.js API
description: Learn how to use the Polkadot.js API to interact with a Tanssi-powered network to get chain data and send transactions (extrinsics) via the Substrate API.
icon: octicons-code-24
categories: Substrate-Template
---

````json
{
  "source_path": "builders/toolkit/substrate-api/libraries/polkadot-js-api.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "7629526c70ae50b3d0a38c67ca11d0981233999e70387dfd4cb426df59cd7113",
  "content": "--- \ntitle: How to use the Polkadot.js API\ndescription: Learn how to use the Polkadot.js API to interact with a Tanssi-powered network to get chain data and send transactions (extrinsics) via the Substrate API.\nicon: octicons-code-24\ncategories: Substrate-Template\n---\n\n# Polkadot.js API Library\n\n## Introduction {: #introduction }\n\n[Polkadot.js](https://wiki.polkadot.com/general/polkadotjs/){target=\\_blank} is a collection of tools that allow you to interact with Substrate-based blockchains, such as your Tanssi-powered network! The [Polkadot.js API](https://polkadot.js.org/docs/api){target=\\_blank} is one component of Polkadot.js and is a library that allows application developers to query a network and interact with the node's Substrate interfaces using JavaScript, enabling you to read and write data to the network.\n\nYou can use the Polkadot.js API to query on-chain data and send transactions from the Substrate side of your Tanssi network. You can query runtime constants, chain state, events, transaction (extrinsic) data, and more.\n\nHere you will find an overview of the available functionalities and some commonly used [TypeScript](https://www.typescriptlang.org){target=\\_blank} code examples to get you started on interacting with your Tanssi network using the Polkadot.js API library.\n\n!!! note \"Editor’s Note (2025 Update)\"\n    Polkadot.js is the name of a developer toolset created for interacting with Substrate-based blockchains. While the name references Polkadot, the library itself is chain-agnostic and works with any Substrate-based network, including Tanssi.\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Install Polkadot.js API {: #installing-polkadot.js-api-library }\n\nFirst, you need to install the Polkadot.js API library and the RLP library through a package manager such as `yarn`. Both dependencies are required to run the examples in this guide successfully.\n\nInstall them in your project directory with the following command:\n\n=== \"npm\"\n\n    ```bash\n    npm i @polkadot/api\n    npm i @polkadot/util-rlp\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add @polkadot/api\n    yarn add @polkadot/util-rlp\n    ```\n\nThe library also includes other core components, like Keyring for account management or some utilities that are used throughout this guide.\n\n## Create an API Provider Instance {: #creating-an-API-provider-instance }\n\nTo start interacting with your Tanssi network using the Polkadot.js API, you first need to create an instance of the Polkadot.js API. Create the `WsProvider` using the WebSocket endpoint of your Tanssi network.\n\n```typescript\n// Import\nimport { ApiPromise, WsProvider } from '@polkadot/api';\n\nconst main = async () => {\n  // Construct API provider\n  const wsProvider = new WsProvider('INSERT_NETWORK_WSS_ENDPOINT');\n  const api = await ApiPromise.create({ provider: wsProvider });\n\n  // Code goes here\n\n  await api.disconnect();\n};\n\nmain();\n```\n\n### Metadata and Dynamic API Decoration {: #metadata-and-dynamic-api-decoration }\n\nBefore diving into the details of performing different tasks via the Polkadot.js API library, it's useful to understand some of the basic workings of the library.\n\nWhen the Polkadot.js API connects to a node, one of the first things it does is retrieve the metadata and decorate the API based on the metadata information. The metadata effectively provides data in the form of:\n\n```text\napi.<type>.<module>.<section>\n```\n\nWhere `<type>` can be either:\n\n- `query` - for endpoints to read all the state queries\n- `tx` - for endpoints related to transactions\n- `rpc` - for endpoints specific to RPC calls\n- `consts` - for endpoints specific to runtime constants\n\nAnd therefore, none of the information contained in the `api.{query, tx, rpc, consts}.<module>.<method>` endpoints are hard-coded in the API. This allows the Polkadot.js API library to be modular and adapt to any Substrate-based chains with different [modules](/learn/framework/modules/){target=\\_blank}, like your Tanssi network!\n\n## Query On-Chain Data {: #querying-for-information }\n\nIn this section, you will learn how to query for on-chain information using the Polkadot.js API library.\n\n### Chain State Queries {: #state-queries }\n\nThis category of queries retrieves information related to the current state of the chain. These endpoints are generally of the form `api.query.<module>.<method>`, where the module and method decorations are generated through metadata. You can see a list of all available endpoints by examining the `api.query` object, for example via:\n\n```typescript\nconsole.log(api.query);\n```\n\nFor example, assuming you've [initialized the API](#creating-an-API-provider-instance), you can retrieve basic account information with the following snippet:\n\n```typescript\n// Define wallet address\nconst addr = 'INSERT_ADDRESS';\n\n// Retrieve the last timestamp\nconst now = await api.query.timestamp.now();\n\n// Retrieve the account balance & current nonce via the system module\nconst { nonce, data: balance } = await api.query.system.account(addr);\n\nconsole.log(\n  `${now}: balance of ${balance.free} and a current nonce of ${nonce}`\n);\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/state-queries.ts'\n    ```\n\n### RPC Queries {: #rpc-queries }\n\nThe RPC calls provide the backbone for the transmission of data to and from the node. This means that all API endpoints such as `api.query`, `api.tx` or `api.derive` just wrap RPC calls, providing information in the encoded format as expected by the node. You can see a list of all available endpoints by examining the `api.rpc` object, for example, via:\n\n```typescript\nconsole.log(api.rpc);\n```\n\nThe `api.rpc` interface follows the a similar format to `api.query`. For instance, assuming you've [initialized the API](#creating-an-API-provider-instance), you can get chain data and latest header with the following snippet:\n\n```typescript\n// Retrieve the chain name\nconst chain = await api.rpc.system.chain();\n\n// Retrieve the latest header\nconst lastHeader = await api.rpc.chain.getHeader();\n\n// Log the information\nconsole.log(\n  `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`\n);\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/rpc-queries.ts'\n    ```\n\n### Query Subscriptions {: #query-subscriptions }\n\nThe `rpc` API also provides endpoints for subscriptions. Assuming you've [initialized the API](#creating-an-API-provider-instance), you can adapt the previous example to start using subscriptions to listen to new blocks.\n\n```typescript\n// Retrieve the chain name\nconst chain = await api.rpc.system.chain();\n\n// Subscribe to the new headers\nawait api.rpc.chain.subscribeNewHeads((lastHeader) => {\n  console.log(\n    `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`\n  );\n});\n```\n\nThe general pattern for `api.rpc.subscribe*` functions is to pass a callback into the subscription function, and this will be triggered on each new entry as they are imported.\n\nOther calls under `api.query.*` can be modified in a similar fashion to use subscription by providing a callback function, including calls that have parameters. Here is an example of how to subscribe to balance changes in an account:\n\n```typescript\n// Define wallet address\nconst addr = 'INSERT_ADDRESS';\n\n// Subscribe to balance changes for a specified account\nawait api.query.system.account(addr, ({ nonce, data: balance }) => {\n  console.log(\n    `Free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`\n  );\n});\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/query-subscriptions.ts'\n    ```\n\n## Create a Keyring for an Account {: #keyrings }\n\nThe Keyring object is used for maintaining key pairs, and the signing of any data, whether it's a transfer, a message, or a contract interaction.  \n\n### Create a Keyring Instance {: #creating-a-keyring-instance }\n\nYou can create an instance by just creating an instance of the Keyring class and specifying the default type of wallet address used. The default wallet type is `SR25519`, but for Tanssi EVM-compatible networks, the wallet type should be `ethereum`.\n\n```typescript\n// Import the keyring as required\nimport Keyring from '@polkadot/keyring';\n\n// Create a keyring instance (ECDSA)\nconst keyringECDSA = new Keyring({ type: 'ethereum' });\n\n// Create a keyring instance (SR25519)\nconst keyring = new Keyring({ type: 'sr25519' });\n```\n\n### Add an Account to a Keyring {: #adding-accounts }\n\nThere are a number of ways to add an account to the keyring instance, including from the mnemonic phrase and the short-form private key. The following sample code will provide some examples:\n\n=== \"From Mnemonic (ECDSA)\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-ecdsa.ts'\n    ```\n\n=== \"From Private Key (ECDSA)\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-private-key-ecdsa.ts'\n    ```\n\n=== \"From Mnemonic (SR25519)\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-sr25519.ts'\n    ```\n\n## Sending Transactions  {: #transactions }\n\nTransaction endpoints are exposed on endpoints generally of the form `api.tx.<module>.<method>`, where the module and method decorations are generated through metadata. These allow you to submit transactions for inclusion in blocks, be they transfers, interactions with pallets, or anything else Moonbeam supports. You can see a list of all available endpoints by examining the `api.tx` object, for example, via:\n\n```typescript\nconsole.log(api.tx);\n```\n\n### Send a Basic Transaction {: #sending-basic-transactions }\n\nThe Polkadot.js API library can be used to send transactions to the network. For example, assuming you've [initialized the API](#creating-an-API-provider-instance) and a [keyring instance](#creating-a-keyring-instance), you can use the following snippet to send a basic transaction (this code sample will also retrieve the encoded calldata of the transaction as well as the transaction hash after submitting):\n\n```typescript\n// Initialize wallet key pairs\nconst alice = keyring.addFromUri('INSERT_ALICES_PRIVATE_KEY');\n\n// Form the transaction\nconst tx = await api.tx.balances.transferAllowDeath(\n  'INSERT_BOBS_ADDRESS',\n  BigInt(INSERT_VALUE)\n);\n\n// Retrieve the encoded calldata of the transaction\nconst encodedCallData = tx.method.toHex()\nconsole.log(`Encoded calldata: ${encodedCallData}`);\n\n// Sign and send the transaction\nconst txHash = await tx.signAndSend(alice);\n\n// Show the transaction hash\nconsole.log(`Submitted with hash ${txHash}`);\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/basic-transactions.ts'\n    ```\n\nNote that the `signAndSend` function can also accept optional parameters, such as the `nonce`. For example, `signAndSend(alice, { nonce: aliceNonce })`. You can use the [sample code from the State Queries](#state-queries){target=\\_blank} section to retrieve the correct nonce, including transactions in the mempool.\n\n### Fee Information {: #fees}\n\nThe transaction endpoint also offers a method to obtain weight information for a given `api.tx.<module>.<method>`. To do so, you'll need to use the `paymentInfo` function after having built the entire transaction with the specific `module` and `method`.\n\nThe `paymentInfo` function returns weight information in terms of `refTime` and `proofSize`, which can be used to determine the transaction fee. This is extremely helpful when crafting remote execution calls via XCM.\n\nFor example, assuming you've [initialized the API](#creating-an-API-provider-instance), the following snippet shows how you can get the weight info for a simple balance transfer between two accounts:\n\n```typescript\n// Transaction to get weight information\nconst tx = api.tx.balances.transferAllowDeath('INSERT_BOBS_ADDRESS', BigInt(INSERT_VALUE));\n\n// Get weight info\nconst { partialFee, weight } = await tx.paymentInfo('INSERT_SENDERS_ADDRESS');\n\nconsole.log(`Transaction weight: ${weight}`);\nconsole.log(`Transaction fee: ${partialFee.toHuman()}`);\n```\n\n??? code \"View the complete script\"\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/payment-info.ts'\n    ```\n\n\n### Transaction Events {: #transaction-events }\n\nAny transaction will emit events; at a bare minimum, this will always be a `system.ExtrinsicSuccess` or `system.ExtrinsicFailed` event for the specific transaction. These provide the overall execution result for the transaction, that is, whether the execution has succeeded or failed.\n\nDepending on the transaction sent, some other events may be emitted; for instance, for a balance transfer event, this could include one or more `balance.Transfer` events.\n\n### Batch Transactions {: #batching-transactions }\n\nThe Polkadot.js API allows transactions to be batch processed via the `api.tx.utility.batch` method. The batched transactions are processed sequentially from a single sender. The transaction fee can be estimated using the `paymentInfo` helper method.\n\nFor example, assuming you've [initialized the API](#creating-an-API-provider-instance), a [keyring instance](#creating-a-keyring-instance) and [added an account](#adding-accounts), the following example makes a couple of transfers in one transaction:\n\n```typescript\n// Construct a list of transactions to batch\nconst txs = [\n  api.tx.balances.transferAllowDeath('INSERT_BOBS_ADDRESS', BigInt(INSERT_VALUE)),\n  api.tx.balances.transferAllowDeath('INSERT_CHARLEYS_ADDRESS', BigInt(INSERT_VALUE)),\n];\n\n// Estimate the fees as RuntimeDispatchInfo, using the signer (either\n// address or locked/unlocked keypair) \nconst info = await api.tx.utility\n  .batch(txs)\n  .paymentInfo(alice);\n\nconsole.log(`Estimated fees: ${info}`);\n\n// Construct the batch and send the transactions\nawait api.tx.utility\n  .batch(txs)\n  .signAndSend(alice, ({ status }) => {\n    if (status.isInBlock) {\n      console.log(`included in ${status.asInBlock}`);\n\n      // Disconnect API here!\n    }\n  });\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/batch-transactions.ts'\n    ```\n\n## Sample Code for Monitoring Native Token Transfers { #sample-code-for-monitoring-native-token-transfers }\n\nThe following code samples will demonstrate how to listen to both types of native token transfers, sent via Substrate or Ethereum API, using either the [Polkadot.js API library](https://polkadot.js.org/docs/api/start){target=\\_blank} or [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar){target=\\_blank}. The following code snippets are for demo purposes only and should not be used without modification and further testing in a production environment.\n\nThe following code snippet uses [`subscribeFinalizedHeads`](https://polkadot.js.org/docs/substrate/rpc/#subscribefinalizedheads-header){target=\\_blank} to subscribe to new finalized block headers, and loops through extrinsics fetched from the block, and retrieves the events of each extrinsic.\n\nThen, it checks if any event corresponds to a `balances.Transfer` event. If so, it will extract the `from`, `to`, `amount`, and the `tx hash` of the transfer and display it on the console. Note that the `amount` is shown in the smallest unit (Wei).  You can find all the available information about Polkadot.js and the Substrate JSON RPC in their [official documentation site](https://polkadot.js.org/docs/substrate/rpc){target=\\_blank}.\n\n```typescript\n--8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/balance-event.ts'\n```\n\nIn addition, you can find more sample code snippets related to more specific cases around balance transfers at this [GitHub page](https://gist.github.com/crystalin/b2ce44a208af60d62b5ecd1bad513bce){target=\\_blank}.\n\n## Utility Functions {: #utilities }\n\nThe Polkadot.js API also includes a number of utility libraries for computing commonly used cryptographic primitives and hash functions.\n\nThe following example computes the deterministic transaction hash of a raw Ethereum legacy transaction by first computing its RLP ([Recursive Length Prefix](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/){target=\\_blank}) encoding and then hashing the result with keccak256.\n\n```typescript\nimport { encode } from '@polkadot/util-rlp';\nimport { keccakAsHex } from '@polkadot/util-crypto';\nimport { numberToHex } from '@polkadot/util';\n\n// Set the key type to string\ntype txType = {\n  [key: string]: any;\n};\n\n// Define the raw signed transaction\nconst txData: txType = {\n  nonce: numberToHex(1),\n  gasPrice: numberToHex(21000000000),\n  gasLimit: numberToHex(21000),\n  to: '0xc390cC49a32736a58733Cf46bE42f734dD4f53cb',\n  value: numberToHex(1000000000000000000),\n  data: '',\n  v: '0507',\n  r: '0x5ab2f48bdc6752191440ce62088b9e42f20215ee4305403579aa2e1eba615ce8',\n  s: '0x3b172e53874422756d48b449438407e5478c985680d4aaa39d762fe0d1a11683',\n};\n\n// Extract the values to an array\nvar txDataArray = Object.keys(txData).map(function (key) {\n  return txData[key];\n});\n\n// Calculate the RLP encoded transaction\nvar encoded_tx = encode(txDataArray);\n\n// Hash the encoded transaction using keccak256\nconsole.log(keccakAsHex(encoded_tx));\n```\n\nYou can check the respective [NPM repository page](https://www.npmjs.com/package/@polkadot/util-crypto){target=\\_blank} for a list of available methods in the `@polkadot/util-crypto` library and their descriptions.\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Como usar a API Polkadot.js\ndescription: Aprenda a usar a API Polkadot.js para interagir com uma rede Tanssi e obter dados da cadeia e enviar transações (extrínsecas) via API Substrate.\nicon: octicons-code-24\ncategories: Substrate-Template\n---\n\n# Biblioteca da API Polkadot.js\n\n## Introdução {: #introduction }\n\n[Polkadot.js](https://wiki.polkadot.com/general/polkadotjs/){target=\\_blank} é uma coleção de ferramentas que permitem interagir com blockchains baseadas em Substrate, como sua rede Tanssi! A [API Polkadot.js](https://polkadot.js.org/docs/api){target=\\_blank} é um componente do Polkadot.js e é uma biblioteca que permite aos desenvolvedores de aplicativos fazer consultas a uma rede e interagir com as interfaces Substrate do nó usando JavaScript, permitindo ler e gravar dados na rede.\n\nVocê pode usar a API Polkadot.js para consultar dados na cadeia e enviar transações do lado Substrate da sua rede Tanssi. Você pode consultar constantes de tempo de execução, estado da cadeia, eventos, dados de transação (extrínsecos) e muito mais.\n\nAqui você encontrará uma visão geral das funcionalidades disponíveis e alguns exemplos de código [TypeScript](https://www.typescriptlang.org){target=\\_blank} comumente usados para você começar a interagir com sua rede Tanssi usando a biblioteca da API Polkadot.js.\n\n!!! note \"Observação do editor (atualização de 2025)\"\n    Polkadot.js é o nome de um conjunto de ferramentas para desenvolvedores criado para interagir com blockchains baseadas em Substrate. Embora o nome faça referência a Polkadot, a própria biblioteca é agnóstica em relação à cadeia e funciona com qualquer rede baseada em Substrate, incluindo Tanssi.\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Instalar a Biblioteca da API Polkadot.js {: #installing-polkadot.js-api-library }\n\nPrimeiro, você precisa instalar a biblioteca da API Polkadot.js e a biblioteca RLP por meio de um gerenciador de pacotes como `yarn`. Ambas as dependências são necessárias para executar os exemplos neste guia com sucesso.\n\nInstale-as no diretório do seu projeto com o seguinte comando:\n\n=== \"npm\"\n\n    ```bash\n    npm i @polkadot/api\n    npm i @polkadot/util-rlp\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add @polkadot/api\n    yarn add @polkadot/util-rlp\n    ```\n\nA biblioteca também inclui outros componentes principais, como Keyring para gerenciamento de contas ou algumas utilidades que são usadas ao longo deste guia.\n\n## Criar uma Instância do Provedor de API {: #creating-an-API-provider-instance }\n\nPara começar a interagir com sua rede Tanssi usando a API Polkadot.js, você primeiro precisa criar uma instância da API Polkadot.js. Crie o `WsProvider` usando o endpoint WebSocket da sua rede Tanssi.\n\n```typescript\n// Import\nimport { ApiPromise, WsProvider } from '@polkadot/api';\n\nconst main = async () => {\n  // Construct API provider\n  const wsProvider = new WsProvider('INSERT_NETWORK_WSS_ENDPOINT');\n  const api = await ApiPromise.create({ provider: wsProvider });\n\n  // Code goes here\n\n  await api.disconnect();\n};\n\nmain();\n```\n\n### Metadados e Decoração de API Dinâmica {: #metadata-and-dynamic-api-decoration }\n\nAntes de mergulhar nos detalhes da realização de diferentes tarefas por meio da biblioteca da API Polkadot.js, é útil entender alguns dos funcionamentos básicos da biblioteca.\n\nQuando a API Polkadot.js se conecta a um nó, uma das primeiras coisas que ele faz é recuperar os metadados e decorar a API com base nas informações dos metadados. Os metadados fornecem dados efetivamente na forma de:\n\n```text\napi.<type>.<module>.<section>\n```\n\nOnde `<type>` pode ser:\n\n- `query` - para endpoints para ler todas as consultas de estado\n- `tx` - para endpoints relacionados a transações\n- `rpc` - para endpoints específicos para chamadas RPC\n- `consts` - para endpoints específicos para constantes de tempo de execução\n\nE, portanto, nenhuma das informações contidas nos endpoints `api.{query, tx, rpc, consts}.<module>.<method>` é codificada na API. Isso permite que a biblioteca da API Polkadot.js seja modular e se adapte a qualquer cadeia baseada em Substrate com diferentes [módulos](/learn/framework/modules/){target=\\_blank}, como sua rede Tanssi!\n\n## Consultar Dados na Cadeia {: #querying-for-information }\n\nNesta seção, você aprenderá como consultar informações na cadeia usando a biblioteca da API Polkadot.js.\n\n### Consultas de Estado da Cadeia {: #state-queries }\n\nEsta categoria de consultas recupera informações relacionadas ao estado atual da cadeia. Esses endpoints geralmente têm o formato `api.query.<module>.<method>`, onde as decorações do módulo e do método são geradas por meio de metadados. Você pode ver uma lista de todos os endpoints disponíveis examinando o objeto `api.query`, por exemplo, via:\n\n```typescript\nconsole.log(api.query);\n```\n\nPor exemplo, assumindo que você [inicializou a API](#creating-an-API-provider-instance), você pode recuperar informações básicas da conta com o seguinte trecho:\n\n```typescript\n// Define wallet address\nconst addr = 'INSERT_ADDRESS';\n\n// Retrieve the last timestamp\nconst now = await api.query.timestamp.now();\n\n// Retrieve the account balance & current nonce via the system module\nconst { nonce, data: balance } = await api.query.system.account(addr);\n\nconsole.log(\n  `${now}: balance of ${balance.free} and a current nonce of ${nonce}`\n);\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/state-queries.ts'\n    ```\n\n### Consultas RPC {: #rpc-queries }\n\nAs chamadas RPC fornecem a base para a transmissão de dados de e para o nó. Isso significa que todos os endpoints da API, como `api.query`, `api.tx` ou `api.derive`, apenas embrulham chamadas RPC, fornecendo informações no formato codificado conforme o esperado pelo nó. Você pode ver uma lista de todos os endpoints disponíveis examinando o objeto `api.rpc`, por exemplo, via:\n\n```typescript\nconsole.log(api.rpc);\n```\n\nA interface `api.rpc` segue um formato semelhante ao `api.query`. Por exemplo, assumindo que você [inicializou a API](#creating-an-API-provider-instance), você pode obter dados da cadeia e o último cabeçalho com o seguinte trecho:\n\n```typescript\n// Retrieve the chain name\nconst chain = await api.rpc.system.chain();\n\n// Retrieve the latest header\nconst lastHeader = await api.rpc.chain.getHeader();\n\n// Log the information\nconsole.log(\n  `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`\n);\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/rpc-queries.ts'\n    ```\n\n### Assinaturas de Consulta {: #query-subscriptions }\n\nA API `rpc` também fornece endpoints para assinaturas. Assumindo que você [inicializou a API](#creating-an-API-provider-instance), você pode adaptar o exemplo anterior para começar a usar assinaturas para ouvir novos blocos.\n\n```typescript\n// Retrieve the chain name\nconst chain = await api.rpc.system.chain();\n\n// Subscribe to the new headers\nawait api.rpc.chain.subscribeNewHeads((lastHeader) => {\n  console.log(\n    `${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`\n  );\n});\n```\n\nO padrão geral para as funções `api.rpc.subscribe*` é passar um callback para a função de assinatura, e isso será acionado em cada nova entrada à medida que são importadas.\n\nOutras chamadas em `api.query.*` podem ser modificadas de maneira semelhante para usar assinaturas, fornecendo uma função de callback, incluindo chamadas que possuem parâmetros. Aqui está um exemplo de como assinar as alterações de saldo em uma conta:\n\n```typescript\n// Define wallet address\nconst addr = 'INSERT_ADDRESS';\n\n// Subscribe to balance changes for a specified account\nawait api.query.system.account(addr, ({ nonce, data: balance }) => {\n  console.log(\n    `Free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`\n  );\n});\n```\n\n??? code \"View the complete script\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/query-subscriptions.ts'\n    ```\n\n## Criar uma Keyring para uma Conta {: #keyrings }\n\nO objeto Keyring é usado para manter os pares de chaves e a assinatura de quaisquer dados, seja uma transferência, uma mensagem ou uma interação de contrato.\n\n### Criar uma Instância do Keyring {: #creating-a-keyring-instance }\n\nVocê pode criar uma instância simplesmente criando uma instância da classe Keyring e especificando o tipo padrão de endereço de carteira usado. O tipo de carteira padrão é `SR25519`, mas para redes compatíveis com Tanssi EVM, o tipo de carteira deve ser `ethereum`.\n\n```typescript\n// Import the keyring as required\nimport Keyring from '@polkadot/keyring';\n\n// Create a keyring instance (ECDSA)\nconst keyringECDSA = new Keyring({ type: 'ethereum' });\n\n// Create a keyring instance (SR25519)\nconst keyring = new Keyring({ type: 'sr25519' });\n```\n\n### Adicionar uma Conta a um Keyring {: #adding-accounts }\n\nHá várias maneiras de adicionar uma conta à instância do keyring, incluindo a partir da frase mnemônica e da chave privada abreviada. O seguinte código de exemplo fornecerá alguns exemplos:\n\n=== \"Da Mnemônica (ECDSA)\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-ecdsa.ts'\n    ```\n\n=== \"Da Chave Privada (ECDSA)\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-private-key-ecdsa.ts'\n    ```\n\n=== \"Da Mnemônica (SR25519)\"\n\n    ```typescript\n    --8<-- 'code/builders/toolkit/substrate-api/libraries/polkadot-js-api/adding-accounts-mnemonic-sr25519.ts'\n    ```\n\n## Enviando Transações {: #transactions }\n\nOs endpoints de transação são expostos em endpoints geralmente no formato `api.tx.<module>.<method>`, onde as decorações do módulo e do método são geradas por meio de metadados. Elas permitem que você envie transações para inclusão em blocos, sejam elas transferências, interações com paletes ou qualquer outra coisa que o Moonbeam suporte. Você pode ver uma lista de todos os endpoints disponíveis examinando o objeto `api.tx`, por exemplo, via:\n\n```typescript\nconsole.log(api.tx);\n```\n\n### Enviar uma Transação Básica {: #sending-basic-transactions }\n\nA biblioteca da API Polkadot.js pode ser usada para enviar transações para a rede. Por exemplo, assumindo que você [inicializou a API](#creating-an-API-provider-instance) e uma [instância do keyring](#creating-a-keyring-instance), você pode usar o seguinte trecho para enviar uma transação básica (este exemplo de código também recuperará os dados de chamada codificados da transação, bem como o hash da
















    ```bash


    ```



    ```bash


    ```







```typescript














```

```text

```

```typescript

```text

```













````
```typescript

```
```typescript

```


```typescript










```

```typescript

```
    ```typescript

    ```





```typescript

```


```typescript









```
````

```typescript

````

    ```
```typescript







```

````

```typescript

```



```typescript

```

```typescript



```

````

```typescript

```

```typescript


    ```









```typescript




```

````

```typescript
```

````

```typescript




    ```


    ```typescript

````
    ```

````
    ```typescript

    ```





```typescript

```





```typescript









```

````

```typescript

```

````

```typescript

```

```typescript


    ```











```typescript








```


    ```typescript

    ```













```typescript
























```



    ```typescript

    ```









```typescript

```









```typescript
































```
