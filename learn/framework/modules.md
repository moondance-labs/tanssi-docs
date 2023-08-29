---
title: Appchain Modules (Pallets) for your Runtime
description: Substrate is a blockchain development framework that provides modules (pallets) ready to be composed with the developer's custom logic in the Appchain Runtime.
---

# Appchain Framework Modules {: #appchain-framework-modules }

## Introduction {: #introduction }

Substrate Framework provides complete and ready-to-use implementations of the main functions an Appchain needs to work properly, including cryptography, consensus, governance, and so on. These implementations are fully customizable and could be replaced with custom logic if needed.

When it comes to building the Runtime, which is essentially the heart of a Substrate-based blockchain, the desired state transition rules must be defined, reflecting the intended behavior and features of the blockchain.

To build the Runtime, Substrate provides many built-in modules (called pallets) that can be freely used as building blocks to compose and interact with any other custom-made modules, allowing teams to create unique behaviors according to the specific requirements of their Appchain.

![Built-in modules](/images/learn/framework/modules/modules-1.png)

## Built-in Modules {: #built-in-modules }

There are three categories for the included modules in the development framework:

- **System Pallets** - provide core functionality to the runtime and other pallets
- **Parachain Pallets** - provide specific functionality to Appchains willing to connect to the relay chain
- **Functional Pallets** - provide implementations for general use cases to build upon

When designing and writing the rules of the Appchain, the available set of functional pallets bring a solution to many of the coding requirements that would otherwise need to be developed from scratch.

