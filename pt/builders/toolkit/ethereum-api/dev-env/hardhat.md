---
title: Deploy Contracts with Hardhat
description: Learn how to use Hardhat, an Ethereum development environment, to compile, deploy, and interact with Solidity smart contracts on your Tanssi EVM network.
icon: octicons-code-square-24
categories: EVM-Template
---

## { "source_path": "builders/toolkit/ethereum-api/dev-env/hardhat.md", "source_language": "EN", "target_language": "PT", "checksum": "d19fd3209476ccf89f4583b7606a1fff10b0afcdf5b1263b194e7e8e797779e5", "content": "--- title: Deploy Contracts with Hardhat description: Learn how to use Hardhat, an Ethereum development environment, to compile, deploy, and interact with Solidity smart contracts on your Tanssi EVM network. icon: octicons-code-square-24 categories: EVM-Template

# Using Hardhat to Deploy to Your EVM Network

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/1Kbs7dxkjJQ?si=n0ipTN2nbvqISLGu' frameborder='0' allowfullscreen></iframe></div>

<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introduction {: #introduction }

[Hardhat](https://hardhat.org){target=\_blank} is an Ethereum development environment that helps developers manage and automate the recurring tasks inherent to building smart contracts and dApps. Hardhat can be used with any EVM network to build, compile, and deploy smart contracts, thanks to the seamless compatibility of Tanssi-powered EVM networks.

This guide will cover how to use Hardhat to compile, deploy, and interact with Ethereum smart contracts deployed to the demo Tanssi EVM network. This guide can be adapted for your own Tanssi-powered EVM network by simply adding the RPC URL of your Tanssi network to your EVM Wallet and switching networks to it.

````
```sh

````

## Checking Prerequisites {: #checking-prerequisites }

````

```
    ```sh

    ```

## Creating a Hardhat Project {: #creating-a-hardhat-project }

    ```sh

    ```

You must create a Hardhat project if you don't already have one. You can create one by completing the following steps:
\`\`\`
    ```sh

1. Create a directory for your project

    ```
   ```sh

   ```

    ```sh

    ```

   ```sh

   ````

1. Install Hardhat

   ```sh

   ```

1. Create a project

   ```sh

   ```
```sh

        `npx` is used to run executables installed locally in your project. Although Hardhat can be installed globally, installing it locally in each project is recommended so you can control the version on a project-by-project basis.

```
```sh

5. A menu will appear allowing you to create a new project or use a sample project. For this example, you can choose **Create an empty hardhat.config.js**

```
```sh

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/create.md'

```

This will create a Hardhat config file (`hardhat.config.js`) in your project directory.
```sh

````
```

```sh

````

```sh
```

Additionally, you'll need to install the `hardhat-ignition-ethers` plugin to enable deployment of smart contracts with Hardhat Ignition. You can install it with the following command:

```
```solidity

```sh

```

## The Contract File {: #the-contract-file }

````

With your empty project created, you will create a `contracts` directory next. You can do so by running the following command:

```sh

````

The smart contract that you'll deploy as an example will be called `Box`, it will let you store a value that can be retrieved later. In the `contracts` directory, you can create the `Box.sol` file:

````solidity

```sh

touch Box.sol

````

```
Open the file and add the following contract to it:

```solidity

// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

```js
contract Box {
    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

```

function store(uint256 newValue) public {
    value = newValue;
    emit ValueChanged(newValue);

```

````

    // Reads the last stored value
    function retrieve() public view returns (uint256) {

```js
```

}

````

````js

## The Hardhat Configuration File {: #hardhat-configuration-file }

Before you can deploy the contract to your Tanssi network, you'll need to modify the Hardhat configuration file and create a secure file to store your private key in.

```sh
You can modify the `hardhat.config.js` file to use either the Tanssi demo EVM network or your own Tanssi network:
```

```js

// 1. Import the Ethers and Hardhat Ignition plugins required to interact with the contract
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition-ethers');

// 2. Add your private key that is funded with tokens of your Tanssi network
// This is for example purposes only - **never store your private keys in a JavaScript file**
const privateKey = 'INSERT_PRIVATE_KEY';

module.exports = {
```sh

````
```

solidity: '0.8.1',
networks: {
// 4. Add the network specification for your Tanssi EVM network

````

      url: '{{ networks.dancelight.demo_evm_rpc_url }}',
      chainId: {{ networks.dancelight.demo_evm_chain_id }}, // Fill in the EVM ChainID for your Tanssi network
      accounts: [privateKey]

```js

  }

```

```sh


```

```sh

npx hardhat compile

```

```sh

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/compile.md'

```

After compilation, an `artifacts` directory is created: it holds the bytecode and metadata of the contract, which are `.json` files. Adding this directory to your `.gitignore` is a good idea.

```sh

```

To set up the proper file structure for your Ignition module, create a folder named `ignition` and a subdirectory called `modules`.  Then add a new file to it called `Box.js`. You can take all three of these steps with the following command:

````sh

mkdir ignition ignition/modules && touch ignition/modules/Box.js

    ```js

    ```

1. Import the `buildModule` function from the Hardhat Ignition module

    ```js

    ```

````

6. Return an object from the module. This makes the `Box` contract accessible for interaction in Hardhat tests and scripts
    ```js

```sh
    ```


To run the script and deploy the `Box.sol` contract, use the following command, which requires you to specify the network name as defined in your `hardhat.config.js`. Hardhat will deploy the contract to a local hardhat network by default if you don't specify a network.

```sh
npx hardhat ignition deploy ./ignition/modules/Box.js --network dancelight
```

```js
```sh

```

--8\<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/deploy.md'

```sh

```

````

```js
````

To interact with your newly deployed contract on your Tanssi network, you can launch the Hardhat `console` by running:
\`\`\`

````sh
npx hardhat console --network dancelight
    ```js

    ```
1. Create a local instance of the `Box.sol` contract

    ```js

    ```

    ```js

    const box = await Box.attach('0xa84caB60db6541573a091e5C622fB79e175E17be');

    ```js

    ```

```js
````

Your EVM account will sign the transaction and broadcast it to the network. The output should look similar to:

--8\<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/interact.md'

```js

```

await box.retrieve();

````

You should see `5` or the value you initially stored.

!!! note
    If you run the retrieve command immediately after storing the value, you may see the old value. Rerunning the retrieval command after waiting a moment will return the correct value.

Congratulations, you have successfully deployed and interacted with a contract using Hardhat!

--8<-- 'text/_disclaimers/third-party-content.md'

",
  "translated_content": "---
title: Implantar Contratos com Hardhat
description: Aprenda como usar o Hardhat, um ambiente de desenvolvimento Ethereum, para compilar, implantar e interagir com contratos inteligentes Solidity na sua rede Tanssi EVM.
icon: octicons-code-square-24
categories: EVM-Template
---

# Usando Hardhat para Implantar na Sua Rede EVM

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/1Kbs7dxkjJQ?si=n0ipTN2nbvqISLGu' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introdução {: #introduction }

[Hardhat](https://hardhat.org){target=\_blank} é um ambiente de desenvolvimento Ethereum que ajuda os desenvolvedores a gerenciar e automatizar as tarefas recorrentes inerentes à construção de contratos inteligentes e dApps. O Hardhat pode ser usado com qualquer rede EVM para construir, compilar e implantar contratos inteligentes, graças à compatibilidade perfeita das redes EVM alimentadas por Tanssi.

Este guia abordará como usar o Hardhat para compilar, implantar e interagir com contratos inteligentes Ethereum implantados na rede demo Tanssi EVM. Este guia pode ser adaptado para a sua própria rede EVM alimentada por Tanssi, simplesmente adicionando a URL RPC da sua rede Tanssi à sua Carteira EVM e alternando as redes para ela.

## Verificação dos Pré-requisitos {: #checking-prerequisites }

Para este guia, você precisará ter o MetaMask instalado e configurado para funcionar com sua rede Tanssi EVM. Você pode seguir [este guia para configurar o MetaMask para Tanssi com a rede demo EVM](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

## Criando um Projeto Hardhat {: #creating-a-hardhat-project }

Você deve criar um projeto Hardhat se ainda não tiver um. Você pode criar um concluindo as seguintes etapas:

1. Crie um diretório para seu projeto

    ```sh

    mkdir hardhat && cd hardhat

    ```

2. Inicialize o projeto, que criará um arquivo `package.json`

    ```sh

    npm init -y

    ```

3. Instale o Hardhat

    ```sh

    npm install hardhat

    ```

4. Crie um projeto

    ```sh

    npx hardhat init

    ```

    !!! note
        `npx` é usado para executar executáveis instalados localmente em seu projeto. Embora o Hardhat possa ser instalado globalmente, é recomendável instalá-lo localmente em cada projeto para que você possa controlar a versão em cada projeto individualmente.

5. Um menu aparecerá, permitindo que você crie um novo projeto ou use um projeto de exemplo. Para este exemplo, você pode escolher **Create an empty hardhat.config.js** (Criar um hardhat.config.js vazio)

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/create.md'

Isso criará um arquivo de configuração do Hardhat (`hardhat.config.js`) no diretório do seu projeto.

Depois de ter seu projeto Hardhat, você também pode instalar o [plugin Ethers](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=\_blank}. Isso fornece uma maneira conveniente de usar a biblioteca [Ethers.js](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank} para interagir com a rede. Para instalá-lo, execute o seguinte comando:

```sh

npm install @nomicfoundation/hardhat-ethers ethers

````

Além disso, você precisará instalar o plugin `hardhat-ignition-ethers` para habilitar a implantação de contratos inteligentes com o Hardhat Ignition. Você pode instalá-lo com o seguinte comando:

```sh

npm install --save-dev @nomicfoundation/hardhat-ignition-ethers

```

## O Arquivo de Contrato {: #the-contract-file }

Com seu projeto vazio criado, você criará um diretório `contracts` em seguida. Você pode fazer isso executando o seguinte comando:

```sh

mkdir contracts && cd contracts

```

O contrato inteligente que você implantará como exemplo será chamado `Box`, ele permitirá que você armazene um valor que pode ser recuperado mais tarde. No diretório `contracts`, você pode criar o arquivo `Box.sol`:

```sh

touch Box.sol

```

Abra o arquivo e adicione o seguinte contrato a ele:

```solidity

// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Box {
    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}

```

## O Arquivo de Configuração do Hardhat {: #hardhat-configuration-file }

Antes de poder implantar o contrato em sua rede Tanssi, você precisará modificar o arquivo de configuração do Hardhat e criar um arquivo seguro para armazenar sua chave privada.

Você pode modificar o arquivo `hardhat.config.js` para usar a rede demo Tanssi EVM ou sua própria rede Tanssi:

```js

// 1. Import the Ethers and Hardhat Ignition plugins required to interact with the contract
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition-ethers');

// 2. Add your private key that is funded with tokens of your Tanssi network
// This is for example purposes only - **never store your private keys in a JavaScript file**
const privateKey = 'INSERT_PRIVATE_KEY';

module.exports = {
  // 3. Specify the Solidity version
  solidity: '0.8.1',
  networks: {
    // 4. Add the network specification for your Tanssi EVM network
    dancelight: {
      url: '{{ networks.dancelight.demo_evm_rpc_url }}',
      chainId: {{ networks.dancelight.demo_evm_chain_id }}, // Fill in the EVM ChainID for your Tanssi network
      accounts: [privateKey]
    }
  }
};

```

Parabéns! Você está pronto para a implantação!

## Compilando Solidity {: #compiling-solidity }

Para compilar o contrato, você pode simplesmente executar:

```sh

npx hardhat compile

```

--8\<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/compile.md'

Após a compilação, um diretório `artifacts` é criado: ele contém o bytecode e os metadados do contrato, que são arquivos `.json`. Adicionar este diretório ao seu `.gitignore` é uma boa ideia.

## Implantando o Contrato {: #deploying-the-contract }

Para implantar o contrato, você usará o Hardhat Ignition, uma estrutura declarativa para implantar contratos inteligentes. O Hardhat Ignition foi projetado para facilitar o gerenciamento de tarefas recorrentes em torno da implantação e teste de contratos inteligentes. Para obter mais informações, certifique-se de verificar os [documentos do Hardhat Ignition](https://hardhat.org/ignition/docs/getting-started#overview){target=\_blank}.

Para configurar a estrutura de arquivos adequada para seu módulo Ignition, crie uma pasta chamada `ignition` e um subdiretório chamado `modules`. Em seguida, adicione um novo arquivo a ele chamado `Box.js`. Você pode seguir todas as três etapas com o seguinte comando:

```sh

mkdir ignition ignition/modules && touch ignition/modules/Box.js

```

Em seguida, você pode escrever seu módulo Hardhat Ignition. Para começar, siga estas etapas:

1. Importe a função `buildModule` do módulo Hardhat Ignition
1. Exporte um módulo usando `buildModule`
1. Use o método `getAccount` para selecionar a conta de implantação
1. Especifique configurações personalizadas de preço e limite de gás para a implantação
1. Implante o contrato `Box`
1. Retorne um objeto do módulo. Isso torna o contrato `Box` acessível para interação em testes e scripts do Hardhat

```js

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/Box.js'

```

Para executar o script e implantar o contrato `Box.sol`, use o seguinte comando, que exige que você especifique o nome da rede, conforme definido em seu `hardhat.config.js`. O Hardhat implantará o contrato em uma rede Hardhat local por padrão, se você não especificar uma rede.

```sh

npx hardhat ignition deploy ./ignition/modules/Box.js --network dancelight

```

Você será solicitado a confirmar a rede na qual deseja implantar. Após alguns segundos após a confirmação, o contrato é implantado e você verá o endereço do contrato no terminal. Se você estiver implantando em outra rede Tanssi, certifique-se de especificar a rede correta. O nome da rede deve corresponder à forma como está definido em `hardhat.config.js`. Após alguns segundos, o contrato é implantado e você deve ver o endereço no terminal.

--8\<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/deploy.md'

Parabéns, seu contrato está ativo! Salve o endereço, pois você o usará para interagir com esta instância do contrato na próxima etapa.

## Interagindo com o Contrato {: #interacting-with-the-contract }

Para interagir com seu contrato recém-implantado em sua rede Tanssi, você pode iniciar o `console` do Hardhat executando:

```sh

npx hardhat console --network dancelight

```

Em seguida, você pode seguir estas etapas, inserindo uma linha por vez:

1. Crie uma instância local do contrato `Box.sol`

   ```js

   const Box = await ethers.getContractFactory('Box');

   ```

1. Conecte a instância local ao contrato implantado, usando o endereço do contrato

   ```js

   const box = await Box.attach('0xa84caB60db6541573a091e5C622fB79e175E17be');

   ```

1. Interaja com o contrato anexado. Para este exemplo, você pode chamar o método `store` e armazenar um valor simples

   ```js

   await box.store(5);

   ```

Sua conta EVM assinará a transação e a transmitirá para a rede. A saída deve ser semelhante a:

--8\<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/interact.md'

Observe seu endereço rotulado como `from`, o endereço do contrato e os `data` que estão sendo passados. Agora, você pode recuperar o valor executando:

```js

await box.retrieve();

```

Você deve ver `5` ou o valor que você armazenou inicialmente.

!!! note
Se você executar o comando retrieve imediatamente após armazenar o valor, poderá ver o valor antigo. A reexecução do comando de recuperação após aguardar um momento retornará o valor correto.

Parabéns, você implantou e interagiu com sucesso com um contrato usando o Hardhat!

--8\<-- 'text/\_disclaimers/third-party-content.md'

",
"branch": "origin/main",
"commit": "730d1002d79d2768953bf457e466ad35881f1040"
}
