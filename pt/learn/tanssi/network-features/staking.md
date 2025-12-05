---
title: Staking para Produção de Blocos
description: Saiba como a Tanssi implementa um mecanismo de staking para prover disponibilidade por meio de um conjunto descentralizado e trustless de sequenciadores para todas as redes com tecnologia Tanssi.
icon: material-hand-coin-outline
categories: Basics
---

# Staking da Tanssi para Produção de Blocos {: #tanssi-staking }

## Introdução {: #introduction }

Uma das propostas centrais da Tanssi é simplificar a complexidade de infraestrutura das redes. Um componente crucial é iniciar um conjunto descentralizado de sequenciadores, que a Tanssi oferece por sua arquitetura e mecânica de staking.

O staking da Tanssi garante que os sequenciadores das redes com tecnologia Tanssi sejam escolhidos de forma descentralizada e trustless, além de incentivar a comunidade a delegar para sequenciadores de melhor desempenho.

Este conteúdo apresenta os conceitos fundamentais do staking da Tanssi e como ele mantém um conjunto descentralizado de produção de blocos que garante a disponibilidade das redes.

<div style="text-align: center; justify-content:center;" class="row hero-buttons">
  <a href="https://www.tanssi.network/post/staking-tanssi" aria-label="Learn How to Stake on Tanssi Apps" style="margin: .5em;">
    <button class="md-button primary-button" style="padding: 1em; font-size: 1em;">
Aprenda como Fazer Estacas -></button>
  </a>
</div>

## Conceitos Básicos {: #core-concepts }

A mecânica de staking da Tanssi se inspira no conceito de tokens de pool de liquidez (LP tokens) em AMMs como o Uniswap V2.

Cada sequenciador tem quatro pools de liquidez pelos quais os delegadores passam ao realizar operações de staking: entrando, recebendo recompensas manuais, recompensas com auto-compound e saindo. Diferentemente dos LP tokens tradicionais, os tokens de participação nesses pools não são transferíveis.

Há quatro operações simples para que o delegador alterne entre estados (pools): delegar (para recompensas manuais ou auto-compound), undelegar, trocar entre pools e executar operações pendentes. Exemplo: ao delegar para um dos pools de recompensas, o usuário entra no **Joining Pool**; após um atraso, qualquer pessoa pode executar a operação pendente e mover os fundos para o pool escolhido. Depois disso, é possível trocar entre pools de recompensas. Para sair, o usuário usa *undelegate* e, após o atraso, executa a operação pendente para resgatar tokens.

Pools mantêm um conjunto de **shares** (análogas a LP tokens). As shares recebidas dependem do tipo de pool, quantidade delegada, total de shares e total delegado no pool.

Recompensas são atribuídas aos pools de recompensas (Manual ou Auto-Compound) quando a Tanssi atesta que o slot de produção de blocos do sequenciador foi cumprido com sucesso.

Todas as recompensas ficam em uma conta do protocolo, mas o protocolo rastreia internamente o saldo de cada pool. A diferença entre os pools de recompensas é como as recompensas são distribuídas: no **Manual Rewards Pool** o usuário precisa reivindicar; no **Auto-Compound Rewards Pool** as recompensas são reinvestidas automaticamente a cada bloco Tanssi.

As chamadas de delegar e undelegar precisam ser enviadas pelo próprio delegador (sinalizam a intenção). Após o atraso configurado em sessões, qualquer pessoa pode executar a operação pendente para efetivar a entrada/saída do pool.

O diagrama a seguir resume o fluxo de delegar e undelegar para um sequenciador; ações do usuário em ciano e pools em coral.

![Tanssi Staking Flow](/images/learn/tanssi/staking/staking-1.webp)

## Visão Geral do Módulo {: #pallet-overview }

O módulo de staking da Tanssi mantém um inventário de sequenciadores, delegadores e permissões, além das pools de recompensas. As principais estruturas (em inglês para corresponder ao código) são:

- **`SequencerBalance`**: registra stake do sequenciador, delegadores permitidos e pools do sequenciador.
- **`RewardPools`**: mantém recompensas disponíveis para o sequenciador, e rewards acumulados (pending) em cada pool.
- **`PoolData`**: metadados de cada pool (shares, delegado total, contas do pool, epoch de entrada).
- **`JoiningPools`**: operações pendentes de entrada em um sequenciador; usuários movem fundos aqui antes de irem ao pool de destino.
- **`LeavingPool`**: operações pendentes de saída; delegadores movem fundos para sair de todos os pools.

