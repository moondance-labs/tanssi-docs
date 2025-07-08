## Run the Service {: #run-the-service }

Finally, enable the service and start it for the first time:

=== "Tanssi MainNet"

    ```bash
    systemctl enable tanssi.service && \
    systemctl start tanssi.service
    ```

=== "Dancelight TestNet"
    
    ```bash
    systemctl enable dancelight.service && \
    systemctl start dancelight.service
    ```

You can verify that the service is up and running correctly by executing the following command:

=== "Tanssi MainNet"

    ```bash
    systemctl status tanssi.service
    ```

=== "Dancelight TestNet"
    
    ```bash
    systemctl status dancelight.service
    ```