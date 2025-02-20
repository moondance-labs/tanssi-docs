---
title: Ethereum with Symbiotic
description: Tanssi's design allows developers to choose and connect to the Symbiotic restaking protocol, benefiting from Ethereum-grade security right from the start.
icon: octicons-shield-check-24
---

# Ethereum with Symbiotic {: #ethereum-symbiotic }

## Introduction {: #introduction }

The Tanssi protocol takes care of critical infrastructural components, making it easy for developers to launch their networks in a few minutes. In addition to block production, data retrievability, and integrations with essential tools such as wallets, RPC endpoints, block explorers, and others, another major task to tackle is providing security to the network.

Tanssi is designed to offer developers a shared security model, alleviating them from having to source enough economic security or negotiating with operators to run nodes opting-in for their networks. By deploying networks through Tanssi, and by choosing [Symbiotic](https://symbiotic.fi/){target=\_blank} as a security provider, developers benefit from Ethereum-grade security, tapping into billions of dollars in shared security from staked ETH.

The following sections describe how the Symbiotic protocol works and how Tanssi networks can leverage it as their consensus mechanism.

## Ethereum-Grade Security with Symbiotic {: #symbiotic }

[Symbiotic](https://symbiotic.fi/){target=\_blank} is a shared security protocol designed to be permissionless, multi-asset, and network-agnostic. It fosters capital efficiency by allowing users to extend the functionality of their staked assets to secure other networks while providing additional utility.

The protocol provides a coordination layer for its main components and participants, aligning incentives among parties while minimizing execution layer risks by deploying non-upgradeable core contracts on Ethereum. The following diagram resumes all the components and actors participating in the protocol:

```mermaid
flowchart TD
    %% Vaults subgraph
    subgraph Ethereum["Ethereum/Symbiotic"]
        slash[/Slashing Events/]
        Restakers -- Deposit Assets --> Vaults
        manager["Vault managers"] -- Manage --> Vaults
        Resolvers -- Decide On --> slash
        slash -- Executes On --> Vaults
    end

    %% Validators subgraph
    subgraph Validators
        direction BT
        validators["Operators/Validators"]
        operators["Node Operators"]
        operators -- Run --> validators

    end

    %% Networks subgraph
    subgraph Networks
        direction BT
        developers["Developers"]
        networks["Decentralized Networks"]
        developers -- Launch --> networks
    end

    Vaults <--> Tanssi
    Tanssi <--> Validators
    Tanssi <--> Networks
```

Symbiotic's flexible design allows every party to decide on setups that best fit their use cases. For example, vaults can choose what forms of collateral they accept, operators can determine which networks they want to provide services to, and decentralized networks can customize their use case and define the level of security (which collaterals are accepted, for example) they need.

The following sections describe the protocol's main components.

### Vaults {: #vaults }

[Vaults](https://docs.symbiotic.fi/modules/vault/introduction){target=\_blank} are the Symbiotic protocol's economic backbone. They manage liquidity and deposits from restakers, connect operators, and networks and set up delegation strategies.

Vaults are programmable, and many vaults with different setups can coexist, each serving a different purpose. Vaults are managed by vault managers, who have the responsibility of deciding on critical matters such as:

- **Accounting** - configure deposits, withdrawals, and how slashing event are handle. Each vault is tied to a specific asset that is used as collateral
- **Delegation Strategies** - define the delegation and restaking strategy across networks and operators
- **Reward Distribution** - provide historical information to external rewards contracts

Vault managers also whitelist the operators and networks with which to work. Since the operators get delegated stake and could potentially get slashed, they must be accepted by the vault managers before providing validation services to the networks. On a similar note, vault managers analyze and authorize each network the vault will secure, taking into consideration, for example, the rewards the network offers.

Vault managers also designate [resolvers](https://docs.symbiotic.fi/modules/counterparties/resolvers){target=\_blank}, who are responsible for approving or vetoing [slashing events](https://docs.symbiotic.fi/modules/vault/slasher){target=\_blank} caused by operators on networks with [veto-slashing](https://docs.symbiotic.fi/modules/vault/slasher#veto-slashing){target=\_blank} support, like the Tanssi Network.

### Operators {: #operators }

[Node operators](/node-operators/){target=\_blank} are entities or individuals responsible for running the [nodes (also known as operators or validators)](https://docs.symbiotic.fi/modules/counterparties/operators){target=\_blank}, which are the computational components validating the networks' transactions. They are responsible for the nodes' configuration, hardware setup, uptime, and performance.

Node operators opt-in to provide services to networks, which must accept their request. Also, they opt-in to provide services in vaults, which must accept their request.

Once an operator has been accepted by a vault and a network connected to that vault, the node can start providing validation services to that network, receiving rewards in exchange.

### Networks {: #networks }

[Networks](https://docs.symbiotic.fi/modules/counterparties/networks){target=\_blank} are the actively validated services or networks. These application-specific blockchains can be a use case from a wide range of industries, such as Gaming, Defi, RWAs, and others, and are the platforms that, through dApps, the end users interact with.

Since operators opt-in to provide services to networks and the vault managers must accept the networks, the developers are responsible for defining, controlling, and adapting their methodology for onboarding, rewarding, and slashing operators.

!!! note
    Networks deployed through Tanssi don't need to work on the relation with vaults and operators since the Tanssi protocol deals with those complexities.

## Tanssi with Symbiotic {: #tanssi-symbiotic }

Developers launching networks through Tanssi benefit from [block production services](/learn/tanssi/network-services/block-production/){target=\_blank}, data retrievability as a service, and the shared security model derived from every vault opting-in to support the Tanssi protocol. This eliminates the hurdle of dealing with infrastructural and security components developers would need to take on otherwise.

Vault managers running vaults can apply to offer the restaked collaterals as economic security for the Tanssi Network. Since Tanssi networks run in a sandbox-like environment, and the Tanssi protocol manages all the networks-related responsibilities, vault managers only need to analyze and opt-in to the Tanssi protocol, regardless of the quality and the quantity of networks that are running through the Tanssi protocol at any given moment.

Operators opting-in to provide services to the Tanssi protocol (provided that they participate in a vault that supports the Tanssi protocol) have the benefit of running the same setup to provide block production and validation services to the Tanssi Network and, consequently, to every network deployed through Tanssi. This unique architecture facilitates all the tasks related to running and maintaining the operators since there are no changes in the setup when a new Tanssi network is launched or decommissioned.

!!! note
    The Tanssi protocol effectively abstracts the details of the active set of networks away from vault managers and operators. Networks particularities don't require any additional setup from operators nor pose risks to vault assets.

All things combined shape a functional and elegant ecosystem where developers can focus on creating and innovating. Tanssi handles the infrastructural components, guaranteeing liveness and performance, and Symbiotic provides the economic safeguards to ensure the validity of the operations.

```mermaid
flowchart LR
    subgraph Symbiotic
        direction LR
        Operators
        Vaults
    end
    Symbiotic  -- Validates/Secures --> tanssi["Tanssi Network"]
    tanssi -- Block Production Services--> Networks
    tanssi -- Security--> Networks
    tanssi -- Data Retrievability--> Networks

    class Symbiotic custom-container
```

### Rewards {: #rewards }

Well-behaved operators and restakers are rewarded for their participation with TANSSI tokens. The reward process consists of two main phases: [Reward Distribution Phase](#reward-distribution-phase) and [Reward Claiming Phase](#reward-claiming-phase).

#### **Reward Distribution Phase** {: #reward-distribution-phase }

The reward distribution phase calculates and allocates rewards through five key steps involving operators, restakers, and smart contracts. The steps are:

1. Reward Calculation - Tanssi calculates rewards based on the activity of operators and stakers and then creates a [Merkle root](https://en.wikipedia.org/wiki/Merkle_tree). This Merkle root is a cryptographic fingerprint that summarizes the reward allocations, indicating who receives what. Stakers are rewarded according to their stake in each vault
2. Cross-Chain Messaging - reward allocation data is sent using [XCM](https://docs.moonbeam.network/builders/interoperability/xcm/overview/) (Cross-Consensus Messaging), a standardized protocol for blockchain communication. [Snowbridge](https://wiki.polkadot.network/docs/learn-snowbridge) acts as a trustless bridge between Tanssi and Ethereum
3. Gateway - once the message is relayed to the `Gateway` contract, this contract serves as Tanssi's authorized entry point on Ethereum for the Snowbridge bridge.
4. Middleware - the `Gateway` forwards the data to the [`Middleware`](https://github.com/moondance-labs/tanssi-symbiotic/blob/main/src/contracts/middleware/Middleware.sol), which is responsible for various tasks, including passing the information to the `OperatorReward` contract
5. OperatorRewards - this is the final destination for the data. The [`OperatorRewards`](https://github.com/moondance-labs/tanssi-symbiotic/blob/main/src/contracts/rewarder/ODefaultOperatorRewards.sol) contract stores the Merkle tree of the reward allocations and handles the transfer of reward tokens when a claim is made

```mermaid
sequenceDiagram
    participant Tanssi Network
    participant Snowbridge (XCM)
    participant Gateway Contract
    participant Middleware
    participant OperatorRewards

    Tanssi Network->>Tanssi Network: 1. Calculate rewards and Generate Merkle root
    Tanssi Network->>Snowbridge (XCM): 2. Send XCM message (Merkle root + data)
    Snowbridge (XCM)->>Gateway Contract: 3. Relay message
    Gateway Contract->>Middleware: 4. Propagate rewards data
    Middleware->>OperatorRewards: 5. distributeRewards()
```

#### **Reward Claiming Phase** {: #reward-claiming-phase }

In the reward-claiming phase, operators and stakers can claim rewards based on their participation in the network. Tanssi determines the share distribution for operators and stakers, currently setting it at 20% for operators and 80% for stakers.

1. Operator Claims - operators can claim their share by calling the `OperatorRewards` contract by using a cryptographic receipt that verifies their entitlement
2. Token Release - the operator call triggers the token release, and the `OperatorRewards` sends the established amount to the operator.
3. Token Distribution Stakers - the remaining rewards are forwarded to the `StakerRewards` for further claiming of the staker
4. Staker Allocation - the remaining 80% of the rewards are automatically directed to the [`StakerRewards`](https://github.com/moondance-labs/tanssi-symbiotic/blob/main/src/contracts/rewarder/ODefaultStakerRewards.sol) contract, where stakers can claim rewards proportional to their stake in the vaults

```mermaid
sequenceDiagram
 participant Operator
 participant OperatorRewardsContract
 participant StakerRewardsContract
 participant Stakers

 Operator->>OperatorRewardsContract: 1. Claim rewards (Merkle proof)
 OperatorRewardsContract->>Operator: 2. Release rewards to the operator
 OperatorRewardsContract->>StakerRewardsContract: 3. Forward the remainder to StakerRewards
 Stakers->>StakerRewardsContract: 4. Claim individual rewards
```

### Slashing {: #slashing }

The Tanssi protocol implements slashing to penalize operators for misbehavior. When a slashing event is triggered, the authorities designated as resolvers by the vault managers can either accept or revert this action.

The following actions can trigger slashing events:

1. Producing Invalid Blocks (e.g., blocks that include invalid transactions)
2. Invalid Validation (e.g., double-signing or breaking protocol rules)
3. Downtime or Unavailability
4. Consensus Violations

!!!note
    Slashing events can only be triggered by operators' misbehavior within the Tanssi Network. Even if Tanssi networks are faulty or malicious, they operate in a sandboxed environment and cannot cause slashing.

#### **Slashing Process** {: #slashing-process }

The slashing process follows a path similar to that of rewards. When a validator misbehaves, the Tanssi Network sends a slashing request message to the trustless bridge (Snowbridge). This process resembles the reward, where the message passes through the gateway and into the `Middleware` where the slashing method gets called.

The slashing method receives a unique identifier for the operator's identity, the severity of the slash as a percentage of the operator's assigned stake in each vault, and the time context within which the offense occurred.

The slashing process consists of the following steps:

1. Slash Request - Tanssi sends the slash request to the `Middleware` with the parameters `operatorKey`, percentage, and epoch
2. Operator Validation - the `Middleware` validates the operator's identity and checks if the operator is eligible for slashing
3. Vault Iteration - the `Middleware` iterates through all active vaults during the offense epoch, skipping any inactive vaults
4. Retrieve Operator Stake - for each active vault, the Middleware retrieves the stake of the misbehaving operator
5. Calculate Slash Amount - the `Middleware` calculates the slashing amount by applying the slashed percentage to the operator's stake in each vault
6. Slashing - Depending on the vault's slashing implementation, there are two possible routes
    
    6.1 Instant Slashing - if the vault uses instant slashing, the stake is immediately reduced

    6.2 Veto Slashing - if the vault uses veto slashing, the `Middleware` requests the slashing from a resolver. A time-limited veto window is created (e.g., 7 days). f a resolver vetoes the request within the time window, the slashing is canceled. Otherwise, the slashing penalty is finalized if no veto occurs within the time window

This process ensures that each vault's slashing is handled independently, preventing cross-contamination, and offers both instant and time-delayed slashing with dispute resolution mechanisms.

```mermaid
sequenceDiagram
    participant Network
    participant Middleware
    participant Vault
    participant Slasher
    
    Network->>Middleware: 1. slash(operatorKey, percentage, epoch)
    Middleware->>Middleware: 2. Validate operator
    loop Each Active Vault
        Middleware->>Vault: 3. getOperatorStake()
        Vault-->>Middleware: 4. vaultStake
        Middleware->>Middleware: 5. Calculate slashAmount
        alt Instant Slasher
            Middleware->>Slasher: 6.1 slash(subnetwork, operator, amount)
        else Veto Slasher
            Middleware->>Slasher: 6.2 requestSlash(...)
            opt If Not Vetoed
                Slasher->>Slasher: 6.2 executeSlash()
            end
        end
    end
```

#### **Burner** {: #burner }

The `Burner` contract is an extension responsible for handling actions that follow a [slashing event](#slashing-process), notably the burning of slashed collateral. Once a slash is executed, the Slasher contract calls the `Burner` to carry out these post-slashing tasks.

Within the protocol, the `Burner` contract plays a crucial role in deciding what happens after slashing. While there are different ways to implement the burning process, the recommended approach is to burn the slashed assets.
When a slash is executed, the `Burner` contract's `onSlash` function is activated. This function kicks off the process of burning the slashed assets.

The vault manager chooses the specific implementation of the burning process during the vault's initialization phase, and once set, the vault manager cannot modify it. The exact design of the `Burner` contract may differ depending on the type of collateral asset involved. Below are some potential implementation options:

- **Burning Tokens** - If the slashed collateral is a regular `ERC-20` token, the `Burner` destroys those tokens, permanently removing them from circulation
- **Unwrapping and Burning** - If the slashed tokens represent something like staked assets (e.g., liquid staking tokens) or liquidity provider (LP) tokens from a decentralized exchange (`DEX`), the `Burner` might convert them back into their original form before burning them
- **Cross-Chain Operations** - If the tokens are tied to assets on another blockchain, the `Burner` could unwrap them on Ethereum and trigger the burn process on the original network
- **Alternative Handling** -  Sometimes, burning isn't the best option. Instead, the `Burner` might redistribute the slashed assets to other operators, compensate affected users, or lock them in liquidity pools—whatever the system is designed to do

Burning slashed collateral is important because it ensures that misbehaving validators are penalized and reduces the total supply of tokens, which can have deflationary effects.