![Tanssi Staking Pallet Overview](/images/learn/tanssi/staking/staking-2.webp)

## Fluxo de Entradas e Saídas {: #delegator-in-and-out }

O fluxo de delegação/saída acontece em duas etapas:

- **Sinalizar**: o usuário envia *delegate* ou *undelegate* e os fundos entram no Joining Pool ou Leaving Pool. Nessa etapa o protocolo valida permissões (limites de delegadores por sequenciador, autodelegação etc.).
- **Executar**: após o atraso configurado, qualquer pessoa pode chamar *execute_pending_operation* para mover os fundos para o pool de destino (manual ou auto-compound) ou completar a saída para o delegador.

## Pools de Recompensa {: #reward-pools }

Há três pools de recompensa por sequenciador:

- **Joining Pool**: estágio intermediário antes de alocar em Manual ou Auto-Compound.
- **Manual Rewards Pool**: recompensas precisam ser reivindicadas manualmente.
- **Auto-Compound Rewards Pool**: recompensas são automaticamente reinvestidas a cada bloco Tanssi.

![Tanssi Reward Pools](/images/learn/tanssi/staking/staking-3.webp)

## Distribuição de Recompensas {: #reward-distribution }

Ao final de cada sessão, a Tanssi calcula recompensas do sequenciador e distribui para os pools Manual e Auto-Compound do sequenciador:

- Valor do pool manual:
  ```math
  reward\_manual = (total\_reward * weight\_manual) / (weight\_manual + weight\_auto)
  ```
- Valor do pool auto-compound:
  ```math
  reward\_auto = total\_reward - reward\_manual
  ```
- Rewards são somados a `available_rewards` de cada pool; depois, no block hook, `available_rewards` é movido para `pending_rewards` e, em seguida, distribuído proporcionalmente às shares dos delegadores.

### Como as shares evoluem {: #shares-evolution }

- Quando um delegador entra em um pool:
  ```math
  shares = (stake\_amount * total\_shares) / total\_stake\_in\_pool
  ```
- Quando rewards são adicionadas, o total de stake no pool aumenta, mas o total de shares não muda; isso faz o valor por share subir.
- Na saída, o usuário recebe:
  ```math
  payout = (user\_shares * total\_stake\_in\_pool) / total\_shares
  ```

### Auto-Compound x Manual {: #auto-vs-manual }

- **Manual**: usuário reivindica quando quiser; valor por share cresce apenas quando `pending_rewards` é distribuído.
- **Auto-Compound**: a cada bloco, `pending_rewards` é reinvestido automaticamente no pool, aumentando o valor por share continuamente.

## Operações de Usuário {: #user-actions }

- **delegate(sequencer_id, amount, autocompound?)**
  - Envia fundos para o Joining Pool do sequenciador (destino manual ou auto).
  - Após `join_delay`, executar operação pendente move fundos para o pool de destino.
- **execute_pending_operation(target_account?)**
  - Qualquer pessoa pode chamar; move operações do Joining/Leaving Pool após os atrasos.
- **swap_pool(sequencer_id)**
  - Troca entre Manual e Auto-Compound; adiciona entrada no Joining Pool e saída do pool atual; após atraso, execução pendente efetiva a troca.
- **undelegate(sequencer_id)**
  - Move shares para o Leaving Pool; após `leaving_delay`, execução pendente devolve tokens ao delegador.

## Parâmetros Importantes {: #parameters }

- **join_delay**: número de sessões antes de entrar no pool de destino.
- **leave_delay**: número de sessões antes de concluir a saída.
- **max\_delegators**: limite de delegadores por sequenciador.
- **weights de recompensa**: definem quanto vai para Manual vs Auto-Compound.

## Resumo {: #summary }

- Delegadores interagem com pools por operações em duas etapas (sinalizar, executar).
- Recompensas são alocadas entre pools Manual e Auto-Compound a cada sessão; Auto-Compound reinveste automaticamente.
- Shares não são transferíveis e definem a fração de cada pool; valor por share aumenta com recompensas.

