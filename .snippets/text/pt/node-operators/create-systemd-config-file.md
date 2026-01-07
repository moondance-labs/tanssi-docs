### Criar o arquivo de configuração do Systemd {: #create-systemd-configuration }

O próximo passo é criar o arquivo de configuração do Systemd.

Crie o arquivo executando o comando:

=== "Tanssi MainNet"

    ```bash
    sudo touch /etc/systemd/system/tanssi.service
    ```

=== "Dancelight TestNet"
    
    ```bash
    sudo touch /etc/systemd/system/dancelight.service
    ```

Agora abra o arquivo com seu editor favorito (vim, emacs, nano etc.) e adicione a configuração do serviço, substituindo a tag `INSERT_YOUR_TANSSI_NODE_NAME` por um nome legível e `INSERT_YOUR_IP_ADDRESS` pelo seu endereço IP público. Esse nome ajuda a relacionar entradas de log e métricas ao nó que as gera.
