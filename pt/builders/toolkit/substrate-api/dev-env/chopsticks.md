---
title: Como usar o Chopsticks para bifurcar sua rede
description: Aprenda o básico de como usar o Chopsticks para reproduzir blocos, dissecar mudanças de estado, testar interações XCM e criar um fork local da sua rede Tanssi.
icon: octicons-code-square-24
categories: Substrate-Template, EVM-Template
---

# Como usar o Chopsticks para bifurcar sua rede

## Introdução {: #introduction }

[Chopsticks](https://github.com/AcalaNetwork/chopsticks){target=\_blank} oferece uma forma amigável para desenvolvedores bifurcarem localmente cadeias baseadas em [Substrate](/pt/learn/framework/overview/){target=\_blank}. Ele permite reproduzir blocos para examinar como transações afetam o estado, bifurcar múltiplas redes Tanssi para testes de XCM e muito mais. Isso facilita testar e experimentar configurações personalizadas de blockchain em um ambiente local sem precisar implantar uma rede real.

Em resumo, o Chopsticks simplifica o processo de construir aplicações em Substrate e o torna acessível a mais desenvolvedores.

Este artigo mostra como usar o Chopsticks para bifurcar e interagir com uma cópia local de uma rede Tanssi.

!!! note
    O Chopsticks atualmente não suporta chamadas via Ethereum JSON-RPC. Portanto, você não pode bifurcar sua cadeia com o Chopsticks e conectar o Metamask a ela.

## Pré-requisitos {: #prerequisites }

Para seguir este tutorial, clone o repositório com seus submódulos ([Smoldot](https://github.com/smol-dot/smoldot.git){target=\_blank}):

```bash
git clone --recurse-submodules https://github.com/AcalaNetwork/chopsticks.git
```

Depois, entre na pasta e instale as dependências usando o [yarn](https://classic.yarnpkg.com/en/docs/install){target=\_blank}:

```bash
 cd chopsticks && yarn
```

Por fim, faça o build do projeto:

```bash
yarn build-wasm
```

Agora o ambiente de desenvolvimento está pronto para começar a testar e depurar redes implantadas com Tanssi.

## Bifurcando uma rede EVM de Demonstração com o Chopsticks {: #forking-demo-chain }

Para bifurcar uma rede Tanssi usando o Chopsticks, execute o comando passando apenas o endpoint RPC:

```bash
yarn start --endpoint {{ networks.dancelight.demo_evm_rpc_wss_url }}
```

Esse comando inicia um clone local da cadeia no último bloco.

--8<-- 'code/builders/toolkit/substrate-api/dev-env/chopsticks/chopsticks-1.md'

Normalmente, os parâmetros de configuração ficam em um arquivo de configuração, como os que estão na pasta `configs` do repositório para relay chains e parachains do ecossistema Dotsama. O arquivo a seguir funciona para a [rede EVM de demonstração](/pt/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank}, sobrescrevendo a conta sudo da cadeia pela conta da Alith e financiando-a com tokens:

```yaml
endpoint: {{ networks.dancelight.demo_evm_rpc_wss_url }}
mock-signature-host: true
allow-unresolved-imports: true
db: ./tmp/db_ftrcon.sqlite

import-storage:
  System:
    Account:
      - - - "0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac" # Alith
        - providers: 1
          sufficients: 1
          consumers: 1
          data:
            free: "100000000000000000000000"
  Sudo:
    Key: "0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac"
```

O arquivo de configuração aceita todos os parâmetros a seguir:

|           Opção            |                                                 Descrição                                                  |
|:--------------------------:|:---------------------------------------------------------------------------------------------------------:|
|         `genesis`          |      Link para o raw genesis de uma parachain para construir o fork, em vez de usar um endpoint.          |
|        `timestamp`         |                                   Timestamp do bloco de origem do fork.                                   |
|         `endpoint`         |                                    Endpoint da parachain a ser bifurcada.                                 |
|          `block`           |                    Especifica em qual hash ou número de bloco o fork deve ser reproduzido.                 |
|      `wasm-override`       |          Caminho do Wasm a usar como runtime da parachain em vez do runtime do endpoint.                  |
|            `db`            |                Caminho para o arquivo que armazena (ou armazenará) o banco de dados da parachain.         |
|          `config`          |                                       Caminho ou URL do arquivo de configuração.                           |
|           `port`           |                                      Porta para expor um endpoint.                                         |
|     `build-block-mode`     |                         Como os blocos devem ser construídos: batch, manual, instant.                      |
|      `import-storage`      |        Caminho JSON/YAML de um storage predefinido para sobrescrever o storage da parachain.               |
| `allow-unresolved-imports` |        Se permite imports Wasm não resolvidos ao usar um Wasm para construir a parachain.                  |
|           `html`           |                        Inclua para gerar preview de diff de storage entre blocos.                         |
|   `mock-signature-host`    | Mock de assinatura: qualquer assinatura iniciada com `0xdeadbeef` e preenchida com `0xcd` é válida.        |

Você pode rodar `yarn start` para bifurcar cadeias informando um arquivo de configuração local. Como alternativa, use o nome ou a URL do GitHub se a cadeia estiver listada na pasta `configs` do repositório.

=== "Caminho de arquivo local"

    ```bash
    yarn start --config=configs/polkadot.yml
    ```

=== "Nome da cadeia"

    ```bash
    yarn start --config=polkadot
    ```

=== "URL do GitHub"

    ```bash
    yarn start \
    --config=https://github.com/AcalaNetwork/chopsticks.git/master/configs/polkadot.yml
    ```

Todas as configurações (exceto `genesis` e `timestamp`) também podem ser passadas como flags para definir o ambiente apenas pela linha de comando. Por exemplo, o comando a seguir bifurca a rede EVM de demonstração no bloco 100.

```bash
yarn start --endpoint {{ networks.dancelight.demo_evm_rpc_wss_url }} --block 100
```

### Interagir com um Fork {: #interacting-with-a-fork }

Ao executar um fork, por padrão ele fica acessível em:

```text
ws://localhost:8000
```

Você pode interagir com a parachain via bibliotecas como [Polkadot.js](https://github.com/polkadot-js/common){target=\_blank} e sua interface [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A8000#/explorer){target=\_blank}.

![Polkadot Js](/images/builders/toolkit/substrate-api/dev-env/chopsticks/chopsticks-1.webp)

Agora você deve conseguir interagir com a cadeia bifurcada como faria com a real.

!!! note
    Se o navegador não conseguir conectar ao endpoint WebSocket do Chopsticks, talvez seja necessário permitir conexões inseguras na URL do Polkadot.js Apps. Outra opção é usar a [versão em Docker do Polkadot.js Apps](https://github.com/polkadot-js/apps#docker){target=\_blank}.

## Reproduzindo Blocos {: #replaying-blocks }

Se quiser reproduzir um bloco e recuperar suas informações para dissecar os efeitos de um extrínseco, use o comando `yarn start run-block`. Os flags são:

|            Flag            |                                       Descrição                                        |
|:--------------------------:|:--------------------------------------------------------------------------------------:|
|         `endpoint`         |                          Endpoint da parachain a ser bifurcada.                        |
|          `block`           |                 Especifica em qual hash ou número de bloco reproduzir o fork.          |
|      `wasm-override`       |      Caminho do Wasm a usar como runtime da parachain em vez do runtime do endpoint.   |
|            `db`            |      Caminho para o arquivo que armazena (ou armazenará) o banco de dados da cadeia.   |
|          `config`          |                             Caminho ou URL do arquivo de configuração.                 |
| `output-path=/[file_path]` |      Imprime os resultados em um arquivo JSON em vez de exibi-los no console.          |
|           `html`           |   Inclua para gerar uma representação HTML do diff de storage entre blocos.            |
|           `open`           |                         Define se abre a representação HTML.                           |

Por exemplo, o comando abaixo executa novamente o bloco 1000 da rede EVM de demonstração e grava o diff de storage e outros dados em `chain-output.json`:  

```bash
yarn start run-block  \
--endpoint {{ networks.dancelight.demo_evm_rpc_wss_url }}  \
--output-path=./chain-output.json  \
--block 1000
```

## Comandos WebSocket {: #websocket-commands }

O servidor WebSocket interno do Chopsticks possui endpoints especiais para manipular a cadeia Substrate local.

Estes são os métodos que podem ser invocados e seus parâmetros:

???+ function "**dev_newBlock** (options) — Gera um ou mais blocos novos"

    === "Parâmetros"

        - **options** - `{ "to": number, "count": number }` - objeto JSON em que `"to"` cria blocos até certo valor e `"count"` aumenta em determinado número de blocos. Use apenas uma entrada por vez no objeto

    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api'
        const ws = new WsProvider(`ws://localhost:8000`)
        // Cria cinco blocos novos
        await ws.send('dev_newBlock', [{ count: 5 }])
        ```

??? function "**dev_setStorage** (values, blockHash) — Cria ou sobrescreve o valor de qualquer storage"

    === "Parâmetros"

         - **values** - Objeto - JSON semelhante ao caminho para um valor de storage, como você obteria via Polkadot.js  
        - **blockHash** - String - opcional, hash do bloco no qual o valor de storage é alterado  
        
    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Sobrescreve a chave sudo
        await ws.send('dev_setStorage', 
            [{"Sudo": { "Key": "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b" }}]
        );
        ```

??? function "**dev_timeTravel** (date) — Define o timestamp do bloco para o valor informado"

    === "Parâmetros"

         - **date** - Date - string compatível com a biblioteca Date do JavaScript que altera o timestamp dos próximos blocos. Todos os blocos futuros serão criados sequencialmente após esse ponto no tempo  

    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Define o timestamp para 15 de agosto de 2030
        await ws.send('dev_timeTravel', ["2030-08-15T00:00:00"]);
        ```

??? function "**dev_setHead** (hashOrNumber) — Define a head da blockchain para um hash ou número específico"

    === "Parâmetros"

         - **hashOrNumber** - number | string - se encontrado, a head será definida para o bloco com esse número ou hash
        
    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Define a head para o bloco 500
        await ws.send('dev_setHead', [500]);
        ```

--8<-- 'text/_disclaimers/third-party-content.md'
