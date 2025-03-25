- `--name INSERT_NAME` - a human-readable name for this node
- `--rpc-port INSERT_PORT` - specifies the JSON-RPC TCP port the node listens on
- `--unsafe-rpc-external` - exposes the RPC service on all the interfaces
- `--state-pruning INSERT_STATE_PRUNING_TYPE` - specifies when the Tanssi-powered network state should be removed from the database. The pruning type can be either `archive` (which makes the node behave as a full node keeping all the state), `archive-canonical` (which keeps only the state of finalized blocks), or any `number` (representing the number of blocks whose states are kept)
- `--blocks-pruning INSERT_BLOCKS_PRUNING_TYPE` - specifies how many blocks should be kept in the database. The pruning type can be either `archive` (which makes the node behave as a full node keeping all the blocks), `archive-canonical` (which keeps only finalized blocks), or any `number` (representing the amount of finalized blocks to keep)
- `--detailed-log-output` - enables detailed log output

!!! warning
    The `--unsafe-rpc-external` enables external access to your node’s RPC interface, making it accessible from any IP address. Make sure that proper security controls are in place.

For a complete list of available flags, their description, and possible values, run the following command:
