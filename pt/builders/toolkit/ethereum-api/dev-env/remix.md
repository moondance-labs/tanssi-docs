---
title: Deploy Smart Contracts with Remix
description: Learn how to use one of the most popular Ethereum developer tools, the Remix IDE, to interact with your Tanssi-powered EVM network.
icon: octicons-code-square-24
categories: EVM-Template
---

## { "source_path": "builders/toolkit/ethereum-api/dev-env/remix.md", "source_language": "EN", "target_language": "PT", "checksum": "77494caf0b4fddda9d668038b7a55e2a8540007fa03beaba440b69dcb6557", "content": "---\\n title: Deploy Smart Contracts with Remix\\n description: Learn how to use one of the most popular Ethereum developer tools, the Remix IDE, to interact with your Tanssi-powered EVM network.\\n icon: octicons-code-square-24\\n categories: EVM-Template\\n---\\n\\n# Usando Remix para Implantar em Sua Rede EVM Tanssi\\n\\n<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/vSc80mg_L9E?si=qnIXJ6wL0iKU3mU1' frameborder='0' allowfullscreen></iframe></div>\\n<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>\\n\\n## Introdução {: #introduction }\\n\\nDesenvolvedores construindo dApps em redes EVM baseadas em Tanssi podem usar [Remix](https://remix.ethereum.org){target=\_blank}, um dos ambientes de desenvolvimento Ethereum mais populares, para construir, compilar e implantar seus contratos inteligentes. O Remix pode ser usado com qualquer rede EVM, graças à compatibilidade perfeita das redes EVM baseadas em Tanssi.\\n\\nEste guia aborda o processo de criação e implantação de um contrato inteligente baseado em Solidity na rede EVM de demonstração Tanssi usando o Remix IDE. Este guia pode ser adaptado para sua própria rede EVM Tanssi, simplesmente adicionando a URL RPC da sua rede à sua Carteira EVM e alternando as redes para ela.\\n\\n## Verificando Pré-requisitos {: #checking-prerequisites }\\n\\nPara este guia, você precisará ter o MetaMask instalado e configurado para trabalhar com sua rede EVM Tanssi. Você pode seguir [este guia para configurar o MetaMask para Tanssi com a rede EVM de demonstração](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.\\n\\n## Começando com o Remix {: #getting-started-with-remix }\\n\\nAgora, você pode ir para [Remix](https://remix.ethereum.org){target=\_blank} para começar. Na tela principal, navegue até a aba **File Explorer**.\\n\\n![File explorer](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-1.webp)\\n\\nEm seguida, você pode criar um novo arquivo para salvar o contrato inteligente Solidity. Para fazer isso, siga estas etapas:\\n\\n1. Pressione o botão **Create New File** no lado esquerdo do **File Explorer**\\n2. Digite o nome do arquivo desejado, como `MyToken.sol`\\n\\n![Crie um novo arquivo para seu contrato Solidity](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-2.webp)\\n\\nEm seguida, cole o seguinte contrato inteligente na aba do editor:\\n\\n`solidity\n--8<-- 'code/builders/toolkit/ethereum-api/dev-env/remix/erc20.sol'\n`\\n\\n![Cole o contrato no editor](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-3.webp)\\n\\nEste é um contrato ERC-20 simples baseado no [modelo ERC-20 atual do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol){target=\_blank}. Ele cria `MyToken` com o símbolo `MYTOK` e cunha a totalidade do fornecimento inicial para o criador do contrato.\\n\\nPara compilar seu contrato inteligente, siga estas etapas:\\n\\n1. Navegue até a aba **Solidity compiler**\\n2. Pressione o botão **Compile MyToken.sol**\\n\\n![Compile MyToken.sol](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-4.webp)\\n\\nSeu contrato agora está compilado e pronto para ser implantado em sua rede Tanssi.\\n\\n## Implantação de um Contrato em Sua Rede Usando Remix {: #deploying-a-contract-to-your-network-using-remix }\\n\\nAgora você pode implantar o contrato navegando até a opção da barra lateral **Deployment**. Você precisa alterar o dropdown **ENVIRONMENT** superior de **JavaScript VM** para **Injected Web3**. Isso informa ao Remix para usar o provedor injetado do MetaMask, que o apontará para sua rede EVM baseada em Tanssi, desde que a rede selecionada em seu MetaMask seja sua rede EVM Tanssi. Se você precisar alterar sua rede no MetaMask, pode fazê-lo facilmente, e o Remix atualizará os saldos da sua conta para refletir a mudança de rede.\\n\\n![Change environment to injected Web3](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-5.webp)\\n\\nAssim que você selecionar **Injected Web3**, será solicitado que permita que o Remix se conecte à sua conta MetaMask. Em seguida, siga estas etapas:\\n\\n1. Selecione as contas que você gostaria de usar com o Remix\\n2. Pressione **Next**\\n3. Pressione **Connect**\\n\\n![Selecione as contas para conectar ao Remix](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-6.webp)\\n\\nAo retornar ao Remix, você deverá ver que a conta que deseja usar para implantação agora é gerenciada pelo MetaMask. Para implantar seu contrato de token, siga estas etapas:\\n\\n1. Ao lado do botão **Deploy**, especifique um fornecimento inicial de 8 milhões de tokens. Como este contrato usa o padrão de 18 decimais, o valor a ser inserido na caixa é `8000000000000000000000000`. Depois de inserir este valor, pressione **Deploy**\\n2. Confirme a transação de implantação do contrato no MetaMask.\\n\\n![Enter an token balance and deploy](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-7.webp)\\n\\nDepois de pressionar **Confirm** e a implantação for concluída, você verá a transação listada no MetaMask. O contrato aparecerá em **Deployed Contracts** no Remix. Você pode acessar o endereço do contrato implantado pressionando o botão de cópia.\\n\\n![Confirmed label on a transaction](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-8.webp)\\n\\nDepois que o contrato for implantado, você pode interagir com ele de dentro do Remix. Para se familiarizar com a interação com um contrato inteligente no Remix, siga estas etapas:\\n\\n1. Expanda o contrato na seção **Deployed Contracts**\\n2. Cole seu endereço (o endereço que implantou o contrato de token) ao lado do método balanceOf e pressione **balanceOf**. Você deverá ver a totalidade do saldo do ERC-20 pertencente a esse endereço\\n3. Pressione **Decimals** para ver o número de casas decimais que o token possui\\n4. Pressione **Name** para ver o nome que você atribuiu ao token\\n5. Pressione **Symbol** para ver o símbolo do token\\n6. Pressione **Initial Supply** e você deverá ver `8000000000000000000000000`\\n7. Copie o endereço do contrato clicando no botão ao lado do nome e endereço do contrato. Você precisará dele na próxima seção\\n\\n![Interact with the contract from Remix](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-9.webp)\\n\\n## Interagindo com um ERC-20 em Sua Rede do MetaMask {: #interacting-with-an-erc-20-on-your-network-from-metamask }\\n\\nAgora, abra o MetaMask para adicionar os tokens ERC-20 recém-implantados. Certifique-se de estar conectado à conta que implantou o contrato de token. Além disso, certifique-se de ter copiado o endereço do contrato do Remix.\\n\\nPara adicionar o token ao MetaMask, siga estas etapas:\\n\\n1. Clique na aba **Tokens** conforme mostrado abaixo\\n2. Pressione **Import tokens**\\n\\n![Add a token](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-10.webp)\\n\\nEm seguida, siga estas etapas:\\n\\n1. Cole o endereço do contrato copiado no campo **Token contract address**. Os campos **Token symbol** e **Token decimal** devem ser preenchidos automaticamente\\n2. Pressione **Next**\\n\\n![Paste the copied contract address](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-11.webp)\\n\\nDepois de clicar em **Next**, você precisará confirmar que deseja adicionar esses tokens à sua conta MetaMask. Clique em **Import** e você deverá ver um saldo de 8 milhões de MyTokens no MetaMask:\\n\\n![Add the tokens to your MetaMask account](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-12.webp)\\n\\nAgora você pode enviar alguns desses tokens ERC-20 para a outra conta que você configurou no MetaMask. Clique em **Send** para iniciar a transferência de 500 MyTokens e selecione a conta de destino.\\n\\nDepois de clicar em **Next**, você será solicitado a confirmar (semelhante ao que é mostrado abaixo).\\n\\n![Confirmation of the token transfer](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-13.webp)\\n\\nClique em **Confirm** e, após a conclusão da transação, você verá uma confirmação e uma redução do saldo da conta MyToken da conta do remetente no MetaMask.\\n\\n![Verify the reduction in account balance](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-14.webp)\\n\\nVocê também pode pesquisar a transação no [explorador da sua rede Tanssi](https://tanssi-evmexplorer.netlify.app){target=\_blank} para verificar o status da transação.\\n\\n![Check transaction status on block explorer for your Tanssi network](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-15.webp)\\n\\n--8\<-- 'text/\_disclaimers/third-party-content.md'\\n\\n", "translated_content": "--- title: Implante Contratos Inteligentes com Remix description: Aprenda a usar uma das ferramentas de desenvolvedor Ethereum mais populares, a IDE Remix, para interagir com sua rede EVM baseada em Tanssi. icon: octicons-code-square-24 categories: EVM-Template

