## Setup the Systemd Service {: #setup-systemd-service }

[Systemd](https://systemd.io){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

The following commands configure a new account, the directory, and move the previously downloaded files to the right location.

Create a new account to run the service:

=== "Tanssi MainNet"

    ```bash
    adduser tanssi_service --system --no-create-home
    ```

=== "Dancelight TestNet"

    ```bash
    adduser dancelight_service --system --no-create-home
    ```

Create a directory to store the required files and data:

=== "Tanssi MainNet"

    ```bash
    mkdir /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    mkdir /var/lib/dancelight-data
    ```

Set the folder's ownership to the account that will run the service to ensure writing permission:

=== "Tanssi MainNet"

    ```bash
    sudo chown -R tanssi_service /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    sudo chown -R dancelight_service /var/lib/dancelight-data
    ```

Move the chain specification file to the folder:

=== "Tanssi MainNet"

    ```bash
    mv ./starlight-raw-specs.json /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    mv ./dancelight-raw-specs.json /var/lib/dancelight-data
    ```

And finally, move the binary to the folder:

=== "Tanssi MainNet"

    ```bash
    mv ./tanssi-node /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    mv ./tanssi-node /var/lib/dancelight-data
    ```