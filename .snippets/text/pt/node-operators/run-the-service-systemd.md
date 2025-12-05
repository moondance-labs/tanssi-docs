## Execute o serviço {: #run-the-service }

Por fim, habilite o serviço e inicie-o pela primeira vez:

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

Você pode verificar se o serviço está ativo e rodando corretamente executando:

=== "Tanssi MainNet"

    ```bash
    systemctl status tanssi.service
    ```

=== "Dancelight TestNet"
    
    ```bash
    systemctl status dancelight.service
    ```
