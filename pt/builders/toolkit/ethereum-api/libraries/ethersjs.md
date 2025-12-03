---
title: Transações e Contratos EVM com Ethers.js
description: Aprenda a usar a biblioteca Ethers.js para enviar transações e implantar contratos Solidity na sua rede compatível com Ethereum alimentada pela Tanssi.
icon: octicons-code-24
categories: EVM-Template
---

# Biblioteca JavaScript Ethers.js

<style>.video-container{display:flex;justify-content:space-between;max-width:1000px;margin:0 auto;}.video-column{width:49%;}.embed-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin-bottom:10px;}.embed-container iframe,.embed-container object,.embed-container embed{position:absolute;top:0;left:0;width:100%;height:100%;}</style><div class="video-container"><div class="video-column"><div class='embed-container'><iframe src='https://www.youtube.com/embed/bXtknNifO78?si=Hjiah5yhKvBcsE7f' frameborder='0' allowfullscreen></iframe></div></div><div class="video-column"><div class='embed-container'><iframe src='https://www.youtube.com/embed/m9iVeCP7owI?si=krm6z9AsFCDrjlJh' frameborder='0' allowfullscreen></iframe></div></div></div>

## Introdução {: #introduction }

A biblioteca [Ethers.js](https://docs.ethers.org/v6/){target=\_blank} fornece ferramentas para interagir com nós Ethereum usando JavaScript, semelhante à [Web3.js](/pt/builders/toolkit/ethereum-api/libraries/web3js/){target=\_blank}. As redes EVM alimentadas pela Tanssi oferecem uma API compatível com Ethereum/JSON-RPC, então você pode usar Ethers.js para interagir com uma rede EVM da Tanssi como faria no Ethereum. Para mais detalhes, consulte a [documentação oficial](https://docs.ethers.org/v6){target=\_blank}.

Neste guia você aprenderá a usar Ethers.js na sua rede EVM da Tanssi. Para demonstrar, enviaremos uma transação e implantaremos um contrato em uma appchain EVM de demonstração rodando no [Dancelight](/pt/builders/tanssi-network/testnet/dancelight/){target=\_blank}. Para sua própria appchain Tanssi, basta trocar o endpoint.

Se preferir vídeo, veja os tutoriais no topo desta página sobre [Enviar transações com Ethers.js](#send-a-transaction) e [Implantar contratos com Ethers.js](#deploy-a-contract).

--8<-- 'text/_common/pt/general-js-tutorial-check.md'

## Verificando pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia você precisará:

 - De uma conta com fundos na rede EVM da Tanssi que estiver usando para testes

## Instalando Ethers.js {: #install-ethersjs }

Instale a biblioteca Ethers.js e o compilador Solidity:

=== "npm"

    ```bash
    npm install ethers solc@0.8.0
    ```

=== "yarn"

    ```bash
    yarn add ethers solc@0.8.0
    ```

## Configurando o provedor Ethers {: #setting-up-the-ethers-provider }

Os scripts a seguir usam um [provedor Ethers](https://docs.ethers.org/v6/api/providers/){target=\_blank} para falar com a rede.

1. Importe `ethers`
2. Defina `providerRPC` com `name`, `rpc` e `chainId` da rede
3. Crie o `provider` com `ethers.JsonRpcProvider`

```js
// 1. Import ethers
import { ethers } from "ethers";

// 2. Define network configurations
const providerRPC = {
  evmNetwork: {
    name: 'dancelight-evm-network',
    // Insert your RPC URL here
    rpc: '{{ networks.dancelight.demo_evm_rpc_url }}',
    chainId: {{ networks.dancelight.demo_evm_chain_id }}, // {{ networks.dancelight.demo_evm_chain_hex_id }} in hex,
  },
};
// 3. Create ethers provider
const provider = new ethers.JsonRpcProvider(
  providerRPC.evmNetwork.rpc, 
  {
    chainId: providerRPC.evmNetwork.chainId,
    name: providerRPC.evmNetwork.name,
  }
);
```

Guarde este trecho; ele é reutilizado nos scripts abaixo.

## Enviar uma transação {: #send-a-transaction }

Criaremos dois scripts: um para consultar saldos e outro para enviar a transação.

### Script de saldos {: #check-balances-script }

Crie o arquivo:

```bash
touch balances.js
```

Depois monte o script:

1. Inclua o provedor
2. Defina `addressFrom` e `addressTo`
3. Crie a função `balances`
4. Use `provider.getBalance` e `ethers.formatEther` para exibir os saldos
5. Chame `balances()`

```js
// 1. Add the Ethers provider logic here:
// {...}

// 2. Create address variables
const addressFrom = 'INSERT_ADDRESS_FROM';
const addressTo = 'INSERT_ADDRESS_TO';

// 3. Create balances function
const balances = async () => {
  // 4. Fetch balances
  const balanceFrom = ethers.formatEther(await provider.getBalance(addressFrom));
  const balanceTo = ethers.formatEther(await provider.getBalance(addressTo));

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} {{ networks.dancelight.demo_evm_token_symbol }}`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} {{ networks.dancelight.demo_evm_token_symbol }}`);
};

// 5. Chamar a função de saldos
balances();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/balances.js'
    ```

Execute:

```bash
node balances.js
```

Saldos serão exibidos em {{ networks.dancelight.demo_evm_token_symbol }}.

--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/balances.md'

### Script de envio de transação {: #send-transaction-script }

Crie o arquivo:

```bash
touch transaction.js
```

Passos:

1. Inclua o provedor
2. Defina `privateKey` e `addressTo` (**não armazene chaves reais em arquivos JS**)
3. Crie a wallet com `privateKey` e `provider`
4. Crie a função `send`
5. Monte o objeto de transação (`to`, `value` com `ethers.parseEther`)
6. Envie com `wallet.sendTransaction` e aguarde o recibo
7. Chame `send()`

```js
// 1. Add the Ethers provider logic here:
// {...}

// 2. Create account variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const addressTo = 'INSERT_ADDRESS_TO';

// 3. Create wallet
let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// 4. Create send function
const send = async () => {
  console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);

  // 5. Create tx object
  const tx = {
    to: addressTo,
    value: ethers.parseEther('1'),
  };

  // 6. Sign and send tx - wait for receipt
  const createReceipt = await wallet.sendTransaction(tx);
  await createReceipt.wait();
  console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

// 7. Chamar a função de envio
send();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/transaction.js'
    ```

Rode com:

```bash
node transaction.js
```

O hash será exibido. Use `balances.js` antes/depois para confirmar a mudança de saldo.

--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/transaction.md'

## Implantar um contrato {: #deploy-a-contract }

--8<-- 'text/builders/toolkit/ethereum-api/libraries/pt/contract.md'

### Script de compilação {: #compile-contract-script }

--8<-- 'text/builders/toolkit/ethereum-api/libraries/pt/compile.md'

### Script de deploy {: #deploy-contract-script }

Compile `Incrementer.sol` e depois crie `deploy.js`:

```bash
touch deploy.js
```

Passos:

1. Importe o contrato de `compile.js`
2. Inclua o provedor
3. Defina `privateKey` (**não salve chaves reais em JS**)
4. Guarde `bytecode` e `abi`
5. Crie a wallet
6. Crie a `ContractFactory`
7. Crie a função `deploy`
8. Use `incrementer.deploy(5)` e aguarde o recibo
9. Chame `deploy()`

```js
// 1. Import the contract file
import contractFile from './compile';

// 2. Add the Ethers provider logic here:
// {...}

// 3. Create account variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};

// 4. Save the bytecode and ABI
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// 5. Create wallet
let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// 6. Create contract instance with signer
const incrementer = new ethers.ContractFactory(abi, bytecode, wallet);

// 7. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account: ${wallet.address}`);

  // 8. Send tx (initial value set to 5) and wait for receipt
  const contract = await incrementer.deploy(5);
  const txReceipt = await contract.deploymentTransaction().wait();

  console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);
};

