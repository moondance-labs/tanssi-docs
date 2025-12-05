---
title: Gerenciando a Conta Sudo
description: Aprenda como gerenciar a conta Sudo da sua rede, incluindo como visualizar e importar a chave Sudo no Polkadot.js Apps e alterar a chave Sudo atual.
icon: octicons-key-24
categories: Appchain
---

# Gerenciando a Conta Sudo da Sua Rede

## Introdução {: #introduction }

[Sudo](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/index.html){target=\_blank} é um módulo que permite que chamadas de tempo de execução privilegiadas sejam despachadas quando chamadas da conta Sudo. Sudo é, por vezes, coloquialmente referido como um superusuário ou uma conta semelhante a um deus. Só pode haver uma única conta Sudo de cada vez. No entanto, as chaves Sudo podem ser rodadas para dar privilégios Sudo a uma nova conta.

Todas as redes com tecnologia Tanssi vêm com a paleta Sudo por padrão, e você é obrigado a designar uma conta como o endereço Sudo ao lançar sua rede. Isso permite que você execute ações privilegiadas para gerenciar sua cadeia, como atualizar seu tempo de execução ou cunhar novos tokens nativos. Embora a paleta Sudo seja necessária para lançar sua rede Tanssi no TestNet, você pode desativar a paleta Sudo e fazer a transição para a governança descentralizada após o lançamento do MainNet.

No guia a seguir, você aprenderá como visualizar a conta Sudo atual da sua rede e como alterá-la, além de importá-la para o Polkadot.js Apps. Existem guias semelhantes nesta seção explicando como usar a conta Sudo para realizar ações privilegiadas, como [atualizar seu tempo de execução](/pt/builders/manage/developer-portal/upgrade/){target=\_blank} e [cunhar tokens nativos](/pt/builders/manage/developer-portal/minting/){target=\_blank}.

## Verificando os Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará ter o seguinte:

- Uma rede com tecnologia Tanssi (Quick Trial ou Dedicated)
- A conta Sudo da sua rede conectada ao Polkadot.js Apps da sua rede

--8<-- 'text/pt/builders/manage/locate-sudo-account.md'

### Configurando o Polkadot.js Apps { : #configuring-polkadotjs-apps }

Depois de navegar para o Polkadot.js Apps da sua rede, você precisará adicionar sua conta Sudo. Injetar sua conta Sudo no Polkadot.js Apps a partir de uma extensão do navegador é considerado mais seguro do que armazenar contas diretamente no navegador. No entanto, você ainda pode importar sua conta Sudo diretamente para o cache do navegador. Esse método não requer o uso de nenhuma extensão. Para importar uma conta para o Polkadot.js dessa maneira, siga as etapas:

1. Clique em **Configurações**
2. Em **criação de conta no navegador**, selecione **Permitir a criação de conta local no navegador**
3. Pressione **Salvar**

![Permitir a criação de armazenamento no navegador](/images/builders/manage/developer-portal/sudo/sudo-2.webp)

Em seguida, volte para a guia contas e pressione **Conta**. Você poderá substituir a chave privada pré-gerada pela da sua conta Sudo.

![Adicionando conta no Polkadot.js Apps](/images/builders/manage/developer-portal/sudo/sudo-3.webp)

!!! atenção
    O armazenamento de chaves no navegador não é adequado para ambientes de produção. Este exemplo é fornecido apenas para fins de demonstração em um ambiente TestNet.

## Alterando a Conta Sudo {: #changing-the-sudo-account }

A alteração da conta Sudo da sua rede com tecnologia Tanssi é um processo simples. Também conhecido como rotação de suas chaves Sudo, esse processo removerá o acesso Sudo da conta Sudo existente e concederá à nova conta. Só pode haver uma conta Sudo a qualquer momento. No entanto, você é livre para alterar a conta Sudo quantas vezes quiser.

Antes de começar, certifique-se de ter sua conta Sudo existente acessível no [Polkadot.js Apps](#configuring-polkadotjs-apps). Em seguida, siga as etapas:

1. Navegue até a guia **Desenvolvedor** do Polkadot.js Apps da sua rede
2. Clique em **Sudo**. Se você não vir **Sudo** neste menu, não associou a conta Sudo ao Polkadot.js Apps. Certifique-se de que sua conta Sudo seja injetada pela sua carteira e conectada ao Polkadot.js Apps
3. Selecione o título **Definir chave Sudo**
4. Selecione a nova conta para a qual você transferirá os privilégios Sudo
5. Pressione **Reatribuir** e confirme a transação em sua carteira

![Alterar a conta Sudo no Polkadot.js Apps](/images/builders/manage/developer-portal/sudo/sudo-4.webp)

!!! nota
    Certifique-se de ter acesso à nova conta Sudo. Assim que o Sudo for transferido, ele não poderá ser desfeito sem acesso à chave Sudo atual.

E é isso! A seção [Portal do Desenvolvedor](/pt/builders/manage/developer-portal/) tem muitos mais guias sobre como gerenciar sua rede Tanssi.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
