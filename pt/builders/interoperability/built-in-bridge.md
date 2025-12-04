---
title: Usando a Ponte Tanssi Integrada
description: Saiba como usar a ponte Tanssi integrada que conecta Tanssi e Ethereum para converter tokens TANSSI entre sua forma nativa e ERC-20 e vice-versa.
icon: octicons-arrow-switch-24
categories: Basics
---

# Usando a Ponte Tanssi Integrada

## Introdução {: #introduction }

O protocolo Tanssi orquestra componentes de infraestrutura, permitindo que os desenvolvedores lancem seus appchains personalizados em minutos e fornecendo a eles segurança econômica de nível Ethereum pronta para uso. Para facilitar todo o processo para os desenvolvedores, uma [arquitetura de primeira classe](/pt/learn/tanssi/overview/#tanssi-architecture){target=\_blank} foi projetada e implementada.

O [token TANSSI](/pt/builders/tanssi-network/tanssi-token/){target=\_blank} é o motor que permite a integração de diferentes componentes de infraestrutura com [provedores de segurança externos](/pt/learn/tanssi/external-security-providers/symbiotic/){target=\_blank} e alinha incentivos entre vários atores, incluindo detentores de tokens, operadores de nós e construtores de appchain. Para atender a diferentes casos de uso, o token tem duas versões: a moeda nativa da rede Tanssi, TANSSI (Substrate), e sua versão ERC-20, no Ethereum.

Os usuários podem converter de uma versão para outra do token usando uma [ponte sem confiança integrada do Tanssi](/pt/learn/tanssi/tanssi-ethereum-bridge/){target=\_blank}.

Neste guia, você aprenderá como mover seus ativos de Tanssi para Ethereum e vice-versa por meio de uma interface web segura e fácil de usar disponível no [Tanssi dApp](https://apps.tanssi.network/bridge){target=\_blank}, tornando as transferências entre cadeias acessíveis a todos.

## Pré-requisitos {: #prerequisites }

Antes de usar a ponte Tanssi, certifique-se de ter:

Para fazer a ponte de Tanssi para Ethereum:

- Uma [carteira compatível com Substrate](/pt/builders/toolkit/substrate-api/wallets/){target=\_blank}, como [Talisman](/pt/builders/toolkit/substrate-api/wallets/talisman/){target=\_blank}.
- Saldo TANSSI (Substrate) para transferir e pagar as taxas de ponte.
- A conta de destino do tipo Ethereum.

Para fazer a ponte de Ethereum para Tanssi:

- Uma [carteira compatível com Ethereum](/pt/builders/toolkit/ethereum-api/wallets/){target=\_blank}, como [MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.
- Saldo TANSSI (ERC-20) para transferir.
- Saldo ETH para pagar as taxas de ponte.
- A conta de destino do tipo Substrate.

## Fazendo a ponte de tokens TANSSI para Ethereum {: #bridge-to-ethereum}

Se você deseja converter seus tokens TANSSI (Substrate) para TANSSI (ERC-20) no Ethereum, acesse o Tanssi dApp, abra a [seção da ponte](https://apps.tanssi.network/bridge){target=\_blank} e siga estas etapas:

1. Selecione **Mainnet** no menu suspenso **From**.
2. Clique em **Connect Wallet**. Uma janela pop-up aparecerá, permitindo que você selecione sua carteira Substrate preferida e escolha a conta correspondente.

![Selecione a rede Tanssi e conecte a carteira](/images/builders/interoperability/built-in-bridge/built-in-bridge-1.webp)

Agora, com sua carteira conectada:

1. Selecione a conta de destino no menu suspenso **Select recipient address** ou escolha o item **Enter a custom address** e insira manualmente a conta para onde deseja receber os tokens ERC-20.
2. Insira o valor a ser transferido no campo **Balance**. As taxas estimadas de ponte e transação serão exibidas junto com o valor que a conta de destino receberá.
3. Clique em **Send** e assine a transação.

![Executar a Transação](/images/builders/interoperability/built-in-bridge/built-in-bridge-2.webp)

E é isso! Seus tokens serão transferidos quando a próxima sessão começar. Você pode ver quanto tempo resta na sessão atual na barra de progresso.

!!! nota
    - Você pode adicionar facilmente o endereço do contrato TANSSI ERC-20 à sua carteira clicando no ícone **+** mostrado ao lado do seu saldo.
    - As taxas para converter seus tokens TANSSI (Substrate) para TANSSI (ERC-20) podem flutuar ao longo do tempo e devem ser pagas usando TANSSI.

## Fazendo a ponte de ERC-20 TANSSI para a Rede Tanssi {: #bridge-to-tanssi }

Se você deseja converter seus tokens TANSSI (ERC-20) para TANSSI (Substrate) nativo na rede Tanssi, acesse o Tanssi dApp, abra a [seção da ponte](https://apps.tanssi.network/bridge){target=\_blank} e siga estas etapas:

1. Selecione **Ethereum** no menu suspenso **From**.
1. Clique em **Connect Wallet**, selecione sua carteira Ethereum preferida e escolha a conta.

![Selecione Ethereum e conecte a carteira](/images/builders/interoperability/built-in-bridge/built-in-bridge-3.webp)

Agora, com sua carteira conectada:

1. Insira a conta de destino Substrate no campo **Recipient**.
1. Insira o valor a ser transferido no campo **Balance**. As taxas estimadas de ponte e transação serão exibidas junto com o valor que a conta de destino receberá.
1. Clique em **Send** e assine a transação.

![Executar a Transação](/images/builders/interoperability/built-in-bridge/built-in-bridge-4.webp)

E é isso! Seus tokens serão transferidos quando a próxima sessão começar. Você pode ver quanto tempo resta na sessão atual na barra de progresso.

!!! nota
    As taxas para converter seus tokens TANSSI (ERC-20) para TANSSI (Substrate) nativo na rede Tanssi podem flutuar ao longo do tempo e devem ser pagas usando ETH.
