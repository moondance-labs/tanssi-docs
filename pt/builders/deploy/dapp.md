---
title: Implemente sua appchain via o DApp
description: Aprenda como iniciar e implementar uma appchain na Tanssi usando o Tanssi dApp, uma solução sem código para integrar e lançar appchains descentralizadas em minutos.
icon: octicons-browser-24
categories: Appchain
---

# Implemente sua appchain através do Tanssi DApp

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/W40oqavpZJ8' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introdução {: #introduction }

A Tanssi tem como objetivo reduzir a barreira de entrada para a construção de appchains descentralizadas, simplificando o processo de integração e abstraindo os detalhes técnicos do lançamento de uma appchain com tecnologia Tanssi. O [Tanssi dApp](https://apps.tanssi.network){target=\_blank} permite que você inicie uma appchain em apenas alguns minutos. Este guia mostra as etapas necessárias para lançar uma appchain na Dancelight, a Tanssi TestNet, usando o Tanssi dApp.

## Testes rápidos vs. appchains dedicadas {: #quick-trial-vs-dedicated-appchains  }

[O Tanssi dApp](https://apps.tanssi.network){target=\_blank} suporta a criação de dois tipos de appchains:

- Teste rápido: uma appchain temporária que se autodestrói após 48 horas
- Dedicada: uma appchain de longa duração para builders do ecossistema Tanssi

Ambos os tipos se comportam de forma idêntica; a diferença é a natureza temporária do teste rápido. Em geral, o teste rápido é o melhor para quem quer experimentar uma appchain com tecnologia Tanssi. Se precisar de um ambiente de teste de longa duração, a equipe Tanssi pode ajudar a configurar uma appchain dedicada.

As capturas de tela e o conteúdo deste guia usam appchains de teste rápido, mas o processo é o mesmo para configurar uma appchain dedicada.

![Painel inicial do apps.tanssi.network](/images/builders/deploy/dapp/dapp-1.webp)

## Pré-requisitos {: #prerequisites }

### Carteiras suportadas {: #supported-wallets }

Como a Tanssi é construída com Substrate, você precisará de uma carteira compatível com Substrate para implantar e gerenciar sua appchain Tanssi. Carteiras suportadas:

- [Talisman](https://talisman.xyz/){target=\_blank}
- [SubWallet](https://www.subwallet.app){target=\_blank}
- [Enkrypt](https://www.enkrypt.com){target=\_blank}
- [Extensão Polkadot.js](https://polkadot.js.org/extension){target=\_blank}

Se você implantar uma appchain EVM com tecnologia Tanssi, os usuários poderão usar carteiras Ethereum, como [MetaMask](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}, sem precisar de carteira Substrate.

![Tela de conexão para várias carteiras Substrate](/images/builders/deploy/dapp/dapp-2.webp)

### Conecte sua carteira ao DApp {: #connect-wallet  }

Para conectar sua carteira ao Tanssi dApp, clique em **Connect Wallet** no canto superior direito e escolha o tipo de carteira. Depois:

1. Escolha sua conta no menu suspenso
2. Assine a mensagem solicitada para fazer login no Tanssi dApp

![Botão Connect Wallet no Tanssi dApp](/images/builders/deploy/dapp/dapp-3.webp)

Após conectar, seu endereço aparecerá no canto superior direito. Se tiver várias contas conectadas, clique no endereço para trocar.

## Configure sua appchain {: #configure-your-appchain }

Na [página inicial](https://apps.tanssi.network/){target=\_blank} do dApp, clique em **Start Building** no bloco **Launch Network** para configurar sua appchain imediatamente. Escolha entre **Quick Trial** ou **Dedicated**. Veja as diferenças em [Testes rápidos vs. appchains dedicadas](#quick-trial-vs-dedicated-appchains).

![Seção Launch Network do dApp](/images/builders/deploy/dapp/dapp-1.webp)

Em seguida, selecione o template que melhor atende ao seu caso de uso e configure as propriedades da appchain. Você pode escolher o template EVM ou Substrate ou enviar um arquivo de especificação bruta. Consulte [Templates](/pt/builders/build/templates/overview/){target=\_blank} para detalhes.

### Template EVM {: #evm-template }

O [template EVM](/pt/builders/build/templates/evm/){target=\_blank} adiciona a camada de compatibilidade Ethereum à sua appchain Tanssi.

Você precisará de um ID de cadeia EVM exclusivo ([EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md){target=\_blank}). Verifique se o ID está livre em [Chainlist](https://chainid.network){target=\_blank}. Ao lançar em produção, abra um PR para reservar o ID no repositório [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains){target=\_blank} assim que o endpoint RPC estiver ativo.

!!! nota
    Um ID de cadeia EVM registrado é necessário apenas na MainNet. Para testes na TestNet, use qualquer ID disponível.

Para configurar:

1. Em **Network Details**, informe o nome do projeto, o ID de cadeia EVM e a categoria
2. Em **Gas Token**, informe o símbolo do token nativo (18 casas decimais fixas)
3. Opcional: ajuste configurações [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} em **Advanced** (base fee e variação máxima)
4. Em **Accounts**, forneça o endereço (estilo Ethereum) da conta sudo e o saldo inicial. Só existe uma conta sudo por vez; ela pode ser trocada depois e a rede pode migrar para um modelo descentralizado
5. Opcional: em **Advanced**, clique em **Add** para adicionar contas e saldos de gênese
6. Opcional: em **Genesis Smart Contracts**, clique em **Add** para incluir contratos gênese (remova `0x` do bytecode)
7. Ao finalizar o template, clique em **Continue** e siga para [Checar saldos](#check-balances)

![Criar appchain EVM no Tanssi dApp](/images/builders/deploy/dapp/dapp-4.webp)

### Template Substrate {: #substrate-template }

O [template Substrate](/pt/builders/build/templates/overview/#baseline-network-template){target=\_blank} traz as configurações básicas para integrar com a Tanssi e pode servir como base para uma appchain personalizada.

Para configurar:

1. Em **Network Details**, informe o nome do projeto e a categoria
2. Em **Gas Token**, informe decimais, símbolo e [formato SS58](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json){target=\_blank}
3. Em **Accounts**, informe o endereço (estilo Substrate) da conta sudo e o saldo inicial. Só existe uma conta sudo por vez; pode ser trocada depois e a rede pode migrar para governança descentralizada
4. Opcional: em **Advanced**, clique em **Add** para adicionar contas e saldos de gênese
5. Clique em **Continue** para seguir para [Checar saldos](#check-balances)

![Criar appchain Substrate no Tanssi dApp](/images/builders/deploy/dapp/dapp-5.webp)

### Personalizado {: #custom }

Se você já possui um runtime Substrate e vai enviar um arquivo de especificação personalizado, garanta que ele possa evoluir para uma appchain Tanssi.

Seu runtime deve implementar o seguinte:

- Inclua o SDK Cumulus conforme [Base Setup to Connect to Polkadot](/pt/builders/build/templates/overview/#base-setup-to-polkadot){target=\_blank}
- Inclua os módulos Tanssi de produção de blocos conforme [Base Setup to Support the Tanssi Protocol](/pt/builders/build/templates/overview/#base-setup-supporting-tanssi){target=\_blank}

Outras exigências no runtime:

- No módulo `timestamp`, defina `OnTimestampSet` conforme o snippet:

    ```rust
    type OnTimestampSet = tp_consensus::OnTimestampSet<
        <Self as pallet_author_inherent::Config>::SlotBeacon,
        ConstU64<{ SLOT_DURATION }>,
    >;
    ```

- Remova módulos de produção de blocos/consenso (Aura, Grandpa etc.), deixando a Tanssi assumir. Por exemplo, removendo:

    ```rust
    // Suporte a collators. A ordem destes 4 é importante e não deve mudar.
    #[runtime::pallet_index(20)]
    pub type Authorship = pallet_authorship;
    #[runtime::pallet_index(21)]
    pub type CollatorSelection = pallet_collator_selection;
    #[runtime::pallet_index(22)]
    pub type Session = pallet_session;
    #[runtime::pallet_index(23)]
    pub type Aura = pallet_aura;
    #[runtime::pallet_index(24)]
    pub type AuraExt = cumulus_pallet_aura_ext;
    ```

Por fim, [gere e edite](/pt/builders/build/customize/customizing-chain-specs/#editing-json-chain-specs){target=\_blank} a especificação da cadeia, prestando atenção especial a:

- `para_id`: você precisa de um ID pré-registrado; obtenha-o no passo **Reserve your Network ID** e retorne para prosseguir
- `is_ethereum`: defina como `true` se precisar expor RPCs compatíveis com Ethereum

Ajuste também conforme o tipo de appchain:

=== "Quick Trial Appchain"

    ```json
    {
        ...
        "relay_chain": "rococo_flashbox_relay_testnet",
        "chainType": "Live",
        "genesis": {
            "runtime": {
                ...
                "authoritiesNoting": {
                    "orchestratorParaId": 1000
                },
                ...
            }
        }
        ...
    }
    ```

=== "Dedicated Appchain"

    ```json
    {
        ...
        "relay_chain": "rococo-local",
        "chainType": "Live",
        "genesis": {
            "runtime": {
                ...
                "authoritiesNoting": {
                    "orchestratorParaId": 0
                },
                ...
            }
        }
        ...
    }
    ```

Depois, selecione o template **Custom** e envie o arquivo JSON de especificação bruta.

![Enviar especificação customizada no Tanssi dApp](/images/builders/deploy/dapp/dapp-6.webp)

!!! nota
    O arquivo de especificação bruta não deve exceder 2 MB.

## Checar saldos {:  #check-balances}

Verifique se você tem saldo suficiente. Caso não tenha, clique em **Request Tokens** e faça login com GitHub ou Google, responda às perguntas rápidas e solicite os tokens para a carteira conectada.

![Solicitar tokens](/images/builders/deploy/dapp/dapp-7.webp)

Para appchains dedicadas, preencha o [formulário de inscrição](https://www.tanssi.network/dedicated-chain-testnet-form){target=\_blank}; a equipe enviará os tokens em até um dia útil.

Saldos mínimos para lançar:

=== "Quick Trial Appchain"
    |        Chain        | Balance Required |
    |:-------------------:|:----------------:|
    | Orchestration layer |     70 UNIT      |
    |   Tanssi TestNet    |     100 SNAP     |

=== "Dedicated Appchain"
    |       Chain        | Balance Required |
    |:------------------:|:----------------:|
    |   Tanssi TestNet   |     100 STAR     |

!!! nota
    Appchains de teste rápido usam uma camada adicional de orquestração e, portanto, requerem SNAP e UNIT. Para appchains dedicadas, apenas STAR é necessário.

## Reserve seu ID de appchain {: #reserve-appchain-id }

Se ainda não fez isso, você precisa reservar o seu ID de appchain Tanssi, que identificará sua cadeia dentro do ecossistema Tanssi.

Para reservar o seu ID de appchain Tanssi, será necessário enviar uma transação. Certifique-se de usar a conta com a qual pretende lançar sua appchain Tanssi ao enviar a transação.

1. Clique em **Reserve Network ID**
2. Assine a transação na sua carteira

![Reservar ID da appchain no Tanssi dApp](/images/builders/deploy/dapp/dapp-8.webp)

Após a transação, o ID aparecerá no dApp; clique em **Continue**. Parte dos tokens UNIT (ou STAR, para appchain dedicada) ficará reservada.

![ID reservado com sucesso](/images/builders/deploy/dapp/dapp-9.webp)

## Gere seus arquivos de appchain {: #generate-appchain-files  }

Antes de implantar, gere três arquivos:

- [A especificação da cadeia bruta](/pt/builders/build/customize/customizing-chain-specs/#generating-raw-specs-file){target=\_blank} - uma versão compacta do arquivo de especificação JSON, que define as configurações iniciais e o estado que todos os nós participantes da rede devem concordar para alcançar consenso e produzir blocos
- [O cabeçalho do estado gênese](/pt/builders/build/customize/customizing-chain-specs/#genesis-state){target=\_blank} - define o estado inicial sobre o qual todas as transações e transições de estado são executadas
- [O Gênesis Wasm](/pt/learn/framework/architecture/#runtime){target=\_blank} - um objeto WebAssembly (Wasm) que define a lógica de tempo de execução.
Eles são gerados automaticamente com base no seu ID e configurações. Clique em **Generate**.

![Gerar arquivos da appchain](/images/builders/deploy/dapp/dapp-10.webp)

Quando prontos, clique em **Continue** para o passo final.

## Faça o deploy da sua appchain {: #deploy-your-appchain}

No caso de teste rápido, são duas transações: registrar na camada de orquestração e na Tanssi TestNet.

Para registrar na camada de orquestração:

1. Clique em **Register** em **Register Network in Relay**
2. Confirme a transação na carteira

![Registrar na camada de orquestração](/images/builders/deploy/dapp/dapp-11.webp)

Quando a transação for concluída com sucesso, o dApp será atualizado para mostrar que você registrou sua appchain Tanssi na seção Register Network in Relay.

Por fim, para registrar sua appchain na Tanssi, siga estas etapas:

1. Clique em **Register** em **Register Network in Tanssi**
2. Confirme a transação

![Registrar na Tanssi](/images/builders/deploy/dapp/dapp-12.webp)

Quando a transação for concluída, o dApp exibirá o registro da appchain. No painel, você poderá acompanhar o status, blocos, endpoints RPC/WS e outras informações.

![Dashboard da appchain no Tanssi dApp](/images/builders/deploy/dapp/dapp-13.webp)

E pronto! Você registrou sua appchain Tanssi. O processo de lançamento iniciará automaticamente após a verificação da equipe Tanssi. Depois de ativa, volte ao **Dashboard** para ver o RPC e demais dados da rede.
