--- 
title: Como Conectar SubWallet ao Tanssi Substrate 
description: Este guia mostra como conectar SubWallet, uma carteira abrangente para Polkadot, Substrate e Ethereum, à sua rede Substrate com tecnologia Tanssi. 
icon: material-wallet-outline 
categories: Substrate-Template
---


# Interagindo com Sua Rede Tanssi Substrate Usando SubWallet

## Introdução {: #introduction }

Desenvolvedores e usuários de redes Substrate com tecnologia Tanssi têm uma variedade de opções quando se trata de carteiras. SubWallet é uma carteira Web3 abrangente que suporta nativamente contas Substrate (Polkadot) e Ethereum. Este tutorial se concentra na API Substrate, mas você pode consultar um [tutorial semelhante para interagir com SubWallet usando a API Ethereum](/pt/builders/toolkit/ethereum-api/wallets/subwallet/){target=\_blank}.

A extensão de navegador da carteira SubWallet [pode ser baixada](https://www.subwallet.app/download.html){target=\_blank} para todos os navegadores suportados, incluindo Chrome, Brave, Firefox e MS Edge. SubWallet também possui um aplicativo móvel para iOS e Android, mas isso está além do escopo deste guia. Um painel de ativos online completo é acessível em [web.subwallet.app](https://web.subwallet.app){target=\_blank}.

Este guia leva você por todas as etapas necessárias, desde a instalação do SubWallet até a configuração de uma carteira, conectando-a à sua rede Tanssi Substrate e enviando fundos.

## Criando Sua Primeira Conta Substrate {: #creating-your-first-substrate-account }

Primeiro, baixe e instale a [extensão SubWallet](https://www.subwallet.app/download.html){target=\_blank}. Criar uma nova conta gerará uma frase semente que pode derivar várias contas Ethereum e Substrate. Por padrão, SubWallet gerará uma única conta Ethereum e uma única conta Substrate, mas você pode facilmente derivar mais da mesma frase semente. Clique em **Criar uma nova conta** para começar.

![Comece a usar o SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-1.webp)

Na tela seguinte, você será solicitado a criar uma senha para proteger sua nova carteira.

![Crie uma senha para SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-2.webp)

Você será solicitado a fazer backup de sua frase semente. Esta é uma etapa importante, especialmente porque você tem a opção de derivar posteriormente contas adicionais desta frase semente.

![Faça backup de sua frase semente no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-3.webp)

!!! nota
    Você nunca deve compartilhar sua frase semente (mnemônico) ou chave privada com ninguém. Isso lhes dá acesso direto aos seus fundos. Este guia é apenas para fins educacionais.

## Importando uma Conta Substrate Existente {: #importing-an-existing-substrate-account }

É claro que você pode importar uma conta Substrate existente para o SubWallet. Para começar, siga estas etapas:

1. Pressione o botão **Todas as contas** na parte superior
2. Pressione o ícone **Importar conta**

![Importar conta parte 1](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-4.webp)

Na tela seguinte, selecione o método pelo qual você gostaria de importar a conta existente. Se você estiver importando uma conta Substrate, pode escolher entre as opções de frase semente, Polkadot.js (JSON) ou código QR.

![Importar conta existente parte 2](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-5.webp)

Na tela seguinte, você poderá fornecer a frase semente relevante, o arquivo JSON ou o código QR, e poderá começar a usar sua nova conta imediatamente.

## Conectando SubWallet ao Dancelight {: #connecting-Subwallet-to-dancelight }

O SubWallet vem pré-configurado com suporte para Dancelight, a Tanssi TestNet, mas pode não estar habilitado por padrão. Você só precisa ir para a página **Gerenciar redes** para ativá-lo. Lembre-se de que [Dancelight](/pt/builders/tanssi-network/testnet/dancelight/){target=\_blank} em si é a rede baseada em Substrate que orquestra e gerencia o lançamento de redes com tecnologia Tanssi. Para configurar seu SubWallet para funcionar com Dancelight, pressione o ícone **Mais opções** no canto superior esquerdo. Em seguida, clique em **Gerenciar redes** e siga estas etapas:

1. Procure por **Dancelight**
2. Ative o controle deslizante para habilitar o suporte para Dancelight

![Ativar suporte para Dancelight](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-6.webp)

Se você tiver um saldo de tokens Dancelight, verá o saldo da sua conta na página inicial da carteira SubWallet. Por padrão, todos os saldos são ocultos no SubWallet, mas se você pressionar o ícone de olho, poderá alternar a visibilidade do saldo.

![Veja os saldos da sua conta TestNet no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-7.webp)

## Conectando SubWallet à Sua Rede Substrate {: #connecting-Subwallet-to-your-substrate-network }

Para configurar o SubWallet para sua rede Substrate, pressione o ícone **Mais opções** no canto superior esquerdo. Em seguida, clique em **Gerenciar redes**. Pressione o ícone **+**. Na página seguinte, você será solicitado a inserir os detalhes da rede para sua rede Tanssi. Para fins de demonstração, o Dancelight é usado aqui; no entanto, você pode substituir esses detalhes por sua própria rede Tanssi. Para adicionar sua rede Tanssi ao SubWallet, siga estas etapas:

1. Cole a URL WSS da sua rede Tanssi. Outros parâmetros, como a ID da parachain e as casas decimais dos tokens, podem ser preenchidos automaticamente
2. Forneça um nome para sua rede Tanssi
3. Pressione **Salvar**

![Adicionar Rede no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-8.webp)

## Conectando ao Polkadot.js {: #connecting-to-polkadotjs}

Para conectar sua rede Tanssi Substrate ao Polkadot.js Apps, primeiro vá para [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank}. Neste exemplo, Polkadot.js Apps está conectado ao Dancelight, mas você pode apontar o Polkadot.js para sua rede Tanssi clicando no menu suspenso da rede e preenchendo o endpoint WSS da sua rede Tanssi no campo **endpoint personalizado**.

![Conectar ao Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-9.webp)

A extensão SubWallet solicitará que você selecione as contas que deseja usar com o Polkadot.js Apps. Se ele não aparecer automaticamente, você pode abrir a extensão SubWallet e clicar no ícone **Conectado** ao lado da sua conta na parte superior. Para configurar o SubWallet para interagir corretamente com sua rede Tanssi no Polkadot.js Apps, você deve seguir estas etapas:

1. Selecione as contas Substrate que você gostaria de usar com o Polkadot.js Apps
2. Pressione **Conectar**

![Conectar SubWallet ao Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-10.webp)

Sua carteira SubWallet agora está conectada ao Polkadot.js Apps. Após atualizar o Polkadot.js Apps, você deverá ver sua conta SubWallet na \[página Contas do Polkadot.js Apps\](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\\\_blank} sob o cabeçalho **extensão**.

## Enviando uma Transação {: #sending-a-transaction}

Para enviar uma transação por meio da API Substrate, clique em **Enviar** ao lado da sua conta no Polkadot.js Apps. Em seguida, siga estas etapas:

1. Insira o **enviar para endereço**
2. Insira o **valor**
3. Pressione **Fazer Transferência** e confirme a transação no pop-up do Polkadot.js resultante
4. Pressione **Ver Detalhes** se você quiser inspecionar o conteúdo da transação
5. Pressione **Aprovar** para enviar a transação

![Enviar fundos por meio da API Substrate com o Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-11.webp)

Você também pode enviar uma transação por meio da API Substrate diretamente da extensão SubWallet sem usar o Polkadot.js Apps. Para fazer isso, pressione o ícone **Enviar** e siga estas etapas:

1. Especifique o ativo a ser enviado
2. Especifique a cadeia de destino (neste caso, a mesma cadeia de onde você está enviando)
3. Insira o endereço de destino
4. Insira o número de tokens a serem enviados
5. Analise os detalhes da transação e, em seguida, pressione **Transferir** e, em seguida, **Aprovar**

![Enviar fundos por meio da API Substrate diretamente no SubWallet](/images/builders/toolkit/substrate-api/wallets/subwallet/subwallet-12.webp)

Este guia se concentrou especificamente na configuração do SubWallet para funcionar com sua rede Tanssi Substrate, mas o SubWallet também é uma carteira completa para contas EVM. Na seção da API Ethereum, você encontrará um [guia semelhante para configurar o SubWallet para uso com sua rede Tanssi EVM](/pt/builders/toolkit/ethereum-api/wallets/subwallet/){target=\_blank}.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'

