---
title: Configurar uma Conta Proxy Sequenciadora
description: Siga estas instruções passo a passo para configurar uma conta proxy para gerenciar as atividades do sequenciador em nome de sua conta sequenciadora primária.
icon: octicons-shield-lock-24
categories: Sequenciadores
---

# Configurar uma Conta Proxy

## Introdução {: #introduction }

Contas proxy podem ser configuradas para realizar um número limitado de ações em nome de contas primárias e ajudar a manter as contas subjacentes seguras. Como sequenciador no Tanssi, é uma boa ideia aproveitar as contas proxy para interagir com a rede em vez de sua conta sequenciadora.

O tipo de proxy de staking permite convenientemente que a conta proxy gerencie atividades de staking, como delegar e rotacionar chaves de sessão, em nome da conta sequenciadora primária, transformando-a efetivamente em uma "hot wallet" para realizar tarefas regulares de manutenção em nome de sua conta sequenciadora "cold wallet". Para maior segurança, você pode rotacionar regularmente a conta proxy.

Contas proxy também podem ajudá-lo a implementar o princípio de privilégio mínimo para controle de acesso. Por exemplo, se você tiver vários membros da equipe, poderá fornecer a eles o acesso mínimo necessário para realizar suas tarefas por meio de uma conta proxy específica.

Este tutorial irá guiá-lo pela configuração de uma conta proxy de staking no [Dancelight](/pt/builders/tanssi-network/testnet/dancelight/){target=\_blank} especificamente para operações como um sequenciador. Em seguida, demonstrará como iniciar uma delegação usando o novo proxy de staking criado.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, você precisará ter:

- O [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} aberto e conectado ao Dancelight
- Criar ou ter duas contas acessíveis no portal do desenvolvedor
- Ambas as contas precisarão ser financiadas, e a conta do sequenciador precisará de pelo menos a autodelegação mínima necessária para se tornar um sequenciador ativo ({{ networks.dancelight.sequencers.minimum_self_delegation }} {{ networks.dancelight.token_symbol }} para Dancelight)

Se você precisar de ajuda para importar suas contas para o portal do desenvolvedor, consulte o guia [Conectando-se ao Portal do Desenvolvedor](/pt/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\_blank}.
## Criando uma Conta Proxy de Staking {: #creating-a-staking-proxy-account }

Há algumas maneiras de criar contas proxy no [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/accounts){target=\_blank}, seja na página **Extrinsics** ou na página **Accounts**. No entanto, para criar um proxy com atraso de tempo, você precisará usar a página **Extrinsics**. Um atraso de tempo fornece uma camada adicional de segurança aos proxies, especificando um período de atraso com base no número de blocos. Isso impedirá que a conta proxy execute uma transação até que o período de atraso termine. O atraso dá tempo para que a conta primária que controla o proxy revise as transações pendentes e fornece um período limitado de tempo para cancelar quaisquer ações.

Você também tem a opção de criar um proxy do tipo **Any**, que concede à conta proxy controle total e irrestrito sobre a conta primária. Isso significa que a conta proxy pode transferir fundos e realizar qualquer ação arbitrária. A demonstração a seguir mostrará como configurar um proxy **Staking**, que é mais restritivo do que um proxy **Any**, pois limita as funções às atividades relacionadas ao staking, como delegar, não delegar e mapear chaves de sessão.

Para começar a criar sua conta proxy, vá para a aba **Developer** e selecione [**Extrinsics**](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank} no menu suspenso. Em seguida, você precisará seguir as seguintes etapas:

1. Selecione a conta primária
2. No menu suspenso **submit the following extrinsic**, selecione **proxy**
3. Escolha a extrínseca **addProxy**
4. Escolha **Id** no menu suspenso **AccountIdLookupOf**
5. Selecione a conta de **delegate** para o proxy
6. No menu suspenso **proxyType**, escolha **Staking**
7. Opcionalmente, você pode adicionar um atraso de tempo usando um número especificado de blocos para adicionar uma camada adicional de segurança para que a conta primária revise a transação pendente
8. Clique em **Submit Transaction**

![Adicionar uma conta proxy na página Extrinsics do portal do desenvolvedor](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-1.webp)

Você será solicitado a autorizar e assinar a transação. Clique em **Sign and Submit** para criar o relacionamento proxy. Depois que a transação for enviada com sucesso, você receberá algumas notificações confirmando a transação.

Como mencionado anteriormente, você também pode criar um proxy na página **Accounts**. Para fazer isso, navegue até a página **Accounts** e siga as seguintes etapas:

1. Selecione os três pontos verticais próximos à conta primária
2. Selecione **Add proxy**

![Selecione o item de menu Add proxy na página Accounts do portal do desenvolvedor](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-2.webp)

!!! nota
    Se a conta já tiver um proxy, **Manage proxies** será exibido como uma opção em vez de **Add proxy**.

