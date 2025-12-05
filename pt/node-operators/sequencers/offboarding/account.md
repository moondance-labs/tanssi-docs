---
title: Descomissionando Seu Sequenciador
description: Nestas instruções passo a passo, aprenda a sair corretamente como um sequenciador Tanssi, incluindo o desmapeamento de suas chaves de sessão e a reversão de sua garantia.
icon: octicons-arrow-down-right-24
categories: Sequencers
---

# Sair como um Sequenciador Tanssi

## Introdução {: #introduction }

Aos sequenciadores, pode chegar o momento de sair graciosamente da rede. A desativação da sua conta envolve um processo de duas etapas para garantir que seu nó seja devidamente dissociado da sua conta e que você receba sua garantia de volta.

Este guia mostrará como encerrar suas operações como um sequenciador Tanssi corretamente. Isso inclui a não delegação de sua autodelegação para reaver sua garantia e o desmapeamento de suas chaves de sessão para cortar a conexão entre seu nó e sua conta. Naturalmente, este guia assume que você é um sequenciador Tanssi existente com um [nó sequenciador](/pt/node-operators/sequencers/onboarding/run-a-sequencer/){target=\_blank} e [chaves de sessão](https://wiki.polkadot.com/learn/learn-cryptography/#session-keys) mapeadas{target=\_blank}.

## Solicitar a não delegação {: #request-undelegation }

Ao configurar seu sequenciador Tanssi, você precisou enviar uma garantia de delegação (pelo menos `{{ networks.mainnet.sequencers.minimum_self_delegation }}` {{ networks.mainnet.token_symbol }} para Tanssi MainNet). Para recebê-la de volta e remover seu sequenciador da lista de candidatos elegíveis, você precisará seguir etapas semelhantes às do processo de integração.

### Visualizar a participação existente {: #viewing-existing-stake }

Antes de não delegar, é útil primeiro ver quanto você apostou, pois precisará fornecer esse valor mais tarde. Para fazer isso, acesse o \[portal do desenvolvedor\](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, clique na aba **Desenvolvedor**, selecione **Estado da Cadeia** no menu suspenso e siga estas etapas:

1. Selecione o módulo **pooledStaking**
2. Selecione a consulta **pools**
3. Insira sua conta de sequenciador
4. Certifique-se de que o controle deslizante **include option** esteja ativado
5. No campo **option**, você seleciona **JoiningShares**
6. Clique no botão **+** ao lado do campo extrínseco
![Ver participação existente no portal do desenvolvedor](/images/node-operators/sequencers/offboarding/account/account-1.webp)

Observe que **JoiningShares** retorna apenas o valor inicial que você delegou ao configurar seu sequenciador. Para obter o valor total apostado, você precisará repetir as etapas acima para **ManualRewardShares** ou **ManualRewardSharesHeldStake** se você não selecionou Autocompounding, e **AutoCompoundingShares** ou **AutoCompoundingSharesHeldStake** se você configurou Autocompounding. Em seguida, adicione seu valor de ações de autocompounding ou manuais ao **JoiningShares** para obter sua delegação total pendente.

Como exemplo, a participação total de um sequenciador de autocompounding pode ser calculada adicionando **JoiningShares** a **AutoCompoundingShares**. Observe esse valor, pois você precisará dele na próxima seção.

### Enviar solicitação de não delegação {: #submit-undelegation-request }

Acesse o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clique na aba **Desenvolvedor**, selecione **Extrínsecos** no menu suspenso e siga estas etapas:

1. Selecione a conta de onde você deseja enviar a transação. Esta conta deve ser sua conta de sequenciador existente que você inicialmente delegou
2. Selecione o módulo **pooledStaking**
3. Selecione o extrínseco **requestUndelegate**
4. Insira sua conta, que é, novamente, a mesma conta da qual você está enviando o extrínseco e a conta que você deseja desativar como um sequenciador
5. Escolha o pool de destino que você usou originalmente ao configurar sua delegação ( *Autocompounding* ou *Manual*)
6. Selecione **Stake** ou **Shares** no menu suspenso
7. Insira a quantia a ser removida da aposta. Se você selecionou **Shares**, basta inserir o número de Shares. Se você selecionou **Stake**, precisará enviar o valor, incluindo as doze casas decimais usadas pela Rede Tanssi. Como lembrete, o valor mínimo da aposta é `{{ networks.mainnet.sequencers.minimum_self_delegation }}` {{ networks.mainnet.token_symbol }}. Se você delegou o valor mínimo e não acumulou recompensas adicionais, precisará inserir `{{ networks.mainnet.sequencers.minimum_self_delegation }}000000000000`
8. Clique em **Enviar Transação** e assine e envie a transação de sua carteira

![Criar e enviar um extrínseco para não delegar no portal do desenvolvedor](/images/node-operators/sequencers/offboarding/account/account-2.webp)

### Executar a solicitação pendente {: #execute-pending-request }

Você precisará esperar antes de executar a solicitação pendente. No caso do Tanssi MainNet, o período de espera é configurado para pelo menos {{ networks.mainnet.staking.leaving_delay_sessions_text }} sessões. Cada sessão é composta por `{{ networks.mainnet.session.blocks }}` blocos e se traduz em cerca de {{ networks.mainnet.session.hours }} hora por sessão. Portanto, {{ networks.mainnet.staking.leaving_delay_sessions_text }} sessões correspondem a aproximadamente {{ networks.mainnet.staking.leaving_delay_hours_text }} horas.

Antes de executar a solicitação pendente, você precisará recuperar a sessão na qual enviou a solicitação para delegar. Para fazer isso, acesse o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, clique na aba **Desenvolvedor**, selecione **Estado da cadeia** no menu suspenso e siga estas etapas:

1. Selecione o módulo **pooledStaking**
2. Selecione a consulta **pendingOperations**
3. Insira sua conta de sequenciador
4. Desative o controle deslizante **include option**
5. Clique no botão **+** ao lado do campo extrínseco
6. A solicitação pendente será exibida na parte inferior da página
![Consultar a solicitação de não delegação pendente no portal do desenvolvedor](/images/node-operators/sequencers/offboarding/account/account-3.webp)

No exemplo na imagem acima, a solicitação de não delegação para sair do pool de autocompounding foi enviada durante a sessão `5.037`. Portanto, a solicitação pode ser executada a partir da sessão `5.039`. Anote a operação e o índice da sessão em que você enviou a solicitação, pois você precisará de ambos os valores para executar a solicitação pendente.

Você pode executar outra consulta na página **Estado da cadeia** para verificar a sessão atual. Para fazer isso, você pode:

1. Selecione o módulo **session**
2. Selecione a consulta **currentIndex**
3. Clique no botão **+** ao lado do campo extrínseco
4. A sessão atual será exibida na parte inferior da página

![Consultar o índice da sessão atual no portal do desenvolvedor](/images/node-operators/sequencers/offboarding/account/account-4.webp)

Se pelo menos duas sessões se passaram desde a sessão em que você enviou o extrínseco, a solicitação estará pronta para ser executada. Para fazer isso, selecione **Extrínsecos** no menu suspenso **Desenvolvedor** e siga estas etapas:

1. Selecione a conta da qual você deseja enviar o extrínseco
2. Selecione o módulo **pooledStaking**
3. Selecione o extrínseco **executePendingOperations**
4. Para **delegator**, insira sua conta, que é a mesma conta da qual você enviou a solicitação de autodelegação
5. Para **operation**, selecione **Leaving**
6. Para **candidate**, insira a mesma conta que você fez no campo **delegator**
7. Para **at**, insira o índice da sessão em que você enviou a solicitação de delegado
1. Clique em **Enviar Transação** e assine e envie a transação de sua carteira

![Criar e enviar um extrínseco para executar a solicitação de autodelegação pendente no portal do desenvolvedor](/images/node-operators/sequencers/offboarding/account/account-5.webp)

### Verifique se sua conta não está na lista de candidatos elegíveis {: #verify }

Se você quiser, pode verificar se seu sequenciador não está mais na lista de candidatos elegíveis. Para fazer isso, acesse o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clique na aba **Desenvolvedor**, selecione **Estado da cadeia** no menu suspenso e siga estas etapas:

1. Selecione o módulo **pooledStaking** e a consulta **sortedEligibleCandidates**
2. Clique no botão **+** ao lado do campo extrínseco
3. Uma lista dos candidatos elegíveis e suas apostas será exibida na parte inferior da página. Você pode pesquisar seu endereço para garantir que ele não exista na lista
![Consultar a lista atual de candidatos elegíveis no portal do desenvolvedor](/images/node-operators/sequencers/offboarding/account/account-6.webp)

## Desmapear chaves de sessão {: #unmap-session-keys }

As chaves de sessão são usadas para realizar operações de rede, como assinar blocos, enquanto sua conta de sequenciador mantém os fundos apostados e tem uma identidade na cadeia. Ao desmapear a chave de sessão para sua conta, você interrompe a associação entre sua conta de sequenciador e seu nó de sequenciador.

A etapa de desmapeamento é tomada apenas como parte do processo de desativação. Se você precisar girar/alterar suas chaves de sessão, precisará seguir a [geração e mapeamento de novas chaves de sessão](/pt/node-operators/sequencers/onboarding/account-setup/#map-session-keys){target=\_blank}. Você não deve remover suas chaves durante o processo de rotação da chave de sessão.

Para desmapear suas chaves de sessão, acesse o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clique na aba **Desenvolvedor**, selecione **Extrínsecos** no menu suspenso e siga estas etapas:

1. Selecione sua conta de sequenciador Tanssi
2. Selecione o módulo **session**
3. Selecione o extrínseco **purgeKeys**
4. Clique em **Enviar Transação** e assine e envie a transação de sua carteira

![Desmapear chaves de sessão no portal do desenvolvedor](/images/node-operators/sequencers/offboarding/account/account-7.webp)

Usando o método `session.keyOwner`, você pode verificar se suas chaves de sessão foram desmapeadas de sua conta conforme o esperado. Para fazer isso no [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/chainstate){target=\_blank}, clique na aba **Desenvolvedor**, selecione **Estado da cadeia** no menu suspenso e siga estas etapas:

1. Selecione o módulo **session**
2. Selecione a consulta **keyOwner**
3. Insira `nmbs` no campo **SpCoreCryptoKeyTypeId**
4. Para **Bytes**, insira suas chaves de sessão codificadas em hexadecimal
5. Clique no botão **+** ao lado do campo extrínseco
6. A consulta não deve retornar nada
![Verificando se o desmapeamento foi bem-sucedido](/images/node-operators/sequencers/offboarding/account/account-8.webp)

E é isso! Você desativou com sucesso um sequenciador Tanssi. Se mudar de ideia a qualquer momento e quiser se integrar novamente como um sequenciador Tanssi, você pode seguir as etapas no [guia de integração](/pt/node-operators/sequencers/onboarding/account-setup/){target=\_blank}.
