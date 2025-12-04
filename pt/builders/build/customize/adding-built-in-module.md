---
title: Adicionando Módulos Substrate Embutidos
description: Aprenda a aproveitar os módulos pré-construídos e prontos para uso do Substrate para adicionar novas funcionalidades à sua rede de forma eficiente, sem precisar criar tudo do zero.
icon: octicons-package-24
categories: Custom-Runtime
---

# Adicionando um Módulo Embutido {: #adding-builtin-module }

## Introdução {: #introduction }

Substrate é uma estrutura de desenvolvimento de software poderosa e modular incluída nos SDKs Polkadot para construir blockchains. Ele fornece um conjunto abrangente de ferramentas e bibliotecas que abstraem funcionalidades complexas de blockchain, permitindo que os desenvolvedores se concentrem na construção de recursos e aplicações inovadoras, focando no runtime, que contém a lógica central e as regras da transição de estado para o caso de uso.

O que diferencia o Substrate é sua arquitetura modular, que permite a integração perfeita de [módulos embutidos](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame){target=\_blank} e a criação de módulos personalizados, facilitando o desenvolvimento de protocolos de blockchain.

Para casos que exigem apenas compatibilidade com EVM (Ethereum Virtual Machine), o template fornecido no [repositório Tanssi](https://github.com/moondance-labs/tanssi#container-chain-templates){target=\_blank} atende aos requisitos sem outras modificações. No entanto, as equipes que desejam construir uma rede Substrate devem adicionar e configurar módulos embutidos e personalizados dentro do runtime. Isso envolve compilar, gerar a especificação da cadeia e implantar por meio do protocolo Tanssi para transformá-lo em uma rede ao vivo com tecnologia Tanssi.

Este artigo enfoca as etapas necessárias para adicionar um módulo embutido ao template EVM.

## Verificando Pré-requisitos {: #verifying-prerequisites }

Para seguir as etapas deste guia, você precisará ter o seguinte:

- Um ambiente de desenvolvimento saudável com o compilador Rust e o gerenciador de pacotes Cargo
- O [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank}, clonado do GitHub

Você pode ler mais sobre como instalar os componentes necessários no [artigo de pré-requisitos](/pt/builders/build/customize/prerequisites/){target=\_blank}.

Como este artigo é baseado no template EVM, certifique-se de que ele compile corretamente antes de continuar, executando o seguinte comando:

```bash
cargo build -p container-chain-frontier-node --release
```

## Adicionando um Módulo Embutido ao Runtime {: #adding-builtin-module-to-runtime }

Como introduzido no artigo de [modularidade](/pt/learn/framework/modules/){target=\_blank}, o framework Substrate já inclui muitos módulos embutidos que abordam uma ampla gama de funcionalidades, prontos para serem usados em seu runtime.

Os módulos são projetados para fornecer a funcionalidade necessária em casos de uso muito diferentes, como DeFi, NFTs ou qualquer outro, e, portanto, são blocos de construção básicos que são inerentemente abstratos e podem ser configurados de acordo com as necessidades específicas da rede com tecnologia Tanssi.

Para adicionar um módulo, as seguintes etapas são necessárias:

1. Tornar a dependência disponível dentro do projeto, declarando-a em [Cargo](https://doc.rust-lang.org/cargo){target=\_blank}, o gerenciador de pacotes da linguagem Rust
2. Tornar os recursos padrão (`std`) do módulo disponíveis para o compilador
3. Configurar o módulo
4. Adicionar o módulo ao runtime
5. Adicionar a configuração padrão à especificação da cadeia

No exemplo a seguir, o popular módulo Substrate `pallet-assets` é adicionado ao runtime do template EVM fornecido, encontrado no [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank}, especificamente na pasta `container-chains/templates/frontier/`.

### Declarar a Dependência {: #declare-dependency }

Cada pacote contém um arquivo de manifesto chamado `Cargo.toml` que declara, entre outras coisas, todas as dependências em que o pacote se baseia, e o runtime da rede com tecnologia Tanssi não é exceção.

Portanto, a primeira etapa é declarar a dependência e torná-la disponível para o runtime. Abra o arquivo `Cargo.toml` localizado na pasta `container-chains/templates/frontier/runtime` com um editor de texto e adicione o módulo, referenciando o código no Polkadot SDK:

```toml
[dependencies]
...
pallet-assets = { 
   git = "https://github.com/moondance-labs/polkadot-sdk", 
   branch = "{{ repository.tanssi.release_branch }}", 
   default-features = false 
}
...
```

!!! nota
      Nossa equipe de engenharia contribui ativamente para o desenvolvimento do Substrate, corrigindo problemas e aprimorando funcionalidades. Como resultado, o repositório fork Tanssi frequentemente fica à frente do oficial. É por isso que este exemplo faz referência a um módulo embutido de um repositório Tanssi em vez do oficial.

### Tornar os Recursos Padrão Disponíveis para o Compilador {: #standard-features }

No Cargo, as flags de “recursos” fornecem um mecanismo para dizer ao compilador para incluir ou omitir determinadas partes do código, o que é um mecanismo útil para otimizar o tempo de compilação, minimizar os tamanhos dos arquivos binários ou desabilitar determinado comportamento (por exemplo, não incluir testes unitários ou funcionalidade de benchmarking no runtime pretendido para produção).

Para compilar os recursos padrão para o módulo Assets dentro do runtime, o mesmo arquivo `Cargo.toml` na pasta `runtime` deve ser editado, ativando a flag. Tudo o que está listado nesta seção garantirá que esteja disponível para o compilador ao construir o binário do runtime, que é, em última análise, o arquivo que contém todas as informações para executar sua rede com tecnologia Tanssi inicialmente.

```toml
[features]
default = [
	"std",
]
std = [
	...,
	"pallet-assets/std",
   ...
]
```

### Configurar o Módulo {:#configure-the-module }

Com a dependência declarada no projeto, o módulo agora pode ser configurado e adicionado ao runtime. Para fazer isso, você precisa editar o arquivo `lib.rs` que está localizado em:

```text
container-chains/templates/frontier/runtime/src/lib.rs
```

A configuração de novos módulos requer a implementação de um `trait` de configuração para o módulo (neste exemplo, para Assets) no runtime, expresso em Rust da seguinte forma:

```rust
// Implementa o trait pallet_assets::Config no runtime
impl pallet_assets::Config for Runtime { ... }
```

[Traits](https://doc.rust-lang.org/book/ch10-02-traits.html){target=\_blank} são uma forma de definir comportamento compartilhado em Rust e, neste caso, eles permitem que um novo runtime se beneficie da funcionalidade que o módulo Assets fornece apenas implementando seu trait de configuração e parâmetros.

Alguns dos parâmetros que o trait precisa definir podem ser valores constantes; nesse caso, eles precisam ser definidos e incluídos na macro `parameter_types!`, o que nos ajuda a reduzir o esforço de desenvolvimento, expandindo o código e convertendo cada uma das constantes no tipo de struct correto com funções que permitem que o runtime leia seu tipo e valores de forma padronizada.

O seguinte trecho de código mostra um exemplo das definições de constantes a serem usadas na configuração do módulo:

```rust
parameter_types! {
   // A quantidade de fundos que devem ser reservados para um ativo
	pub const AssetDeposit: Balance = 100;
   // A quantidade de fundos que deve ser reservada ao criar 
   // uma nova aprovação de transferência
	pub const ApprovalDeposit: Balance = 1;
   // A quantidade básica de fundos que deve ser reservada ao adicionar metadados 
   // ao seu ativo
	pub const MetadataDepositBase: Balance = 10;
   // Os fundos adicionais que devem ser reservados para o número de bytes 
   // que você armazena em seus metadados
	pub const MetadataDepositPerByte: Balance = 1;

   // Comprimento máximo para o símbolo do ativo e nome amigável
   pub const StringLimit: u32 = 50;
}
```

É importante notar que cada módulo embutido tem um propósito diferente e, portanto, cada um deles tem necessidades diferentes em termos dos parâmetros que devem ser configurados. O seguinte trecho de código implementa o trait e configura o módulo Assets, usando tipos e as constantes definidas anteriormente na macro `parameter_types!`:

```rust
// Implementando o trait de configuração de Ativos para o runtime
impl pallet_assets::Config for Runtime {
   
   // Armazena os saldos em um inteiro sem sinal de 128bits
	type Balance = u128;
   // O ID de um ativo pode ser definido como um inteiro sem sinal de 64 bits
	type AssetId = u64;
   // Usa o módulo Balances como mecanismo para operações de moeda
	type Currency = Balances;

   // Configurar o módulo referenciando a anteriormente
   // constantes definidas

	type AssetDeposit = AssetDeposit;
	type MetadataDepositBase = MetadataDepositBase;
	type MetadataDepositPerByte = MetadataDepositPerByte;
	type ApprovalDeposit = ApprovalDeposit;
	type StringLimit = StringLimit;
   
   // Mais configuração
   ...
}
```

??? code "Ver o script completo"

    ```rust
    --8<-- 'code/builders/build/customize/built-in-module/built-in-pallet-configuration.rs'
    ```


A configuração completa do módulo contém mais parâmetros; para ver uma descrição detalhada de cada um deles, consulte o [trait de configuração oficial para a documentação do módulo Assets](https://paritytech.github.io/substrate/master/pallet_assets/pallet/trait.Config.html){target=\_blank}.

### Adicionar o Módulo ao Runtime {:#add-module-to-runtime}

In the same `lib.rs` file referenced in the previous section, there is a segment enclosed in the macro `construct_runtime!()`. This is where the pallet must be added to be included in the runtime. Since the example is based on the EVM template, the runtime is already configured to include many modules, including the modules for system support, the modules to add the Ethereum compatibility layer, the modules to support the Tanssi protocol, balances, and now also Assets:
      

```rust
construct_runtime!(
   pub enum Runtime where
      Block = Block,
      NodeBlock = opaque::Block,
      UncheckedExtrinsic = UncheckedExtrinsic,
   {
      // Coisas de suporte do sistema.
      System: frame_system = 0,
      ParachainSystem: cumulus_pallet_parachain_system = 1,
      Timestamp: pallet_timestamp = 2,
      ParachainInfo: parachain_info = 3,
      Sudo: pallet_sudo = 4,
      Utility: pallet_utility = 5,
      ...
      Balances: pallet_balances = 10,
      // Módulo Assets é adicionado aqui
      Assets: pallet_assets = 11,
      ...
   }
```

### Configurar o Módulo na Especificação da Cadeia {: #configure-chain-specs }

Finally, add the configuration in the chain specification for the genesis state in the file `chain_spec.rs` located at:

```text
container-chains/templates/frontier/node/src/`chain_spec.rs`
```

A função `testnet_genesis`, apresentada no seguinte trecho de código, define o estado inicial para os módulos incluídos no runtime (como contas financiadas inicialmente, por exemplo). Depois de adicionar o módulo Assets, é necessário inicializá-lo também e, no exemplo a seguir, seus valores padrão são definidos.

Mais detalhes sobre a especificação da cadeia e como configurá-la serão abordados no artigo [Personalizando Especificações de Cadeia](/pt/builders/build/customize/customizing-chain-specs/){target=_blank}.

```rust hl_lines="14"

fn testnet_genesis(
   endowed_accounts: Vec<AccountId>,
   id: ParaId,
   root_key: AccountId,
) -> container_chain_template_frontier_runtime::GenesisConfig {
   container_chain_template_frontier_runtime::GenesisConfig {
      system: container_chain_template_frontier_runtime::SystemConfig {
         code: container_chain_template_frontier_runtime::WASM_BINARY
               .expect("O binário WASM não foi construído, por favor, construa-o!")
               .to_vec(),
      },
      ...
      // Adicione o estado padrão para este módulo no estado de gênese
      assets: Default::default()
      ...
}
```

Com o módulo incluído, esta nova versão do runtime desbloqueou um novo conjunto de funcionalidades prontas para serem compostas com ainda mais dos módulos embutidos do Substrate ou personalizados.
