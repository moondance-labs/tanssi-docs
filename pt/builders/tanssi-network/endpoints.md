---
title: Endpoints da Rede
description: As redes Tanssi têm dois endpoints disponíveis para os usuários se conectarem, um para HTTPS e outro para WSS. Esta página traz os endpoints RPC de que você precisa para começar.
icon: octicons-share-android-24
categories: Reference
---

## Pontos Finais da Rede

As redes Tanssi têm dois pontos finais disponíveis para os utilizadores se conectarem: um para HTTPS e outro para WSS.

## MainNet Tanssi 

Os pontos finais HTTPS e WSS da Tanssi Network MainNet são os seguintes:

=== "HTTPS"

    ```text
    https://{{ networks.mainnet.dns_name }}
    ```

=== "WSS"

    ```text
    wss://{{ networks.mainnet.dns_name }}
    ```


## Dancelight

Os pontos finais HTTPS e WSS da Tanssi TestNet são os seguintes:

=== "HTTPS"

    ```text
    https://{{ networks.dancelight.dns_name }}
    ```

=== "WSS"

    ```text
    wss://{{ networks.dancelight.dns_name }}
    ```

### Rede Demo EVM

Os pontos finais HTTPS e WSS da rede Demo EVM são os seguintes:

=== "HTTPS"

    ```text
    {{ networks.dancelight.demo_evm_rpc_url }}
    ```

=== "WSS"

    ```text
    {{ networks.dancelight.demo_evm_rpc_wss_url }}
    ```
