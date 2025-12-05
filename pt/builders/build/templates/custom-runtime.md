---
title: Runtime personalizado
description: Qualquer runtime personalizado pode ser adaptado para ser implantado pelo Tanssi, desde que módulos específicos sejam implementados e as configurações necessárias sejam definidas.
icon: octicons-file-binary-24
categories: Custom-Runtime
---

# Runtime personalizado

## Introdução {: #introduction }

Para as equipes que trabalham em um projeto de framework Substrate existente, será necessário incluir alguns módulos e configurações obrigatórias no runtime. Isso garantirá que o runtime existente possa se tornar um runtime de rede Tanssi sem problemas, alinhando-se com as [regras do protocolo](/pt/builders/build/templates/overview/#base-setup-supporting-tanssi){target=\_blank}.

A falha em fazê-lo pode levar à interoperabilidade reduzida e exposição desnecessária a vulnerabilidades.

## Requisitos Mínimos

Runtimes Substrate já existentes precisam implementar pelo menos o [framework](#adding-cumulus-support) para se comunicar dentro do ecossistema Tanssi, juntamente com os [módulos específicos do Tanssi](#adding-tanssi-support).

No entanto, as equipes podem já ter implementado certos módulos que podem colidir com algumas funcionalidades relacionadas ao Tanssi, por exemplo, produção de blocos, atribuição de autoridade de bloco e consenso.

Os seguintes módulos são incluídos por padrão em muitos modelos populares e devem ser removidos junto com sua configuração:

```rust
Authorship: pallet_authorship = 20,
CollatorSelection: pallet_collator_selection = 21,
Session: pallet_session = 22,
Aura: pallet_aura = 23,
AuraExt: cumulus_pallet_aura_ext = 24,
```

Em qualquer caso, certifique-se de verificar seu runtime e remover todos os módulos que podem interferir na produção de blocos como um recurso de serviço antes de iniciar o processo de registro.

## Integrando Sua Cadeia Stand-Alone {: #adding-cumulus-support }

Se seu runtime existente estiver configurado como uma cadeia stand-alone, você precisará adicionar um mecanismo de consenso para integrar no ecossistema Tanssi. Verifique qualquer um dos modelos disponíveis no [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank} para uma configuração de referência ou a [documentação do framework](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/cumulus/index.html){target=\_blank}.

## Adicionando Suporte ao Protocolo Tanssi {: #adding-tanssi-support }
Para suportar o protocolo Tanssi, será necessário adicionar dois módulos através das seguintes etapas:

1. Inclua as dependências no manifesto `Cargo.toml` (geralmente localizado na pasta raiz). Abra o arquivo `Cargo.toml` e adicione os módulos na seção `dependencies`

    ```toml
    [dependencies]
    ...
    pallet-cc-authorities-noting = { 
        git = "https://github.com/moondance-labs/tanssi", 
        branch = "master", default-features = false 
    }
    pallet_authorities_noting = {
        git = "https://github.com/moondance-labs/moonkit",
        branch = "tanssi-polkadot-v0.9.43", default-features = false
    }
    ...
    ```

2. Configure os módulos. Abra o arquivo `lib.rs` localizado na pasta `*/runtime/src` e adicione a configuração para ambos os módulos:

    ```rust
        impl pallet_author_inherent::Config for Runtime {
            type AuthorId = NimbusId;
            type AccountLookup = tp_consensus::NimbusLookUp;
            type CanAuthor = pallet_cc_authorities_noting::CanAuthor<Runtime>;
            type SlotBeacon = tp_consensus::AuraDigestSlotBeacon<Runtime>;
            type WeightInfo = 
                pallet_author_inherent::weights::SubstrateWeight<Runtime>;
        }

        impl pallet_cc_authorities_noting::Config for Runtime {
            type RuntimeEvent = RuntimeEvent;
            type SelfParaId = parachain_info::Pallet<Runtime>;
            type RelayChainStateProvider = 
                cumulus_pallet_parachain_system::RelaychainDataProvider<Self>;
            type AuthorityId = NimbusId;
            type WeightInfo = 
                pallet_cc_authorities_noting::weights::SubstrateWeight<Runtime>;
        }
    ```

    Observe que essa configuração é agnóstica do caso de uso

3. Declare os módulos como parte do runtime. No mesmo arquivo `lib.rs`, localizado na pasta `*/runtime/src`, adicione os módulos à construção do runtime:

    ```rust
            construct_runtime!(
            pub enum Runtime where
                Block = Block,
                NodeBlock = opaque::Block,
                UncheckedExtrinsic = UncheckedExtrinsic,
            {
                ...
                // Tanssi network
                AuthoritiesNoting: pallet_cc_authorities_noting = 50,
                AuthorInherent: pallet_author_inherent = 51,
                ...
            }
            );
    ```

4. Certifique-se de que seu cabeçalho está configurado da seguinte forma:

    ```rust
    type Header = generic::Header<BlockNumber, BlakeTwo256>;
    /// An index to a block.
    pub type BlockNumber = u32; 
    ```

5. Adicione o executor do bloco, para permitir que os operadores na rede Tanssi validem que os autores são os sequenciadores atribuídos pelo Tanssi (e não um ator mal-intencionado)

  ```rust
    cumulus_pallet_parachain_system::register_validate_block! {
        Runtime = Runtime,
        BlockExecutor = pallet_author_inherent::BlockExecutor::<Runtime, Executive>
        CheckInherents = CheckInherents,
    }
```