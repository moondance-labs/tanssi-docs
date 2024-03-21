---
title: Adding a Custom-Made Module
description: Substrate is a modular blockchain framework that makes it easy to build unique and innovative appchains composing built-in modules with custom-made ones.
---

# Adding a Custom-Made Module {: #adding-custom-made-module }

## Introduction {: #introduction }

By providing a comprehensive library of pre-built modules addressing many common requirements, the framework greatly simplifies the process of building a Tanssi appchain and accelerates the deployment and evolution into a Tanssi appchain. However, addressing an innovative use case usually requires a development effort to fully meet the requirements, and, in Substrate, adding custom logic translates into writing and integrating runtime modules.

The example presented in the [Modularity](/learn/framework/modules/#custom-module-example){target=\_blank} article shows a simple lottery module exposing two transactions:

- **Buy tickets** - this function manages a user's entry into the lottery. In essence, it verifies that the participant has a sufficient balance, is not already participating, and takes care of transferring funds to register the user for the lottery
- **Award prize** - this function that handles a user entering into the lottery. At a high level, it fetches a pseudo-random number to obtain a winner and handles the award distribution

The implementation of those transactions also uses storage, emits events, defines custom errors, and relies on other modules to handle currency (to charge for the tickets and transfer the total amount to the winner) and randomize the winner selection.

In this article, the following steps, necessary to build and add the example module to the runtime, will be covered:

1. Create the lottery module files (package)
2. Configure the module's dependencies
3. Adding custom logic
4. Configure the runtime with the new module

--8<-- 'text/_common/not-for-production-code-guard.md'

## Checking Prerequisites {: #checking-prerequisites }

To follow the steps in this guide, you will need to have the following:

- Clone the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=\_blank} from Github
- Rust compiler and Cargo package manager

You can read more about how to install Rust and Cargo is in the [prerequisites article](/builders/build/customize/prerequisites/#installing-rust){target=\_blank}.

## Creating the Lottery Module Files {: #creating-lottery-module-files }

Before starting your coding process, it's essential to create the files containing your logic. Substrate modules are abstract and intended for reuse across different runtimes with various customizations. To achieve this, you'll use Cargo, Rust's package manager, to create the module as a new package.

As mentioned in the prerequisites section, the first step is to clone the [Tanssi repository](https://github.com/moondance-labs/tanssi){target=\_blank} and, from the root folder, navigate to `pallets`, where the module will be created.

```bash
cd container-chains/pallets
```

Next, create the module package with Cargo:

```bash
cargo new lottery-example
```

By default, Cargo creates the new package in a folder with the provided name (`lottery-example`, in this case), containing a manifest file, `Cargo.toml`, and a `src` folder with a `main.rs` file. To respect the naming convention used in Substrate, the `main.rs` file is renamed to `lib.rs`:

```bash
mv lottery-example/src/main.rs lottery-example/src/lib.rs
```

Once you've executed all the commands, the module is created and ready to contain the custom logic that you'll be adding in the following sections.

## Configure the Module's Dependencies {: #configure-module-dependencies}

Since the module functions as an independent package, it has its own Cargo.toml file where you must specify the module's attributes and dependencies.

For instance, you can use attributes to specify details like the module's name, version, authors, and other pertinent information. For example, in the the `lottery-example` module, the `Cargo.toml` file can be configured as follows:

```toml
[package]
name = "module-lottery-example"
version = "4.0.0-dev"
description = "Simple module example"
authors = [""]
homepage = ""
...
```

This file also defines the module's dependencies, such as the core functionality that allows seamless integration with the runtime and other modules, access to storage, event emission, and more.

The full example of the `Cargo.toml` file sets, besides the attributes, the dependencies required by Substrate:

??? code "View the complete Cargo.toml file"

    ```rust
    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-cargo.toml'
    ```

## Adding Custom Logic {: #adding-custom-logic}

As presented in the [custom-made module](/learn/framework/modules/#custom-modules){target=\_blank} section of the modularity article, creating a module involves implementing the following attribute macros, of which the first three are mandatory:

--8<-- 'text/builders/build/customize/custom-made-module/pallets-macros-descriptions.md'

### Implementing the Module Basic Structure {: #implementing-basic-structure }

The first two mandatory macros, `#[frame_support::pallet]` and `#[pallet::pallet]`, provide the basic structure of the module and are required to enable the module to be used in a Substrate runtime.

The following snippet shows the general structure of a custom Substrate module.

```rust
#[frame_support::pallet(dev_mode)]
pub mod pallet {
    ...
    #[pallet::pallet]
    pub struct Pallet<T>(_);
    
    // All the logic goes here
}
```

The next step would be to add the third mandatory macro (`#[pallet::config]`) and all the custom logic, as shown in the following sections.

### Implementing the Module Configuration {: #implementing-module-configuration }

To make the modules highly adaptable, their configuration is abstract enough to allow them to be adapted to the specific requirements of the use case the runtime implements.

The implementation of the `#[pallet::config]` macro is mandatory and sets the module's dependency on other modules and the types and values specified by the runtime-specific settings. More about module dependencies is in the [Substrate documentation](https://docs.substrate.io/build/pallet-coupling/){target=\_blank}.

In the custom `lottery-example` module you are building, the module depends on other modules to manage the currency and the random function to select the winner. The module also reads and uses the ticket price and the maximum number of participants directly from the runtime settings.  Consequently, the configuration needs to include these dependencies:

- **Events** - the module depends on the runtime's definition of an event to be able to emit them
- **Currency** - the `lottery-example` module needs to be able to transfer funds, hence, it needs the definition of the currency system from the runtime
- **Randomness** - this module is used to fairly select the winner of the prize from the list of participants. It generates the random numbers using the past block hashes and the current block's number as seed
- **Ticket cost** - the price to charge the buyers that participate in the lottery
- **Maximum number of participants** - the top limit of participants allowed in each lottery round
- **Module Id** - the module unique identifier is required to access the module account to hold the participant's funds until transferred to the winner

The implementation of the described configuration for this example is shown in the following code snippet:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {

    // Event definition
    type RuntimeEvent: From<Event<Self>> 
        + IsType<<Self as frame_system::Config>::RuntimeEvent>;

    // Currency 
    type Currency: Currency<Self::AccountId>;

    // Randomness
    type MyRandomness: Randomness<Self::Hash, BlockNumberFor<Self>>;

    // Ticket cost
    #[pallet::constant]
    type TicketCost: Get<BalanceOf<Self>>;

    // Maximum number of participants
    #[pallet::constant]
    type MaxParticipants: Get<u32>;

    // Module Id
    #[pallet::constant]
    type PalletId: Get<PalletId>;
}
```

This abstract definition of dependencies is crucial to avoid coupling to a specific use case and to enable the modules to serve as basic building blocks for Substrate appchains.

### Implementing Transactions {: #implementing-transactions }

Calls represent the behavior a runtime exposes in the form of transactions that can be dispatched for processing, exposing the custom logic added to the module.

Every call is enclosed within the `#[pallet::call]` macro, and present the following elements:

- **Call Index** - is a mandatory unique identifier for every dispatchable call
- **Weight** - is a measure of computational effort an extrinsic takes when being processed. More about weights is in the [Substrate documentation](https://docs.substrate.io/build/tx-weights-fees/){target=\_blank}
- **Origin** - identifies the signing account making the call
- **Result** - the return value of the call, which might be an `Error` if anything goes wrong

The following snippet presents the general structure of the mentioned macro implementation and the call elements:

```rust
#[pallet::call]
impl<T: Config> Pallet<T> {
    
    #[pallet::call_index(0)]
    #[pallet::weight(0)]
    pub fn one_call(origin: OriginFor<T>) -> DispatchResult { }

    #[pallet::call_index(1)]
    #[pallet::weight(0)]
    pub fn another_call(origin: OriginFor<T>) -> DispatchResult { }

    // Other calls
}
```

In this `lottery-example` module, we defined two calls with the following logic:

```rust
#[pallet::call]
impl<T: Config> Pallet<T> {
    
    #[pallet::call_index(0)]
    #[pallet::weight(0)]
    pub fn buy_ticket(origin: OriginFor<T>) -> DispatchResult {

        // 1. Validates the origin signature
        // 2. Checks that the user has enough balance to afford the ticket price
        // 3. Checks that the user is not already participating
        // 4. Adds the user as a new participant for the prize
        // 5. Transfers the ticket cost to the module's account, to be hold until transferred to the winner
        // 6. Notify the event
    
    }

    #[pallet::call_index(1)]
    #[pallet::weight(0)]
    pub fn award_prize(origin: OriginFor<T>) -> DispatchResult {

        // 1. Validates the origin signature
        // 2. Gets a random number from the randomness module
        // 3. Selects the winner from the participants lit
        // 4. Transfers the total prize to the winner's account
        // 5. Resets the participants list, and gets ready for another lottery round

    }
}
```

These calls also emit events to keep the user informed and can return errors should any of the validations go wrong.

Here is the complete implementation of the calls with the custom lottery logic:

??? code "View the complete calls code"

    ```rust
    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-calls.rs'
    ```

### Implementing Custom Errors {: #implementing-custom-errors}

The `#[pallet::error]` macro is used to annotate an enumeration of potential errors that could occur during execution. It is crucial for security to ensure that all error situations are handled gracefully without causing the runtime to crash.

The following example of this macro implementation shows the errors that might occur in the lottery module:

```rust
// Errors inform users that something went wrong.
#[pallet::error]
pub enum Error<T> {
    NotEnoughCurrency,
    AccountAlreadyParticipating,
    CanNotAddParticipant,
}
```

### Implementing Events {: #implementing-events }

The `#[pallet::event]` macro is applied to an enumeration of events to inform the user of any changes in the state or important actions that happened during the execution in the runtime.

As an example, for the `lottery-example` module, this macro could be configured with the following events:

```rust
#[pallet::event]
#[pallet::generate_deposit(pub(super) fn deposit_event)]
pub enum Event<T: Config> {
    /// Event emitted when a ticket is bought
    TicketBought { who: T::AccountId },
    /// Event emitted when the prize is awarded
    PrizeAwarded { winner: T::AccountId },
    /// Event emitted when there are no participants
    ThereAreNoParticipants,
}
```

### Implementing Storage for State Persistence {: #implementing-storage }

The `#[pallet::storage]` macro initializes a runtime storage structure.  In the heavily constrained environment of a Tanssi appchain, deciding what to store and which structure to use can be critical in terms of performance. More on this topic is covered in the [Substrate documentation](https://docs.substrate.io/build/runtime-storage/){target=\_blank}.

In this example, the `lottery-example` module needs a basic value storage structure to persist the list of participants in a bounded capacity vector ([BoundedVec](https://crates.parity.io/frame_support/storage/bounded_vec/struct.BoundedVec.html){target=\_blank}). This can be initialized as follows:

```rust
#[pallet::storage]
#[pallet::getter(fn get_participants)]
pub(super) type Participants<T: Config> = StorageValue<
    _,
    BoundedVec<T::AccountId, T::MaxParticipants>,
    OptionQuery
>;
```

### The Complete Module {: #complete-module }

To put all the pieces together, after implementing all the required macros and adding the custom logic, the module is now complete and ready to be used in the runtime.

??? code "View the complete module file"

    ```rust
    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example.rs'
    ```

## Configure the Runtime {: #configure-runtime }

Finally, with the module finished, it can be included in the runtime. By doing so, the transactions `buy_tickets` and `award_prize` will be callable by the users. This also means that the [Polkadot.js API](/dapp-developers/developer-toolkit/substrate-api/polkadot-js-api/){target=\_blank} will be decorated with this module and all the available calls that it contains.

To configure the runtime, open the `lib.rs` file, which contains the definition for the runtime of the included template and is located (in case of using the EVM-compatible) in the folder:

```text
*/container-chains/templates/frontier/runtime/src/
```

To add the lottery module, configure the modules as follows:

```rust

// Add the configuration for randomness module. No parameters needed.
impl pallet_insecure_randomness_collective_flip::Config for Runtime {
}

// Custom module id
parameter_types! {
	pub const PalletId: PalletId = PalletId(*b"loex5678");
}

// Add configuration for the lottery module
impl pallet_lottery_example::Config for Runtime {
	type RuntimeEvent = RuntimeEvent;
	type Currency = Balances;
	type TicketCost = ConstU128<1000000000000000>;
	type PalletId = PalletId;
	type MaxParticipants = ConstU32<500>;
	type MyRandomness = RandomCollectiveFlip;
}
```

With the modules configured, add the macro `construct_runtime!` (that defines the modules that will be included when building the runtime) and the randomness and lottery modules.

```rust
construct_runtime!(
	pub struct Runtime {
        ...
        // Include the custom logic from the pallet-template in the runtime.
        RandomCollectiveFlip: pallet_insecure_randomness_collective_flip,
        Lottery: pallet_lottery_example,
        ...
    }
)
```

With everything set, the Tanssi appchain now has support for a basic implementation of a lottery.

--8<-- 'text/_disclaimers/third-party-content.md'