Uma janela pop-up aparecerá e você poderá inserir as informações necessárias, como a conta proxy/primária, a conta proxy e o tipo de proxy para criar uma conta proxy. Primeiro, clique em **Add proxy**.

![Adicionar uma conta proxy na página Accounts do portal do desenvolvedor](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-3.webp)

Em seguida, siga as seguintes etapas:

1. Selecione a conta que você gostaria de definir como um proxy
2. Selecione o tipo de proxy
3. Clique em **Submit** e assine a transação

![Adicionar os detalhes da conta proxy, incluindo a conta proxy e o tipo](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-4.webp)

Na próxima seção, você aprenderá como verificar se sua conta proxy foi configurada com sucesso.

## Verificando Sua Conta Proxy {: #verifying-your-proxy-account }

Você pode verificar se sua conta proxy foi configurada com sucesso de algumas maneiras: ou na página **Accounts** ou na página **Chain state**.

Para verificar suas contas proxy na página [**Chain state**](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, você pode seguir as seguintes etapas:

1. No menu suspenso **selected state query**, selecione **proxy**
2. Escolha a extrínseca **proxies**
3. Selecione sua conta primária/proxy
4. Clique no botão **+** para enviar a consulta

![Verifique suas contas proxy na página Extrinsics do portal do desenvolvedor](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-5.webp)

O resultado aparecerá na página mostrando informações sobre todos os seus proxies, incluindo o endereço da conta delegate/proxy, o tipo de proxy, o período de atraso, se um foi especificado, e o valor total da garantia para todos os seus proxies em Planck.

Você também pode verificar suas contas proxy na página **Accounts**. Para fazer isso, navegue até a página **Accounts** e deve haver um símbolo de Proxy ao lado da conta primária. Passe o mouse sobre o ícone e clique em **Manage proxies** para revisar seus proxies.

![Passe o mouse sobre o ícone do proxy para gerenciar seus proxies na página Accounts dos Polkadot.js Apps](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-6.webp)

Uma janela pop-up aparecerá onde você pode ver uma visão geral de todas as suas contas proxy.

![Revise suas contas proxy](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-7.webp)

## Executando uma Transação Proxy {: #executing-a-proxy-transaction }

Agora que você criou uma conta proxy e verificou que ela foi configurada com sucesso, você pode executar uma transação usando a conta proxy de staking em nome de sua conta sequenciadora, também conhecida como conta primária ou conta que está sendo proxyada. O exemplo a seguir demonstrará como iniciar uma autodelegação. A configuração de proxy mostrada é um exemplo realista de como você pode ter seu próprio proxy configurado para sua conta primária do portal do desenvolvedor.

Para executar uma transação, você pode navegar de volta para a [página **Extrinsics**](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank} e seguir as seguintes etapas:

1. Selecione a conta proxy para enviar a transação no menu suspenso **using the select account**
2. No menu **submit the following extrinsic**, selecione **proxy**
3. Escolha a extrínseca **proxy**
4. Escolha **Id** no menu suspenso **AccountIdLookupOf**
5. Selecione a conta primária no menu suspenso **real**
6. Selecione a chamada **pooledStaking**
7. Escolha a extrínseca **requestDelegate**
8. Digite o endereço do **candidate**, que é a conta do sequenciador
9. Selecione **AutoCompounding** ou **ManualRewards** no campo **pool**
10. Digite o valor a ser apostado. Esse valor deve atender ao mínimo, que, para Dancelight, é {{ networks.dancelight.sequencers.minimum_self_delegation }} {{ networks.dancelight.token_symbol }} tokens. Você precisará enviar o valor incluindo as doze casas decimais que a Tanssi Network usa, portanto, para um valor de {{ networks.dancelight.sequencers.minimum_self_delegation }}, você precisará digitar `{{ networks.dancelight.sequencers.minimum_self_delegation }}000000000000`
11. Clique em **Submit Transaction**

![Execute uma transação proxy na página Extrinsics dos Polkadot.js Apps](/images/node-operators/sequencers/operational-tasks/proxy-accounts/proxy-8.webp)

Uma janela pop-up aparecerá para que você autorize e assine a transação. Digite sua senha para a conta proxy e clique em **Sign and Submit**. Para confirmar a solicitação de delegação, você precisará executar a solicitação pendente após duas sessões. Consulte as instruções para [executar solicitações pendentes](/pt/node-operators/sequencers/onboarding/account-setup/#execute-pending-request){target=\_blank} para obter um guia passo a passo. Você também pode [mapear suas chaves de sessão para sua conta de sequenciador](/pt/node-operators/sequencers/onboarding/account-setup/#map-session-keys){target=\_blank} via proxy.

Depois de mapear suas chaves de sessão e executar a solicitação de delegação pendente, você pode [verificar se seu sequenciador está na lista de candidatos elegíveis](/pt/node-operators/sequencers/onboarding/account-setup/#verify){target=\_blank}.

É isso! Você executou com sucesso uma transação usando uma conta proxy em nome de sua conta sequenciadora primária.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
