---
title: Configurar e Gerenciar Contas de Proxy
description: Siga estas instruções passo a passo para entender como as proxies funcionam e como criar, visualizar, atualizar e remover contas de proxy a partir das contas primárias (proxiadas).
icon: octicons-shield-lock-24
categories: Basics, Appchain
---

# Contas Proxy

## Introdução {: #introduction }

As contas proxy podem ser configuradas para executar um número limitado de ações em nome das contas primárias e são úteis para manter as contas subjacentes seguras. Sua conta proxy pode atuar como uma "carteira quente" para interagir com a rede em nome de sua conta de "carteira fria". Para maior segurança, você pode rotacionar regularmente a conta proxy.

As contas proxy também podem ajudá-lo a implementar o princípio do privilégio mínimo para controle de acesso. Por exemplo, se você tiver vários membros da equipe, poderá fornecer a eles o nível mínimo de acesso necessário para realizar suas tarefas por meio de um tipo específico de conta proxy.

Este tutorial o guiará pela configuração de uma conta proxy no Dancelight, o Tanssi TestNet, especificamente para transferências de saldo. Em seguida, demonstrará como realizar uma transferência de saldo usando o proxy recém-criado.

## Verificando os Pré-requisitos {: #verifying-prerequisites }

Para acompanhar este tutorial, você precisará ter:

- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/accounts){target=\_blank} aberto e conectado ao [Dancelight](/pt/builders/tanssi-network/testnet/dancelight/){target=\_blank}.
- Crie ou tenha duas contas acessíveis no portal do desenvolvedor.
- Pelo menos uma das contas precisará ser financiada com tokens `{{ networks.dancelight.token_symbol }}`.

