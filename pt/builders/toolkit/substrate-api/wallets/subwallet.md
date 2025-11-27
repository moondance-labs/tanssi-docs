---
title: How to Connect SubWallet to Tanssi Substrate
description: This guide walks you through how to connect SubWallet, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi-powered Substrate network.
icon: material-wallet-outline
categories: Substrate-Template
---

## { "source_path": "builders/toolkit/substrate-api/wallets/subwallet.md", "source_language": "EN", "target_language": "PT", "checksum": "ed968c5fe2ad9dc2589aebf361367291c13c6376e45d159dfb62c54ce88d075c", "content": "--- title: How to Connect SubWallet to Tanssi Substrate description: This guide walks you through how to connect SubWallet, a comprehensive Polkadot, Substrate, and Ethereum wallet, to your Tanssi-powered Substrate network. icon: material-wallet-outline categories: Substrate-Template

# Interacting with Your Tanssi Substrate Network Using SubWallet

## Introduction {: #introduction }

Developers and users of Tanssi-powered Substrate networks have a variety of options when it comes to wallets. SubWallet is a comprehensive Web3 wallet that natively supports Substrate (Polkadot) and Ethereum accounts. This tutorial centers on the Substrate API, but you can check out a similar [tutorial for interacting with SubWallet using the Ethereum API](/builders/toolkit/ethereum-api/wallets/subwallet/){target=\\\_blank}.

