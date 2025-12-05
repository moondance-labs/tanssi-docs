---
title: Modelos de Rede Incluídos no Tanssi
description: O protocolo Tanssi fornece modelos úteis para começar a construir sua rede descentralizada, incluindo um modelo EVM pronto para uso para compatibilidade com Ethereum.
icon: octicons-copy-24
categories: Basics
---

# Modelos de Rede Incluídos no Tanssi {: #network-templates-included-in-tanssi }

## Introdução {: #introduction }

A construção de uma nova rede do zero pode ser uma tarefa assustadora. Felizmente, graças ao [framework de desenvolvimento de rede](/pt/learn/framework/overview/){target=\_blank} usado pelo Tanssi e sua arquitetura orientada a módulos, os desenvolvedores podem aproveitar alguns modelos de rede pré-empacotados que os ajudam a dar o pontapé inicial no processo e se beneficiar em alguns aspectos, como:

- **Head Start** - Os modelos de rede Tanssi fornecem um ponto de partida para seu projeto, economizando tempo e esforço significativos, fornecendo uma estrutura básica e um conjunto de funcionalidades testadas e prontas para uso. Ele permite que os desenvolvedores acelerem a construção de protótipos ou produtos minimamente viáveis (MVPs) e reduzam o tempo de lançamento

- **Consistência** - os modelos de rede Tanssi incluídos seguem padrões de design estabelecidos, padrões de codificação e melhores práticas amplamente aceitos entre a comunidade de desenvolvedores. Eles também fornecem um conjunto padrão de definições de arquitetura para otimizar o desenvolvimento de blockchain

- **UX** - Os modelos de rede Tanssi cobrem os casos de uso mais exigidos, como o suporte EVM para uma rede compatível com Ethereum

- **Customização** - Os modelos de rede Tanssi são um ótimo ponto de partida e são totalmente personalizáveis. As funcionalidades e configurações padrão que eles incluem podem ser modificadas, substituídas ou estendidas para atender aos requisitos específicos do caso de uso

- **Atualizações e Compatibilidade** - Tanssi é construído sobre um framework em evolução, com novos recursos, aprimoramentos e correções de bugs sendo introduzidos regularmente. Os modelos de rede Tanssi fornecidos são mantidos atualizados com essas atualizações

## Comece a Construir uma Rede {: #start-building }

Para começar a construir uma rede descentralizada para implantação em Tanssi, alguns modelos de rede Tanssi úteis para iniciar o processo de desenvolvimento são fornecidos no [repositório oficial](https://github.com/moondance-labs/tanssi){target=\_blank}.

O processo é tão simples quanto:

1. Selecione um dos modelos
2. Adicione a lógica específica para adaptar o tempo de execução aos requisitos do caso de uso
3. Implante no Tanssi

![Usando Modelos para Acelerar o Processo de Desenvolvimento](/images/learn/decentralized-networks/templates/templates-1.webp)

Os dois modelos incluídos são o *modelo de rede de linha de base* e o *modelo EVM de linha de base*, que são apresentados nas seções a seguir.

### Baseline Network Template {: #baseline-network-template }

Conforme apresentado no artigo [Visão geral](/pt/learn/tanssi/overview/){target=\_blank}, as redes implantadas por meio do Tanssi são blockchains totalmente soberanas e personalizáveis.

Como parte do ecossistema Tanssi, as redes devem incluir os componentes essenciais para implementar o mecanismo de consenso e ser capazes de interagir e sincronizar com o provedor de segurança de sua escolha (por exemplo, [Symbiotic](https://symbiotic.fi/){target=\_blank} no Ethereum). O modelo de rede Tanssi de linha de base inclui toda a funcionalidade necessária para a lógica de sequenciadores, p2p, banco de dados e camadas de sincronização entre a rede e o provedor de segurança, permitindo que os desenvolvedores se concentrem exclusivamente na personalização de seu produto.

Este modelo também inclui o módulo [Author Noting](https://github.com/moondance-labs/tanssi/blob/master/pallets/author-noting/src/lib.rs){target=\_blank} do Tanssi, que implementa a lógica para recuperar e validar o conjunto de sequenciadores atribuídos para fornecer serviços de produção de blocos à rede. Ele também inclui a lógica que permite que um sequenciador assine o bloco quando o mecanismo de consenso determina que é a vez do sequenciador produzir o bloco (e, portanto, ser recompensado de acordo).

O código fonte para este modelo é público e acessível no [repositório Tanssi GitHub](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/simple/src/lib.rs){target=\_blank}.

### Baseline EVM (Ethereum Virtual Machine) Template {: #baseline-evm-template }

Estendendo o [modelo de rede Tanssi de linha de base](#baseline-network-template), este modelo fornece não apenas suporte ao protocolo Tanssi, mas também um EVM e compatibilidade total com Ethereum.

Aproveitando um conjunto de [módulos específicos para EVM](https://github.com/polkadot-evm/frontier){target=\_blank}, este modelo inclui uma camada de compatibilidade com Ethereum para que as redes possam executar dApps Ethereum não modificadas.

Usando este modelo, as redes suportam a implantação e execução de qualquer contrato inteligente existente escrito em Solidity ou Vyper, sem alterações. Ao emular a produção de blocos Ethereum e expor a interface RPC esperada, os desenvolvedores também podem continuar usando as mesmas ferramentas como [Metamask](https://metamask.io){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Remix](https://remix.ethereum.org){target=\_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=\_blank}, e muitos mais prontos para uso, sem adaptadores extras.

Com este modelo EVM, os desenvolvedores podem implantar uma rede semelhante a [Moonbeam](https://moonbeam.network){target=\_blank} em nenhum momento e adicionar sua lógica e recursos personalizados, específicos para seu caso de uso.

O código fonte para este modelo é público e acessível no [repositório Tanssi GitHub](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/frontier/src/lib.rs){target=\_blank}.
