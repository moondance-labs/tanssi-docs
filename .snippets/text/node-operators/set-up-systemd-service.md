## Set Up the Systemd Service {: #set-up-systemd-service }

[Systemd](https://systemd.io){target=\_blank} is a management system for Linux systems that manages services (daemons in Unix-like systems jargon), starting them automatically when the computer starts or reboots, or restarting them upon unexpected failures.

The following commands configure a new account, create the directory, and move the previously downloaded files to the right location.

1. Create a new account to run the service:

=== "Tanssi MainNet"

    ```bash
    adduser tanssi_service --system --no-create-home
    ```

=== "Dancelight TestNet"
    
    ```bash
    adduser dancelight_service --system --no-create-home
    ```

2. Create a directory to store the required files and data:

=== "Tanssi MainNet"

    ```bash
    mkdir /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"
    
    ```bash
    mkdir /var/lib/dancelight-data
    ```

3. Set the folder's ownership to the account that will run the service to ensure writing permission:

=== "Tanssi MainNet"

    ```bash
    chown -R tanssi_service /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"
    
    ```bash
    chown -R tanssi_service /var/lib/dancelight-data
    ```

4. Move the binaries to the folder:

=== "Tanssi MainNet"

    ```bash
    mv ./tanssi-relay* /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"
    
    ```bash
    mv ./tanssi-relay* /var/lib/dacelight-data
    ```