---
title: Usando Ledger com sua Substrate Appchain
description: Este guia orienta você na configuração e uso de um dispositivo Ledger para interagir com a rede Tanssi ou qualquer uma das appchains Substrate alimentadas pela Tanssi.
icon: material-wallet-outline
categories: Substrate-Template
---

# Interagindo com as Tanssi Chains do Substrate usando Ledger

## Introdução {: #introduction }

Desenvolvedores e usuários de redes Substrate, como a rede Tanssi ou appchains Substrate não-EVM alimentadas pela Tanssi, têm uma variedade de opções quando se trata de carteiras. Em relação às carteiras frias, que armazenam suas chaves privadas em um ambiente seguro e offline, [Ledger](https://www.ledger.com/){target=\_blank} é uma das opções mais populares. Ledger oferece suporte total para blockchains Substrate, como a rede Tanssi.

Os dispositivos Ledger são carteiras de hardware projetadas para armazenar as chaves privadas offline. Eles são usados para verificar e assinar as transações, mas ainda precisam de uma camada de software para fornecer a interface do usuário que interage com as redes, constrói as transações e envia as transações assinadas de volta para a rede assim que o usuário as verifica.

Este guia leva você por todas as etapas necessárias para usar seu dispositivo Ledger com as Tanssi Chains do Substrate.

## Configurando seu dispositivo Ledger {: #setting-up-ledger-device }

Se você tiver um dispositivo Ledger novo, consulte o [site oficial](https://support.ledger.com/article/4404389503889-zd){target=\_blank} para obter um guia sobre como iniciá-lo com a configuração inicial.

Agora, com seu Ledger já iniciado, instale o aplicativo _Polkadot_ seguindo estas etapas:

1. Abra o aplicativo Ledger Live no seu computador.
2. Vá para My Ledger.
3. Conecte e desbloqueie o dispositivo.

Por fim, procure o aplicativo **Polkadot (DOT)** no Ledger Live e instale-o em seu dispositivo.

!!! nota
    Por que Polkadot? Tanssi é construído usando Substrate, a mesma estrutura que alimenta Polkadot. Como resultado, embora Tanssi e Polkadot sejam redes separadas, eles compartilham o mesmo esquema de assinatura criptográfica. Isso significa que o aplicativo Ledger chamado **Polkadot (DOT)** é totalmente compatível com Tanssi.

![Instalar Polkadot no Ledger Live](/images/builders/toolkit/substrate-api/wallets/ledger/ledger-1.webp)

E é isso. Seu dispositivo agora possui uma conta Substrate e é capaz de assinar transações na Tanssi e em qualquer appchain não-EVM alimentada pela Tanssi.

## Adicionando o Ledger a uma carteira quente {: #adding-Ledger-hot-wallet }

Conforme apresentado na [introdução](#introduction), uma carteira de hardware Ledger fornece armazenamento seguro offline para chaves privadas, permitindo que os usuários verifiquem e assinem transações. No entanto, por design, ele não pode interagir com blockchains ou dApps por si só, nem oferece uma interface do usuário para gerenciar ativos. Para complementar o dispositivo, uma carteira quente é necessária. O usuário pode escolher qualquer carteira Substrate, como [Talisman](/builders/toolkit/substrate-api/wallets/talisman/){target=\_blank} ou [SubWallet](/builders/toolkit/substrate-api/wallets/subwallet/){target=\_blank}.

Para fins de demonstração, mostraremos como configurar o Talisman para funcionar com sua carteira de hardware, mas essas etapas são geralmente aplicáveis a qualquer outra carteira habilitada para Substrate que suporte Ledger. Para acompanhar as etapas, certifique-se de ter [o Talisman instalado](/builders/toolkit/substrate-api/wallets/talisman/#setting-up-talisman){target=\_blank} no seu navegador, em seguida, abra a extensão e:

1. Pressione o ícone **+** (Adicionar conta).
2. Clique na guia **Conectar**.
3. Selecione **Conectar Ledger**.

![Conectar Ledger](/images/builders/toolkit/substrate-api/wallets/ledger/ledger-2.webp)

Na tela seguinte, siga estas etapas:

1. Selecione **Polkadot**. Outras opções serão apresentadas abaixo.
2. Selecione **Polkadot** no menu suspenso.
3. Selecione **Aplicativo Polkadot** na caixa. Você será solicitado a conectar seu ledger e abrir o aplicativo Polkadot.
4. Certifique-se de que seu ledger está conectado com sucesso.
5. Clique em **Continuar**.

![Conectar Ledger](/images/builders/toolkit/substrate-api/wallets/ledger/ledger-3.webp)

Na próxima etapa, você será apresentado a uma lista de contas derivadas. Selecione aquela que você deseja importar, clique em **Continuar**, e pronto! Sua carteira Talisman agora pode assinar transações usando seu dispositivo Ledger.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
