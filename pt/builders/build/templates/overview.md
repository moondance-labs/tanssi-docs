---
title: Requisitos e Recursos de Modelos
description: Explore the foundational setup and key features included in each Tanssi template, designed to streamline the building and deployment of Tanssi networks.
icon: octicons-home-24
categories: Noções básicas, Appchain
---

# Visão Geral dos Modelos {: #templates-overview }

## Introdução {: #introduction }

As redes implantadas através do Tanssi são blockchains totalmente personalizáveis, beneficiando-se de um conjunto compartilhado de sequenciadores e da segurança de um provedor de sua escolha. Os modelos apresentados neste artigo implementam as funcionalidades e configurações necessárias para suportar o protocolo Tanssi, tornando o desenvolvimento mais fácil.

## Configuração Base para Suportar o Protocolo Tanssi {: #base-setup-supporting-tanssi }
As redes Tanssi devem implementar os seguintes módulos para suportar o protocolo e se beneficiar com segurança da produção de blocos do Tanssi como um serviço:

- **Author Noting** - registra o conjunto de sequenciadores atribuídos à rede pelo Tanssi
- **Author Inherent** - permite que o sequenciador que está criando o bloco inclua sua identidade para ser validado e recompensado

Se você não incluir esses módulos no tempo de execução da rede Tanssi, não haverá um método para confirmar que os blocos estão sendo gerados por sequenciadores confiáveis designados pelo orquestrador Tanssi. Isso poderia criar uma vulnerabilidade para que atores mal-intencionados explorem e comprometam a rede. Para obter mais informações sobre a produção de blocos do Tanssi como um serviço, consulte o artigo [Serviços de Produção de Blocos](/pt/learn/tanssi/network-services/block-production/){target=\_blank}.

Além da produção de blocos, há outros aspectos essenciais para qualquer rede coberta nos modelos, como:

- **Consenso** - as redes têm a funcionalidade necessária para permitir que os sequenciadores produzam blocos, fofoquem e validem-nos e coordenem com o provedor de segurança para serem notificados sobre a finalidade do bloco
- **Interoperabilidade de Redes** - lida com a ingestão e envio de mensagens descendentes e laterais de entrada, permitindo que uma rede Tanssi se comunique e interaja com as outras cadeias dentro do ecossistema
- **Atualizações de tempo de execução** - uma atualização de tempo de execução em uma rede Tanssi deve ser informada aos operadores do provedor de segurança para permitir que eles verifiquem os blocos produzidos pelos sequenciadores das redes Tanssi

## Módulos Incluídos {: #included-modules  }

Além dos módulos necessários para suportar a operação de uma rede Tanssi, muitos outros módulos fornecem comportamento funcional com o qual os usuários podem interagir.

Estes são alguns dos módulos funcionais que expõem um comportamento aos usuários que estão incluídos nos modelos e prontos para uso:

- **[Balances](https://paritytech.github.io/substrate/master/pallet_balances/index.html){target=\_blank}** - o módulo Balances fornece funções para lidar com contas e saldos para a moeda nativa da rede Tanssi
- **[Utility](https://paritytech.github.io/polkadot-sdk/master/pallet_utility/index.html){target=\_blank}** - o módulo Utility fornece funções para executar várias chamadas em um único despacho. Além dos lotes de transações, este módulo também permite a execução de uma chamada de uma origem alternativa assinada
- **[Proxy](https://paritytech.github.io/polkadot-sdk/master/pallet_proxy/index.html){target=\_blank}** - o módulo Proxy fornece funções para delegar a outras contas (proxies) a permissão para despachar chamadas de uma origem proxy
- **[Modo de Manutenção](https://github.com/moondance-labs/moonkit/blob/tanssi-polkadot-v1.3.0/pallets/maintenance-mode/src/lib.rs){target=\_blank}** - o módulo Modo de Manutenção permite que a rede Tanssi seja definida para um modo em que não executa transferências de saldo/ativos ou outras transações. Isso pode ser útil ao atualizar o tempo de execução em uma emergência, ao executar grandes migrações de armazenamento ou quando uma vulnerabilidade de segurança é descoberta
- **[Tx Pause](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/tx-pause/src/lib.rs){target=\_blank}** - o módulo Tx Pause permite que uma origem válida (normalmente Root) pause (e cancele a pausa) um módulo inteiro ou uma única transação. Uma transação em pausa (ou todas as transações incluídas em um módulo em pausa) falhará quando chamada até que seja despausada. Este módulo fornece um grau maior de granularidade em comparação com o modo de manutenção, tornando-o particularmente útil quando uma transação defeituosa ou vulnerável é identificada no tempo de execução
- **[Multisig](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/multisig/src/lib.rs){target=\_blank}** - o módulo Multisig permite despachos de transações que exigem -tipicamente- mais de uma assinatura. Uma transação multisig define um conjunto de contas autorizadas e um limite para sua aprovação, exigindo consenso entre várias partes

## Comece a Construir {: #getting-started  }

Para começar a construir sobre os modelos fornecidos, seja o [modelo de rede Tanssi base](/pt/builders/build/templates/substrate/){target=\_blank} ou o [modelo EVM (Ethereum Virtual Machine) base](/pt/builders/build/templates/evm/){target=\_blank}, a abordagem recomendada é bifurcar o [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank} e começar a adicionar [módulos integrados](/pt/builders/build/customize/adding-built-in-module/){target=\_blank} ou [módulos personalizados](/pt/builders/build/customize/adding-custom-made-module/){target=\_blank} sobre a tag [versão mais recente](https://github.com/moondance-labs/tanssi/releases/latest){target=\_blank}.

Esta abordagem tem algumas vantagens, como:

- Construir sobre a versão mais recente e estável
- Obter o protocolo Tanssi já configurado e incluído no tempo de execução do modelo
- Mantenha sua bifurcação atualizada sincronizando com o repositório upstream do Tanssi
- Execute os testes incluídos, garantindo que a produção de blocos em sua rede Tanssi funcione conforme o esperado
- Execute um ambiente local completo com a configuração [Zombienet](https://paritytech.github.io/zombienet){target=\_blank} incluída

Se os modelos já cobrem as necessidades do seu caso de uso ou após construir e testar sua cadeia, você pode continuar com o artigo [Implantar sua rede via o Tanssi DApp](/pt/builders/deploy/dapp/){target=\_blank} para saber como usar o Tanssi dApp para registrar e colocar sua cadeia em funcionamento.
