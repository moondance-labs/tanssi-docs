---
title: Template de Rede de Base
description: O repositório Tanssi inclui um Template básico que fornece a configuração necessária para suportar o protocolo e iniciar o desenvolvimento de uma rede.
icon: simple-paritysubstrate
categories: Substrate-Template
---

# Template de Rede de Base {: #baseline-network-template }

## Introdução {: #introduction }

O repositório Tanssi inclui um Template mínimo que fornece a configuração necessária para suportar o protocolo Tanssi e alguns módulos essenciais, como o que permite lidar com a moeda da rede Tanssi.

Esta seção aborda este Template básico, o que ele inclui e alguns aspectos a serem considerados ao adicionar dependências externas.

## Template de Rede de Base {:#baseline-network-template }

Desenvolver um Runtime de rede normalmente envolve duas etapas principais:

1. [Incorporar módulos internos pré-existentes](/pt/builders/build/customize/adding-built-in-module/){target=\_blank} no Runtime
2. [Criar módulos personalizados](/pt/builders/build/customize/adding-custom-made-module/){target=\_blank} adaptados às necessidades específicas do seu aplicativo

Como o Template fornecido já inclui as configurações essenciais para uma integração perfeita com o protocolo Tanssi e o provedor de segurança (por exemplo, [Symbiotic](https://symbiotic.fi/){target=\_blank} no Ethereum), as equipes interessadas em construir uma rede inovadora powered by Tanssi podem usar este Template como ponto de partida para adicionar sua lógica personalizada.

Aqui estão alguns dos recursos que vêm com este Template:

- Utilize da Tanssi [produção de blocos como serviço](/pt/learn/tanssi/network-services/block-production/){target=\_blank}
- Escolha o provedor de segurança que melhor se adapta às suas necessidades. Por exemplo, aproveite a segurança de nível Ethereum do [Symbiotic](https://symbiotic.fi/){target=\_blank}
- Obtenha a finalidade determinística da transação em segundos
- Crie dApps que interagem com sua rede por meio de uma [API](/pt/builders/toolkit/substrate-api/libraries/polkadot-js-api/){target=\_blank}

Aproveitando esses recursos no Template, você pode iniciar o desenvolvimento da sua rede Tanssi e personalizá-la para atender aos seus requisitos e inovações específicos.

## Adicionando Dependências Extras {: #adding-extra-dependencies}

O Template de rede Substrate inclui todos os módulos e configurações necessários que o tornam compatível com o protocolo Tanssi e também [muitos outros módulos](/pt/builders/build/templates/overview/#included-modules){target=\_blank} que fornecem funcionalidades básicas.

Este Template foi projetado para servir como base para construir, pois a maioria dos casos de uso requer capacidades expandidas, adicionando módulos existentes ou personalizados. Para saber como adicionar novas funcionalidades ao seu Runtime, consulte a seção [personalizar Runtime](/pt/builders/build/customize/){target=\_blank}.
