---
title: How to use thirdweb
description: This guide will show you some of thirdweb's features, including building, testing, and deploying smart contract templates to launch dApps on Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/dev-env/thirdweb.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "d970641e80e85f2b28d61de63c79826de2d28aca5c772418e1b1911b0e7aab4f",
  "content": "---
title: How to use thirdweb
description: This guide will show you some of thirdweb's features, including building, testing, and deploying smart contract templates to launch dApps on Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

# Using thirdweb on Tanssi

## Introduction {: #introduction }

    ```bash

    ```

This guide will show you some of the thirdweb features you can use to develop smart contracts and dApps on Tanssi EVM networks. To check out all of the features thirdweb has to offer, please refer to the [thirdweb documentation site](https://portal.thirdweb.com){target=\\_blank}. 

## Create Contract {: #create-contract }

To create a new smart contract using the [thirdweb CLI](https://portal.thirdweb.com/cli){target=\\_blank}, follow these steps:

1. In your CLI, run the following command:

    ```bash

    npx thirdweb create contract

    ```solidity
    ```

    ```solidity

2. Input your preferences for the command line prompts:
    1. Give your project a name
    2. Choose your preferred framework: **Hardhat** or **Foundry**
    3. Name your smart contract
    4. Choose the type of base contract: **Empty**, **ERC20**, **ERC721**, or **ERC1155**
    5. Add any desired [extensions](https://portal.thirdweb.com/contracts/extensions){target=\\_blank}
3. Once created, navigate to your project’s directory and open in your preferred code editor
4. If you open the `contracts` folder, you will find your smart contract; this is your smart contract written in Solidity

    The following is code for an `ERC721Base` contract without specified extensions. It implements all of the logic inside the [`ERC721Base.sol`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol){target=\\_blank} contract; which implements the [`ERC721A`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/eip/ERC721A.sol){target=\\_blank} standard.
    ```

    ```solidity
    // SPDX-License-Identifier: MIT
    ```

    import '@thirdweb-dev/contracts/base/ERC721Base.sol';

    contract Contract is ERC721Base {
        constructor(
            string memory _name,
            string memory _symbol,
            address _royaltyRecipient,
            uint128 _royaltyBps
        ) ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {}
    }

    ```

    This contract inherits the functionality of `ERC721Base` through the following steps:

    - Importing the `ERC721Base` contract
    - Inheriting the contract by declaring that your contract is an `ERC721Base` contract
    - Implementing any required methods, such as the constructor

5. After modifying your contract with your desired custom logic, you can deploy it to a Tanssi EVM network using [Deploy](#deploy-contract). That will be covered in the next section!
5. After modifying your contract with your desired custom logic, you can deploy it to a Tanssi EVM network using [Deploy](#deploy-contract). That will be covered in the next section!

Alternatively, you can deploy a prebuilt contract for NFTs, tokens, or marketplace directly from the thirdweb Explore page:

    ```bash

    ```

    ```bash

3. Follow the on-screen prompts to configure and deploy your contract

    ```
For more information on different contracts available on Explore, check out [thirdweb’s documentation on prebuilt contracts](https://portal.thirdweb.com/contracts){target=\\_blank}.

## Deploy Contract {: #deploy-contract }

Deploy is thirdweb's tool that allows you to easily deploy a smart contract to any EVM compatible network without configuring RPC URLs, exposing your private keys, writing scripts, and other additional setup such as verifying your contract.
Deploy is thirdweb's tool that allows you to easily deploy a smart contract to any EVM compatible network without configuring RPC URLs, exposing your private keys, writing scripts, and other additional setup such as verifying your contract.

1. To deploy your smart contract using deploy, navigate to the `contracts` directory of your project and execute the following command:

    ```bash

    npx thirdweb deploy

    ```

    Executing this command will trigger the following actions:

    - Compiling all the contracts in the current directory
    - Providing the option to select which contract(s) you wish to deploy
    - Uploading your contract source code (ABI) to IPFS

    ```bash

    ```
    - `_symbol` - symbol or "ticker"
    - `_royaltyRecipient` - wallet address to receive royalties from secondary sales
    - `_royaltyBps` - basis points (bps) that will be given to the royalty recipient for each secondary sale, e.g. 500 = 5%

3. Select the desired network, e.g., the Tanssi demo EVM network or your own network
    ```bash

    ```

For additional information on Deploy, please reference [thirdweb’s documentation](https://portal.thirdweb.com/contracts/){target=\\_blank}.

## Create Application {: #create-application }

thirdweb offers SDKs for a range of programming languages, such as React, React Native, TypeScript, and Unity. You'll start off by creating an application and then you can choose which SDK to use:

1. In your CLI run the following command:

    ```bash

    npx thirdweb create --app

    ```

2. Input your preferences for the command line prompts:

    1. Give your project a name
    2. Choose your preferred framework: **Next.js**, **Vite**, or **React Native**. For this example, select **Vite**
```typescript title="client.ts"

3. Use the React or TypeScript SDK to interact with your application’s functions. This will be covered in the following section on interacting with a contract

### Specify Client ID {: #specify-client-id }

Before you launch your dApp (locally or publicly deployed), you must have a thirdweb Client ID associated with your project. A thirdweb Client ID is synonymous with an API key. You can create a free API key by [signing into your thirdweb account, navigating to **Settings**, and clicking on **API Keys**](https://thirdweb.com/dashboard/settings/api-keys){target=\\_blank}.

Press **Create API Key** then take the following steps:

1. Give your API key a name

```

3. Press **Next** and confirm the prompt on the next page

![thirdweb create API key](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-3.webp)

!!! note
    The respective name for your Client ID variable will vary with the framework you've chosen, e.g., Vite will be `VITE_TEMPLATE_CLIENT_ID`, Next.js will be `NEXT_PUBLIC_TEMPLATE_CLIENT_ID`, and React Native will be `EXPO_PUBLIC_THIRDWEB_CLIENT_ID`.

```bash

```

````typescript title="client.ts"

import { createThirdwebClient } from 'thirdweb';

// Replace this with your client ID string.
// Refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

```typescript title="chains.ts"
  clientId: clientId,
````

!!! note
If you don't create a Client ID and specify is correctly in your `.env` file, you'll get a blank screen when trying to build the web app. There is no error message shown without digging into the console, so ensure you've set your Client ID correctly first and foremost.

```
### Run Locally {: #run-locally }

To run your dApp locally for testing and debugging purposes, use the command:

```typescript title="chains.ts"

```

The app will compile and specify the localhost and port number for you to visit in your browser.

````

### Configure Chain {: #configure-chain }

    ```typescript

    ```

    import { defineChain } from 'thirdweb';
    const tanssi = defineChain({
      id: {{ networks.dancelight.demo_evm_chain_id }},
      rpc: '{{ networks.dancelight.demo_evm_rpc_url }}',

```typescript

````

```typescript

```

````

```

thirdweb distinguishes between accounts and wallets in the SDK. In the eyes of the thirdweb SDK, an account always has a single blockchain address and can sign messages, transactions, and typed data, but it cannot be "connected" or "disconnected." In contrast, a wallet contains one or more accounts, can be connected or disconnected, and delegates the signing tasks to its accounts.

````typescript

```typescript

???+ code \"initialize.ts\"

    ```typescript
    --8<-- 'code/builders/toolkit/ethereum-api/dev-env/thirdweb/initialize.ts'
    ```

### Get Contract {: #get-contract }

````

```

import { `getContract` } from 'thirdweb';
import { client } from './client';

```typescript
  chain: tanssi,
  address: 0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D, // Incrementer contract address on demo EVM network
  abi: '[{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
});
````

### Calling Contract Functions {: #calling-contract-functions }

```

````

import { `prepareContractCall`, toWei } from 'thirdweb';

```typescript
  // Pass the method signature that you want to call
  method: 'function mintTo(address to, uint256 amount)',
  // Pass the params for that method.
  // Their types are automatically inferred based on the method signature
  params: ['0x123...', toWei('100')],
});

````

````typescript

import { prepareContractCall } from 'thirdweb';

```

```typescript
  method: 'function increment()',
  // Increment takes no params so we are leaving an empty array
  params: [],
```typescript

````

### Preparing Raw Transactions {: #preparing-raw-transactions }

You can also prepare a transaction directly with encoded data. To do so, you'll use thirdweb's [`prepareTransaction` method](https://portal.thirdweb.com/typescript/v5/transactions/prepare){target=\\\_blank} and specify the `to`, `value`, `chain`, and `client` values directly.

```typescript

```

// The account that will be the receiver
```typescript

// The value is the amount of ether you want to send with the transaction
value: toWei('1'),

```typescript
  chain: tanssi,
  // Your thirdweb client
  client,
```


Use the [`readContract` function](https://portal.thirdweb.com/typescript/v5/transactions/read){target=\\\_blank} to call any read functions on your contract by passing in the Solidity method signature and any parameters.

```bash
```typescript

```
const balance = await readContract({
  contract: contract,
  method: 'function balanceOf(address) view returns (uint256)',
```bash

});

```

For a function that takes no parameters, such as the number function that returns the current number stored in the \[incrementer contract\]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D?tab=contract){target=\\\_blank}, you simply need to provide the function name as follows:

```bash

```

contract: contract,
method: 'number',

```typescript title="Prepare a transaction"

```

Did you know? With the [thirdweb CLI](https://portal.thirdweb.com/cli){target=\\\_blank}, you can easily generate functions for all of the possible calls to a contract. To do so, run the following command in the command line:

```bash

npx thirdweb generate INSERT_CHAIN_ID/INSERT_CONTRACT_ADDRESS

```

Both the chain ID and the contract address are required. As an example, if you wanted to generate the functions for the \[incrementer contract on the Tanssi demo EVM network\]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xC12f6fA2d1CA8f875bD25555e8883f1dDa40a93D?tab=contract){target=\\\_blank} , you would use the following command:
```

```typescript title="Prepare a transaction"
```

```typescript title="Send a transaction"

### Sending a Transaction {: #sending-a-transaction }

Every transaction sent using the SDK must first be prepared. This preparation process is synchronous and lightweight, requiring no network requests. Additionally, it provides type-safe definitions for your contract calls.

````

```

import { prepareTransaction, toWei } from 'thirdweb';

```typescript title="Send and Confirm a Transaction"

  to: '0x1234567890123456789012345678901234567890',
  chain: tanssi,
  client: thirdwebClient,
  value: toWei('1.0'),
  gasPrice: 150n,

````

After the transaction is prepared, you can send it as follows:

````typescript title="Send and Confirm a Transaction"

```

```typescript title="Send and Confirm a Transaction"

const { transactionHash } = await sendTransaction({
  account,
  transaction,
});

```typescript title="Estimating gas"

You can optionally use `sendAndConfirmTransaction` to wait for the transaction to be mined. This is relevant if you want to block the user from continuing until the transaction is confirmed.

````

```

````

```typescript title="Estimating gas cost"

const wallet = createWallet('io.metamask');
const account = await wallet.connect({ client });

```

  transaction,

```typescript title="Simulate a transaction"
});
````

### Transaction Utilities {: #transaction-utilites }

```
````

```typescript title="Estimating gas cost"

```typescript title="Encode transaction data"

```typescript title="Estimating gas cost"
import { estimateGas } from 'thirdweb';
````

```
const gasEstimate = await estimateGas({ transaction });
console.log('estmated gas used', gasEstimate);

````

```typescript title="Simulate a transaction"
```typescript title="ConnectButton"

You can estimate the gas cost in Ether and Wei as follows: 

```typescript title="Simulate a transaction"
import { estimateGas } from 'thirdweb';
````

const gasCost = await estimateGasCost({ transaction });
console.log('cost in ether', gasCost.ether);

````
```typescript title="Encode transaction data"

thirdweb also provides a handy way to simulate transactions and verify their integrity before actually submitting it to the blockchain. You can simulate a transaction as follows:

```typescript title="Encode transaction data"
import { simulateTransaction } from 'thirdweb';
````

```
const result = await simulateTransaction({ transaction });
console.log('simulation result', result);

````

```bash
```typescript title="ConnectButton"

```
```typescript title="Encode transaction data"

import { encode } from 'thirdweb';

```typescript title="ConnectButton"
```bash

const data = await encode(transaction);

```

````

### ConnectButton {: #connect-button }

Perhaps the first and most important interaction users will have with your dApp is connecting their wallet. thirdweb provides an easy and highly customizable way for you to enable this. thirdweb provides a highly customizable [`ConnectButton`](https://portal.thirdweb.com/react/v5/components/ConnectButton){target=\\\_blank} to tailor it to your desired wallets. The `ConnectButton` accepts an optional `wallets` parameter with an array of wallets. You can add or remove wallets from the `wallets` array to change the options available to users. thirdweb also offers a [`ConnectButton` Playground](https://thirdweb.com/dashboard/connect/playground){target=\\\_blank} to customize and view changes for the `ConnectButton` in real-time, given the button's high degree of flexibility.

```typescript title="ConnectButton"

import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
 
const wallets = [
  inAppWallet(),

```

createWallet('com.coinbase.wallet'),
createWallet('me.rainbow'),

````
 
function Example() {

```bash

    <div>

````

```bash

  );

```

```bash

```

```bash

As a reminder, you can build your example project locally by running:

```

```bash

yarn dev

```

To host your static web application on decentralized storage, run:

```bash

npx thirdweb deploy --app

```

Running this command builds your application for production and stores it using [Storage](https://portal.thirdweb.com/references/typescript/v5/functions#storage){target=\\\_blank}, thirdweb's decentralized file management solution. It uploads your built application to IPFS, a decentralized storage network, and generates a unique URL that provides a persistent hosting location for your application on the web.

If you have any further questions or encounter any issues during the process, please reach out to thirdweb support at [support.thirdweb.com](http://support.thirdweb.com){target=\\\_blank}.

## --8\<-- 'text/\_disclaimers/third-party-content.md' ", "translated_content": "--- title: Como usar o thirdweb description: Este guia mostrará algumas das funcionalidades do thirdweb, incluindo como construir, testar e implantar modelos de contrato inteligente para lançar dApps no Tanssi. icon: octicons-code-square-24 categories: EVM-Template

# Usando o thirdweb no Tanssi

## Introdução {: #introduction }

[thirdweb](https://thirdweb.com){target=\\\_blank} é uma estrutura completa de desenvolvimento Web3 que fornece tudo o que você precisa para desenvolver contratos inteligentes, criar dApps e muito mais.

Com o thirdweb, você pode acessar ferramentas para ajudá-lo em cada fase do ciclo de desenvolvimento do dApp. Você pode criar seus próprios contratos inteligentes personalizados ou usar qualquer um dos contratos pré-construídos do thirdweb para começar rapidamente. A partir daí, você pode usar o CLI do thirdweb para implantar seus contratos inteligentes. Então, você pode interagir com seus contratos inteligentes criando um aplicativo Web3 usando a linguagem de sua escolha, incluindo, mas não se limitando a, React e TypeScript.

Este guia mostrará algumas das funcionalidades do thirdweb que você pode usar para desenvolver contratos inteligentes e dApps nas redes EVM do Tanssi. Para verificar todos os recursos que o thirdweb tem a oferecer, consulte o [site de documentação do thirdweb](https://portal.thirdweb.com){target=\\\_blank}.

## Criar Contrato {: #create-contract }

Para criar um novo contrato inteligente usando o [thirdweb CLI](https://portal.thirdweb.com/cli){target=\\\_blank}, siga estas etapas:

1. No seu CLI, execute o seguinte comando:

   ```bash

   npx thirdweb create contract

   ```

1. Insira suas preferências para as solicitações da linha de comando:

   1. Dê um nome ao seu projeto
   1. Escolha sua estrutura preferida: **Hardhat** ou **Foundry**
   1. Nomeie seu contrato inteligente
   1. Escolha o tipo de contrato base: **Empty**, **ERC20**, **ERC721** ou **ERC1155**
   1. Adicione quaisquer [extensões](https://portal.thirdweb.com/contracts/extensions){target=\\\_blank} desejadas

1. Depois de criado, navegue até o diretório do seu projeto e abra no seu editor de código preferido

1. Se você abrir a pasta `contracts`, encontrará seu contrato inteligente; este é seu contrato inteligente escrito em Solidity

   O seguinte é o código para um contrato `ERC721Base` sem extensões especificadas. Ele implementa toda a lógica dentro do contrato [`ERC721Base.sol`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol){target=\\\_blank}; que implementa o padrão [`ERC721A`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/eip/ERC721A.sol){target=\\\_blank}.

   ```solidity

   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import '@thirdweb-dev/contracts/base/ERC721Base.sol';

   contract Contract is ERC721Base {
       constructor(
           string memory _name,
           string memory _symbol,
           address _royaltyRecipient,
           uint128 _royaltyBps
       ) ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {}
   }

   ```

   Este contrato herda a funcionalidade de `ERC721Base` pelas seguintes etapas:

   - Importando o contrato `ERC721Base`
   - Herdando o contrato declarando que seu contrato é um contrato `ERC721Base`
   - Implementando quaisquer métodos necessários, como o construtor

1. Depois de modificar seu contrato com sua lógica personalizada desejada, você pode implantá-lo em uma rede EVM do Tanssi usando [Implantar](#deploy-contract). Isso será abordado na próxima seção!

1. Depois de modificar seu contrato com sua lógica personalizada desejada, você pode implantá-lo em uma rede EVM do Tanssi usando [Implantar](#deploy-contract). Isso será abordado na próxima seção!

Alternativamente, você pode implantar um contrato pré-construído para NFTs, tokens ou mercado diretamente da página Explore do thirdweb:

1. Vá para a [página Explore do thirdweb](https://thirdweb.com/explore){target=\\\_blank}

   ![thirdweb Explore](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-1.webp)

1. Escolha o tipo de contrato que deseja implantar entre as opções disponíveis: NFTs, tokens, mercado e muito mais

1. Siga as instruções na tela para configurar e implantar seu contrato

Para obter mais informações sobre diferentes contratos disponíveis no Explore, consulte a [documentação do thirdweb sobre contratos pré-construídos](https://portal.thirdweb.com/contracts){target=\\\_blank}.

## Implantar Contrato {: #deploy-contract }

Implantar é a ferramenta do thirdweb que permite implantar facilmente um contrato inteligente em qualquer rede compatível com EVM sem configurar URLs RPC, expor suas chaves privadas, escrever scripts e outras configurações adicionais, como verificar seu contrato.
Implantar é a ferramenta do thirdweb que permite implantar facilmente um contrato inteligente em qualquer rede compatível com EVM sem configurar URLs RPC, expor suas chaves privadas, escrever scripts e outras configurações adicionais, como verificar seu contrato.

1. Para implantar seu contrato inteligente usando implantar, navegue até o diretório `contracts` do seu projeto e execute o seguinte comando:

   ```bash

   npx thirdweb deploy

   ```

   A execução deste comando acionará as seguintes ações:

   - Compilar todos os contratos no diretório atual
   - Fornecer a opção de selecionar quais contratos você deseja implantar
   - Carregar o código-fonte do seu contrato (ABI) para IPFS

1. Quando for concluído, ele abrirá uma interface de painel para terminar de preencher os parâmetros

   - `_name` - nome do contrato
   - `_symbol` - símbolo ou "ticker"
   - `_royaltyRecipient` - endereço da carteira para receber royalties de vendas secundárias
   - `_royaltyBps` - pontos base (bps) que serão dados ao destinatário de royalties para cada venda secundária, por exemplo, 500 = 5%

1. Selecione a rede desejada, por exemplo, a rede EVM de demonstração do Tanssi ou sua própria rede

1. Gerencie configurações adicionais no painel do seu contrato, se necessário, como carregar NFTs, configurar permissões e muito mais

   ![thirdweb deploy](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-2.webp)

Para obter informações adicionais sobre Implantar, consulte a [documentação do thirdweb](https://portal.thirdweb.com/contracts/){target=\\\_blank}.

## Criar Aplicação {: #create-application }

O thirdweb oferece SDKs para uma variedade de linguagens de programação, como React, React Native, TypeScript e Unity. Você começará criando um aplicativo e, em seguida, poderá escolher qual SDK usar:

1. No seu CLI, execute o seguinte comando:

   ```bash

   npx thirdweb create --app

   ```

1. Insira suas preferências para as solicitações da linha de comando:

   1. Dê um nome ao seu projeto
   1. Escolha sua estrutura preferida: **Next.js**, **Vite** ou **React Native**. Para este exemplo, selecione **Vite**

1. Use o SDK React ou TypeScript para interagir com as funções do seu aplicativo. Isso será abordado na seção a seguir sobre como interagir com um contrato

### Especificar ID do Cliente {: #specify-client-id }

Antes de iniciar seu dApp (implantado localmente ou publicamente), você deve ter um ID de cliente thirdweb associado ao seu projeto. Um ID de cliente thirdweb é sinônimo de uma chave de API. Você pode criar uma chave de API gratuita [entrando na sua conta thirdweb, navegando para **Configurações** e clicando em **Chaves de API**](https://thirdweb.com/dashboard/settings/api-keys){target=\\\_blank}.

Pressione **Criar chave de API** e, em seguida, siga as etapas a seguir:

1. Dê um nome à sua chave de API
1. Insira os domínios permitidos que a chave de API deve aceitar solicitações. É recomendável que você permita apenas os domínios necessários, mas, para fins de desenvolvimento, você pode selecionar **Permitir todos os domínios**
1. Pressione **Próximo** e confirme a solicitação na página seguinte

![thirdweb create API key](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-3.webp)

!!! note
O nome respectivo para sua variável de ID de cliente variará com a estrutura que você escolheu, por exemplo, Vite será `VITE_TEMPLATE_CLIENT_ID`, Next.js será `NEXT_PUBLIC_TEMPLATE_CLIENT_ID` e React Native será `EXPO_PUBLIC_THIRDWEB_CLIENT_ID`.

Finalmente, especifique seu ID de cliente (chave de API) no seu arquivo `.env`. Seu arquivo `.env` deve estar localizado no diretório raiz do projeto (por exemplo, não na pasta `src`).

Se você gerou seu aplicativo thirdweb com Vite, você terá um arquivo `client.ts` semelhante ao abaixo. Desde que você tenha criado um arquivo `.env` com sua chave de API thirdweb (ID do cliente) definida em `VITE_TEMPLATE_CLIENT_ID`, você pode deixar o `client.ts` como está e prosseguir para a próxima seção.

```typescript title="client.ts"

import { createThirdwebClient } from 'thirdweb';

// Replace this with your client ID string.
// Refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId,
});

```

!!! note
Se você não criar um ID de cliente e especificar corretamente no seu arquivo `.env`, você obterá uma tela em branco ao tentar construir o aplicativo da web. Não há mensagem de erro mostrada sem cavar no console, então certifique-se de que você configurou seu ID de cliente corretamente em primeiro lugar.

### Executar Localmente {: #run-locally }

Para executar seu dApp localmente para fins de teste e depuração, use o comando:

```bash

yarn dev

```

O aplicativo compilará e especificará o endereço localhost e o número da porta para você visitar no seu navegador.

![thirdweb run locally](/images/builders/toolkit/ethereum-api/dev-environments/thirdweb/thirdweb-4.webp)

### Configurar Cadeia {: #configure-chain }

O thirdweb oferece um pequeno número de cadeias de `@thirdweb/chains` e não inclui redes Tanssi nessa lista, então você precisará especificar os detalhes da rede, incluindo a ID da cadeia e a URL RPC. Você pode criar uma cadeia personalizada com [`defineChain`](https://portal.thirdweb.com/references/typescript/v5/defineChain){target=\\\_blank} da seguinte forma:
