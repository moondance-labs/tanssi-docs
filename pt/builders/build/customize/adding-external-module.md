---
title: Adicionar Módulos Externos
description: Aprenda a resolver problemas de referência duplicada de dependências ao personalizar seu template de rede alimentado pelo Tanssi com a ferramenta em Rust chamada Diener.
icon: octicons-plug-24
categories: Custom-Runtime
---

# Adicionar um Módulo Externo {: #adding-external-module }

## Introdução {: #introduction }

Desenvolvedores construindo sobre os [Templates oferecidos pela Tanssi](/pt/builders/build/templates/){target=\_blank} podem querer adicionar alguns módulos/dependências externos em seu tempo de execução para expandir certas funcionalidades.

O repositório Tanssi e os modelos pegam todas as dependências de [um fork](https://github.com/moondance-labs/polkadot-sdk){target=\_blank} do repositório oficial do Polkadot SDK. Este fork é mantido pela equipe de engenharia da Tanssi, que geralmente contribui ativamente para o desenvolvimento da Substrate, corrigindo problemas e aprimorando funcionalidades, e, como resultado, o repositório do fork frequentemente fica temporariamente à frente do oficial.

Um problema de dupla referência pode surgir ao adicionar uma dependência externa, como uma pallet de terceiros. Isso acontece se um módulo Tanssi faz referência a uma dependência do repositório fork do Polkadot SDK, e a terceiros faz referência à mesma dependência do repositório oficial do Polkadot SDK. Para resolver esse problema, as referências às dependências devem ser unificadas.

## Resolvendo Conflitos de Dependências com Diener {: #solving-dependencies-conflicts-diener }

Para lidar de forma eficiente com as dependências e suas origens, você pode conferir a ferramenta [diener](https://github.com/paritytech/diener){target=\_blank}.

Se o arquivo executável `diener`, o [repositório do Polkadot SDK](https://github.com/paritytech/polkadot-sdk){target=\_blank} clonado e seu fork Tanssi estiverem localizados na mesma pasta, entre na pasta do fork Tanssi e execute o seguinte comando:

```bash
../diener patch --crates-to-patch ../polkadot-sdk \
    --target https://github.com/paritytech/polkadot-sdk \
    --point-to-git https://github.com/moondance-labs/polkadot-sdk \
    --point-to-git-branch {{ repository.tanssi.release_branch }}
```

Este comando aplica as alterações ao arquivo `Cargo.toml`, corrigindo as dependências e resolvendo os problemas de dupla referência.

Você pode visitar a [documentação do diener](https://docs.rs/crate/diener/latest){target=\_blank} para saber mais sobre a ferramenta e outras funções extras que ela oferece.

## Exemplo do Problema de Dupla Referência {: #double-reference-issue }

Para ilustrar a situação, as seguintes etapas adicionam um [módulo externo](https://github.com/papermoonio/pallet-toggle){target=\_blank} de demonstração a um tempo de execução personalizado com base no [modelo de rede com tecnologia Tanssi de linha de base](/pt/builders/build/templates/substrate/){target=\_blank}. Uma maneira de seguir este tutorial é clonar o [repositório Tanssi Github](https://github.com/moondance-labs/tanssi){target=\_blank}, que atuará como o repositório raiz do projeto.

Este tutorial gerará um erro de tempo de compilação de referência múltipla. Finalmente, as etapas mostrarão como corrigir o erro de compilação corrigindo as dependências com a ferramenta `diener`, o tempo de execução será compilado com sucesso e funcionará conforme o esperado.

### Adicionar uma Dependência de Terceiros {: #add-third-party-dependency }

Semelhante ao que é descrito no artigo [módulo embutido](/pt/builders/build/customize/adding-built-in-module/#adding-a-built-in-module-to-runtime){target=\_blank}, a adição de um módulo de terceiros requer as seguintes etapas:

1. Declare a dependência no arquivo `Cargo.toml` raiz
2. Torne as características padrão disponíveis para o compilador
3. Configure e adicione o módulo ao tempo de execução

Se o módulo de terceiros fizer referência a alguma dependência já referenciada de uma fonte ou versão distinta, a compilação falhará.

O diagrama a seguir mostra como duas referências diferentes para a mesma dependência estão sendo incluídas no tempo de execução, fazendo com que a compilação falhe:

![Dupla referência](/images/builders/build/external-module/external-module-1.webp)

Para resolver este problema, será necessário aplicar um patch para que as referências para a dependência sejam unificadas:

![Referência corrigida](/images/builders/build/external-module/external-module-2.webp)

### Declarando a Dependência {: #declaring-dependency }

A primeira etapa para reproduzir o problema de dupla referência é declarar a dependência no arquivo `Cargo.toml` localizado na pasta raiz do repositório, na seção `[dependencies]`. Para este exemplo, um simples [módulo de alternância](https://github.com/papermoonio/pallet-toggle){target=\_blank} é usado.

Este módulo `toggle`, construído para fins de teste e educacionais, adiciona lógica básica ao tempo de execução, permitindo que os usuários alternem um estado entre verdadeiro e falso.

```toml
[dependencies]
...
pallet-toggle = { 
    git = "https://github.com/papermoonio/pallet-toggle", 
    default-features = false 
}
...
```

### Tornando os Recursos Padrão Disponíveis para o Compilador {: #add-standard-features }

Tendo declarado o módulo no arquivo `Cargo.toml` do espaço de trabalho, a dependência pode agora ser adicionada ao arquivo `Cargo.toml` do modelo específico, que, para este exemplo que usa o repositório Tanssi GitHub, está localizado na pasta `container-chains/templates/simple/runtime`.

```toml
[dependencies]
...
pallet-toggle = { workspace = true }
...
```

No mesmo arquivo `Cargo.toml`, adicione os seguintes recursos.

```toml
[features]
default = [
	"std",
]
std = [
	...,
	"pallet-toggle/std",
   ...
]
...
runtime-benchmarks = [
	...,
	"pallet-toggle/runtime-benchmarks",
]

try-runtime = [
	...,
	"pallet-toggle/try-runtime",
]
```

### Configurar e Adicionar o Módulo ao Tempo de Execução {: #configure-module-in-the-runtime }

Em seguida, adicione o seguinte snippet ao arquivo `lib.rs` dentro da pasta de tempo de execução. Isso configura o módulo e adiciona o módulo dentro da macro `construct_runtime!`.

```rust
...
impl pallet_toggle::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;
    type WeightInfo = pallet_toggle::weights::SubstrateWeight<Runtime>;
}

construct_runtime!(
    pub enum Runtime
    {
        ...
        ...
        Toggle: pallet_toggle,
    }
);
```

### Compilar o Tempo de Execução {: #compile-runtime }

Após concluir as etapas anteriores, o módulo é declarado uma dependência no projeto, configurado e adicionado ao tempo de execução.

Compile o modelo usando o seguinte comando:

```bash
cargo build -p container-chain-simple-node --release
```

A saída do terminal exibirá um erro, semelhante ao seguinte, causado por diferentes módulos referenciando diferentes versões da mesma dependência:

```bash
error: failed to select a version for `syn`.
```

### Dependências de Patch {: #patch-dependencies }

Finalmente, a execução do [comando](#solving-dependencies-conflicts-diener) `diener` adicionará uma seção `patch` ao seu arquivo `Cargo.toml` do espaço de trabalho, substituindo as dependências e unificando as origens e versões.

É assim que a execução no terminal se parece:

--8<-- 'code/builders/build/customize/adding-external-module/terminal/patching.md'

Como mostrado na saída do terminal, `diener` adiciona um patch para as dependências, criando uma seção `patch` em seu `toml` substituindo sua origem:

```toml
[patch."https://github.com/paritytech/polkadot-sdk"]
bridge-runtime-common = { git = "https://github.com/moondance-labs/polkadot-sdk" , branch = "tanssi-polkadot-v1.3.0" }
bp-header-chain = { git = "https://github.com/moondance-labs/polkadot-sdk" , branch = "tanssi-polkadot-v1.3.0" }
bp-runtime = { git = "https://github.com/moondance-labs/polkadot-sdk" , branch = "tanssi-polkadot-v1.3.0" }
...
```

Finalmente, a compilação terá sucesso e o módulo será integrado ao seu tempo de execução.
