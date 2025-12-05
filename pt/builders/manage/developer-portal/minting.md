---
title: Cunhagem de Tokens Nativos com Sudo
description: Aprenda a usar a chave Sudo para gerenciar sua rede alimentada pelo Tanssi e executar a ação privilegiada de cunhar tokens nativos, alterando a emissão total.
icon: material-creation-outline
categories: Appchain
---

# Usando Sudo para Cunhar Tokens Nativos

## Introdução {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} é um módulo que permite que chamadas de tempo de execução privilegiadas sejam despachadas quando chamadas da conta Sudo. Sudo é, por vezes, referido coloquialmente como um superusuário ou uma conta semelhante a um deus. Isso permite que você realize ações privilegiadas no curso do gerenciamento de sua rede, como cunhar novos tokens nativos.

Neste guia, você aprenderá como usar Sudo para cunhar corretamente novos tokens nativos. Este guia abrangente mostra como verificar o saldo de uma conta existente antes de atribuir a ela um novo saldo com acesso Sudo.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará do seguinte:

- Uma rede com tecnologia Tanssi (Quick Trial ou Dedicated)
- A conta Sudo da sua rede conectada aos seus Polkadot.js Apps. Você pode consultar o [guia de gerenciamento do Sudo](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} para obter instruções sobre como injetar sua conta Sudo nos Polkadot.js Apps

--8<-- 'text/pt/builders/manage/locate-sudo-account.md'

## Cunhagem de Tokens {: #minting-tokens }

Como você sabe, a conta Sudo tem a capacidade de realizar funções privilegiadas, incluindo a cunhagem de tokens adicionais. Ao configurar sua rede no [Tanssi dApp](https://apps.tanssi.network){target=\_blank}, você pode especificar os saldos da conta genesis. Em outras palavras, você tem a capacidade de dotar as contas com saldos iniciais ao iniciar sua rede Tanssi. No entanto, você também pode cunhar novos tokens após o lançamento com a ajuda da conta Sudo.

!!! nota
    Este tutorial demonstra a atribuição de saldos de tokens arbitrários em uma rede TestNet que não tem valor. Você deve considerar cuidadosamente as ramificações de criar tokens adicionais em sua própria rede com tecnologia Tanssi.

### Verificando o Saldo da Conta Existente {: #checking-existing-account-balance }

A próxima seção demonstrará como atribuir saldos de tokens arbitrários a contas usando a conta Sudo. Este processo substituirá o saldo existente da conta especificada, portanto, verificar se a conta está vazia é uma boa prática antes de continuar. Para verificar o saldo de uma conta, siga estas etapas:

1. Navegue até a guia **Desenvolvedor** do [Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} e clique em **Chain State** (Estado da Cadeia)
2. Selecione o pallet **system** para consultar
3. Selecione **account** (conta)
4. Cole o endereço da conta ou selecione-o no menu suspenso
5. Pressione o ícone **+**
6. Você verá as informações do saldo retornadas na parte inferior, incluindo saldos livres, reservados e congelados
![Verificar saldos no Polkadot.js Apps](/images/builders/manage/developer-portal/minting/minting-2.webp)

### Atribuindo Saldos com Sudo {: #assigning-balances-with-sudo }

Para atribuir um saldo de conta a uma conta, certifique-se de ter sua conta Sudo acessível no [Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Em seguida, siga estas etapas:

1. Navegue até a guia **Developer** dos Polkadot.js Apps para sua rede Tanssi
1. Clique em **Sudo**. Se você não vir **Sudo** neste menu, você não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que sua conta Sudo seja injetada pela sua carteira e conectada aos Polkadot.js Apps
1. Selecione o pallet **balances**
1. Selecione o método **forceSetBalance**
1. Cole o endereço da conta para dotar com tokens ou selecione-o no menu suspenso
1. Insira a quantidade de tokens para dotar a conta. Neste exemplo, especificamos `9000000000000000000` para nove tokens nativos. Lembre-se que as redes EVM com tecnologia Tanssi têm 18 decimais, enquanto as redes Substrate ou personalizadas configuram os decimais ao lançar a cadeia. Se você não tiver certeza de quantos decimais sua rede tem, navegue até a guia **Settings** e clique em **Metadata**
1. Pressione **Submit Sudo** (Enviar Sudo) e confirme a transação em sua carteira

![Forçar a atribuição de saldos no Polkadot.js Apps](/images/builders/manage/developer-portal/minting/minting-3.webp)

E é isso! A seção [Portal do Desenvolvedor](/pt/builders/manage/developer-portal/) tem muitos mais guias sobre como gerenciar sua rede Tanssi.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
