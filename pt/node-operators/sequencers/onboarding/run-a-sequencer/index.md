---
title: Executar um Sequenciador
description: Aprenda como configurar e executar um nó de sequenciador usando Docker ou Systemd para participar do protocolo, fornecendo serviços de produção de blocos e ganhando recompensas.
icon: octicons-server-24
template: index-page.html
---

# Executar um Nó Sequenciador

A configuração de um nó sequenciador é um passo importante para participar da rede Tanssi. Você tem duas opções: _Docker_ ou _Systemd_. Seja qual for o caminho escolhido, fornecemos tutoriais passo a passo para orientá-lo durante o processo e garantir que seu nó atenda aos requisitos necessários para produzir blocos e manter uma conexão segura com a rede.

### Requisitos de Hardware

Para executar um nó sequenciador com sucesso, o uso de hardware de alto desempenho é essencial. Configurações subótimas podem levar a atrasos, rodadas de autoria perdidas e perda de recompensas. Como a produção e o processo de importação de blocos dependem fortemente do desempenho de um único thread, recomenda-se priorizar CPUs com fortes capacidades de thread único em vez de contagens de núcleos mais altas.

Hardware Recomendado:

- **CPUs Recomendadas** - Intel Xeon E-2386/2388 ou Ryzen 9 5950x/5900x
- **NVMe Recomendado** - 1 TB NVMe
- **RAM Recomendada** - 32 GB RAM

!!! atenção
    Como um sequenciador, você é responsável por sua própria participação e pela de seus delegadores. Manter o desempenho do seu nó, mantê-lo atualizado e garantir sua segurança são essenciais para maximizar as recompensas e construir uma forte reputação na rede Tanssi.

### Portas de Rede Necessárias

Para produção de blocos bem-sucedida, seu nó deve sincronizar e interagir com duas redes peer-to-peer (P2P). Para garantir a comunicação adequada dentro do ecossistema Tanssi, certifique-se de que as seguintes portas estejam abertas para entrada:

| Rede              | Porta       |
|-------------------|-------------|
| Tanssi Chain      | 30334 (TCP) |
| Rede Designada  | 30333 (TCP) |

## Explore esta seção

:::INSERT_GENERATED_CARDS:::
