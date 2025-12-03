---
title: Run a Tanssi Sequencer
description: Learn how to set up and run a sequencer (block producer) node for Tanssi networks using Systemd, allowing you to participate in the protocol and earn rewards.
icon: simple-linux
categories: Sequencers
---

````json
{
  "source_path": "node-operators/sequencers/onboarding/run-a-sequencer/sequencers-systemd.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "8f8fbab4005edbfd2f13ef297384023bbf7e2289972c0aea94c2aca9b3395e3c",
  "content": "--- \ntitle: Run a Tanssi Sequencer\ndescription: Learn how to set up and run a sequencer (block producer) node for Tanssi networks using Systemd, allowing you to participate in the protocol and earn rewards.\nicon: simple-linux\ncategories: Sequencers\n---\n\n# Execute um Sequencer Node Usando Systemd\n\n## Introdução {: #introduction }\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/intro.md'\n\nNeste guia, você aprenderá como iniciar um sequencer Tanssi para fazer parte do pool compartilhado de sequencers usando a última versão estável do arquivo binário e gerenciando o serviço com [Systemd](https://systemd.io){target=\\_blank} em sistemas Linux.\n\nO artigo segue a boa prática de executar o serviço com sua própria conta não root e conceder a essa conta acesso de gravação a um diretório específico. No entanto, você pode adaptar as etapas e instruções deste artigo para a configuração, preferências e políticas de segurança da sua infraestrutura.\n\n## Verificando os Pré-requisitos {: #checking-prerequisites }\n\nPara começar, você precisará de acesso a um computador executando um Sistema Operacional Ubuntu Linux e privilégios de root. Você também precisará:\n\n- **Arquivo binário do nó** - as instruções neste guia executam a [última](https://github.com/moondance-labs/tanssi/releases/latest){target=\\_blank} versão estável oficial `tanssi-node`. No entanto, você pode criar seu próprio arquivo compilando o [código fonte](https://github.com/moondance-labs/tanssi){target=\\_blank}\n- **Arquivo de especificações da cadeia Tanssi** - o arquivo de especificação da cadeia Tanssi pode ser baixado deste [repositório público do GitHub](https://github.com/papermoonio/external-files/blob/main/Tanssi/Dancelight){target=\\_blank}\n\n## Baixar a Versão Mais Recente {: #download-latest-release }\n\nPara começar, baixe e torne executável a versão binária mais recente executando o seguinte comando:\n\n--8<-- 'text/node-operators/pt/optimized-binaries-note.md'\n\n=== \"Tanssi MainNet\"\n\n    === \"Generic\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"Intel Skylake\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-skylake -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"AMD Zen3\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n    \n=== \"Dancelight TestNet\"\n    \n    === \"Generic\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"Intel Skylake\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-skylake -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"AMD Zen3\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/download-specs.md'\n\n--8<-- 'text/node-operators/pt/appchains-systemd-data-directory.md'\n\nE, por fim, mova o binário para a pasta:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    mv ./tanssi-node /var/lib/tanssi-data\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    mv ./tanssi-node /var/lib/dancelight-data\n    ```\n\n### Gerar a Chave do Nó {: #generate-node-key }\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/generate-node-key-intro.md'\n\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    /var/lib/tanssi-data/tanssi-node key generate-node-key --file /var/lib/tanssi-data/node-key\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    /var/lib/dancelight-data/tanssi-node key generate-node-key --file /var/lib/dancelight-data/node-key\n    ```\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'\n\n### Criar o Arquivo de Configuração do Serviço Systemd {: #create-systemd-configuration }\n\nA próxima etapa é criar o arquivo de configuração do Systemd.\n\nVocê pode criar o arquivo executando o seguinte comando:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    sudo touch /etc/systemd/system/tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    sudo touch /etc/systemd/system/dancelight.service\n    ```\n\nAgora você pode abrir o arquivo usando seu editor de texto favorito (vim, emacs, nano, etc.) e adicionar a configuração para o serviço, substituindo as tags `INSERT_YOUR_TANSSI_NODE_NAME` e `INSERT_YOUR_SEQUENCER_NODE_NAME` por um texto legível por humanos nas flags `--name`. Esses nomes serão úteis para conectar as entradas de registro e métricas com o nó que as gera.\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    [Unit]\n    Description=\"Serviço systemd Tanssi\"\n    After=network.target\n    StartLimitIntervalSec=0\n\n    [Service]\n    Type=simple\n    Restart=on-failure\n    RestartSec=10\n    User=tanssi_service\n    SyslogIdentifier=tanssi\n    SyslogFacility=local7\n    KillSignal=SIGHUP\n    ExecStart=/var/lib/tanssi-data/tanssi-node solo-chain \\\n    --name=INSERT_YOUR_SEQUENCER_NODE_NAME \\\n    --base-path=/var/lib/tanssi-data/container \\\n    --node-key-file=/var/lib/tanssi-data/node-key \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --pool-type=fork-aware \\\n    --database=paritydb \\\n    --rpc-port=9944 \\\n    --prometheus-port=9615 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30333 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --db-cache=1024 \\\n    --trie-cache-size=1073741824 \\\n    --collator \\\n    --in-peers=100 \\\n    --detailed-log-output \\\n    -- \\\n    --chain=/var/lib/tanssi-data/starlight-raw-specs.json \\\n    --name=INSERT_YOUR_TANSSI_NODE_NAME \\\n    --sync=fast \\\n    --base-path=/var/lib/tanssi-data/relay \\\n    --node-key-file=/var/lib/tanssi-data/node-key \\\n    --keystore-path=/var/lib/tanssi-data/session \\\n    --database=paritydb \\\n    --rpc-port=9945 \\\n    --prometheus-port=9616 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30334 \\\n    --pool-limit=0 \\\n    --db-cache=128 \\\n    --out-peers=15 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --bootnodes=/dns4/deo-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWNQ1cddxwvnZZUBG2gtByn9hirVGEn2yR37ztnGSi1VHu \\\n    --bootnodes=/dns4/fro-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWS3kv4PyNTxKS8CBxZsVrhMcNcXgxqVUHLrXixuz4DaSR \\\n    --bootnodes=/dns4/qcl-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWFDUJ1QZn18tmeJJZU4e6JbyQrLiAp4Xz7ongKzoSjadg \\\n    --bootnodes=/dns4/qco-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWBzJzAdAKNVXcsvfL3nHH8BSocNvxz7A8PkRAAJhTuQNm \\\n    --bootnodes=/dns4/uko-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWAexWR4uyhVPyxqPBNhhepJ5jRqUa885mu5dKPPVHSfpC\n\n    [Install]\n    WantedBy=multi-user.target\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    [Unit]\n    Description=\"Serviço systemd Dancelight\"\n    After=network.target\n    StartLimitIntervalSec=0\n\n    [Service]\n    Type=simple\n    Restart=on-failure\n    RestartSec=10\n    User=dancelight_service\n    SyslogIdentifier=dancelight\n    SyslogFacility=local7\n    KillSignal=SIGHUP\n    ExecStart=/var/lib/dancelight-data/tanssi-node solo-chain \\\n    --name=INSERT_YOUR_SEQUENCER_NODE_NAME \\\n    --base-path=/var/lib/dancelight-data/container \\\n    --node-key-file=/var/lib/dancelight-data/node-key \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --pool-type=fork-aware \\\n    --database=paritydb \\\n    --rpc-port=9944 \\\n    --prometheus-port=9615 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30333 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --db-cache=1024 \\\n    --trie-cache-size=1073741824 \\\n    --collator \\\n    --in-peers=100 \\\n    --detailed-log-output \\\n    -- \\\n    --chain=/var/lib/dancelight-data/dancelight-raw-specs.json \\\n    --name=INSERT_YOUR_TANSSI_NODE_NAME \\\n    --sync=fast \\\n    --base-path=/var/lib/dancelight-data/relay \\\n    --node-key-file=/var/lib/dancelight-data/node-key \\\n    --keystore-path=/var/lib/dancelight-data/session \\\n    --database=paritydb \\\n    --rpc-port=9945 \\\n    --prometheus-port=9616 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30334 \\\n    --pool-limit=0 \\\n    --db-cache=128 \\\n    --out-peers=15 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \\\n    --bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \\\n    --bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT\n\n    [Install]\n    WantedBy=multi-user.target\n    ```\n\n### Sinalizadores de Execução {: #run-flags }\n\nAs flags usadas no comando ExecStart podem ser ajustadas de acordo com suas preferências e configuração de hardware. As seguintes são algumas das mais notáveis:\n\n--8<-- 'text/node-operators/pt/network-node/run-flags.md'\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    /var/lib/tanssi-data/tanssi-node  --help\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    /var/lib/dancelight-data/tanssi-node  --help\n    ```\n\n## Executar o Serviço {: #run-the-service }\n\nFinalmente, ative o serviço e inicie-o pela primeira vez:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    systemctl enable tanssi.service && \\\n    systemctl start tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    systemctl enable dancelight.service && \\\n    systemctl start dancelight.service\n    ```\n\nVocê pode verificar se o serviço está funcionando corretamente executando:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    systemctl status tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    systemctl status dancelight.service\n    ```\n\n--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'\n\nE verifique os logs, se necessário, com o seguinte comando:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    journalctl -f -u tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    journalctl -f -u dancelight.service\n    ```\n",
  "translated_content": "--- \ntitle: Execute um Sequencer Tanssi\ndescrição: Aprenda como configurar e executar um nó de sequencer (produtor de blocos) para as redes Tanssi usando o Systemd, permitindo que você participe do protocolo e ganhe recompensas.\nicon: simple-linux\ncategories: Sequencers\n---\n\n# Execute um Nó de Sequencer Usando o Systemd\n\n## Introdução {: #introduction }\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/intro.md'\n\nNeste guia, você aprenderá como iniciar um sequencer Tanssi para fazer parte do conjunto compartilhado de sequencers usando a versão binária estável mais recente do arquivo e gerenciando o serviço com [Systemd](https://systemd.io){target=\\_blank} em sistemas Linux.\n\nEste artigo segue a boa prática de executar o serviço com sua própria conta não root e conceder a essa conta acesso de escrita a um diretório específico. No entanto, você pode adaptar as etapas e instruções deste artigo à configuração, preferências e políticas de segurança da sua infraestrutura.\n\n## Verificando os Pré-requisitos {: #checking-prerequisites }\n\nPara começar, você precisará de acesso a um computador executando um Sistema Operacional Ubuntu Linux e privilégios de root. Você também precisará:\n\n- **Arquivo binário do nó** - as instruções neste guia executam a [última](https://github.com/moondance-labs/tanssi/releases/latest){target=\\_blank} versão oficial estável `tanssi-node`. No entanto, você pode criar seu próprio arquivo compilando o [código-fonte](https://github.com/moondance-labs/tanssi){target=\\_blank}\n- **Arquivo de especificações da cadeia Tanssi** - o arquivo de especificações da cadeia Tanssi pode ser baixado deste [repositório público do GitHub](https://github.com/papermoonio/external-files/blob/main/Tanssi/Dancelight){target=\\_blank}\n\n## Baixar a Versão Mais Recente {: #download-latest-release }\n\nPara começar, baixe e execute a versão binária mais recente executando o seguinte comando:\n\n--8<-- 'text/node-operators/pt/optimized-binaries-note.md'\n\n=== \"Tanssi MainNet\"\n\n    === \"Genérico\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"Intel Skylake\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-skylake -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"AMD Zen3\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n    \n=== \"Dancelight TestNet\"\n    \n    === \"Genérico\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"Intel Skylake\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-skylake -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n    === \"AMD Zen3\"\n\n        ```bash\n        wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \\\n        chmod +x ./tanssi-node\n        ```\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/download-specs.md'\n\n--8<-- 'text/node-operators/pt/appchains-systemd-data-directory.md'\n\nE, finalmente, mova o binário para a pasta:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    mv ./tanssi-node /var/lib/tanssi-data\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    mv ./tanssi-node /var/lib/dancelight-data\n    ```\n\n### Gerar a Chave do Nó {: #generate-node-key }\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/generate-node-key-intro.md'\n\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    /var/lib/tanssi-data/tanssi-node key generate-node-key --file /var/lib/tanssi-data/node-key\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    /var/lib/dancelight-data/tanssi-node key generate-node-key --file /var/lib/dancelight-data/node-key\n    ```\n\n--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'\n\n### Criar o Arquivo de Configuração do Serviço Systemd {: #create-systemd-configuration }\n\nA próxima etapa é criar o arquivo de configuração do Systemd.\n\nVocê pode criar o arquivo executando o seguinte comando:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    sudo touch /etc/systemd/system/tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    sudo touch /etc/systemd/system/dancelight.service\n    ```\n\nAgora você pode abrir o arquivo usando seu editor de texto favorito (vim, emacs, nano, etc.) e adicionar a configuração para o serviço, substituindo as tags `INSERT_YOUR_TANSSI_NODE_NAME` e `INSERT_YOUR_SEQUENCER_NODE_NAME` por um texto legível por humanos nas flags `--name`. Esses nomes serão úteis para conectar as entradas de log e métricas com o nó que as gera.\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    [Unit]\n    Description=\"Serviço systemd Tanssi\"\n    After=network.target\n    StartLimitIntervalSec=0\n\n    [Service]\n    Type=simple\n    Restart=on-failure\n    RestartSec=10\n    User=tanssi_service\n    SyslogIdentifier=tanssi\n    SyslogFacility=local7\n    KillSignal=SIGHUP\n    ExecStart=/var/lib/tanssi-data/tanssi-node solo-chain \\\n    --name=INSERT_YOUR_SEQUENCER_NODE_NAME \\\n    --base-path=/var/lib/tanssi-data/container \\\n    --node-key-file=/var/lib/tanssi-data/node-key \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --pool-type=fork-aware \\\n    --database=paritydb \\\n    --rpc-port=9944 \\\n    --prometheus-port=9615 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30333 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --db-cache=1024 \\\n    --trie-cache-size=1073741824 \\\n    --collator \\\n    --in-peers=100 \\\n    --detailed-log-output \\\n    -- \\\n    --chain=/var/lib/tanssi-data/starlight-raw-specs.json \\\n    --name=INSERT_YOUR_TANSSI_NODE_NAME \\\n    --sync=fast \\\n    --base-path=/var/lib/tanssi-data/relay \\\n    --node-key-file=/var/lib/tanssi-data/node-key \\\n    --keystore-path=/var/lib/tanssi-data/session \\\n    --database=paritydb \\\n    --rpc-port=9945 \\\n    --prometheus-port=9616 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30334 \\\n    --pool-limit=0 \\\n    --db-cache=128 \\\n    --out-peers=15 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --bootnodes=/dns4/deo-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWNQ1cddxwvnZZUBG2gtByn9hirVGEn2yR37ztnGSi1VHu \\\n    --bootnodes=/dns4/fro-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWS3kv4PyNTxKS8CBxZsVrhMcNcXgxqVUHLrXixuz4DaSR \\\n    --bootnodes=/dns4/qcl-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWFDUJ1QZn18tmeJJZU4e6JbyQrLiAp4Xz7ongKzoSjadg \\\n    --bootnodes=/dns4/qco-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWBzJzAdAKNVXcsvfL3nHH8BSocNvxz7A8PkRAAJhTuQNm \\\n    --bootnodes=/dns4/uko-tanssi-boot-1.rv.tanssi.network/tcp/30334/p2p/12D3KooWAexWR4uyhVPyxqPBNhhepJ5jRqUa885mu5dKPPVHSfpC\n\n    [Install]\n    WantedBy=multi-user.target\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    [Unit]\n    Description=\"Serviço systemd Dancelight\"\n    After=network.target\n    StartLimitIntervalSec=0\n\n    [Service]\n    Type=simple\n    Restart=on-failure\n    RestartSec=10\n    User=dancelight_service\n    SyslogIdentifier=dancelight\n    SyslogFacility=local7\n    KillSignal=SIGHUP\n    ExecStart=/var/lib/dancelight-data/tanssi-node solo-chain \\\n    --name=INSERT_YOUR_SEQUENCER_NODE_NAME \\\n    --base-path=/var/lib/dancelight-data/container \\\n    --node-key-file=/var/lib/dancelight-data/node-key \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --pool-type=fork-aware \\\n    --database=paritydb \\\n    --rpc-port=9944 \\\n    --prometheus-port=9615 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30333 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --db-cache=1024 \\\n    --trie-cache-size=1073741824 \\\n    --collator \\\n    --in-peers=100 \\\n    --detailed-log-output \\\n    -- \\\n    --chain=/var/lib/dancelight-data/dancelight-raw-specs.json \\\n    --name=INSERT_YOUR_TANSSI_NODE_NAME \\\n    --sync=fast \\\n    --base-path=/var/lib/dancelight-data/relay \\\n    --node-key-file=/var/lib/dancelight-data/node-key \\\n    --keystore-path=/var/lib/dancelight-data/session \\\n    --database=paritydb \\\n    --rpc-port=9945 \\\n    --prometheus-port=9616 \\\n    --prometheus-external \\\n    --listen-addr=/ip4/0.0.0.0/tcp/30334 \\\n    --pool-limit=0 \\\n    --db-cache=128 \\\n    --out-peers=15 \\\n    --state-pruning=2000 \\\n    --blocks-pruning=2000 \\\n    --telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \\\n    --bootnodes=/dns4/qco-dancelight-boot-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWCekAqk5hv2fZprhqVz8povpUKdJEiHSd3MALVDWNPFzY \\\n    --bootnodes=/dns4/qco-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWEwhUb3tVR5VhRBEqyH7S5hMpFoGJ9Anf31hGw7gpqoQY \\\n    --bootnodes=/dns4/ukl-dancelight-rpc-1.rv.dancelight.tanssi.network/tcp/30334/p2p/12D3KooWPbVtdaGhcuDTTQ8giTUtGTEcUVWRg8SDWGdJEeYeyZcT\n\n    [Install]\n    WantedBy=multi-user.target\n    ```\n\n### Sinalizadores de Execução {: #run-flags }\n\nAs flags usadas no comando ExecStart podem ser ajustadas de acordo com suas preferências e configuração de hardware. As seguintes são algumas das mais notáveis:\n\n--8<-- 'text/node-operators/pt/network-node/run-flags.md'\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    /var/lib/tanssi-data/tanssi-node  --help\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    /var/lib/dancelight-data/tanssi-node  --help\n    ```\n\n## Executar o Serviço {: #run-the-service }\n\nFinalmente, ative o serviço e inicie-o pela primeira vez:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    systemctl enable tanssi.service && \\\n    systemctl start tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    systemctl enable dancelight.service && \\\n    systemctl start dancelight.service\n    ```\n\nVocê pode verificar se o serviço está funcionando corretamente executando:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    systemctl status tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    systemctl status dancelight.service\n    ```\n\n--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'\n\nE verifique os logs, se necessário, com o seguinte comando:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    journalctl -f -u tanssi.service\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n




















        ```bash


        ```



        ```bash


        ```



        ```bash


        ```





        ```bash


        ```



        ```bash


        ```



        ```bash


        ```









    ```bash

    ```



    ```bash

    ```








    ```bash

    ```



    ```bash

    ```











    ```bash

    ```



    ```bash

    ```





    ```bash

























































    ```



    ```bash























































    ```









    ```bash

    ```



    ```bash

    ```







    ```bash


    ```



    ```bash


    ```





    ```bash

    ```



    ```bash

    ```







    ```bash

    ```



    ```bash

    ```
````
