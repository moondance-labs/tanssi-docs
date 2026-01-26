### Gerar a chave do nó {: #generate-node-key }

Para gerar e armazenar em disco as chaves de sessão que serão referenciadas no comando de inicialização, execute:

=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-relay key generate-node-key --file /var/lib/tanssi-data/node-key
    ```

=== "Dancelight TestNet"
    
    ```bash
    /var/lib/dancelight-data/tanssi-relay key generate-node-key --file /var/lib/dancelight-data/node-key
    ```
