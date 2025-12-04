---
title: Executar um Nó Tanssi Usando Systemd
description: Aprenda a configurar e executar um Nó para as redes Tanssi usando Systemd, permitindo fornecer endpoints de API para aplicações e usuários.
icon: simple-linux
categories: RPC-Data-Preservers
---

# Executar um Nó Tanssi Usando Systemd

## Introdução {: #introduction }

Neste guia, você aprenderá a iniciar um Nó Tanssi usando o binário estável mais recente e gerenciar o serviço com [Systemd](https://systemd.io){target=_blank} em sistemas Linux. Os nós fornecem endpoints de API essenciais para que aplicações e usuários interajam com a rede Tanssi.

O artigo segue a boa prática de executar o serviço com uma conta não-root e conceder a essa conta acesso de gravação a um diretório específico. Você pode adaptar as etapas à sua configuração, preferências e políticas de segurança.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para começar, você precisará de acesso a um computador executando Ubuntu Linux com [Landlock](https://docs.kernel.org/security/landlock.html){target=_blank} habilitado e privilégios de root. Você também precisará de:

- **Arquivos binários do Nó** - um nó requer três binários: `tanssi-relay`, `tanssi-relay-execute-worker` e `tanssi-relay-prepare-worker`

As instruções executam a [versão estável mais recente](https://github.com/moondance-labs/tanssi/releases/latest){target=_blank}. Você pode compilar seu próprio arquivo a partir do [código-fonte](https://github.com/moondance-labs/tanssi){target=_blank}.

## Verificar Suporte Landlock {: #check-landlock }

Os nós Tanssi usam o recurso Landlock do kernel Linux como medida de segurança para restringir acesso a recursos do sistema, limitando danos caso o aplicativo seja comprometido.

Verifique o suporte Landlock executando:

```bash
sudo dmesg | grep landlock || journalctl -kg landlock
```

Saída esperada:

--8<-- 'code/node-operators/terminal/check-landlock.md'

Se o Landlock estiver desabilitado, atualize o kernel para a versão 5.13 ou superior.

## Baixar a Versão Mais Recente {: #download-latest-release }

Baixe o binário mais recente e torne-o executável:

--8<-- 'text/pt/node-operators/optimized-binaries-note.md'

=== "Genérico"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-skylake -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker-skylake -O tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker-skylake -O tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-znver3 -O tanssi-relay && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker-znver3 -O tanssi-relay-execute-worker && \
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker-znver3 -O tanssi-relay-prepare-worker && \
    chmod +x ./tanssi-relay*
    ```

--8<-- 'text/pt/node-operators/set-up-systemd-service.md'

--8<-- 'text/pt/node-operators/generate-node-keys-systemd.md'

--8<-- 'text/pt/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

--8<-- 'text/pt/node-operators/create-systemd-config-file.md'

=== "Tanssi MainNet"

    ```bash
    [Unit]
    Description="Serviço systemd Tanssi"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    User=tanssi_service
    Type=simple
    Restart=always
    RestartSec=10
    SyslogIdentifier=tanssi
    SyslogFacility=local7
    KillSignal=SIGHUP
    LimitNOFILE=100000
    ExecStart=/var/lib/tanssi-data/tanssi-relay --chain=tanssi \
    --8<-- 'code/node-operators/network-node/tanssi/systemd-command.md'

    [Install]
    WantedBy=multi-user.target
    ```

=== "Dancelight TestNet"

    ```bash
    [Unit]
    Description="Serviço systemd Dancelight"
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    User=dancelight_service
    Type=simple
    Restart=always
    RestartSec=10
    SyslogIdentifier=dancelight
    SyslogFacility=local7
    KillSignal=SIGHUP
    LimitNOFILE=100000
    ExecStart=/var/lib/dancelight-data/tanssi-relay --chain=dancelight \
    --8<-- 'code/node-operators/network-node/tanssi/systemd-command.md'

    [Install]
    WantedBy=multi-user.target
    ```

### Flags de Execução {: #run-flags }

As flags usadas no `ExecStart` podem ser ajustadas conforme suas preferências e hardware. Algumas das principais:

- **--state-pruning=archive** - mantém todos os dados de estado (necessário para consultas históricas)
- **--blocks-pruning=archive** - mantém todos os blocos (necessário para dados históricos de blocos)
- **--database=paritydb** - usa ParityDB como back-end otimizado para desempenho de nó RPC
- **--unsafe-rpc-external** - permite conexões externas ao RPC; requer medidas adicionais de segurança em produção (proxy reverso, autenticação, firewall)

!!! atenção
    A flag `--unsafe-rpc-external` expõe o RPC externamente. Em produção, proteja com firewall, proxy reverso, autenticação e limitação de taxa.

Você pode visualizar todas as flags disponíveis executando:

=== "Tanssi MainNet"

    ```bash
    /var/lib/tanssi-data/tanssi-relay --help
    ```

=== "Dancelight TestNet"

    ```bash
    /var/lib/dancelight-data/tanssi-relay --help
    ```

--8<-- 'text/pt/node-operators/run-the-service-systemd.md'

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

--8<-- 'text/pt/node-operators/check-logs-systemd.md'

## Testando Seu Nó {: #testing-your-rpc-node }

Depois que seu nó estiver totalmente sincronizado, você pode verificar se o endpoint RPC está funcionando corretamente fazendo uma solicitação simples. Use curl para testar:

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944
```

Se o endpoint RPC estiver funcionando, você receberá uma resposta JSON contendo as informações do cabeçalho do bloco mais recente.
