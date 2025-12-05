---
title: Pré-requisitos para a construção de uma rede
description: Instale o conjunto básico de ferramentas e software para configurar um ambiente de desenvolvimento local e ser capaz de compilar, executar e testar sua appchain.
icon: octicons-checkbox-24
Categories: Custom-Runtime
---

# Pré-requisitos para a construção de uma rede {: #prerequisites}

## Introdução {: #introduction }

A implantação de uma rede através da Tanssi é um passo bastante simples, onde o único requisito é ter uma [especificação de cadeia](https://docs.polkadot.com/develop/parachains/deployment/generate-chain-specs/){target=\_blank} válida para fazer upload.

Embora a Tanssi forneça especificações de cadeia para os [modelos disponíveis](/pt/learn/decentralized-networks/included-templates/), pode ser necessário gerar uma nova para corresponder a quaisquer alterações que o caso de uso possa precisar ser implementado no tempo de execução.

As seções a seguir deste artigo cobrirão o software mínimo necessário e seu processo de instalação para obter um ambiente de desenvolvimento adequado para compilar um nó Substrate e gerar a especificação da cadeia.

## Instalação do Rust {: #installing-rust }

[Rust](/pt/learn/framework/overview/#rust-programming-language){target=\_blank} é uma linguagem de programação moderna, portátil e de alto desempenho que é a base da estrutura de desenvolvimento de blockchain Substrate.

Para compilar a rede Tanssi, o compilador rust, `rustc`, e o gerenciador de pacotes, `cargo`, devem ser instalados no sistema.

De acordo com as instruções na [documentação oficial do Rust](https://rust-lang.org/tools/install/){target=\_blank}, para sistemas Linux ou macOS, execute o seguinte comando:

=== "Linux"

    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

=== "MacOS"

    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

Quando o processo de instalação for concluído, executar o seguinte comando verifica se o compilador recém-instalado funciona corretamente, mostrando o número da versão:
 
=== "Linux"

    ```bash
    rustc --version
    ```

=== "MacOS"

    ```bash
    rustc --version
    ```

Há outros métodos para instalar o Rust, como usar um gerenciador de pacotes. Outras opções podem ser encontradas no [site oficial do Rust](https://forge.rust-lang.org/infra/other-installation-methods.html){target=\_blank}.

## Instalação do Git {: #installing-git }

[Git](https://git-scm.com){target=\_blank} é recomendado para clonar o [repositório de código](https://github.com/moondance-labs/tanssi){target=\_blank} da Tanssi, onde os modelos de nó podem ser encontrados. O Git provavelmente é fornecido na configuração de instalação padrão do sistema operacional ou incluído em outras ferramentas, como o Xcode no MacOS.

Se o Git não estiver presente no sistema, o seguinte comando o instalará usando um gerenciador de pacotes:

=== "Linux"

    ```bash
    apt-get install git
    ```

=== "MacOS"

    ```bash
    brew install git
    ```     

Para verificar a instalação correta do Git, executar o seguinte comando em um terminal deve exibir a versão do Git:

=== "Linux"

    ```bash
    git --version
    ```

=== "MacOS"

    ```bash
    git --version
    ```

## Construindo um modelo Tanssi {: #building-tanssi-template  }

Para construir um nó Substrate, como os modelos incluídos no [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank}, é necessário instalar componentes de desenvolvimento adicionais no sistema:

=== "Linux"

    ```bash
    apt-get install -y build-essential protobuf-compiler clang libssl-dev pkg-config
    ```
    
=== "MacOS"

    ```bash
    brew install protobuf openssl
    ```

1. Clone the Tanssi code hosted on GitHub
```bash
git clone https://github.com/moondance-labs/tanssi
```

2. Entre na pasta do projeto
```bash
cd tanssi
```

3. Construa o modelo de rede Tanssi
=== "Baseline EVM"

    ```bash
    cargo build -p container-chain-frontier-node --release
    ```

=== "Baseline Substrate"

    ```bash
    cargo build -p container-chain-simple-node --release
    ```

Ter um ambiente de desenvolvimento saudável será necessário para construir um tempo de execução personalizado e, finalmente, gerar o arquivo de especificação da cadeia que será usado para implantar sua rede Tanssi.
