## Configurar o diretório de dados {: #setup-data-directory }

Executar um sequenciador ou um nó de appchain exige sincronizar duas cadeias: a cadeia de orquestração do Tanssi e a appchain para a qual ele trabalha.

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

Ou execute o comando abaixo se quiser rodar o sequenciador com o usuário logado:

=== "Tanssi MainNet"

    ```bash
    sudo chown -R $(id -u):$(id -g) /var/lib/tanssi-data
    ```
    
=== "Dancelight TestNet"
    
    ```bash
    sudo chown -R $(id -u):$(id -g) /var/lib/dancelight-data
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

!!! note
    O diretório é um parâmetro no comando de inicialização do Docker. Se optar por criar o diretório em outro lugar, ajuste o comando.
