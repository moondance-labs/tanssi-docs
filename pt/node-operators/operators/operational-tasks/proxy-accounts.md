---
title: Configurar uma Conta Proxy de Operator
description: Siga este guia passo a passo para habilitar contas proxy e executar tarefas operacionais (como rotação de chaves) em nome da sua conta de operator com segurança.
icon: octicons-shield-lock-24
categories: Operators
---

# Configurar uma Conta Proxy de Operator

## Introdução {: #introduction }

Contas proxy podem ser configuradas para executar um número limitado de ações em nome de contas primárias e ajudar a manter as contas subjacentes seguras. Como operator na Tanssi, é benéfico usar contas proxy para interagir com a rede em vez da sua conta.

O tipo de proxy `SessionKeyManagement` permite que a conta gire chaves de sessão em nome da conta primária. Ele transforma a proxy em uma “hot wallet” que executa tarefas de manutenção regulares em nome da sua “cold wallet” de operator. Para maior segurança, você pode rotacionar a conta proxy regularmente.

Contas proxy também ajudam a aplicar o princípio do menor privilégio para controle de acesso. Por exemplo, se você tiver vários membros na equipe, pode conceder a eles apenas o acesso mínimo necessário para executar suas funções via uma conta proxy específica.

Este tutorial orienta na configuração de uma conta proxy `SessionKeyManagement` no [Dancelight](/pt/builders/tanssi-network/testnet/dancelight/){target=\_blank} especificamente para ações de operator e demonstra como rotacionar suas novas chaves usando o proxy.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, você precisará:

- Abrir o portal do desenvolvedor

    === "Tanssi MainNet"

        [Portal do desenvolvedor da Mainnet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/){target=\_blank}

    === "Dancelight TestNet"

        [Portal do desenvolvedor da TestNet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/){target=\_blank}

- Criar ou ter duas contas acessíveis no portal do desenvolvedor
- Ambas as contas precisam estar financiadas com tokens

Se precisar de ajuda para importar suas contas no portal do desenvolvedor, consulte o guia [Conectando ao Portal do Desenvolvedor](/pt/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\_blank}.

## Criar uma Conta Proxy {: #create-a-proxy-account }

Há algumas maneiras de criar contas proxy no portal do desenvolvedor, seja na página **Extrinsics** ou na página **Accounts**. Porém, é necessário usar a página **Extrinsics** para criar um proxy com atraso de tempo. O atraso fornece uma camada extra de segurança especificando um período baseado no número de blocos. Essa configuração impede que a conta proxy execute uma transação até que o período termine, permitindo que a conta primária que controla o proxy revise ou cancele transações pendentes.

Você também pode criar um proxy do tipo `Any`, que concede controle total e irrestrito da conta primária ao proxy. A conta proxy pode transferir fundos e realizar qualquer ação arbitrária. A demonstração a seguir mostra como configurar um proxy `SessionKeyManagement`, mais restritivo do que um proxy `Any`, pois limita a funcionalidade a atividades relacionadas ao mapeamento de chaves de sessão.

### Usando a Seção Extrinsics {: #creating-proxy-account-using-extrinsics }

Para começar a criar sua conta proxy, acesse a aba **Developer** e selecione **Extrinsics** no menu. Em seguida, siga estes passos:

1. Selecione a conta primária
2. No menu **submit the following extrinsic**, selecione **proxy**
3. Escolha o extrínseco **addProxy**
4. Em **AccountIdLookupOf**, selecione **Id**
5. Selecione a conta **delegate** para o proxy
6. No menu **proxyType**, selecione **SessionKeyManagement**
7. Opcionalmente, adicione um atraso usando um número de blocos para fornecer uma camada adicional de segurança para a conta primária revisar a transação pendente
8. Clique em **Submit Transaction**

![Adicionar uma conta proxy a partir da página Extrinsics do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-1.webp)

Em seguida, você será solicitado a autorizar e assinar a transação. Clique em **Sign and Submit** para criar a relação de proxy. Quando a transação for enviada com sucesso, você receberá notificações confirmando a transação.

### Usando a Seção Accounts {: #creating-proxy-account-using-accounts }

