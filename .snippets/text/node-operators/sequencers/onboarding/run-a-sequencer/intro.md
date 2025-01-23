One of Tanssi's core propositions is that it provides decentralized and trustless block production for its networks. Tanssi's runtime handles sequencer assignments to all the active networks in the Tanssi ecosystem.

Each time, the assignment algorithm distributes the available set of sequencers per session, assigning them to a random chain. Consequently, they would be producing blocks for the same network only for a relatively short period, increasing the overall security of the ecosystem.

To this end, Tanssi's binary file (the software used to run nodes) already has an embedded mechanism to switch block production automatically to the assigned chain without requiring the node operator to make any changes. The binary includes the logic to sync the new chain and produce blocks when the session changes. Consequently, sequencers need to run the Tanssi binary file, and not that of the networks (like full nodes).
