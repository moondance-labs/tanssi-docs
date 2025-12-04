## Configurar o serviço Systemd {: #setup-systemd-service }

O [Systemd](https://systemd.io){target=\_blank} é um sistema de gerenciamento para Linux que controla serviços (daemons), iniciando-os automaticamente quando o computador liga ou reinicia, ou reiniciando-os em caso de falhas inesperadas.

Os comandos a seguir configuram uma nova conta, o diretório e movem os arquivos baixados para o local correto.

Crie uma nova conta para executar o serviço:

=== "Tanssi MainNet"

    ```bash
    adduser tanssi_service --system --no-create-home
    ```

=== "Dancelight TestNet"

    ```bash
    adduser dancelight_service --system --no-create-home
    ```

Crie um diretório para armazenar os arquivos e dados necessários:

=== "Tanssi MainNet"

    ```bash
    mkdir /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    mkdir /var/lib/dancelight-data
    ```

Defina a propriedade da pasta para a conta que executará o serviço, garantindo permissão de escrita:

=== "Tanssi MainNet"

    ```bash
    sudo chown -R tanssi_service /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    sudo chown -R dancelight_service /var/lib/dancelight-data
    ```

Mova o arquivo de especificação da cadeia para a pasta:

=== "Tanssi MainNet"

    ```bash
    mv ./starlight-raw-specs.json /var/lib/tanssi-data
    ```

=== "Dancelight TestNet"

    ```bash
    mv ./dancelight-raw-specs.json /var/lib/dancelight-data
    ```
