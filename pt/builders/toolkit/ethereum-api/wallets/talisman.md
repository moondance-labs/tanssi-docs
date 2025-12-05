---
title: Como conectar Talisman à Tanssi
description: Este guia mostra como conectar o Talisman, uma carteira abrangente compatível com Polkadot, Substrate e Ethereum, à sua rede compatível com EVM alimentada pela Tanssi.
icon: material-wallet-outline
categories: EVM-Template
---

# Interagindo com sua Rede EVM Tanssi Usando Talisman

## Introdução {: #introduction }

Desenvolvedores e usuários de redes EVM alimentadas pela Tanssi têm uma variedade de opções quando se trata de carteiras. Graças à sua compatibilidade perfeita com o Ethereum, as redes EVM Tanssi suportam uma grande variedade de carteiras populares, como a Talisman.

A Talisman é uma carteira Web3 que suporta nativamente contas Substrate (Polkadot) e Ethereum. Este tutorial se concentra na API Ethereum, mas você pode conferir um [tutorial semelhante para interagir com a Talisman usando a API Substrate](/pt/builders/toolkit/substrate-api/wallets/talisman/){target=\_blank}. A extensão de navegador da carteira Talisman está disponível no [Google Chrome](https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=\_blank} e [Brave](https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld){target=\_blank}, e um painel de ativos correspondente está acessível em [app.talisman.xyz](https://app.talisman.xyz){target=\_blank}

Este guia leva você por todas as etapas necessárias, desde a instalação do Talisman até a configuração de uma carteira, conectando-a à sua rede EVM Tanssi e enviando fundos.

## Configurando o Talisman {: #setting-up-talisman }

Primeiro, baixe e instale a [extensão Talisman](https://talisman.xyz/){target=\_blank}. Este guia cobrirá primeiro a criação de uma nova carteira e, posteriormente, abordará a importação de uma existente. Revise os termos e condições e, em seguida, pressione **Começar**.

![Comece com Talisman](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-1.webp)

Na tela seguinte, você será solicitado a criar uma senha para proteger sua nova carteira.

![Insira a senha para a Carteira Talisman](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-2.webp)

## Criando uma Conta Ethereum {: #creating-an-ethereum-account }

Para criar sua primeira conta Ethereum, siga as seguintes etapas:

1. Selecione a opção **Ethereum**
2. Dê um nome à sua conta
3. Pressione **Criar**

![Crie sua primeira conta Ethereum no Talisman](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-3.webp)

Após criar sua primeira conta, você será solicitado a fazer backup de sua frase de semente. Esta é uma etapa importante, especialmente porque você tem a opção de derivar posteriormente contas adicionais dessa frase de semente.

![Faça backup de sua frase de semente](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-4.webp)

!!! nota
    Você nunca deve compartilhar sua frase de semente (mnemônico) ou chave privada com ninguém. Isso lhes dá acesso direto aos seus fundos. Este guia é apenas para fins educacionais.

## Importando uma Conta EVM Existente {: #importing-an-existing-evm-account }

É claro que você pode importar uma conta EVM existente para o Talisman. Para fazer isso, siga as seguintes etapas:

1. Pressione **Adicionar conta**
2. Pressione **Importar**
3. Selecione **Importar via frase de recuperação** (observe que isso funciona para sementes e chaves privadas)

![Configuração de importação de conta existente](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-9.webp)

Na tela seguinte, siga as seguintes etapas:

1. Selecione o tipo de conta **Ethereum**
2. Forneça um nome para sua conta
3. Cole sua semente ou chave privada
4. Se você importou uma frase de semente mnemônica na etapa anterior, selecione quais contas você gostaria de importar
5. Pressione **Importar**

![Etapas finais de importação de conta existente](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-10.webp)

## Configurando o Talisman para sua Rede EVM {: #configuring-talisman-for-your-evm-network }

Para configurar o Talisman para sua rede EVM Tanssi, abra a extensão Talisman e clique na guia **Mais Opções**. Em seguida, siga as seguintes etapas:

1. Selecione **Configurações**
2. Marque a caixa **Habilitar testnets**
3. Pressione **Adicionar Rede**

![Adicionar Rede no Talisman](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-6.webp)

Na página seguinte, você será solicitado a inserir os detalhes da rede para sua rede alimentada pela Tanssi. Para fins de demonstração, a rede EVM de demonstração é usada aqui, mas você pode substituir esses detalhes por sua própria rede. Para adicionar sua rede ao Talisman, siga as seguintes etapas:

1. Cole a URL RPC da sua rede alimentada pela Tanssi. A URL RPC da rede EVM de demonstração é `{{ networks.dancelight.demo_evm_rpc_url }}`. Outros parâmetros serão preenchidos automaticamente
2. Cole a URL do explorador de blocos da sua rede alimentada pela Tanssi. A URL do explorador de blocos da rede EVM de demonstração é `{{ networks.dancelight.demo_evm_blockscout_url }}`
3. Marque a caixa **Esta é uma testnet**, se aplicável
4. Pressione **Adicionar Rede**

![Adicione os Detalhes da Sua Rede Alimentada por Tanssi](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-7.webp)

Se você tiver um saldo de tokens em sua conta recém-criada para sua rede, verá o saldo no painel Talisman.

## Enviando Ativos em Sua Rede EVM {: #sending-assets-on-your-evm-network }

Para transferir o token nativo da sua rede Tanssi, siga as seguintes etapas:

1. Clique no ícone **Enviar**
2. Clique na conta **Enviar de** desejada
3. Digite o endereço de destino
4. Digite a quantidade de tokens a serem enviados
5. Revise os detalhes da transação e, em seguida, pressione **Revisar** e, posteriormente, **Confirmar**

![Envie fundos em sua rede EVM](/images/builders/toolkit/ethereum-api/wallets/talisman/talisman-8.webp)

Este guia se concentrou especificamente na configuração do Talisman para trabalhar com sua rede EVM alimentada pela Tanssi, mas o Talisman também é uma carteira completa para contas Substrate (Polkadot). Na seção da API Substrate, você encontrará um tutorial semelhante para configurar o Talisman para trabalhar com cadeias baseadas em Substrate.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
