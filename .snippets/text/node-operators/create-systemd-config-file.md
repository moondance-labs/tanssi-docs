### Create the Systemd Service Configuration File {: #create-systemd-configuration }

The next step is to create the Systemd configuration file.

You can create the file by running the following command:

=== "Tanssi MainNet"

    ```bash
    sudo touch /etc/systemd/system/tanssi.service
    ```

=== "Dancelight TestNet"
    
    ```bash
    sudo touch /etc/systemd/system/dancelight.service
    ```

Now you can open the file using your favorite text editor (vim, emacs, nano, etc.) and add the configuration for the service, replacing the `INSERT_YOUR_TANSSI_NODE_NAME` tag with a human-readable name and `INSERT_YOUR_IP_ADDRESS` with your public IP address. The name will come in handy for connecting the log entries and metrics with the node that generates them.
