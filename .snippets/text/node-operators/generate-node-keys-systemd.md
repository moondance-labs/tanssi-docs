### Generate the Node Key {: #generate-node-key }

To generate and store on disk the session keys that will be referenced on the start-up command, run the following command:

=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-relay key generate-node-key --file /var/lib/tanssi-data/node-key
    ```

=== "Dancelight TestNet"
    
    ```bash
    /var/lib/dancelight-data/tanssi-relay key generate-node-key --file /var/lib/dancelight-data/node-key
    ```