---
title: Atualize seu Nó Systemd Sequencer
description: Siga estas instruções para atualizar seu nó sequencer Tanssi em execução via Systemd para a versão mais recente do software cliente Tanssi.
icon: simple-linux
categories: Sequencers
---

# Atualize seu Nó em Execução via Systemd

## Introdução {: #introduction }

Manter seu nó atualizado é uma parte importante de ser um sequencer Tanssi. Isso não só ajuda a garantir que seu nó sequencer permaneça saudável, como também contribui para manter toda a Rede Tanssi funcionando sem problemas.

Este tutorial aborda a atualização do seu nó sequencer Tanssi que foi configurado usando o Systemd. Ele pressupõe que você já configurou sua conta e lançou um [nó sequencer usando Systemd](/pt/node-operators/sequencers/onboarding/run-a-sequencer/sequencers-systemd/){target=\_blank}.

--8<-- 'text/pt/node-operators/github-release-notifications.md'

## Atualizando seu Nó Systemd {: #upgrading-your-systemd-node }

Se você estiver executando seu sequencer através do serviço Systemd, você precisará seguir algumas etapas para atualizar corretamente seu nó. Em suma, você precisará parar o serviço, substituir o binário Tanssi pela versão atualizada e, em seguida, iniciar o serviço.

Você pode parar seu serviço Tanssi Systemd com o seguinte comando:

```bash
systemctl stop tanssi.service
```

Em seguida, navegue até o diretório onde seu binário Tanssi está armazenado e remova-o.

```bash
cd /var/lib/tanssi-data
```

Seu arquivo binário Tanssi provavelmente será nomeado `tanssi-node`. Caso contrário, você pode substituir `tanssi-node` abaixo pelo nome correto do seu arquivo binário Tanssi.

```bash
rm tanssi-node
```

Para baixar a versão mais recente e alterar as permissões para que o serviço Tanssi possa usá-la, execute o seguinte comando que corresponde ao seu ambiente:

=== "Genérico"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "Intel Skylake"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-skylake -O tanssi-node && \
    chmod +x ./tanssi-node
    ```

=== "AMD Zen3"

    ```bash
    wget https://github.com/moondance-labs/tanssi/releases/download/{{ node_versions.para_client_version }}/tanssi-node-znver3 -O tanssi-node && \
    chmod +x ./tanssi-node
    ```

Você pode reiniciar seu serviço Tanssi Systemd com o seguinte comando:

```bash
systemctl start tanssi.service
```

O nó retomará a sincronização de blocos de onde parou quando o serviço Systemd foi interrompido. Para verificar se está funcionando corretamente, você pode usar o seguinte comando para verificar os logs:

```bash
systemctl status tanssi.service
```

E é isso! Você atualizou seu nó Tanssi com sucesso.
