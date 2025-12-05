---
title: Executar um Nó Tanssi
description: Aprenda como configurar e executar um nó Tanssi usando Docker ou Systemd para interagir com a rede Tanssi.
icon: octicons-server-24
template: index-page.html
categories: RPC-Data-Preservers
---

# Executar um Nó Tanssi

A configuração de um Nó Tanssi é um passo importante para interagir e consultar a rede Tanssi. Você tem duas opções de configuração: usar _Docker_ ou _Systemd_. Seja qual for o caminho escolhido, oferecemos tutoriais passo a passo para orientá-lo durante o processo.

## Requisitos de Hardware

O hardware adequado é essencial para executar um nó Tanssi com sucesso. Uma configuração de alto desempenho garante um serviço confiável e resposta rápida às consultas.

Hardware recomendado:

- **Configuração Recomendada** - hardware bare metal executando Linux Debian ou Ubuntu
- **CPUs Recomendados** - Intel Ice Lake ou mais recente (Xeon ou série Core), AMD Zen3 ou mais recente (EPYC ou Ryzen). Oito núcleos físicos @ 3,4 GHz com hyperthreading desabilitado (SMT para processadores AMD)
- **NVMe Recomendado** - SSD NVMe de 500 GB
- **RAM Recomendada** - 32 GB de RAM ECC
- **Rede Recomendada** - conexão de 1 Gbps

!!! atenção
    Manter o desempenho do seu Nó Tanssi, mantê-lo atualizado e garantir sua segurança são cruciais para uma operação confiável.

### Portas de Rede Necessárias

Para garantir a comunicação adequada com a rede Tanssi, certifique-se de que a seguinte porta esteja aberta para conexões de entrada:

| Rede          | Porta        |
|------------------|-------------|
| Tanssi Chain     | 30333 (TCP) |

## Explore esta seção

:::INSERT_GENERATED_CARDS:::