// 9. Chamar a função de deploy
deploy();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/deploy.js'
    ```

Execute:

```bash
node deploy.js
```

O endereço do contrato será exibido.

--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/deploy.md'

### Ler dados do contrato (calls) {: #read-contract-data }

Calls não alteram estado; nenhuma transação é enviada. Crie `get.js`:

```bash
touch get.js
```

Passos:

1. Importe o `contractFile` de `compile.js`
2. Inclua o provedor
3. Defina `contractAddress`
4. Crie a instância com `ethers.Contract`
5. Crie a função `get`
6. Chame `incrementer.number()` e exiba o valor
7. Chame `get()`

```js
// 1. Import the ABI
import contractFile from './compile';

// 2. Add the Ethers provider logic here:
// {...}

// 3. Contract address variable
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// 4. Create contract instance
const incrementer = new ethers.Contract(
  contractAddress,
  contractFile.abi,
  provider
);

// 5. Create get function
const get = async () => {
  console.log(`Fazendo uma chamada para o contrato no endereço: ${contractAddress}`);

  // 6. Chamar o contrato 
  const data = await incrementer.number();

  console.log(`The current number stored is: ${data}`);
};

// 7. Chamar a função get
get();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/get.js'
    ```

Rode com:

```bash
node get.js
```

--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/get.md'

### Interagir com o contrato (send) {: #interact-with-contract }

Sends alteram estado e exigem transação. Crie `increment.js` e `reset.js`:

```bash
touch increment.js reset.js
```

`increment.js`:

1. Importe `contractFile`
2. Inclua o provedor
3. Defina `privateKey`, `contractAddress`, `_value` (**não salve chaves reais em JS**)
4. Crie a wallet
5. Crie a instância do contrato com signer
6. Crie a função `increment`
7. Chame `incrementer.increment(_value)` e aguarde recibo
8. Chame `increment()`

```js
// 1. Import the contract ABI
import contractFile from './compile';

