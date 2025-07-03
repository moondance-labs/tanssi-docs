### Set Up the Data Directory {: #set-up-data-directory }

Running a node requires syncing with the Tanssi chain and storing its state.

Run the following command to create the directory where your node will store the databases containing blocks and chain states:

=== "Tanssi MainNet"

    ```bash
    mkdir /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"
    
    ```bash
    mkdir /var/lib/dancelight-data
    ```

Set the folder's ownership to the account that will run the Docker image to ensure writing permission:

=== "Tanssi MainNet"

    ```bash
    chown INSERT_DOCKER_USER /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"
    
    ```bash
    chown INSERT_DOCKER_USER /var/lib/dancelight-data
    ```

Or run the following command if you want to run the node with the current logged-in user:

=== "Tanssi MainNet"

    ```bash
    sudo chown -R $(id -u):$(id -g) /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"
    
    ```bash
    sudo chown -R $(id -u):$(id -g) /var/lib/dancelight-data
    ```

!!! note
    The directory is a parameter in the Docker start-up command. If you decide to create the directory elsewhere, update the command accordingly.