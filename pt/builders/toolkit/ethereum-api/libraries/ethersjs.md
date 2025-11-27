---
title: EVM Transactions & Contracts with Ethers.js
description: Learn how to use the Ethereum EtherJS Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered Ethereum compatible network.
icon: octicons-code-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/libraries/ethersjs.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "71fb58c9052604f831f795d52d483e4ba648a60d560a4bca2a68be052ba29af7",
  "content": "--- \ntitle: EVM Transactions & Contracts with Ethers.js\ndescription: Learn how to use the Ethereum EtherJS Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered Ethereum compatible network.\nicon: octicons-code-24\ncategories: EVM-Template\n---\n\n# Ethers.js JavaScript Library\n\n<style>.video-container{display:flex;justify-content:space-between;max-width:1000px;margin:0 auto;}.video-column{width:49%;}.embed-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin-bottom:10px;}.embed-container iframe,.embed-container object,.embed-container embed{position:absolute;top:0;left:0;width:100%;height:100%;}</style><div class=\"video-container\"><div class=\"video-column\"><div class='embed-container'><iframe src='https://www.youtube.com/embed/bXtknNifO78?si=Hjiah5yhKvBcsE7f' frameborder='0' allowfullscreen></iframe></div></div><div class=\"video-column\"><div class='embed-container'><iframe src='https://www.youtube.com/embed/m9iVeCP7owI?si=krm6z9AsFCDrjlJh' frameborder='0' allowfullscreen></iframe></div></div></div>\n\n## Introduction {: #introduction }\n\nThe [Ethers.js](https://docs.ethers.org/v6/){target=\\_blank} library provides a set of tools to interact with Ethereum nodes with JavaScript, similar to [Web3.js](/builders/toolkit/ethereum-api/libraries/web3js/){target=\\_blank}. Tanssi-powered EVM networks have an Ethereum-like API available that is fully compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the Ethers.js library to interact with a Tanssi EVM network node as if they were doing so on Ethereum. For more information on Ethers.js, check their [documentation site](https://docs.ethers.org/v6){target=\\_blank}.\n\nIn this guide, you'll learn how to use the Ethers.js library for your Tanssi EVM network. Next, to showcase the library in action, you'll use Ethers.js to send a transaction and deploy a contract on a Tanssi demo EVM appchain running on [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\_blank}. This guide can be adapted for your own Tanssi EVM appchain by simply changing the endpoint. \n\nIf you prefer video tutorials, you can follow along with the corresponding videos at the top of this page for [Sending Transactions with Ethers.js](#send-a-transaction) and [Deploying Contracts with Ethers.js](#deploy-a-contract).\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Checking Prerequisites {: #checking-prerequisites }\n\nFor the examples in this guide, you will need to have the following:\n\n - An account with funds in the Tanssi EVM network you are testing with\n\n## Installing Ethers.js {: #install-ethersjs }\n\nFor this guide, you'll need to install the Ethers.js library and the Solidity compiler. To install both NPM packages, you can run the following command:\n\n=== \"npm\"\n\n    ```bash\n    npm install ethers solc@0.8.0\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add ethers solc@0.8.0\n    ```\n\n## Setting up the Ethers Provider {: #setting-up-the-ethers-provider }\n\nThroughout this guide, you'll create several scripts that provide various functionalities, such as sending a transaction, deploying a contract, and interacting with a deployed contract. In most of these scripts you'll need to create an [Ethers provider](https://docs.ethers.org/v6/api/providers/){target=\\_blank} to interact with the network.\n\nTo create a provider, you can take the following steps:\n\n1. Import the `ethers` library\n2. Define the `providerRPC` object, which can include the network configurations for any of the networks you want to send a transaction on. You'll include the `name`, `rpc`, and `chainId` for each network\n3. Create the `provider` using the `ethers.JsonRpcProvider` method\n\n```js\n// 1. Import ethers\nimport { ethers } from \"ethers\";\n\n// 2. Define network configurations\nconst providerRPC = {\n  evmNetwork: {\n    name: 'dancelight-evm-network',\n    // Insert your RPC URL here\n    rpc: '{{ networks.dancelight.demo_evm_rpc_url }}',\n    chainId: {{ networks.dancelight.demo_evm_chain_id }}, // {{ networks.dancelight.demo_evm_chain_hex_id }} in hex,\n  },\n};\n// 3. Create ethers provider\nconst provider = new ethers.JsonRpcProvider(\n  providerRPC.evmNetwork.rpc, \n  {\n    chainId: providerRPC.evmNetwork.chainId,\n    name: providerRPC.evmNetwork.name,\n  }\n);\n```\n\nSave this code snippet as you'll need it for the scripts that are used in the following sections.\n\n## Send a Transaction {: #send-a-transaction }\n\nDuring this section, you'll be creating a couple of scripts. The first one will be to check the balances of your accounts before trying to send a transaction. The second script will actually send the transaction.\n\nYou can also use the balance script to check the account balances after the transaction has been sent.\n\n### Check Balances Script {: #check-balances-script }\n\nYou'll only need one file to check the balances of both addresses before and after the transaction is sent.  To get started, you can create a `balances.js` file by running:\n\n```bash\ntouch balances.js\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. [Set up the Ethers provider](#setting-up-the-ethers-provider)\n2. Define the `addressFrom` and `addressTo` variables\n3. Create the asynchronous `balances` function which wraps the `provider.getBalance` method\n4. Use the `provider.getBalance` function to fetch the balances for the `addressFrom` and `addressTo` addresses. You can also leverage the `ethers.formatEther` function to transform the balance into a more readable number in ETH\n5. Lastly, run the `balances` function\n\n```js\n// 1. Add the Ethers provider logic here:\n// {...}\n\n// 2. Create address variables\nconst addressFrom = 'INSERT_ADDRESS_FROM';\nconst addressTo = 'INSERT_ADDRESS_TO';\n\n// 3. Create balances function\nconst balances = async () => {\n  // 4. Fetch balances\n  const balanceFrom = ethers.formatEther(await provider.getBalance(addressFrom));\n  const balanceTo = ethers.formatEther(await provider.getBalance(addressTo));\n\n  console.log(`The balance of ${addressFrom} is: ${balanceFrom} {{ networks.dancelight.demo_evm_token_symbol }}`);\n  console.log(`The balance of ${addressTo} is: ${balanceTo} {{ networks.dancelight.demo_evm_token_symbol }}`);\n};\n\n// 5. Call the balances function\nbalances();\n```\n\n??? code \"View the complete script\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/balances.js'\n    ```\n\nTo run the script and fetch the account balances, you can run the following command:\n\n```bash\nnode balances.js\n```\n\nIf successful, the balances for the origin and receiving address will be displayed in your terminal in {{ networks.dancelight.demo_evm_token_symbol }}.\n\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/balances.md'\n\n### Send Transaction Script {: #send-transaction-script }\n\nYou'll only need one file for executing a transaction between accounts. For this example, you'll be transferring 1 {{ networks.dancelight.demo_evm_token_symbol }} token from an origin address (from which you hold the private key) to another address. To get started, you can create a `transaction.js` file by running:\n\n```bash\ntouch transaction.js\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. [Set up the Ethers provider](#setting-up-the-ethers-provider)\n2. Define the `privateKey` and the `addressTo` variables. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**\n3. Create a wallet using the `privateKey` and `provider` from the previous steps. The wallet instance is used to sign transactions\n4. Create the asynchronous `send` function, which wraps the transaction object and the `wallet.sendTransaction` method\n5. Create the transaction object, which only requires the recipient's address and the amount to send. Note that `ethers.parseEther` can be used, which handles the necessary unit conversions from Ether to Wei - similar to using `ethers.parseUnits(value, 'ether')`\n6. Send the transaction using the `wallet.sendTransaction` method and then use `await` to wait until the transaction is processed and the transaction receipt is returned\n7. Lastly, run the `send` function\n\n```js\n// 1. Add the Ethers provider logic here:\n// {...}\n\n// 2. Create account variables\nconst accountFrom = {\n  privateKey: 'INSERT_YOUR_PRIVATE_KEY',\n};\nconst addressTo = 'INSERT_ADDRESS_TO';\n\n// 3. Create wallet\nlet wallet = new ethers.Wallet(accountFrom.privateKey, provider);\n\n// 4. Create send function\nconst send = async () => {\n  console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);\n\n  // 5. Create tx object\n  const tx = {\n    to: addressTo,\n    value: ethers.parseEther('1'),\n  };\n\n  // 6. Sign and send tx - wait for receipt\n  const createReceipt = await wallet.sendTransaction(tx);\n  await createReceipt.wait();\n  console.log(`Transaction successful with hash: ${createReceipt.hash}`);\n};\n\n// 7. Call the send function\nsend();\n```\n\n??? code \"View the complete script\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/transaction.js'\n    ```\n\nTo run the script, you can run the following command in your terminal:\n\n```bash\nnode transaction.js\n```\n\nIf the transaction was successful, in your terminal you'll see the transaction hash has been printed out.\n\nYou can also use the `balances.js` script to check that the balances for the origin and receiving accounts have changed. The entire workflow would look like this:\n\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/transaction.md'\n\n## Deploy a Contract {: #deploy-a-contract }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/contract.md'\n\n### Compile Contract Script {: #compile-contract-script }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/compile.md'\n\n### Deploy Contract Script {: #deploy-contract-script }\n\nWith the script for compiling the `Incrementer.sol` contract in place, you can then use the results to send a signed transaction that deploys it. To do so, you can create a file for the deployment script called `deploy.js`:\n\n```bash\ntouch deploy.js\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. Import the contract file from `compile.js`\n2. [Set up the Ethers provider](#setting-up-the-ethers-provider)\n3. Define the `privateKey` for the origin account. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**\n4. Save the `bytecode` and `abi` for the compiled contract\n5. Create a wallet using the `privateKey` and `provider` from the previous steps. The wallet instance is used to sign transactions\n6. Create a contract instance with signer using the `ethers.ContractFactory` function, providing the `abi`, `bytecode`, and `wallet` as parameters\n7. Create the asynchronous `deploy` function that will be used to deploy the contract\n8. Within the `deploy` function, use the `incrementer` contract instance to call `deploy` and pass in the initial value. For this example, you can set the initial value to `5`. This will send the transaction for contract deployment. To wait for a transaction receipt you can use the `deployed` method of the contract deployment transaction\n9. Lastly, run the `deploy` function\n\n```js\n// 1. Import the contract file\nimport contractFile from './compile';\n\n// 2. Add the Ethers provider logic here:\n// {...}\n\n// 3. Create account variables\nconst accountFrom = {\n  privateKey: 'INSERT_YOUR_PRIVATE_KEY',\n};\n\n// 4. Save the bytecode and ABI\nconst bytecode = contractFile.evm.bytecode.object;\nconst abi = contractFile.abi;\n\n// 5. Create wallet\nlet wallet = new ethers.Wallet(accountFrom.privateKey, provider);\n\n// 6. Create contract instance with signer\nconst incrementer = new ethers.ContractFactory(abi, bytecode, wallet);\n\n// 7. Create deploy function\nconst deploy = async () => {\n  console.log(`Attempting to deploy from account: ${wallet.address}`);\n\n  // 8. Send tx (initial value set to 5) and wait for receipt\n  const contract = await incrementer.deploy(5);\n  const txReceipt = await contract.deploymentTransaction().wait();\n\n  console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);\n};\n\n// 9. Call the deploy function\ndeploy();\n```\n\n??? code \"View the complete script\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/deploy.js'\n    ```\n\nTo run the script, you can enter the following command into your terminal:\n\n```bash\nnode deploy.js\n```\n\nIf successful, the contract's address will be displayed in the terminal.\n\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/deploy.md'\n\n### Read Contract Data (Call Methods) {: #read-contract-data }\n\nCall methods are the type of interaction that don't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.\n\nTo get started, you can create a file and name it `get.js`:\n\n```bash\ntouch get.js\n```\n\nThen you can take the following steps to create the script:\n\n1. Import the `contractFile` from the `compile.js` file, where the ABI of the contract is\n2. [Set up the Ethers provider](#setting-up-the-ethers-provider)\n3. Create the `contractAddress` variable using the address of the deployed contract\n4. Create an instance of the contract using the `ethers.Contract` function and passing in the `contractAddress`, `abi`, and `provider`\n5. Create the asynchronous `get` function\n6. Use the contract instance to call one of the contract's methods and pass in any inputs if necessary. For this example, you'll call the `number` method, which requires no inputs, and `await`, which will return the requested value once the request promise resolves\n7. Lastly, call the `get` function\n\n```js\n// 1. Import the ABI\nimport contractFile from './compile';\n\n// 2. Add the Ethers provider logic here:\n// {...}\n\n// 3. Contract address variable\nconst contractAddress = 'INSERT_CONTRACT_ADDRESS';\n\n// 4. Create contract instance\nconst incrementer = new ethers.Contract(\n  contractAddress,\n  contractFile.abi,\n  provider\n);\n\n// 5. Create get function\nconst get = async () => {\n  console.log(`Making a call to contract at address: ${contractAddress}`);\n\n  // 6. Call contract \n  const data = await incrementer.number();\n\n  console.log(`The current number stored is: ${data}`);\n};\n\n// 7. Call get function\nget();\n```\n\n??? code \"View the complete script\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/get.js'\n    ```\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\nnode get.js\n```\n\nIf successful, the value will be displayed in the terminal.\n\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/get.md'\n\n### Interact with Contract (Send Methods) {: #interact-with-contract }\n\nSend methods are the type of interaction that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. In this section, you'll create two scripts: one to increment and one to reset the incrementer. To get started, you can create a file for each script and name them `increment.js` and `reset.js`:\n\n```bash\ntouch increment.js reset.js\n```\n\nOpen the `increment.js` file and take the following steps to create the script:\n\n1. Import the `contractFile` from the `compile.js` file, where the ABI of the contract is\n2. [Set up the Ethers provider](#setting-up-the-ethers-provider)\n3. Define the `privateKey` for the origin account, the `contractAddress` of the deployed contract, and the `_value` to increment by. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**\n4. Create a wallet using the `privateKey` and `provider` from the previous steps. The wallet instance is used to sign transactions\n5. Create an instance of the contract using the `ethers.Contract` function and passing in the `contractAddress`, `abi`, and `provider`\n6. Create the asynchronous `increment` function\n7. Use the contract instance to call one of the contract's methods and pass in any inputs if necessary. For this example, you'll call the `increment` method, providing the value to increment by as an input, and `await`, which will return the requested value once the request promise resolves\n8. Lastly, call the `increment` function\n\n```js\n// 1. Import the contract ABI\nimport contractFile from './compile';\n\n// 2. Add the Ethers provider logic here:\n// {...}\n\n// 3. Create variables\nconst accountFrom = {\n  privateKey: 'INSERT_YOUR_PRIVATE_KEY',\n};\nconst contractAddress = 'INSERT_CONTRACT_ADDRESS';\nconst _value = 3;\n\n// 4. Create wallet\nlet wallet = new ethers.Wallet(accountFrom.privateKey, provider);\n\n// 5. Create contract instance with signer\nconst incrementer = new ethers.Contract(\n  contractAddress,\n  contractFile.abi,\n  wallet\n);\n\n// 6. Create increment function\nconst increment = async () => {\n  console.log(\n    `Calling the increment by ${_value} function in contract at address: ${contractAddress}`\n  );\n\n  // 7. Sign and send tx and wait for receipt\n  const createReceipt = await incrementer.increment(_value);\n  await createReceipt.wait();\n\n  console.log(`Tx successful with hash: ${createReceipt.hash}`);\n};\n\n// 8. Call the increment function\nincrement();\n```\n\n??? code \"View the complete script\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/increment.js'\n    ```\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\nnode increment.js\n```\n\nIf successful, the transaction hash will be displayed in the terminal. You can use the `get.js` script alongside the `increment.js` script to make sure that the value is changing as expected:\n\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/increment.md'\n\nNext you can open the `reset.js` file and take the following steps to create the script:\n\n1. Import the `contractFile` from the `compile.js` file, where the ABI of the contract is\n2. [Set up the Ethers provider](#setting-up-the-ethers-provider)\n3. Define the `privateKey` for the origin account and the `contractAddress` of the deployed contract. The private key is required to create a wallet instance. **Note: This is for example purposes only. Never store your private keys in a JavaScript file**\n4. Create a wallet using the `privateKey` and `provider` from the previous steps. The wallet instance is used to sign transactions\n5. Create an instance of the contract using the `ethers.Contract` function and passing in the `contractAddress`, `abi`, and `provider`\n6. Create the asynchronous `reset` function\n7. Use the contract instance to call one of the contract's methods and pass in any inputs if necessary. For this example, you will call the `reset` method which doesn't require any inputs. You can use `await` which will return the value requested once the request promise resolves\n8. Lastly, call the `reset` function\n\n```js\n// 1. Import the contract ABI\nimport contractFile from './compile';\n\n// 2. Add the Ethers provider logic here:\n// {...}\n\n// 3. Create variables\nconst accountFrom = {\n  privateKey: 'INSERT_YOUR_PRIVATE_KEY',\n};\nconst contractAddress = 'INSERT_CONTRACT_ADDRESS';\n\n// 4. Create wallet\nlet wallet = new ethers.Wallet(accountFrom.privateKey, provider);\n\n// 5. Create contract instance with signer\nconst incrementer = new ethers.Contract(\n  contractAddress,\n  contractFile.abi,\n  wallet\n);\n\n// 6. Create reset function\nconst reset = async () => {\n  console.log(`Calling the reset function in contract at address: ${contractAddress}`);\n\n  // 7. sign and send tx and wait for receipt\n  const createReceipt = await incrementer.reset();\n  await createReceipt.wait();\n\n  console.log(`Tx successful with hash: ${createReceipt.hash}`);\n};\n\n// 8. Call the reset function\nreset();\n```\n\n??? code \"View the complete script\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/reset.js'\n    ```\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\nnode reset.js\n```\n\nIf successful, the transaction hash will be displayed in the terminal. You can use the `get.js` script alongside the `reset.js` script to make sure that value is changing as expected:\n\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/reset.md'\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Transações e Contratos EVM com Ethers.js\ndescription: Aprenda a usar a Biblioteca Ethereum EtherJS para enviar transações e implantar contratos inteligentes Solidity em sua rede compatível com Ethereum com tecnologia Tanssi.\nicon: octicons-code-24\ncategories: EVM-Template\n---\n\n# Biblioteca JavaScript Ethers.js\n\n<style>.video-container{display:flex;justify-content:space-between;max-width:1000px;margin:0 auto;}.video-column{width:49%;}.embed-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin-bottom:10px;}.embed-container iframe,.embed-container object,.embed-container embed{position:absolute;top:0;left:0;width:100%;height:100%;}</style><div class=\"video-container\"><div class=\"video-column\"><div class='embed-container'><iframe src='https://www.youtube.com/embed/bXtknNifO78?si=Hjiah5yhKvBcsE7f' frameborder='0' allowfullscreen></iframe></div></div><div class=\"video-column\"><div class='embed-container'><iframe src='https://www.youtube.com/embed/m9iVeCP7owI?si=krm6z9AsFCDrjlJh' frameborder='0' allowfullscreen></iframe></div></div></div>\n\n## Introdução {: #introduction }\n\nA biblioteca [Ethers.js](https://docs.ethers.org/v6/){target=\\_blank} fornece um conjunto de ferramentas para interagir com nós Ethereum com JavaScript, semelhante a [Web3.js](/builders/toolkit/ethereum-api/libraries/web3js/){target=\\_blank}. As redes EVM com tecnologia Tanssi têm uma API semelhante à Ethereum disponível que é totalmente compatível com as invocações JSON RPC de estilo Ethereum. Portanto, os desenvolvedores podem aproveitar essa compatibilidade e usar a biblioteca Ethers.js para interagir com um nó de rede EVM Tanssi como se estivessem fazendo isso no Ethereum. Para obter mais informações sobre Ethers.js, consulte o seu [site de documentação](https://docs.ethers.org/v6){target=\\_blank}.\n\nNeste guia, você aprenderá como usar a biblioteca Ethers.js para sua rede EVM Tanssi. Em seguida, para mostrar a biblioteca em ação, você usará o Ethers.js para enviar uma transação e implantar um contrato em uma appchain EVM de demonstração Tanssi em execução em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\_blank}. Este guia pode ser adaptado para sua própria appchain EVM Tanssi, simplesmente alterando o endpoint.\n\nSe você preferir tutoriais em vídeo, pode acompanhar os vídeos correspondentes na parte superior desta página para [Enviar Transações com Ethers.js](#send-a-transaction) e [Implantar Contratos com Ethers.js](#deploy-a-contract).\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Verificando os Pré-requisitos {: #checking-prerequisites }\n\nPara os exemplos neste guia, você precisará ter o seguinte:\n\n - Uma conta com fundos na rede EVM Tanssi que você está testando\n\n## Instalando Ethers.js {: #install-ethersjs }\n\nPara este guia, você precisará instalar a biblioteca Ethers.js e o compilador Solidity. Para instalar ambos os pacotes NPM, você pode executar o seguinte comando:\n\n=== \"npm\"\n\n    ```bash\n    npm install ethers solc@0.8.0\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add ethers solc@0.8.0\n    ```\n\n## Configurando o Provedor Ethers {: #setting-up-the-ethers-provider }\n\nAo longo deste guia, você criará vários scripts que fornecem várias funcionalidades, como enviar uma transação, implantar um contrato e interagir com um contrato implantado. Na maioria desses scripts, você precisará criar um [provedor Ethers](https://docs.ethers.org/v6/api/providers/){target=\\_blank} para interagir com a rede.\n\nPara criar um provedor, você pode seguir estas etapas:\n\n1. Importe a biblioteca `ethers`\n2. Defina o objeto `providerRPC`, que pode incluir as configurações de rede para qualquer uma das redes nas quais você deseja enviar uma transação. Você incluirá o `name`, `rpc` e `chainId` para cada rede\n3. Crie o `provider` usando o método `ethers.JsonRpcProvider`\n\n```js\n// 1. Import ethers\nimport { ethers } from \"ethers\";\n\n// 2. Define network configurations\nconst providerRPC = {\n  evmNetwork: {\n    name: 'dancelight-evm-network',\n    // Insert your RPC URL here\n    rpc: '{{ networks.dancelight.demo_evm_rpc_url }}',\n    chainId: {{ networks.dancelight.demo_evm_chain_id }}, // {{ networks.dancelight.demo_evm_chain_hex_id }} in hex,\n  },\n};\n// 3. Create ethers provider\nconst provider = new ethers.JsonRpcProvider(\n  providerRPC.evmNetwork.rpc, \n  {\n    chainId: providerRPC.evmNetwork.chainId,\n    name: providerRPC.evmNetwork.name,\n  }\n);\n```\n\nSalve este trecho de código, pois você precisará dele para os scripts que são usados ​​nas seções a seguir.\n\n## Enviar uma Transação {: #send-a-transaction }\n\nNesta seção, você criará alguns scripts. O primeiro servirá para verificar os saldos de suas contas antes de tentar enviar uma transação. O segundo script realmente enviará a transação.\n\nVocê também pode usar o script de saldo para verificar os saldos da conta após o envio da transação.\n\n### Script de Verificação de Saldo {: #check-balances-script }\n\nVocê só precisará de um arquivo para verificar os saldos dos dois endereços antes e depois que a transação for enviada. Para começar, você pode criar um arquivo `balances.js` executando:\n\n```bash\ntouch balances.js\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. [Configure o provedor Ethers](#setting-up-the-ethers-provider)\n2. Defina as variáveis `addressFrom` e `addressTo`\n3. Crie a função assíncrona `balances` que encapsula o método `provider.getBalance`\n4. Use a função `provider.getBalance` para buscar os saldos dos endereços `addressFrom` e `addressTo`. Você também pode usar a função `ethers.formatEther` para transformar o saldo em um número mais legível em ETH\n5. Por fim, execute a função `balances`\n\n```js\n// 1. Add the Ethers provider logic here:\n// {...}\n\n// 2. Create address variables\nconst addressFrom = 'INSERT_ADDRESS_FROM';\nconst addressTo = 'INSERT_ADDRESS_TO';\n\n// 3. Create balances function\nconst balances = async () => {\n  // 4. Fetch balances\n  const balanceFrom = ethers.formatEther(await provider.getBalance(addressFrom));\n  const balanceTo = ethers.formatEther(await provider.getBalance(addressTo));\n\n  console.log(`The balance of ${addressFrom} is: ${balanceFrom} {{ networks.dancelight.demo_evm_token_symbol }}`);\n  console.log(`The balance of ${addressTo} is: ${balanceTo} {{ networks.dancelight.demo_evm_token_symbol }}`);\n};\n\n// 5. Call the balances function\nbalances();\n```\n\n??? code \"Ver o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/balances.js'\n    ```\n\nPara executar o script e buscar os saldos da conta, você pode executar o seguinte comando:\n\n```bash\nnode balances.js\n```\n\nSe for bem-sucedido, os saldos do endereço de origem e de recebimento serão exibidos em seu terminal no {{ networks.dancelight.demo_evm_token_symbol }}.\n\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/balances.md'\n\n### Script de Envio de Transação {: #send-transaction-script }\n\nVocê só precisará de um arquivo para executar uma transação entre contas. Para este exemplo, você transferirá 1 token {{ networks.dancelight.demo_evm_token_symbol }} de um endereço de origem (do qual você possui a chave privada) para outro endereço. Para começar, você pode criar um arquivo `transaction.js` executando:\n\n```bash\ntouch transaction.js\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. [Configure o provedor Ethers](#setting-up-the-ethers-provider)\n2. Defina as variáveis ​​`privateKey` e `addressTo`.



















    ```bash

    ```



    ```bash

    ```











```js




















```

```bash

```

```js







```bash

```









```js

````

```js

```

````

```bash

```

```bash

```

```js



```



    ```js

    ```



```bash

```









```bash

```



````

```js

```

````

```bash

```js
```

```bash

```

```js























```



    ```js

    ```



```bash
```

````
```js

```
````

```bash

```

```bash

```

```js




```bash

```













```js







```

````

```js

```

````

```bash

```

```bash

```

```js










```



    ```js

    ```



```bash

```











```bash

```


````

```js

```

````

```bash

```js



























```



    ```js

    ```


```bash
````

```

````

```bash

```


```bash

```












```js






































```



    ```js

    ```



```bash

```
















```js



































```



    ```js

    ```



```bash

```
