Running a Tanssi-powered appchain node allows you to connect to and interact with the appchain using your infrastructure via either HTTP or WebSocket protocols.

Nodes store block data and network state. However, developers can run different kinds of nodes:

 - **Full Archive Node** - a node storing the entire block data and network state at all block heights. Such nodes are helpful when querying historical data from old blocks. However, a full archive node takes up a lot of space

  - **Full Pruned Node** - a node storing block data and network state up to some specific number of blocks before the current block height. Such nodes are helpful when querying recent data or submitting transactions through your infrastructure. They require much less space than an archival node but don't store the full network state
