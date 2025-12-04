---
title: Set Up an Operator Proxy Account
description: Follow this step-by-step guide to enable proxy accounts to securely perform operational tasks (such as keys rotation) on behalf of your operator account.
icon: octicons-shield-lock-24
categories: Operators
---

## { "source_path": "node-operators/operators/operational-tasks/proxy-accounts.md", "source_language": "EN", "target_language": "PT", "checksum": "d0ad197e23987e79a7b8457f6736ebb93edc2b473cfc89e824026cfeef877236", "content": "--- title: Set Up an Operator Proxy Account description: Follow this step-by-step guide to enable proxy accounts to securely perform operational tasks (such as keys rotation) on behalf of your operator account. icon: octicons-shield-lock-24 categories: Operators

# Set Up an Operator Proxy Account

## Introduction {: #introduction }

Proxy accounts can be set up to perform a limited number of actions on behalf of primary accounts and help keep the underlying accounts safe. As an operator on Tanssi, it's beneficial to use proxy accounts to interact with the network in place of your account.

The `SessionKeyManagement` proxy type conveniently allows the account to rotate session keys on behalf of the primary account. It transforms it into a "hot wallet" that performs regular maintenance duties on behalf of your "cold wallet" operator account. For added safety, you can regularly rotate your proxy account.

Proxy accounts can also help you implement the principle of least privilege for access control. For example, if you have multiple team members, you can give them the minimum access required to carry out their duties via a specific proxy account.

This tutorial will walk you through configuring a `SessionKeyManagement` proxy account on [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\\_blank} specifically for operator-related actions and demonstrate how to rotate your newly created keys using the proxy.

## Checking Prerequisites {: #checking-prerequisites }

To follow along with this tutorial, you will need to:

- Open the developer portal

  === "Tanssi MainNet"

  ```
    [Mainnet developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/){target=\\_blank}
  ```

  === "Dancelight TestNet"

  ```
    [TestNet developer portal](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/){target=\\_blank}
  ```

- Create or have two accounts accessible in the developer portal

- Both accounts will need to be funded with tokens

If you need help importing your accounts into the developer portal, please check out the [Connecting to the Developer Portal](/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\\\_blank} guide.

## Create a Proxy Account {: #create-a-proxy-account }

There are a couple of ways you can create proxy accounts in the developer portal, either from the **Extrinsics** page or the **Accounts** page. However, you must use the **Extrinsics** page to create a time-delayed proxy. The delay provides an additional layer of security for proxies by specifying a delay period based on the number of blocks. This setting prevents the proxy account from executing a transaction until the delay period ends, allowing the primary account that controls the proxy to review or cancel pending transactions.

You can also create a proxy of type `Any`, which grants the proxy account full and unrestricted control over the primary account. The proxy account can transfer funds and perform any arbitrary action. The following demo will showcase how to configure a `SessionKeyManagement` proxy, which is more restrictive than an `Any` proxy, as it limits functionality to activities that pertain to mapping session keys.

### Using the Extrinsics Section {: #creating-proxy-account-using-extrinsics }

To start creating your proxy account, head to the **Developer** tab and select **Extrinsics** from the dropdown. Next, you will need to take the following steps:

1. Select the primary account
1. From the **submit the following extrinsic** dropdown, select **proxy**
1. Choose the **addProxy** extrinsic
1. Choose **Id** from the **AccountIdLookupOf** dropdown
1. Select the **delegate** account for the proxy
1. From the **proxyType** dropdown, choose **SessionKeyManagement**
1. Optionally, you can add a time delay using a specified number of blocks to add an additional layer of security for the primary account to review the pending transaction
1. Click **Submit Transaction**

![Add a proxy account from the Extrinsics page of the developer portal](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-1.webp)

You will then be prompted to authorize and sign the transaction. Click **Sign and Submit** to create the proxy relationship. Once the transaction has been successfully submitted, you will receive some notifications confirming the transaction.

### Using the Accounts Section {: #creating-proxy-account-using-accounts }

Another method for creating a proxy is by using the **Accounts** section of the developer portal. To do so, navigate to the **Accounts** page and take the following steps:

1. Select the three vertical dots next to the primary account
1. Select **Add proxy**

![Select the Add proxy menu item from the Accounts page of the developer portal](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-2.webp)

!!! nota
If the account already has a proxy, **Manage proxies** will be displayed as an option instead of **Add proxy**.

A pop-up will appear where you can enter the required information, such as the proxied/primary account, the proxy account, and the type of proxy to create a proxy account. First, click **Add proxy**.

![Add a proxy account from the Accounts page of the developer portal](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-3.webp)

Then, take the following steps:

1. Select the account you would like to set as a proxy
1. Select the proxy type
1. Click **Submit** and sign the transaction

![Add the details of the proxy account, including the proxy account and type](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-4.webp)

In the next section, you will learn how to verify if your proxy account was set up successfully.

## Verify Your Proxy Account {: #verify-your-proxy-account }

You can verify that your proxy account has been successfully set up in two ways: through the **Accounts** page or via the **Chain state** page.

### Using the Chain State Section {: #verifying-your-proxy-account-chain-state }

To check your proxy accounts from the **Chain state** section of the developer portal, you can take the following steps:

1. From the **selected state query** dropdown, select **proxy**
1. Choose the **proxies** entry from the list
1. Select or paste your primary/proxied account
1. Click on the **+** button to send the query

![Verify your proxy accounts via the chain state page of the developer portal](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-5.webp)

The result will appear on the page showing you information about your proxies, including the delegate/proxy account address, the proxy type, the delay period if one was specified, and the total bond amount for all of your proxies, expressed in Planck units.

### Using the Accounts Section {: #verifying-your-proxy-account-accounts-section }

You can also check your proxy accounts from the **Accounts** section of the developer portal. To do so, navigate to the **Accounts** page and take the following steps:

1. Select the three vertical dots next to the primary account
1. Select **Manage proxy**

!!! nota
There should be a proxy symbol next to the primary account. To achieve the same effect, hover over the icon and click **Manage proxies**.

![Manage your proxies via the Accounts page of the developer portal](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-6.webp)

A pop-up will appear where you can see an overview of your proxy accounts.

![Review your proxy accounts](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-7.webp)

## Execute a Proxy Transaction {: #execute-a-proxy-transaction }

Now that you have created a proxy account and verified that it was successfully set up, you can execute a transaction using the proxy on behalf of your primary account. The following example will set keys for a node. The proxy configuration shown is a realistic example of how you might have your own proxy configured for your developer portal primary account.

To execute a transaction, you can navigate back to the **Extrinsics** page and take the following steps:

1. Select the proxy account to submit the transaction from the **using the select account** dropdown
1. From the **submit the following extrinsic** menu, select **proxy**
1. Choose the **proxy** extrinsic
1. Choose **Id** from the **AccountIdLookupOf** dropdown
1. Select the primary account from the **real** dropdown
1. Select the **Session** call
1. Choose the **setKeys** entry
1. Enter the node keys you want to map to your operator's account
1. Enter `0x` in **proof**
1. Click **Submit Transaction**

![Execute a proxy transaction from the Extrinsics page of Polkadot.js Apps](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-8.webp)

A pop-up will appear asking you to authorize and sign the transaction; click on **Sign and Submit**.

That's it! You've successfully executed a transaction using a proxy account on behalf of your primary operator account.

## --8\<-- 'text/pt/_disclaimers/third-party-content.pt.md' ", "translated_content": "--- title: Configurar uma Conta Proxy de Operador description: Siga este guia passo a passo para permitir que as contas proxy realizem com segurança tarefas operacionais (como rotação de chaves) em nome da sua conta de operador. icon: octicons-shield-lock-24 categories: Operadores

# Configurar uma Conta Proxy de Operador

## Introdução {: #introduction }

As contas proxy podem ser configuradas para realizar um número limitado de ações em nome das contas primárias e ajudar a manter as contas subjacentes seguras. Como operador na Tanssi, é benéfico usar contas proxy para interagir com a rede em vez da sua conta.

