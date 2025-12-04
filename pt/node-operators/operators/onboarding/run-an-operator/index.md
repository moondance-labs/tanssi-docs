---
title: Executar um Operador
description: Aprenda como configurar e executar um nó operador (também conhecido como validadores) usando Docker ou Systemd para participar do protocolo que protege o ecossistema.
icon: octicons-server-24
template: index-page.html
---

# Executar um Nó Operador

A configuração de um nó operador é um passo importante para participar da rede Tanssi. Você tem duas opções de configuração: usar _Docker_ ou _Systemd._ Qualquer que seja o caminho que você escolher, fornecemos tutoriais passo a passo para guiá-lo pelo processo e garantir que seu nó atenda aos requisitos necessários para validar as transações da rede Tanssi e fornecer segurança ao ecossistema.

### Requisitos de Hardware

Para executar um nó operador com sucesso, hardware de alto desempenho é essencial. Configurações subótimas podem levar a atrasos, indisponibilidade e, por fim, perdas de recompensas e/ou penalidades. Como o processo de validação depende muito do desempenho de um único thread, é recomendável priorizar CPUs com fortes capacidades de um único thread em vez de contagens de núcleos mais altas.

Hardware recomendado:

- **Configuração Recomendada** - Hardware bare metal executando linux debian ou ubuntu
- **CPUs Recomendadas** - Intel Ice Lake ou mais recente (série Xeon ou Core) ou AMD Zen3 ou mais recente (EPYC ou Ryzen). Oito núcleos físicos @ 3,4 GHz com hyperthreading desativado (SMT para processadores AMD)
- **NVMe Recomendado** - SSD NVMe de 500 GB
- **RAM Recomendada** - 32 GB ECC RAM
- **Rede Recomendada** - Conexão de 1 Gbps

!!! atenção
Como operador, você é responsável tanto pelo seu próprio stake quanto pelo de seus delegadores. Manter o desempenho do seu nó, mantê-lo atualizado e garantir sua segurança são cruciais para maximizar as recompensas e construir uma forte reputação na rede Tanssi.

### Portas de Rede Necessárias

Um operador de sucesso deve ser capaz de sincronizar e interagir com uma rede ponto a ponto (P2P). Para garantir a comunicação adequada dentro do ecossistema Tanssi, certifique-se de que a seguinte porta esteja aberta para entrada:

| Rede          | Porta        |
|------------------|-------------|
| Tanssi Chain     | 30333 (TCP) |

## Explore esta seção

:::INSERT_GENERATED_CARDS:::
