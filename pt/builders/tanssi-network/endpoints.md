---
title: Network Endpoints
description: Tanssi networks have two endpoints available for users to connect to, one for HTTPS and one for WSS. This page has the RPC endpoints you need to get started.
icon: octicons-share-android-24
categories: Reference
---

## Pontos Finais da Rede

As redes Tanssi têm dois pontos finais disponíveis para os utilizadores se conectarem: um para HTTPS e outro para WSS.

## Tanssi MainNet

Os pontos finais HTTPS e WSS da Tanssi Network MainNet são os seguintes:

=== "HTTPS"

````
    ```text

https://{{ networks.mainnet.dns_name }}

    ```
````

=== "WSS"

    ```text
````

    ```
wss://{{ networks.mainnet.dns_name }}
```

````

## Dancelight

Os pontos finais HTTPS e WSS da Tanssi TestNet são os seguintes:
    ```text

=== "HTTPS"

    ```
````

```text
https://{{ networks.dancelight.dns_name }}
    ```text

````
    ```

=== "WSS"

````
```text

wss://{{ networks.dancelight.dns_name }}

```
````

    ```text
### Rede Demo EVM
    ```

Os pontos finais HTTPS e WSS da rede Demo EVM são os seguintes:

=== "HTTPS"

    ```text
````

    ```
{{ networks.dancelight.demo_evm_rpc_url }}
```

````

=== "WSS"

````

```text
{{ networks.dancelight.demo_evm_rpc_wss_url }}
```

````