O tipo de proxy `SessionKeyManagement` permite que a conta gire as chaves de sessão em nome da conta primária. Ele transforma-a numa "carteira quente" que realiza tarefas de manutenção regulares em nome da sua conta de operador de "carteira fria". Para maior segurança, pode girar regularmente a sua conta proxy.

As contas proxy também podem ajudá-lo a implementar o princípio do privilégio mínimo para controlo de acesso. Por exemplo, se tiver vários membros da equipa, pode dar-lhes o acesso mínimo necessário para realizar as suas tarefas através de uma conta proxy específica.

Este tutorial irá guiá-lo na configuração de uma conta proxy `SessionKeyManagement` em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\\\_blank} especificamente para ações relacionadas com o operador e demonstrar como girar as suas chaves recém-criadas usando o proxy.

## Verificação dos Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, precisará de:

- Abrir o portal do desenvolvedor

  === "Tanssi MainNet"

  ```
    [Portal do desenvolvedor da Mainnet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/){target=\\_blank}
  ```

  === "Dancelight TestNet"

  ```
    [Portal do desenvolvedor da TestNet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/){target=\\_blank}
  ```

- Criar ou ter duas contas acessíveis no portal do desenvolvedor

- Ambas as contas precisarão ser financiadas com tokens

Se precisar de ajuda para importar as suas contas para o portal do desenvolvedor, consulte o guia [Conectando-se ao Portal do Desenvolvedor](/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\\\_blank}.

## Criar uma Conta Proxy {: #create-a-proxy-account }

Existem algumas maneiras de criar contas proxy no portal do desenvolvedor, seja na página **Extrinsics** ou na página **Accounts**. No entanto, deve usar a página **Extrinsics** para criar um proxy atrasado. O atraso fornece uma camada adicional de segurança para os proxies, especificando um período de atraso com base no número de blocos. Esta configuração impede que a conta proxy execute uma transação até que o período de atraso termine, permitindo que a conta primária que controla o proxy revise ou cancele as transações pendentes.

Também pode criar um proxy do tipo `Any`, que concede à conta proxy controlo total e irrestrito sobre a conta primária. A conta proxy pode transferir fundos e realizar qualquer ação arbitrária. A seguinte demonstração mostrará como configurar um proxy `SessionKeyManagement`, que é mais restritivo do que um proxy `Any`, pois limita a funcionalidade a atividades relacionadas ao mapeamento de chaves de sessão.

### Usando a Seção Extrinsics {: #creating-proxy-account-using-extrinsics }

Para começar a criar a sua conta proxy, vá para a aba **Developer** e selecione **Extrinsics** no menu suspenso. Em seguida, precisará de seguir os seguintes passos:

1. Selecione a conta primária
1. No menu suspenso **submit the following extrinsic**, selecione **proxy**
1. Escolha o extrinsic **addProxy**
1. Escolha **Id** no menu suspenso **AccountIdLookupOf**
1. Selecione a conta **delegate** para o proxy
1. No menu suspenso **proxyType**, escolha **SessionKeyManagement**
1. Opcionalmente, pode adicionar um atraso de tempo usando um número especificado de blocos para adicionar uma camada adicional de segurança para a conta primária, a fim de revisar a transação pendente
1. Clique em **Submit Transaction**

![Adicionar uma conta proxy na página Extrinsics do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-1.webp)

Será então solicitado que autorize e assine a transação. Clique em **Sign and Submit** para criar a relação proxy. Depois que a transação for enviada com sucesso, receberá algumas notificações confirmando a transação.

### Usando a Seção de Contas {: #creating-proxy-account-using-accounts }

Outro método para criar um proxy é usar a seção **Accounts** do portal do desenvolvedor. Para isso, navegue até a página **Accounts** e siga os seguintes passos:

1. Selecione os três pontos verticais ao lado da conta primária
1. Selecione **Add proxy**

![Selecione o item de menu Add proxy na página Accounts do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-2.webp)

