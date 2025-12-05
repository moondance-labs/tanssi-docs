---
title: Como usar Chopsticks para bifurcar sua rede
description: Aprenda o básico de como usar o Chopsticks para reproduzir blocos, dissecar mudanças de estado, testar interações XCM e criar uma bifurcação local de sua rede Tanssi.
icon: octicons-code-square-24
categories: Substrate-Template, EVM-Template
---

# Como usar Chopsticks para bifurcar sua rede

## Introdução {: #introduction }

[Chopsticks](https://github.com/AcalaNetwork/chopsticks){target=\_blank} fornece um método amigável para desenvolvedores de bifurcar localmente as cadeias [Substrate-based](/pt/learn/framework/overview/){target=\_blank} existentes. Ele permite a reprodução de blocos para examinar facilmente como as transações afetam o estado, a bifurcação de várias redes Tanssi para testes XCM e muito mais. Isso capacita os desenvolvedores a testar e experimentar suas configurações de blockchain personalizadas em um ambiente de desenvolvimento local sem implantar uma rede ao vivo.

No geral, o Chopsticks visa simplificar o processo de construção de aplicativos blockchain no Substrate e torná-lo acessível a uma gama mais ampla de desenvolvedores.

Este artigo abordará o uso do Chopsticks para bifurcar e interagir com uma cópia local de uma rede Tanssi.

!!! nota
    O Chopsticks atualmente não oferece suporte a chamadas feitas via Ethereum JSON-RPC. Consequentemente, você não pode bifurcar sua cadeia usando o Chopsticks e conectar o Metamask a ela.

## Pré-requisitos {: #prerequisites }

Para acompanhar este tutorial, você precisará clonar o repositório junto com seus submódulos([Smoldot](https://github.com/smol-dot/smoldot.git){target=\_blank}):

```bash
git clone --recurse-submodules https://github.com/AcalaNetwork/chopsticks.git
```

Em seguida, entre na pasta e instale as dependências usando [yarn](https://classic.yarnpkg.com/en/docs/install){target=\_blank}:

```bash
 cd chopsticks && yarn
```

Finalmente, construa o projeto:

```bash
yarn build-wasm
```

Agora o ambiente de desenvolvimento está pronto para começar a testar e depurar redes implantadas na Tanssi.

## Bifurcando uma rede EVM de demonstração com Chopsticks {: #forking-demo-chain }

Para bifurcar uma rede Tanssi usando o Chopsticks, execute o comando com apenas o endpoint RPC como um parâmetro:

```bash
yarn start --endpoint {{ networks.dancelight.demo_evm_rpc_wss_url }}
```

Este comando iniciará um clone local da cadeia como estava no bloco mais recente.

--8<-- 'code/builders/toolkit/substrate-api/dev-env/chopsticks/chopsticks-1.md'

Normalmente, os parâmetros de configuração são armazenados em um arquivo de configuração, como são as configurações na pasta `configs` do repositório para as cadeias de retransmissão e parachains implantadas no ecossistema Dotsama. O seguinte arquivo de configuração funciona para a [rede EVM de demonstração](/pt/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank}, substituindo a conta sudo da cadeia pela de Alith e, adicionalmente, financiando a conta com tokens:

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

O arquivo de configuração aceita todos os seguintes parâmetros:

|           Opção           |                                                 Descrição                                                  |
|:--------------------------:|:------------------------------------------------------------------------------------------------------------:|
|         `genesis`          |          O link para um arquivo genesis bruto de uma parachain para construir a bifurcação, em vez de um endpoint.          |
|        `timestamp`         |                                     Carimbo de data/hora do bloco para bifurcar.                                     |
|         `endpoint`         |                                    O endpoint da parachain para bifurcar.                                    |
|          `block`           |                       Use para especificar em qual bloco hash ou número reproduzir a bifurcação.                       |
|      `wasm-override`       |              Caminho do Wasm para usar como tempo de execução da parachain em vez do tempo de execução do endpoint.              |
|            `db`            |               Caminho para o nome do arquivo que armazena ou armazenará o banco de dados da parachain.               |
|          `config`          |                                       Caminho ou URL do arquivo de configuração.                                        |
|           `port`           |                                      A porta para expor um endpoint em.                                      |
|     `build-block-mode`     |                       Como os blocos devem ser construídos na bifurcação: batch, manual, instantâneo.                        |
|      `import-storage`      |              Um caminho de arquivo de armazenamento JSON/YAML predefinido para substituir no armazenamento da parachain.               |
| `allow-unresolved-imports` |              Se deve permitir importações Wasm não resolvidas ao usar um Wasm para construir a parachain.              |
|           `html`           |                           Incluir para gerar a visualização de diferença de armazenamento entre os blocos.                           |
|   `mock-signature-host`    | Simular host de assinatura para que qualquer assinatura comece com `0xdeadbeef` e preenchida por `0xcd` seja considerada válida. |

Você pode executar o comando `yarn start` para bifurcar cadeias, especificando um arquivo de configuração local. Alternativamente, o nome ou a URL do GitHub podem ser usados ​​se a cadeia estiver listada na pasta `configs` do repositório.


=== "Caminho do arquivo local"

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

Todas as configurações (exceto `genesis` e `timestamp`) também podem ser passadas como flags para configurar o ambiente completamente na linha de comando. Por exemplo, o seguinte comando bifurca a rede EVM de demonstração no bloco 100.

```bash
yarn start --endpoint {{ networks.dancelight.demo_evm_rpc_wss_url }} --block 100
```



### Interagindo com uma bifurcação {: #interacting-with-a-fork }


Ao executar uma bifurcação, por padrão, ela estará acessível em:

```text
ws://localhost:8000
```

Você pode interagir com a parachain por meio de bibliotecas como [Polkadot.js](https://github.com/polkadot-js/common){target=\_blank} e sua [interface de usuário, Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A8000#/explorer){target=\_blank}.

![Polkadot Js](/images/builders/toolkit/substrate-api/dev-env/chopsticks/chopsticks-1.webp)

Você deve ser capaz de interagir com a cadeia bifurcada como faria com a real.

!!! nota
    Se seu navegador não puder se conectar ao endpoint WebSocket fornecido pelo Chopsticks, talvez seja necessário permitir conexões inseguras para o URL do Polkadot.js Apps. Outra solução é executar a [versão Docker do Polkadot.js Apps](https://github.com/polkadot-js/apps#docker){target=\_blank}.

## Reexecutando blocos {: #replaying-blocks }

Se você deseja reproduzir um bloco e recuperar suas informações para dissecar os efeitos de uma extrínseca, pode usar o comando `yarn start run-block`. Suas seguintes flags são:

|            Sinalizador            |                                      Descrição                                       |
|:--------------------------:|:--------------------------------------------------------------------------------------:|
|         `endpoint`         |                         O endpoint da parachain para bifurcar.                         |
|          `block`           |            Use para especificar em qual bloco hash ou número reproduzir a bifurcação.            |
|      `wasm-override`       |   Caminho do Wasm para usar como tempo de execução da parachain em vez do tempo de execução do endpoint.   |
|            `db`            |    Caminho para o nome do arquivo que armazena ou armazenará o banco de dados da parachain.    |
|          `config`          |                            Caminho ou URL do arquivo de configuração.                             |
| `output-path=/[file_path]` |   Use para imprimir os resultados em um arquivo JSON em vez de imprimi-lo no console.   |
|           `open`           |                        Se deve abrir a representação HTML.                        |

Por exemplo, a execução do seguinte comando reexecutará o bloco 1000 das redes EVM de demonstração e gravará a diferença de armazenamento e outros dados em um arquivo `chain-output.json`:

```bash
yarn start run-block  \
--endpoint {{ networks.dancelight.demo_evm_rpc_wss_url }}  \
--output-path=./chain-output.json  \
--block 1000
```

## Comandos WebSocket {: #websocket-commands }

O servidor WebSocket interno do Chopstick possui endpoints especiais que permitem a manipulação da cadeia Substrate local.

Estes são os métodos que podem ser invocados e seus parâmetros:

???+ function "**dev_newBlock** (options) — Gera um ou mais blocos novos"

    === "Parâmetros"

        - **options** - `{ "to": number, "count": number }` - um objeto JSON onde `\"to\"` criará blocos até um determinado valor, e `\"count\"` aumentará em um certo número de blocos. Use apenas uma entrada por vez dentro do objeto JSON

    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api'
        const ws = new WsProvider(`ws://localhost:8000`)
        // Cria cinco novos blocos
        await ws.send('dev_newBlock', [{ count: 5 }])



??? function "**dev_setStorage** (values, blockHash) — Cria ou sobrescreve o valor de qualquer armazenamento"

    === "Parâmetros"

         - **values** - Object - um objeto JSON semelhante ao caminho para um valor de armazenamento, semelhante ao que você recuperaria via Polkadot.js  
        - **blockHash** - String - opcional, o hash do bloco em que o valor do armazenamento é alterado  
        
    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Substitui a chave sudo
        await ws.send('dev_setStorage', 
            [{"Sudo": { "Key": "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b" }}]
        );
        ```

??? function "**dev_timeTravel** (date) — Define o carimbo de data/hora do bloco para o valor da data"

    === "Parâmetros"

         - **date** - Date - uma string compatível com a biblioteca JavaScript Date que mudará o carimbo de data/hora em que os próximos blocos a serem criados serão. Todos os blocos futuros serão criados sequencialmente após esse ponto no tempo  

    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Define o carimbo de data/hora do bloco para 15 de agosto de 2030
        await ws.send('dev_timeTravel', ["2030-08-15T00:00:00"]);
        ```

??? function "**dev_setHead** (hashOrNumber) — Define o cabeçalho do blockchain para um hash ou número específico"


    === "Parâmetros"

         - **hashOrNumber** - number | string - se encontrado, o cabeçalho da cadeia será definido para o bloco com o número do bloco ou hash do bloco deste valor
        
    === "Exemplo"

        ```js
        import { WsProvider } from '@polkadot/api';
        const ws = new WsProvider(`ws://localhost:8000`);
        // Define o cabeçalho para o número do bloco 500
        await ws.send('dev_setHead', [500]);
        ```

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
