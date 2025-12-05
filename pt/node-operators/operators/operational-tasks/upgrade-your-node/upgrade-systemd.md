---
title: Atualize seu Nó Operador Systemd
description: Siga estas instruções para atualizar seu nó operador Tanssi em execução via Systemd para a versão mais recente do software cliente Tanssi.
icon: simple-linux
categories: Operadores
---

# Atualize seu Nó em Execução via Systemd

## Introdução {: #introduction }

A manutenção do seu nó atualizado é uma parte importante de ser um operador Tanssi. Isso não só ajuda a garantir que seu nó permaneça saudável, mas também contribui para manter toda a Rede Tanssi funcionando sem problemas.

Este tutorial aborda a atualização do seu nó operador Tanssi que foi configurado usando o Systemd. Ele pressupõe que você já configurou sua conta e iniciou um [nó operador usando Systemd](/pt/node-operators/operators/onboarding/run-an-operator/operators-systemd/){target=\_blank}.

--8<-- 'text/pt/node-operators/github-release-notifications.md'

## Atualizando Seu Nó Systemd {: #upgrading-your-systemd-node }

Se você estiver executando seu operador via o serviço Systemd, você deve tomar medidas para atualizar seu nó corretamente. Em resumo, você precisará parar o serviço, substituir o binário Tanssi pela versão atualizada e reiniciar o serviço.

Você pode parar seu serviço Tanssi Systemd com o seguinte comando:

```bash
systemctl stop tanssi.service
```

Em seguida, navegue até o diretório onde seus binários Tanssi são armazenados e remova-os.

```bash
cd /var/lib/tanssi-data
```

Se você não alterou os nomes de arquivo binários Tanssi, eles serão nomeados `tanssi-relay`, `tanssi-relay-execute-worker` e `tanssi-relay-prepare-worker`. Caso contrário, você pode substituir `tanssi-relay*` no comando abaixo pelos nomes corretos de seus arquivos binários Tanssi.

```bash
rm tanssi-relay*
```

Para baixar a versão mais recente e alterar as permissões para que o serviço Tanssi possa usá-la, execute o comando correspondente ao seu ambiente:

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

Você pode reiniciar seu serviço Tanssi Systemd com o seguinte comando:

```bash
systemctl start tanssi.service
```

O nó retomará a sincronização de blocos de onde parou quando o serviço Systemd foi interrompido. Para verificar se está funcionando corretamente, você pode usar o seguinte comando para verificar os logs:

```bash
systemctl status tanssi.service
```

E é isso! Você atualizou com sucesso seu nó Tanssi.
