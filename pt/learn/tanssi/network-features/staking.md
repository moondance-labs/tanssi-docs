---
title: Staking para Produção de Blocos
description: Saiba como a Tanssi implementa um mecanismo de staking para prover disponibilidade por meio de um conjunto descentralizado e trustless de sequenciadores para todas as redes com tecnologia Tanssi.
icon: material-hand-coin-outline
categories: Basics
---

# Staking da Tanssi para Produção de Blocos {: #tanssi-staking }

## Introdução {: #introduction }

Uma das propostas centrais da Tanssi é simplificar a complexidade de infraestrutura das redes. Um componente crucial é iniciar um conjunto descentralizado de sequenciadores, que a Tanssi oferece por meio de sua arquitetura e mecânica de staking.

A mecânica de staking da Tanssi garante que os sequenciadores das redes com tecnologia Tanssi sejam escolhidos de forma descentralizada e trustless, além de incentivar a comunidade a delegar para sequenciadores de melhor desempenho ou mais engajados.

Este conteúdo apresenta os conceitos fundamentais do staking da Tanssi e como ele mantém um conjunto descentralizado de produção de blocos que garante a disponibilidade das redes.

<div style="text-align: center; justify-content:center;" class="row hero-buttons">
  <a href="https://www.tanssi.network/post/staking-tanssi" aria-label="Learn How to Stake on Tanssi Apps" style="margin: .5em;">
    <button class="md-button primary-button" style="padding: 1em; font-size: 1em;">Learn How to Stake -></button>
  </a>
</div>

## Conceitos Básicos {: #core-concepts }

A mecânica do módulo de staking da Tanssi foi inspirada no conceito de tokens de pool de liquidez (LP tokens) em AMMs tradicionais como Uniswap V2.

Cada sequenciador possui quatro pools de liquidez pelos quais os delegadores passam ao realizar diferentes operações de staking. Cada pool representa um estado do processo: ingresso, recompensas manuais, recompensas com auto-compound e saída. Diferente dos LP tokens tradicionais, os tokens de participação nesses pools não são transferíveis.

O delegador tem quatro transações simples para percorrer os estados (pools): delegar (para recompensas manuais ou auto-compound), undelegar, trocar e executar operações pendentes. Por exemplo, para entrar em um dos pools de recompensas, o usuário delega e entra no Joining Pool imediatamente. Após um atraso, o próprio usuário (ou qualquer pessoa) pode executar a operação pendente e entrar no pool de recompensas escolhido. Depois, pode trocar entre pools de recompensa quando quiser. Por fim, quem está em um pool de recompensas pode usar *undelegate* para ir ao Leaving Pool e remover o stake; após o atraso, qualquer pessoa pode executar a operação pendente e concluir a saída.

Pools de liquidez possuem shares, análogas a LP tokens em AMMs. Ao entrar em um novo pool, o usuário recebe shares conforme o tipo de pool, a quantidade delegada, o total de shares e o total delegado nesse pool.

Recompensas são atribuídas aos pools Manual ou Auto-Compound de um sequenciador quando a Tanssi atesta que o slot de produção de blocos designado foi cumprido com sucesso.

Todas as recompensas (de todos os pools) ficam em uma conta do protocolo, mas o protocolo rastreia internamente os tokens nativos de cada pool. A diferença entre pools Manual e Auto-Compound é como as recompensas são distribuídas: no **Manual Rewards Pool**, o usuário precisa reivindicar; no **Auto-Compound Rewards Pool**, as recompensas são automaticamente reinvestidas a cada bloco da Tanssi.

As operações de delegar e undelegar precisam ser enviadas pelo próprio delegador, sinalizando a intenção e pedindo ao protocolo para realizar as verificações necessárias. Essas ações só podem ser executadas depois de um número de sessões, mas qualquer participante pode realizar a segunda etapa por meio da transação *execute pending operation*.

O diagrama a seguir resume o fluxo de delegar e undelegar para um sequenciador; ações do usuário em ciano e pools em coral.

![Visão geral do mecanismo de staking da Tanssi](/images/learn/tanssi/staking/staking-1.webp)

## Parâmetros de Staking {: #staking-parameters }

