---
title: Executar um Nó Tanssi Usando Systemd
description: Aprenda como configurar e executar um Nó para as redes Tanssi usando Systemd, permitindo que você forneça endpoints de API para aplicações e usuários.
icon: simple-linux
categories: RPC-Data-Preservers
---

# Executar um Nó Tanssi Usando Systemd

## Introdução {: #introduction }

Neste guia, você aprenderá como iniciar um Nó Tanssi usando a versão de lançamento de arquivo binário estável mais recente e gerenciar o serviço usando [Systemd](https://systemd.io){target=\_blank} em sistemas Linux. Os nós fornecem endpoints de API essenciais para que aplicações e usuários interajam com a rede Tanssi.

O artigo segue a boa prática de executar o serviço com sua própria conta não-root e conceder a essa conta acesso de gravação a um diretório específico. No entanto, você pode adaptar as etapas e instruções deste artigo à configuração, preferências e políticas de segurança da sua infraestrutura.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para começar, você precisará de acesso a um computador executando um sistema operacional Ubuntu Linux com [Landlock](https://docs.kernel.org/security/landlock.html){target=\_blank} habilitado e privilégios de root. Você também precisará de:

- **Arquivos binários do Nó** - um nó requer três arquivos binários: `tanssi-relay`, `tanssi-relay-execute-worker` e `tanssi-relay-prepare-worker`
  \`\`

As instruções neste guia executam a versão estável oficial [mais recente](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank}. No entanto, você pode criar seu próprio arquivo compilando o [código-fonte](https://github.com/moondance-labs/tanssi){target=\_blank}.

## Verificar Suporte Landlock {: #check-landlock }

Os nós Tanssi usam o recurso Landlock do kernel Linux como uma medida de segurança para restringir o acesso a recursos do sistema, limitando os danos caso a aplicação seja comprometida.

Verifique o suporte ao recurso Landlock em seu sistema executando o seguinte comando:

```bash
```

A saída deve ser semelhante a:

--8<-- 'code/node-operators/terminal/check-landlock.md'

Se o Landlock estiver desabilitado em seu sistema, atualize o kernel para a versão 5.13 ou superior.

## Baixar a Versão Mais Recente {: #download-latest-release }

Para começar, baixe a versão binária mais recente e torne-a executável executando o seguinte comando:

--8<-- 'text/node-operators/pt/optimized-binaries-note.md'

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


--8<-- 'text/node-operators/pt/set-up-systemd-service.md'

--8<-- 'text/node-operators/pt/generate-node-keys-systemd.md'

--8<-- 'text/node-operators/pt/sequencers/onboarding/run-a-sequencer/generate-node-key-unsafe-note.md'

    ```bash
--8<-- 'text/node-operators/pt/create-systemd-config-file.md'
    ```



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
    ```

ExecStart=/var/lib/tanssi-data/tanssi-relay --chain=tanssi \
--8<-- 'code/node-operators/network-node/tanssi/systemd-command.md'

    ```bash
WantedBy=multi-user.target
```

````

=== "Dancelight TestNet"

````

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
    ```

KillSignal=SIGHUP
LimitNOFILE=100000
ExecStart=/var/lib/dancelight-data/tanssi-relay --chain=dancelight \
--8<-- 'code/node-operators/network-node/tanssi/systemd-command.md'

[Install]
WantedBy=multi-user.target

```
````

### Run Flags {: #run-flags }

As flags usados no comando `ExecStart` podem ser ajustadas de acordo com suas preferências e configuração de hardware. Os seguintes são alguns dos mais notáveis:

- **--state-pruning=archive** - mantém todos os dados de estado, o que é necessário para consultas de estado histórico
- **--blocks-pruning=archive** - mantém todos os blocos, necessário para dados de blocos históricos
- **--database=paritydb** - usa ParityDB como o back-end do banco de dados, que é otimizado para o desempenho do nó RPC

    ```bash

    ```

A flag `--unsafe-rpc-external` abre seu nó RPC para conexões externas. Em ambientes de produção, você deve implementar medidas de segurança adicionais, como um proxy reverso com limitação de taxa e autenticação.

Você pode visualizar todos os flags disponíveis executando:

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

```bash
````

```
--8<-- 'text/node-operators/pt/run-the-service-systemd.md'

--8<-- 'code/node-operators/network-node/rpc-systemd/terminal/check-status.md'

--8<-- 'text/node-operators/pt/check-logs-systemd.md'

## Testando Seu Nó {: #testing-your-rpc-node }

Depois que seu nó estiver totalmente sincronizado, você pode verificar se o endpoint RPC está funcionando corretamente, fazendo uma solicitação simples. Você pode usar curl para testar a conexão:

```bash

curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method":"chain_getHeader", "params":[]}' http://localhost:9944

```

Se o endpoint RPC estiver funcionando corretamente, você deverá receber uma resposta JSON contendo as informações do cabeçalho do bloco mais recente.
