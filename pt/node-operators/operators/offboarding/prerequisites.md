---
title: Pré-requisitos para Offboarding
description: Antes de remover seu operador Tanssi, garanta que você tenha acesso à carteira e ETH suficiente para gás. Este guia descreve os pré-requisitos cruciais.
icon: octicons-arrow-down-right-24
template: main.html
categories: Operators
---

# Pré-requisitos para Offboarding

## Introdução {: #introduction }

O offboarding de operador é o processo formal pelo qual os operadores de nós saem do protocolo Tanssi de forma segura e transparente. Ele garante a integridade, segurança e estabilidade da rede, fornecendo etapas claras para os operadores que desejam deixar de participar.

Os operadores desempenham um papel crítico no consenso e nas operações da rede. Desligar abruptamente um nó sem seguir os procedimentos adequados pode impactar negativamente os operadores, potencialmente resultando em slashing.

Este guia descreve os **pré-requisitos** para o offboarding, e guias subsequentes o guiarão pelo processo.

Se você tiver dúvidas durante qualquer parte do processo de offboarding, a equipe da Tanssi pode te ajudar no [Discord](https://discord.com/invite/Jm2KH8xT7J){target=\_blank}.

## Pré-requisitos {: #prerequisites}

Antes de iniciar o processo de offboarding, certifique-se de ter o seguinte:

- Acesso à carteira Ethereum (EVM) que controla sua conta de operador
- ETH suficiente em sua carteira para cobrir as taxas de gás para as transações

### Por que a interação com contratos inteligentes é necessária {: #why-smart-contracts }

Como muitos sistemas descentralizados, o protocolo Tanssi utiliza contratos inteligentes na blockchain Ethereum para gerenciar operações críticas, incluindo registro e staking de operador. Quando um operador decide sair, ele muda seu status e relacionamento com esses contratos principais do protocolo.
As principais etapas de offboarding, como sinalizar sua intenção de sair ou cancelar formalmente o registro, envolvem transações que atualizam o estado registrado nesses contratos inteligentes.

### Métodos de interação

--8<-- 'text/pt/node-operators/operators/onboarding/run-an-operator/prerequisites.md'
