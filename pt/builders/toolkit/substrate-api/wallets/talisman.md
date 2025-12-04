---
title: Como conectar Talisman à Tanssi
description: Este guia explica como conectar Talisman, uma carteira Substrate e Ethereum, à rede Tanssi ou à sua appchain Substrate com tecnologia Tanssi.
icon: material-wallet-outline
categories: Substrate-Template
---

# Interagindo com Tanssi ou sua Appchain Substrate usando Talisman

## Introdução {: #introduction }

Desenvolvedores e usuários de redes Substrate, como a rede Tanssi ou appchains Substrate com tecnologia Tanssi, têm uma variedade de opções quando se trata de carteiras. Talisman é uma ótima opção, pois oferece suporte nativo total para contas Substrate e Ethereum. Este guia se concentra na API Substrate. Você também pode conferir um [guia semelhante para configurar o Talisman para uso com sua rede Tanssi EVM](/pt/builders/toolkit/ethereum-api/wallets/talisman/){target=\_blank}.

Talisman é uma carteira Web3 que suporta nativamente contas Substrate e Ethereum. A extensão do navegador da carteira Talisman está disponível no [Google Chrome, Brave e outros navegadores baseados em Chromium](https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=\_blank}, bem como no [Firefox](https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/){target=\_blank}. Um painel de ativos é acessível em [app.talisman.xyz](https://app.talisman.xyz){target=\_blank}

Este guia leva você por todas as etapas necessárias, desde a instalação do Talisman até a configuração de uma carteira, conectando-a à sua rede Substrate Tanssi e enviando fundos.

!!! nota "Nota do Editor (Atualização de 2025)"
    Este guia faz referência a opções como Polkadot.js Apps ou tipo de conta Polkadot porque esses são os rótulos usados em ferramentas Substrate comuns. A própria Tanssi é independente — construída com Substrate e alinhada com a segurança apoiada pela Ethereum.

## Configurando o Talisman {: #setting-up-talisman }

Primeiro, baixe e instale a [extensão Talisman](https://talisman.xyz/){target=\_blank}. Este guia primeiro abordará a criação de uma nova carteira e, mais tarde, tratará da importação de uma existente. Revise os termos e condições e, em seguida, pressione **Começar**.

![Comece a usar o Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-1.webp)

Na tela seguinte, você será solicitado a criar uma senha para proteger sua nova carteira.

![Insira a senha para a Carteira Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-2.webp)

## Criar uma Conta Substrate {: #create-a-substrate-account }

Para criar sua primeira conta Substrate no Talisman, siga as seguintes etapas:

1. Selecione a opção **Polkadot**.
2. Dê um nome para sua conta.
3. Pressione **Criar**.

!!! nota
    Por que Polkadot? Tanssi e appchains com tecnologia Tanssi são construídos usando Substrate, a mesma estrutura que alimenta Polkadot. Como resultado, embora Tanssi e Polkadot sejam redes separadas, eles compartilham o mesmo esquema de assinatura criptográfica.

![Crie sua primeira conta Polkadot no Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-3.webp)

Após criar sua primeira conta, você será solicitado a fazer backup de sua frase semente. Esta é uma etapa importante, especialmente porque você tem a opção de, mais tarde, derivar contas adicionais dessa frase semente.

![Faça backup de sua frase semente](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-4.webp)

!!! nota
    Você nunca deve compartilhar sua frase semente (mnemônico) ou chave privada com ninguém. Isso lhes dá acesso direto aos seus fundos. Este guia é apenas para fins educacionais.

## Importando uma Conta Substrate Existente {: #importing-an-existing-substrate-account }

É claro que você pode importar uma conta Substrate existente para o Talisman. Para fazer isso, siga as seguintes etapas:

1. Pressione **Adicionar Conta**.
2. Pressione **Importar**.
3. Selecione **Importar via Frase de Recuperação**.

![Configuração de importação de conta existente](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-12.webp)

Na tela seguinte, siga as seguintes etapas:

1. Selecione o tipo de conta **Polkadot**.
2. Forneça um nome para sua conta.
3. Cole sua semente.
4. Selecione quais contas você gostaria de importar.
5. Pressione **Importar**.

![Etapas finais de importação de conta existente](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-13.webp)

## Conectando o Talisman à Rede Tanssi {: #connecting-talisman-to-the-tanssi-network }

Talisman já vem pré-configurado com suporte para Tanssi MainNet e [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank}. Para se conectar ao Dancelight, você primeiro precisa garantir que ativou o suporte para TestNets no Talisman. Para fazer isso, siga as seguintes etapas:

1. Abra a extensão Talisman e clique no logotipo do Talisman.
2. Selecione **Configurações**.
3. Certifique-se de que **Habilitar testnets** esteja marcado.

![Veja os saldos da sua conta TestNet no Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-5.webp)

Se você tiver um saldo de tokens Tanssi MainNet ou Dancelight, verá o saldo da sua conta na página inicial da carteira Talisman. Quando você não tem um saldo, a rede é omitida da sua lista de ativos.

![Veja os saldos da sua conta TestNet no Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-6.webp)

## Conectando o Talisman à sua Rede Substrate {: #connecting-talisman-to-your-substrate-network }

Para configurar o Talisman para sua rede Substrate com tecnologia Tanssi, abra a extensão Talisman e clique na guia **Mais Opções**. Clique em **Configurações** > **Redes e Tokens** > **Gerenciar Redes**.

1. Deslize o controle deslizante da rede para **Polkadot**.
2. Marque a caixa **Habilitar testnets**.
3. Pressione **Adicionar Rede**.

![Adicionar Rede no Talisman](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-7.webp)

Na página seguinte, você será solicitado a inserir os detalhes da rede para sua rede Tanssi. Para fins de demonstração, o Dancelight é usado aqui, mas você pode substituir esses detalhes pela sua própria rede Tanssi. Para adicionar sua rede Tanssi ao Talisman, siga as seguintes etapas:

1. Cole a URL RPC da sua rede Tanssi. Outros parâmetros serão preenchidos automaticamente.
2. Opcionalmente, insira a URL do explorador de blocos da sua rede Tanssi, se aplicável.
3. Marque a caixa **Esta é uma testnet**, se aplicável.
4. Pressione **Adicionar Rede**.

![Adicione seus Detalhes de Rede com Tecnologia Tanssi](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-8.webp)

## Conectando ao Polkadot.js {: #connecting-to-polkadotjs}

Para conectar sua rede Substrate Tanssi aos Polkadot.js Apps, primeiro acesse \[Polkadot.js Apps\](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank}. Neste exemplo, os Polkadot.js Apps estão conectados ao Dancelight, mas você pode apontar o Polkadot.js para sua rede Tanssi clicando no menu suspenso da rede e preenchendo o endpoint WSS da sua rede Tanssi no campo de **endpoint personalizado**.

![Conecte-se aos Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-9.webp)

A extensão Talisman solicitará que você selecione as contas que deseja usar com os Polkadot.js Apps. Se ela não aparecer automaticamente, você pode abrir a extensão Talisman e clicar no título **polkadot.js.org** na parte superior. Para configurar o Talisman para interagir corretamente com sua rede Tanssi nos Polkadot.js Apps, você deve seguir as seguintes etapas:

1. Selecione a(s) conta(s) Substrate que você deseja usar com os Polkadot.js Apps
2. Pressione **Conectar 1**. O valor mudará dependendo do número de contas que você está conectando

![Conecte o Talisman aos Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-10.webp)

Sua carteira Talisman agora está conectada aos Polkadot.js Apps. Após atualizar os Polkadot.js Apps, você deve ver sua conta Talisman na \[página Contas dos Polkadot.js Apps\](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} abaixo do título **extensão**.

## Enviando uma Transação {: #sending-a-transaction}

Para enviar uma transação por meio da API Substrate, clique em **Enviar** próximo à sua conta nos Polkadot.js Apps. Em seguida, siga as seguintes etapas:

1. Insira o **endereço para enviar**.
2. Insira o **valor**.
3. Pressione **Fazer Transferência** e confirme a transação no pop-up Polkadot.js resultante.
4. Pressione **Ver Detalhes** se você quiser inspecionar o conteúdo da transação.
5. Pressione **Aprovar** para enviar a transação.

![Envie fundos por meio da API Substrate com os Polkadot.js Apps](/images/builders/toolkit/substrate-api/wallets/talisman/talisman-11.webp)

Este guia se concentrou especificamente na configuração do Talisman para funcionar com sua rede Substrate Tanssi, mas o Talisman também é uma carteira completa para contas EVM. Na seção da API Ethereum, você encontrará um [guia semelhante para configurar o Talisman para uso com sua rede Tanssi EVM](/pt/builders/toolkit/ethereum-api/wallets/talisman/){target=\_blank}.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
