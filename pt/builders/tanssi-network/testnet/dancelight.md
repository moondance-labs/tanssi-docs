---
title: Começar a usar o Dancelight
description: Dancelight é a Tanssi TestNet, e é a maneira mais fácil de começar a usar a Tanssi Network para implementar sua appchain compatível com Substrate ou EVM.
icon: octicons-star-24
---

# Começar a usar o Dancelight

## Introdução

Dancelight é a primeira Tanssi TestNet pública e foi projetada para otimizar a implantação de redes descentralizadas. Ela permite que as equipes embarquem e lancem rapidamente suas appchains em questão de minutos, fornecendo um ambiente robusto para testes e desenvolvimento.

Esta página de referência rápida oferece todos os elementos essenciais que você precisa para começar a usar o Dancelight.

## Tokens da TestNet {: #testnet-tokens }

Os tokens {{ networks.dancelight.token_symbol }} servem como a moeda nativa dentro da Tanssi Network. Para iniciar a implantação de uma rede no Dancelight, você precisará obter tokens {{ networks.dancelight.token_symbol }}. Siga estas etapas:

1. Visite o site [Tanssi Network](https://www.tanssi.network/claim-dance-tokens){target=\_blank}.
2. Preencha o formulário, fornecendo informações básicas e seu endereço baseado em Substrate.
3. Em até um dia útil após o envio do formulário, você receberá tokens {{ networks.dancelight.token_symbol }} para testes.

!!! nota
    Os tokens {{ networks.dancelight.token_symbol }} não têm valor. Por favor, não envie solicitações desnecessárias.

## Pontos de extremidade da rede {: #dancelight-network-endpoints }

Dancelight tem dois tipos de pontos de extremidade disponíveis para os usuários se conectarem: um para HTTPS e outro para WSS.

=== "HTTPS"

    ```text
    https://{{ networks.dancelight.dns_name }}
    ```

=== "WSS"

    ```text
    wss://{{ networks.dancelight.dns_name }}
    ```

## Exploradores de Blocos {: #dancelight-block-explorers }

Para o Dancelight, você pode usar os seguintes exploradores de blocos:

- [Subscan]({{ networks.dancelight.subscan_url }}){target=\_blank}.
- [O portal do desenvolvedor](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/explorer){target=\_blank}.

O suporte para exploradores de blocos adicionais está em andamento e, à medida que mais exploradores suportarem o Dancelight, esta seção será atualizada de acordo.