=== "Tanssi MainNet"
    |   Variável    |                                                         Valor                                                         |
    |:-------------:|:---------------------------------------------------------------------------------------------------------------------:|
    | Joining Delay | {{ networks.mainnet.staking.joining_delay_blocks }} blocos ({{ networks.mainnet.staking.joining_delay_hours }} horas) |
    | Leaving Delay | {{ networks.mainnet.staking.leaving_delay_blocks }} blocos ({{ networks.mainnet.staking.leaving_delay_hours }} horas) |
  
=== "Dancelight TestNet"
    |   Variável    |                                                            Valor                                                            |
    |:-------------:|:---------------------------------------------------------------------------------------------------------------------------:|
    | Joining Delay | {{ networks.dancelight.staking.joining_delay_blocks }} blocos ({{ networks.dancelight.staking.joining_delay_hours }} horas) |
    | Leaving Delay | {{ networks.dancelight.staking.leaving_delay_blocks }} blocos ({{ networks.dancelight.staking.leaving_delay_hours }} horas) |

## Pools de Staking {: #staking-pools}

Esta seção detalha cada pool que representa uma etapa do processo de staking.

### Joining Pool {: #joining-pool}

Ao delegar para iniciar o staking, o usuário escolhe o mecanismo de recompensas: manual ou auto-compound (cada um é um pool). Após a transação, o usuário entra no Joining Pool e recebe shares proporcionais ao valor delegado. Esse pool oferece estabilidade aos sequenciadores, impondo um atraso entre delegar e receber recompensas (pelo menos uma sessão).

Exemplo prático: Alice inicia o staking mirando o Manual Rewards Pool e entra no Joining Pool no meio de uma sessão; ela deve esperar até o fim da sessão seguinte para executar a operação pendente e começar a receber recompensas.

Joining Pools têm proporção 1:1 entre shares e tokens delegados. Se Alice delega 100 tokens, recebe 100 shares do Joining Pool. Quando a operação pendente de delegate é executada, o protocolo consome as shares do Joining Pool em troca dos tokens nativos, que são imediatamente convertidos em shares do Manual ou Auto-Compound Rewards Pool.

O diagrama abaixo supõe que o usuário está direcionando stake para o Manual Rewards Pool.

![Visão geral do Joining Pool no staking](/images/learn/tanssi/staking/staking-2.webp)

### Manual Rewards Pool {: #manual-rewards-pool}

Ao entrar no Manual Rewards Pool, o protocolo destrói as shares do Joining Pool em favor do token nativo. No mesmo bloco, calcula quantas shares do Manual Pool podem ser cunhadas com esse valor, com base no preço da share:

```mathematica
SharePrice [Tokens/Shares] = NumberOfTokensInPool / NumberOfSharesInPool 
```

Shares não têm decimais; qualquer resto de tokens ao adquirir shares é devolvido ao usuário. O preço da share não muda com novas entradas, pois a razão é mantida. Com shares do Manual Rewards Pool, o usuário passa a acumular recompensas (na mesma sessão) que precisam ser reivindicadas manualmente.

Ao contrário do Auto-Compound, a distribuição no Manual ocorre por um mecanismo de checkpoint de recompensas. Ele rastreia o histórico de tokens nativos por share atribuído pelo protocolo naquele Manual Rewards Pool em um momento específico. Quando a Tanssi atesta um bloco produzido por um sequenciador, novas recompensas são atribuídas ao Manual Rewards Pool para os usuários reivindicarem, e o contador de recompensas aumenta. Assim, as recompensas são refletidas na razão de tokens por share, diferença entre o contador atual do pool e o checkpoint do usuário.

O contador de recompensas por share é essencial para calcular o valor devido ao reivindicar. Após calcular, o protocolo envia os tokens para o usuário e redefine o checkpoint dele para o contador atual do pool, garantindo alinhamento e zero recompensas pendentes.

De forma semelhante, ao adicionar ou remover stake, as recompensas são reivindicadas automaticamente e o checkpoint é redefinido, pois a condição de recompensas para aquele montante muda e precisa ser sincronizada com o pool.

