---
title: Arquitetura do Framework
description: Em um nó Substrate, dois componentes principais são o runtime, que controla a transição de estado da blockchain, e o cliente, que gerencia todo o resto.
icon: octicons-stack-24
categories: Basics
---

# Arquitetura do Framework {: #framework-architecture }

## Introdução {: #introduction }

Substrate é um kit de desenvolvimento de software (SDK) para a construção de blockchains. Este framework é a base e o motor que impulsionam muitos projetos em todo o ecossistema Web3, incluindo a própria rede Tanssi e as redes implantadas através do Tanssi.

Escrito na linguagem Rust e projetado com uma arquitetura modular, o Substrate é extremamente performático, flexível e altamente personalizável, tornando-o a melhor opção para o desenvolvimento de blockchains.

Neste artigo, a arquitetura de um nó Substrate é abordada.

## Arquitetura {: #architecture }

O framework Substrate é projetado para máxima personalização, fornecendo uma implementação totalmente funcional para todos os aspectos internos importantes de uma blockchain. Ele permite que os desenvolvedores se concentrem nos detalhes do caso de uso e nas características do runtime, e oferece a capacidade de alterar qualquer um dos recursos padrão (se necessário).

A arquitetura de um nó Substrate contém dois componentes principais:

- **Cliente Core** - lida com a comunicação com o mundo exterior (outros nós, dApps, usuários finais, entre outros), e muitas outras responsabilidades internas, como armazenamento e comunicação
- **Runtime** - implementa a lógica personalizada da rede Tanssi, executa transações e gerencia as transições de estado

Da perspectiva do usuário final, toda a interação com a rede Tanssi é geralmente feita através de dApps ou diretamente através dos endpoints RPC do nó, por exemplo, usando uma carteira. Quando um usuário aciona uma solicitação para buscar dados ou envia transações para um nó, o cliente core é responsável por responder ou enfileirar as transações até a execução no runtime. Ainda assim, todos esses aspectos internos do design do nó são mantidos transparentes para o usuário.

![Basic substrate node architecture](/images/learn/framework/architecture/architecture-1.webp)

## O Cliente Core {: #core-client }

O cliente core compreende componentes responsáveis por tudo na operação de um nó na rede, exceto pelo que acontece no runtime.

Alguns dos principais componentes são:

- **Networking** - este componente lida com a comunicação com os pares na rede (sincronização de blocos, propagação de transações e assim por diante) e expõe os endpoints que permitem que os dApps se integrem e interajam com a rede Tanssi
- **Storage** - este componente gerencia o armazenamento de estado da rede Tanssi em um banco de dados chave-valor altamente eficiente
- **Consenso** - este componente garante que todos os participantes da rede concordem com o estado da blockchain, validando transações, transições de estado e os blocos resultantes

A configuração padrão de um nó Substrate e as implementações embutidas dos componentes são geralmente a melhor escolha para a maioria dos casos de uso. Ainda assim, as equipes são bem-vindas para inovar e alterar ou substituir qualquer parte do nó ou até mesmo escrever uma implementação completamente diferente do cliente core, como [Kagome](https://github.com/soramitsu/kagome#intro){target=\_blank} (implementação C++) e [Gossamer](https://github.com/ChainSafe/gossamer#a-go-implementation-of-the-polkadot-host){target=\_blank} (implementação Golang).

## O Runtime {: #runtime }

O runtime desempenha um papel crucial na operação da rede Tanssi. Ele contém a lógica e as regras principais para atender aos requisitos do caso de uso que os desenvolvedores estão construindo e, portanto, é responsável por validar as transações e executar as transições de estado.

Sendo o elemento central em uma rede Tanssi, projetar a arquitetura Substrate uma decisão importante foi tomada em relação ao formato para o runtime: ele é compilado para código de bytes [WebAssembly (Wasm)](https://webassembly.org){target=\_blank}.

O formato Wasm oferece muitas vantagens para uma rede Tanssi implantada, incluindo:

- **Portabilidade** - o formato Wasm é independente de plataforma, o que significa que o mesmo binário pode ser distribuído e executado em diferentes nós usando diferentes arquiteturas de hardware e sistemas operacionais
- **Execução Determinística** - o formato Wasm garante a execução determinística do código, o que significa que a mesma entrada sempre produzirá a mesma saída. A determinância é um aspecto crítico em blockchains para obter as mesmas transições de estado em todos os nós da rede e alcançar um consenso
- **Atualização sem fork** - Substrate armazena o blob Wasm do runtime on-chain, o que significa que o próprio runtime se torna parte do estado. Este projeto permite a atualização da lógica do runtime de forma sem fork usando uma transação

Além do formato, internamente, um runtime Substrate é construído compondo diferentes módulos, fornecidos e prontos para uso pelo Substrate ou feitos sob medida. Cada um desses módulos define, entre outras coisas, as transações que expõem, a lógica por trás delas, o que precisa ser armazenado no estado da cadeia, o melhor formato para fazê-lo e como eles cooperam com outros módulos para compor a funcionalidade. Mais detalhes sobre a construção de um runtime serão abordados na seção [módulos](/pt/learn/framework/modules/){target=\_blank}.

## Comunicação Cliente-Runtime {: #client-runtime-communication }

Como descrito anteriormente, os dois principais componentes de um nó Substrate (o cliente core e o runtime) têm uma clara separação de preocupações. Além das responsabilidades funcionais, em um nível inferior, sua representação binária e ambientes de execução são diferentes. Embora o nó seja compilado para ser instalado e executado em uma plataforma específica (seja Linux x64 ou qualquer outra), o runtime da rede Tanssi é compilado para um formato Wasm que é agnóstico à plataforma e é executado em um ambiente de execução isolado.

Tendo em mente os ambientes de execução separados, toda a comunicação entre o cliente do nó e o runtime ocorre por meio de uma interface limitada e bem definida, permitindo as operações necessárias, como:

- **Executar Transações** - quando um usuário envia uma transação para o nó cliente, o nó passa essa transação para o runtime através da API definida para sua execução
- **Consultas de Estado** - o nó cliente pode consultar o estado atual da blockchain para recuperar informações como saldos de contas e quaisquer outros dados específicos do domínio
- **Consenso e Finalidade** - o nó cliente coordena o consenso e a finalização dos blocos, mas é responsabilidade do runtime determinar a validade de novos blocos, validar transações e garantir que as regras de consenso sejam seguidas
- **Notificações de Eventos** - o runtime emite eventos ao executar transações que o nó cliente pode usar para manter os usuários externos atualizados sobre ações ou alterações específicas no estado
