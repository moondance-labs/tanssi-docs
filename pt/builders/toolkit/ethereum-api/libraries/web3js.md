---
title: Transações e Contratos EVM com Web3.js
description: Aprenda a usar a biblioteca Ethereum Web3.js para enviar transações e implantar contratos Solidity na sua rede EVM compatível com a Tanssi.
icon: octicons-code-24
categories: EVM-Template
---

# Biblioteca JavaScript Web3.js

## Introdução {: #introduction }

[Web3.js](https://web3js.readthedocs.io){target=\_blank} é um conjunto de bibliotecas que permite interagir com nós Ethereum via HTTP, IPC ou WebSocket em JavaScript. As redes EVM da Tanssi expõem uma API compatível com Ethereum/JSON-RPC, então você pode usar Web3.js para falar com um nó EVM da Tanssi como se estivesse no Ethereum. Consulte a [documentação](https://web3js.readthedocs.io/en/v1.10.0){target=\_blank} para mais detalhes.

Neste guia você configura o Web3.js para sua rede EVM da Tanssi e usa a biblioteca para enviar uma transação e implantar um contrato em uma rede de demonstração executando no [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}. Para sua rede, basta trocar o endpoint.

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

## Verificando pré-requisitos {: #checking-prerequisites }

Você precisará:

- De uma conta com fundos na rede EVM Tanssi usada nos testes

## Instalando Web3.js {: #installing-web3js }

Instale Web3.js e o compilador Solidity:

=== "npm"

    ```bash
    npm install web3 solc@0.8.0
    ```

=== "yarn"

    ```bash
    yarn add web3 solc@0.8.0
    ```

## Configurando o provedor Web3 {: #setting-up-the-web3-provider }

Os scripts a seguir usam um provedor Web3 para se conectar à rede.

1. Importe `Web3`.
2. Crie o provedor definindo a URL RPC (altere para sua rede quando necessário).

```js
// 1. Importe o Web3
const Web3 = require('web3');

// 2. Crie o provider do Web3 e insira sua URL RPC
const web3 = new Web3(
  '{{ networks.dancelight.demo_evm_rpc_url }}'
);
```

Guarde este trecho; ele será reutilizado.

## Enviar uma transação {: #send-a-transaction }

Dois scripts: um para consultar saldos e outro para enviar a transação.

### Script de saldos {: #check-balances-script }

Crie o arquivo:

```bash
touch balances.js
```

Passos:

1. Inclua o provedor Web3.
2. Defina `addressFrom` e `addressTo`.
3. Crie `balances()`.
4. Use `web3.eth.getBalance` + `web3.utils.fromWei` para exibir em {{ networks.dancelight.demo_evm_token_symbol }}.
5. Chame `balances()`.

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

??? code "Visualizar o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/balances.js'
    ```

Execute:

```bash
node balances.js
```

![Verificar saldo Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-1.webp)

### Script de envio de transação {: #send-transaction-script }

Crie o arquivo:

```bash
touch transaction.js
```

Passos:

1. Inclua o provedor Web3.
2. Defina `addressFrom` (com `privateKey`) e `addressTo`. **Não armazene chaves reais em arquivos JS.**
3. Crie `send()` para assinar e enviar.
4. Assine com `web3.eth.accounts.signTransaction` (gas, to, value).
5. Envie com `web3.eth.sendSignedTransaction` e aguarde recibo.
6. Chame `send()`.

```js
// 1. Adicione aqui a lógica do provider do Web3:
// {...}

// 2. Crie as variáveis da conta
const accountFrom = {
  privateKey: 'INSERIR_SUA_CHAVE_PRIVADA',
  address: 'INSERIR_ENDERECO_PUBLICO_DA_CHAVE',
};
const addressTo = 'INSERIR_ENDERECO_PARA'; // Altere para o endereço desejado

// 3. Crie a função de envio
const send = async () => {
  console.log(
    `Tentando enviar a transação de ${accountFrom.address} para ${addressTo}`
  );

  // 4. Assine a tx com a chave privada
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      gas: 21000,
      to: addressTo,
      value: web3.utils.toWei('1', 'ether'),
    },
    accountFrom.privateKey
  );

  // 5. Envie a tx e aguarde o recibo
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(
    `Transação bem-sucedida com hash: ${createReceipt.transactionHash}`
  );
};

// 6. Chame a função de envio
send();
```

??? code "Visualizar o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/transaction.js'
    ```

Execute:

```bash
node transaction.js
```

![Enviar Tx Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-2.webp)

## Implantar um contrato {: #deploy-a-contract }