![Visão geral do Manual Rewards Pool no staking](/images/learn/tanssi/staking/staking-3.webp)

### Auto-Compound Rewards Pool {: #autocompounded-rewards-pool}

Ao entrar no Auto-Compound Rewards Pool, o protocolo destrói as shares do Joining Pool em favor do token nativo. No mesmo bloco, calcula quantas shares de Auto-Compound podem ser cunhadas com esse valor, com base no preço da share:

```mathematica
SharePrice [Tokens/Shares] = NumberOfTokensInPool / NumberOfSharesInPool 
```

Shares não têm decimais; qualquer resto é devolvido ao usuário. O preço da share não muda na entrada. Com shares do Auto-Compound Rewards Pool, o usuário acumula recompensas na mesma sessão.

Ao contrário do Manual, as recompensas em tokens nativos no Auto-Compound são atribuídas automaticamente a cada bloco da Tanssi em que o protocolo atesta o sequenciador designado. Como o número de tokens no pool cresce e o de shares permanece, o preço da share sobe; ao resgatar, o usuário recebe mais tokens por share do que na entrada.

![Visão geral do Auto-Compound Rewards Pool no staking](/images/learn/tanssi/staking/staking-4.webp)

As recompensas são reinvestidas como novo stake no Auto-Compound Rewards Pool, caracterizando o auto-compound.

Contudo, quando recompensas auto-compound são atribuídas, elas não ficam no saldo reservado do usuário; ainda estão na conta do protocolo, e o aumento do stake é representado pelo aumento do preço da share. Em alguns cenários, o usuário pode querer que esse saldo conste no estado como saldo reservado (por exemplo, governança).

Por isso, o protocolo oferece uma chamada específica para atualizar o saldo reservado de qualquer delegado, movendo as recompensas auto-compound da conta do protocolo para o saldo reservado do usuário. Isso também é executado automaticamente ao remover liquidez do Auto-Compound Rewards Pool.

### Leaving Pool {: #leaving-pool}

Ao sair de posições no Manual ou Auto-Compound, o usuário pode iniciar uma undelegation. Como na entrada, é um processo em duas etapas: assina a intenção de remover a delegação e aguarda pelo menos uma sessão antes de a operação ser executada por qualquer pessoa.

Ao executar a intenção de saída, o protocolo troca shares do pool específico por tokens nativos ao preço atual. Para o Manual Rewards Pool, recompensas não reivindicadas são atribuídas ao usuário. Em seguida, o protocolo compra shares do Leaving Pool em proporção 1:1 aos tokens nativos recebidos, garantindo que o usuário entre no Leaving Pool com shares equivalentes ao valor a ser retirado.

Após uma sessão, qualquer usuário pode executar a operação pendente; o protocolo então troca shares do Leaving Pool por tokens nativos em proporção 1:1.

O objetivo principal do Leaving Pool é fornecer um buffer para saídas, permitindo implementar mecanismos de slashing para coibir mau comportamento. O slashing não está implementado atualmente, mas pode ser adicionado no futuro.

O diagrama a seguir supõe que o usuário está saindo do Manual Rewards Pool.

![Visão geral do Leaving Pool no staking](/images/learn/tanssi/staking/staking-5.webp)

### Trocar entre Pools de Recompensa {: #swap-rewards-pool}

O módulo de staking da Tanssi permite trocar o stake de um pool de recompensas para outro, total ou parcialmente, sem passar novamente pelos pools de entrada e saída.

Primeiro, todas as recompensas pendentes do Manual Rewards Pool são reivindicadas em nível de protocolo, pois a liquidez está sendo alterada e o checkpoint precisa ser sincronizado. Em seguida, shares do pool original são consumidas e trocadas por tokens nativos ao preço atual; então, shares do novo pool são adquiridas ao preço do novo pool. Qualquer “poeira” restante é convertida em shares do Leaving Pool. Tudo ocorre no mesmo bloco; não há atraso para começar a receber recompensas no novo pool. A poeira no Leaving Pool pode ser reivindicada após os atrasos necessários.

![Visão geral da troca entre pools Manual e Auto-Compound no staking](/images/learn/tanssi/staking/staking-6.webp)
