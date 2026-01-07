---
title: Templates de Rede Incluídos na Tanssi
description: O protocolo Tanssi fornece Templates úteis para começar a construir sua rede descentralizada, incluindo um Template EVM pronto para uso para compatibilidade com Ethereum.
icon: octicons-copy-24
categories: Basics
---

# Templates de Rede Incluídos na Tanssi {: #network-templates-included-in-tanssi }

## Introdução {: #introduction }

A construção de uma nova rede do zero pode ser uma tarefa assustadora. Felizmente, graças ao [framework de desenvolvimento de rede](/pt/learn/framework/overview/){target=\_blank} usado pela Tanssi e sua arquitetura orientada a módulos, os desenvolvedores podem aproveitar alguns Templates de rede pré-empacotados que os ajudam a dar o pontapé inicial no processo e se beneficiar em alguns aspectos, como:

- **Head Start** - Os Templates de rede Tanssi fornecem um ponto de partida para seu projeto, economizando tempo e esforço significativos, fornecendo uma estrutura básica e um conjunto de funcionalidades testadas e prontas para uso. Ele permite que os desenvolvedores acelerem a construção de protótipos ou produtos minimamente viáveis (MVPs) e reduzam o tempo de lançamento

- **Consistência** - os Templates de rede Tanssi incluídos seguem padrões de design estabelecidos, padrões de codificação e melhores práticas amplamente aceitos entre a comunidade de desenvolvedores. Eles também fornecem um conjunto padrão de definições de arquitetura para otimizar o desenvolvimento de blockchain

- **UX** - Os Templates de rede Tanssi cobrem os casos de uso mais exigidos, como o suporte EVM para uma rede compatível com Ethereum

- **Customização** - Os Templates de rede Tanssi são um ótimo ponto de partida e são totalmente personalizáveis. As funcionalidades e configurações padrão que eles incluem podem ser modificadas, substituídas ou estendidas para atender aos requisitos específicos do caso de uso

- **Atualizações e Compatibilidade** - Tanssi é construído sobre um framework em evolução, com novos recursos, aprimoramentos e correções de bugs sendo introduzidos regularmente. Os Templates de rede Tanssi fornecidos são mantidos atualizados com essas atualizações

## Comece a Construir uma Rede {: #start-building }

Para começar a construir uma rede descentralizada para implantação em Tanssi, alguns Templates de rede Tanssi úteis para iniciar o processo de desenvolvimento são fornecidos no [repositório oficial](https://github.com/moondance-labs/tanssi){target=\_blank}.

O processo é tão simples quanto:

1. Selecione um dos Templates
2. Adicione a lógica específica para adaptar o Runtime aos requisitos do caso de uso
3. Implante na Tanssi

![Usando Templates para Acelerar o Processo de Desenvolvimento](/images/learn/decentralized-networks/templates/templates-1.webp)

Os dois Templates incluídos são o *Template de rede de linha de base* e o *Template EVM de linha de base*, que são apresentados nas seções a seguir.

### Template de Rede Baseline {: #baseline-network-template }

Conforme apresentado no artigo [Visão geral](/pt/learn/tanssi/overview/){target=\_blank}, as redes implantadas por meio da Tanssi são blockchains totalmente soberanas e personalizáveis.

Como parte do ecossistema Tanssi, as redes devem incluir os componentes essenciais para implementar o mecanismo de consenso e ser capazes de interagir e sincronizar com o provedor de segurança de sua escolha (por exemplo, [Symbiotic](https://symbiotic.fi/){target=\_blank} no Ethereum). O Template de rede Tanssi de linha de base inclui toda a funcionalidade necessária para a lógica de Sequencers, p2p, banco de dados e camadas de sincronização entre a rede e o provedor de segurança, permitindo que os desenvolvedores se concentrem exclusivamente na personalização de seu produto.

Este Template também inclui o módulo [Author Noting](https://github.com/moondance-labs/tanssi/blob/master/pallets/author-noting/src/lib.rs){target=\_blank} da Tanssi, que implementa a lógica para recuperar e validar o conjunto de Sequencers atribuídos para fornecer serviços de produção de blocos à rede. Ele também inclui a lógica que permite que um Sequencer assine o bloco quando o mecanismo de consenso determina que é a vez do Sequencer produzir o bloco (e, portanto, ser recompensado de acordo).

O código fonte para este Template é público e acessível no [repositório Tanssi GitHub](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/simple/src/lib.rs){target=\_blank}.

### Template Baseline EVM (Ethereum Virtual Machine) {: #baseline-evm-template }

Estendendo o [Template de rede Tanssi de linha de base](#baseline-network-template), este Template fornece não apenas suporte ao protocolo Tanssi, mas também um EVM e compatibilidade total com Ethereum.

Aproveitando um conjunto de [módulos específicos para EVM](https://github.com/polkadot-evm/frontier){target=\_blank}, este Template inclui uma camada de compatibilidade com Ethereum para que as redes possam executar dApps Ethereum não modificadas.

Usando este Template, as redes suportam a implantação e execução de qualquer contrato inteligente existente escrito em Solidity ou Vyper, sem alterações. Ao emular a produção de blocos Ethereum e expor a interface RPC esperada, os desenvolvedores também podem continuar usando as mesmas ferramentas como [Metamask](https://metamask.io){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Remix](https://remix.ethereum.org){target=\_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=\_blank}, e muitos mais prontos para uso, sem adaptadores extras.

Com este Template EVM, os desenvolvedores podem implantar uma rede semelhante a [Moonbeam](https://moonbeam.network){target=\_blank} em nenhum momento e adicionar sua lógica e recursos personalizados, específicos para seu caso de uso.

O código fonte para este Template é público e acessível no [repositório Tanssi GitHub](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/frontier/src/lib.rs){target=\_blank}.
