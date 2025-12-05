---
title: Visão Geral
description: Tanssi é um protocolo de infraestrutura que simplifica o processo de implantação de appchains descentralizadas, permitindo que os desenvolvedores se concentrem na criação de seus produtos.
icon: octicons-home-24
categories: Basics
---

# O que é Tanssi? {: #what-is-tanssi }

Tanssi é um protocolo de infraestrutura de appchain descentralizado que permite que os desenvolvedores lancem sua appchain em minutos. Em outras palavras, Tanssi reduz o processo de configuração de seis a doze meses normalmente necessário para qualquer equipe entrar em funcionamento com uma nova cadeia para minutos.

Pode-se pensar em Tanssi como _AWS para appchains_. Em vez de lidar com toda a infraestrutura de rede você mesmo, Tanssi lida com todos os obstáculos, permitindo que você se concentre na criação da lógica do seu aplicativo, no crescimento de sua comunidade e em outras tarefas essenciais para o sucesso do seu produto.

A segurança é outro obstáculo significativo que os desenvolvedores devem enfrentar, assumindo a responsabilidade de atrair ativos em stake para garantir a segurança do consenso e inicializar um conjunto de validadores, o que pode ser particularmente desafiador para projetos em seus estágios iniciais. Todas as appchains com tecnologia Tanssi se beneficiam da segurança de nível Ethereum desde o início e, ao aproveitar o design descentralizado do Tanssi, as appchains não estão expostas a pontos únicos de falha.

As appchains com tecnologia Tanssi também se beneficiam de uma pilha de tecnologia modular, fornecendo controle máximo sobre a lógica que alimenta o tempo de execução do blockchain, oferecendo uma excelente maneira de os projetos escalarem e construírem soluções otimizadas para seus produtos. Esse controle completo sobre a lógica da appchain e o mecanismo de governança se adequa perfeitamente a uma ampla gama de casos de uso, incluindo protocolos DeFi, Ativos do Mundo Real (RWA), plataformas de jogos e outros.

## O Problema com Appchains {: #the-problem-with-appchains }

Os desenvolvedores que buscam construir appchains descentralizadas geralmente têm que lidar com os seguintes problemas:

- **Gerenciamento de Infraestrutura Complexo**: As implantações de appchain normalmente exigem o manuseio de numerosos componentes de infraestrutura, incluindo bootstrapping de sequenciadores, operadores (também conhecidos como validadores), carteiras, exploradores de blocos, oráculos, indexadores, endpoints RPC e muito mais. O gerenciamento adequado desses componentes consome tempo e recursos.

- **Segurança Fraca e Ineficiente**: As appchains geralmente sofrem por ter um pequeno conjunto de operadores ou segurança econômica fraca. Projetos em estágio inicial geralmente carecem de apoio econômico suficiente para oferecer suporte a um mecanismo de consenso robusto. Além disso, os desenvolvedores geralmente têm que pagar pela validação total da capacidade do blockchain, mesmo quando podem não ter alcançado o ajuste produto-mercado, e os blocos podem estar quase vazios. Isso essencialmente significa que os operadores estão sendo super pagos, e há um custo de oportunidade significativo, pois esses recursos poderiam ser usados em outros lugares para desenvolver o protocolo.

- **Cross-Chain e Interoperabilidade**: As appchains inerentemente carecem de recursos cross-chain, o que as impede de se conectar a outros ecossistemas de blockchain. Além disso, o desenvolvimento de soluções de interoperabilidade requer expertise especializada e implementação meticulosa.

- **Tempo para o mercado lento**: As complexidades da infraestrutura da appchain desviam o foco dos desenvolvedores da lógica do aplicativo, que é o principal impulsionador de interfaces intuitivas e uma experiência do usuário perfeita, crítica para a adoção.

## O que Tanssi Fornece {: #what-tanssi-provides}

Tanssi aborda os pontos problemáticos mais comuns da appchain:

- **Sequenciamento como Serviço**: As appchains construídas com Tanssi têm seus blocos produzidos pelos trabalhadores incentivados do Tanssi. Tanssi garante a atividade contínua da appchain, orquestrando um conjunto descentralizado de sequenciadores.

