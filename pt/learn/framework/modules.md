---
title: Módulos de Rede para o seu Tempo de Execução
description: O Substrate é um framework modular de desenvolvimento de blockchain com um conjunto extenso de componentes prontos para uso que podem ser associados à lógica personalizada no Tempo de Execução da rede.
icon: material-puzzle-outline
categories: Custom-Runtime, Basics
---

# Módulos de Framework de Rede {: #network-framework-modules }

## Introdução {: #introduction }

O framework Substrate fornece implementações completas e prontas para uso das funções principais que uma rede Tanssi precisa para funcionar corretamente, incluindo criptografia, consenso, governança e assim por diante. Estas implementações são totalmente personalizáveis e podem ser substituídas por lógica personalizada, se necessário.

Ao criar o Tempo de Execução, que define as regras de transição de estado entre dois blocos aplicados a um conjunto de transações, o comportamento e as funcionalidades pretendidas da blockchain precisam de ser definidos ao determinar as regras da transição de estado.

Para construir o Tempo de Execução, o Substrate fornece muitos módulos integrados (também conhecidos como pallets) que podem ser livremente usados como blocos de construção para compor e interagir com quaisquer outros módulos feitos sob medida, permitindo que as equipas criem comportamentos únicos de acordo com os requisitos específicos da sua rede Tanssi.

![Built-in modules](/images/learn/framework/modules/modules-1.webp)

## Módulos Integrados {: #built-in-modules }

Ao projetar e escrever as regras de uma rede Tanssi, o conjunto disponível de módulos funcionais traz uma solução para muitos dos requisitos de codificação que, caso contrário, precisariam ser construídos do zero.

Aqui está uma lista de alguns dos módulos mais populares:

- **[Balances](https://paritytech.github.io/substrate/master/pallet_balances/index.html){target=\_blank}** - fornece funções para lidar com contas e saldos para a moeda nativa da rede Tanssi
- **[Assets](https://paritytech.github.io/substrate/master/pallet_assets/index.html){target=\_blank}** - fornece funções para lidar com qualquer tipo de token fungível
- **[NFTs](https://paritytech.github.io/substrate/master/pallet_nfts/index.html){target=\_blank}** - fornece funções para lidar com tokens não fungíveis
- **[Democracy](https://paritytech.github.io/substrate/master/pallet_democracy/index.html){target=\_blank}** - fornece funções para gerir e administrar a votação geral dos stakeholders
- **[Multisig](https://paritytech.github.io/substrate/master/pallet_multisig/index.html){target=\_blank}** - fornece funções para envio de multi-assinaturas
- **[Recovery](https://paritytech.github.io/substrate/master/pallet_recovery/index.html){target=\_blank}** - fornece funções para permitir que os utilizadores recuperem o acesso às suas contas quando a chave privada é perdida. Isto funciona ao conceder a outras contas o direito de assinar transações em nome da conta perdida (observe que é necessário ter escolhido previamente as contas autorizadas)
- **[Staking](https://paritytech.github.io/substrate/master/pallet_staking/index.html){target=\_blank}** - fornece funções para administrar tokens apostados, apoiar recompensas, cortes, depósito, levantamento, e assim por diante

Além daqueles já listados, outros módulos como [identity](https://paritytech.github.io/substrate/master/pallet_identity/index.html){target=\_blank}, [smart contracts](https://paritytech.github.io/substrate/master/pallet_contracts/index.html){target=\_blank}, [vesting](https://paritytech.github.io/substrate/master/pallet_vesting/index.html){target=\_blank}, e muitos outros que estão livremente disponíveis podem acelerar o desenvolvimento da rede Tanssi e, consequentemente, o tempo de lançamento.

!!! nota
    O framework também inclui outros módulos que fornecem funcionalidades essenciais de protocolo, como consenso e codificação de dados de baixo nível.

## Módulos Feitos sob Medida {: #custom-modules }

Os desenvolvedores que criam novos módulos desfrutam de total liberdade para expressar qualquer comportamento desejado na lógica principal da blockchain, como expor novas transações, armazenar informações sensíveis e validar e impor lógica de negócios.

Como explicado no artigo [Arquitetura](/pt/learn/framework/architecture/#client-runtime-communication){target=\_blank}, um módulo precisa ser capaz de se comunicar com o cliente principal, expondo e integrando com uma API muito específica que permite que o tempo de execução exponha transações, acesse o armazenamento e code e decodifique informações armazenadas na cadeia. Também precisa incluir muitos outros códigos de ligação necessários que fazem o módulo funcionar no nó.

Para melhorar a experiência do desenvolvedor ao escrever módulos, o Substrate depende muito de [macros Rust](https://doc.rust-lang.org/book/ch19-06-macros.html){target=\_blank}. As macros são instruções especiais que se expandem automaticamente para o código Rust pouco antes do tempo de compilação, permitindo que os módulos mantenham até sete vezes a quantidade de código fora da vista dos desenvolvedores. Isto permite que os desenvolvedores se concentrem nos requisitos funcionais específicos ao escrever módulos, em vez de lidar com tecnicidades e o código de suporte necessário.

Todos os módulos no Substrate, incluindo os feitos sob medida, implementam estas macros de atributo, das quais as três primeiras são obrigatórias:

--8<-- 'text/pt/builders/build/customize/custom-made-module/pallets-macros-descriptions.md'

Todas estas macros atuam como atributos que devem ser aplicados ao código logo acima dos módulos, funções, estruturas, enums, tipos, etc., Rust, permitindo que o módulo seja construído e adicionado ao tempo de execução, que, com o tempo, irá expor a lógica personalizada ao mundo exterior, conforme exposto na seção seguinte.

### Exemplo de Módulo Personalizado { #custom-module-example }

Como exemplo de um módulo personalizado, o seguinte código (não destinado a uso em produção) demonstra o uso das macros mencionadas anteriormente, apresentando uma loteria simples com funcionalidade mínima, expondo duas transações:

- **buy_ticket** - esta transação verifica se o utilizador que está a assinar o pedido ainda não comprou um bilhete e tem fundos suficientes para pagar. Se tudo estiver bem, o módulo transfere o preço do bilhete para uma conta especial e regista o utilizador como participante do prémio

- **award_prize** - esta transação gera um número aleatório para escolher o vencedor da lista de participantes. O vencedor recebe a quantia total dos fundos transferidos para a conta especial do módulo

```rust
--8<-- 'code/builders/build/customize/custom-made-module/lottery-example.rs'
```

Para mais informações sobre o processo passo a passo de criação de um módulo feito sob medida para o tempo de execução, consulte [Adicionar um módulo personalizado](/pt/builders/build/customize/adding-custom-made-module/){target=\_blank} na secção de Construtor.