--8<-- 'text/pt/builders/toolkit/ethereum-api/libraries/contract.md'

### Script de compilação {: #compile-contract-script }

--8<-- 'text/pt/builders/toolkit/ethereum-api/libraries/compile.md'

### Script de deploy {: #deploy-contract-script }

Compile `Incrementer.sol` e crie `deploy.js`:

```bash
touch deploy.js
```

Passos:

1. Importe o contrato de `compile.js`.
2. Inclua o provedor Web3.
3. Defina `addressFrom`/`privateKey`. **Não salve chaves reais em JS.**
4. Guarde `bytecode` e `abi`.
5. Crie `deploy()`.
6. Instancie o contrato: `new web3.eth.Contract(abi)`.
7. Construa o deploy com `deploy({ data: bytecode, arguments: [5] })`.
8. Assine com `web3.eth.accounts.signTransaction` (data, gas).
9. Envie com `web3.eth.sendSignedTransaction` e aguarde recibo.
10. Chame `deploy()`.

```js
// 1. Importe o arquivo do contrato
const contractFile = require('./compile');

// 2. Adicione aqui a lógica do provider do Web3:
// {...}

// 3. Crie as variáveis de endereço
const accountFrom = {
  privateKey: 'INSERIR_CHAVE_PRIVADA',
  address: 'INSERIR_ENDERECO_PUBLICO_DA_CHAVE_PRIVADA',
};

// 4. Obtenha o bytecode e o ABI
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// 5. Crie a função de deploy
const deploy = async () => {
  console.log(`Tentando implantar da conta ${accountFrom.address}`);

  // 6. Crie a instância do contrato
  const incrementer = new web3.eth.Contract(abi);

  // 7. Crie a tx do construtor
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

  // 9. Envie a tx e aguarde o recibo
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Contrato implantado no endereço: ${createReceipt.contractAddress}`);
};

// 10. Chamar a função de deploy
deploy();
```

??? code "Visualizar o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/deploy.js'
    ```

Execute:

```bash
node deploy.js
```

![Implantar contrato Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-3.webp)

### Ler dados do contrato (calls) {: #read-contract-data }

Calls não mudam estado; não precisam de transação. Crie `get.js`:

```bash
touch get.js
```

Passos:

1. Importe `abi` de `compile.js`.
2. Inclua o provedor Web3.
3. Defina `contractAddress`.
4. Instancie: `new web3.eth.Contract(abi, contractAddress)`.
5. Crie `get()`.
6. Chame `incrementer.methods.number().call()` e exiba.
7. Chame `get()`.

```js
// 1. Importe o ABI do contrato
const { abi } = require('./compile');

// 2. Adicione aqui a lógica do provider do Web3:
// {...}

// 3. Endereço do contrato
const contractAddress = 'INSERIR_ENDERECO_DO_CONTRATO';

// 4. Crie a instância do contrato
const incrementer = new web3.eth.Contract(abi, contractAddress);

// 5. Crie a função get
const get = async () => {
  console.log(`Fazendo uma chamada para o contrato no endereço: ${contractAddress}`);

  // 6. Chamar o contrato
  const data = await incrementer.methods.number().call();

  console.log(`O número atual armazenado é: ${data}`);
};

// 7. Chamar a função get
get();
```

??? code "Visualizar o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/get.js'
    ```

Execute:

```bash
node get.js
```

![Obter valor Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-4.webp)

### Interagir com o contrato (sends) {: #interact-with-contract }

Sends mudam estado, exigem transação. Crie `increment.js` e `reset.js`:

```bash
touch increment.js reset.js
```

`increment.js`:

1. Importe `abi`.
2. Inclua o provedor.
3. Defina `privateKey`, `contractAddress`, `_value` (**não salve chaves reais em JS**).
4. Instancie o contrato.
5. Construa `incrementTx = incrementer.methods.increment(_value)`.
6. Crie `increment()`.
7. Assine com `signTransaction` (to, data, gas) e envie com `sendSignedTransaction`.
8. Aguarde recibo; exiba o hash.
9. Chame `increment()`.

??? code "Visualizar o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/increment.js'
    ```

`reset.js` segue o mesmo padrão, mas chamando `reset()` sem argumentos:

??? code "Visualizar reset.js"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/web3js/reset.js'
    ```

Execute:

```bash
node increment.js
node reset.js
```

Use `get.js` junto para confirmar as mudanças.

![Redefinir contrato Web3js](/images/builders/toolkit/ethereum-api/libraries/web3js/web3js-6.webp)

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
