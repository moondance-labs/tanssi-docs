---
title: EVM Transactions & Contracts with Web3.py
description: Learn how to use the Ethereum Web3 Python Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered Ethereum compatible network.
icon: octicons-code-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/libraries/web3py.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "d9f5444f6c083c7bdeae2e9f49ff284d7d587ae92625338e596fb7a80935b0ff",
  "content": "--- \ntitle: EVM Transactions & Contracts with Web3.py\ndescription: Learn how to use the Ethereum Web3 Python Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered Ethereum compatible network.\nicon: octicons-code-24\ncategories: EVM-Template\n---\n\n# Web3.py Python Library\n\n## Introduction {: #introduction }\n\n[Web3.py](https://web3py.readthedocs.io/en/stable/){target=\\_blank} is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with Python. Tanssi EVM networks have an Ethereum-like API available that is fully compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the Ethers.js library to interact with a Tanssi EVM network node as if they were doing so on Ethereum. For more information on Web3.py, check their [documentation site](https://web3py.readthedocs.io/en/stable/){target=\\_blank}.\n\nIn this guide, you'll learn how to use setup the Web3.py library for your Tanssi-powered EVM network. Next, to showcase the library in action, you'll use Web3.py to send a transaction and deploy a contract on a Tanssi demo EVM appchain running on [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\_blank}. This guide can be adapted for your own Tanssi EVM appchain by simply changing the endpoint.\n\n--8<-- 'text/_common/general-py-tutorial-check.md'\n\n## Checking Prerequisites {: #checking-prerequisites }\n\nFor the examples in this guide, you will need to have the following:\n\n - An account with funds in the Tanssi EVM network you are testing with\n\n## Installing Web3.py {: #install-web3py }\n\nFor this guide, you'll need to install the Web3.py library and the Solidity compiler. To install both packages, you can run the following command:\n\n```bash\npip3 install web3 py-solc-x\n```\n\n## Setting up the Web3.py Provider {: #setting-up-the-web3py-provider }\n\nThroughout this guide, you'll be creating a bunch of scripts that provide different functionality such as sending a transaction, deploying a contract, and interacting with a deployed contract. In most of these scripts you'll need to create an [Web3.py provider](https://web3py.readthedocs.io/en/stable/providers.html){target=\\_blank} to interact with the network.\n\nTo create a provider, you can take the following steps:\n\n1. Import the `web3` library\n2. Create the `web3` provider suing using the `Web3(Web3.HTTPProvider()))` method and providing the Tanssi EVM network URL\n\n```python\n# 1. Import web3.py\nfrom web3 import Web3\n\n# 2. Create web3.py provider\n# Insert your RPC URL here\nweb3 = Web3(Web3.HTTPProvider('{{ networks.dancelight.demo_evm_rpc_url }}')) \n```\n\nSave this code snippet, as you'll need it for the scripts that are used in the following sections.\n\n## Send a Transaction {: #send-a-transaction }\n\nDuring this section, you'll be creating a couple of scripts. The first one will be to check the balances of your accounts before trying to send a transaction. The second script will actually send the transaction.\n\nYou can also use the balance script to check the account balances after the transaction has been sent.\n\n### Check Balances Script {: #check-balances-script }\n\nYou'll only need one file to check the balances of both addresses before and after the transaction has been sent.  To get started, you can create a `balances.py` file by running:\n\n``` bash\ntouch balances.py\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. [Set up the Web3 provider](#setting-up-the-web3py-provider)\n2. Define the `address_from` and `address_to` variables\n3. Get the balance for the accounts using the `web3.eth.get_balance` function and format the results using the `web3.from_wei`\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/balances.py'\n```\n\nTo run the script and fetch the account balances, you can run the following command:\n\n```bash\npython3 balances.py\n```\n\nIf successful, the balances for the origin and receiving address will be displayed in your terminal in {{ networks.dancelight.demo_evm_token_symbol }}.\n\n![Check Balance Ethers.js](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-1.webp)\n\n\n### Send Transaction Script {: #send-transaction-script }\n\nYou'll only need one file for executing a transaction between accounts. For this example, you'll be transferring 1 DEV token from an origin address (from which you hold the private key) to another address. To get started, you can create a `transaction.py` file by running:\n\n```bash\ntouch transaction.py\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. Add imports, including Web3.py and the `rpc_gas_price_strategy`, which will be used in the following steps to get the gas price used for the transaction\n2. [Set up the Web3 provider](#setting-up-the-web3py-provider)\n3. Define the `account_from`, including the `private_key`, and the `address_to` variables. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**\n4. Use the [Web3.py Gas Price API](https://web3py.readthedocs.io/en/stable/gas_price.html){target=\\_blank} to set a gas price strategy. For this example, you'll use the imported `rpc_gas_price_strategy`\n5. Create and sign the transaction using the `web3.eth.account.sign_transaction` function. Pass in the `nonce` `gas`, `gasPrice`, `to`, and `value` for the transaction along with the sender's `private_key`. To get the `nonce` you can use the `web3.eth.get_transaction_count` function and pass in the sender's address. To predetermine the `gasPrice` you'll use the `web3.eth.generate_gas_price` function. For the `value`, you can format the amount to send from an easily readable format to Wei using the `web3.to_wei` function\n6. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/transaction.py'\n```\n\nTo run the script, you can run the following command in your terminal:\n\n```bash\npython3 transaction.py\n```\n\n If the transaction was successful, in your terminal you'll see the transaction hash has been printed out.\n\nYou can also use the `balances.py` script to check that the balances for the origin and receiving accounts have changed. The entire workflow would look like this:\n\n![Send Tx Web3.py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-2.webp)\n\n## Deploy a Contract {: #deploy-a-contract }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/contract.md'\n\n### Compile Contract Script {: #compile-contract-script }\n\nIn this section, you'll create a script that uses the Solidity compiler to output the bytecode and interface (ABI) for the `Incrementer.sol` contract. To get started, you can create a `compile.py` file by running:\n\n```bash\ntouch compile.py\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. Import the `solcx` package\n2. **Optional** - If you haven't already installed the Solidity compiler, you can do so with by using the `solcx.install_solc` function\n3. Compile the `Incrementer.sol` function using the `solcx.compile_files` function\n4. Export the contract's ABI and bytecode\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/compile.py'\n```\n\n!!! note\n    If you see an error stating that `Solc is not installed`, uncomment the step 2 described in the code snippet.\n\n### Deploy Contract Script {: #deploy-contract-script }\n\nWith the script for compiling the `Incrementer.sol` contract in place, you can then use the results to send a signed transaction that deploys it. To do so, you can create a file for the deployment script called `deploy.py`:\n\n```bash\ntouch deploy.py\n```\n\nNext, you will create the script for this file and complete the following steps:\n\n1. Add imports, including Web3.py and the ABI and bytecode of the `Incrementer.sol` contract\n2. [Set up the Web3 provider](#setting-up-the-web3py-provider)\n3. Define the `account_from`, including the `private_key`. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**\n4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and bytecode of the contract\n5. Build a constructor transaction using the contract instance and passing in the value to increment by. For this example, you can use `5`. You'll then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function\n6. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the constructor transaction and the `private_key` of the sender\n7. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/deploy.py'\n```\n\nTo run the script, you can enter the following command into your terminal:\n\n```bash\npython3 deploy.py\n```\n\nIf successful, the contract's address will be displayed in the terminal.\n\n![Deploy Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-3.webp)\n\n### Read Contract Data (Call Methods) {: #read-contract-data }\n\nCall methods are the type of interaction that don't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.\n\nTo get started, you can create a file and name it `get.py`:\n\n```bash\ntouch get.py\n```\n\nThen you can take the following steps to create the script:\n\n1. Add imports, including Web3.py and the ABI of the `Incrementer.sol` contract\n2. [Set up the Web3 provider](#setting-up-the-web3py-provider)\n3. Define the `contract_address` of the deployed contract\n4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract\n5. Using the contract instance, you can then call the `number` function\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/get.py'\n```\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\npython3 get.py\n```\n\nIf successful, the value will be displayed in the terminal.\n\n![Read from Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-4.webp)\n\n### Interact with Contract (Send Methods) {: #interact-with-contract }\n\nSend methods are the type of interaction that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. In this section, you'll create two scripts: one to increment and one to reset the incrementer. To get started, you can create a file for each script and name them `increment.py` and `reset.py`:\n\n```bash\ntouch increment.py reset.py\n```\n\nOpen the `increment.py` file and take the following steps to create the script:\n\n1. Add imports, including Web3.py and the ABI of the `Incrementer.sol` contract\n2. [Set up the Web3 provider](#setting-up-the-web3py-provider)\n3. Define the `account_from`, including the `private_key`, the `contract_address` of the deployed contract, and the `value` to increment by. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**\n4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract\n5. Build the increment transaction using the contract instance and passing in the value to increment by. You'll then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function\n6. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the increment transaction and the `private_key` of the sender\n7. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/increment.py'\n```\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\npython3 increment.py\n```\n\nIf successful, the transaction hash will be displayed in the terminal. You can use the `get.py` script alongside the `increment.py` script to make sure that value is changing as expected:\n\n![Increment Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-5.webp)\n\nNext you can open the `reset.py` file and take the following steps to create the script:\n\n1. Add imports, including Web3.py and the ABI of the `Incrementer.sol` contract\n2. [Set up the Web3 provider](#setting-up-the-web3py-provider)\n3. Define the `account_from`, including the `private_key`, and the `contract_address` of the deployed contract. The private key is required to sign the transaction. **Note: This is for example purposes only. Never store your private keys in a Python file**\n4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract\n5. Build the reset transaction using the contract instance. You'll then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function\n6. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the reset transaction and the `private_key` of the sender\n7. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/reset.py'\n```\n\nTo run the script, you can enter the following command in your terminal:\n\n```bash\npython3 reset.py\n```\n\nIf successful, the transaction hash will be displayed in the terminal. You can use the `get.py` script alongside the `reset.py` script to make sure that value is changing as expected:\n\n![Reset Contract Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-6.webp)\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Transações e Contratos EVM com Web3.py\ndescription: Aprenda a usar a Biblioteca Python Web3 do Ethereum para enviar transações e implantar contratos inteligentes Solidity em sua rede compatível com Ethereum com tecnologia Tanssi.\nicon: octicons-code-24\ncategories: EVM-Template\n---\n\n# Biblioteca Python Web3.py\n\n## Introdução {: #introduction }\n\n[Web3.py](https://web3py.readthedocs.io/en/stable/){target=\\_blank} é um conjunto de bibliotecas que permitem que os desenvolvedores interajam com nós Ethereum usando os protocolos HTTP, IPC ou WebSocket com Python. As redes EVM Tanssi têm uma API semelhante à Ethereum disponível que é totalmente compatível com as invocações JSON RPC no estilo Ethereum. Portanto, os desenvolvedores podem aproveitar essa compatibilidade e usar a biblioteca Ethers.js para interagir com um nó de rede EVM Tanssi como se estivessem fazendo isso no Ethereum. Para obter mais informações sobre Web3.py, consulte seu [site de documentação](https://web3py.readthedocs.io/en/stable/){target=\\_blank}.\n\nNeste guia, você aprenderá a configurar a biblioteca Web3.py para sua rede EVM com tecnologia Tanssi. Em seguida, para mostrar a biblioteca em ação, você usará o Web3.py para enviar uma transação e implantar um contrato em uma appchain EVM de demonstração Tanssi em execução em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\_blank}. Este guia pode ser adaptado para sua própria appchain EVM Tanssi simplesmente alterando o endpoint.\n\n--8<-- 'text/_common/general-py-tutorial-check.md'\n\n## Verificando Pré-requisitos {: #checking-prerequisites }\n\nPara os exemplos neste guia, você precisará do seguinte:\n\n - Uma conta com fundos na rede EVM Tanssi com a qual você está testando\n\n## Instalando Web3.py {: #install-web3py }\n\nPara este guia, você precisará instalar a biblioteca Web3.py e o compilador Solidity. Para instalar ambos os pacotes, você pode executar o seguinte comando:\n\n```bash\npip3 install web3 py-solc-x\n```\n\n## Configurando o Provedor Web3.py {: #setting-up-the-web3py-provider }\n\nAo longo deste guia, você criará um monte de scripts que fornecem diferentes funcionalidades, como enviar uma transação, implantar um contrato e interagir com um contrato implantado. Na maioria desses scripts, você precisará criar um [provedor Web3.py](https://web3py.readthedocs.io/en/stable/providers.html){target=\\_blank} para interagir com a rede.\n\nPara criar um provedor, você pode seguir as seguintes etapas:\n\n1. Importe a biblioteca `web3`\n2. Crie o provedor `web3` usando o método `Web3(Web3.HTTPProvider()))` e fornecendo a URL da rede EVM Tanssi\n\n```python\n# 1. Importe web3.py\nfrom web3 import Web3\n\n# 2. Crie o provedor web3.py\n# Insira sua URL RPC aqui\nweb3 = Web3(Web3.HTTPProvider('{{ networks.dancelight.demo_evm_rpc_url }}')) \n```\n\nSalve este trecho de código, pois você precisará dele para os scripts que são usados nas seções a seguir.\n\n## Enviar uma Transação {: #send-a-transaction }\n\nDurante esta seção, você criará alguns scripts. O primeiro será para verificar os saldos de suas contas antes de tentar enviar uma transação. O segundo script realmente enviará a transação.\n\nVocê também pode usar o script de saldo para verificar os saldos da conta após o envio da transação.\n\n### Script de Verificação de Saldos {: #check-balances-script }\n\nVocê só precisará de um arquivo para verificar os saldos de ambos os endereços antes e depois que a transação for enviada.  Para começar, você pode criar um arquivo `balances.py` executando:\n\n``` bash\ntouch balances.py\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. [Configure o provedor Web3](#setting-up-the-web3py-provider)\n2. Defina as variáveis `address_from` e `address_to`\n3. Obtenha o saldo das contas usando a função `web3.eth.get_balance` e formate os resultados usando o `web3.from_wei`\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/balances.py'\n```\n\nPara executar o script e buscar os saldos da conta, você pode executar o seguinte comando:\n\n```bash\npython3 balances.py\n```\n\nSe for bem-sucedido, os saldos do endereço de origem e recebimento serão exibidos em seu terminal em {{ networks.dancelight.demo_evm_token_symbol }}.\n\n![Verificar Saldo Ethers.js](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-1.webp)\n\n\n### Script de Envio de Transação {: #send-transaction-script }\n\nVocê precisará apenas de um arquivo para executar uma transação entre contas. Para este exemplo, você transferirá 1 token DEV de um endereço de origem (do qual você possui a chave privada) para outro endereço. Para começar, você pode criar um arquivo `transaction.py` executando:\n\n```bash\ntouch transaction.py\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. Adicione importações, incluindo Web3.py e a `rpc_gas_price_strategy`, que serão usadas nas etapas a seguir para obter o preço do gás usado para a transação\n2. [Configure o provedor Web3](#setting-up-the-web3py-provider)\n3. Defina a `account_from`, incluindo a `private_key`, e as variáveis `address_to`. A chave privada é necessária para assinar a transação. **Observação: isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo Python**\n4. Use a [API de preço de gás Web3.py](https://web3py.readthedocs.io/en/stable/gas_price.html){target=\\_blank} para definir uma estratégia de preço de gás. Para este exemplo, você usará a `rpc_gas_price_strategy` importada\n5. Crie e assine a transação usando a função `web3.eth.account.sign_transaction`. Passe o `nonce` `gas`, `gasPrice`, `to` e `value` para a transação junto com a `private_key` do remetente. Para obter o `nonce`, você pode usar a função `web3.eth.get_transaction_count` e passar o endereço do remetente. Para predeterminar o `gasPrice`, você usará a função `web3.eth.generate_gas_price`. Para o `value`, você pode formatar o valor a ser enviado de um formato facilmente legível para Wei usando a função `web3.to_wei`\n6. Usando a transação assinada, você pode enviá-la usando a função `web3.eth.send_raw_transaction` e esperar pelo recibo da transação usando a função `web3.eth.wait_for_transaction_receipt`\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/transaction.py'\n```\n\nPara executar o script, você pode executar o seguinte comando em seu terminal:\n\n```bash\npython3 transaction.py\n```\n\n Se a transação for bem-sucedida, no seu terminal você verá o hash da transação impresso.\n\nVocê também pode usar o script `balances.py` para verificar se os saldos das contas de origem e recebimento foram alterados. Todo o fluxo de trabalho seria assim:\n\n![Enviar Tx Web3.py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-2.webp)\n\n## Implantar um Contrato {: #deploy-a-contract }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/contract.md'\n\n### Script de Compilação do Contrato {: #compile-contract-script }\n\nNesta seção, você criará um script que usa o compilador Solidity para gerar o bytecode e a interface (ABI) para o contrato `Incrementer.sol`. Para começar, você pode criar um arquivo `compile.py` executando:\n\n```bash\ntouch compile.py\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. Importar o pacote `solcx`\n2. **Opcional** - Se você ainda não instalou o compilador Solidity, pode fazê-lo usando a função `solcx.install_solc`\n3. Compile a função `Incrementer.sol` usando a função `solcx.compile_files`\n4. Exporte o ABI e o bytecode do contrato\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/compile.py'\n```\n\n!!! note\n    Se você vir um erro informando que `Solc não está instalado`, descomente a etapa 2 descrita no trecho de código.\n\n### Script de Implantação de Contrato {: #deploy-contract-script }\n\nCom o script para compilar o contrato `Incrementer.sol` em vigor, você pode usar os resultados para enviar uma transação assinada que o implante. Para fazer isso, você pode criar um arquivo para o script de implantação chamado `deploy.py`:\n\n```bash\ntouch deploy.py\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. Adicione importações, incluindo Web3.py e o ABI e bytecode do contrato `Incrementer.sol`\n2. [Configure o provedor Web3](#setting-up-the-web3py-provider)\n3. Defina a `account_from`, incluindo a `private_key`. A chave privada é necessária para assinar a transação. **Observação: isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo Python**\n4. Crie uma instância de contrato usando a função `web3.eth.contract` e passando o ABI e o bytecode do contrato\n5. Construa uma transação de construtor usando a instância do contrato e passando o valor a ser incrementado. Para este exemplo, você pode usar `5`. Você então usará a função `build_transaction` para passar as informações da transação, incluindo o endereço `from` e o `nonce` para o remetente. Para obter o `nonce`, você pode usar a função `web3.eth.get_transaction_count`\n6. Assine a transação usando a função `web3.eth.account.sign_transaction` e passe a transação do construtor e a `private_key` do remetente\n7. Usando a transação assinada, você pode enviá-la usando a função `web3.eth.send_raw_transaction` e esperar pelo recibo da transação usando a função `web3.eth.wait_for_transaction_receipt`\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/deploy.py'\n```\n\nPara executar o script, você pode inserir o seguinte comando em seu terminal:\n\n```bash\npython3 deploy.py\n```\n\nSe for bem-sucedido, o endereço do contrato será exibido no terminal.\n\n![Implantar Contrato Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-3.webp)\n\n### Ler Dados do Contrato (Métodos de Chamada) {: #read-contract-data }\n\nMétodos de chamada são o tipo de interação que não modifica o armazenamento do contrato (altera variáveis), o que significa que nenhuma transação precisa ser enviada. Eles simplesmente leem várias variáveis de armazenamento do contrato implantado.\n\nPara começar, você pode criar um arquivo e nomeá-lo `get.py`:\n\n```bash\ntouch get.py\n```\n\nEm seguida, você pode seguir as seguintes etapas para criar o script:\n\n1. Adicione importações, incluindo Web3.py e o ABI do contrato `Incrementer.sol`\n2. [Configure o provedor Web3](#setting-up-the-web3py-provider)\n3. Defina o `contract_address` do contrato implantado\n4. Crie uma instância de contrato usando a função `web3.eth.contract` e passando o ABI e o endereço do contrato implantado\n5. Usando a instância do contrato, você pode então chamar a função `number`\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/get.py'\n```\n\nPara executar o script, você pode inserir o seguinte comando em seu terminal:\n\n```bash\npython3 get.py\n```\n\nSe for bem-sucedido, o valor será exibido no terminal.\n\n![Ler do Contrato Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-4.webp)\n\n### Interagir com o Contrato (Enviar Métodos) {: #interact-with-contract }\n\nMétodos de envio são o tipo de interação que modificam o armazenamento do contrato (alteram variáveis), o que significa que uma transação precisa ser assinada e enviada. Nesta seção, você criará dois scripts: um para incrementar e outro para redefinir o incrementador. Para começar, você pode criar um arquivo para cada script e nomeá-los `increment.py` e `reset.py`:\n\n```bash\ntouch increment.py reset.py\n```\n\nAbra o arquivo `increment.py` e siga as seguintes etapas para criar o script:\n\n1. Adicione importações, incluindo Web3.py e o ABI do contrato `Incrementer.sol`\n2. [Configure o provedor Web3](#setting-up-the-web3py-provider)\n3. Defina a `account_from`, incluindo a `private_key`, a `contract_address` do contrato implantado e o `value` a ser incrementado. A chave privada é necessária para assinar a transação. **Observação: isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo Python**\n4. Crie uma instância de contrato usando a função `web3.eth.contract` e passando o ABI e o endereço do contrato implantado\n5. Crie a transação de incremento usando a instância do contrato e passando o valor a ser incrementado. Você então usará a função `build_transaction` para passar as informações da transação, incluindo o endereço `from` e o `nonce` para o remetente. Para obter o `nonce`, você pode usar a função `web3.eth.get_transaction_count`\n6. Assine a transação usando a função `web3.eth.account.sign_transaction` e passe a transação de incremento e a `private_key` do remetente\n7. Usando a transação assinada, você pode enviá-la usando a função `web3.eth.send_raw_transaction` e esperar pelo recibo da transação usando a função `web3.eth.wait_for_transaction_receipt`\n\n```python\n--8<-- 'code/builders/toolkit/ethereum-api/libraries/web3py/increment.py'\n```\n\nPara executar o script, você pode inserir o seguinte comando em seu terminal:\n\n```bash\npython3 increment.py\n```\n\nSe for bem-sucedido, o hash da transação será exibido no terminal. Você pode usar o script `get.py` junto com o script `increment.py` para garantir que o valor esteja mudando como esperado:\n\n![Incrementar Contrato Web3py](/images/builders/toolkit/ethereum-api/libraries/web3py/web3py-5.webp)\n\nEm seguida, você pode abrir o arquivo `reset.py` e seguir as seguintes etapas para criar o script:\n\n1. Adicione importações, incluindo Web3.py e o ABI do contrato `Incrementer.sol`\n2. [Configure o provedor Web3](#setting-up-the-web3py-provider)\n3. Defina a `account_from`, incluindo a `













```bash

```

```python






```

```python

```

```python

```
```bash

```

```bash

```

```python

```

```bash

``` bash
```

```bash

```

```python

```

```python
```bash

```

```python

```bash
```

```bash

```

```bash

```

```python

```bash

```


```bash

```

```python

```
```python

```bash
```


```python
```bash

```
```bash

```












```bash

```








```python

```








```bash

```











```python

```



```bash

```











```bash

```









```python

```



```bash

```









```bash

```











```python

```



```bash

```















```python

```



```bash

```
