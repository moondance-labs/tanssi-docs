---
title: Transações e Contratos EVM com Web3.js
description: Aprenda a usar a biblioteca Ethereum Web3.js para enviar transações e implantar contratos inteligentes Solidity na sua rede EVM compatível e powered by Tanssi.
icon: octicons-code-24
categories: EVM-Template
---

# Biblioteca JavaScript Web3.js

## Introdução {: #introduction }

[Web3.js](https://web3js.readthedocs.io){target=\_blank} é um conjunto de bibliotecas que permite que desenvolvedores interajam com nós Ethereum usando os protocolos HTTP, IPC ou WebSocket em JavaScript. As redes EVM powered by Tanssi têm uma API semelhante à do Ethereum, totalmente compatível com chamadas JSON RPC no estilo Ethereum. Portanto, os desenvolvedores podem aproveitar essa compatibilidade e usar a biblioteca Web3.js para interagir com um nó EVM da Tanssi como se estivessem no Ethereum. Para saber mais sobre Web3.js, consulte o [site de documentação](https://web3js.readthedocs.io/en/v1.10.0){target=\_blank}.

Neste guia, você aprenderá a configurar a biblioteca Web3.js para sua rede EVM da Tanssi. Em seguida, para mostrar a biblioteca em ação, você usará Web3.js para enviar uma transação e implantar um contrato em uma rede EVM de demonstração da Tanssi executando no [Dancelight](/pt/builders/tanssi-network/testnet/dancelight/){target=\_blank}. Este guia pode ser adaptado para sua própria rede EVM da Tanssi simplesmente trocando o endpoint.

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

## Verificando Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará de:

- Uma conta com fundos na rede EVM da Tanssi que estiver usando nos testes

## Instalando Web3Js {: #installing-web3js }

Para este guia, instale a biblioteca Web3.js e o compilador Solidity. Para instalar ambos os pacotes NPM, execute:

=== "npm"

    ```bash
    npm install web3 solc@0.8.0
    ```

=== "yarn"

    ```bash
    yarn add web3 solc@0.8.0
    ```

## Configurando o Provedor Web3 {: #setting-up-the-web3-provider }

Ao longo deste guia, você criará vários scripts com funções diferentes, como enviar uma transação, implantar um contrato e interagir com um contrato implantado. Na maioria desses scripts, você precisará criar um provedor Web3.js para interagir com a rede.

Para configurar um provedor Web3, siga estes passos:

1. Importe a biblioteca `Web3`.
2. Crie o provedor Web3 e defina a URL RPC. Você pode configurar Web3.js para funcionar com a rede EVM de demonstração da Tanssi executando na Dancelight ou com sua própria rede EVM da Tanssi apenas alterando o endpoint.

```js
// 1. Importe o Web3
const Web3 = require('web3');

// 2. Crie o provider do Web3 e insira sua URL RPC
const web3 = new Web3(
  '{{ networks.dancelight.demo_evm_rpc_url }}'
);
```

Guarde este snippet, pois ele será necessário nos scripts usados nas seções a seguir.

## Enviar uma Transação {: #send-a-transaction }

Nesta seção, você criará alguns scripts. O primeiro verificará os saldos de suas contas antes de tentar enviar uma transação. O segundo script enviará a transação.

Você também pode usar o script de saldo para verificar os saldos após a transação ser enviada.

### Script para verificar saldos {: #check-balances-script }

Basta um arquivo para verificar os saldos dos dois endereços antes e depois da transação. Para começar, crie o arquivo `balances.js` executando:

```bash
touch balances.js
```

Em seguida, crie o script deste arquivo seguindo estes passos:

1. [Configure o provedor Web3](#setting-up-the-web3-provider)
2. Defina as variáveis `addressFrom` e `addressTo`
3. Crie a função assíncrona `balances`, que envolve o método `web3.eth.getBalance`
4. Use a função `web3.eth.getBalance` para buscar os saldos dos endereços `addressFrom` e `addressTo`. Você também pode usar `web3.utils.fromWei` para transformar o saldo em um número mais legível em `{{ networks.dancelight.demo_evm_token_symbol }}`
5. Por fim, execute a função `balances`

```js
// 1. Adicione aqui a lógica do provider do Web3:
// {...}

// 2. Crie as variáveis de endereço
const addressFrom = 'INSERIR_ENDERECO_DE';
const addressTo = 'INSERIR_ENDERECO_PARA';

// 3. Crie a função de saldos
const balances = async () => {
  // 4. Busque as informações de saldo
  const balanceFrom = web3.utils.fromWei(
    await web3.eth.getBalance(addressFrom),
    'ether'
  );
  const balanceTo = web3.utils.fromWei(
    await web3.eth.getBalance(addressTo),
    'ether'
  );

  console.log(`O saldo de ${addressFrom} é: ${balanceFrom} {{ networks.dancelight.demo_evm_token_symbol }}`);
  console.log(`O saldo de ${addressTo} é: ${balanceTo} {{ networks.dancelight.demo_evm_token_symbol }}`);
};

// 5. Chamar a função de saldos
balances();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/balances.js'
    ```

Para executar o script e buscar os saldos das contas, rode:

```bash
node balances.js
```

Se funcionar, os saldos dos endereços de origem e destino serão exibidos no terminal em ETH.

![Verificar saldo no Web3.js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-1.webp)

### Script para Enviar Transação {: #send-transaction-script }

Você só precisa de um arquivo para executar uma transação entre contas. Neste exemplo, você transferirá 1 token {{ networks.dancelight.demo_evm_token_symbol }} de um endereço de origem (do qual você possui a chave privada) para outro endereço. Para começar, crie o arquivo `transaction.js` executando:

```bash
touch transaction.js
```

Em seguida, crie o script deste arquivo seguindo estes passos:

1. [Configure o provedor Web3](#setting-up-the-web3-provider)
2. Defina `addressFrom`, incluindo a `privateKey`, e a variável `addressTo`. A chave privada é necessária para criar uma instância de carteira. **Nota: isto é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**
3. Crie a função assíncrona `send`, que encapsula o objeto de transação e as funções de assinar e enviar a transação
4. Crie e assine a transação usando a função `web3.eth.accounts.signTransaction`. Informe o `gas`, o `addressTo` e o `value` da transação, além da `privateKey` do remetente
5. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para aguardar o processamento e o retorno do recibo da transação
6. Por fim, execute a função `send`

```js
// 1. Adicione aqui a lógica do provider do Web3:
// {...}

// 2. Crie as variáveis de conta
const accountFrom = {
  privateKey: 'INSIRA_SUA_CHAVE_PRIVADA',
  address: 'INSIRA_O_ENDERECO_PUBLICO_DA_CHAVE',
};
const addressTo = 'INSERIR_ENDERECO_PARA'; // Alterar para o endereço desejado

// 3. Crie a função send
const send = async () => {
  console.log(
    `Tentando enviar transação de ${accountFrom.address} para ${addressTo}`
  );

  // 4. Assine a transação com a chave privada
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      gas: 21000,
      to: addressTo,
      value: web3.utils.toWei('1', 'ether'),
    },
    accountFrom.privateKey
  );

  // 5. Envie a transação e aguarde o recibo
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(
    `Transação bem-sucedida com hash: ${createReceipt.transactionHash}`
  );
};

// 6. Chame a função send
send();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/transaction.js'
    ```

Para executar o script, rode o seguinte comando no terminal:

```bash
node transaction.js
```

Se a transação for bem-sucedida, o hash será exibido no terminal.

Você também pode usar o script `balances.js` para verificar se os saldos das contas de origem e destino mudaram. O fluxo completo ficaria assim:

![Enviar transação no Web3.js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-2.webp)

## Implantar um Contrato {: #deploy-a-contract }

--8<-- 'text/pt/builders/toolkit/ethereum-api/libraries/contract.md'

### Script para Compilar o Contrato {: #compile-contract-script }

--8<-- 'text/pt/builders/toolkit/ethereum-api/libraries/compile.md'

### Script para Implantar o Contrato {: #deploy-contract-script }
Com o script para compilar o contrato `Incrementer.sol` pronto, você pode usar os resultados para enviar uma transação assinada que o implanta. Para isso, crie um arquivo para o script de implantação chamado `deploy.js`:

```bash
touch deploy.js
```

Em seguida, crie o script deste arquivo seguindo estes passos:

1. Importe o arquivo do contrato a partir de `compile.js`
2. [Configure o provedor Web3](#setting-up-the-web3-provider)
3. Defina as variáveis `addressFrom`, incluindo a `privateKey`, e `addressTo`. A chave privada é necessária para criar uma instância de carteira. **Nota: isto é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**
4. Salve o `bytecode` e o `abi` do contrato compilado
5. Crie a função assíncrona `deploy` que será usada para implantar o contrato
6. Crie a instância do contrato usando a função `web3.eth.Contract`
7. Crie o builder e passe o `bytecode` e o valor inicial do incrementer. Neste exemplo, defina o valor inicial como `5`
8. Crie e assine a transação usando a função `web3.eth.accounts.signTransaction`. Informe o `data` e o `gas` da transação, além da `privateKey` do remetente
9. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para aguardar o processamento e o retorno do recibo
10. Por fim, execute a função `deploy`

```js
// 1. Importe o arquivo do contrato
const contractFile = require('./compile');

// 2. Adicione aqui a lógica do provider do Web3:
// {...}

// 3. Crie as variáveis de endereço
const accountFrom = {
  privateKey: 'INSERIR_CHAVE_PRIVADA',
  address: 'INSERIR_ENDERECO_PUBLICO_DA_CHAVE',
};

// 4. Obtenha o bytecode e o ABI
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// 5. Crie a função deploy
const deploy = async () => {
  console.log(`Tentando implantar a partir da conta ${accountFrom.address}`);

  // 6. Crie a instância do contrato
  const incrementer = new web3.eth.Contract(abi);

  // 7. Crie a transação do builder
  const incrementerTx = incrementer.deploy({
    data: bytecode,
    arguments: [5],
  });

  // 8. Assine a transação e envie
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      data: incrementerTx.encodeABI(),
      gas: await incrementerTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 9. Envie a transação e aguarde o recibo
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Contrato implantado no endereço: ${createReceipt.contractAddress}`);
};

// 10. Chame a função deploy
deploy();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/deploy.js'
    ```

Para executar o script, digite o seguinte comando no terminal:

```bash
node deploy.js
```

Se der certo, o endereço do contrato será exibido no terminal.

![Implantar contrato com Web3.js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-3.webp)

### Ler Dados do Contrato (métodos de chamada) {: #read-contract-data }

Métodos de chamada são interações que não modificam o armazenamento do contrato (não alteram variáveis), portanto nenhuma transação precisa ser enviada. Eles simplesmente leem variáveis de armazenamento do contrato implantado.

Para começar, crie um arquivo chamado `get.js`:

```bash
touch get.js
```

Depois, siga estes passos para criar o script:

1. Importe o `abi` do arquivo `compile.js`
2. [Configure o provedor Web3](#setting-up-the-web3-provider)
3. Crie a variável `contractAddress` usando o endereço do contrato implantado
4. Crie uma instância do contrato usando a função `web3.eth.Contract` e passando o `abi` e o `contractAddress`
5. Crie a função assíncrona `get`
6. Use a instância do contrato para chamar um dos métodos do contrato e passe os inputs necessários. Neste exemplo, você chamará o método `number`, que não requer entradas. Use `await`, que retornará o valor solicitado quando a promessa for resolvida
7. Por fim, chame a função `get`

```js
// 1. Importe o abi do contrato
const { abi } = require('./compile');

// 2. Adicione aqui a lógica do provider do Web3:
// {...}

// 3. Crie as variáveis de endereço
const contractAddress = 'INSERIR_ENDERECO_DO_CONTRATO';

// 4. Crie a instância do contrato
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 5. Crie a função get
const get = async () => {
  console.log(`Fazendo uma chamada ao contrato no endereço: ${contractAddress}`);

  // 6. Chame o contrato
  const data = await incrementer.methods.number().call();

  console.log(`O número armazenado atualmente é: ${data}`);
};

// 7. Chame a função get
get();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/get.js'
    ```

Para executar o script, digite o seguinte comando no terminal:

```bash
node get.js
```

Se der certo, o valor será exibido no terminal.

![Ler valor do contrato no Web3.js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-4.webp)

### Interagir com o Contrato (métodos de envio) {: #interact-with-contract }

Métodos de envio são interações que modificam o armazenamento do contrato (alteram variáveis), portanto uma transação precisa ser assinada e enviada. Nesta seção, você criará dois scripts: um para incrementar e outro para resetar o incrementer. Para começar, crie um arquivo para cada script e nomeie-os `increment.js` e `reset.js`:

```bash
touch increment.js reset.js
```

Abra o arquivo `increment.js` e siga estes passos para criar o script:

1. Importe o `abi` do arquivo `compile.js`
2. [Configure o provedor Web3](#setting-up-the-web3-provider)
3. Defina a `privateKey` da conta de origem, o `contractAddress` do contrato implantado e o `_value` pelo qual incrementar. A chave privada é necessária para criar uma instância de carteira. **Nota: isto é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**
4. Crie uma instância do contrato usando a função `web3.eth.Contract` e passando o `abi` e o `contractAddress`
5. Use a instância do contrato para construir a transação de incremento usando a função `methods.increment` e passando `_value` como entrada
6. Crie a função assíncrona `increment`
7. Use a instância do contrato e a transação de incremento criada para assinar a transação com a chave privada do remetente. Use a função `web3.eth.accounts.signTransaction` e especifique o endereço `to`, o `data` e o `gas` da transação
8. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para aguardar o processamento e o retorno do recibo
9. Por fim, chame a função `increment`

```js
// 1. Importe o abi do contrato
const { abi } = require('./compile');

// 2. Adicione aqui a lógica do provider do Web3:
// {...}

// 3. Crie as variáveis
const accountFrom = {
  privateKey: 'INSIRA_SUA_CHAVE_PRIVADA',
};
const contractAddress = 'INSERIR_ENDERECO_DO_CONTRATO';
const _value = 3;

// 4. Crie a instância do contrato
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 5. Monte a transação de incremento
const incrementTx = incrementer.methods.increment(_value);

// 6. Crie a função increment
const increment = async () => {
  console.log(
    `Chamando a função increment de ${_value} no contrato no endereço: ${contractAddress}`
  );

  // 7. Assine a transação com a chave privada
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: incrementTx.encodeABI(),
      gas: await incrementTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 8. Envie a transação e aguarde o recibo
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Transação bem-sucedida com hash: ${createReceipt.transactionHash}`);
};

// 9. Chame a função increment
increment();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/increment.js'
    ```

Para executar o script, digite o seguinte comando no terminal:

```bash
node increment.js
```

Se der certo, o hash da transação será exibido no terminal. Você pode usar o script `get.js` junto com o `increment.js` para garantir que o valor esteja mudando como esperado.

![Incrementar e conferir valor no Web3.js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-5.webp)

Em seguida, abra o arquivo `reset.js` e siga estes passos para criar o script:

1. Importe o `abi` do arquivo `compile.js`
2. [Configure o provedor Web3](#setting-up-the-web3-provider)
3. Defina a `privateKey` da conta de origem e o `contractAddress` do contrato implantado. A chave privada é necessária para criar uma instância de carteira. **Nota: isto é apenas para fins de exemplo. Nunca armazene suas chaves privadas em um arquivo JavaScript**
4. Crie uma instância do contrato usando a função `web3.eth.Contract` e passando o `abi` e o `contractAddress`
5. Use a instância do contrato para montar a transação de reset usando a função `methods.reset`
6. Crie a função assíncrona `reset`
7. Use a instância do contrato e a transação de reset criada para assinar a transação com a chave privada do remetente. Use a função `web3.eth.accounts.signTransaction` e especifique o endereço `to`, o `data` e o `gas` da transação
8. Envie a transação assinada usando o método `web3.eth.sendSignedTransaction` e passe a transação bruta. Em seguida, use `await` para aguardar o processamento e o retorno do recibo
9. Por fim, chame a função `reset`

```js
// 1. Importe o abi do contrato
const { abi } = require('./compile');

// 2. Adicione aqui a lógica do provider do Web3:
// {...}

// 3. Crie as variáveis
const accountFrom = {
  privateKey: 'INSIRA_SUA_CHAVE_PRIVADA',
};
const contractAddress = 'INSERIR_ENDERECO_DO_CONTRATO';

// 4. Crie a instância do contrato
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 5. Monte a transação de reset
const resetTx = incrementer.methods.reset();

// 6. Crie a função reset
const reset = async () => {
  console.log(
    `Chamando a função reset no contrato no endereço: ${contractAddress}`
  );

  // 7. Assine a transação com a chave privada
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: resetTx.encodeABI(),
      gas: await resetTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // 8. Envie a transação e aguarde o recibo
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Transação bem-sucedida com hash: ${createReceipt.transactionHash}`);
};

// 9. Chame a função reset
reset();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/reset.js'
    ```

Para executar o script, digite o seguinte comando no terminal:

```bash
node reset.js
```

Se der certo, o hash da transação será exibido no terminal. Você pode usar o script `get.js` junto com o `reset.js` para garantir que o valor esteja mudando como esperado.

![Resetar contrato no Web3.js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-6.webp)

--8<-- 'text/_disclaimers/third-party-content.md'
