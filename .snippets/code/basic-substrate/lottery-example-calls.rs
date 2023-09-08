#[pallet::call]
impl<T: Config> Pallet<T> {

    #[pallet::call_index(0)]
    #[pallet::weight(0)]
    pub fn buy_ticket(origin: OriginFor<T>) -> DispatchResult {

        // 1. Validates the origin signature
        let buyer = ensure_signed(origin)?;

        // 2. Checks that the user has enough balance to afford the ticket price
        ensure!(
            T::Currency::free_balance(&buyer) >= T::TicketCost::get(),
            Error::<T>::NotEnoughCurrency
        );

        // 3. Checks that the user is not already participating
        if let Some(participants) = Self::get_participants() {
            ensure!(
                !participants.contains(&buyer),
                Error::<T>::AccountAlreadyParticipating
            );
        }

        // 4. Adds the user as a new participant for the prize
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

        // 5. Transfers the ticket cost to the module's account
        // to be hold until transferred to the winner
        T::Currency::transfer(
            &buyer, 
            &Self::get_pallet_account(), 
            T::TicketCost::get(), 
            ExistenceRequirement::KeepAlive)?;
        
        // 6. Notify the event
        Self::deposit_event(Event::TicketBought { who: buyer });
        Ok(())
    }

    #[pallet::call_index(1)]
    #[pallet::weight(0)]
    pub fn award_prize(origin: OriginFor<T>) -> DispatchResult {

        // 1. Validates the origin signature
        let _who = ensure_root(origin)?;

        match Self::get_participants() {
            Some(participants) => { 
                
                // 2. Gets a random number from the randomness module
                let nonce = Self::get_and_increment_nonce();
                let (random_seed, _) = T::MyRandomness::random(&nonce);
                let random_number = <u32>::decode(&mut random_seed.as_ref())
                    .expect("secure hashes should always be bigger than u32; qed");
                
                // 3. Selects the winner from the participants lit
                let winner_index = random_number as usize % participants.len();
                let winner = participants.as_slice().get(winner_index).unwrap();

                // 4. Transfers the total prize to the winner's account
                let prize = T::Currency::free_balance(&Self::get_pallet_account());
                T::Currency::transfer(
                    &Self::get_pallet_account(), 
                    &winner, 
                    prize, 
                    ExistenceRequirement::AllowDeath)?;

                // 5. Resets the participants list, and gets ready for another lottery round
                Participants::<T>::kill();

                // 6. Notify the event
                Self::deposit_event(Event::PrizeAwarded { winner: winner.clone() } );
            }, 
            None => {
                // Notify the event (No participants)
                Self::deposit_event(Event::ThereAreNoParticipants);
            }
        };

        Ok(())
    }
}