// 2. Add the Ethers provider logic here:
// {...}

// 3. Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';
const _value = 3;

// 4. Create wallet
let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// 5. Create contract instance with signer
const incrementer = new ethers.Contract(
  contractAddress,
  contractFile.abi,
  wallet
);

// 6. Create increment function
const increment = async () => {
  console.log(
    `Chamando a função de incremento por ${_value} no contrato no endereço: ${contractAddress}`
  );

  // 7. Sign and send tx and wait for receipt
  const createReceipt = await incrementer.increment(_value);
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

// 8. Chamar a função de incremento
increment();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/increment.js'
    ```

`reset.js`:

1. Importe `contractFile`
2. Inclua o provedor
3. Defina `privateKey` e `contractAddress`
4. Crie a wallet
5. Crie a instância do contrato com signer
6. Crie a função `reset`
7. Chame `incrementer.reset()` e aguarde recibo
8. Chame `reset()`

```js
// 1. Import the contract ABI
import contractFile from './compile';

// 2. Add the Ethers provider logic here:
// {...}

// 3. Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// 4. Create wallet
let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// 5. Create contract instance with signer
const incrementer = new ethers.Contract(
  contractAddress,
  contractFile.abi,
  wallet
);

// 6. Create reset function
const reset = async () => {
  console.log(`Chamando a função de reset no contrato no endereço: ${contractAddress}`);

  // 7. sign and send tx and wait for receipt
  const createReceipt = await incrementer.reset();
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

// 8. Chamar a função de reset
reset();
```

??? code "Ver o script completo"

    ```js
    --8<-- 'code/builders/toolkit/ethereum-api/libraries/ethersjs/reset.js'
    ```

Rode:

```bash
node increment.js
node reset.js
```

Use `get.js` junto para confirmar a mudança de valor.

--8<-- 'code/builders/toolkit/ethereum-api/libraries/ethers/terminal/reset.md'

--8<-- 'text/_disclaimers/third-party-content.pt.md'
