---
title: Configurar uma Conta Proxy de Operador
description: Siga este guia passo a passo para permitir que as contas proxy realizem com segurança tarefas operacionais (como rotação de chaves) em nome da sua conta de operador.
icon: octicons-shield-lock-24
categories: Operadores
---

# Configurar uma Conta Proxy de Operador

## Introdução {: #introduction }

As contas proxy podem ser configuradas para realizar um número limitado de ações em nome das contas primárias e ajudar a mantê-las seguras. Como operador na Tanssi, é benéfico usar contas proxy para interagir com a rede em vez da sua conta principal.

O tipo de proxy `SessionKeyManagement` permite que a conta gire as chaves de sessão em nome da conta primária. Ele a transforma em uma “carteira quente” que executa tarefas regulares de manutenção em nome da sua conta de operador “carteira fria”. Para maior segurança, você pode girar regularmente a sua conta proxy.

As contas proxy também ajudam a implementar o princípio do privilégio mínimo para controle de acesso. Por exemplo, se você tiver vários membros na equipe, pode conceder o acesso mínimo necessário para realizarem suas tarefas por meio de uma conta proxy específica.

Este tutorial mostra como configurar uma conta proxy `SessionKeyManagement` em [Dancelight](/builders/tanssi-network/testnet/dancelight/){target=\_blank} especificamente para ações relacionadas ao operador e como girar suas novas chaves usando o proxy.

## Verificando os Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, você precisará:

- Abrir o portal do desenvolvedor

  === "Tanssi MainNet"

  
  [Portal do desenvolvedor da Mainnet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/){target=_blank}
  

  === "Dancelight TestNet"

  
  [Portal do desenvolvedor da TestNet](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/){target=_blank}
  

- Criar ou ter duas contas acessíveis no portal do desenvolvedor
- Ambas as contas precisam estar financiadas com tokens

Se precisar de ajuda para importar suas contas para o portal do desenvolvedor, consulte o guia [Conectando-se ao Portal do Desenvolvedor](/pt/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\_blank}.

## Criar uma Conta Proxy {: #create-a-proxy-account }

Você pode criar contas proxy no portal do desenvolvedor pela página **Extrinsics** ou pela página **Accounts**. No entanto, a criação de um proxy com atraso (time-delayed) deve ser feita via **Extrinsics**, pois o atraso adiciona uma camada extra de segurança, permitindo que a conta primária revise ou cancele a transação antes da execução.

Também é possível criar um proxy do tipo `Any`, que concede controle total sobre a conta primária. O exemplo a seguir usa `SessionKeyManagement`, mais restritivo, limitando-se a ações de mapeamento de chaves de sessão.

### Usando a Seção Extrinsics {: #creating-proxy-account-using-extrinsics }

Para criar sua conta proxy na aba **Developer** → **Extrinsics**:

1. Selecione a conta primária.
2. No menu **submit the following extrinsic**, escolha **proxy**.
3. Selecione o extrínseco **addProxy**.
4. Em **AccountIdLookupOf**, escolha **Id**.
5. Selecione a conta **delegate** que será o proxy.
6. Em **proxyType**, escolha **SessionKeyManagement**.
7. Opcionalmente, defina um atraso (número de blocos) para revisão/cancelamento antes da execução.
8. Clique em **Submit Transaction**.

![Adicionar conta proxy na página Extrinsics](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-1.webp)

Autorize e assine a transação (**Sign and Submit**). Após o envio bem-sucedido, você verá notificações de confirmação.

### Usando a Seção Accounts {: #creating-proxy-account-using-accounts }

Para criar um proxy via **Accounts**:

1. Na página **Accounts**, clique nos três pontos verticais ao lado da conta primária.
2. Selecione **Add proxy**.

![Adicionar proxy na página Accounts](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-2.webp)

!!! nota
    Se a conta já tiver um proxy, a opção exibida será **Manage proxies**.

Em seguida, preencha os dados:

1. Escolha a conta que será o proxy.
2. Selecione o tipo de proxy.
3. Clique em **Submit** e assine a transação.

![Detalhes do proxy](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-4.webp)

Na próxima seção, você verá como verificar se o proxy foi configurado.

## Verificar sua Conta Proxy {: #verify-your-proxy-account }

Você pode verificar as contas proxy pela página **Accounts** ou pela página **Chain state**.

### Usando a Seção Chain State {: #verifying-your-proxy-account-chain-state }

1. Em **selected state query**, selecione **proxy**.
2. Escolha **proxies**.
3. Selecione ou cole sua conta primária/proxy.
4. Clique em **+** para enviar a consulta.

![Verificar proxies via chain state](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-5.webp)

O resultado mostrará conta delegada, tipo de proxy, atraso (se houver) e valor total em garantia (Planck).

### Usando a Seção Accounts {: #verifying-your-proxy-account-accounts-section }

1. Na página **Accounts**, clique nos três pontos verticais ao lado da conta primária.
2. Selecione **Manage proxy**.

!!! nota
    Um ícone de proxy aparece ao lado da conta primária; passe o cursor e clique em **Manage proxies**.

![Gerenciar proxies na página Accounts](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-6.webp)

Uma janela exibirá uma visão geral das contas proxy.

![Revisar contas proxy](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-7.webp)

## Executar uma Transação via Proxy {: #execute-a-proxy-transaction }

Com o proxy configurado e verificado, você pode executar uma transação em nome da conta primária. O exemplo a seguir define chaves para um nó.

1. Volte à página **Extrinsics**.
2. Em **using the select account**, escolha a conta proxy.
3. Em **submit the following extrinsic**, selecione **proxy**.
4. Escolha o extrínseco **proxy**.
5. Em **AccountIdLookupOf**, selecione **Id**.
6. Em **real**, selecione a conta primária.
7. Selecione a chamada **Session**.
8. Escolha a entrada **setKeys**.
9. Insira as chaves do nó a mapear para a conta do operador.
10. Em **proof**, insira `0x`.
11. Clique em **Submit Transaction**.

![Executar transação via proxy](/images/node-operators/operators/operational-tasks/proxy-accounts/proxy-accounts-8.webp)

Autorize e assine (**Sign and Submit**). Pronto! Você executou uma transação usando uma conta proxy em nome da conta de operador primária.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
