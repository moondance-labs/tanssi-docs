---
title: How to use viem Ethereum Library
description: In this tutorial use the viem TypeScript interface for Ethereum to send transactions and deploy Solidity smart contracts to your Tanssi-powered EVM network.
icon: octicons-code-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/libraries/viem.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "bcb23142f6cfa1005d2b6014291d22224e5b68307d946eaae1e5f1c814612fbf",
  "content": "--- \ntitle: How to use viem Ethereum Library\ndescription: In this tutorial use the viem TypeScript interface for Ethereum to send transactions and deploy Solidity smart contracts to your Tanssi-powered EVM network.\nicon: octicons-code-24\ncategories: EVM-Template\n---\n\n# viem TypeScript Ethereum Library\n\n## Introduction {: #introduction }\n\n[viem](https://viem.sh){target=\\_blank} is a modular TypeScript library that allows developers to interact with abstractions over the JSON-RPC API, making it easy to interact with Ethereum nodes. Since Tanssi-powered EVM networks have an Ethereum API available that is fully compatible with Ethereum-style JSON-RPC invocations, developers can leverage this compatibility to interact with any Tanssi EVM network. For more information on viem, check out their [documentation site](https://viem.sh/docs/getting-started){target=\\_blank}.\n\nIn this guide, you'll learn how to use viem to send a transaction and deploy a contract on the demo EVM network. This guide can be adapted for use with any Tanssi-powered EVM network.\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Checking Prerequisites {: #checking-prerequisites }\n\nFor the examples in this guide, you will need to have the following:\n\n - An account with funds in the Tanssi EVM network you are testing with\n\n## Installing viem {: #installing-viem }\n\nTo get started, you'll need to create a basic TypeScript project. First, create a directory to store all of the files you'll be creating throughout this guide, and initialize the project with the following command:\n\n```bash\nmkdir viem-examples && cd viem-examples && npm init --y\n```\n\nFor this guide, you'll need to install the viem library and the Solidity compiler. To install both packages, you can run the following command:\n\n=== \"npm\"\n\n    ```bash\n    npm install typescript ts-node viem solc@0.8.0\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add typescript ts-node viem solc@0.8.0\n    ```\n\nYou can create a TypeScript configuration file by running:\n\n```bash\nnpx tsc --init\n```\n\n!!! note\n    This tutorial was created using Node.js v18.18.0.\n\n## Set Up a viem Client (Provider) {: #setting-up-a-viem-provider }\n\nThroughout this guide, you'll be creating a bunch of scripts that provide different functionality, such as sending a transaction, deploying a contract, and interacting with a deployed contract. In most of these scripts, you'll need to create a [viem client](https://docs.ethers.org/v6/api/providers/){target=\\_blank} to interact with the network.\n\nYou can create a viem client for reading chain data, like balances or contract data, using the `createPublicClient` function, or you can create a viem client for writing chain data, like sending transactions, using the `createWalletClient` function.\n\nCreating a viem client to interact with your Tanssi EVM network is a two-step process. First, you'll need to import the `defineChain` function from viem. This will allow you to specify the details of your Tanssi EVM network (or any arbitrary EVM chain). You'll then need to provide all of the chain details, as shown in the next section.\n\n### For Reading Chain Data {: #for-reading-chain-data }\n\nTo create a client for reading chain data, you can take the following steps:\n\n1. Import the `createPublicClient`, `http`, and `defineChain`functions from `viem`\n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. Create the `client` using the `createPublicClient` function and pass in the network and the HTTP RPC endpoint\n\n```ts\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/read-chain-data.ts'\n```\n\n### For Writing Chain Data {: #for-writing-chain-data }\n\nTo create a client for writing chain data, you can take the following steps:\n\n1. Import the `createWalletClient`, `http`, and `defineChain` functions from `viem`, and the `privateKeyToAccount` function from `viem/accounts`\n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. Create your account using the `privateKeyToAccount` function\n4. Create the `client` using the `createWalletClient` function and pass in the account, network, and the HTTP RPC endpoint\n\n!!! remember\n    This is for demo purposes only. Never store your private key in a TypeScript file.\n\n\n\n```ts\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/write-chain-data.ts'\n```\n\n!!! note\n    To interact with browser-based wallets, you can use the following code to create an account. In this snippet, `demo` refers to the demo EVM network created with `defineChain`.\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/browser-based-wallets.ts'\n    ```\n\n## Send a Transaction {: #send-transaction }\n\nDuring this section, you'll be creating a couple of scripts. The first one will check the balances of your accounts before trying to send a transaction. The second script will send the transaction. You can also use the balance script to check the account balances after the transaction has been sent.\n\n### Check Balances Script {: #check-balances-script }\n\nYou'll only need one file to check the balances of both addresses before and after the transaction is sent. To get started, you can create a `balances.ts` file by running:\n\n```bash\ntouch balances.ts\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. Update your imports to include the `createPublicClient`, `http`,`formatEther`, and `defineChain `functions from `viem` \n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. [Set up a public viem client](#for-reading-chain-data), which can be used for reading chain data, such as account balances\n4. Define the `addressFrom` and `addressTo` variables\n5. Create the asynchronous `balances` function that wraps the `publicClient.getBalance` method\n6. Use the `publicClient.getBalance` function to fetch the balances for the `addressFrom` and `addressTo` addresses. You can also leverage the `formatEther` function to transform the balance into a more readable number (in {{ networks.dancelight.demo_evm_token_symbol }} for the demo EVM network)\n7. Lastly, run the `balances` function\n\n???+ code \"View balances.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/balances.ts'\n    ```\n\nTo run the script and fetch the account balances, you can run the following command:\n\n```bash\nnpx ts-node balances.ts\n```\n\nIf successful, the balances for the origin and receiving address will be displayed in your terminal in {{ networks.dancelight.demo_evm_token_symbol }}.\n\n![The result of running the balances script in the terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-1.webp)\n\n### Send Transaction Script {: #send-transaction-script }\n\nYou'll only need one file to execute a transaction between accounts. For this example, you'll be transferring 1 {{ networks.dancelight.demo_evm_token_symbol }} token from an origin address on the demo EVM network (from which you hold the private key) to another address. To get started, you can create a `transaction.ts` file by running:\n\n```bash\ntouch transaction.ts\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. Update your imports to include `createPublicClient`, `createWalletClient`, `http`, `parseEther`, and `defineChain` functions from `viem`, as well as the `privateKeyToAccount` function from `viem/accounts`\n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which can be used along with your private key to send transactions. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**\n4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to wait for the transaction receipt\n5. Define the `addressTo` variable\n6. Create the asynchronous `send` function, which wraps the transaction object and the `walletClient.sendTransaction` method\n7. Use the `walletClient.sendTransaction` function to sign and send the transaction. You'll need to pass in the transaction object, which only requires the recipient's address and the amount to send. Note that `parseEther` can be used, which handles the necessary unit conversions from Ether to Wei, similar to using `parseUnits(value, decimals)`. Use `await` to wait until the transaction is processed and the transaction hash is returned\n8. Use the `publicClient.waitForTransactionReceipt` function to wait for the transaction receipt, signaling that the transaction has been completed. This is particularly helpful if you need the transaction receipt or if you're running the `balances.ts` script directly after this one to check if the balances have been updated as expected\n9. Lastly, run the `send` function\n\n???+ code \"View transaction.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/transaction.ts'\n    ```\n\nTo run the script, you can run the following command in your terminal:\n\n```bash\nnpx ts-node transaction.ts\n```\n\nIf the transaction was successful, in your terminal, you'll see the transaction hash has been printed out. You can also use the `balances.ts` script to check that the balances for the origin and receiving accounts have changed. The entire workflow would look like this:\n\n![The result of running the transaction and balances scripts in the terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-2.webp)\n\n## Deploy a Contract {: #deploy-contract }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/contract.md'\n\n### Compile Contract Script {: #compile-contract-script }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/compile-ts.md'\n\n```js\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/compile.ts'\n```\n\n### Deploy Contract Script {: #deploy-contract-script }\n\nWith the script for compiling the `Incrementer.sol` contract in place, you can then use the results to send a signed transaction that deploys it. To do so, you can create a file for the deployment script called `deploy.ts`:\n\n```bash\ntouch deploy.ts\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. Update your imports to include the `createPublicClient`, `createWalletClient`, `http`, and `defineChain` functions from `viem`, the `privateKeyToAccount` function from `viem/accounts`, and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section\n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which will be used along with your private key to deploy the `Incrementer` contract. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**\n4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to read the transaction receipt for the deployment\n5. Load the contract `bytecode` and `abi` for the compiled contract\n6. Create the asynchronous `deploy` function that will be used to deploy the contract via the `walletClient.deployContract` method\n7. Use the `walletClient.deployContract` function to sign and send the transaction. You'll need to pass in the contract's ABI and bytecode, the account to deploy the transaction from, and the initial value for the incrementer. Use `await` to wait until the transaction is processed and the transaction hash is returned\n8. Use the `publicClient.readContract` function to get the transaction receipt for the deployment. Use `await` to wait until the transaction is processed and the contract address is returned\n9. Lastly, run the `deploy` function\n\n???+ code \"View deploy.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/deploy.ts'\n    ```\n\n\nTo run the script, you can enter the following command into your terminal:\n\n```bash\nnpx ts-node deploy.ts\n```\n\nIf successful, the contract's address will be displayed in the terminal.\n\n![The result of running the deploy script in the terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-3.webp)\n\n### Read Contract Data (Call Methods) {: #read-contract-data }\n\nCall methods are the type of interaction that doesn't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.\n\nTo get started, you can create a file and name it `get.ts`:\n\n```bash\ntouch get.ts\n```\n\nThen you can take the following steps to create the script:\n\n1. Update your imports to include the `createPublicClient`, `http`, and `defineChain` functions from `viem`, and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section\n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to read the current number of the `Incrementer` contract\n4. Create the `contractAddress` variable using the address of the deployed contract and the `abi` variable using the `contractFile` from the `compile.ts` file\n5. Create the asynchronous `get` function\n6. Call the contract using the `publicClient.readContract` function, passing in the `abi`, the name of the function, the `contractAddress`, and any arguments (if needed). You can use `await`, which will return the value requested once the request promise resolves\n7. Lastly, call the `get` function\n\n???+ code \"View get.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/get.ts'\n    ```\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\nnpx ts-node get.ts\n```\n\nIf successful, the value will be displayed in the terminal.\n\n![The result of running the get script in the terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-4.webp)\n\n### Interact with Contract (Send Methods) {: #interact-with-contract }\n\nSend methods are the type of interactions that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. In this section, you'll create two scripts: one to increment and one to reset the incrementer. To get started, you can create a file for each script and name them `increment.ts` and `reset.ts`:\n\n```bash\ntouch increment.ts reset.ts\n```\n\nOpen the `increment.ts` file and take the following steps to create the script:\n\n1. Update your imports to include the `createPublicClient`, `createWalletClient` `http`, and `defineChain` functions from `viem`, the  `privateKeyToAccount` from `viem/accounts'` and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section\n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which will be used along with your private key to send a transaction. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**\n4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to wait for the transaction receipt\n5. Create the `contractAddress` variable using the address of the deployed contract, the `abi` variable using the `contractFile` from the `compile.ts` file, and the `_value` to increment the contract by\n6. Create the asynchronous `increment` function\n7. Call the contract using the `walletClient.writeContract` function, passing in the `abi`, the name of the function, the `contractAddress`, and the `_value`. You can use `await`, which will return the transaction hash once the request promise resolves\n8. Use the `publicClient.waitForTransactionReceipt` function to wait for the transaction receipt, signaling that the transaction has been completed. This is particularly helpful if you need the transaction receipt or if you're running the `get.ts` script directly after this one to check that the current number has been updated as expected\n9. Lastly, call the `increment` function\n\n???+ code \"View increment.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/increment.ts'\n    ```\n\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\nnpx ts-node increment.ts\n```\n\nIf successful, the transaction hash will be displayed in the terminal. You can use the `get.ts` script alongside the `increment.ts` script to make sure that value is changing as expected.\n\n![The result of running the increment and get scripts in the terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-5.webp)\n\nNext, you can open the `reset.ts` file and take the following steps to create the script:\n\n1. Update your imports to include the `createPublicClient`, `createWalletClient` `http`, and `defineChain` functions from `viem`, the  `privateKeyToAccount` from `viem/accounts'` and the `contractFile` from the `compile.ts` file you created in the [Compile Contract Script](#compile-contract-script) section\n2. Define the chain details of your Tanssi EVM network, making sure to include all fields shown below. Both `public` and `default` RPC URLs are required to be listed, even if they are the same\n3. [Set up a viem wallet client](#for-writing-chain-data) for writing chain data, which will be used along with your private key to send a transaction. **Note: This is for example purposes only. Never store your private keys in a TypeScript file**\n4. [Set up a public viem client](#for-reading-chain-data) for reading chain data, which will be used to wait for the transaction receipt\n5. Create the `contractAddress` variable using the address of the deployed contract and the `abi` variable using the `contractFile` from the `compile.ts` file to increment the contract by\n6. Create the asynchronous `reset` function\n7. Call the contract using the `walletClient.writeContract` function, passing in the `abi`, the name of the function, the `contractAddress`, and an empty array for the arguments. You can use `await`, which will return the transaction hash once the request promise resolves\n8. Use the `publicClient.waitForTransactionReceipt` function to wait for the transaction receipt, signaling that the transaction has been completed. This is particularly helpful if you need the transaction receipt or if you're running the `get.ts` script directly after this one to check that the current number has been reset to `0`\n9. Lastly, call the `reset` function\n\n???+ code \"View reset.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/reset.ts'\n    ```\n\n\nTo run the script, you can enter the following command in your terminal:\n\nnpx ts-node reset.ts\n```\n\nIf successful, the transaction hash will be displayed in the terminal. You can use the `get.ts` script alongside the `reset.ts` script to make sure that value is changing as expected.\n\n![The result of running the reset and get scripts in the terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-6.webp)\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Como usar a biblioteca viem Ethereum\ndescrição: Neste tutorial, use a interface viem TypeScript para Ethereum para enviar transações e implantar contratos inteligentes Solidity em sua rede EVM com tecnologia Tanssi.\nicon: octicons-code-24\ncategories: EVM-Template\n---\n\n# Biblioteca viem TypeScript Ethereum\n\n## Introdução {: #introduction }\n\n[viem](https://viem.sh){target=\\_blank} é uma biblioteca modular TypeScript que permite aos desenvolvedores interagir com abstrações sobre a API JSON-RPC, facilitando a interação com nós Ethereum. Como as redes EVM com tecnologia Tanssi têm uma API Ethereum disponível que é totalmente compatível com invocações JSON-RPC no estilo Ethereum, os desenvolvedores podem aproveitar essa compatibilidade para interagir com qualquer rede EVM Tanssi. Para obter mais informações sobre viem, consulte o [site de documentação](https://viem.sh/docs/getting-started){target=\\_blank}.\n\nNeste guia, você aprenderá como usar viem para enviar uma transação e implantar um contrato na rede EVM de demonstração. Este guia pode ser adaptado para uso com qualquer rede EVM com tecnologia Tanssi.\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Verificando os Pré-requisitos {: #checking-prerequisites }\n\nPara os exemplos neste guia, você precisará do seguinte:\n\n - Uma conta com fundos na rede EVM Tanssi que você está testando\n\n## Instalando viem {: #installing-viem }\n\nPara começar, você precisará criar um projeto TypeScript básico. Primeiro, crie um diretório para armazenar todos os arquivos que você criará ao longo deste guia e inicialize o projeto com o seguinte comando:\n\n```bash\nmkdir viem-examples && cd viem-examples && npm init --y\n```\n\nPara este guia, você precisará instalar a biblioteca viem e o compilador Solidity. Para instalar ambos os pacotes, você pode executar o seguinte comando:\n\n=== \"npm\"\n\n    ```bash\n    npm install typescript ts-node viem solc@0.8.0\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add typescript ts-node viem solc@0.8.0\n    ```\n\nVocê pode criar um arquivo de configuração do TypeScript executando:\n\n```bash\nnpx tsc --init\n```\n\n!!! note\n    Este tutorial foi criado usando Node.js v18.18.0.\n\n## Configurar um cliente viem (Provedor) {: #setting-up-a-viem-provider }\n\nAo longo deste guia, você criará um monte de scripts que fornecem diferentes funcionalidades, como enviar uma transação, implantar um contrato e interagir com um contrato implantado. Na maioria desses scripts, você precisará criar um [cliente viem](https://docs.ethers.org/v6/api/providers/){target=\\_blank} para interagir com a rede.\n\nVocê pode criar um cliente viem para ler dados da cadeia, como saldos ou dados de contratos, usando a função `createPublicClient` ou pode criar um cliente viem para gravar dados da cadeia, como enviar transações, usando a função `createWalletClient`.\n\nA criação de um cliente viem para interagir com sua rede EVM Tanssi é um processo de duas etapas. Primeiro, você precisará importar a função `defineChain` de viem. Isso permitirá que você especifique os detalhes de sua rede EVM Tanssi (ou qualquer cadeia EVM arbitrária). Em seguida, você precisará fornecer todos os detalhes da cadeia, conforme mostrado na próxima seção.\n\n### Para ler dados da cadeia {: #for-reading-chain-data }\n\nPara criar um cliente para ler dados da cadeia, você pode seguir estas etapas:\n\n1. Importe as funções `createPublicClient`, `http` e `defineChain` de `viem`\n2. Defina os detalhes da cadeia da sua rede EVM Tanssi, certificando-se de incluir todos os campos mostrados abaixo. Os URLs RPC `public` e `default` precisam ser listados, mesmo que sejam os mesmos\n3. Crie o `client` usando a função `createPublicClient` e passe a rede e o endpoint HTTP RPC\n\n```ts\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/read-chain-data.ts'\n```\n\n### Para gravar dados da cadeia {: #for-writing-chain-data }\n\nPara criar um cliente para gravar dados da cadeia, você pode seguir estas etapas:\n\n1. Importe as funções `createWalletClient`, `http` e `defineChain` de `viem` e a função `privateKeyToAccount` de `viem/accounts`\n2. Defina os detalhes da cadeia da sua rede EVM Tanssi, certificando-se de incluir todos os campos mostrados abaixo. Os URLs RPC `public` e `default` precisam ser listados, mesmo que sejam os mesmos\n3. Crie sua conta usando a função `privateKeyToAccount`\n4. Crie o `client` usando a função `createWalletClient` e passe a conta, a rede e o endpoint HTTP RPC\n\n!!! remember\n    Isso é apenas para fins de demonstração. Nunca armazene sua chave privada em um arquivo TypeScript.\n\n\n\n```ts\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/write-chain-data.ts'\n```\n\n!!! note\n    Para interagir com carteiras baseadas em navegador, você pode usar o seguinte código para criar uma conta. Neste trecho, `demo` se refere à rede EVM de demonstração criada com `defineChain`.\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/browser-based-wallets.ts'\n    ```\n\n## Enviar uma Transação {: #send-transaction }\n\nDurante esta seção, você criará alguns scripts. O primeiro verificará os saldos de suas contas antes de tentar enviar uma transação. O segundo script enviará a transação. Você também pode usar o script de saldo para verificar os saldos da conta após o envio da transação.\n\n### Script Verificar Saldos {: #check-balances-script }\n\nVocê só precisará de um arquivo para verificar os saldos de ambos os endereços antes e depois que a transação for enviada. Para começar, você pode criar um arquivo `balances.ts` executando:\n\n```bash\ntouch balances.ts\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. Atualize suas importações para incluir as funções `createPublicClient`, `http`,`formatEther` e `defineChain ` de `viem`\n2. Defina os detalhes da cadeia da sua rede EVM Tanssi, certificando-se de incluir todos os campos mostrados abaixo. Os URLs RPC `public` e `default` precisam ser listados, mesmo que sejam os mesmos\n3. [Configure um cliente viem público](#for-reading-chain-data), que pode ser usado para ler dados da cadeia, como saldos de contas\n4. Defina as variáveis `addressFrom` e `addressTo`\n5. Crie a função assíncrona `balances` que encapsula o método `publicClient.getBalance`\n6. Use a função `publicClient.getBalance` para buscar os saldos para os endereços `addressFrom` e `addressTo`. Você também pode aproveitar a função `formatEther` para transformar o saldo em um número mais legível (em {{ networks.dancelight.demo_evm_token_symbol }} para a rede EVM de demonstração)\n7. Por fim, execute a função `balances`\n\n???+ code \"Ver balances.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/balances.ts'\n    ```\n\nPara executar o script e buscar os saldos da conta, você pode executar o seguinte comando:\n\n```bash\nnpx ts-node balances.ts\n```\n\nSe tiver sucesso, os saldos do endereço de origem e recebimento serão exibidos em seu terminal em {{ networks.dancelight.demo_evm_token_symbol }}.\n\n![O resultado da execução do script de saldos no terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-1.webp)\n\n### Script Enviar Transação {: #send-transaction-script }\n\nVocê só precisará de um arquivo para executar uma transação entre contas. Para este exemplo, você transferirá 1 token {{ networks.dancelight.demo_evm_token_symbol }} de um endereço de origem na rede EVM de demonstração (do qual você possui a chave privada) para outro endereço. Para começar, você pode criar um arquivo `transaction.ts` executando:\n\n```bash\ntouch transaction.ts\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. Atualize suas importações para incluir as funções `createPublicClient`, `createWalletClient`, `http`, `parseEther` e `defineChain` de `viem`, bem como a função `privateKeyToAccount` de `viem/accounts`\n2. Defina os detalhes da cadeia da sua rede EVM Tanssi, certificando-se de incluir todos os campos mostrados abaixo. Os URLs RPC `public` e `default` precisam ser listados, mesmo que sejam os mesmos\n3. [Configure um cliente de carteira viem](#for-writing-chain-data) para gravar dados da cadeia, que pode ser usado junto com sua chave privada para enviar transações. **Nota: Isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo TypeScript**\n4. [Configure um cliente viem público](#for-reading-chain-data) para ler dados da cadeia, que será usado para aguardar o recebimento da transação\n5. Defina a variável `addressTo`\n6. Crie a função assíncrona `send`, que encapsula o objeto de transação e o método `walletClient.sendTransaction`\n7. Use a função `walletClient.sendTransaction` para assinar e enviar a transação. Você precisará passar o objeto de transação, que só exige o endereço do destinatário e o valor a ser enviado. Observe que `parseEther` pode ser usado, que lida com as conversões de unidade necessárias de Ether para Wei, semelhante ao uso de `parseUnits(value, decimals)`. Use `await` para esperar até que a transação seja processada e o hash da transação seja retornado\n8. Use a função `publicClient.waitForTransactionReceipt` para aguardar o recebimento da transação, sinalizando que a transação foi concluída. Isso é particularmente útil se você precisar do recebimento da transação ou se estiver executando o script `balances.ts` diretamente após este para verificar se os saldos foram atualizados conforme o esperado\n9. Por fim, execute a função `send`\n\n???+ code \"Ver transaction.ts\"\n\n    ```ts\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/viem/transaction.ts'\n    ```\n\nPara executar o script, você pode executar o seguinte comando em seu terminal:\n\n```bash\nnpx ts-node transaction.ts\n```\n\nSe a transação for bem-sucedida, no seu terminal, você verá o hash da transação impresso. Você também pode usar o script `balances.ts` para verificar se os saldos das contas de origem e recebimento foram alterados. O fluxo de trabalho inteiro seria assim:\n\n![O resultado da execução dos scripts de transação e saldos no terminal](/images/builders/toolkit/ethereum-api/libraries/viem/viem-2.webp)\n\n## Implantar um Contrato {: #deploy-contract }\n\n--8<-- 'text/builders/toolkit/













```bash

```

````

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

````
```ts

```
````

```bash

```

````
```ts

```
````

```ts
```bash

```

```bash

```

````

```ts

```

````

```bash

```
```ts

```js
```


```bash
    ```ts

```
````

```ts

```

````

```bash

```
```bash

```

````

```ts

```

````

```bash

```

```bash

    ```ts
```

````
```ts

```bash
````

```
```bash

```

````

```ts

```

````
```bash

```














    ```ts

    ```



```bash

```













```js

```





```bash

```















    ```ts

    ```




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















    ```ts

    ```




```bash

```



















    ```ts

    ```




```bash

```
