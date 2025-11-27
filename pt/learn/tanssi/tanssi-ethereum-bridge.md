---
title: Tanssi-Ethereum Bridge
description: Discover how Tanssi bridge enables secure, trustless cross-chain interoperability, facilitating asset and message transfers between Tanssi and Ethereum.
icon: octicons-link-24
categories: Basics
---

````json
{
  "source_path": "learn/tanssi/tanssi-ethereum-bridge.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "54d0cce3bbcde3302cec6aaae37661af9b11633a28353fe70008f450f2a62518",
  "content": "--- \ntitle: Tanssi-Ethereum Bridge\ndescription: Discover how Tanssi bridge enables secure, trustless cross-chain interoperability, facilitating asset and message transfers between Tanssi and Ethereum.\nicon: octicons-link-24\ncategories: Basics\n---\n\n# Tanssi-Ethereum Bridge {: #tanssi-ethereum-bridge }\n\n## Introduction {: #introduction }\n\nTraditional blockchains often create silos, limiting asset and functional interoperability. The Tanssi-Ethereum bridge overcomes these limitations by enabling seamless cross-chain operations that benefit both ecosystems.\n\nThe bridge is more than an asset exchange. It’s a secure, standardized protocol for direct cross-chain interaction without centralized intermediaries. Its trustless design avoids the risks of central points of failure that many other bridges face.\n\nThis article introduces the Tanssi-Ethereum bridge as a key interoperability layer between the two networks. You’ll learn how it works, including its architecture, operator management, economic model, slashing mechanisms, and asset transfers.\n\nYou'll also learn about the consensus layers that secure communication ([BEEFY](https://docs.snowbridge.network/architecture/components#beefyclient){target=\\_blank} on [Tanssi](https://docs.tanssi.network/learn/tanssi/){target=\\_blank} and the [Ethereum Beacon Chain](https://ethereum.org/roadmap/beacon-chain/){target=\\_blank}), and the roles of provers, verifiers, and relayers, giving you a clear view of how assets and messages move securely between Tanssi and Ethereum.\n\n## Core Functions { : #core-functions }\n\nThe bridge facilitates several critical operations between Tanssi and Ethereum:\n\n- **Operator Management** - maintains operator stake information on Ethereum via the [Symbiotic](/learn/tanssi/external-security-providers/symbiotic/#tanssi-symbiotic){target=\\_blank} protocol, providing this data to Tanssi for selecting active, decentralized, and economically aligned operators each era\n- **Economic Operations** - distributes [rewards](/learn/tanssi/external-security-providers/symbiotic/#rewards){target=\\_blank} from Tanssi to Ethereum stakers and operators\n- **Slashing** - processes [slashing requests](/learn/tanssi/external-security-providers/symbiotic/#slashing){target=\\_blank} from Tanssi to Ethereum when operators violate protocol rules\n- **Asset Transfer** - enables bilateral, trustless asset transfers between Tanssi and Ethereum, enhancing liquidity.\n\nThis interoperability expands the potential of decentralized applications and significantly enhances the liquidity and usability of blockchain assets.\n\n## The Bridge Architecture { : #bridge-architecture }\n\nUnderstanding the bridge's consensus functionality requires examining its core components: provers, verifiers, and relayers. Provers generate cryptographic proofs, verifiers validate them, and relayers move data between chains.\n\nProvers include Tanssi's [BEEFY](https://docs.snowbridge.network/architecture/components#beefyclient){target=\\_blank} module and Ethereum's Beacon Chain consensus. They produce consensus data transmitted by specialized relayers.\n\nEach chain runs a [light client](https://ethereum.org/developers/docs/nodes-and-clients/light-clients/){target=\\_blank} of the other, acting as an on-chain verifier for data legitimacy. For instance, when Tanssi sends a message to Ethereum, it generates compact proofs of events or state changes based on its consensus. Ethereum's light client verifies these proofs before acting. This efficient method avoids processing the entire sending chain's state, relying instead on concise cryptographic proof verification.\n\n### Tanssi to Ethereum Consensus  { : #tanssi-ethereum-consensus }\n\nBEEFY (Bridge Efficiency Enabling Finality Yielder) is Tanssi's consensus protocol, which acts as a prover. It's designed for efficient, trustless bridging to chains like Ethereum that are not natively built for interoperability.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Tanssi_Pallet as Tanssi <br/> BEEFY Pallet (prover)\n    participant Beefy_Relayer as Relayer <br/> (Beefy)\n    participant Eth_BeefyClient as Ethereum <br/> BEEFY Client (verifier)\n\n    Tanssi_Pallet->>Beefy_Relayer: Generate BEEFY Commitment\n    activate Beefy_Relayer\n    Beefy_Relayer->>Eth_BeefyClient: Submit commitment/proof\n    deactivate Beefy_Relayer\n\n    activate Eth_BeefyClient\n    Eth_BeefyClient->>Eth_BeefyClient: Verify commitment\n    deactivate Eth_BeefyClient\n\n```\n\n### Ethereum to Tanssi Consensus { : #ethereum-tanssi-consensus }\n\nFor Ethereum-to-Tanssi bridging, Ethereum's Beacon Chain consensus is the prover. It provides Tanssi's on-chain light client with proof of Ethereum's finalized state, including events or messages for Tanssi.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Eth_BeaconCons as Ethereum <br/> Beacon Chain Consensus(Prover)\n    participant Beacon_Relayer as Relayer <br/> (Beacon)\n    participant Tanssi_EthClient as Tanssi <br/> Ethereum Light Client (verifier)\n\n    Eth_BeaconCons->>Beacon_Relayer: Beacon chain update (Header/Proof)\n    activate Beacon_Relayer\n    Beacon_Relayer->>Tanssi_EthClient: Submit update/proof\n    deactivate Beacon_Relayer\n\n    activate Tanssi_EthClient\n    Tanssi_EthClient->>Tanssi_EthClient: Verify update/proof\n    deactivate Tanssi_EthClient\n```\n\nFrom a messaging perspective, the bridge uses its consensus verification layer for secure cross-chain communication. Dedicated relayers transport messages: the Execution Relay for Ethereum to Tanssi, and the Tanssi Relay for Tanssi to Ethereum.\n\nRelayers are stateless and only submit proofs. They cannot forge messages or steal funds, as the consensus mechanism revalidates each proof on-chain. Multiple concurrent relayers improve responsiveness without centralizing power.\n\nEthereum's `Gateway` contract is the central messaging point. It receives messages from Tanssi via relayers, validates them using consensus proofs, and executes operations like token minting/unlocking or smart contract calls.\n\n### Ethereum to Tanssi Inbound Messages { : #ethereum-tanssi-messages }\n\nThis section describes messages from Ethereum to Tanssi, using Ethereum's Beacon Chain consensus for proofs and an Execution Relay (or Beacon Relay).\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Eth_Gateway as Ethereum <br/> Gateway Contract\n    participant Exec_Relay as Relayer <br/> (Execution Relay)\n    participant Tanssi_InQueue as Tanssi <br/> Inbound Queue\n\n    Note over Eth_Gateway: Message Ready / Event Occurs\n    Eth_Gateway->>Exec_Relay: Message + Proof\n    activate Exec_Relay\n    Exec_Relay->>Tanssi_InQueue: Submit Message/Proof\n    deactivate Exec_Relay\n\n    activate Tanssi_InQueue\n    Tanssi_InQueue->>Tanssi_InQueue: Process Inbound Message\n    deactivate Tanssi_InQueue\n```\n\n### Tanssi to Ethereum Outbound Messages { : #tanssi-ethereum-messages }\n\nThis section describes messages from Tanssi to Ethereum, using BEEFY consensus to prove Tanssi's state and a Tanssi Relay for transmission.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Tanssi_OutQueue as Tanssi <br/> Outbound Queue\n    participant Para_Relay as Relayer <br/> (Tanssi Relay)\n    participant Eth_Gateway as Ethereum <br/> Gateway Contract\n\n    Note over Tanssi_OutQueue: Message Ready / Proof Committed\n    Tanssi_OutQueue->>Para_Relay: Message + Proof\n    activate Para_Relay\n    Para_Relay->>Eth_Gateway: Submit Message/Proof\n    deactivate Para_Relay\n\n    activate Eth_Gateway\n    Eth_Gateway->>Eth_Gateway: Process Outbound Message\n    deactivate Eth_Gateway\n```\n\nThe `Gateway` manages Ethereum's outbound communications. For cross-chain transfers, it logs an event, locks tokens if necessary, and packages data for relay to Tanssi. Tanssi uses two queues for efficient message processing.\n\nThe `Outbound Queue` handles messages to Ethereum. It bundles them and adds a [Merkle root](https://en.wikipedia.org/wiki/Merkle_tree){target=\\_blank} (cryptographic commitment) to each block header. This allows Ethereum's light client to verify message inclusion using consensus proofs efficiently.\n\nThe `Inbound Queue` processes messages from Ethereum. It receives and verifies proofs of Ethereum events via Tanssi's on-chain Ethereum light client. Verified events become internal instructions in Tanssi. This layered, consensus-secured architecture ensures trustless cross-chain interactions.\n\n## Token Transfers Flow {: #token-transfers-flow }\n\nThis section explains how the bridge moves assets and messages. It involves locking/minting assets on one chain and a complementary action on the other, secured by verified proofs. The following describes the typical transfer sequences.\n\n1. **Initiation (Source Chain)** - user initiates asset transfer\n2. **Relay Proof** - off-chain relayers pick up the event and submit cryptographic proofs to the destination chain\n3. **Verification (Destination Chain)** - on-chain light clients independently verify submitted proofs\n4. **Execution** - upon successful verification, tokens are minted/unlocked on the destination chain\n\n### Ethereum to Tanssi Transfer\n\nThis section outlines asset movement from Ethereum to Tanssi (as derivative assets).\n\n1. **Lock on Ethereum** - a user deposits assets into Ethereum's Bridge contract. The contract locks the tokens and emits a deposit event\n2. **Relay Proof to Tanssi** - an off-chain relayer detects the finalized event, creates a proof package (including Ethereum block header and Merkle proof of the deposit), and submits it to the Tanssi Bridge's `Inbound Queue`\n3. **Verify on Tanssi** - Tanssi Bridge's `EthereumClient` module (an on-chain light client) receives the proof from the `Inbound Queue`. It verifies the Ethereum block header's finality/validity and the Merkle proof's authenticity\n4. **Mint on Tanssi** - upon successful verification by the `EthereumClient`, the `Inbound Queue` is notified and mints the corresponding asset on Tanssi\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant User\n    participant EBridge as Ethereum Bridge Contract\n    participant Relayer\n    participant TBP as Tanssi Bridge<br/> (Inbound Queue + ETH Client)\n    participant TAH as Tanssi\n\n    User->>EBridge: 1. Deposit Asset\n    activate EBridge\n    Note over EBridge: Lock Tokens & Emit Event\n    deactivate EBridge\n\n    Relayer->>Relayer: Observe Ethereum Event\n    Relayer->>TBP: 2. Submit Header + Merkle Proof\n    activate TBP\n    Note over TBP: Receive Proof (Inbound Queue)\n    TBP->>TBP: 3. Verify Proof (EthereumClient Pallet)\n    TBP->>TAH: Send Mint Request\n    deactivate TBP\n\n    activate TAH\n    TAH->>TAH:  4. Mint Asset\n    TAH-->>User: (Asset appears in Recipient Account)\n    deactivate TAH\n```\n\n### Tanssi to Ethereum Transfer\n\nThis flow describes the reverse process, moving assets from Tanssi to Ethereum.\n\n1. **Initiate and Commit on Tanssi** - user initiates a transfer on Tanssi. A message with transfer details goes to the Bridge's `Outbound Queue`. The queue processes it, bundles the payload, and commits its Merkle root to the Tanssi block header, representing all outgoing messages in that block\n2. **Relay Proof to Ethereum** - an off-chain relayer monitors Tanssi for finalized blocks with `Outbound Queue` Merkle roots. It retrieves proofs: a BEEFY commitment (signed statement of finalized Tanssi block headers) and a Merkle proof of the user's transfer payload under the committed root\n3. **Submit Commitment in Ethereum** - the relayer submits the BEEFY commitment and Merkle proof to Ethereum's `Gateway` contract\n4. **Verify on Ethereum** - Ethereum's Beefy Client contract (Tanssi's on-chain light client) receives the BEEFY commitment from the `Gateway` and verifies its validity (including signatures)\n5. **Validate Payload** - after commitment verification, the `Gateway` validates the Merkle proof for the user's payload\n6. **Execute on Ethereum** - with both proofs verified, the `Gateway` contract executes the action, usually releasing locked assets via the main Bridge contract to the recipient or executing a target contract call on Ethereum\n\nThe following diagram illustrates the initiation and commitment phase of the asset transfer process on the Tanssi side.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant User\n    participant TAH as Tanssi\n    participant TBP as Tanssi Bridge<br/> (Outbound Queue)\n    participant Relayer\n\n    User->>TAH: 1. Initiate Transfer & Deposit Asset\n    activate TAH\n    TAH->>TBP: Send message to Outbound Queue\n    deactivate TAH\n\n    activate TBP\n    Note over TBP: Process message, Bundle, and<br/>Commit Merkle Root to Tanssi Header\n    deactivate TBP\n\n    Relayer->>Relayer: 2. Observe Tanssi Header /<br/>BEEFY Commitment & Get Proof\n    Note over Relayer: Relayer is now ready to interact<br/>with Ethereum based on observed data.\n```\n\nThe subsequent diagram details the relay, verification, and execution steps on the Ethereum side of the asset transfer.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Relayer\n    participant EGateway as Ethereum Gateway Contract\n    participant EBeefy as Ethereum Beefy Client Contract\n    participant EBridge as Ethereum Bridge Contract\n    participant User\n\n    Relayer->>EGateway: 3. Submit BEEFY Commitment + Merkle Proof\n    activate EGateway\n    EGateway->>EBeefy: 4. Verify BEEFY Commitment\n    activate EBeefy\n    EBeefy-->>EGateway: Verification OK\n    deactivate EBeefy\n\n    EGateway->>EGateway: 5. Verify Merkle Proof for Payload\n    Note over EGateway: Proof Validated\n\n    EGateway->>EBridge: 6. Execute: Unlock Tokens / Call Target Contract\n    activate EBridge\n    Note over EBridge: Assets Transferred or<br/>Target Call Executed\n    EBridge-->>User: (Tokens Received / Call Executed)\n    deactivate EBridge\n    deactivate EGateway\n```",
  "translated_content": "--- \ntitle: Ponte Tanssi-Ethereum\ndelscription: Descubra como a ponte Tanssi permite a interoperabilidade segura e sem confiança entre cadeias, facilitando transferências de ativos e mensagens entre Tanssi e Ethereum.\nicon: octicons-link-24\ncategories: Basics\n---\n\n# Ponte Tanssi-Ethereum {: #tanssi-ethereum-bridge }\n\n## Introdução {: #introduction }\n\nBlockchains tradicionais frequentemente criam silos, limitando a interoperabilidade de ativos e funcional. A ponte Tanssi-Ethereum supera essas limitações, permitindo operações perfeitas entre cadeias que beneficiam ambos os ecossistemas.\n\nA ponte é mais do que uma troca de ativos. É um protocolo seguro e padronizado para interação direta entre cadeias sem intermediários centralizados. Seu design sem confiança evita os riscos de pontos centrais de falha que muitas outras pontes enfrentam.\n\nEste artigo apresenta a ponte Tanssi-Ethereum como uma camada chave de interoperabilidade entre as duas redes. Você aprenderá como ela funciona, incluindo sua arquitetura, gerenciamento de operadores, modelo econômico, mecanismos de corte e transferências de ativos.\n\nVocê também aprenderá sobre as camadas de consenso que protegem a comunicação ([BEEFY](https://docs.snowbridge.network/architecture/components#beefyclient){target=\\_blank} em [Tanssi](https://docs.tanssi.network/learn/tanssi/){target=\\_blank} e a [Ethereum Beacon Chain](https://ethereum.org/roadmap/beacon-chain/){target=\\_blank}), e os papéis de provadores, verificadores e retransmissores, dando a você uma visão clara de como os ativos e as mensagens se movem com segurança entre Tanssi e Ethereum.\n\n## Funções Principais { : #core-functions }\n\nA ponte facilita várias operações críticas entre Tanssi e Ethereum:\n\n- **Gerenciamento de Operadores** - mantém informações de participação de operadores no Ethereum por meio do protocolo [Symbiotic](/learn/tanssi/external-security-providers/symbiotic/#tanssi-symbiotic){target=\\_blank}, fornecendo esses dados ao Tanssi para selecionar operadores ativos, descentralizados e economicamente alinhados a cada era\n- **Operações Econômicas** - distribui [recompensas](/learn/tanssi/external-security-providers/symbiotic/#rewards){target=\\_blank} do Tanssi para os stakers e operadores do Ethereum\n- **Corte** - processa [pedidos de corte](/learn/tanssi/external-security-providers/symbiotic/#slashing){target=\\_blank} do Tanssi para o Ethereum quando os operadores violam as regras do protocolo\n- **Transferência de Ativos** - permite transferências de ativos bilaterais e sem confiança entre Tanssi e Ethereum, aprimorando a liquidez.\n\nEssa interoperabilidade expande o potencial de aplicações descentralizadas e aprimora significativamente a liquidez e a usabilidade dos ativos de blockchain.\n\n## A Arquitetura da Ponte { : #bridge-architecture }\n\nA compreensão da funcionalidade de consenso da ponte exige o exame de seus componentes principais: provadores, verificadores e retransmissores. Os provadores geram provas criptográficas, os verificadores as validam e os retransmissores movem dados entre as cadeias.\n\nOs provadores incluem o módulo [BEEFY](https://docs.snowbridge.network/architecture/components#beefyclient){target=\\_blank} do Tanssi e o consenso da Ethereum Beacon Chain. Eles produzem dados de consenso transmitidos por retransmissores especializados.\n\nCada cadeia executa um [cliente leve](https://ethereum.org/developers/docs/nodes-and-clients/light-clients/){target=\\_blank} da outra, atuando como um verificador on-chain para a legitimidade dos dados. Por exemplo, quando o Tanssi envia uma mensagem para o Ethereum, ele gera provas compactas de eventos ou alterações de estado com base em seu consenso. O cliente leve do Ethereum verifica essas provas antes de agir. Esse método eficiente evita o processamento de todo o estado da cadeia de envio, confiando, em vez disso, na verificação concisa da prova criptográfica.\n\n### Consenso do Tanssi para Ethereum  { : #tanssi-ethereum-consensus }\n\nBEEFY (Bridge Efficiency Enabling Finality Yielder) é o protocolo de consenso do Tanssi, que atua como um provador. Ele foi projetado para uma ponte eficiente e sem confiança para cadeias como o Ethereum que não foram construídas nativamente para interoperabilidade.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Tanssi_Pallet as Tanssi <br/> BEEFY Pallet (prover)\n    participant Beefy_Relayer as Relayer <br/> (Beefy)\n    participant Eth_BeefyClient as Ethereum <br/> BEEFY Client (verifier)\n\n    Tanssi_Pallet->>Beefy_Relayer: Generate BEEFY Commitment\n    activate Beefy_Relayer\n    Beefy_Relayer->>Eth_BeefyClient: Submit commitment/proof\n    deactivate Beefy_Relayer\n\n    activate Eth_BeefyClient\n    Eth_BeefyClient->>Eth_BeefyClient: Verify commitment\n    deactivate Eth_BeefyClient\n\n```\n\n### Consenso do Ethereum para Tanssi { : #ethereum-tanssi-consensus }\n\nPara a ponte Ethereum-para-Tanssi, o consenso da Ethereum Beacon Chain é o provador. Ele fornece ao cliente leve on-chain do Tanssi a prova do estado finalizado do Ethereum, incluindo eventos ou mensagens para o Tanssi.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Eth_BeaconCons as Ethereum <br/> Beacon Chain Consensus(Prover)\n    participant Beacon_Relayer as Relayer <br/> (Beacon)\n    participant Tanssi_EthClient as Tanssi <br/> Ethereum Light Client (verifier)\n\n    Eth_BeaconCons->>Beacon_Relayer: Beacon chain update (Header/Proof)\n    activate Beacon_Relayer\n    Beacon_Relayer->>Tanssi_EthClient: Submit update/proof\n    deactivate Beacon_Relayer\n\n    activate Tanssi_EthClient\n    Tanssi_EthClient->>Tanssi_EthClient: Verify update/proof\n    deactivate Tanssi_EthClient\n```\n\nDo ponto de vista da mensagem, a ponte usa sua camada de verificação de consenso para comunicação segura entre cadeias. Relayers dedicados transportam mensagens: o Execution Relay para Ethereum para Tanssi e o Tanssi Relay para Tanssi para Ethereum.\n\nOs retransmissores são sem estado e enviam apenas provas. Eles não podem falsificar mensagens ou roubar fundos, pois o mecanismo de consenso revalida cada prova on-chain. Vários retransmissores concorrentes melhoram a capacidade de resposta sem centralizar o poder.\n\nO contrato `Gateway` do Ethereum é o ponto central de mensagens. Ele recebe mensagens do Tanssi via retransmissores, as valida usando provas de consenso e executa operações como cunhagem/desbloqueio de tokens ou chamadas de contrato inteligente.\n\n### Mensagens de Entrada do Ethereum para Tanssi { : #ethereum-tanssi-messages }\n\nEsta seção descreve mensagens do Ethereum para Tanssi, usando o consenso da Ethereum Beacon Chain para provas e um Execution Relay (ou Beacon Relay).\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Eth_Gateway as Ethereum <br/> Gateway Contract\n    participant Exec_Relay as Relayer <br/> (Execution Relay)\n    participant Tanssi_InQueue as Tanssi <br/> Inbound Queue\n\n    Note over Eth_Gateway: Message Ready / Event Occurs\n    Eth_Gateway->>Exec_Relay: Message + Proof\n    activate Exec_Relay\n    Exec_Relay->>Tanssi_InQueue: Submit Message/Proof\n    deactivate Exec_Relay\n\n    activate Tanssi_InQueue\n    Tanssi_InQueue->>Tanssi_InQueue: Process Inbound Message\n    deactivate Tanssi_InQueue\n```\n\n### Mensagens de Saída do Tanssi para Ethereum { : #tanssi-ethereum-messages }\n\nEsta seção descreve mensagens do Tanssi para Ethereum, usando o consenso BEEFY para provar o estado do Tanssi e um Tanssi Relay para transmissão.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Tanssi_OutQueue as Tanssi <br/> Outbound Queue\n    participant Para_Relay as Relayer <br/> (Tanssi Relay)\n    participant Eth_Gateway as Ethereum <br/> Gateway Contract\n\n    Note over Tanssi_OutQueue: Message Ready / Proof Committed\n    Tanssi_OutQueue->>Para_Relay: Message + Proof\n    activate Para_Relay\n    Para_Relay->>Eth_Gateway: Submit Message/Proof\n    deactivate Para_Relay\n\n    activate Eth_Gateway\n    Eth_Gateway->>Eth_Gateway: Process Outbound Message\n    deactivate Eth_Gateway\n```\n\nO `Gateway` gerencia as comunicações de saída do Ethereum. Para transferências entre cadeias, ele registra um evento, bloqueia tokens, se necessário, e empacota dados para retransmissão para o Tanssi. O Tanssi usa duas filas para processamento eficiente de mensagens.\n\nA `Outbound Queue` lida com mensagens para o Ethereum. Ele as agrupa e adiciona um [Merkle root](https://en.wikipedia.org/wiki/Merkle_tree){target=\\_blank} (compromisso criptográfico) a cada cabeçalho de bloco. Isso permite que o cliente leve do Ethereum verifique a inclusão da mensagem usando provas de consenso de forma eficiente.\n\nA `Inbound Queue` processa mensagens do Ethereum. Ele recebe e verifica provas de eventos do Ethereum via cliente leve Ethereum on-chain do Tanssi. Os eventos verificados se tornam instruções internas no Tanssi. Essa arquitetura em camadas, protegida por consenso, garante interações sem confiança entre cadeias.\n\n## Fluxo de Transferências de Tokens {: #token-transfers-flow }\n\nEsta seção explica como a ponte move ativos e mensagens. Ela envolve o bloqueio/cunhagem de ativos em uma cadeia e uma ação complementar na outra, protegida por provas verificadas. O seguinte descreve as sequências típicas de transferência.\n\n1. **Iniciação (Cadeia de Origem)** - usuário inicia a transferência de ativos\n2. **Relay Proof** - retransmissores off-chain pegam o evento e enviam provas criptográficas para a cadeia de destino\n3. **Verificação (Cadeia de Destino)** - clientes leves on-chain verificam, de forma independente, as provas enviadas\n4. **Execução** - após a verificação bem-sucedida, os tokens são cunhados/desbloqueados na cadeia de destino\n\n### Transferência do Ethereum para Tanssi\n\nEsta seção descreve o movimento de ativos do Ethereum para Tanssi (como ativos derivativos).\n\n1. **Bloqueio no Ethereum** - um usuário deposita ativos no contrato de Bridge do Ethereum. O contrato bloqueia os tokens e emite um evento de depósito\n2. **Relay Proof para Tanssi** - um retransmissor off-chain detecta o evento finalizado, cria um pacote de prova (incluindo o cabeçalho do bloco do Ethereum e a prova de Merkle do depósito) e o envia para a `Inbound Queue` da Tanssi Bridge\n3. **Verificar no Tanssi** - O módulo `EthereumClient` da Tanssi Bridge (um cliente leve on-chain) recebe a prova da `Inbound Queue`. Ele verifica a finalidade/validade do cabeçalho do bloco do Ethereum e a autenticidade da prova de Merkle\n4. **Cunhagem no Tanssi** - após a verificação bem-sucedida pelo `EthereumClient`, a `Inbound Queue` é notificada e cunha o ativo correspondente no Tanssi\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant User\n    participant EBridge as Ethereum Bridge Contract\n    participant Relayer\n    participant TBP as Tanssi Bridge<br/> (Inbound Queue + ETH Client)\n    participant TAH as Tanssi\n\n    User->>EBridge: 1. Deposit Asset\n    activate EBridge\n    Note over EBridge: Lock Tokens & Emit Event\n    deactivate EBridge\n\n    Relayer->>Relayer: Observe Ethereum Event\n    Relayer->>TBP: 2. Submit Header + Merkle Proof\n    activate TBP\n    Note over TBP: Receive Proof (Inbound Queue)\n    TBP->>TBP: 3. Verify Proof (EthereumClient Pallet)\n    TBP->>TAH: Send Mint Request\n    deactivate TBP\n\n    activate TAH\n    TAH->>TAH:  4. Mint Asset\n    TAH-->>User: (Asset appears in Recipient Account)\n    deactivate TAH\n```\n\n### Transferência do Tanssi para Ethereum\n\nEste fluxo descreve o processo inverso, movendo ativos do Tanssi para o Ethereum.\n\n1. **Iniciar e Confirmar no Tanssi** - o usuário inicia uma transferência no Tanssi. Uma mensagem com detalhes da transferência vai para a `Outbound Queue` da Bridge. A fila a processa, agrupa a carga útil e confirma sua raiz Merkle para o cabeçalho do bloco Tanssi, representando todas as mensagens de saída naquele bloco\n2. **Relay Proof para Ethereum** - um relayer off-chain monitora o Tanssi em busca de blocos finalizados com raízes Merkle da `Outbound Queue`. Ele recupera provas: um compromisso BEEFY (declaração assinada dos cabeçalhos de blocos Tanssi finalizados) e uma prova de Merkle da carga útil de transferência do usuário sob a raiz confirmada\n3. **Enviar Compromisso no Ethereum** - o retransmissor envia o compromisso BEEFY e a prova de Merkle para o contrato `Gateway` do Ethereum\n4. **Verificar no Ethereum** - o contrato Beefy Client do Ethereum (cliente leve on-chain do Tanssi) recebe o compromisso BEEFY do `Gateway` e verifica sua validade (incluindo assinaturas)\n5. **Validar Carga Útil** - após a verificação do compromisso, o `Gateway` valida a prova de Merkle para a carga útil do usuário\n6. **Executar no Ethereum** - com ambas as provas verificadas, o contrato `Gateway` executa a ação, geralmente liberando ativos bloqueados via contrato Bridge principal para o destinatário ou executando uma chamada de contrato de destino no Ethereum\n\nO diagrama a seguir ilustra a fase de iniciação e compromisso do processo de transferência de ativos no lado do Tanssi.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant User\n    participant TAH as Tanssi\n    participant TBP as Tanssi Bridge<br/> (Outbound Queue)\n    participant Relayer\n\n    User->>TAH: 1. Initiate Transfer & Deposit Asset\n    activate TAH\n    TAH->>TBP: Send message to Outbound Queue\n    deactivate TAH\n\n    activate TBP\n    Note over TBP: Process message, Bundle, and<br/>Commit Merkle Root to Tanssi Header\n    deactivate TBP\n\n    Relayer->>Relayer: 2. Observe Tanssi Header /<br/>BEEFY Commitment & Get Proof\n    Note over Relayer: Relayer is now ready to interact<br/>with Ethereum based on observed data.\n```\n\nO diagrama subsequente detalha as etapas de retransmissão, verificação e execução no lado do Ethereum da transferência de ativos.\n\n```mermaid\nsequenceDiagram\n    %%{init: {'sequence': {'mirrorActors': false}}}%%\n    participant Relayer\n    participant EGateway as Ethereum Gateway Contract\n    participant EBeefy as Ethereum Beefy Client Contract\n    participant EBridge as Ethereum Bridge Contract\n    participant User\n\n    Relayer->>EGateway: 3. Submit BEEFY Commitment + Merkle Proof\n    activate EGateway\n    EGateway->>EBeefy: 4. Verify BEEFY Commitment\n    activate EBeefy\n    EBeefy-->>EGateway: Verification OK\n    deactivate EBeefy\n\n    EGateway->>EGateway: 5. Verify Merkle Proof for Payload\n    Note over EGateway: Proof Validated\n\n    EGateway->>EBridge: 6. Execute: Unlock Tokens / Call Target Contract\n    activate EBridge\n    Note over EBridge: Assets Transferred or<br/>Target Call Executed\n    EBridge-->>User: (Tokens Received / Call Executed)\n    deactivate EBridge\n    deactivate EGateway\n```",
  "translated_content": "--- \ntitle: Ponte Tanssi-Ethereum\ndelscription: Descubra como a ponte Tanssi permite a interoperabilidade segura e sem confiança entre cadeias, facilitando transferências de ativos e mensagens entre Tanssi e Ethereum.\nicon: octicons-link-24\ncategories: Basics\n---\n\n# Ponte Tanssi-Ethereum {: #tanssi-ethereum-bridge }\n\n## Introdução {: #introduction }\n\nBlockchains tradicionais frequentemente criam silos, limitando a interoperabilidade de ativos e funcional. A ponte Tanssi-Ethereum supera essas limitações, permitindo operações perfeitas entre cadeias que beneficiam ambos os ecossistemas.\n\nA ponte é mais do que uma troca de ativos. É um protocolo seguro e padronizado para interação direta entre cadeias sem intermediários centralizados. Seu design sem confiança evita os riscos de pontos centrais de falha que muitas outras pontes enfrentam.\n\nEste artigo apresenta a ponte Tanssi-Ethereum como uma camada chave de interoperabilidade entre as duas redes. Você aprenderá como ela funciona, incluindo sua arquitetura, gerenciamento de operadores, modelo econômico, mecanismos de corte e transferências de ativos.\n\nVocê também aprenderá sobre as camadas de consenso que protegem a comunicação ([BEEFY](https://docs.snowbridge.network/architecture/components#beefyclient){target=\\_blank} em [Tanssi](https://docs.tanssi.network/learn/tanssi/){target=\\_blank} e a [Ethereum Beacon Chain](https://ethereum.org/roadmap/beacon-chain/){target=\\_blank}), e os papéis de provadores, verificadores e retransmissores, dando a você uma visão clara de como os ativos e as mensagens se movem com segurança entre Tanssi e Ethereum.\n\n## Funções Principais { : #core-functions }\n\nA ponte facilita várias operações críticas entre Tanssi e Ethereum:\n\n- **Gerenciamento de Operadores** - mantém informações de participação de operadores no Ethereum por meio do protocolo [Symbiotic](/learn/tanssi/external-security-providers/symbiotic/#tanssi-symbiotic){target=\\_blank}, fornecendo esses dados ao Tanssi para selecionar operadores ativos, descentralizados e economicamente alinhados a cada era\n- **Operações Econômicas** - distribui [recompensas](/learn/tanssi/external-security-providers/symbiotic/#rewards){target=\\_blank} do Tans



























```mermaid















sequenceDiagram

```

````

```mermaid

sequenceDiagram













```

sequenceDiagram

````








```mermaid

sequenceDiagram

sequenceDiagram












```

````

sequenceDiagram

````
```mermaid

sequenceDiagram


sequenceDiagram










```

````

sequenceDiagram

````



















```mermaid

sequenceDiagram



sequenceDiagram



















```

````

sequenceDiagram

````








```mermaid

sequenceDiagram




sequenceDiagram












```

````

```mermaid
sequenceDiagram
sequenceDiagram

```

```mermaid


















```

sequenceDiagram

```
