---
title: Configurar uma conta para produzir blocos
description: Siga estas instruções passo a passo para se tornar elegível a produzir blocos em redes alimentadas pelo Tanssi e configurar sua conta para receber recompensas.
icon: octicons-person-add-24
categories: Sequenciadores
---

# Configure sua conta para produzir blocos no Tanssi

## Introdução {: #introduction }

Antes de começar a produzir blocos em redes com tecnologia Tanssi, você precisará configurar sua conta e estabelecer sua elegibilidade.

Você deve ter iniciado um [nó Sequenciador](/pt/node-operators/sequencers/onboarding/run-a-sequencer/){target=\_blank} para realizar as etapas de configuração da conta neste guia.

Você precisará configurar sua conta gerando [chaves de sessão](https://wiki.polkadot.com/learn/learn-cryptography/#session-keys){target=\_blank} e mapeando essas chaves de sessão para sua conta. Esta conta é aquela para a qual os delegadores escolherão delegar e onde suas recompensas serão distribuídas. Opcionalmente, você pode [configurar uma conta proxy](/pt/node-operators/sequencers/operational-tasks/proxy-accounts/){target=\_blank} para segurança adicional.

Para estabelecer a elegibilidade, você deve se delegar como um sequenciador e atender aos requisitos mínimos de garantia.

Seguindo as etapas descritas neste guia, você aprenderá tudo o que precisa saber para começar a produzir blocos no ecossistema Tanssi.

## Variáveis Importantes {: #important-variables }

Ao estabelecer a elegibilidade para produzir blocos, existem algumas variáveis a serem observadas:

- **Autodelegação mínima** - há um valor mínimo que você deve autodelegar para ser considerado elegível
- **Sessão** - um período que tem um conjunto constante de sequenciadores
- **Sequenciadores de rede por sessão** - o número de sequenciadores atribuídos a uma rede com tecnologia Tanssi por sessão

=== "Tanssi MainNet"
|            Variável            |                                             Valor                                             |
|:------------------------------:|:---------------------------------------------------------------------------------------------:|
|    Autodelegação mínima     | {{ networks.mainnet.sequencers.minimum_self_delegation }} {{ networks.mainnet.token_symbol }} |
|            Sessão             |                         {{ networks.mainnet.session.blocks }} blocos                          |
| Sequenciadores de rede por sessão |    {{ networks.mainnet.sequencers.configuration.block_producer_per_container }} sequenciadores    |

=== "Dancelight TestNet"
|            Variável            |                                             Valor                                             |
|:------------------------------:|:---------------------------------------------------------------------------------------------:|
|    Autodelegação mínima     | {{ networks.dancelight.sequencers.minimum_self_delegation }} {{ networks.dancelight.token_symbol }} |
|            Sessão             |                         {{ networks.dancelight.session.blocks }} blocos                          |
| Sequenciadores de rede por sessão |    {{ networks.dancelight.sequencers.configuration.block_producer_per_container }} sequenciadores    |

## Mapear uma conta para seu nó Sequenciador {: #map-account }

A primeira etapa é um processo de duas etapas que gera [chaves de sessão](https://wiki.polkadot.com/learn/learn-cryptography/#session-keys){target=\_blank} e mapeia as chaves de sessão para sua conta. As chaves de sessão são usadas para realizar operações de rede, como assinar blocos, enquanto sua conta mantém os fundos apostados e tem uma identidade na cadeia. Ao mapear a chave de sessão para sua conta, você cria uma associação entre sua conta e seu sequenciador.

Você precisará criar chaves de sessão para seus servidores primário e de backup. Cada um de seus servidores, seu primário e de backup, deve ter suas próprias chaves exclusivas. Como as chaves nunca saem de seus servidores, você pode considerá-las um ID exclusivo para aquele servidor.

### Gerar chaves de sessão {: #generate-session-keys }

Antes de gerar chaves de sessão, você deve estar [executando um nó sequenciador](/pt/node-operators/sequencers/onboarding/run-a-sequencer/){target=\_blank}.

Para gerar chaves de sessão, você enviará uma chamada RPC, usando o método `author_rotateKeys`, para o endpoint HTTP do seu nó. Como referência, se o endpoint HTTP do seu sequenciador estiver na porta `9945`, a chamada JSON-RPC pode ter esta aparência:

```bash
"Content-Type:application/json;charset=utf-8" -d \
  '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_rotateKeys",
    "params": []
  }'
```

Suas chaves de sessão codificadas em hexadecimal serão impressas no terminal no campo `"result"`.

--8<-- 'code/node-operators/sequencers/onboarding/account-setup/terminal/generate-session-keys.md'

Certifique-se de anotar suas chaves de sessão; você precisará mapear suas chaves de sessão para sua conta na próxima seção.

### Mapear chaves de sessão {: #map-session-keys }

Para executar a próxima etapa e mapear suas chaves de sessão para sua conta, acesse o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clique na aba **Developer**, selecione **Extrinsics** no menu suspenso e siga as etapas a seguir:

1. Selecione sua conta, que deve ser a mesma conta que você autodelegou anteriormente
2. Selecione o módulo **session** e o extrínseco **setKeys**
3. Para **keys**, insira suas chaves de sessão
4. Para **proof**, insira `0x`
5. Clique em **Submit Transaction** e assine e envie a transação de sua carteira

![Criar e enviar uma transação para definir chaves de sessão no Polkadot.js Apps](/images/node-operators/sequencers/onboarding/account-setup/setup-1.webp)

Usando o método `session.keyOwner`, você pode verificar se suas chaves de sessão foram mapeadas para sua conta conforme o esperado. Para fazer isso no [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clique na aba **Developer**, selecione **Chain state** no menu suspenso e siga as etapas a seguir:

1. Selecione o módulo **session** e a consulta **keyOwner**
2. Insira `nmbs` no campo **SpCoreCryptoKeyTypeId**
3. Para **Bytes**, insira suas chaves de sessão codificadas em hexadecimal
4. Clique no botão **+** ao lado do campo extrínseco
5. A conta associada às chaves de sessão, que deve ser sua conta, será exibida na parte inferior da página

![Criar e enviar consulta para verificar chaves de sessão no portal do desenvolvedor](/images/node-operators/sequencers/onboarding/account-setup/setup-2.webp)

## Enviar Autodelegação {: #submit-self-delegation }

A próxima etapa para se tornar elegível para produzir blocos em redes com tecnologia Tanssi é delegar à sua própria conta. Para fazer isso, você precisará enviar um mínimo de tokens, conforme listado na seção [variáveis importantes](#important-variables).

Depois de enviar a solicitação para delegar, você precisará esperar um mínimo de sessões antes de poder executar a solicitação pendente. No caso do Tanssi MainNet, o número de sessões é configurado para {{ networks.mainnet.staking.joining_delay_sessions_text }}. Existem {{ networks.mainnet.session.blocks }} blocos em uma sessão. Portanto, {{ networks.mainnet.staking.joining_delay_sessions_text }} sessões são {{ networks.mainnet.staking.joining_delay_blocks }} blocos, o que pode levar cerca de {{ networks.mainnet.staking.joining_delay_hours_text }} horas.

Os sequenciadores são atribuídos a cada sessão. Os sequenciadores que participam da sessão são escolhidos da lista de candidatos ordenada por participação total até que o número total de sequenciadores necessários seja coberto. Portanto, você precisará garantir que sua participação total seja suficiente para preencher um dos slots, o que pode exigir mais do que a autodelegação mínima.

### Solicitar Delegado {: #request-delegate }

Acesse o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clique na aba **Developer**, selecione **Extrinsics** no menu suspenso e siga as etapas a seguir:

1. Selecione a conta da qual você deseja enviar a transação. Esta conta deve ser a mesma conta para a qual você está delegando e é a conta que você deseja se tornar um sequenciador
2. Selecione o módulo **pooledStaking** e o extrínseco **requestDelegate**
3. Insira sua conta, que é, novamente, a mesma conta da qual você está enviando a transação e a conta que você deseja se tornar um sequenciador
4. Escolha o pool de destino. O pool pode ser o pool de composição automática, que compõe automaticamente as recompensas de delegação, ou o pool de recompensas manuais, no qual todas as ações relacionadas às recompensas são manuais
5. Insira o valor a ser apostado. Este valor deve atender ao mínimo, que é {{ networks.mainnet.sequencers.minimum_self_delegation }} {{ networks.mainnet.token_symbol }} tokens para Tanssi MainNet. A Tanssi Network usa doze casas decimais, portanto, ao enviar o valor, certifique-se de adicionar as casas decimais à autodelegação. Para MainNet, o valor seria `{{ networks.mainnet.sequencers.minimum_self_delegation }}000000000000`
6. Clique em **Submit Transaction** e assine e envie a transação de sua carteira
![Criar e enviar uma transação para autodelegar no Polkadot.js Apps](/images/node-operators/sequencers/onboarding/account-setup/setup-3.webp)

### Executar a solicitação pendente {: #execute-pending-request }

Antes de executar a solicitação pendente, você precisará recuperar a sessão na qual você enviou a solicitação para delegar. Para fazer isso, acesse o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clique na aba **Developer**, selecione **Chain state** no menu suspenso e siga as etapas a seguir:

1. Selecione o módulo **pooledStaking** e a consulta **pendingOperations**
2. Insira sua conta
3. Desative o controle deslizante **include option**
4. Clique no botão **+** ao lado do campo extrínseco
5. A solicitação pendente será exibida na parte inferior da página

![Consulta da solicitação de autodelegação pendente no portal do desenvolvedor](/images/node-operators/sequencers/onboarding/account-setup/setup-4.webp)

No exemplo da imagem acima, a solicitação de delegação para ingressar no pool de composição automática foi enviada durante a sessão 4.829. Portanto, a solicitação pode ser executada a partir da sessão 4.831.

Anote a operação e o número da sessão em que você enviou a solicitação, pois você precisará de ambos os valores para executar a solicitação pendente.

Você pode executar outra consulta na página **Chain state** para verificar a sessão atual. Para fazer isso, você pode:

1. Selecione o módulo **session** e a consulta **currentIndex**
1. Clique no botão **+** ao lado do campo extrínseco
1. A sessão atual será exibida na parte inferior da página

![Consultar o índice da sessão atual no portal do desenvolvedor](/images/node-operators/sequencers/onboarding/account-setup/setup-5.webp)

Se a solicitação puder ser executada, selecione **Extrinsics** no menu suspenso **Developer** e siga as etapas a seguir:

1. Selecione a conta da qual você deseja enviar a transação
2. Selecione o módulo **pooledStaking** e a transação **executePendingOperations**
3. Para **delegator**, insira sua conta, que é a mesma conta da qual você enviou a solicitação de autodelegação
4. Para **operation**, selecione o tipo de operação a ser executada. Este deve ser **JoiningAutoCompounding** ou **JoiningManualRewards**, dependendo do pool de destino selecionado no momento do envio da solicitação de autodelegação
5. Para **candidate**, insira a mesma conta que você fez no campo **delegator**
6. Para **at**, insira o id da sessão em que você enviou a solicitação de delegação
7. Clique em **Submit Transaction** e assine e envie a transação de sua carteira

![Criar e enviar uma transação para executar a solicitação de autodelegação pendente no portal do desenvolvedor](/images/node-operators/sequencers/onboarding/account-setup/setup-6.webp)

Agora, você concluiu toda a configuração da conta necessária para ser elegível para produzir blocos!

## Verifique se sua conta está na lista de candidatos elegíveis {: #verify }

Se você seguiu todas as etapas deste guia e sincronizou totalmente seu sequenciador, agora você está elegível para produzir blocos. Para verificar se você está na lista de candidatos elegíveis, você pode acessar o [portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/extrinsics){target=\_blank}, clicar na aba **Developer**, selecionar **Chain state** no menu suspenso e seguir as etapas a seguir:

1. Selecione o módulo **pooledStaking** e a consulta **sortedEligibleCandidates**
2. Clique no botão **+** ao lado do campo extrínseco
3. Uma lista dos candidatos elegíveis e sua participação será exibida na parte inferior da página. Você pode pesquisar seu endereço para garantir que está qualificado para produzir blocos

![Consultar a lista atual de candidatos elegíveis no portal do desenvolvedor](/images/node-operators/sequencers/onboarding/account-setup/setup-7.webp)

Lembre-se que você precisará estar entre os principais candidatos por participação total para produzir blocos, e isso se baseia no número de [sequenciadores necessários para cada rede e Tanssi](#important-variables).
