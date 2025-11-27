---
title: Staking for Block Production
description: Learn how Tanssi implements a novel Staking mechanism to provide liveness via a decentralized and trustless set of sequencers to all Tanssi-powered networks.
icon: material-hand-coin-outline
categories: Basics
---

````json
{
  "source_path": "learn/tanssi/network-features/staking.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "788c7bbc7683ec91c4834d27c7846d39d4222f6765da72bf9fa138f0fd4fcf3a",
  "content": "---
title: Staking for Block Production
description: Learn how Tanssi implements a novel Staking mechanism to provide liveness via a decentralized and trustless set of sequencers to all Tanssi-powered networks.
icon: material-hand-coin-outline
categories: Basics
---

# Tanssi Staking for Block Production {: #tanssi-staking }

## Introduction {: #introduction }

One of Tanssi's core propositions is to simplify the infrastructure complexity for networks. A significant component is bootstrapping a decentralized set of sequencers, which Tanssi offers through its unique architecture and staking mechanics.

Tanssi staking mechanics guarantee that the sequencers for Tanssi-powered networks are selected through a trustless and decentralized mechanism. They also incentivize the community to delegate to top-performing or engaged sequencers.

This page covers the fundamental concepts of Tanssi's staking mechanics and how it secures a decentralized block production set that drives network liveness for Tanssi networks.

<div style=\"text-align: center; justify-content:center;\" class=\"row hero-buttons\">
  <a href=\"https://www.tanssi.network/post/staking-tanssi\" aria-label=\"Learn How to Stake on Tanssi Apps\" style=\"margin: .5em;\">
    <button class=\"md-button primary-button\" style=\"padding: 1em; font-size: 1em;\">Learn How to Stake -></button>
  </a>
</div>

## Core Concepts {: #core-concepts }

Tanssi's staking module mechanics were inspired by the concept of liquidity pool tokens (LP tokens) in traditional Automated-Market-Makers (AMMs) like Uniswap V2.

Each sequencer has four liquidity pools through which delegators move as they perform different staking operations. In short, each liquidity pool represents a different state throughout the staking process: joining, staking through manual rewards, staking through auto-compound rewards, and leaving. Nevertheless, one core difference is that LP tokens in common AMMs are transferable while staking shares tokens are not.

A delegator has four simple transactions to go through the different states (liquidity pools): delegate (for manual or auto-compound rewards), undelegate, swap, and execute pending operations. For example, users who want to stake through either rewards pool can use the delegate call and join the Joining Pool immediately. After a delay, users (or anyone else) can execute the pending operation and enter the initially set rewards pool. Once there, users can swap between reward pools as often as they like. Lastly, users in a rewards pool can use the undelegate call to go into the Leaving Pool and unstake their tokens (or anyone else's) executing the pending operation after a given delay.

Liquidity pools have a set of shares that can be considered LP tokens in traditional AMMs. When users join a new liquidity pool, they are given several shares (LP tokens) that depend on the pool type, the number of tokens they staked, the total number of shares, and the total number of tokens staked in that pool.

Rewards are assigned to a sequencer's Manual or Auto-Compound Reward Pools when Tanssi attests that the specific block production slot that sequencer was assigned to has been fulfilled, and the block was produced successfully.

All rewards (for all pools) are stored in a protocol-owned account. Nevertheless, the protocol internally keeps track of the actual native tokens held by each pool. The core difference between staking through the Manual or Auto-Compound Rewards Pools is how rewards are distributed. In the Manual Rewards Pool, users have to claim any staking rewards they've accumulated manually. In contrast, in the Auto-Compound Rewards Pool, the rewards are automatically re-staked at each Tanssi block, where the protocol announces the sequencer for each block production assignment.

The delegate and undelegate operations need to be sent by the delegator itself. They signal the intent of the action to be taken and ask the protocol to perform the necessary checks to allow the delegator to delegate or undelegate. Consequently, these actions can be executed only after a certain number of sessions, but anyone in the network can perform this second operation through the execute pending operation transaction.

The following diagram summarizes the high-level flow of a delegator delegating and undelegating tokens to a sequencer. User actions are highlighted in cyan, while different pools are highlighted in coral.

![High-level overview of Tanssi Staking mechanics](/images/learn/tanssi/staking/staking-1.webp)

## Staking Parameters {: #staking-parameters }

=== \"Tanssi MainNet\"
    |   Variable    |                                                         Value                                                         |
    |:-------------:|:---------------------------------------------------------------------------------------------------------------------:|
    | Joining Delay | {{ networks.mainnet.staking.joining_delay_blocks }} blocks ({{ networks.mainnet.staking.joining_delay_hours }} hours) |
    | Leaving Delay | {{ networks.mainnet.staking.leaving_delay_blocks }} blocks ({{ networks.mainnet.staking.leaving_delay_hours }} hours) |
  
=== \"Dancelight TestNet\"
    |   Variable    |                                                            Value                                                            |
    |:-------------:|:---------------------------------------------------------------------------------------------------------------------------:|
    | Joining Delay | {{ networks.dancelight.staking.joining_delay_blocks }} blocks ({{ networks.dancelight.staking.joining_delay_hours }} hours) |
    | Leaving Delay | {{ networks.dancelight.staking.leaving_delay_blocks }} blocks ({{ networks.dancelight.staking.leaving_delay_hours }} hours) |

## Staking Pools {: #staking-pools}

The following section goes through each of the liquidity pools that represent a step throughout the staking process.

### Joining Pool {: $joining-pool}

When a user first delegates to start the staking process, it must state what staking rewards mechanism it wants: manual or auto-compound rewards (each being a separate pool). Once the joining transaction is executed, the user automatically enters the Joining Pool and is given shares of that pool directly correlated to the number of tokens being staked. This pool offers stability to the current set of sequencers by providing a delay between a delegator staking and receiving rewards. The delay is set to at least one entire session.

As a practical example, Alice starts the staking process targeting the Manual Rewards Pool and enters the Joining Pool halfway through a session; she must wait until the end of the next session to execute her pending operation to start receiving staking rewards.
```mathematica

```

````

The following diagrams assumes a user is staking into the Manual Rewards Pool.

![High-level overview of the Joining Pool when Staking](/images/learn/tanssi/staking/staking-2.webp)

### Manual Rewards Pool {: #manual-rewards-pool}

When a user joins the Manual Rewards Pool, the protocol destroys all Joining Pool shares they own in favor of the native protocol token. Next, in the same block, the protocol computes the amount of Manual Pool shares that can be minted with this amount based on the share's price. The price is calculated based on current pool conditions, that is, the number of native tokens and shares that exist:

```mathematica

SharePrice [Tokens/Shares] = NumberOfTokensInPool / NumberOfSharesInPool 

```mathematica

```

```mathematica

```

Similarly, when a user stakes or unstakes tokens, rewards are automatically claimed, and the user's checkpoint rewards counter is reset. Adding or removing a stake means that reward conditions for that specific amount differ from what the protocol has in storage. Consequently, the rewards counter checkpoint must be synced with the pool's rewards counter to ensure no imbalances.

![High-level overview of the Manual Rewards Pool when Staking](/images/learn/tanssi/staking/staking-3.webp)

### Auto-Compound Rewards Pool {: #autocompounded-rewards-pool}

When a user joins the Auto-Compound Rewards Pool, the protocol destroys all Joining Pool shares they own in favor of the native protocol token. Next, in the same block, the protocol computes the amount of Auto-Compound shares that can be minted with this amount based on the share's price. The price is calculated based on current pool conditions, that is, the amount of native tokens and shares that exist:

```mathematica

SharePrice [Tokens/Shares] = NumberOfTokensInPool / NumberOfSharesInPool 

```

Shares don't have decimals. Consequently, any remaining native tokens when acquiring the pool's shares are refunded to the user. The share price is not impacted by users joining the pool, as the ratio is maintained. Once the user has Auto-Compound Rewards Pool shares, they earn staking rewards (that is, in the same session).

In contrast to the Manual Rewards Pool, native token rewards in the Auto-Compound Rewards Pool are automatically assigned to the pool at each Tanssi block where the protocol attests the sequencer for each block production assignment in any Tanssi-powered network. Consequently, as the number of native tokens held in the pool increases but the number of shares stays constant, the share price increases (according to the formula). Therefore, if the users redeem their shares for native tokens, they will receive more native tokens per share than when they joined the pool.

![High-level overview of the Auto-Compound Rewards Pool when Staking](/images/learn/tanssi/staking/staking-4.webp)

Native token rewards are automatically assigned as new stake into the Auto-Compound Rewards Pool, hence the auto-compounding nature of this specific staking pool mechanism.

Nevertheless, when auto-compound staking rewards are assigned, they are not held in the user's reserved balance, as the protocol-owned account still has them. The increase in the delegator's stake is indirectly represented by the share price increase. However, in specific scenarios, a user might want to let the protocol know that they want that balance to be represented in their state as reserved balance, for example, for governance purposes.

Consequently, the protocol offers a specific transaction any user can submit to update the reserve balance of any delegate. This call moves the auto-compound rewards for the specified user from the protocol-owned account to their reserve balance. This is also automatically executed by the protocol when a user removes liquidity from a Auto-Compound Rewards Pool.

### Leaving Pool {: #leaving-pool}

When a user decides to exit their staking positions from a Manual or Auto-Compound Reward Pool, they have the power to initiate an undelegation. This process, similar to when they initially entered the Joining Pool, is a two-step journey. The user signs an intent to remove a specific delegation and patiently waits for at least one entire session before the operation can be executed by anyone.

Upon executing the leaving transaction intent, the protocol exchanges shares of the specified pool for native tokens at the current pool price. For the Manual Rewards Pool, any unclaimed rewards are assigned to the user. Simultaneously, the protocol purchases Leaving Pool shares in a one-to-one ratio for the native tokens the user just received. This ensures that the user joins the Leaving Pool, acquiring shares that correspond to the number of native tokens they desire to unstake.

After an entire session passes, any user can execute the pending operation. Then, the protocol swaps Leaving Pool shares for native protocol tokens at a one-to-one ratio.

The primary purpose of the Leaving Pool is to provide a buffer for users leaving the staking mechanics. This buffer allows the implementation of slashing mechanisms to deter bad behavior. Slashing has not been implemented in Tanssi but could be implemented in the future.

The following diagrams assumes a user is unstaking from the Manual Rewards Pool.

![High-level overview of the Leaving Pool when Staking](/images/learn/tanssi/staking/staking-5.webp)

### Swapping Between Rewards Pools {: #swap-rewards-pool}

Tanssi's staking module allows users to swap their stake from one type of reward pool to another. Users can use this functionality to move partial or full amounts of the staked tokens in a specific pool. The main benefit is that users don't have to go through the Leaving Pool and the Joining Pool again to move their stake.

First, all pending Manual Rewards Pool rewards are claimed at a protocol level, as liquidity is either added or removed. Therefore, the checkpoint rewards counter needs to be synced with the pool. Next, shares from the original pool are consumed and exchanged in favor of native protocol tokens at the current pool price. Then, shares of the new pool are attained at that pool's price. Lastly, any dust tokens remaining are automatically exchanged in favor of Leaving Pool shares. Note that all of the above is executed in the same block, and users don't have to wait for delays to earn rewards in the new pool. The dust in the Leaving Pool can be claimed after the required delays have passed.

## ![High-level overview of Swapping between Manual and Auto-Compounded Pools when Staking](/images/learn/tanssi/staking/staking-6.webp) ", "translated_content": "--- title: Staking para Produção de Blocos description: Aprenda como a Tanssi implementa um novo mecanismo de Staking para fornecer atividade via um conjunto descentralizado e confiável de sequenciadores para todas as redes alimentadas pela Tanssi. icon: material-hand-coin-outline categories: Basics

# Tanssi Staking para Produção de Blocos {: #tanssi-staking }

## Introdução {: #introduction }

Uma das principais propostas da Tanssi é simplificar a complexidade da infraestrutura para as redes. Um componente significativo é a inicialização de um conjunto descentralizado de sequenciadores, que a Tanssi oferece por meio de sua arquitetura e mecânica de staking exclusivas.

A mecânica de staking da Tanssi garante que os sequenciadores para as redes alimentadas pela Tanssi sejam selecionados por meio de um mecanismo confiável e descentralizado. Eles também incentivam a comunidade a delegar aos sequenciadores de melhor desempenho ou engajados.

Esta página aborda os conceitos fundamentais da mecânica de staking da Tanssi e como ela garante um conjunto descentralizado de produção de blocos que impulsiona a atividade da rede para as redes Tanssi.

<div style=\"text-align: center; justify-content:center;\" class=\"row hero-buttons\">
  <a href=\"https://www.tanssi.network/post/staking-tanssi\" aria-label=\"Learn How to Stake on Tanssi Apps\" style=\"margin: .5em;\">
    <button class=\"md-button primary-button\" style=\"padding: 1em; font-size: 1em;\">Aprenda a fazer Staking -></button>
  </a>
</div>

## Conceitos Essenciais {: #core-concepts }

A mecânica do módulo de staking da Tanssi foi inspirada no conceito de tokens de pool de liquidez (tokens LP) em Automated-Market-Makers (AMMs) tradicionais, como o Uniswap V2.

Cada sequenciador possui quatro pools de liquidez pelos quais os delegadores se movem ao realizar diferentes operações de staking. Em suma, cada pool de liquidez representa um estado diferente durante o processo de staking: entrada, staking por meio de recompensas manuais, staking por meio de recompensas de auto-composição e saída. No entanto, uma diferença fundamental é que os tokens LP em AMMs comuns são transferíveis, enquanto os tokens de participação de staking não são.

Um delegador tem quatro transações simples para percorrer os diferentes estados (pools de liquidez): delegar (para recompensas manuais ou de auto-composição), cancelar delegação, trocar e executar operações pendentes. Por exemplo, os usuários que desejam apostar através de qualquer pool de recompensas podem usar a chamada de delegação e entrar no Pool de Entrada imediatamente. Após um atraso, os usuários (ou qualquer outra pessoa) podem executar a operação pendente e entrar no pool de recompensas definido inicialmente. Uma vez lá, os usuários podem trocar entre os pools de recompensa com a frequência desejada. Por fim, os usuários em um pool de recompensas podem usar a chamada de cancelamento de delegação para entrar no Leaving Pool e desfazer suas moedas (ou de qualquer outra pessoa) executando a operação pendente após um determinado atraso.

Os pools de liquidez têm um conjunto de ações que podem ser considerados tokens LP em AMMs tradicionais. Quando os usuários entram em um novo pool de liquidez, eles recebem várias ações (tokens LP) que dependem do tipo de pool, do número de moedas que apostaram, do número total de ações e do número total de moedas apostadas nesse pool.

As recompensas são atribuídas aos Pools de Recompensas Manuais ou de Auto-Composição de um sequenciador quando a Tanssi atesta que o slot de produção de bloco específico ao qual o sequenciador foi atribuído foi cumprido e o bloco foi produzido com sucesso.

Todas as recompensas (para todos os pools) são armazenadas em uma conta de propriedade do protocolo. No entanto, o protocolo acompanha internamente os tokens nativos reais detidos por cada pool. A principal diferença entre staking por meio dos Pools de Recompensas Manuais ou de Auto-Composição é como as recompensas são distribuídas. No Pool de Recompensas Manuais, os usuários devem reivindicar manualmente quaisquer recompensas de staking que acumularam. Em contraste, no Pool de Recompensas de Auto-Composição, as recompensas são automaticamente restaked a cada bloco Tanssi, onde o protocolo anuncia o sequenciador para cada atribuição de produção de bloco.

As operações de delegação e cancelamento de delegação precisam ser enviadas pelo próprio delegador. Elas sinalizam a intenção da ação a ser tomada e pedem ao protocolo que realize as verificações necessárias para permitir que o delegador delegue ou cancele a delegação. Consequentemente, essas ações podem ser executadas somente após um certo número de sessões, mas qualquer pessoa na rede pode executar essa segunda operação por meio da transação de execução de operação pendente.

O diagrama a seguir resume o fluxo de alto nível de um delegador que delega e cancela a delegação de moedas a um sequenciador. As ações do usuário são destacadas em ciano, enquanto os diferentes pools são destacados em coral.

![Visão geral de alto nível da mecânica de Staking da Tanssi](/images/learn/tanssi/staking/staking-1.webp)

## Parâmetros de Staking {: #staking-parameters }

=== "Tanssi MainNet"
|   Variável    |                                                         Valor                                                         |
|:-------------:|:---------------------------------------------------------------------------------------------------------------------:|
| Atraso de Entrada | {{ networks.mainnet.staking.joining_delay_blocks }} blocos ({{ networks.mainnet.staking.joining_delay_hours }} horas) |
| Atraso de Saída | {{ networks.mainnet.staking.leaving_delay_blocks }} blocos ({{ networks.mainnet.staking.leaving_delay_hours }} horas) |

=== "Dancelight TestNet"
|   Variável    |                                                          Valor                                                            |
|:-------------:|:---------------------------------------------------------------------------------------------------------------------------:|
| Atraso de Entrada | {{ networks.dancelight.staking.joining_delay_blocks }} blocos ({{ networks.dancelight.staking.joining_delay_hours }} horas) |
| Atraso de Saída | {{ networks.dancelight.staking.leaving_delay_blocks }} blocos ({{ networks.dancelight.staking.leaving_delay_hours }} horas) |

## Pools de Staking {: #staking-pools}

A seção a seguir aborda cada um dos pools de liquidez que representam uma etapa durante o processo de staking.

### Joining Pool {: $joining-pool}

Quando um usuário primeiro delega para iniciar o processo de staking, ele deve declarar qual mecanismo de recompensas de staking ele deseja: recompensas manuais ou de auto-composição (cada um sendo um pool separado). Depois que a transação de entrada é executada, o usuário entra automaticamente no Joining Pool e recebe ações desse pool diretamente correlacionadas ao número de moedas apostadas. Este pool oferece estabilidade ao conjunto atual de sequenciadores, fornecendo um atraso entre o staking do delegador e o recebimento de recompensas. O atraso é definido para pelo menos uma sessão inteira.

Como um exemplo prático, Alice inicia o processo de staking visando o Manual Rewards Pool e entra no Joining Pool no meio de uma sessão; ela deve esperar até o final da próxima sessão para executar sua operação pendente para começar a receber recompensas de staking.

Os Joining Pools para cada sequenciador têm uma proporção de ações para cada moeda apostada. Portanto, se Alice estiver apostando 100 moedas, ela receberá 100 ações (tokens LP) do Joining Pool em que entrou. Quando sua operação pendente de delegação é executada, o protocolo consome suas ações do Joining Pool em favor dos tokens de protocolo nativos, que são imediatamente trocados por ações nos Pools de Recompensas Manuais ou de Auto-Composição.

Os diagramas a seguir pressupõem que um usuário está apostando no Manual Rewards Pool.

![Visão geral de alto nível do Joining Pool ao fazer Staking](/images/learn/tanssi/staking/staking-2.webp)

### Manual Rewards Pool {: #manual-rewards-pool}

Quando um usuário entra no Manual Rewards Pool, o protocolo destrói todas as ações do Joining Pool que ele possui em favor do token de protocolo nativo. Em seguida, no mesmo bloco, o protocolo calcula a quantidade de ações do Manual Pool que podem ser cunhadas com base nesse valor no preço da ação. O preço é calculado com base nas condições atuais do pool, ou seja, no número de tokens nativos e ações existentes:

```mathematica

Preço da ação [Tokens/Ações] = NúmeroDeTokensNoPool / NúmeroDeAçõesNoPool 

```

As ações não têm decimais. Consequentemente, quaisquer tokens nativos restantes ao adquirir as ações do pool são reembolsados ao usuário. O preço da ação não é afetado pelos usuários que entram no pool, pois a proporção é mantida. Depois que o usuário tem ações do Manual Rewards Pool, ele ganha recompensas de staking (ou seja, na mesma sessão) que precisam ser reivindicadas manualmente pelo usuário delegado.

Em contraste com o Auto-Compound Rewards Pool, onde a distribuição da recompensa é feita automaticamente para o pool específico, a distribuição dos Manual Rewards Pools opera por meio de um mecanismo de recompensas de ponto de verificação de contador. Este mecanismo rastreia a taxa histórica de distribuição de tokens nativos por ação atribuída a você pelo protocolo para esse Manual Reward Pool específico em um determinado momento. Quando a Tanssi atesta que um bloco foi produzido por um determinado sequenciador, novas recompensas são atribuídas a esse Manual Rewards Pool para os usuários reivindicarem, e o contador de recompensas aumenta. Portanto, as recompensas são refletidas como a proporção de tokens nativos por ação que você recebe como recompensas de staking, que é a diferença entre o contador de recompensas do pool atual e o ponto de verificação do contador de recompensas original.

Consequentemente, o contador de recompensas de tokens nativos por ação desempenha um papel vital no cálculo do protocolo dos tokens que o usuário deve ao reivindicar suas recompensas. Depois que as recompensas são calculadas, o protocolo as envia da conta de propriedade do protocolo para o usuário. Simultaneamente, o ponto de verificação do contador de recompensas do usuário é redefinido para o atual definido pelo valor atual do contador do pool. Essa redefinição é necessária para garantir que o novo contador de recompensas do usuário se alinhe e que as recompensas devidas sejam zero.

Da mesma forma, quando um usuário aposta ou desfaz moedas, as recompensas são reivindicadas automaticamente e o ponto de verificação do contador de recompensas do usuário é redefinido. Adicionar ou remover uma aposta significa que as condições de recompensa para essa quantia específica diferem do que o protocolo tem em armazenamento. Consequentemente, o ponto de verificação do contador de recompensas deve ser sincronizado com o contador de recompensas do pool para garantir que não haja desequilíbrios.

![Visão geral de alto nível do Manual Rewards Pool ao fazer Staking](/images/learn/tanssi/staking/staking-3.webp)

### Auto-Compound Rewards Pool {: #autocompounded-rewards-pool}

Quando um usuário entra no Auto-Compound Rewards Pool, o protocolo destrói todas as ações do Joining Pool que ele possui em favor do token de protocolo nativo. Em seguida, no mesmo bloco, o protocolo calcula a quantidade de ações de Auto-Composição que podem ser cunhadas com base nesse valor no preço da ação. O preço é calculado com base nas condições atuais do pool, ou seja, na quantidade de tokens nativos e ações existentes:

```mathematica

Preço da ação [Tokens/Ações] = NúmeroDeTokensNoPool / NúmeroDeAçõesNoPool 

```

As ações não têm decimais. Consequentemente, quaisquer tokens nativos restantes ao adquirir as ações do pool são reembolsados ao usuário. O preço da ação não é afetado pelos usuários que entram no pool, pois a proporção é mantida. Depois que o usuário tem ações do Auto-Compound Rewards Pool, ele ganha recompensas de staking (ou seja, na mesma sessão).

Em contraste com o Manual Rewards Pool, as recompensas de token nativo no Auto-Compound Rewards Pool são automaticamente atribuídas ao pool em cada bloco Tanssi, onde o protocolo atesta o sequenciador para cada atribuição de produção de bloco em qualquer rede alimentada pela Tanssi. Consequentemente, à medida que o número de tokens nativos mantidos no pool aumenta, mas o número de ações permanece constante, o preço da ação aumenta (de acordo com a fórmula). Portanto, se os usuários resgatarem suas ações por tokens nativos, eles receberão mais tokens nativos por ação do que quando entraram no pool.

![Visão geral de alto nível do Auto-Compound Rewards Pool ao fazer Staking](/images/learn/tanssi/staking/staking-4.webp)

As recompensas de token nativo são automaticamente atribuídas como uma nova aposta no Auto-Compound Rewards Pool, daí a natureza de auto-composição deste mecanismo de pool de staking específico.

No entanto, quando as recompensas de staking de auto-composição são atribuídas, elas não são mantidas no saldo reservado do usuário, pois a conta de propriedade do protocolo ainda as possui. O aumento da aposta do delegador é indiretamente representado pelo aumento do preço da ação. No entanto, em cenários específicos, um usuário pode querer que o protocolo saiba que ele deseja que esse saldo seja representado em seu estado como saldo reservado, por exemplo, para fins de governança.

Consequentemente, o protocolo oferece uma transação específica que qualquer usuário pode enviar para atualizar o saldo da reserva de qualquer delegado. Essa chamada move as recompensas de auto-composição para o usuário especificado da conta de propriedade do protocolo para seu saldo de reserva. Isso também é executado automaticamente pelo protocolo quando um usuário remove liquidez de um Auto-Compound Rewards Pool.

### Leaving Pool {: #leaving-pool}

Quando um usuário decide sair de suas posições de staking de um Manual ou Auto-Compound Reward Pool, ele tem o poder de iniciar uma cancelamento de delegação. Este processo, semelhante a quando eles entraram inicialmente no Joining Pool, é uma jornada de duas etapas. O usuário assina uma intenção de remover uma delegação específica e espera pacientemente por pelo menos uma sessão inteira antes que a operação possa ser executada por qualquer pessoa.

Ao executar a intenção da transação de saída, o protocolo troca as ações do pool especificado por tokens nativos ao preço atual do pool. Para o Manual Rewards Pool, quaisquer recompensas não reivindicadas são atribuídas ao usuário. Simultaneamente, o protocolo compra ações do Leaving Pool em uma proporção de um para um para os tokens nativos que o usuário acabou de receber. Isso garante que o usuário entre no Leaving Pool, adquirindo ações que correspondem ao número de tokens nativos que ele deseja desfazer.

Após o término de uma sessão inteira, qualquer usuário pode executar a operação pendente. Em seguida, o protocolo troca as ações do Leaving Pool por tokens de protocolo nativos em uma proporção de um para um.

O objetivo principal do Leaving Pool é fornecer um buffer para usuários que saem da mecânica de staking. Este buffer permite a implementação de mecanismos de corte para impedir maus comportamentos. O corte não foi implementado na Tanssi, mas pode ser implementado no futuro.

Os diagramas a seguir pressupõem que um usuário está deixando de apostar no Manual Rewards Pool.

![Visão geral de alto nível do Leaving Pool ao fazer Staking](/images/learn/tanssi/staking/staking-5.webp)

### Troca entre Pools de Recompensas {: #swap-rewards-pool}

O módulo de staking da Tanssi permite que os usuários troquem sua participação de um tipo de pool de recompensas para outro. Os usuários podem usar essa funcionalidade para mover quantias parciais ou totais dos tokens apostados em um pool específico. O principal benefício é que os usuários não precisam passar pelo Leaving Pool e pelo Joining Pool novamente para mover sua participação.

Primeiro, todas as recompensas pendentes do Manual Rewards Pool são reivindicadas no nível do protocolo, pois a liquidez é adicionada ou removida. Portanto, o contador de recompensas do ponto de verificação precisa ser sincronizado com o pool. Em seguida, as ações do pool original são consumidas e trocadas em favor dos tokens de protocolo nativos ao preço atual do pool. Em seguida, as ações do novo pool são atingidas ao preço desse pool. Por fim, quaisquer tokens de poeira restantes são automaticamente trocados em favor das ações do Leaving Pool. Observe que tudo o que foi descrito acima é executado no mesmo bloco, e os usuários não precisam esperar por atrasos para ganhar recompensas no novo pool. A poeira no Leaving Pool pode ser reivindicada após os atrasos necessários terem decorrido.

## ![Visão geral de alto nível da Troca entre Pools Manuais e de Auto-Composição ao fazer Staking](/images/learn/tanssi/staking/staking-6.webp) ", "translated_content": "--- title: Staking para Produção de Blocos description: Aprenda como a Tanssi implementa um novo mecanismo de Staking para fornecer atividade via um conjunto descentralizado e confiável de sequenciadores para todas as redes alimentadas pela Tanssi. icon: material-hand-coin-outline categories: Basics

# Tanssi Staking para Produção de Blocos {: #tanssi-staking }

## Introdução {: #introduction }

Uma das principais propostas da Tanssi é simplificar a complexidade da infraestrutura para as redes. Um componente significativo é a inicialização de um conjunto descentralizado de sequenciadores, que a Tanssi oferece por meio de sua arquitetura e mecânica de staking exclusivas.

A mecânica de staking da Tanssi garante que os sequenciadores para as redes alimentadas pela Tanssi sejam selecionados por meio de um mecanismo confiável e descentralizado. Eles também incentivam a comunidade a delegar aos sequenciadores de melhor desempenho ou engajados.

Esta página aborda os conceitos fundamentais da mecânica de staking da Tanssi e como ela garante um conjunto descentralizado de produção de blocos que impulsiona a atividade da rede para as redes Tanssi.

<div style=\"text-align: center; justify-content:center;\" class=\"row hero-buttons\">
  <a href=\"https://www.tanssi.network/post/staking-tanssi\" aria-label=\"Learn How to Stake on Tanssi Apps\" style=\"margin: .5em;\">
    <button class=\"md-button primary-button\" style=\"padding: 1em; font-size: 1em;\">Aprenda a fazer Staking -></button>
  </a>
</div>

## Conceitos Essenciais {: #core-concepts }

A mecânica do módulo de staking da Tanssi foi inspirada no conceito de tokens de pool de liquidez (tokens LP) em Automated-Market-Makers (AMMs) tradicionais, como o Uniswap V2.

Cada sequenciador possui quatro pools de liquidez pelos quais os delegadores se movem ao realizar diferentes operações de staking. Em suma, cada pool de liquidez representa um estado diferente durante o processo de staking: entrada, staking por meio de recompensas manuais, staking por meio de recompensas de auto-composição e saída. No entanto, uma diferença fundamental é que os tokens LP em AMMs comuns são transferíveis, enquanto os tokens de participação de staking não são.

Um delegador tem quatro transações simples para percorrer os diferentes estados (pools de liquidez): delegar (para recompensas manuais ou de auto-composição), cancelar delegação, trocar e executar operações pendentes. Por exemplo, os usuários que desejam apostar através de qualquer pool de recompensas podem usar a chamada de delegação e entrar no Pool de Entrada imediatamente. Após um atraso, os usuários (ou qualquer outra pessoa) podem executar a operação pendente e entrar no pool de recompensas definido inicialmente. Uma vez lá, os usuários podem trocar entre os pools de recompensa com a frequência desejada. Por fim, os usuários em um pool de recompensas podem usar a chamada de cancelamento de delegação para entrar no Leaving Pool e desfazer suas moedas (ou de qualquer outra pessoa) executando a operação pendente após um determinado atraso.

Os pools de liquidez têm um conjunto de ações que podem ser considerados tokens LP em AMMs tradicionais. Quando os usuários entram em um novo pool de liquidez, eles recebem várias ações (tokens LP) que dependem do tipo de pool, do número de moedas que apostaram, do número total de ações e do número total de moedas apostadas nesse pool.

As recompensas são atribuídas aos Pools de Recompensas Manuais ou de Auto-Composição de um sequenciador quando a Tanssi atesta que o slot de produção de bloco específico ao qual o sequenciador foi atribuído foi cumprido e o bloco foi produzido com sucesso.

Todas as recompensas (para todos os pools) são armazenadas em uma conta de propriedade do protocolo. No entanto, o protocolo acompanha internamente os tokens nativos reais detidos por cada pool. A principal diferença entre staking por meio dos Pools de Recompensas Manuais ou de Auto-Composição é como as recompensas são distribuídas. No Pool de Recompensas Manuais, os usuários devem reivindicar manualmente quaisquer recompensas de staking que acumularam. Em contraste, no Pool de Recompensas de Auto-Composição, as recompensas são automaticamente restaked a cada bloco Tanssi, onde o protocolo anuncia o sequenciador para cada atribuição de produção de bloco.

As operações de delegação e cancelamento de delegação precisam ser enviadas pelo próprio delegador. Elas sinalizam a intenção da ação a ser tomada e pedem ao protocolo que realize as verificações necessárias para permitir que o delegador delegue ou cancele a delegação. Consequentemente, essas ações podem ser executadas somente após um certo número de sessões, mas qualquer pessoa na rede pode executar essa segunda operação por meio da transação de execução de operação pendente.

O diagrama a seguir resume o fluxo de alto nível de um delegador que delega e cancela a
