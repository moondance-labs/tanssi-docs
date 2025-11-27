---
title: EVM Transactions & Contracts with Web3.js
description: Learn how to use the Ethereum Web3 JavaScript Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered EVM-compatible network.
icon: octicons-code-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/libraries/web3js.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "129c107f25df72dd76fe408a7af468a9cc31c78c13a5ab9e71d56aa41bab8a60",
  "content": "---\ntitle: EVM Transactions & Contracts with Web3.js\ndescription: Learn how to use the Ethereum Web3 JavaScript Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered EVM-compatible network.\nicon: octicons-code-24\ncategories: EVM-Template\n---\n\n# Biblioteca JavaScript Web3.js\n\n## Introdução {: #introduction }\n\n[Web3.js](https://web3js.readthedocs.io){target=\\_blank} é um conjunto de bibliotecas que permite aos desenvolvedores interagir com os nós Ethereum usando os protocolos HTTP, IPC ou WebSocket com JavaScript. As redes EVM com tecnologia Tanssi têm uma API semelhante à Ethereum que é totalmente compatível com as invocações JSON RPC em estilo Ethereum. Portanto, os desenvolvedores podem alavancar essa compatibilidade e usar a biblioteca Web3.js para interagir com um nó de rede EVM Tanssi como se estivessem fazendo isso no Ethereum. Para obter mais informações sobre Web3.js, consulte o seu [site de documentação](https://web3js.readthedocs.io/en/v1.10.0){target=\\_blank}.\n\nNeste guia, você aprenderá como configurar a biblioteca Web3.js para sua rede EVM Tanssi. Em seguida, para mostrar a biblioteca em ação, você usará a biblioteca Web3.js para enviar uma transação e implantar um contrato em uma rede EVM de demonstração Tanssi em execução em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\_blank}. Este guia pode ser adaptado para sua própria rede EVM Tanssi, simplesmente alterando o endpoint.\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n## Verificando Pré-requisitos {: #checking-prerequisites }\n\nPara os exemplos deste guia, você precisará ter o seguinte:\n\n- Uma conta com fundos na rede EVM Tanssi que você está testando\n\n## Instalando Web3Js {: #installing-web3js }\n\nPara este guia, você precisará instalar a biblioteca Web3.js e o compilador Solidity. Para instalar ambos os pacotes NPM, você pode executar o seguinte comando:\n\n=== \"npm\"\n\n    ```bash\n    npm install web3 solc@0.8.0\n    ```\n\n=== \"yarn\"\n\n    ```bash\n    yarn add web3 solc@0.8.0\n    ```\n\n## Configurando o Provedor Web3 {: #setting-up-the-web3-provider }\n\nAo longo deste guia, você criará um monte de scripts que fornecem diferentes funcionalidades, como enviar uma transação, implantar um contrato e interagir com um contrato implantado. Na maioria desses scripts, você precisará criar um provedor Web3.js para interagir com a rede.\n\nPara configurar um provedor Web3, você pode seguir estas etapas:\n\n1. Importe a biblioteca `Web3`.\n2. Crie o provedor Web3 e especifique a URL RPC. Você pode configurar o Web3.js para trabalhar com a rede EVM de demonstração Tanssi em execução no Dancelight ou em sua própria rede EVM Tanssi, simplesmente alterando o endpoint.\n\n```js\n// 1. Importe o Web3\nconst Web3 = require('web3');\n\n// 2. Crie o provedor Web3 e insira sua URL RPC\nconst web3 = new Web3(\n  '{{ networks.dancelight.demo_evm_rpc_url }}'\n);\n```\n\nSalve este trecho de código, pois você precisará dele para os scripts que são usados nas seções a seguir.\n\n## Enviar uma Transação {: #send-a-transaction }\n\nDurante esta seção, você criará alguns scripts. O primeiro será para verificar os saldos de suas contas antes de tentar enviar uma transação. O segundo script realmente enviará a transação.\n\nVocê também pode usar o script de saldo para verificar os saldos da conta depois que a transação for enviada.\n\n### Script de Verificação de Saldos {: #check-balances-script }\n\nVocê precisará apenas de um arquivo para verificar os saldos dos dois endereços antes e depois que a transação for enviada. Para começar, você pode criar um arquivo `balances.js` executando:\n\n```bash\ntouch balances.js\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. [Configure o provedor Web3](#setting-up-the-web3-provider)\n2. Defina as variáveis `addressFrom` e `addressTo`\n3. Crie a função assíncrona `balances` que envolve o método `web3.eth.getBalance`\n4. Use a função `web3.eth.getBalance` para buscar os saldos para os endereços `addressFrom` e `addressTo`. Você também pode aproveitar a função `web3.utils.fromWei` para transformar o saldo em um número mais legível em `{{ networks.dancelight.demo_evm_token_symbol }}`\n5. Por fim, execute a função `balances`\n\n```js\n// 1. Adicione a lógica do provedor Web3 aqui:\n// {...}\n\n// 2. Crie variáveis de endereço\nconst addressFrom = 'INSERIR_ENDEREÇO_DE';\nconst addressTo = 'INSERIR_ENDEREÇO_PARA';\n\n// 3. Crie a função de saldos\nconst balances = async () => {\n  // 4. Buscar informações de saldo\n  const balanceFrom = web3.utils.fromWei(\n    await web3.eth.getBalance(addressFrom),\n    'ether'\n  );\n  const balanceTo = web3.utils.fromWei(\n    await web3.eth.getBalance(addressTo),\n    'ether'\n  );\n\n  console.log(`O saldo de ${addressFrom} é: ${balanceFrom} {{ networks.dancelight.demo_evm_token_symbol }}`);\n  console.log(`O saldo de ${addressTo} é: ${balanceTo} {{ networks.dancelight.demo_evm_token_symbol }}`);\n};\n\n// 5. Chamar a função de saldos\nbalances();\n```\n\n??? code \"Visualizar o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/balances.js'\n    ```\n\nPara executar o script e buscar os saldos da conta, você pode executar o seguinte comando:\n\n```bash\nnode balances.js\n```\n\nSe for bem-sucedido, os saldos do endereço de origem e de recebimento serão exibidos em seu terminal em ETH.\n\n![Verificar saldo Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-1.webp)\n\n### Script de Envio de Transação {: #send-transaction-script }\n\nVocê precisará apenas de um arquivo para executar uma transação entre contas. Para este exemplo, você transferirá 1 token {{ networks.dancelight.demo_evm_token_symbol }} de um endereço de origem (do qual você possui a chave privada) para outro endereço. Para começar, você pode criar um arquivo `transaction.js` executando:\n\n```bash\ntouch transaction.js\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. [Configure o provedor Web3](#setting-up-the-web3-provider)\n2. Defina `addressFrom`, incluindo a `privateKey`, e as variáveis `addressTo`. A chave privada é necessária para criar uma instância de carteira. **Observação: isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**\n3. Crie a função assíncrona `send`, que envolve o objeto de transação, e as funções de assinatura e envio de transação\n4. Crie e assine a transação usando a função `web3.eth.accounts.signTransaction`. Passe o `gas`, `addressTo` e `value` para a transação junto com a `privateKey` do remetente\n5. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para esperar até que a transação seja processada e o recibo da transação seja retornado\n6. Por fim, execute a função `send`\n\n```js\n// 1. Adicione a lógica do provedor Web3 aqui:\n// {...}\n\n// 2. Crie variáveis de conta\nconst accountFrom = {\n  privateKey: 'INSERIR_SUA_CHAVE_PRIVADA',\n  address: 'INSERIR_ENDEREÇO_PÚBLICO_DA_CHAVE_PRIVADA',\n};\nconst addressTo = 'INSERIR_ENDEREÇO_PARA'; // Alterar para endereço\n\n// 3. Crie a função enviar\nconst send = async () => {\n  console.log(\n    `Tentando enviar a transação de ${accountFrom.address} para ${addressTo}`\n  );\n\n  // 4. Assinar tx com PK\n  const createTransaction = await web3.eth.accounts.signTransaction(\n    {\n      gas: 21000,\n      to: addressTo,\n      value: web3.utils.toWei('1', 'ether'),\n    },\n    accountFrom.privateKey\n  );\n\n  // 5. Enviar tx e esperar pelo recibo\n  const createReceipt = await web3.eth.sendSignedTransaction(\n    createTransaction.rawTransaction\n  );\n  console.log(\n    `Transação bem-sucedida com hash: ${createReceipt.transactionHash}`\n  );\n};\n\n// 6. Chamar a função enviar\nsend();\n```\n\n??? code \"Visualizar o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/transaction.js'\n    ```\n\nPara executar o script, você pode executar o seguinte comando em seu terminal:\n\n```bash\nnode transaction.js\n```\n\nSe a transação for bem-sucedida, no terminal, você verá o hash da transação impresso.\n\nVocê também pode usar o script `balances.js` para verificar se os saldos das contas de origem e de recebimento foram alterados. Todo o fluxo de trabalho seria assim:\n\n![Enviar Tx Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-2.webp)\n\n## Implantar um Contrato {: #deploy-a-contract }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/contract.md'\n\n### Script de Compilação de Contrato {: #compile-contract-script }\n\n--8<-- 'text/builders/toolkit/ethereum-api/libraries/compile.md'\n\n### Script de Implantação de Contrato {: #deploy-contract-script }\n\nCom o script para compilar o contrato `Incrementer.sol` em vigor, você pode usar os resultados para enviar uma transação assinada que o implanta. Para fazer isso, você pode criar um arquivo para o script de implantação chamado `deploy.js`:\n\n```bash\ntouch deploy.js\n```\n\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\n\n1. Importe o arquivo de contrato de `compile.js`\n2. [Configure o provedor Web3](#setting-up-the-web3-provider)\n3. Defina as variáveis `addressFrom`, incluindo a `privateKey`, e as variáveis `addressTo`. A chave privada é necessária para criar uma instância de carteira. **Observação: isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**\n4. Salve o `bytecode` e `abi` para o contrato compilado\n5. Crie a função assíncrona `deploy` que será usada para implantar o contrato\n6. Crie a instância do contrato usando a função `web3.eth.Contract`\n7. Crie o construtor e passe o `bytecode` e o valor inicial para o incrementador. Para este exemplo, você pode definir o valor inicial como `5`\n8. Crie e assine a transação usando a função `web3.eth.accounts.signTransaction`. Passe o `data` e o `gas` para a transação junto com a `privateKey` do remetente\n9. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para esperar até que a transação seja processada e o recibo da transação seja retornado\n10. Por fim, execute a função `deploy`\n\n```js\n// 1. Importe o arquivo de contrato\nconst contractFile = require('./compile');\n\n// 2. Adicione a lógica do provedor Web3 aqui:\n// {...}\n\n// 3. Crie variáveis de endereço\nconst accountFrom = {\n  privateKey: 'INSERIR_CHAVE_PRIVADA',\n  address: 'INSERIR_ENDEREÇO_PÚBLICO_DA_CHAVE_PRIVADA',\n};\n\n// 4. Obtenha o bytecode e a API\nconst bytecode = contractFile.evm.bytecode.object;\nconst abi = contractFile.abi;\n\n// 5. Criar função de implantação\nconst deploy = async () => {\n  console.log(`Tentando implantar da conta ${accountFrom.address}`);\n\n  // 6. Criar instância de contrato\n  const incrementer = new web3.eth.Contract(abi);\n\n  // 7. Criar tx do construtor\n  const incrementerTx = incrementer.deploy({\n    data: bytecode,\n    arguments: [5],\n  });\n\n  // 8. Assinar transação e enviar\n  const createTransaction = await web3.eth.accounts.signTransaction(\n    {\n      data: incrementerTx.encodeABI(),\n      gas: await incrementerTx.estimateGas(),\n    },\n    accountFrom.privateKey\n  );\n\n  // 9. Enviar tx e esperar pelo recibo\n  const createReceipt = await web3.eth.sendSignedTransaction(\n    createTransaction.rawTransaction\n  );\n  console.log(`Contrato implantado no endereço: ${createReceipt.contractAddress}`);\n};\n\n// 10. Chamar a função de implantação\ndeploy();\n```\n\n??? code \"Visualizar o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/deploy.js'\n    ```\n\nPara executar o script, você pode inserir o seguinte comando em seu terminal:\n\n```bash\nnode deploy.js\n```\n\nSe for bem-sucedido, o endereço do contrato será exibido no terminal.\n\n![Implantar contrato Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-3.webp)\n\n### Ler Dados do Contrato (Chamar Métodos) {: #read-contract-data }\n\nMétodos de chamada são o tipo de interações que não modificam o armazenamento do contrato (alteram variáveis), o que significa que nenhuma transação precisa ser enviada. Eles simplesmente leem várias variáveis de armazenamento do contrato implantado.\n\nPara começar, você pode criar um arquivo e nomeá-lo `get.js`:\n\n```bash\ntouch get.js\n```\n\nEm seguida, você pode seguir estas etapas para criar o script:\n\n1. Importe o `abi` do arquivo `compile.js`\n2. [Configure o provedor Web3](#setting-up-the-web3-provider)\n3. Crie a variável `contractAddress` usando o endereço do contrato implantado\n4. Crie uma instância do contrato usando a função `web3.eth.Contract` e passando o `abi` e `contractAddress`\n5. Crie a função assíncrona `get`\n6. Use a instância do contrato para chamar um dos métodos do contrato e passe quaisquer entradas, se necessário. Para este exemplo, você chamará o método `number`, que não requer nenhuma entrada. Você pode usar `await`, que retornará o valor solicitado assim que a promessa da solicitação for resolvida\n7. Por fim, chame a função `get`\n\n```js\n// 1. Importar o abi do contrato\nconst { abi } = require('./compile');\n\n// 2. Adicione a lógica do provedor Web3 aqui:\n// {...}\n\n// 3. Criar variáveis de endereço\nconst contractAddress = 'INSERIR_ENDEREÇO_DO_CONTRATO';\n\n// 4. Criar instância de contrato\nconst incrementer = new web3.eth.Contract(abi, contractAddress);\n\n// 5. Criar função get\nconst get = async () => {\n  console.log(`Fazendo uma chamada para o contrato no endereço: ${contractAddress}`);\n\n  // 6. Chamar contrato\n  const data = await incrementer.methods.number().call();\n\n  console.log(`O número atual armazenado é: ${data}`);\n};\n\n// 7. Chamar a função get\nget();\n```\n\n??? code \"Visualizar o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/get.js'\n    ```\n\nPara executar o script, você pode inserir o seguinte comando em seu terminal:\n\n```bash\nnode get.js\n```\n\nSe for bem-sucedido, o valor será exibido no terminal.\n\n![Obter o valor da variável do contrato Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-4.webp)\n\n### Interagir com o Contrato (Enviar Métodos) {: #interact-with-contract }\n\nMétodos de envio são o tipo de interações que modificam o armazenamento do contrato (alteram variáveis), o que significa que uma transação precisa ser assinada e enviada. Nesta seção, você criará dois scripts: um para incrementar e outro para redefinir o incrementador. Para começar, você pode criar um arquivo para cada script e nomeá-los `increment.js` e `reset.js`:\n\n```bash\ntouch increment.js reset.js\n```\n\nAbra o arquivo `increment.js` e siga as seguintes etapas para criar o script:\n\n1. Importe o `abi` do arquivo `compile.js`\n2. [Configure o provedor Web3](#setting-up-the-web3-provider)\n3. Defina o `privateKey` para a conta de origem, o `contractAddress` do contrato implantado e o `_value` para incrementar. A chave privada é necessária para criar uma instância de carteira. **Observação: isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**\n4. Crie uma instância do contrato usando a função `web3.eth.Contract` e passando o `abi` e `contractAddress`\n5. Use a instância do contrato para construir a transação de incremento usando a função `methods.increment` e passando o `_value` como uma entrada\n6. Crie a função assíncrona `increment`\n7. Use a instância do contrato e a transação de incremento que você criou anteriormente para assinar a transação com a chave privada do remetente. Você usará a função `web3.eth.accounts.signTransaction` e especificará o endereço `to`, o `data` e o `gas` para a transação\n8. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para esperar até que a transação seja processada e o recibo da transação seja retornado\n9. Por fim, chame a função `increment`\n\n```js\n// 1. Importar o abi do contrato\nconst { abi } = require('./compile');\n\n// 2. Adicione a lógica do provedor Web3 aqui:\n// {...}\n\n// 3. Criar variáveis\nconst accountFrom = {\n  privateKey: 'INSERIR_SUA_CHAVE_PRIVADA',\n};\nconst contractAddress = 'INSERIR_ENDEREÇO_DO_CONTRATO';\nconst _value = 3;\n\n// 4. Criar instância de contrato\nconst incrementer = new web3.eth.Contract(abi, contractAddress);\n\n// 5. Construir tx de incremento\nconst incrementTx = incrementer.methods.increment(_value);\n\n// 6. Criar função de incremento\nconst increment = async () => {\n  console.log(\n    `Chamando a função de incremento em ${_value} no contrato no endereço: ${contractAddress}`\n  );\n\n  // 7. Assinar Tx com PK\n  const createTransaction = await web3.eth.accounts.signTransaction(\n    {\n      to: contractAddress,\n      data: incrementTx.encodeABI(),\n      gas: await incrementTx.estimateGas(),\n    },\n    accountFrom.privateKey\n  );\n\n  // 8. Enviar Tx e Aguardar Recibo\n  const createReceipt = await web3.eth.sendSignedTransaction(\n    createTransaction.rawTransaction\n  );\n  console.log(`Tx bem-sucedida com hash: ${createReceipt.transactionHash}`);\n};\n\n// 9. Chamar a função de incremento\nincrement();\n```\n\n??? code \"Visualizar o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/increment.js'\n    ```\n\nPara executar o script, você pode inserir o seguinte comando em seu terminal:\n\n```bash\nnode increment.js\n```\n\nSe for bem-sucedido, o hash da transação será exibido no terminal. Você pode usar o script `get.js` junto com o script `increment.js` para garantir que o valor esteja mudando conforme o esperado.\n\n![Incrementar e verificar o valor Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-5.webp)\n\nEm seguida, você pode abrir o arquivo `reset.js` e seguir as seguintes etapas para criar o script:\n\n1. Importe o `abi` do arquivo `compile.js`\n2. [Configure o provedor Web3](#setting-up-the-web3-provider)\n3. Defina o `privateKey` para a conta de origem e o `contractAddress` do contrato implantado. A chave privada é necessária para criar uma instância de carteira. **Observação: isso é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**\n4. Crie uma instância do contrato usando a função `web3.eth.Contract` e passando o `abi` e `contractAddress`\n5. Use a instância do contrato para construir a transação de redefinição usando a função `methods.reset`\n6. Crie a função assíncrona `reset`\n7. Use a instância do contrato e a transação de redefinição que você criou anteriormente para assinar a transação com a chave privada do remetente. Você usará a função `web3.eth.accounts.signTransaction` e especificará o endereço `to`, o `data` e o `gas` para a transação\n8. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para esperar até que a transação seja processada e o recibo da transação seja retornado\n9. Por fim, chame a função `reset`\n\n```js\n// 1. Importar o abi do contrato\nconst { abi } = require('./compile');\n\n// 2. Adicione a lógica do provedor Web3 aqui:\n// {...}\n\n// 3. Criar variáveis\nconst accountFrom = {\n  privateKey: 'INSERIR_SUA_CHAVE_PRIVADA',\n};\nconst contractAddress = 'INSERIR_ENDEREÇO_DO_CONTRATO';\n\n// 4. Criar instância de contrato\nconst incrementer = new web3.eth.Contract(abi, contractAddress);\n\n// 5. Construir tx de redefinição\nconst resetTx = incrementer.methods.reset();\n\n// 6. Criar função de redefinição\nconst reset = async () => {\n  console.log(\n    `Chamando a função de redefinição no contrato no endereço: ${contractAddress}`\n  );\n\n  // 7. Assinar tx com PK\n  const createTransaction = await web3.eth.accounts.signTransaction(\n    {\n      to: contractAddress,\n      data: resetTx.encodeABI(),\n      gas: await resetTx.estimateGas(),\n    },\n    accountFrom.privateKey\n  );\n\n  // 8. Enviar tx e esperar pelo recibo\n  const createReceipt = await web3.eth.sendSignedTransaction(\n    createTransaction.rawTransaction\n  );\n  console.log(`Tx bem-sucedida com hash: ${createReceipt.transactionHash}`);\n};\n\n// 9. Chamar a função de redefinição\nreset();\n```\n\n??? code \"Visualizar o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/reset.js'\n    ```\n\nPara executar o script, você pode inserir o seguinte comando em seu terminal:\n\n```bash\nnode reset.js\n```\n\nSe for bem-sucedido, o hash da transação será exibido no terminal. Você pode usar o script `get.js` junto com o script `reset.js` para garantir que o valor esteja mudando conforme o esperado.\n\n![Redefinir contrato Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-6.webp)\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "```json\n{\n  \"source_path\": \"builders/toolkit/ethereum-api/libraries/web3js.md\",\n  \"source_language\": \"EN\",\n  \"target_language\": \"PT\",\n  \"checksum\": \"129c107f25df72dd76fe408a7af468a9cc31c78c13a5ab9e71d56aa41bab8a60\",\n  \"content\": \"---\\ntitle: EVM Transactions & Contracts with Web3.js\\ndescription: Learn how to use the Ethereum Web3 JavaScript Library to send transactions and deploy Solidity smart contracts to your Tanssi-powered EVM-compatible network.\\nicon: octicons-code-24\\ncategories: EVM-Template\\n---\\n\\n# Biblioteca JavaScript Web3.js\\n\\n## Introdução {: #introduction }\\n\\n[Web3.js](https://web3js.readthedocs.io){target=\\_blank} é um conjunto de bibliotecas que permite aos desenvolvedores interagir com os nós Ethereum usando os protocolos HTTP, IPC ou WebSocket com JavaScript. As redes EVM com tecnologia Tanssi têm uma API semelhante à Ethereum que é totalmente compatível com as invocações JSON RPC em estilo Ethereum. Portanto, os desenvolvedores podem alavancar essa compatibilidade e usar a biblioteca Web3.js para interagir com um nó de rede EVM Tanssi como se estivessem fazendo isso no Ethereum. Para obter mais informações sobre Web3.js, consulte o seu [site de documentação](https://web3js.readthedocs.io/en/v1.10.0){target=\\_blank}.\\n\\nNeste guia, você aprenderá como configurar a biblioteca Web3.js para sua rede EVM Tanssi. Em seguida, para mostrar a biblioteca em ação, você usará a biblioteca Web3.js para enviar uma transação e implantar um contrato em uma rede EVM de demonstração Tanssi em execução em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\_blank}. Este guia pode ser adaptado para sua própria rede EVM Tanssi, simplesmente alterando o endpoint.\\n\\n--8<-- 'text/_common/general-js-tutorial-check.md'\\n\\n## Verificando Pré-requisitos {: #checking-prerequisites }\\n\\nPara os exemplos deste guia, você precisará ter o seguinte:\\n\\n- Uma conta com fundos na rede EVM Tanssi que você está testando\\n\\n## Instalando Web3Js {: #installing-web3js }\\n\\nPara este guia, você precisará instalar a biblioteca Web3.js e o compilador Solidity. Para instalar ambos os pacotes NPM, você pode executar o seguinte comando:\\n\\n=== \\\"npm\\\"\\n\\n    ```bash\\n    npm install web3 solc@0.8.0\\n    ```\\n\\n=== \\\"yarn\\\"\\n\\n    ```bash\\n    yarn add web3 solc@0.8.0\\n    ```\\n\\n## Configurando o Provedor Web3 {: #setting-up-the-web3-provider }\\n\\nAo longo deste guia, você criará um monte de scripts que fornecem diferentes funcionalidades, como enviar uma transação, implantar um contrato e interagir com um contrato implantado. Na maioria desses scripts, você precisará criar um provedor Web3.js para interagir com a rede.\\n\\nPara configurar um provedor Web3, você pode seguir estas etapas:\\n\\n1. Importe a biblioteca `Web3`.\\n2. Crie o provedor Web3 e especifique a URL RPC. Você pode configurar o Web3.js para trabalhar com a rede EVM de demonstração Tanssi em execução no Dancelight ou em sua própria rede EVM Tanssi, simplesmente alterando o endpoint.\\n\\n```js\\n// 1. Importe o Web3\\nconst Web3 = require('web3');\\n\\n// 2. Crie o provedor Web3 e insira sua URL RPC\\nconst web3 = new Web3(\\n  '{{ networks.dancelight.demo_evm_rpc_url }}'\\n);\n```\n\nSalve este trecho de código, pois você precisará dele para os scripts que são usados nas seções a seguir.\\n\\n## Enviar uma Transação {: #send-a-transaction }\\n\\nDurante esta seção, você criará alguns scripts. O primeiro será para verificar os saldos de suas contas antes de tentar enviar uma transação. O segundo script realmente enviará a transação.\\n\\nVocê também pode usar o script de saldo para verificar os saldos da conta depois que a transação for enviada.\\n\\n### Script de Verificação de Saldos {: #check-balances-script }\\n\\nVocê precisará apenas de um arquivo para verificar os saldos dos dois endereços antes e depois que a transação for enviada. Para começar, você pode criar um arquivo `balances.js` executando:\\n\\n```bash\\ntouch balances.js\\n```\\n\\nEm seguida, você criará o script para este arquivo e concluirá as seguintes etapas:\\n\\n1. [Configure o provedor Web3](#setting-up-the-web3-provider)\\n2. Defina as variáveis `addressFrom` e `addressTo`\\n3. Crie a função assíncrona `balances` que envolve o método `web3.eth.getBalance`\\n4. Use a função `web3.eth.getBalance` para buscar os saldos para os endereços `addressFrom` e `addressTo`. Você também pode aproveitar a função `web3.utils.fromWei` para transformar o saldo em um número mais legível em `{{ networks.dancelight.demo_evm_token_symbol }}`\\n5. Por fim, execute a função `balances`\\n\\n```js\\n// 1. Adicione a lógica do provedor Web3 aqui:\\n// {...}\\n\\n// 2. Crie variáveis de endereço\\nconst addressFrom = 'INSERIR_ENDEREÇO_DE';\\nconst addressTo = 'INSERIR_ENDEREÇO_PARA';\\n\\n// 3. Crie a função de saldos\\nconst balances = async () => {\\n  // 4. Buscar informações de saldo\\n  const balanceFrom = web3.utils.fromWei(\\n    await web3.eth.getBalance(addressFrom),\\n    'ether'\\n  );\\n  const balanceTo = web3.utils.fromWei(\\n    await web3.eth.getBalance(addressTo),\\n    'ether'\\n  );\\n\\n  console.log(`O saldo de ${addressFrom} é: ${balanceFrom} {{ networks.dancelight.demo_evm_token_symbol }}`);\\n  console.log(`O saldo de ${addressTo} é: ${balanceTo} {{ networks.dancelight.demo_evm_token_symbol }}`);\\n};\n\n// 5. Chamar a função de saldos\\nbalances();\n```\n\n??? code \"Visualizar o script completo\"\n\n    ```js\n    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/balances.js'\n    ```\n\nPara executar o script e buscar os saldos da conta, você pode executar o seguinte comando:\\n\\n```bash\\nnode balances.js\\n```\\n\\nSe for bem-sucedido, os saldos do endereço de origem e















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

```js

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
