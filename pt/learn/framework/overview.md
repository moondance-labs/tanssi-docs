---
title: Visão Geral da Estrutura de Desenvolvimento de Rede
description: Substrate é uma estrutura de desenvolvimento de blockchain construída na Linguagem de Programação Rust que agiliza e acelera o processo de desenvolvimento de novas redes.
icon: octicons-home-24
categories: Basics
---

# Visão Geral da Estrutura de Desenvolvimento de Rede {: #network-dev-framework-overview }

## Introdução {: #introduction }

A construção de uma rede do zero é uma tarefa muito complexa que exige profundo conhecimento em uma ampla gama de áreas, incluindo (mas não se limitando a):

- **Algoritmos de Consenso** - o consenso garante que todos os participantes da rede blockchain concordem com a validade das transações. Alguns mecanismos de consenso populares incluem Prova de Trabalho (PoW) e Prova de Participação (PoS)

- **Criptografia** - a criptografia desempenha um papel crucial na segurança da blockchain. Você precisará de algoritmos criptográficos para tarefas como criar assinaturas digitais, verificar transações e criptografar dados

- **Rede Distribuída** - uma arquitetura de rede para permitir que os nós se comuniquem, validem transações e sincronizem os dados da blockchain é fundamental para manter um livro-razão compartilhado em uma rede descentralizada

- **Estruturas de Dados** - além da lista de blocos, onde cada bloco contém um conjunto de transações junto com uma referência ao bloco anterior, é necessária uma estratégia otimizada e de alto desempenho para armazenar o estado da rede

- **Governança** - se a rede for projetada para ser sem permissão, um mecanismo de votação é importante para mantê-la evoluindo e refletindo a vontade da comunidade

- **Atualização** - é necessário definir claramente como atualizar, como as modificações são implementadas e como os conflitos são resolvidos dentro da rede

Felizmente, não há necessidade de construir esses componentes de blockchain do zero, graças a uma excelente estrutura de código aberto chamada [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/){target=\_blank}. A própria Tanssi é construída com essa estrutura, aproveitando suas implementações de base abrangentes, modularidade e flexibilidade para alcançar um alto nível de personalização.

## Estrutura Substrate {: #substrate-framework}

Substrate é uma estrutura extremamente performática, flexível, modular e altamente personalizável para construir blockchains. Essa estrutura é a base e o motor que impulsionam muitos projetos no ecossistema Web3, incluindo a própria rede Tanssi e as redes implantadas por meio da Tanssi.

Muitos de seus ótimos recursos, como desempenho, facilidade de uso e modularidade, resultam da linguagem de programação escolhida para seu desenvolvimento. É aqui que a [Linguagem de Programação Rust](#rust-programming-language) se destaca: ela é rápida, portátil e fornece um modelo maravilhoso para lidar com a memória, entre outros motivos detalhados na [próxima seção](#rust-programming-language).

Ao desenvolver uma rede, Substrate representa uma grande vantagem ao fornecer um conjunto de implementações prontas para uso dos principais blocos de construção que um projeto precisa:

- **Algoritmos de Consenso** - existem vários mecanismos de consenso integrados, como Aura (Prova de Autoridade), Babe (Prova de Participação) e Grandpa (finalidade de bloco), mas devido ao alto grau de personalização que Substrate oferece, as equipes podem sempre optar por desenvolver seu consenso específico para se adaptar às necessidades do caso de uso, como a equipe Moonbeam fez com a [Estrutura de Consenso Nimbus Parachain](https://docs.moonbeam.network/learn/features/consensus){target=\_blank}

- **Módulos de Tempo de Execução** - muitos módulos integrados (explicados em detalhes na seção [modules](/pt/learn/framework/modules/){target=\_blank}) podem ser selecionados e configurados em sua rede, como contas, saldos, staking, governança, identidade e muito mais

- **Rede** - protocolos e bibliotecas integradas para estabelecer conexões, propagar transações e blocos, sincronizar o estado da blockchain e gerenciar interações de rede

- **Armazenamento** - mecanismos de armazenamento integrados para armazenamento e recuperação de dados eficientes

- **Fila de Transações** - sistema de fila de transações integrado que gerencia a validação, priorização e inclusão de transações em blocos, garantindo a consistência e integridade do estado da rede

- **APIs RPC** - Substrate fornece APIs de Chamada de Procedimento Remoto (RPC) que permitem que aplicativos externos interajam com a rede, consultando dados da blockchain, enviando transações e acessando várias funcionalidades expostas pelo tempo de execução

Cada recurso que o Substrate oferece pode ser usado como está, estendido, personalizado ou substituído para atender aos requisitos específicos do caso de uso da rede.

Substrate agiliza e acelera o processo de desenvolvimento de novas redes. Quando usado em conjunto com Tanssi, que ajuda a lidar com a infraestrutura e supervisionar a implantação, a tarefa de lançar uma nova rede se torna significativamente mais simples!

## Linguagem de Programação Rust {: #rust-programming-language}

[Rust](https://rust-lang.org/){target=\_blank} é uma linguagem de programação com recursos que os desenvolvedores classificam consistentemente em pesquisas como a [pesquisa anual de desenvolvedores do Stack Overflow](https://survey.stackoverflow.co/){target=\_blank}.

Além de fornecer uma ótima experiência para os desenvolvedores, o Rust se destaca em muitas áreas:

- **Segurança da memória** - O compilador Rust impõe verificações estritas em tempo de compilação para evitar erros de programação comuns, como desreferências de ponteiros nulos, estouros de buffer e condições de corrida de dados. Além disso, a memória é gerenciada por meio de um novo sistema de propriedade (verificado pelo compilador), que elimina a necessidade de um coletor de lixo

- **Desempenho** - Rust atinge um desempenho comparável ao de C e C++, fornecendo controle de baixo nível sobre os recursos do sistema e minimizando a sobrecarga de tempo de execução. Ele tem um princípio de abstração de custo zero, semelhante a "o que você não usa, você não paga" de C++, o que significa que as abstrações não têm sobrecarga extra

- **Concorrência** - Rust possui recursos integrados que facilitam a escrita de código concorrente e paralelo sem introduzir condições de corrida de dados. Ele fornece threads leves (tarefas) e um modelo de propriedade poderoso que garante o compartilhamento seguro de dados entre threads

- **Abstrações expressivas e seguras** - Rust oferece um rico conjunto de recursos de linguagem modernos, como correspondência de padrões, tipos de dados algébricos, closures e inferência de tipos, permitindo que os desenvolvedores escrevam e leiam código expressivo e conciso. O compilador Rust impõe o forte sistema de tipos, evitando muitos erros em tempo de execução em tempo de compilação

- **Compatibilidade entre plataformas** - Rust foi projetado para funcionar bem em uma variedade de plataformas e arquiteturas. Ele suporta os principais sistemas operacionais como Windows, macOS e Linux, bem como sistemas embarcados e WebAssembly. Essa versatilidade permite que os desenvolvedores escrevam código que pode ser implantado em diferentes ambientes

- **Ecossistema em crescimento** - Rust tem um ecossistema em rápido crescimento com uma comunidade vibrante e uma rica coleção de bibliotecas e ferramentas. O gerenciador de pacotes oficial, Cargo, simplifica o gerenciamento de dependências, construção e teste

- **Interoperabilidade** - Rust fornece interoperabilidade perfeita com bases de código existentes escritas em C e C++. Ele tem uma Interface de Função Estrangeira (FFI) que permite que o código Rust se interface com o código escrito em outras linguagens, permitindo que os desenvolvedores introduzam gradualmente Rust em projetos existentes, como o kernel Linux