Se precisar de ajuda para importar suas contas para o Polkadot.js Apps, consulte o guia [Conectando-se ao Polkadot.js](/pt/builders/toolkit/substrate-api/wallets/talisman/#connecting-to-polkadotjs){target=\_blank}.

## Definições Gerais {: #general-definitions }

Ao configurar uma conta proxy, uma garantia para o proxy é retirada de seu saldo livre e movida para seu saldo reservado. A garantia é necessária, pois a adição de um proxy requer espaço de armazenamento na cadeia e é recalculada para cada proxy que você adiciona ou remove. A garantia é devolvida ao seu saldo livre após a remoção de todos os proxies da sua conta.

O depósito é calculado com base em uma base de depósito e um fator de depósito:

- **Base do depósito** - o valor a ser reservado para uma conta ter uma lista de proxies.
- **Fator de depósito** - o valor adicional a ser reservado para cada proxy que a conta primária tiver.

A equação para calcular o depósito é:

```text
base do depósito + fator de depósito * número de proxies
```

Você pode encontrar cada uma das variáveis relevantes abaixo.

=== "Tanssi MainNet"
    |    Variável    |                                      Valor                                       |
    |:--------------:|:--------------------------------------------------------------------------------:|
    |  Base do depósito  |  {{ networks.mainnet.proxy.deposit_base }} {{ networks.mainnet.token_symbol }}  |
    | Fator de depósito | {{ networks.mainnet.proxy.deposit_factor }} {{ networks.mainnet.token_symbol }} |
    |  Máx. de proxies   |                 {{ networks.mainnet.proxy.max_proxies }} proxies                 |

=== "Dancelight TestNet"
    |    Variável    |                                         Valor                                          |
    |:--------------:|:--------------------------------------------------------------------------------------:|
    |  Base do depósito  |  {{ networks.dancelight.proxy.deposit_base }} {{ networks.dancelight.token_symbol }}  |
    | Fator de depósito | {{ networks.dancelight.proxy.deposit_factor }} {{ networks.dancelight.token_symbol }} |
    |  Máx. de proxies   |                  {{ networks.dancelight.proxy.max_proxies }} proxies                   |

## Tipos de Proxy {:  #proxy-types }

Ao criar uma conta proxy, você deve escolher um tipo de proxy que definirá como o proxy pode ser usado. As opções disponíveis são:

- **`Any`** - permite que a conta proxy use qualquer função suportada pela palete proxy. Não há filtragem de chamadas.
- **`NonTransfer`** - este tipo de conta proxy é permitido para enviar qualquer tipo de transação, com exceção de transferências de saldo.
- **`Balances`** - permite que a conta proxy faça apenas transações relacionadas ao envio de fundos.
- **`Governance`** - permite que a conta proxy faça apenas transações relacionadas à palete de governança, como votação ou criação de propostas de democracia. Observe que a governança ainda não está habilitada no Tanssi. Você pode criar contas proxy de governança, mas elas não poderão tomar nenhuma ação até que a governança seja habilitada.
- **`Registrar`** - permite que a conta proxy faça apenas transações relacionadas à palete do registrador.
- **`SudoRegistrar`** - permite que a conta proxy faça apenas transações relacionadas à palete do registrador que precisam ser chamadas por Sudo.
- **`CancelProxy`** - permite que a conta proxy rejeite e remova quaisquer chamadas proxy anunciadas.
- **`Staking`** - permite que a conta proxy execute transações relacionadas a staking, como funções de sequenciador e `session()`.
- **`SessionKeyManagement`** - permite que a conta proxy faça transações relacionadas ao gerenciamento de chaves incluídas na palete de sessão.

Para este guia, você configurará uma conta proxy usando o tipo de proxy de saldos. Como este tipo permite que o proxy gaste fundos em nome da conta primária, você deve ter cuidado e fornecer acesso apenas a contas em que confia. O proxy terá acesso para transferir todos os fundos dentro da conta primária e, se não for confiável, o proxy poderá drenar a conta primária. Certifique-se de manter a supervisão de suas contas proxy e remover todos os proxies que não forem mais necessários.

## Criando uma Conta Proxy {: #creating-a-proxy-account   }

Há algumas maneiras de criar contas proxy no [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/accounts){target=\_blank}, seja na página **Extrinsics** ou na página **Accounts**. No entanto, para criar um proxy com atraso de tempo, você precisará usar a página **Extrinsics**. Um atraso de tempo fornece uma camada adicional de segurança para proxies, especificando um período de atraso com base no número de blocos. Isso impedirá que a conta proxy execute uma transação até o final do período de atraso. O atraso permite tempo para a conta primária que controla o proxy revisar as transações pendentes, possivelmente para ações maliciosas, e cancelar, se necessário, antes da execução.

A seguinte demonstração mostrará como configurar um proxy Balances, que permite a transferência de fundos, tornando-o perfeito para fins de demonstração. Depois de configurar seu proxy de saldos, você pode tentar transferir fundos da conta primária via proxy.

Para começar a criar sua conta proxy, vá para a aba **Developer** e selecione [**Extrinsics**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank} no menu suspenso. Em seguida, você precisará seguir as seguintes etapas:

1. Selecione a conta primária.
2. No menu suspenso **submit the following extrinsic**, selecione **proxy**.
3. Escolha a extrínseca **addProxy**.
4. Escolha **Id** no menu suspenso **AccountIdLookupOf**.
5. Selecione a conta **delegate** para o proxy.
6. No menu suspenso **proxyType**, escolha **Balances**.
7. Opcionalmente, você pode adicionar um atraso de tempo usando um número especificado de blocos para adicionar uma camada adicional de segurança para que a conta primária revise a transação pendente.
8. Clique em **Submit Transaction**.

![Adicionar uma conta proxy da página Extrinsics do Polkadot.js Apps.](/images/builders/account-management/proxy/proxy-1.webp)

Você será solicitado a autorizar e assinar a transação. Clique em **Sign and Submit** para criar o relacionamento proxy. Depois que a transação for enviada com sucesso, você receberá algumas notificações confirmando a transação.

Como mencionado anteriormente, você também pode criar um proxy na página **Accounts**. Para fazer isso, navegue até a página **Accounts** e siga as seguintes etapas:

1. Selecione os três pontos verticais ao lado da conta primária.
2. Selecione **Add proxy**.

![Selecione o item de menu Add proxy da página Accounts do Polkadot.js Apps.](/images/builders/account-management/proxy/proxy-2.webp)

!!! nota
    Se a conta já tiver um proxy, **Manage proxies** será exibido como uma opção em vez de **Add proxy**.

Aparecerá um pop-up e você poderá inserir as informações necessárias, como a conta proxy/primária, a conta proxy e o tipo de proxy para criar uma conta proxy. Primeiro, clique em **Add Proxy**.

![Adicionar uma conta proxy da página Accounts do Polkadot.js Apps](/images/builders/account-management/proxy/proxy-3.webp)

Em seguida, siga as seguintes etapas:

1. Selecione a conta que deseja definir como proxy.
2. Selecione o tipo de proxy.
3. Clique em **Submit** e assine a transação.

![Adicione os detalhes da conta proxy, incluindo a conta proxy e o tipo.](/images/builders/account-management/proxy/proxy-4.webp)

Na próxima seção, você aprenderá como verificar se sua conta proxy foi configurada com sucesso.

## Verificando sua Conta Proxy {: #verifying-your-proxy-account }

Você pode verificar se sua conta proxy foi configurada com sucesso de algumas maneiras: na página **Accounts** ou na página **Chain state**.

Para verificar suas contas proxy na página [**Chain state**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, você pode seguir as seguintes etapas:

1. No menu suspenso **selected state query**, selecione **proxy**.
2. Escolha a extrínseca **proxies**.
3. Selecione sua conta primária/proxy.
4. Clique no botão **+** para enviar a consulta.

![Verifique suas contas proxy na página Extrinsics do Polkadot.js Apps.](/images/builders/account-management/proxy/proxy-5.webp)

O resultado aparecerá na página, mostrando informações sobre todos os seus proxies, incluindo o endereço da conta delegate/proxy, o tipo de proxy, o período de atraso, se um foi especificado, e o valor total da garantia para todos os seus proxies em Planck.

Você também pode verificar suas contas proxy na página **Accounts**. Para fazer isso, navegue até a página **Accounts** e deverá haver um símbolo Proxy ao lado da conta primária. Passe o mouse sobre o ícone e clique em **Manage proxies** para revisar seus proxies.

![Passe o mouse sobre o ícone do proxy para gerenciar seus proxies na página Accounts do Polkadot.js Apps.](/images/builders/account-management/proxy/proxy-6.webp)

Aparecerá um pop-up onde você poderá ver uma visão geral de todas as suas contas proxy.

![Revise suas contas proxy.](/images/builders/account-management/proxy/proxy-7.webp)

## Executando uma Transação Proxy {: #executando-uma-transação-proxy }

Agora que você criou uma conta proxy e verificou se ela foi configurada com sucesso, você pode executar uma transação usando a conta proxy em nome da conta primária.

Para executar uma transação, você pode voltar para a página [**Extrinsics**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank} e seguir as seguintes etapas:

1. Selecione a conta proxy para enviar a transação pelo menu suspenso **using the select account**.
2. No menu **submit the following extrinsic**, selecione **proxy**.
3. Escolha a extrínseca **proxy**.
4. Escolha **Id** no menu suspenso **AccountIdLookupOf**.
5. Selecione a conta primária no menu suspenso **real**.
6. Selecione a chamada **balances**.
7. Escolha a extrínseca **transferKeepAlive**.
8. Escolha **Id** no menu suspenso **AccountIdLookupOf**.
9. No campo **dest**, insira o endereço para o qual você gostaria de enviar fundos.
10. No campo **value**, insira a quantidade de tokens `{{ networks.dancelight.token_symbol }}` para enviar. Para este exemplo, você pode enviar `2` tokens `{{ networks.dancelight.token_symbol }}`.
11. Clique em **Submit Transaction**.

![Execute uma transação proxy da página Extrinsics do Polkadot.js Apps.](/images/builders/account-management/proxy/proxy-8.webp)

Aparecerá um pop-up para você autorizar e assinar a transação. Insira sua senha para a conta proxy e clique em **Sign and Submit**.

Se a transação for bem-sucedida, você deverá ver alguns pop-ups de notificação. Se você for para a página **Accounts**, verá que o saldo de sua conta primária diminuiu. Se você verificar o saldo da conta para onde enviou os fundos, notará que o saldo aumentou.

![Verifique o saldo na página das contas do Polkadot.js Apps](/images/builders/account-management/proxy/proxy-9.webp)

É isso! Você executou com sucesso uma transação usando uma conta proxy em nome de sua conta primária.

## Removendo uma Conta Proxy {: #removing-a-proxy-account }

Semelhante à adição de uma conta proxy, há algumas maneiras de remover uma conta proxy, seja na página **Extrinsics** ou na página **Accounts**. Independentemente de qual página você usar, você pode optar por remover uma única conta proxy ou todos os proxies associados à sua conta primária.

Para remover um proxy da página [**Extrinsics**](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, você pode seguir as seguintes etapas:

1. No menu suspenso **using the selected account**, selecione sua conta primária.
2. Em seguida, selecione **proxy**.
3. Escolha **removeProxy** para remover um único proxy ou **removeProxies** para remover todos os proxies associados.
4. Escolha **Id** no menu suspenso **AccountIdLookupOf**.
5. Se estiver removendo um único proxy, insira a conta proxy a ser removida no campo **delegate**.
6. Selecione o **proxyType** a ser removido, neste caso, escolha **Balances**.
7. Opcionalmente, selecione um período de atraso em número de blocos.
8. Clique em **Submit Transaction**.

![Remova uma conta proxy da página Extrinsics do Polkadot.js Apps](/images/builders/account-management/proxy/proxy-10.webp)

Aparecerá um pop-up pedindo que você autorize e assine a transação. Você pode assinar e enviar a transação da conta primária ou proxy, mas a chamada para remover o proxy deve ser enviada da conta primária. Insira sua senha e clique em **Sign and Submit**.

Para verificar se o proxy ou as contas proxy foram removidos, siga as etapas na seção [Verificando sua Conta Proxy](#verifying-your-proxy-account).

Como mencionado anteriormente, você também pode remover um proxy da página **Accounts**. Para fazer isso, na página **Accounts**, selecione os três pontos verticais ao lado da conta primária e selecione **Manage Proxies**.

![Clique no botão Manage Proxies para revisar e gerenciar suas contas proxy.](/images/builders/account-management/proxy/proxy-11.webp)

Aparecerá um pop-up mostrando uma visão geral de suas contas proxy. Para remover todos os proxies, você pode clicar em **Clear all**, e será automaticamente solicitado que você insira sua senha e envie a transação. Para remover um único proxy, siga as seguintes etapas:

1. Clique no botão **X** ao lado do proxy para remover
2. Pressione **Submit**

![Remova uma conta proxy da página Accounts do Polkadot.js Apps.](/images/builders/account-management/proxy/proxy-12.webp)

Na tela de confirmação da transação, siga as seguintes etapas:

1. Certifique-se de não usar um proxy para esta chamada (como este exemplo é um proxy de saldos, a chamada para remover o proxy precisa vir da conta primária, em vez da conta proxy).
2. Insira sua senha para a conta respectiva.
3. Pressione **Sign and Submit**.

![Remova uma conta proxy da página Accounts do Polkadot.js Apps, confirmação](/images/builders/account-management/proxy/proxy-13.webp)

Depois que a transação for enviada com sucesso, você pode revisar seus proxies atuais ou, se removeu todos os proxies, notará que o ícone do proxy não está mais sendo exibido ao lado da conta primária. E é isso! Você criou com sucesso um proxy, revisou todas as contas proxy associadas à sua conta primária, executou uma transação proxy e removeu uma conta proxy!

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