- **Segurança Econômica por Meio de Provedores Externos**: As appchains implantadas por meio do Tanssi aproveitam a segurança de um provedor de escolha (por exemplo, [Symbiotic](https://symbiotic.fi/){target=\_blank} para Ethereum). O protocolo foi projetado para finalizar as transações de forma determinística em segundos por meio de um conjunto descentralizado de operadores.

- **Tanssi/Ethereum Bridge**: Mova a liquidez de e para o Ethereum usando a [ponte integrada](/pt/learn/tanssi/tanssi-ethereum-bridge/){target=\_blank} com base no Snowbridge.

- **Integrações Chave**: As appchains construídas com Tanssi podem acessar componentes de infraestrutura importantes, juntamente com a produção de blocos, de forma totalmente automatizada e padronizada. As appchains com tecnologia Tanssi vêm com suporte integrado para ferramentas essenciais, incluindo carteiras, exploradores de blocos, indexadores, provedores RPC e muito mais, economizando o esforço dos desenvolvedores de integrar esses componentes.

- **Estrutura Modular de Blockchain**: As appchains construídas com Tanssi podem usar uma estrutura de blockchain modular chamada [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/){target=\_blank}, que permite que os desenvolvedores criem de forma rápida e fácil blockchains otimizadas e personalizáveis para qualquer caso de uso. Tanssi lida com a maioria das complexidades de infraestrutura, permitindo que os desenvolvedores se concentrem na lógica personalizada de sua appchain.

Em resumo, as appchains implantadas por meio do Tanssi são soluções soberanas de Camada 1 projetadas para serem altamente modulares e interconectadas, com foco na simplificação do processo de implantação e no desenvolvimento da personalização da própria appchain. Isso capacita os desenvolvedores a levar seus aplicativos blockchain ao mercado mais rápido, com segurança e com maior potencial de integração e interação nos ecossistemas blockchain mais amplos.

### Principais aspectos do Tanssi {: #tanssi-key-aspects }

A tabela a seguir resume os principais benefícios que Tanssi traz para seu projeto:

| Aspecto                   | A solução Tanssi                                                                                                               |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Tempo de implantação          | - Minutos para implantar<br/> - Tempo mais rápido de lançamento no mercado                                                                                          |
| Produção de bloco         | - Sequenciamento como serviço<br/>- Conjunto descentralizado de sequenciadores por projeto                                                         |
| Segurança                 | - Segurança de nível Ethereum desde o início                                                                                          |
| Finalidade/Liquidação      | - Determinístico<br/>- Finalidade em segundos                                                                                         |
| Custo                     | - Título de registro + modelo de pagamento conforme o uso                                                                                         |
| Personalização          | - Escolha o mecanismo de governança que melhor se adapta ao seu projeto<br/> - Estrutura modular<br/>- Personalização completa do tempo de execução<br/> |
| Integrações e ferramentas | - Ferramentas essenciais disponíveis desde o início                                                                                        |

## Arquitetura Geral do Tanssi e Appchains com tecnologia Tanssi {: #tanssi-architecture }

Como discutido anteriormente, as appchains implantadas por meio do Tanssi são blockchains soberanas e personalizáveis que, entre outros recursos, aproveitam o sequenciamento como serviço e herdam a finalidade do bloco de um provedor de segurança externo.

Uma visão geral de alto nível da arquitetura é apresentada abaixo, apresentando [Symbiotic](https://symbiotic.fi/){target=\_blank} como o provedor de segurança.

![Visão geral de alto nível de uma appchain e Tanssi](/images/learn/tanssi/overview/overview-1.webp)

O protocolo Tanssi gerencia e orquestra um conjunto descentralizado de sequenciadores atribuídos a fornecer serviços de produção de blocos para appchains com tecnologia Tanssi. Os sequenciadores executam transações e as incluem em blocos, que os operadores do provedor de segurança prosseguem para validar. O protocolo de restaking da Symbiotic permite que seus operadores ofereçam segurança econômica de nível Ethereum. O mecanismo de como isso funciona é explicado em dois artigos separados: [Serviços de Produção de Blocos](/pt/learn/tanssi/network-services/block-production/){target=\_blank} e [Ethereum com Symbiotic](/pt/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}.

Embora os sequenciadores que fornecem serviços de produção de blocos sejam rotacionados e realocados para uma appchain diferente a cada mudança de sessão, cada appchain terá seu próprio conjunto de Preservadores de Dados executando nós de arquivo completos, garantindo a disponibilidade de dados. Esses Preservadores de Dados fornecerão a infraestrutura RPC para aplicativos e usuários que interagem com appchains com tecnologia Tanssi.

![Preservadores de dados de uma appchain e Tanssi](/images/learn/tanssi/overview/overview-2.webp)

## O que vem a seguir? {: #whats-next }

- Vá para o [Tanssi dApp](https://apps.tanssi.network){target=\_blank} e lance sua appchain.
- Interaja com uma appchain com tecnologia Tanssi ao vivo: a [Tanssi Demo EVM appchain](/pt/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank}.