# Usando Remix para Implantar na Sua Rede EVM Tanssi

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/vSc80mg_L9E?si=qnIXJ6wL0iKU3mU1' frameborder='0' allowfullscreen></iframe></div>

<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introdução {: #introduction }

Desenvolvedores que constroem dApps em cima de redes EVM baseadas em Tanssi podem usar [Remix](https://remix.ethereum.org){target=\_blank}, um dos ambientes de desenvolvimento Ethereum mais populares, para construir, compilar e implantar seus contratos inteligentes. Remix pode ser usado com qualquer rede EVM, graças à compatibilidade perfeita das redes EVM baseadas em Tanssi.

Este guia orienta o processo de criação e implantação de um contrato inteligente baseado em Solidity na rede EVM de demonstração Tanssi usando o Remix IDE. Este guia pode ser adaptado para sua própria rede EVM Tanssi simplesmente adicionando a URL RPC da sua rede à sua Carteira EVM e alternando as redes para ela.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para este guia, você precisará ter o MetaMask instalado e configurado para funcionar com sua rede EVM Tanssi. Você pode seguir [este guia para configurar o MetaMask para Tanssi com a rede EVM de demonstração](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

## Começando com Remix {: #getting-started-with-remix }

Agora, você pode ir para [Remix](https://remix.ethereum.org){target=\_blank} para começar. Na tela principal, navegue para a aba **File Explorer**.

```solidity
![File explorer](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-1.webp)
```

Em seguida, você pode criar um novo arquivo para salvar o contrato inteligente Solidity. Para fazer isso, siga as seguintes etapas:

1. Pressione o botão **Create New File** no lado esquerdo do **File Explorer**
1. Insira o nome de arquivo desejado, como `MyToken.sol`

```solidity

```

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/dev-env/remix/erc20.sol'
```

![Cole o contrato no editor](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-3.webp)

Este é um contrato ERC-20 simples com base no [modelo ERC-20 atualizado do OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol){target=\_blank}. Ele cria `MyToken` com o símbolo `MYTOK` e cunha a totalidade do fornecimento inicial para o criador do contrato.

Para compilar seu contrato inteligente, siga as seguintes etapas:

1. Navegue para a aba **Solidity compiler**
1. Pressione o botão **Compile MyToken.sol**

![Compile MyToken.sol](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-4.webp)

Seu contrato agora está compilado e pronto para ser implantado em sua rede Tanssi.

## Implantando um Contrato em Sua Rede Usando Remix {: #deploying-a-contract-to-your-network-using-remix }

Agora você pode implantar o contrato navegando para a opção da barra lateral **Deployment**. Você precisa alterar o dropdown **ENVIRONMENT** superior de **JavaScript VM** para **Injected Web3**. Isso informa ao Remix para usar o provedor injetado do MetaMask, que o apontará para sua rede EVM baseada em Tanssi, desde que a rede selecionada no seu MetaMask seja sua rede EVM Tanssi. Se precisar alterar sua rede no MetaMask, você pode fazer isso facilmente, e o Remix atualizará os saldos da sua conta para refletir a alteração da rede.

![Altere o ambiente para Injected Web3](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-5.webp)

Assim que selecionar **Injected Web3**, você será solicitado a permitir que o Remix se conecte à sua conta MetaMask. Em seguida, siga as seguintes etapas:

1. Selecione as contas que deseja usar com o Remix
1. Pressione **Next**
1. Pressione **Connect**

![Selecione as contas para conectar ao Remix](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-6.webp)

De volta ao Remix, você deverá ver que a conta que deseja usar para implantação agora está sendo gerenciada pelo MetaMask. Para implantar seu contrato de token, siga as seguintes etapas:

1. Ao lado do botão **Deploy**, especifique um fornecimento inicial de 8 milhões de tokens. Como este contrato usa o padrão de 18 decimais, o valor a ser inserido na caixa é `8000000000000000000000000`. Depois de inserir este valor, pressione **Deploy**
1. Confirme a transação de implantação do contrato no MetaMask.

![Insira um saldo de token e implante](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-7.webp)

Depois de pressionar **Confirm** e a implantação for concluída, você verá a transação listada no MetaMask. O contrato aparecerá em **Deployed Contracts** no Remix. Você pode acessar o endereço do contrato implantado pressionando o botão de cópia.

![Rótulo Confirmado em uma transação](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-8.webp)

Depois que o contrato for implantado, você pode interagir com ele de dentro do Remix. Para se familiarizar com a interação com um contrato inteligente no Remix, siga as seguintes etapas:

1. Expanda o contrato na seção **Deployed Contracts**
1. Cole seu endereço (o endereço que implantou o contrato de token) ao lado do método balanceOf e pressione **balanceOf**. Você deverá ver a totalidade do saldo do ERC-20 pertencente a esse endereço
1. Pressione **Decimals** para ver o número de casas decimais que o token possui
1. Pressione **Name** para ver o nome que você atribuiu ao token
1. Pressione **Symbol** para ver o símbolo do token
1. Pressione **Initial Supply** e você deverá ver `8000000000000000000000000`
1. Copie o endereço do contrato clicando no botão ao lado do nome e endereço do contrato. Você precisará dele na próxima seção

![Interaja com o contrato do Remix](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-9.webp)

## Interagindo com um ERC-20 na Sua Rede do MetaMask {: #interacting-with-an-erc-20-on-your-network-from-metamask }

Agora, abra o MetaMask para adicionar os tokens ERC-20 recém-implantados. Certifique-se de estar conectado à conta que implantou o contrato de token. Além disso, certifique-se de ter copiado o endereço do contrato do Remix.

Para adicionar o token ao MetaMask, siga estas etapas:

1. Clique na aba **Tokens** conforme mostrado abaixo
1. Pressione **Import tokens**

![Adicione um token](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-10.webp)

Em seguida, siga estas etapas:

1. Cole o endereço do contrato copiado no campo **Token contract address**. Os campos **Token symbol** e **Token decimal** devem ser preenchidos automaticamente
1. Pressione **Next**

![Cole o endereço do contrato copiado](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-11.webp)

Depois de clicar em **Next**, você precisará confirmar que deseja adicionar esses tokens à sua conta MetaMask. Clique em **Import** e você deverá ver um saldo de 8 milhões de MyTokens no MetaMask:

![Adicione os tokens à sua conta MetaMask](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-12.webp)

Agora você pode enviar alguns desses tokens ERC-20 para a outra conta que você configurou no MetaMask. Clique em **Send** para iniciar a transferência de 500 MyTokens e selecione a conta de destino.

Depois de clicar em **Next**, você será solicitado a confirmar (semelhante ao que é mostrado abaixo).

![Confirmação da transferência de token](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-13.webp)

Clique em **Confirm** e, após a conclusão da transação, você verá uma confirmação e uma redução do saldo da conta MyToken da conta do remetente no MetaMask.

![Verifique a redução no saldo da conta](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-14.webp)

Você também pode pesquisar a transação no [explorador da sua rede Tanssi](https://tanssi-evmexplorer.netlify.app){target=\_blank} para verificar o status da transação.

![Verifique o status da transação no explorador de blocos da sua rede Tanssi](/images/builders/toolkit/ethereum-api/dev-environments/remix/remix-15.webp)

--8\<-- 'text/\_disclaimers/third-party-content.md'
",
"branch": "origin/main",
"commit": "730d1002d79d2768953bf457e466ad35881f1040"
}
