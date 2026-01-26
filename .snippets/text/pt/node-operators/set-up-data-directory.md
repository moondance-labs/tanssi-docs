### Configure o diretório de dados {: #set-up-data-directory }

Executar um nó requer sincronizar com a cadeia Tanssi e armazenar seu estado.

Crie o diretório onde o nó armazenará os bancos de dados contendo blocos e estados de cadeia:

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

Ou execute o comando a seguir se quiser rodar o nó com o usuário atualmente logado:

=== "Tanssi MainNet"

    ```bash
    sudo chown -R $(id -u):$(id -g) /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"
    
    ```bash
    sudo chown -R $(id -u):$(id -g) /var/lib/dancelight-data
    ```

!!! note
    O diretório é um parâmetro no comando de inicialização do Docker. Se decidir criá-lo em outro lugar, ajuste o comando.
