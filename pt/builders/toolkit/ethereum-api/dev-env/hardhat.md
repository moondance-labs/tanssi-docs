---
title: Implantar Contratos com Hardhat
description: Aprenda a usar o Hardhat, um ambiente de desenvolvimento Ethereum, para compilar, implantar e interagir com contratos inteligentes Solidity na sua rede EVM da Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

# Usando Hardhat para implantar na sua rede EVM

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/1Kbs7dxkjJQ?si=n0ipTN2nbvqISLGu' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introdução {: #introduction }

[Hardhat](https://hardhat.org){target=_blank} é um ambiente de desenvolvimento Ethereum que ajuda a gerenciar e automatizar as tarefas recorrentes inerentes à criação de contratos inteligentes e dApps. Ele funciona com qualquer rede EVM, incluindo as redes compatíveis com a Tanssi, para compilar e implantar contratos de forma transparente.

Este guia mostra como compilar, implantar e interagir com contratos inteligentes Ethereum na rede EVM de demonstração da Tanssi. Você pode adaptar para sua própria rede Tanssi adicionando a URL RPC dela à sua carteira EVM e alternando para essa rede.

## Verificando pré-requisitos {: #checking-prerequisites }

Para este guia, você precisará do MetaMask instalado e configurado para funcionar com sua rede EVM da Tanssi. Você pode seguir [este guia para configurar o MetaMask para a rede EVM de demonstração](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=_blank}.

## Criando um projeto Hardhat {: #creating-a-hardhat-project }

Se ainda não tiver um projeto Hardhat, crie um seguindo os passos:

1. Crie um diretório para o projeto

    ```sh
    mkdir hardhat && cd hardhat
    ```

2. Inicialize o projeto, o que criará um `package.json`

    ```sh
    npm init -y
    ```

3. Instale o Hardhat

    ```sh
    npm install hardhat
    ```

4. Crie o projeto

    ```sh
    npx hardhat init
    ```

    !!! nota
        `npx` executa binários instalados localmente no projeto. Embora seja possível instalar o Hardhat globalmente, é recomendável instalá-lo localmente para controlar a versão por projeto.

5. Um menu aparecerá permitindo criar um novo projeto ou usar um exemplo. Para este guia, escolha **Create an empty hardhat.config.js**

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/create.md'

Isso criará um arquivo de configuração Hardhat (`hardhat.config.js`) no diretório do projeto.

Quando o projeto estiver pronto, instale também o [plugin Ethers](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=_blank} para usar a biblioteca [Ethers.js](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=_blank} com a rede:

```sh
npm install @nomicfoundation/hardhat-ethers ethers
```

Além disso, instale o plugin `hardhat-ignition-ethers` para implantar contratos com o Hardhat Ignition:

```sh
npm install --save-dev @nomicfoundation/hardhat-ignition-ethers
```

## O arquivo do contrato {: #the-contract-file }

Com o projeto vazio criado, crie o diretório `contracts`:

```sh
mkdir contracts && cd contracts
```

O contrato de exemplo que será implantado se chama `Box` e armazena um valor recuperável depois. No diretório `contracts`, crie o arquivo `Box.sol`:

```sh
touch Box.sol
```

Abra o arquivo e adicione o contrato:

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Box {
    uint256 private value;

    // Emitido quando o valor armazenado é alterado
    event ValueChanged(uint256 newValue);

    // Armazena um novo valor no contrato
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Lê o último valor armazenado
    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

## O arquivo de configuração do Hardhat {: #hardhat-configuration-file }

Antes de implantar na sua rede Tanssi, ajuste o `hardhat.config.js` e crie um arquivo seguro para armazenar sua chave privada.

Exemplo de configuração para usar a rede EVM de demonstração ou a sua rede Tanssi:

```js
// 1. Importe os plugins Ethers e Hardhat Ignition necessários para interagir com o contrato
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition-ethers');

// 2. Adicione sua chave privada com tokens da sua rede Tanssi
// Isto é apenas para exemplo — **nunca armazene suas chaves privadas em um arquivo JavaScript**
const privateKey = 'INSERT_PRIVATE_KEY';

module.exports = {
  // 3. Especifique a versão do Solidity
  solidity: '0.8.1',
  networks: {
    // 4. Adicione a especificação da sua rede EVM da Tanssi
    dancelight: {
      url: '{{ networks.dancelight.demo_evm_rpc_url }}',
      chainId: {{ networks.dancelight.demo_evm_chain_id }}, // Preencha o ChainID EVM da sua rede Tanssi
      accounts: [privateKey]
    }
  }
};
```

Pronto para implantar!

## Compilando Solidity {: #compiling-solidity }

Compile o contrato com:

```sh
npx hardhat compile
```

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/compile.md'

Após a compilação, o diretório `artifacts` é criado com bytecode e metadados (`.json`). Considere adicioná-lo ao `.gitignore`.

## Implantando o contrato {: #deploying-the-contract }

A implantação usará o Hardhat Ignition, um framework declarativo para implantações. Saiba mais na [documentação do Ignition](https://hardhat.org/ignition/docs/getting-started#overview){target=_blank}.

Crie a estrutura para o módulo Ignition:

```sh
mkdir ignition ignition/modules && touch ignition/modules/Box.js
```

Depois, escreva o módulo do Ignition seguindo estes passos:

1. Importe `buildModule` do Hardhat Ignition
2. Exporte um módulo usando `buildModule`
3. Use `getAccount` para selecionar a conta de deploy
4. Defina gas price e gas limit customizados, se necessário
5. Faça o deploy do contrato `Box`
6. Retorne um objeto com o contrato para usá-lo em testes e scripts

```js
--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/Box.js'
```

Para executar o script e implantar o `Box.sol`, especifique o nome da rede conforme definido em `hardhat.config.js`. Sem rede, o Hardhat usa a rede local por padrão.

```sh
npx hardhat ignition deploy ./ignition/modules/Box.js --network dancelight
```

Confirme a rede quando solicitado. Em alguns segundos, o contrato será implantado e o endereço aparecerá no terminal. Se for outra rede Tanssi, ajuste o nome da rede para combinar com o `hardhat.config.js`.

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/deploy.md'

Parabéns, o contrato está ativo! Guarde o endereço para interagir na próxima etapa.

## Interagindo com o contrato {: #interacting-with-the-contract }

Para interagir com o contrato implantado, abra o `console` do Hardhat:

```sh
npx hardhat console --network dancelight
```

Execute, linha a linha:

1. Crie uma instância local de `Box.sol`

    ```js
    const Box = await ethers.getContractFactory('Box');
    ```

2. Conecte a instância ao contrato implantado usando o endereço

    ```js
    const box = await Box.attach('0xa84caB60db6541573a091e5C622fB79e175E17be');
    ```

3. Interaja com o contrato; por exemplo, chame `store` e salve um valor simples

    ```js
    await box.store(5);
    ```

Sua conta EVM assinará a transação e a transmitirá. A saída se parecerá com:

--8<-- 'code/builders/toolkit/ethereum-api/dev-env/hardhat/terminal/interact.md'

Note seu endereço em `from`, o endereço do contrato e os dados enviados. Para recuperar o valor:

```js
await box.retrieve();
```

Você deverá ver `5` ou o valor armazenado.

!!! nota
    Se executar o retrieve imediatamente após armazenar, pode ver o valor antigo. Tente novamente após alguns instantes.

Parabéns, você implantou e interagiu com um contrato usando o Hardhat!

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
