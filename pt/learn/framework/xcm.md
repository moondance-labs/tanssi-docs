---
title: Comunicação Nativa Cross-Chain
description: Tanssi networks benefit from XCM, a native cross-chain communication language, which allows fast and secure bridging guaranteed by Polkadot's relay chain.
categories: Basics
---

# Comunicação Nativa Cross-Chain

## Introdução {: #introduction }

Todas as redes alimentadas por Tanssi têm uma capacidade inerente de se comunicar e interagir com qualquer outra rede no ecossistema. Esse recurso de comunicação cross-chain nativo é possível graças à infraestrutura exclusiva sobre a qual as redes são construídas, alavancando o formato de Mensagem Cross-Consensus (XCM para abreviar), que facilita a comunicação entre diferentes sistemas de consenso.

XCM é uma linguagem de mensagens projetada para ser genérica. Ela não faz nenhuma suposição sobre a cadeia de destino e pode comunicar diferentes intenções entre sistemas de consenso soberanos.

A mensagem XCM é um programa que contém uma ou mais instruções que serão retransmitidas para execução na cadeia de destino. Por si só, cada instrução XCM é sem sentido, mas a combinação de um conjunto específico de instruções pode resultar em uma ação desejada quando a mensagem XCM é executada na cadeia de destino.

Neste artigo, abordamos os conceitos básicos do mecanismo de comunicação cross-chain nativo que permite pontes rápidas e seguras dentro do ecossistema.

## Princípios de Design {: #design-principles }

Concebido com uma mentalidade abstrata, o XCM não foi projetado para estar em conformidade com um caso de uso específico ou configuração de rede de destino específica, minimizando assim o efeito de acoplamento. Seus princípios básicos de design são:

- **Assíncrono** - semelhante ao envio de um cartão postal - mas muito mais rápido - o remetente continuará a realizar suas tarefas como de costume, sem se bloquear ou aguardar uma resposta do destino
- **Absoluto** - as mensagens têm garantia de serem entregues ao destino pretendido, em ordem e em tempo hábil
- **Assimétrico** - as mensagens enviadas não têm contrapartida de resposta. Quaisquer valores de retorno, se necessários, devem ser enviados de volta do destino para o remetente com outra mensagem
- **Agnóstico** - não há qualquer suposição sobre a configuração ou propriedades de duas redes de comunicação. As redes podem diferir em todos os aspectos, exceto na capacidade de entender o XCM. Por exemplo, uma cadeia pode ser compatível com EVM e a outra não, uma cadeia pode ser uma rede DeFi e a outra uma rede de jogos, e assim por diante.

## Taxas {: #fees }