The SubWallet wallet browser extension [can be downloaded](https://www.subwallet.app/download.html){target=\\\_blank} for all supported browsers, including Chrome, Brave, Firefox, and MS Edge. SubWallet also has a mobile app for both iOS and Android, but that is beyond the scope of this guide. A complete online asset dashboard is accessible at [web.subwallet.app](https://web.subwallet.app){target=\\\_blank}.

This guide takes you through all the necessary steps, from installing SubWallet to setting up a wallet, connecting it to your Tanssi Substrate network, and sending funds.

## Creating Your First Substrate Account {: #creating-your-first-substrate-account }

First, download and install the [SubWallet extension](https://www.subwallet.app/download.html){target=\\\_blank}. Creating a new account will generate a seed phrase that can derive multiple Ethereum and Substrate accounts. By default, SubWallet will generate a single Ethereum and a single Substrate account, but you can easily derive more from the same seed phrase. Click **Create a new account** to get started.

![Get started with SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-1.webp)

On the following screen, you'll be prompted to create a password to secure your new wallet.

![Create a password for SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-2.webp)

You'll then be prompted to back up your seed phrase. This is an important step, especially because you have the option to later derive additional accounts from this seed phrase.

![Back up your seed phrase in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-3.webp)

!!! note
You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

## Importing an Existing Substrate Account {: #importing-an-existing-substrate-account }

Of course, you can import an existing Substrate account into SubWallet. To get started, take the following steps:

1. Press the **All accounts** button at the top
1. Press the **Import account** icon

![Import account part 1](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-4.webp)

On the following screen, select the method by which you would like to import the existing account. If you're importing a Substrate account, you can choose from the seed phrase, Polkadot.js (JSON), or QR code options.

![Import existing account part 2](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-5.webp)

On the following screen, you'll be able to provide the relevant seed phrase, JSON file, or QR code, and you can begin using your new account right away.

## Connecting SubWallet to Dancelight {: #connecting-Subwallet-to-dancelight }

SubWallet comes pre-configured with support for Dancelight, the Tanssi TestNet, but it may not be enabled by default. You just need to head to the **Manage networks** page to toggle it on. Remember that [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\\_blank} itself is the Substrate-based network that orchestrates and manages the launch of Tanssi-powered networks. To configure your SubWallet to work with Dancelight, press the **More Options** icon in the upper left corner. Then click **Manage networks** and take the following steps:

1. Search for **Dancelight**
1. Toggle the slider on to enable support for Dancelight

![Toggle support for Dancelight](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-6.webp)

If you have a balance of Dancelight tokens, you'll see your account balance on the homepage of the SubWallet wallet. By default, all balances are hidden in SubWallet, but if you press the eye icon, you can toggle balance visibility.

![See your TestNet account balances in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-7.webp)

## Connecting SubWallet to Your Substrate Network {: #connecting-Subwallet-to-your-substrate-network }

To configure SubWallet for your Substrate network, press the **More Options** icon in the upper left corner. Then click **Manage networks**. Press the **+** icon. On the following page, you'll then be prompted to enter the network details for your Tanssi network. For demonstration purposes, Dancelight is used here; however, you can substitute these details with your own Tanssi network. To add your Tanssi network to SubWallet, take the following steps:

1. Paste in the WSS URL of your Tanssi network. Other parameters like the parachain ID and token decimals may be auto-populated
1. Provide a name for your Tanssi network
1. Press **Save**

![Add Network in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-8.webp)

## Connecting to Polkadot.js {: #connecting-to-polkadotjs}

To connect your Tanssi Substrate network to Polkadot.js Apps, first head to \[Polkadot.js Apps\](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\\\_blank}. In this example, Polkadot.js Apps is connected to Dancelight, but you can point Polkadot.js to your Tanssi network by clicking on the network dropdown and filling in the WSS endpoint of your Tanssi network in the **custom endpoint** field.

![Connect to Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-9.webp)

The SubWallet extension will prompt you to select the accounts you'd like to use with Polkadot.js Apps. If it doesn't automatically pop up, you can open the SubWallet extension and click on the **Connected** icon next to your account at the top. To configure SubWallet to correctly interface with your Tanssi network on Polkadot.js Apps, you should take the following steps:

1. Select the Substrate account(s) that you'd like to use with Polkadot.js Apps
1. Press **Connect**

![Connect SubWallet to Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-10.webp)

Your SubWallet wallet is now connected to Polkadot.js Apps. After refreshing Polkadot.js Apps, you should see your SubWallet account in the \[Accounts page of Polkadot.js Apps\](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\\\_blank} underneath the **extension** heading.

## Sending a Transaction {: #sending-a-transaction}

To send a transaction through the Substrate API, click **Send** next to your account on Polkadot.js Apps. Then, take the following steps:

1. Input the **send to address**
1. Enter the **amount**
1. Press **Make Transfer** and confirm the transaction in the resulting Polkadot.js pop-up
1. Press **View Details** if you'd like to inspect the contents of the transaction
1. Press **Approve** to submit the transaction

![Send funds through Substrate API with Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-11.webp)

You can also send a transaction through the Substrate API directly from the SubWallet extension without using Polkadot.js Apps. To do so, press the **Send** icon and take the following steps:

1. Specify the asset to send
1. Specify the destination chain (in this case, the same chain that you're sending from)
1. Enter the destination address
1. Enter the number of tokens to send
1. Look over the transaction details, then press **Transfer** and subsequently **Approve**

![Send funds through Substrate API directly in SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-12.webp)

This guide focused specifically on configuring SubWallet to work with your Tanssi Substrate network, but SubWallet is also a full-featured wallet for EVM accounts. Under the Ethereum API section, you'll find a [similar guide for configuring SubWallet for use with your Tanssi EVM network](/builders/toolkit/ethereum-api/wallets/subwallet/){target=\\\_blank}.

## --8\<-- 'text/\_disclaimers/third-party-content.md' ", "translated_content": "--- title: Como Conectar SubWallet ao Tanssi Substrate description: Este guia mostra como conectar SubWallet, uma carteira abrangente para Polkadot, Substrate e Ethereum, à sua rede Substrate com tecnologia Tanssi. icon: material-wallet-outline categories: Substrate-Template

# Interagindo com Sua Rede Tanssi Substrate Usando SubWallet

## Introdução {: #introduction }

Desenvolvedores e usuários de redes Substrate com tecnologia Tanssi têm uma variedade de opções quando se trata de carteiras. SubWallet é uma carteira Web3 abrangente que suporta nativamente contas Substrate (Polkadot) e Ethereum. Este tutorial se concentra na API Substrate, mas você pode consultar um [tutorial semelhante para interagir com SubWallet usando a API Ethereum](/builders/toolkit/ethereum-api/wallets/subwallet/){target=\\\_blank}.

A extensão de navegador da carteira SubWallet [pode ser baixada](https://www.subwallet.app/download.html){target=\\\_blank} para todos os navegadores suportados, incluindo Chrome, Brave, Firefox e MS Edge. SubWallet também possui um aplicativo móvel para iOS e Android, mas isso está além do escopo deste guia. Um painel de ativos online completo é acessível em [web.subwallet.app](https://web.subwallet.app){target=\\\_blank}.

Este guia leva você por todas as etapas necessárias, desde a instalação do SubWallet até a configuração de uma carteira, conectando-a à sua rede Tanssi Substrate e enviando fundos.

## Criando Sua Primeira Conta Substrate {: #creating-your-first-substrate-account }

Primeiro, baixe e instale a [extensão SubWallet](https://www.subwallet.app/download.html){target=\\\_blank}. Criar uma nova conta gerará uma frase semente que pode derivar várias contas Ethereum e Substrate. Por padrão, SubWallet gerará uma única conta Ethereum e uma única conta Substrate, mas você pode facilmente derivar mais da mesma frase semente. Clique em **Criar uma nova conta** para começar.

![Comece a usar o SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-1.webp)

Na tela seguinte, você será solicitado a criar uma senha para proteger sua nova carteira.

![Crie uma senha para SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-2.webp)

Você será solicitado a fazer backup de sua frase semente. Esta é uma etapa importante, especialmente porque você tem a opção de derivar posteriormente contas adicionais desta frase semente.

![Faça backup de sua frase semente no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-3.webp)

!!! note
Você nunca deve compartilhar sua frase semente (mnemônico) ou chave privada com ninguém. Isso lhes dá acesso direto aos seus fundos. Este guia é apenas para fins educacionais.

## Importando uma Conta Substrate Existente {: #importing-an-existing-substrate-account }

É claro que você pode importar uma conta Substrate existente para o SubWallet. Para começar, siga estas etapas:

1. Pressione o botão **Todas as contas** na parte superior
1. Pressione o ícone **Importar conta**

![Importar conta parte 1](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-4.webp)

Na tela seguinte, selecione o método pelo qual você gostaria de importar a conta existente. Se você estiver importando uma conta Substrate, pode escolher entre as opções de frase semente, Polkadot.js (JSON) ou código QR.

![Importar conta existente parte 2](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-5.webp)

Na tela seguinte, você poderá fornecer a frase semente relevante, o arquivo JSON ou o código QR, e poderá começar a usar sua nova conta imediatamente.

## Conectando SubWallet ao Dancelight {: #connecting-Subwallet-to-dancelight }

O SubWallet vem pré-configurado com suporte para Dancelight, a Tanssi TestNet, mas pode não estar habilitado por padrão. Você só precisa ir para a página **Gerenciar redes** para ativá-lo. Lembre-se de que [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\\_blank} em si é a rede baseada em Substrate que orquestra e gerencia o lançamento de redes com tecnologia Tanssi. Para configurar seu SubWallet para funcionar com Dancelight, pressione o ícone **Mais opções** no canto superior esquerdo. Em seguida, clique em **Gerenciar redes** e siga estas etapas:

1. Procure por **Dancelight**
1. Ative o controle deslizante para habilitar o suporte para Dancelight

![Ativar suporte para Dancelight](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-6.webp)

Se você tiver um saldo de tokens Dancelight, verá o saldo da sua conta na página inicial da carteira SubWallet. Por padrão, todos os saldos são ocultos no SubWallet, mas se você pressionar o ícone de olho, poderá alternar a visibilidade do saldo.

![Veja os saldos da sua conta TestNet no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-7.webp)

## Conectando SubWallet à Sua Rede Substrate {: #connecting-Subwallet-to-your-substrate-network }

Para configurar o SubWallet para sua rede Substrate, pressione o ícone **Mais opções** no canto superior esquerdo. Em seguida, clique em **Gerenciar redes**. Pressione o ícone **+**. Na página seguinte, você será solicitado a inserir os detalhes da rede para sua rede Tanssi. Para fins de demonstração, o Dancelight é usado aqui; no entanto, você pode substituir esses detalhes por sua própria rede Tanssi. Para adicionar sua rede Tanssi ao SubWallet, siga estas etapas:

1. Cole a URL WSS da sua rede Tanssi. Outros parâmetros, como a ID da parachain e as casas decimais dos tokens, podem ser preenchidos automaticamente
1. Forneça um nome para sua rede Tanssi
1. Pressione **Salvar**

![Adicionar Rede no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-8.webp)

## Conectando ao Polkadot.js {: #connecting-to-polkadotjs}

Para conectar sua rede Tanssi Substrate ao Polkadot.js Apps, primeiro vá para \[Polkadot.js Apps\](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\\\_blank}. Neste exemplo, Polkadot.js Apps está conectado ao Dancelight, mas você pode apontar o Polkadot.js para sua rede Tanssi clicando no menu suspenso da rede e preenchendo o endpoint WSS da sua rede Tanssi no campo **endpoint personalizado**.

![Conectar ao Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-9.webp)

A extensão SubWallet solicitará que você selecione as contas que deseja usar com o Polkadot.js Apps. Se ele não aparecer automaticamente, você pode abrir a extensão SubWallet e clicar no ícone **Conectado** ao lado da sua conta na parte superior. Para configurar o SubWallet para interagir corretamente com sua rede Tanssi no Polkadot.js Apps, você deve seguir estas etapas:

1. Selecione as contas Substrate que você gostaria de usar com o Polkadot.js Apps
1. Pressione **Conectar**

![Conectar SubWallet ao Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-10.webp)

Sua carteira SubWallet agora está conectada ao Polkadot.js Apps. Após atualizar o Polkadot.js Apps, você deverá ver sua conta SubWallet na \[página Contas do Polkadot.js Apps\](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\\\_blank} sob o cabeçalho **extensão**.

## Enviando uma Transação {: #sending-a-transaction}

Para enviar uma transação por meio da API Substrate, clique em **Enviar** ao lado da sua conta no Polkadot.js Apps. Em seguida, siga estas etapas:

1. Insira o **enviar para endereço**
1. Insira o **valor**
1. Pressione **Fazer Transferência** e confirme a transação no pop-up do Polkadot.js resultante
1. Pressione **Ver Detalhes** se você quiser inspecionar o conteúdo da transação
1. Pressione **Aprovar** para enviar a transação

![Enviar fundos por meio da API Substrate com o Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-11.webp)

Você também pode enviar uma transação por meio da API Substrate diretamente da extensão SubWallet sem usar o Polkadot.js Apps. Para fazer isso, pressione o ícone **Enviar** e siga estas etapas:

1. Especifique o ativo a ser enviado
1. Especifique a cadeia de destino (neste caso, a mesma cadeia de onde você está enviando)
1. Insira o endereço de destino
1. Insira o número de tokens a serem enviados
1. Analise os detalhes da transação e, em seguida, pressione **Transferir** e, em seguida, **Aprovar**

![Enviar fundos por meio da API Substrate diretamente no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-12.webp)

Este guia se concentrou especificamente na configuração do SubWallet para funcionar com sua rede Tanssi Substrate, mas o SubWallet também é uma carteira completa para contas EVM. Na seção da API Ethereum, você encontrará um [guia semelhante para configurar o SubWallet para uso com sua rede Tanssi EVM](/builders/toolkit/ethereum-api/wallets/subwallet/){target=\\\_blank}.

--8\<-- 'text/\_disclaimers/third-party-content.md'
",
"branch": "origin/main",
"commit": "730d1002d79d2768953bf457e466ad35881f1040"
}