!!! nota
Se a conta já tiver um proxy, **Manage proxies** será exibido como uma opção em vez de **Add proxy**.

Uma janela pop-up aparecerá onde pode inserir as informações necessárias, como a conta proxy/primária, a conta proxy e o tipo de proxy para criar uma conta proxy. Primeiro, clique em **Add proxy**.

![Adicionar uma conta proxy na página Accounts do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-3.webp)

Em seguida, siga estes passos:

1. Selecione a conta que deseja definir como proxy
1. Selecione o tipo de proxy
1. Clique em **Submit** e assine a transação

![Adicione os detalhes da conta proxy, incluindo a conta proxy e o tipo](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-4.webp)

Na próxima seção, aprenderá como verificar se a sua conta proxy foi configurada com sucesso.

## Verificar a sua Conta Proxy {: #verify-your-proxy-account }

Pode verificar se a sua conta proxy foi configurada com sucesso de duas maneiras: através da página **Accounts** ou através da página **Chain state**.

### Usando a Seção Chain State {: #verifying-your-proxy-account-chain-state }

Para verificar as suas contas proxy na seção **Chain state** do portal do desenvolvedor, pode seguir os seguintes passos:

1. No menu suspenso **selected state query**, selecione **proxy**
1. Escolha a entrada **proxies** na lista
1. Selecione ou cole a sua conta primária/proxy
1. Clique no botão **+** para enviar a consulta

![Verifique as suas contas proxy através da página chain state do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-5.webp)

O resultado aparecerá na página, mostrando informações sobre os seus proxies, incluindo o endereço da conta delegate/proxy, o tipo de proxy, o período de atraso, se um foi especificado, e o valor total da garantia para todos os seus proxies, expresso em unidades de Planck.

### Usando a Seção de Contas {: #verifying-your-proxy-account-accounts-section }

Também pode verificar as suas contas proxy na seção **Accounts** do portal do desenvolvedor. Para isso, navegue até a página **Accounts** e siga os seguintes passos:

1. Selecione os três pontos verticais ao lado da conta primária
1. Selecione **Manage proxy**

!!! nota
Deve haver um símbolo de proxy ao lado da conta primária. Para obter o mesmo efeito, passe o cursor sobre o ícone e clique em **Manage proxies**.

![Gerencie os seus proxies através da página Accounts do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-6.webp)

Uma janela pop-up aparecerá onde pode ver uma visão geral das suas contas proxy.

![Reveja as suas contas proxy](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-7.webp)

## Executar uma Transação Proxy {: #execute-a-proxy-transaction }

Agora que criou uma conta proxy e verificou que ela foi configurada com sucesso, pode executar uma transação usando o proxy em nome da sua conta primária. O seguinte exemplo irá definir chaves para um nó. A configuração de proxy mostrada é um exemplo realista de como pode ter o seu próprio proxy configurado para a sua conta primária do portal do desenvolvedor.

Para executar uma transação, pode navegar de volta para a página **Extrinsics** e seguir os seguintes passos:

1. Selecione a conta proxy para enviar a transação no menu suspenso **using the select account**
1. No menu **submit the following extrinsic**, selecione **proxy**
1. Escolha o extrinsic **proxy**
1. Escolha **Id** no menu suspenso **AccountIdLookupOf**
1. Selecione a conta primária no menu suspenso **real**
1. Selecione a chamada **Session**
1. Escolha a entrada **setKeys**
1. Insira as chaves do nó que deseja mapear para a conta do seu operador
1. Insira `0x` em **proof**
1. Clique em **Submit Transaction**

![Execute uma transação proxy na página Extrinsics do Polkadot.js Apps](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-8.webp)

Uma janela pop-up aparecerá pedindo que autorize e assine a transação; clique em **Sign and Submit**.

É isso! Execeu com sucesso uma transação usando uma conta proxy em nome da sua conta de operador primária.

--8\<-- 'text/pt/_disclaimers/third-party-content.pt.md'
",
"branch": "origin/main",
"commit": "730d1002d79d2768953bf457e466ad35881f1040"
}