Outro método para criar um proxy é pela seção **Accounts** do portal do desenvolvedor. Para isso, navegue até a página **Accounts** e siga estes passos:

1. Selecione os três pontos verticais ao lado da conta primária
2. Selecione **Add proxy**

![Selecionar a opção Add proxy na página Accounts do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-2.webp)

!!! note
    Se a conta já tiver um proxy, **Manage proxies** aparecerá como opção em vez de **Add proxy**.

Uma janela pop-up aparecerá onde você pode inserir as informações necessárias, como a conta primária, a conta proxy e o tipo de proxy, para criar uma conta proxy. Primeiro, clique em **Add proxy**.

![Adicionar uma conta proxy na página Accounts do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-3.webp)

Depois, siga estes passos:

1. Selecione a conta que deseja definir como proxy
2. Selecione o tipo de proxy
3. Clique em **Submit** e assine a transação

![Adicionar os detalhes da conta proxy, incluindo a conta e o tipo](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-4.webp)

Na próxima seção, você aprenderá como verificar se sua conta proxy foi configurada com sucesso.

## Verificar sua Conta Proxy {: #verify-your-proxy-account }

Você pode verificar se sua conta proxy foi configurada com sucesso de duas maneiras: pela página **Accounts** ou pela página **Chain state**.

### Usando a Seção Chain State {: #verifying-your-proxy-account-chain-state }

Para verificar suas contas proxy na seção **Chain state** do portal do desenvolvedor, siga estes passos:

1. No menu **selected state query**, selecione **proxy**
2. Escolha a entrada **proxies**
3. Selecione ou cole sua conta primária/proxy
4. Clique no botão **+** para enviar a consulta

![Verificar suas contas proxy pela página Chain state do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-5.webp)

O resultado aparecerá na página mostrando informações sobre seus proxies, incluindo o endereço da conta delegate/proxy, o tipo de proxy, o período de atraso se um foi especificado e o valor total em bond de todos os seus proxies, expresso em Planck.

### Usando a Seção Accounts {: #verifying-your-proxy-account-accounts-section }

Você também pode verificar suas contas proxy na seção **Accounts** do portal do desenvolvedor. Para isso, navegue até a página **Accounts** e siga estes passos:

1. Clique nos três pontos verticais ao lado da conta primária
2. Selecione **Manage proxy**

!!! note
    Deve haver um símbolo de proxy próximo à conta primária. Para o mesmo efeito, passe o mouse sobre o ícone e clique em **Manage proxies**.

![Gerenciar seus proxies na página Accounts do portal do desenvolvedor](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-6.webp)

Uma janela pop-up aparecerá onde você pode ver uma visão geral das suas contas proxy.

![Revisar suas contas proxy](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-7.webp)

## Executar uma Transação via Proxy {: #execute-a-proxy-transaction }

Agora que você criou uma conta proxy e verificou que ela foi configurada com sucesso, pode executar uma transação usando o proxy em nome da sua conta primária. O exemplo a seguir define chaves para um nó. A configuração de proxy exibida é um exemplo realista de como você pode configurar seu próprio proxy para sua conta primária no portal do desenvolvedor.

Para executar uma transação, volte à página **Extrinsics** e siga estes passos:

1. Selecione a conta proxy em **using the select account** para enviar a transação
2. No menu **submit the following extrinsic**, selecione **proxy**
3. Escolha o extrínseco **proxy**
4. Em **AccountIdLookupOf**, selecione **Id**
5. No menu **real**, selecione a conta primária
6. Selecione a chamada **Session**
7. Escolha a entrada **setKeys**
8. Insira as chaves do nó que deseja mapear para a conta de operator
9. Insira `0x` em **proof**
10. Clique em **Submit Transaction**

![Executar uma transação via proxy na página Extrinsics do Polkadot.js Apps](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-8.webp)

Uma janela pop-up solicitará que você autorize e assine a transação; clique em **Sign and Submit**.

Pronto! Você executou uma transação usando uma conta proxy em nome da sua conta de operator primária.

--8<-- 'text/_disclaimers/third-party-content.md'