Um usuário que executa uma transação em uma rede deve pagar as taxas derivadas do esforço computacional associado à tarefa, e a execução cross-chain não é exceção a essa regra. Na comunicação cross-chain, uma mensagem requer execução em pelo menos duas cadeias diferentes, e o usuário precisa pagar as taxas associadas ao esforço computacional feito por cada cadeia envolvida. Além dos custos relacionados à execução, as redes Tanssi incluem uma [taxa de entrega](https://paritytech.github.io/polkadot-sdk/master/polkadot_runtime_common/xcm_sender/struct.ExponentialPrice.html){target=\_blank} padrão para evitar spam XCM.

Por exemplo, se um usuário na rede A deseja chamar um contrato inteligente na rede B, o usuário deve ter fundos suficientes para pagar a entrega da mensagem e incluir instruções na mensagem XCM para fornecer um ativo que a rede B aceite como pagamento por seus serviços para cobrir as taxas associadas. Uma vez que esse ativo é fornecido, a execução agora pode ser comprada na cadeia de destino.

!!! nota
Como as redes são soberanas, elas decidem quais tokens são válidos para pagar suas taxas de execução XCM.
Por exemplo, se a rede B aceitar tokens da rede A para pagamentos de taxas, qualquer usuário na rede A pode pagar por uma mensagem XCM destinada à rede B usando apenas tokens da rede A.

## Casos de Uso Comuns {: #common-use-cases }

Muitos casos de uso podem ser abordados, beneficiando-se do terreno comum e da versatilidade que o XCM oferece. Dois dos mais recorrentes são transferências de ativos e execução remota.

### Transferências de Ativos {: #asset-transfer }

Mover ativos digitais de uma rede para outra é essencial para criar um ecossistema blockchain mais dinâmico, eficiente e interconectado. O recurso cross-chain nativo permite duas estratégias principais para transferir ativos de uma cadeia para outra:

- **Teleporte** - teletransportar um ativo é um mecanismo simples e eficiente, mas tem uma grande ressalva: requer confiança entre as partes. Essencialmente, quando a rede A deseja enviar X quantidade de ativos para a rede B, ela queima X quantidade de ativos e envia uma mensagem para a rede B instruindo-a a cunhar exatamente X quantidade de ativos, preservando o saldo geral de ativos e concluindo a ação de teletransporte. Nesse processo, a rede A confia na rede B para não cunhar mais tokens do que o transferido, e a rede B confia na rede A para queimar os tokens que foram transferidos
- **Transferência de reserva** - Uma transferência de reserva envolve a **cadeia de reserva** de um ativo, que é a cadeia onde o ativo é nativo (por exemplo, [Moonbeam](https://moonbeam.network/){target=\_blank} é a cadeia de reserva para o token GLMR). Além disso, as redes não reservadas mantêm uma *conta soberana* na cadeia de reserva, uma conta sem chave gerenciada pelo respectivo governador da rede. Assim, quando a rede de reserva A deseja enviar X quantidade de um ativo para a rede não reservada B, ela transfere localmente os ativos para a conta soberana da rede B e, na mesma ação atômica, envia uma mensagem XCM para a rede B com instruções para cunhar X quantidade de uma forma derivada do ativo transferido. Por outro lado, se a rede não reservada B deseja enviar X quantidade de um ativo para a rede de reserva A, as etapas são: a rede B queima a forma derivada do ativo localmente e envia uma mensagem XCM para a rede A, com instruções para transferir os ativos da conta soberana da rede B para a conta de destino da rede A. Mesmo que a rede não reservada cunhe tokens derivados em excesso (ou não queime tokens ao transferir), esses tokens não terão valor real porque não são apoiados um a um na cadeia de reserva

As taxas associadas à execução de transferências são tipicamente deduzidas do valor transferido, para que o destinatário receba a quantia pretendida menos as taxas.

### Execução Remota {: #remote-execution }

A interoperabilidade nativa que o XCM fornece permite que uma rede envie uma mensagem a outra, acionando alguma ação. Por exemplo, se a cadeia de destino for compatível com EVM, a rede A poderá chamar um contrato inteligente implantado na rede B.

Conforme mencionado na [seção de taxas](#fees), para que qualquer solicitação na cadeia seja executada, é necessário cobrir suas taxas associadas. No XCM, a execução remota pode ser comprada com duas etapas:

1. Reservar alguns ativos usando a instrução `WithdrawAsset` XCM, que retira fundos da origem da chamada e os coloca em um registro de retenção
2. Pagar pela execução na cadeia, usando a instrução `BuyExecution` XCM, que usa os ativos previamente retirados

!!! nota
    Quando uma rede envia uma mensagem XCM, sua fonte padrão no lado receptor é a conta soberana da rede de origem. A rede remetente pode adicionar uma instrução XCM chamada `DescendOrigin` à mensagem, alterando a conta de origem para corresponder à conta do usuário que assina, garantindo que a execução ocorra em nome da mesma entidade que inicia a mensagem XCM na cadeia de origem e evitando um cenário potencialmente inseguro.

Finalmente, a execução ocorre na cadeia de destino, chamando um contrato inteligente ou qualquer outra transação usando a instrução XCM chamada `Transact`.

O fluxo geral para execução remota é representado no seguinte diagrama:

![Fluxo de Execução Remota](/images/learn/framework/xcm/xcm-1.webp)

## Estabelecendo Comunicação Cross-Chain {: #channel-registration }

Antes que duas cadeias possam se comunicar, um canal de mensagens deve ser estabelecido. Os canais são unidirecionais, o que significa que canais separados são necessários para enviar mensagens da cadeia A para a cadeia B e da B para a A.

Para que a cadeia A se comunique com a cadeia B, a cadeia A deve enviar uma transação de canal aberto para a cadeia de retransmissão solicitando que um canal seja aberto com a cadeia B. A cadeia B deve então aceitar a solicitação enviando uma mensagem XCM correspondente para a cadeia de retransmissão. Somente quando ambas as cadeias concordam é que o canal é aberto na próxima época. O mesmo processo é necessário para estabelecer um canal da cadeia B para a cadeia A.

É importante notar que um canal entre uma rede e a cadeia de retransmissão é aberto automaticamente mediante registro e integração da rede.

![Visão geral do registro de canal XCM](/images/learn/framework/xcm/xcm-2.webp)

Depois que o canal é estabelecido, as mensagens cross-chain podem ser enviadas entre as redes. Para transferências de ativos, os ativos também precisarão ser registrados antes de serem transferidos.

!!! nota
    XCM é uma linguagem versionada e em constante evolução. Quando duas redes de comunicação usam versões diferentes do XCM, elas devem usar a versão mais recente com suporte do lado menos atualizado. Para descobrir a versão XCM mais recente com a qual uma rede pode trabalhar, outras redes podem consultá-la e assinar atualizações sempre que isso mudar.

## Destinos de Mensagens {: #message-destinations }

Para compor mensagens significativas em um ambiente multichain, é necessário ter uma maneira precisa e abstrata de referenciar recursos localizados em diferentes sistemas de consenso. Um conceito chamado *multilocalização* é usado para servir a esse propósito e direcionar uma cadeia específica ou qualquer um de seus elementos internos, como uma conta, um ativo ou um contrato inteligente.

Os elementos de destino do XCM são organizados em uma arquitetura hierárquica, onde os elementos estão contidos em outros componentes. Por exemplo, um contrato inteligente é um elemento contido em uma rede, e o mesmo pode ser dito para uma conta ou um ativo ERC20. As redes estão contidas pela cadeia de retransmissão, que desempenha um papel crucial no processo de mensagens cross-chain, retransmitindo mensagens de uma rede para outra.

Multilocalizações não são um localizador de recursos universal. Eles se referem a elementos da perspectiva do remetente e são compostos por dois componentes: `pais` e `interior`. Pais é uma propriedade que indica se a rota deve "subir" na hierarquia, ou seja, de uma rede para a cadeia de retransmissão. Interior é uma lista de junções que definem como localizar o destino. Aqui estão alguns exemplos de multilocalizações:

- **Rede A referencia um contrato inteligente na rede B** - do ponto de vista da rede A, para alcançar um contrato inteligente na rede B, é necessário subir na hierarquia (para a cadeia de retransmissão) e, em seguida, descer para a rede B para, uma vez lá, referenciar o endereço do contrato inteligente. A multilocação é, portanto, definida com um valor de `pais` definido como `1`, que sobe, e duas junções, uma que define qual rede deve receber a mensagem e a outra que define o endereço H160 do contrato inteligente que será chamado

![Exemplo de Multilocalização de Contrato Inteligente](/images/learn/framework/xcm/xcm-3.webp)

- **Rede A referencia uma conta na cadeia de retransmissão** - do ponto de vista da rede A, para referenciar uma conta na cadeia de retransmissão, é necessário subir e, em seguida, referenciar a conta. A multilocação é definida com um valor de `pais` definido como `1`, que sobe para a cadeia de retransmissão, e uma junção que referencia o endereço de destino do tipo substrato

![Exemplo de Multilocalização de Conta](/images/learn/framework/xcm/xcm-4.webp)
