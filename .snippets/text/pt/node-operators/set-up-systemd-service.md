## Configure o serviço Systemd {: #set-up-systemd-service }

O [Systemd](https://systemd.io){target=\_blank} é um sistema de gerenciamento para Linux que controla serviços (daemons), iniciando-os automaticamente quando o computador liga ou reinicia, ou reiniciando-os em caso de falhas.

Os comandos a seguir criam uma nova conta, o diretório e movem os arquivos previamente baixados para o local correto.

1. Crie uma nova conta para executar o serviço:

    === "Tanssi MainNet"

        ```bash
        adduser tanssi_service --system --no-create-home
        ```

    === "Dancelight TestNet"
        
        ```bash
        adduser dancelight_service --system --no-create-home
        ```

2. Crie um diretório para armazenar os arquivos e dados necessários:

    === "Tanssi MainNet"

        ```bash
        mkdir /var/lib/tanssi-data
        ```

    === "Dancelight TestNet"
        
        ```bash
        mkdir /var/lib/dancelight-data
        ```

3. Defina a propriedade da pasta para a conta que executará o serviço, garantindo permissão de escrita:

    === "Tanssi MainNet"

        ```bash
        chown -R tanssi_service /var/lib/tanssi-data
        ```

    === "Dancelight TestNet"
        
        ```bash
        chown -R tanssi_service /var/lib/dancelight-data
        ```

4. Mova os binários para a pasta:

    === "Tanssi MainNet"

        ```bash
        mv ./tanssi-relay* /var/lib/tanssi-data
        ```

    === "Dancelight TestNet"
        
        ```bash
        mv ./tanssi-relay* /var/lib/dancelight-data
        ```
