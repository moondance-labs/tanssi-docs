---
title: Como Conectar a SubWallet ao Tanssi
description: Este guia mostra como conectar o SubWallet, uma carteira abrangente para Polkadot, Substrate e Ethereum, à sua rede compatível com EVM alimentada pelo Tanssi.
icon: material-wallet-outline
categories: EVM-Template
---

# Interagindo com Sua Rede EVM Tanssi Usando o SubWallet

## Introdução {: #introduction }

Desenvolvedores e usuários de redes EVM alimentadas por Tanssi têm uma variedade de opções quando se trata de carteiras. Graças à sua compatibilidade perfeita com o Ethereum, as redes EVM Tanssi suportam uma grande variedade de carteiras populares, incluindo SubWallet.

SubWallet é uma carteira Web3 abrangente que suporta nativamente contas Substrate (Polkadot) e Ethereum. Este tutorial se concentra na API do Ethereum, mas você pode consultar um [tutorial semelhante para interagir com o SubWallet usando a API do Substrate](/pt/builders/toolkit/substrate-api/wallets/subwallet/){target=\_blank}. A extensão da carteira do navegador SubWallet [pode ser baixada](https://www.subwallet.app/download.html){target=\_blank} para todos os navegadores suportados, incluindo Chrome, Brave, Firefox e MS Edge. O SubWallet também possui um aplicativo móvel para iOS e Android, mas isso está além do escopo deste guia. Um painel de ativos online completo é acessível em [web.subwallet.app](https://web.subwallet.app){target=\_blank}.

Este guia leva você por todas as etapas necessárias, desde a instalação do SubWallet até a configuração de uma carteira, conectando-a à sua rede EVM Tanssi e enviando fundos.

## Criando Sua Primeira Conta Ethereum {: #creating-your-first-ethereum-account }

Primeiro, baixe e instale a [extensão SubWallet](https://www.subwallet.app/download.html){target=\_blank}. A criação de uma nova conta gerará uma frase semente que pode derivar várias contas Ethereum e Substrate. Por padrão, o SubWallet gerará uma única conta Ethereum e uma única conta Substrate, mas você pode facilmente derivar mais da mesma frase semente. Clique em **Criar uma nova conta** para começar.

![Comece a usar o SubWallet](/images/builders/toolkit/ethereum-api/wallets/subwallet/subwallet-1.webp)

Na tela seguinte, você será solicitado a criar uma senha para proteger sua nova carteira.

![Crie uma senha para o SubWallet](/images/builders/toolkit/ethereum-api/wallets/subwallet/subwallet-2.webp)

Você será solicitado a fazer backup de sua frase semente. Esta é uma etapa importante, especialmente porque você tem a opção de, posteriormente, derivar contas adicionais desta frase semente.

![Faça backup de sua frase semente no SubWallet](/images/builders/toolkit/ethereum-api/wallets/subwallet/subwallet-3.webp)

!!! nota
    Você nunca deve compartilhar sua frase semente (mnemônico) ou chave privada com ninguém. Isso lhes dá acesso direto aos seus fundos. Este guia é apenas para fins educacionais.

## Importando uma Conta EVM Existente {: #importing-an-existing-evm-account }

É claro que você pode importar uma conta EVM existente para o SubWallet. Para começar, siga estas etapas:

1. Pressione o botão **Todas as contas** na parte superior
2. Pressione o ícone **Importar conta**

![Importar conta parte 1](/images/builders/toolkit/ethereum-api/wallets/subwallet/subwallet-4.webp)

Na tela seguinte, selecione o método pelo qual você gostaria de importar a conta existente.

![Importar conta existente parte 2](/images/builders/toolkit/ethereum-api/wallets/subwallet/subwallet-5.webp)

Na tela seguinte, você poderá fornecer a frase semente relevante, a chave privada, o arquivo JSON ou o código QR, e poderá começar a usar sua nova conta imediatamente.

## Configurando o SubWallet para Sua Rede EVM {: #configuring-subwallet-for-your-evm-network }

Para configurar o SubWallet para sua rede EVM alimentada por Tanssi, pressione o ícone **Mais opções** no canto superior esquerdo. Em seguida, clique em **Gerenciar redes**. Pressione o ícone **+**. Na página seguinte, você será solicitado a inserir os detalhes da rede para sua rede Tanssi. Para fins de demonstração, a rede EVM de demonstração é usada aqui, mas você pode substituir esses detalhes pelos detalhes da sua própria rede Tanssi. Para adicionar sua rede Tanssi ao SubWallet, siga estas etapas:

1. Cole a URL HTTPS RPC de sua rede Tanssi. A URL RPC da rede EVM de demonstração é `{{ networks.dancelight.demo_evm_rpc_url }}`. Outros parâmetros serão preenchidos automaticamente
2. Cole a URL do explorador de blocos de sua rede Tanssi. A URL do explorador de blocos da rede EVM de demonstração é `{{ networks.dancelight.demo_evm_blockscout_url }}`
3. Pressione **Salvar**

![Adicione os Detalhes da Rede Alimentada pelo Tanssi no SubWallet](/images/builders/toolkit/ethereum-api/wallets/subwallet/subwallet-6.webp)

Por padrão, todos os saldos são ocultos no SubWallet, mas se você pressionar o ícone de olho, poderá alternar a visibilidade do saldo.

## Enviando Ativos em Sua Rede EVM {: #sending-assets-on-your-evm-network }

Para transferir o token nativo da sua rede Tanssi, siga estas etapas:

1. Especifique o ativo a ser enviado
2. Especifique a cadeia de destino (neste caso, a mesma cadeia da qual você está enviando)
3. Insira o endereço de destino
4. Insira o número de tokens a serem enviados
5. Veja os detalhes da transação e pressione **Transferir** e, em seguida, **Aprovar**

![Envie fundos em sua Rede EVM Tanssi](/images/builders/toolkit/ethereum-api/wallets/subwallet/subwallet-7.webp)

Este guia se concentrou especificamente na configuração do SubWallet para trabalhar com sua rede EVM Tanssi, mas o SubWallet também é uma carteira completa para contas Substrate (Polkadot). Na seção da API do Substrate, você encontrará um [guia semelhante para configurar o SubWallet para uso com sua rede Substrate](/pt/builders/toolkit/substrate-api/wallets/subwallet/){target=\_blank}.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
