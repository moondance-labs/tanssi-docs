---
title: Recursos Essenciais de Runtime
description: Conheça os recursos centrais de uma rede Tanssi, os tipos de transação, como são executadas e incluídas em um bloco e os upgrades de runtime sem fork.
icon: octicons-package-24
categories: Basics
---

# Recursos Essenciais de Runtime {: #core-runtime-features }

## Introdução {: #introduction}

As redes implantadas via Tanssi têm [muitos benefícios](/pt/learn/tanssi/overview/#what-tanssi-provides){target=\_blank} devido à sua [arquitetura](/pt/learn/tanssi/overview/#tanssi-architecture){target=\_blank} exclusiva.

Além disso, redes com tecnologia Tanssi são únicas pelo [framework](/pt/learn/framework/){target=\_blank} (Substrate) em que são construídas, que oferece características que os desenvolvedores podem aproveitar para ajustar comportamentos específicos no runtime.

Esta seção aborda alguns desses recursos essenciais de runtime em redes Tanssi, incluindo as diferentes origens que uma transação pode ter, os diferentes tipos de transação e como são executadas e incluídas em um bloco, a conta especial conhecida como _SUDO_ e o recurso bastante singular das redes Tanssi: os upgrades de runtime sem fork.

## Origens {: #origins}

De modo geral, todas as chamadas em uma rede Tanssi têm uma origem. Mas o que é uma origem? Desenvolvedores do mundo EVM conhecem o _msg.sender_ em transações EVM. As origens são para redes Tanssi o que _msg.sender_ é para uma transação EVM, mas com diversas funcionalidades extras.

Uma origem define de onde a chamada vem. Diferentemente de cadeias compatíveis com Ethereum, pode haver muitas origens em redes Tanssi. Por exemplo, o _msg.sender_ de uma transação EVM é uma _signed origin_, o que significa que a chamada é uma transação assinada pela chave privada de alguma conta on-chain. Isso permite ao runtime autenticar a origem da chamada e, por exemplo, cobrar taxas da conta associada.

No entanto, origens podem fazer mais do que representar um par de chaves privada/pública. Elas também têm diferentes níveis de privilégio. Por exemplo, uma _signed origin_ pode enviar uma transação despachada pelo par de chaves, mas não deveria poder autorizar um upgrade de runtime.

Alguns dos tipos mais comuns de origem são:

- **Root** - origem em nível de sistema com o nível mais alto de privilégio; pode ser vista como o superusuário da cadeia, capaz de executar qualquer chamada
- **Signed** - como mencionado, a origem de uma transação assinada pela chave privada de uma conta on-chain, que inclui o identificador da conta (endereço) como assinante
- **None** - ausência de origem. Usada em ações específicas que devem ser acordadas no nível do runtime. Por exemplo, é possível programar o runtime para que uma transação com origem _none_ efetive um upgrade de runtime pré-autorizado, sem taxa associada
- **Custom** - desenvolvedores podem criar origens personalizadas para casos específicos. Por exemplo, a [governança on-chain da Moonbeam](https://docs.moonbeam.network/learn/features/governance){target=\_blank} tem origens específicas para cada tipo de voto, chamadas _tracks_. Cada track pode ser configurada para executar chamadas com níveis de privilégio específicos. Uma track é _Root_, cuja origem é a _Root_ mencionada, com configuração bem restritiva para aprovação. Outras tracks têm níveis de privilégio muito menores para operações menos críticas

## Tipos de Transação {: #transaction-types}

Redes Tanssi possuem três tipos principais de transações:

- **Signed Transactions** - incluem um payload assinado solicitando executar alguma chamada de runtime. Em geral, a assinatura está associada a um par de chaves privada/pública. Dependendo da lógica do runtime, a conta associada à assinatura paga a taxa de transação
- **Unsigned Transactions** - incluem um payload não assinado solicitando executar alguma chamada de runtime. Como são não assinadas, não há conta associada. Portanto, os runtimes precisam definir condições específicas para evitar spam ou replay, pois não há mecanismo de taxa para impedir comportamentos maliciosos. Um exemplo de transação não assinada é executar ações pré-aprovadas, como um upgrade de runtime
- **Inherent Transactions** - transação não assinada que um sequenciador insere em um bloco ao iniciar sua construção. Elas fazem parte do bloco e não ficam no pool de transações nem são compartilhadas entre participantes. Além disso, os dados inseridos por transações inherents podem pular validação de runtime, ficando a cargo dos operadores aceitá-los. Um exemplo é o timestamp do bloco, injetado por uma transação inherent; operadores podem aceitar ou rejeitar o bloco com base em o timestamp estar dentro de um intervalo aceitável

## Execução de Transações {: #transaction-execution}

Quando um usuário ou aplicativo envia uma transação assinada a uma rede Tanssi, a transação é validada em nível de nó completo usando regras definidas no runtime e, em seguida, é enfileirada no transaction pool. Isso garante que apenas transações que cumpram certas condições específicas da cadeia sejam consideradas para inclusão em um bloco.

!!! note
    O tipo de transação mais comum é a assinada. Ainda assim, transações não assinadas também são validadas antes de entrarem no transaction pool.

A fila de transações válidas tem dois pools: ready e future. O pool ready contém todas as transações que podem ser incluídas em um novo bloco pendente. O pool future é para transações que não atendem a todos os critérios agora, mas podem se tornar válidas (por exemplo, nonce futura). Transações inválidas são rejeitadas diretamente.

Durante a construção do bloco, um sequenciador usa um [sistema de prioridade](https://github.com/paritytech/substrate/blob/fb24fda76d613305ebb2e5728c75362c94b64aa1/frame/transaction-payment/src/lib.rs#L614-L681){target=\_blank} via um módulo de orquestração de transações para ordenar as transações do próximo bloco até atingir a capacidade máxima. A ordem de construção e execução do bloco tem as seguintes operações:

- **Initializing a Block** - conhecido como `on_initialize`, permite definir lógica de runtime executada antes de qualquer outra transação. Por exemplo, transações inherents como o timestamp são comumente executadas ao inicializar o bloco. Após a lógica de inicialização, o módulo de orquestração verifica o parent hash no cabeçalho e a trie root para garantir que as informações estejam corretas
- **Transaction Execution** - com o bloco já inicializado, o módulo de orquestração executa cada transação válida conforme sua prioridade. O estado inicial não é armazenado em cache antes da execução; se uma transação falhar no meio, quaisquer alterações de estado já cometidas não podem ser revertidas, e o bloco subsequente será inválido. Portanto, a lógica de runtime deve realizar todas as verificações necessárias para garantir que as transações válidas serão bem-sucedidas
- **Finalizing a Block** - após executar todas as transações válidas em fila ou atingir o limite do bloco, o módulo de orquestração chama, em cada módulo do runtime, as funções `on_idle` e `on_finalize`. Essas funções permitem definir lógica extra executada automaticamente na finalização do bloco. Depois da última `on_finalize`, o módulo de orquestração garante que o block digest e o storage root correspondam ao que foi calculado ao inicializar o bloco

## Upgrades sem Fork {: #forkless-upgrades}

Redes implantadas via Tanssi têm um recurso empolgante: [forkless upgrades](https://docs.polkadot.com/develop/parachains/maintenance/runtime-upgrades/){target=\_blank}. Eles permitem alterar a função de transição de estado que governa a cadeia sem criar um fork, como já visto várias vezes na Ethereum. Além disso, se a rede Tanssi estiver configurada com governança on-chain, upgrades podem ocorrer de forma realmente descentralizada e trustless.

Os forkless upgrades são possíveis porque a função de transição de estado fica armazenada como um blob Wasm tanto na rede Tanssi quanto na rede com tecnologia Tanssi. Quando um novo runtime é agendado por uma chamada na rede com tecnologia Tanssi, a rede Tanssi valida esse bloco e se prepara para validar blocos usando a função mais recente. Após um período de atraso configurado para o upgrade, um sequenciador na rede com tecnologia Tanssi constrói um bloco que referencia um bloco da rede Tanssi, sinalizando que o novo runtime pode ser aplicado. Assim, essa nova função de transição de estado é usada para aquele bloco. Como todos os participantes usam o blob Wasm on-chain, cada operador de nó da rede Tanssi pode validar novos blocos com a função mais recente.

Um resumo em alto nível do processo de upgrade de runtime está no diagrama a seguir:

![Runtime Upgrade Process Tanssi Networks](/images/learn/decentralized-networks/runtime-features/runtime-features-1.webp)

## Conta SUDO {: #sudo-account}

Redes Tanssi podem usar um módulo específico chamado [SUDO](https://paritytech.github.io/polkadot-sdk/master/pallet_sudo/pallet/struct.Pallet.html){target=\_blank}. Esse módulo introduz um novo tipo de conta, também chamada _SUDO_, que pode executar transações com a [_Root_ origin](#origins).

Consequentemente, a conta SUDO pode realizar **qualquer** ação que o runtime permita à origem _Root_. Isso inclui:

- Cunhar novos tokens nativos da rede Tanssi
- Realizar [upgrades de runtime sem fork](#forkless-upgrades)
- Enviar transações se passando por outros [tipos de origem](#origins). Assim, SUDO pode enviar transações em nome de outros usuários sem acessar suas chaves privadas

_SUDO_ é recomendada para TestNets, pois permite fazer mudanças rapidamente sem um processo longo de governança on-chain. É boa prática manter as chaves _SUDO_ em segurança e conceder acesso a chamadas _SUDO_ por meio de contas proxy. Contudo, manter _SUDO_ habilitada em produção pode trazer consequências indesejadas.

**Entender os riscos de centralização de ter _SUDO_ em produção é fundamental.**
