---
title: Executar um Nó Operador Usando Systemd
description: Aprenda como configurar e executar um nó operador (validador) para as redes Tanssi usando Systemd, permitindo que você participe do protocolo e ganhe recompensas.
icon: simple-linux
categories: Operators
---

# Executar um Nó Operador Usando Systemd

## Introdução {: #introduction }

Os operadores são um componente crucial do ecossistema Tanssi, fornecendo serviços de segurança e validação para as redes impulsionadas por Tanssi. Como operador, você participa do mecanismo de consenso que protege a rede, enquanto ganha recompensas por sua contribuição.

Como apresentado na [seção de integração](/node-operators/operators/onboarding/){target=\_blank}, executar o nó real é o primeiro passo para sua participação ativa no protocolo.

Neste guia, você aprenderá como iniciar um operador Tanssi usando a versão mais recente e estável do arquivo binário e gerenciar o serviço usando [Systemd](https://systemd.io){target=\_blank} em sistemas Linux.

O artigo segue a boa prática de executar o serviço com sua própria conta não-root e conceder a essa conta acesso de gravação a um diretório específico. No entanto, você pode adaptar as etapas e instruções deste artigo à configuração, preferências e políticas de segurança da sua infraestrutura.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para começar, você precisará de acesso a um computador executando um sistema operacional Ubuntu Linux com [Landlock](https://docs.kernel.org/security/landlock.html){target=\_blank} habilitado e privilégios de root. Você também precisará:

- **Arquivos binários do nó** - um operador precisa de três arquivos binários: `tanssi-relay`, `tanssi-relay-execute-worker` e `tanssi-relay-prepare-worker`.

As instruções neste guia executam a versão estável oficial [mais recente](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank}. No entanto, você pode construir seu próprio arquivo compilando o [código fonte](https://github.com/moondance-labs/tanssi){target=\_blank}.

## Verificar Suporte Landlock {: #check-landlock }

Os operadores Tanssi usam o recurso Landlock do kernel Linux como uma medida de segurança para restringir seu próprio acesso aos recursos do sistema, limitando os danos se o aplicativo for comprometido.

Verifique o suporte ao recurso Landlock em seu sistema executando o seguinte comando:

```bash
```

A saída deve ser semelhante a:

--8\<-- 'code/node-operators/terminal/check-landlock.md'

Se o Landlock estiver desabilitado em seu sistema, atualize o kernel para a versão 5.13 ou superior.

## Baixar a Versão Mais Recente {: #download-latest-release }

Para começar, faça o download da versão binária mais recente e torne-a executável executando o seguinte comando:

--8\<-- 'text/node-operators/optimized-binaries-note.md'

=== "Genérico"

````
    ```bash

wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay && \
wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker && \
wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker && \
chmod +x ./tanssi-relay*

    ```
````

=== "Intel Skylake"

    ```bash
````

```bash
wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-skylake -O tanssi-relay && \
wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker-skylake -O tanssi-relay-execute-worker && \
    ```

chmod +x ./tanssi-relay*

```
````

    ```bash
=== "AMD Zen3"

````

```bash
    ```

wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-execute-worker-znver3 -O tanssi-relay-execute-worker && \
wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.client_version }}/tanssi-relay-prepare-worker-znver3 -O tanssi-relay-prepare-worker && \
chmod +x ./tanssi-relay*

```
````

--8\<-- 'text/node-operators/set-up-systemd-service.md'

--8\<-- 'text/node-operators/generate-node-keys-systemd.md'

--8\<-- 'text/node-operators/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

    ```bash
--8\<-- 'text/node-operators/create-systemd-config-file.md'

=== "Tanssi MainNet"

````

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
    ```

ExecStart=/var/lib/tanssi-data/tanssi-relay --chain=tanssi \
--8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-systemd/systemd-command.md'

    ```bash
WantedBy=multi-user.target
```

````

=== "Dancelight TestNet"

````

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
    ```

KillSignal=SIGHUP
LimitNOFILE=100000
ExecStart=/var/lib/tanssi-data/tanssi-relay --chain=dancelight \
--8<-- 'code/node-operators/operators/onboarding/run-an-operator/operators-systemd/systemd-command.md'

[Install]
WantedBy=multi-user.target

```
````

    ```bash
### Run Flags {: #run-flags }
    ```

As flags usadas no comando `ExecStart` podem ser ajustadas de acordo com suas preferências e configuração de hardware. Os seguintes são alguns dos mais notáveis:

--8\<-- 'text/node-operators/network-node/run-flags.md'

    ```bash
=== "Tanssi MainNet"
    ```

````
```bash

/var/lib/tanssi-data/tanssi-relay --help

```
````

=== "Dancelight TestNet"

````
```bash

/var/lib/dancelight-data/tanssi-relay --help

```
````

--8\<-- 'text/node-operators/run-the-service-systemd.md'

--8\<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

--8\<-- 'text/node-operators/check-logs-systemd.md'
