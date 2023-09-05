#![cfg_attr(not(feature = "std"), no_std)]

/// Learn more about FRAME and the core library of Substrate FRAME pallets:
/// <https://docs.substrate.io/reference/frame-pallets/>
pub use pallet::*;

#[frame_support::pallet(dev_mode)]
pub mod pallet {

	use super::*;
	use frame_support::pallet_prelude::{*, ValueQuery, OptionQuery};
	use frame_system::pallet_prelude::*;
	use scale_info::prelude::vec::Vec;

	use frame_support::
	{
		sp_runtime::traits::AccountIdConversion,
		traits:: {
			Currency, LockableCurrency, ReservableCurrency, ExistenceRequirement, Randomness
		},
		PalletId,
	};

	type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

	#[pallet::pallet]
	pub struct Pallet<T>(_);

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

	// The pallet's runtime storage items.
	#[pallet::storage]
	#[pallet::getter(fn get_participants)]
	pub(super) type Participants<T: Config> = StorageValue<
		_,
		BoundedVec<T::AccountId, T::MaxParticipants>,
		OptionQuery
	>;

	#[pallet::storage]
	#[pallet::getter(fn get_nonce)]
	pub(super) type Nonce<T: Config> = StorageValue<
		_,
		u64,
		ValueQuery
	>;

	// Pallets use events to inform users when important changes are made.
	// https://docs.substrate.io/main-docs/build/events-errors/
	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// Event emitted when a ticket is bought
		TicketBought { who: T::AccountId },
		/// Event emitted when the prize is awarded
		PrizeAwarded { winner: T::AccountId },
		/// Event emitted when the prize is to be awarded, but there are no participants
		ThereAreNoParticipants,
	}

	// Errors inform users that something went wrong
	#[pallet::error]
	pub enum Error<T> {
		NotEnoughCurrency,
		AccountAlreadyParticipating,
		CanNotAddParticipant,
	}

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

	impl<T: Config> Pallet<T> {

		fn get_pallet_account() -> T::AccountId {
			T::PalletId::get().into_account_truncating()
		}

		fn get_and_increment_nonce() -> Vec<u8> {
			let nonce = Nonce::<T>::get();
			Nonce::<T>::put(nonce.wrapping_add(1));
			nonce.encode()
		}
	}
}
