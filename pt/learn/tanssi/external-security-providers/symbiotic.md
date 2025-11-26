---
title: Ethereum with Symbiotic
description: Tanssi's design allows developers to choose and connect to the Symbiotic restaking protocol, benefiting from Ethereum-grade security right from the start.
icon: octicons-shield-check-24
categories: Basics
---

````json
{
  "source_path": "learn/tanssi/external-security-providers/symbiotic.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "166787c78c1a06c766a4120ca4b47a7dd9f8eb8b69cc23a9c62e26fda9bc56f2",
  "content": "--- \ntitle: Ethereum with Symbiotic\ndescription: Tanssi's design allows developers to choose and connect to the Symbiotic restaking protocol, benefiting from Ethereum-grade security right from the start.\nicon: octicons-shield-check-24\ncategories: Basics\n---\n\n# Ethereum with Symbiotic {: #ethereum-symbiotic }\n\n## Introduction {: #introduction }\n\nThe Tanssi protocol takes care of critical infrastructural components, making it easy for developers to launch their networks in a few minutes. In addition to block production, data retrievability, and integrations with essential tools such as wallets, RPC endpoints, block explorers, and others, another major task to tackle is providing security to the network.\n\nTanssi is designed to offer developers a shared security model, alleviating them from having to source enough economic security or negotiating with operators to run nodes opting-in for their networks. By deploying networks through Tanssi, and by choosing [Symbiotic](https://symbiotic.fi/){target=\\_blank} as a security provider, developers benefit from Ethereum-grade security, tapping into billions of dollars in shared security from staked ETH.\n\nThe following sections describe how the Symbiotic protocol works and how Tanssi networks can leverage it as their consensus mechanism.\n\n## Ethereum-Grade Security with Symbiotic {: #symbiotic }\n\n[Symbiotic](https://symbiotic.fi/){target=\\_blank} is a shared security protocol designed to be permissionless, multi-asset, and network-agnostic. It fosters capital efficiency by allowing users to extend the functionality of their staked assets to secure other networks while providing additional utility.\n\nThe protocol provides a coordination layer for its main components and participants, aligning incentives among parties while minimizing execution layer risks by deploying non-upgradeable core contracts on Ethereum. The following diagram resumes all the components and actors participating in the protocol:\n\n```mermaid\nflowchart TD\n    %% Vaults subgraph\n    subgraph Ethereum[\"Ethereum/Symbiotic\"]\n        slash[/Slashing Events/]\n        Restakers -- Deposit Assets --> Vaults\n        manager[\"Vault managers\"] -- Manage --> Vaults\n        Resolvers -- Decide On --> slash\n        slash -- Executes On --> Vaults\n    end\n\n    %% Operators subgraph\n    subgraph Operators\n        direction BT\n        operators[\"Operators (Validators)\"]\n        node_operators[\"Node Operators\"]\n        node_operators -- Run --> operators\n    end\n\n    %% Networks subgraph\n    subgraph Networks\n        direction BT\n        developers[\"Developers\"]\n        networks[\"Decentralized Networks\"]\n        developers -- Launch --> networks\n    end\n\n    Vaults <--> Tanssi\n    Tanssi <--> Operators\n    Tanssi <--> Networks\n```\n\nSymbiotic's flexible design allows every party to decide on setups that best fit their use cases. For example, vaults can choose what forms of collateral they accept, operators can determine which networks they want to provide services to, and decentralized networks can customize their use case and define the level of security (which collaterals are accepted, for example) they need.\n\nThe following sections describe the protocol's main components.\n\n### Vaults {: #vaults }\n\n[Vaults](https://docs.symbiotic.fi/modules/vault/introduction){target=\\_blank} are the Symbiotic protocol's economic backbone. They manage liquidity and deposits from restakers, connect operators and networks, and set up delegation strategies.\n\nEach vault is bound to a specific token that satisfies the [ERC20](https://github.com/ethereum/ercs/blob/master/ERCS/erc-20.md){target=\\_blank} interface and is accepted as collateral. Internally, the funds within the vault are represented as shares, which provide a mechanism for tracking ownership and distributing rewards. However, the reward token may differ from the collateral token.\n\nA vault comprises three key modules, each serving a distinct function: the slasher, the delegator, and the accounting module. The implementation of these modules can vary depending on the vault manager's decisions.\n\n- **Slasher module** - implements the [slashing](#slashing-process) logic, which penalizes bad actors\n- **Delegator module** - defines how funds are delegated across operators and networks. Several [strategies](https://docs.symbiotic.fi/modules/vault/delegator){target=\\_blank} are available, allowing the vault manager to select which operators and networks they want to work with\n- **Accounting module** - handles the vault's financial operations, including processing user deposits, managing withdrawal requests, tracking active balances and total supply, and implementing epoch-based accounting for withdrawals and slashing events. The accounting module's standard implementation is [ERC-4626](https://ethereum.org/developers/docs/standards/tokens/erc-4626/){target=\\_blank}, which provides a vault with a shares system included\n\nSince the operators get delegated stake from the vault and could potentially get slashed, they must be approved by the vault managers beforehand. On a similar note, vault managers analyze and authorize each network the vault will secure, considering, for example, the rewards the network offers.\n\nVault managers also designate [resolvers](https://docs.symbiotic.fi/modules/counterparties/resolvers){target=\\_blank}, responsible for approving or vetoing [slashing events](https://docs.symbiotic.fi/modules/vault/slasher){target=\\_blank} caused by operators on networks with [veto-slashing](https://docs.symbiotic.fi/modules/vault/slasher#veto-slashing){target=\\_blank} support, like the Tanssi Network.\n\n### Operators {: #operators }\n\n[Node operators](/node-operators/){target=\\_blank} are entities or individuals responsible for running the [nodes (also known as operators or validators)](https://docs.symbiotic.fi/modules/counterparties/operators){target=\\_blank}, which are the computational components validating the networks' transactions. They are responsible for the nodes' configuration, hardware setup, uptime, and performance.\n\nNode operators opt-in to provide services to networks, which must accept their request. Also, they opt-in to provide services in vaults, which must accept their request.\n\nOnce an operator has been accepted by a vault and a network connected to that vault, the node can start providing validation services to that network, receiving rewards in exchange.\n\n### Networks {: #networks }\n\n[Networks](https://docs.symbiotic.fi/modules/counterparties/networks){target=\\_blank} are the actively validated services or networks. These application-specific blockchains can be a use case from a wide range of industries, such as Gaming, Defi, RWAs, and others, and are the platforms that, through dApps, the end users interact with.\n\nSince operators opt-in to provide services to networks and the vault managers must accept the networks, the developers are responsible for defining, controlling, and adapting their methodology for onboarding, rewarding, and slashing operators.\n\n!!! note\n    Networks deployed through Tanssi don't need to work on the relation with vaults and operators since the Tanssi protocol deals with those complexities.\n\n## Tanssi with Symbiotic {: #tanssi-symbiotic }\n\nDevelopers launching networks through Tanssi benefit from [block production services](/learn/tanssi/network-services/block-production/){target=\\_blank}, data retrievability as a service, and the shared security model derived from every vault opting-in to support the Tanssi protocol. This eliminates the hurdle of dealing with infrastructural and security components developers would need to take on otherwise.\n\nVault managers running vaults can apply to offer the restaked collaterals as economic security for the Tanssi Network. Since Tanssi networks run in a sandbox-like environment, and the Tanssi protocol manages all the networks-related responsibilities, vault managers only need to analyze and opt-in to the Tanssi protocol, regardless of the quality and the quantity of networks that are running through the Tanssi protocol at any given moment.\n\nOperators opting-in to provide services to the Tanssi protocol (provided that they participate in a vault that supports the Tanssi protocol) have the benefit of running the same setup to provide block production and validation services to the Tanssi Network and, consequently, to every network deployed through Tanssi. This unique architecture facilitates all the tasks related to running and maintaining the operators since there are no changes in the setup when a new Tanssi network is launched or decommissioned.\n\n!!! note\n    The Tanssi protocol effectively abstracts the details of the active set of networks away from vault managers and operators. Networks particularities don't require any additional setup from operators nor pose risks to vault assets.\n\nAll things combined shape a functional and elegant ecosystem where developers can focus on creating and innovating. Tanssi handles the infrastructural components, guaranteeing liveness and performance, and Symbiotic provides the economic safeguards to ensure the validity of the operations.\n\n```mermaid\nflowchart LR\n    subgraph Symbiotic\n        direction LR\n        Operators\n        Vaults\n    end\n    Symbiotic  -- Validates/Secures --> tanssi[\"Tanssi Network\"]\n    tanssi -- Block Production Services--> Networks\n    tanssi -- Security--> Networks\n    tanssi -- Data Retrievability--> Networks\n\n    class Symbiotic custom-container\n```\n\n### Tanssi-Ethereum Communication {: #tanssi-ethereum-communication }\n\nIt is important to learn how Tanssi and Ethereum exchange data to understand the mechanics of the protocol. They connect through a two-way bridge that lets them communicate with each other. Each protocol has a specific job in making cross-chain operations possible.\n\nThere are three key components between Symbiotic and Tanssi:\n\n```mermaid\nflowchart LR\n\nTanssi[\"Tanssi\"] <--> Relayer \nRelayer <--> Gateway \nGateway[\"Gateway\"] <--> Middleware\nMiddleware <--> Symbiotic[\"Symbiotic\"]\n\nclass Tanssi tanssiNode;\n\nclass Middleware middlewareNode;\n\nclass Gateway gatewayNode;\n\nclass Symbiotic symbioticNode;\n\nclass Relayer relayerNode;\n```\n\n- **`Relayer`** - is the software that continuously monitors both blockchains and transmits messages. Enabling reliable bidirectional communication between Tanssi and Ethereum, serving as the connection layer that ensures messages are correctly delivered across networks\n\n- **`Gateway`** - operates on the Ethereum side of the bridge and serves three essential functions. It receives, verifies, and routes incoming messages from Tanssi to ensure they are correctly processed. The contract accepts outgoing messages destined for the Tanssi network, preparing them for relay. Finally, it handles higher-level application functionalities, most notably token transfers between the two networks, providing a secure interface for cross-chain asset movement\n\n- **`Middleware`** - is Tanssi's implementation for handling network events and operations. It is the critical link between the `Gateway` and Tanssi's core protocol\n\nThe `Middleware` plays a central role in network coordination between Tanssi and Symbiotic. It distributes rewards to operators and vaults based on their network security and performance contributions. The contract sorts operators by stake to create a merit-based ranking system for their selection and transmits the list of sorted operator keys to Tanssi for assignment. Additionally, it facilitates operator registration processes and handles the reward and slashing protocols that maintain network incentive alignment.\n\n#### From Ethereum to Tanssi {: #from-ethereum-tanssi }\n\nThe `Middleware` transmits operator set information to Tanssi for session assignment through the bridge. It sends details about active operators for each epoch, ordering them by their total stake aggregated across vaults. Tanssi then uses this information to assign operators for upcoming sessions, ensuring that the most economically aligned ones secure the network. This mechanism creates a stake-weighted operator selection process where economic security on Ethereum translates to operational security on Tanssi.\n\n#### From Tanssi to Ethereum {: #from-tanssi-ethereum }\n\nTanssi sends operational data back to Ethereum through the same communication channel. This message includes reward information that enables proper distribution to stakeholders based on network performance. The network also transmits slashing event data when operators fail to perform correctly or violate protocol rules, allowing the protocol to apply penalties. Tanssi can also request new tokens to be created on Ethereum and register tokens, making managing assets between both networks easy.\n\n### Rewards {: #rewards }\n\nWell-behaved operators and restakers are rewarded for their participation with TANSSI tokens. The reward process consists of two main phases: [Reward Distribution Phase](#reward-distribution-phase) and [Reward Claiming Phase](#reward-claiming-phase).\n\n#### Reward Distribution Phase {: #reward-distribution-phase }\n\nThe reward distribution phase calculates and allocates rewards through five key steps involving operators, restakers, and smart contracts. The steps are:\n\n1. **Reward Calculation** - Tanssi calculates rewards based on the activity of operators and stakers and then creates a [Merkle root](https://en.wikipedia.org/wiki/Merkle_tree){target=\\_blank}. This Merkle root is a cryptographic fingerprint that summarizes the reward allocations, indicating who receives what. Stakers are rewarded according to their stake in each vault\n2. **Reward Data Sent via XCM** - reward allocation data is sent using [XCM](https://wiki.polkadot.com/learn/learn-xcm/){target=\\_blank} (Cross-Consensus Messaging), a standardized protocol for blockchain communication. [Snowbridge](https://docs.snowbridge.network/){target=\\_blank} acts as a trustless bridge between Tanssi and Ethereum\n3. **Ethereum Message Reception** - once the message is relayed to the `Gateway` contract, this contract serves as Tanssi's authorized entry point on Ethereum for the Snowbridge bridge\n4. **Message Processing and Validation** - the `Gateway` forwards the data to the [`Middleware`](https://github.com/moondance-labs/tanssi-symbiotic/blob/main/src/contracts/middleware/Middleware.sol){target=\\_blank}, which is responsible for various tasks, including passing the information to the `OperatorReward` contract\n5. **Reward Storage and Distribution** - this is the final destination for the data. The [`OperatorRewards`](https://github.com/moondance-labs/tanssi-symbiotic/blob/main/src/contracts/rewarder/ODefaultOperatorRewards.sol){target=\\_blank} contract stores the Merkle tree of the reward allocations and handles the transfer of reward tokens when a claim is made\n\n```mermaid\n%%{init: {'sequence': {'mirrorActors': false}}}%%\nsequenceDiagram\n    participant Tanssi Network\n    participant Snowbridge (XCM)\n    participant Gateway\n    participant Middleware\n    participant OperatorRewards\n\n    Tanssi Network->>Tanssi Network: 1. Calculate rewards and generate Merkle root\n    Tanssi Network->>Snowbridge (XCM): 2. Reward data sent via XCM (Merkle root + data)\n    Snowbridge (XCM)->>Gateway: 3. Relay message and sent to Ethereum \n    Gateway ->>Middleware: 4. Message processing and validation\n    Middleware->>OperatorRewards: 5. Reward storage and distribution\n```\n\n#### Reward Claiming Phase {: #reward-claiming-phase }\n\nIn the reward-claiming phase, operators and stakers can claim rewards based on their participation in the network. Tanssi determines the share distribution for operators and stakers, currently setting it at 20% for operators and 80% for stakers.\n\n1. **Operator Reward Claim** - operators can claim their share by calling the `OperatorRewards` contract by using a cryptographic receipt that verifies their entitlement\n2. **Token Release** - the operator call triggers the token release, and the `OperatorRewards` sends the established amount to the operator\n3. **Token Distribution to Stakers** - the remaining rewards are forwarded to the `StakerRewards` contract for further claiming of the staker\n4. **Staker Allocation** - the remaining 80% of the rewards are automatically directed to the [`StakerRewards`](https://github.com/moondance-labs/tanssi-symbiotic/blob/main/src/contracts/rewarder/ODefaultStakerRewards.sol){target=\\_blank} contract, where stakers can claim rewards proportional to their stake in the vaults\n\n```mermaid\n%%{init: {'sequence': {'mirrorActors': false}}}%%\nsequenceDiagram\n participant Operator\n participant OperatorRewards\n participant StakerRewards\n participant Stakers\n\n Operator->>OperatorRewards: 1. Operator reward claim\n OperatorRewards->>Operator: 2. Release rewards to the operator\n OperatorRewards->>StakerRewards: 3. Forward the remainder to StakerRewards\n Stakers->>StakerRewards: 4. Stakers claim individual rewards\n```\n\n### Slashing {: #slashing }\n\nThe Tanssi protocol implements slashing to penalize operators for misbehavior. When a slashing event is triggered, the authorities designated as resolvers by the vault managers can either accept or revert this action.\n\nThe following actions can trigger slashing events:\n\n- Producing invalid blocks (e.g., blocks that include invalid transactions)\n- Invalid validation (e.g., double-signing or breaking protocol rules)\n- Downtime or unavailability\n- Consensus violations\n\n!!!note\n    Slashing events can only be triggered by operators' misbehavior within the Tanssi Network. Even if Tanssi networks are faulty or malicious, they operate in a sandboxed environment and cannot cause slashing.\n\n#### Slashing Process {: #slashing-process }\n\nThe slashing process follows a path similar to that of rewards. When an operator misbehaves, the Tanssi Network sends a slashing request message to the trustless bridge (Snowbridge). The message passes through the `Gateway` and into the `Middleware` where the slashing method gets called.\n\nThe slashing method receives a unique identifier for the operator's identity, the severity of the slash as a percentage of the operator's assigned stake in each vault, and the time context within which the offense occurred.\n\nThe slashing process consists of the following steps:\n\n1. **Slash Reported** - Tanssi sends the slash request to the `Middleware` with the parameters `operatorKey`, `percentage`, and `epoch`\n2. **Operator Validation** - the `Middleware` validates the operator's identity and checks if the operator is subject to slashing\n3. **Retrieve Active Vaults** - the `Middleware` iterates through all active vaults during the offense epoch, skipping any inactive vaults\n4. **Retrieve Operator Stake** - for each active vault, the `Middleware` retrieves the stake of the misbehaving operator\n5. **Calculate Slash Amount** - the `Middleware` calculates the slashing amount by applying the slashed percentage to the operator's stake in each vault\n6. **Slashing** - depending on the vault's slashing implementation, there are two possible routes\n\n    - **Instant Slashing** - if the vault uses instant slashing, the stake is immediately reduced\n\n    - **Veto Slashing** - if the vault uses veto slashing, the `Middleware` requests the slashing from a resolver. A time-limited veto window is created (e.g., 7 days)\n\n    The slashing is canceled if the resolver vetoes the request within the time window. Otherwise, the slashing penalty is executed if no veto occurs within the time window\n\nThis process ensures that each vault's slashing is handled independently, preventing cross-contamination, and offers both instant and time-delayed slashing with dispute resolution mechanisms.\n\n```mermaid\n%%{init: {'sequence': {'mirrorActors': false}}}%%\nsequenceDiagram\n    participant Network\n    participant Middleware\n    participant Vault\n    participant Slasher\n    \n    Network->>Middleware: 1. Slash reported\n    Middleware->>Middleware: 2. Operator validation\n    loop Each Active Vault\n        Middleware->>Vault: 3. Retrieve operator stake\n        Vault-->>Middleware: 4. Retrieve vault stake\n        Middleware->>Middleware: 5. Calculate slash amount\n        alt Instant Slasher\n            Middleware->>Slasher: 6.1 Slash\n        else Veto Slasher\n            Middleware->>Slasher: 6.2 Request slash\n            opt If Not Vetoed\n                Slasher->>Slasher: 6.2 Execute slash\n            end\n        end\n    end\n```\n\n#### Burner {: #burner }\n\nThe `Burner` contract is an extension responsible for handling actions that follow a [slashing event](#slashing-process), notably the burning of slashed collateral. Once a slash is executed, the `Slasher` contract calls the `Burner` to carry out these post-slashing tasks.\n\nWithin the protocol, the `Burner` contract plays a crucial role in deciding what happens after slashing. While there are different ways to implement the burning process, the recommended approach is to burn the slashed assets.\nWhen a slash is executed, the `Burner` contract's `onSlash` function is activated. This function kicks off the process of burning the slashed assets.\n\nThe vault manager chooses the specific implementation of the burning process during the vault's initialization phase, and once set, the vault manager cannot modify it. The exact design of the `Burner` contract may differ depending on the type of collateral asset involved. Below are some potential implementation options:\n\n- **Burning Tokens** - if the slashed collateral is a regular ERC-20 token, the `Burner` destroys those tokens, permanently removing them from circulation\n- **Unwrapping and Burning** - if the slashed tokens represent something like staked assets (e.g., liquid staking tokens) or liquidity provider (LP) tokens from a decentralized exchange (DEX), the `Burner` might convert them back into their original form before burning them\n- **Cross-Chain Operations** - if the tokens are tied to assets on another blockchain, the `Burner` could unwrap them on Ethereum and trigger the burn process on the original network\n- **Alternative Handling** - sometimes, burning isn't the best option. Instead, the `Burner` might redistribute the slashed assets to other operators, compensate affected users, or lock them in liquidity pools—whatever the system is designed to do\n\nBurning slashed collateral is important because it penalizes misbehaving operators and reduces the total supply of tokens, which can have deflationary effects.\n",
  "translated_content": "--- \ntitle: Ethereum com Symbiotic\ndescription: O design da Tanssi permite que os desenvolvedores escolham e se conectem ao protocolo de restaking Symbiotic, beneficiando-se da segurança de nível Ethereum desde o início.\nicon: octicons-shield-check-24\ncategories: Basics\n---\n\n# Ethereum com Symbiotic {: #ethereum-symbiotic }\n\n## Introdução {: #introduction }\n\nO protocolo Tanssi cuida de componentes de infraestrutura críticos, facilitando para os desenvolvedores o lançamento de suas redes em poucos minutos. Além da produção de blocos, recuperabilidade de dados e integrações com ferramentas essenciais, como carteiras, endpoints RPC, exploradores de blocos e outros, outra grande tarefa a ser abordada é fornecer segurança à rede.\n\nA Tanssi foi projetada para oferecer aos desenvolvedores um modelo de segurança compartilhado, aliviando-os de ter que obter segurança econômica suficiente ou negociar com operadores para executar nós que optem por suas redes. Ao implantar redes através da Tanssi e escolher [Symbiotic](https://symbiotic.fi/){target=\\_blank} como provedor de segurança, os desenvolvedores se beneficiam da segurança de nível Ethereum, aproveitando bilhões de dólares em segurança compartilhada de ETH apostado.\n\nAs próximas seções descrevem como o protocolo Symbiotic funciona e como as redes Tanssi podem alavancá-lo como seu mecanismo de consenso.\n\n## Segurança de Nível Ethereum com Symbiotic {: #symbiotic }\n\n[Symbiotic](https://symbiotic.fi/){target=\\_blank} é um protocolo de segurança compartilhado projetado para ser sem permissão, multi-ativo e independente da rede. Ele promove a eficiência de capital, permitindo que os usuários estendam a funcionalidade de seus ativos apostados para proteger outras redes, ao mesmo tempo em que fornece utilidade adicional.\n\nO protocolo fornece uma camada de coordenação para seus principais componentes e participantes, alinhando incentivos entre as partes, ao mesmo tempo em que minimiza os riscos da camada de execução, implantando contratos principais não atualizáveis no Ethereum. O diagrama a seguir resume todos os componentes e atores que participam do protocolo:\n\n```mermaid\nflowchart TD\n    %% Vaults subgraph\n    subgraph Ethereum[\"Ethereum/Symbiotic\"]\n        slash[/Eventos de Corte/]\n        Restakers -- Depositar Ativos --> Vaults\n        manager[\"Gerenciadores de Vault\"] -- Gerenciar --> Vaults\n        Resolvers -- Decidir Sobre --> slash\n        slash -- Executa Em --> Vaults\n    end\n\n    %% Operadores subgraph\n    subgraph Operators\n        direction BT\n        operators[\"Operadores (Validadores)\"]\n        node_operators[\"Operadores de Nós\"]\n        node_operators -- Executar --> operators\n    end\n\n    %% Networks subgraph\n    subgraph Networks\n        direction BT\n        developers[\"Desenvolvedores\"]\n        networks[\"Redes Descentralizadas\"]\n        developers -- Lançar --> networks\n    end\n\n    Vaults <--> Tanssi\n    Tanssi <--> Operators\n    Tanssi <--> Networks\n```\n\nO design flexível da Symbiotic permite que cada parte decida sobre configurações que melhor se adequam aos seus casos de uso. Por exemplo, os vaults podem escolher quais formas de garantia aceitam, os operadores podem determinar a quais redes desejam fornecer serviços e as redes descentralizadas podem personalizar seu caso de uso e definir o nível de segurança (quais garantias são aceitas, por exemplo) de que precisam.\n\nAs próximas seções descrevem os principais componentes do protocolo.\n\n### Vaults {: #vaults }\n\n[Vaults](https://docs.symbiotic.fi/modules/vault/introduction){target=\\_blank} são a espinha dorsal econômica do protocolo Symbiotic. Eles gerenciam liquidez e depósitos de restakers, conectam operadores e redes e configuram estratégias de delegação.\n\nCada vault está vinculado a um token específico que satisfaz a interface [ERC20](https://github.com/ethereum/ercs/blob/master/ERCS/erc-20.md){target=\\_blank} e é aceito como garantia. Internamente, os fundos dentro do vault são representados como ações, que fornecem um mecanismo para rastrear a propriedade e distribuir recompensas. No entanto, o token de recompensa pode ser diferente do token de garantia.\n\nA vault compreende três módulos principais, cada um servindo a uma função distinta: o cortador, o delegador e o módulo de contabilidade. A implementação desses módulos pode variar dependendo das decisões do gerente do vault.\n\n- **Módulo de corte** - implementa a lógica do [corte](#slashing-process), que penaliza os maus atores\n- **Módulo delegador** - define como os fundos são delegados entre operadores e redes. Várias [estratégias](https://docs.symbiotic.fi/modules/vault/delegator){target=\\_blank} estão disponíveis, permitindo que o gerente do vault selecione quais operadores e redes deseja trabalhar\n- **Módulo de contabilidade** - trata das operações financeiras do vault, incluindo o processamento de depósitos de usuários, o gerenciamento de solicitações de saque, o rastreamento de saldos ativos e oferta total e a implementação de contabilidade baseada em época para saques e eventos de corte. A implementação padrão do módulo de contabilidade é [ERC-4626](https://ethereum.org/developers/docs/standards/tokens/erc-4626/){target=\\_blank}, que fornece um vault com um sistema de ações incluído\n\nComo os operadores recebem participação delegada do vault e podem ser cortados, eles devem ser aprovados pelos gerentes do vault de antemão. De forma semelhante, os gerentes de vault analisam e autorizam cada rede que o vault protegerá, considerando, por exemplo, as recompensas que a rede oferece.\n\nOs gerentes de vault também designam [resoluções](https://docs.symbiotic.fi/modules/counterparties/resolvers){target=\\_blank}, responsáveis ​​por aprovar ou vetar [eventos de corte](https://docs.symbiotic.fi/modules/vault/slasher){target=\\_blank} causados ​​por operadores em redes com suporte [veto-slashing](https://docs.symbiotic.fi/modules/vault/slasher#veto-slashing){target=\\_blank}, como a Rede Tanssi.\n\n### Operadores {: #operators }\n\nOs [operadores de nós](/node-operators/){target=\\_blank} são entidades ou indivíduos responsáveis ​​por executar os [nós (também conhecidos como operadores ou validadores)](https://docs.symbiotic.fi/modules/counterparties/operators){target=\\_blank}, que são os componentes computacionais que validam as transações das redes. Eles são responsáveis ​​pela configuração dos nós, configuração de hardware, tempo de atividade e desempenho.\n\nOs operadores de nós optam por fornecer serviços às redes, que devem aceitar sua solicitação. Além disso, eles optam por fornecer serviços em vaults, que devem aceitar sua solicitação.\n\nDepois que um operador é aceito por um vault e uma rede conectada a esse vault, o nó pode começar a fornecer serviços de validação a essa rede, recebendo recompensas em troca.\n\n### Redes {: #networks }\n\n[Redes](https://docs.symbiotic.fi/modules/counterparties/networks){target=\\_blank} são os serviços ou redes validados ativamente. Esses blockchains específicos para aplicativos podem ser um caso de uso de uma ampla gama de setores, como jogos, DeFi, RWAs e outros, e são as plataformas que, por meio de dApps, os usuários finais interagem.\n\nComo os operadores optam por fornecer serviços às redes e os gerentes de vault devem aceitar as redes, os desenvolvedores são responsáveis ​​por definir, controlar e adaptar sua metodologia para integração, recompensa e corte de operadores.\n\n!!! note\n    As redes implantadas por meio da Tanssi não precisam trabalhar no relacionamento com vaults e operadores, pois o protocolo Tanssi lida com essas complexidades.\n\n## Tanssi com Symbiotic {: #tanssi-symbiotic }\n\nOs desenvolvedores que lançam redes por meio da Tanssi se beneficiam de [serviços de produção de blocos](/learn/tanssi/network-services/block-production/){target=\\_blank}, retrievabilidade de dados como serviço e o modelo de segurança compartilhado derivado de cada vault que opta por oferecer suporte ao protocolo Tanssi. Isso elimina o obstáculo de lidar com componentes de infraestrutura e segurança que os desenvolvedores precisariam assumir de outra forma.\n\nOs gerentes de vault que executam vaults podem se candidatar a oferecer as garantias restantes como segurança econômica para a Rede Tanssi. Como as redes Tanssi são executadas em um ambiente semelhante a um sandbox e o protocolo Tanssi gerencia todas as responsabilidades relacionadas às redes, os gerentes de vault só precisam analisar e aderir ao protocolo Tanssi, independentemente da qualidade e da quantidade de redes que estão sendo executadas por meio do protocolo Tanssi em um determinado momento.\n\nOs operadores que optam por fornecer serviços ao protocolo Tanssi (desde que participem de um vault que suporte o protocolo Tanssi) têm o benefício de executar a mesma configuração para fornecer produção de blocos e serviços de validação à Rede Tanssi e, consequentemente, a cada rede implantada por meio da Tanssi. Essa arquitetura exclusiva facilita todas as tarefas relacionadas à execução e manutenção dos operadores, pois não há alterações na configuração quando uma nova rede Tanssi é lançada ou desativada.\n\n!!! note\n    O protocolo Tanssi abstrai efetivamente os detalhes do conjunto ativo de redes dos gerentes de vault e operadores. As particularidades das redes não exigem nenhuma configuração adicional dos operadores nem representam riscos para os ativos do vault.\n\nTodas as coisas combinadas moldam um ecossistema funcional e elegante onde os desenvolvedores podem se concentrar na criação e inovação. A Tanssi lida com os componentes de infraestrutura, garantindo vivacidade e desempenho, e a Symbiotic fornece as salvaguardas econômicas para garantir a validade das operações.\n\n```mermaid\nflowchart LR\n    subgraph Symbiotic\n        direction LR\n        Operators\n        Vaults\n    end\n    Symbiotic  -- Valida/Protege --> tanssi[\"Rede Tanssi\"]\n    tanssi -- Serviços de Produção de Blocos--> Redes\n    tanssi -- Segurança--> Redes\n    tanssi -- Recuperabilidade de Dados--> Redes\n\n    class Symbiotic custom-container\n```\n\n### Comunicação Tanssi-Ethereum {: #tanssi-ethereum-communication }\n\nÉ importante aprender como a Tanssi e o Ethereum trocam dados para entender a mecânica do protocolo. Eles se conectam por meio de uma ponte de duas vias que permite que se comuniquem entre si. Cada protocolo tem um trabalho específico para tornar as operações cross-chain possíveis.\n\nExistem três componentes principais entre Symbiotic e Tanssi:\n\n```mermaid\nflowchart LR\n\nTanssi[\"Tanssi\"] <--> Relayer \nRelayer <--> Gateway \nGateway[\"Gateway\"] <--> Middleware\nMiddleware <--> Symbiotic[\"Symbiotic\"]\n\nclass Tanssi tanssiNode;\n\nclass Middleware middlewareNode;\n\nclass Gateway gatewayNode;\n\nclass Symbiotic symbioticNode;\n\nclass Relayer relayerNode;\n```\n\n- **`Relayer`** - é o software que monitora continuamente ambos os blockchains e transmite mensagens. Habilitando comunicação bidirecional confiável entre Tanssi e Ethereum, servindo como a camada de conexão que garante que as mensagens sejam entregues corretamente entre as redes\n\n- **`Gateway`** - opera no lado Ethereum da ponte e desempenha três funções essenciais. Ele recebe, verifica e roteia mensagens recebidas da Tanssi para garantir que sejam processadas corretamente. O contrato aceita mensagens de saída destinadas à rede Tanssi, preparando-as para retransmissão. Finalmente, ele lida com funcionalidades de aplicativos de nível superior, principalmente transferências de tokens entre as duas redes, fornecendo uma interface segura para o movimento de ativos entre cadeias\n\n- **`Middleware`** - é a implementação da Tanssi para lidar com eventos e operações de rede. É a ligação crítica entre o `Gateway` e o protocolo central da Tanssi\n\nO `Middleware` desempenha um papel central na coordenação da rede entre Tanssi e Symbiotic. Ele distribui recompensas para operadores e vaults com base em suas contribuições para a segurança e o desempenho da rede. O contrato classifica os operadores por participação para criar um sistema de classificação baseado em mérito para sua seleção e transmite a lista de chaves de operador classificadas para a Tanssi para atribuição. Além disso, facilita os processos de registro do operador e lida com os protocolos de recompensa e corte que mantêm o alinhamento de incentivos da rede.\n\n#### Do Ethereum para Tanssi {: #from-ethereum-tanssi }\n\nO `Middleware` transmite informações do conjunto de operadores para a Tanssi para atribuição de sessão por meio da ponte. Ele envia detalhes sobre os operadores ativos para cada época, ordenando-os por sua participação total agregada em todos os vaults. A Tanssi então usa essas informações para atribuir operadores para as próximas sessões, garantindo que os mais alinhados economicamente protejam a









```mermaid





























flowchart TD

```

````

```mermaid

flowchart LR











```

flowchart LR

````





```mermaid

flowchart LR














```

flowchart LR

````


```mermaid












%%{init: {'sequence': {'mirrorActors': false}}}%%
```







```mermaid




%%{init: {'sequence': {'mirrorActors': false}}}%%


%%{init: {'sequence': {'mirrorActors': false}}}%%








```

````

%%{init: {'sequence': {'mirrorActors': false}}}%%

````






```mermaid



%%{init: {'sequence': {'mirrorActors': false}}}%%







```

%%{init: {'sequence': {'mirrorActors': false}}}%%

````


```mermaid













```










```mermaid









%%{init: {'sequence': {'mirrorActors': false}}}%%

```
















````

%%{init: {'sequence': {'mirrorActors': false}}}%%

```

















```mermaid






















```
