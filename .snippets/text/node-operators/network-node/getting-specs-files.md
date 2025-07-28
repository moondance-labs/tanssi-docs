## Getting Specifications Files {: #getting-specifications-files }

An appchain node needs information about two different blockchains to run properly: the appchain and the Tanssi orchestration chain. 

That information is a file called chain specifications, and it holds, among other things, the genesis state of the blockchain, allowing the node to verify and sync properly the blocks and state it receives from other nodes.

To get the Tanssi specifications file, execute the following command:

=== "Tanssi MainNet"

    ```bash
    wget https://raw.githubusercontent.com/moondance-labs/tanssi/75e576add204abd321c48cded556c8de14d65618/chains/orchestrator-relays/node/tanssi-relay-service/chain-specs/starlight-raw-specs.json
    ```

=== "Dancelight TestNet"
    
    ```bash
    wget https://raw.githubusercontent.com/moondance-labs/tanssi/75e576add204abd321c48cded556c8de14d65618/chains/orchestrator-relays/node/tanssi-relay-service/chain-specs/dancelight-raw-specs.json
    ```

To get the appchain specification file, download it from the dashboard in the [dApp](https://apps.tanssi.network){target=\_blank} by clicking the **Network Data** link

![Getting the chain specs](/images/node-operators/network-node/rpc-systemd/rpc-systemd-1.webp)