Here is a list of some of the most used modules, but there are many more on the [Substrate Rustdocs website](https://paritytech.github.io/substrate/){target=_blank}:

- **[pallet_balances](https://paritytech.github.io/substrate/master/pallet_balances/index.html){target=_blank}** - the Balances pallet provides functions for handling accounts and balances for the Appchain native currency
- **[pallet_assets](https://paritytech.github.io/substrate/master/pallet_assets/index.html){target=_blank}** - the Assets pallet provides functions for handling any type of fungible tokens
- **[pallet_nfts](https://paritytech.github.io/substrate/master/pallet_nfts/index.html){target=_blank}** - the NFTs pallet provides functions for dealing with non-fungible tokens
- **[pallet_democracy](https://paritytech.github.io/substrate/master/pallet_democracy/index.html){target=_blank}** - the Democracy pallet provides functions to manage and administer general stakeholder voting
- **[pallet_multisig](https://paritytech.github.io/substrate/master/pallet_multisig/index.html){target=_blank}** - the Multisig pallet provides functions for multi-signature dispatch
- **[pallet_recovery](https://paritytech.github.io/substrate/master/pallet_recovery/index.html){target=_blank}** - the Recovery pallet provides functions to allow users to regain access to their accounts when the private key is lost. This works by granting other accounts the right to sign transactions on behalf of the lost account (note that it is necessary to have previously chosen the authorized accounts)
- **[pallet_staking](https://paritytech.github.io/substrate/master/pallet_staking/index.html){target=_blank}** - the Staking pallet provides functions to administer staked tokens, support rewarding, slashing, depositing, withdrawing, and so on

In addition to those previously listed, other modules like [identity](https://paritytech.github.io/substrate/master/pallet_identity/index.html){target=_blank}, [smart contracts](https://paritytech.github.io/substrate/master/pallet_contracts/index.html){target=_blank}, [vesting](https://paritytech.github.io/substrate/master/pallet_vesting/index.html){target=_blank}, and many others that are freely available can speed up the development of the Appchain and, consequently, the time to market.

## Custom-Made Modules {: #custom-modules }

Developers creating new modules enjoy complete freedom to express any desired behavior in the core logic of the blockchain, like exposing new transactions, storing sensible information, and validating and enforcing business logic.

As explained in the [Architecture](/learn/framework/architecture#client-runtime-communication) article, a module needs to be able to communicate with the core client by exposing and integrating with a very specific API that allows the runtime to expose transactions, access storage, and code and decode information stored on-chain. It also needs to include many other required wiring codes that make the module work in the node.

To improve developer experience when writing modules, Substrate relies heavily on [Rust macros](https://doc.rust-lang.org/book/ch19-06-macros.html){target=_blank}. Macros are special instructions that automatically expand to Rust code just before compile-time, allowing modules to keep up to seven times the amount of code out of sight of the developers. This allows developers to focus on the specific functional requirements when writing modules instead of dealing with technicalities and the necessary scaffolding code.

In Substrate, all modules, including custom-made ones, must implement at least these mandatory attribute macros:

- **#[frame_support::pallet]** - this attribute is the entry point that marks the module as usable in the runtime
- **#[pallet::pallet]** - applied to a structure that is used to retrieve module information easily
- **#[pallet::config]** - is a required attribute to define the configuration for the data types of the module

There are other macros where the functional requirements can be implemented:

- **#[pallet::call]** - this macro is used to define functions that will be exposed as transactions, allowing them to be dispatched to the runtime. It is here that the developers add their custom transactions and logic
- **#[pallet::error]** - as transactions may not be successful (insufficient funds, for example) and for security reasons, a custom module can never end up throwing an exception, all the possible errors are to be identified and listed in an enum to be returned upon an unsuccessful execution
- **#[pallet::event]** - events can be defined and used as a means to provide more information to the user
- **#[pallet::storage]** - this macro is used to define elements that will be persisted in storage. As resources are scarce in a blockchain, it should be used wisely to store only sensible information

All these macros act as attributes that must be applied to the code just above Rust modules, functions, structures, enums, types, etc., allowing the module to be built and added to the runtime, which, in time, will expose the custom logic to the outer world, as exposed in the following section.

### Custom Module Example { #custom-module-example }

As an example of a custom module, the following section presents a simple lottery with minimal functionality exposing two transactions:

- **buy_ticket** - this transaction verifies that the user signing the transaction has not already bought a ticket and has enough funds to pay for it. If everything is fine, the module transfers the ticket price to a special account and registers the user as a participant for the prize
- **award_prize** - this transaction generates a random number to pick the winner from the list of participants. The winner gets the total amount of the funds transferred to the module's special account

The following code snippets are not intended for production use, and show the implementation of the macros mentioned in the previous section:

- **#[frame_support::pallet]** and **#[pallet::pallet]**

The implementation of these macros and the code structure are mandatory to enable the module to be used in the runtime.

```rust
#[frame_support::pallet(dev_mode)]
pub mod pallet {
    ...
    #[pallet::pallet]
    pub struct Pallet<T>(_);
    ...
}
```

- **#[pallet::config]**

To make the modules highly adaptable, they can be configured to the specific requirements of the use case the runtime implements.

The implementation of the config macro is mandatory and sets the module's dependency on other modules and the types and values specified by the runtime.

In this example, the lottery module depends on other modules to manage the currency and the random function to select the winner. More about module dependency in the [Substrate documentation](https://docs.substrate.io/build/pallet-coupling/){target=_blank}.

This module also reads and uses the ticket price and the maximum number of participants directly from the runtime settings.

```rust
/// Configure the module by specifying the parameters and types on which it depends.
#[pallet::config]
pub trait Config: frame_system::Config {

    /// Because this pallet emits events, it depends on the runtime's definition of an event.
    type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

    /// This module depends on other modules, such as balances and randomness
    type Currency: Currency<Self::AccountId> 
        + ReservableCurrency<Self::AccountId>
        + LockableCurrency<Self::AccountId>;

    type MyRandomness: Randomness<Self::Hash, BlockNumberFor<Self>>;

    /// Some values that must be configured when adding the module to the runtime
    #[pallet::constant]
    type TicketCost: Get<BalanceOf<Self>>;

    #[pallet::constant]
    type MaxParticipants: Get<u32>;

    #[pallet::constant]
    type PalletId: Get<PalletId>;
}
```

- **#[pallet::call]** 

The following code snippet shows the two transactions that this module exposes: buy_ticket and award_prize.


```rust
#[pallet::call]
impl<T: Config> Pallet<T> {
    
    #[pallet::call_index(0)]
    #[pallet::weight(0)]
    pub fn buy_ticket(origin: OriginFor<T>) -> DispatchResult {
        let buyer = ensure_signed(origin)?;

        // Checks that the user has enough balance to afford the ticket price
        ensure!(
            T::Currency::free_balance(&buyer) >= T::TicketCost::get(),
            Error::<T>::NotEnoughCurrency
        );

        // Checks that the user do not have a ticket yet
        if let Some(participants) = Self::get_participants() {
            ensure!(
                !participants.contains(&buyer),
                Error::<T>::AccountAlreadyParticipating
            );
        }

        // Stores the user to participate in the lottery
        match Self::get_participants() {
            Some(mut participants) => { 
                ensure!(
                    participants.try_push(buyer.clone()).is_ok(), 
                    Error::<T>::CanNotAddParticipant
                );
                Participants::<T>::set(Some(participants));
            }, 
            None => {
                let mut participants = BoundedVec::new();
                ensure!(
                    participants.try_push(buyer.clone()).is_ok(), 
                    Error::<T>::CanNotAddParticipant
                );
                Participants::<T>::set(Some(participants));
            }
        };

        // Transfer the ticket cost to the module's account
        T::Currency::transfer(&buyer, &Self::get_pallet_account(), T::TicketCost::get(), ExistenceRequirement::KeepAlive)?;
        
        // Notify the event
        Self::deposit_event(Event::TicketBought { who: buyer });
        Ok(())
    }

    #[pallet::call_index(1)]
    #[pallet::weight(0)]
    pub fn award_prize(origin: OriginFor<T>) -> DispatchResult {
        let _who = ensure_root(origin)?;

        match Self::get_participants() {
            Some(participants) => { 
                
                // Gets a random number, using randomness module
                let nonce = Self::get_and_increment_nonce();
                let (random_seed, _) = T::MyRandomness::random(&nonce);
                let random_number = <u32>::decode(&mut random_seed.as_ref())
                    .expect("secure hashes should always be bigger than u32; qed");
                
                // Selects the winner 
                let winner_index = random_number as usize % participants.len();
                let winner = participants.as_slice().get(winner_index).unwrap();

                // Transfers the total prize to the winner's account
                let prize = T::Currency::free_balance(&Self::get_pallet_account());
                T::Currency::transfer(&Self::get_pallet_account(), &winner, prize, ExistenceRequirement::AllowDeath)?;

                // Resets the storage, and gets ready for another lottery round
                Participants::<T>::kill();

                Self::deposit_event(Event::PrizeAwarded { winner: winner.clone() } );
            }, 
            None => {
                Self::deposit_event(Event::ThereAreNoParticipants);
            }
        };

        Ok(())
    }
}
```

- **#[pallet::error]** 

This macro is applied to an enumeration of errors that might occur during the execution. It is important for security reasons to handle all error cases gracefully (and never crash in the runtime).

```rust
// Errors inform users that something went wrong.
#[pallet::error]
pub enum Error<T> {
    NotEnoughCurrency,
    AccountAlreadyParticipating,
    CanNotAddParticipant,
}
```

- **#[pallet::event]**

This macro is applied to an enumeration of events to inform the user of any changes in the state or important actions that happened during the execution in the runtime.

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

- **#[pallet::storage]** 

This macro initializes a runtime storage structure. In this example, a basic value storage structure is used to persist the list of participants.

In the heavily constrained environment of an AppChain, deciding what to store, and which structure to use can be critical in terms of performance. More on this topic in the [Substrate documentation](https://docs.substrate.io/build/runtime-storage/){target=_blank}.

```rust
#[pallet::storage]
#[pallet::getter(fn get_participants)]
pub(super) type Participants<T: Config> = StorageValue<
    _,
    BoundedVec<T::AccountId, T::MaxParticipants>,
    OptionQuery
>;
```

??? code "View the complete module code"

    ```rust
    --8<-- 'code/modules/lottery-example.rs'
    ```

The step-by-step process of adding built-in and custom-made modules to the runtime is covered in the [Substrate article](/builders/build/substrate) of the Builder's section.
