---
title: Indexar Transferências ERC-20 em uma Rede EVM
description: Aprenda a usar o Squid SDK, um framework de query node que indexa dados Substrate e EVM, para processar dados on-chain da sua rede com tecnologia Tanssi.
icon: octicons-arrow-switch-24
categories: EVM-Template
---

# Indexando Transferências ERC-20 em uma Rede EVM da Tanssi

## Introdução {: #introduction }

[SQD](https://www.sqd.ai/){target=\_blank} é uma rede de dados que permite recuperar informações de blockchain de mais de 100 cadeias de forma rápida e econômica usando o data lake descentralizado da SQD e seu SDK open source. Em termos simples, o SQD funciona como uma ferramenta ETL (extract, transform, load) com um servidor [GraphQL](https://graphql.org){target=\_blank} incluído, permitindo filtragem, paginação e até busca full-text.

O SQD tem suporte nativo e completo para dados EVM e Substrate, oferecendo um Archive e um Processor para cada. O Substrate Archive e o Processor podem indexar dados Substrate e EVM, permitindo extrair dados on-chain de qualquer rede com tecnologia Tanssi e processar logs EVM e entidades Substrate (eventos, extrínsecos e itens de armazenamento) em um único projeto, servindo tudo em um único endpoint GraphQL. Se quiser indexar apenas dados EVM, use o EVM Archive e o Processor.

Este tutorial passo a passo mostra como construir um Squid para indexar dados EVM do início ao fim. O ideal é seguir cada passo, mas você também pode conferir a [versão completa do Squid deste tutorial no repositório tanssiSquid](https://github.com/themacexpert/tanssiSquid){target=\_blank}.

## Verificar Pré-requisitos {: #check-prerequisites }

Para acompanhar este tutorial, você precisará de:

- [Docker instalado](https://docs.docker.com/get-started/get-docker/){target=\_blank}
- [Docker Compose instalado](https://docs.docker.com/compose/install){target=\_blank}
- Um projeto Hardhat vazio. Para instruções passo a passo, veja a seção [Criando um Projeto Hardhat](/pt/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\_blank} na nossa documentação do Hardhat

--8<-- 'text/pt/_common/general-js-tutorial-check.md'

## Implantar um ERC-20 com Hardhat {: #deploy-an-erc20-with-hardhat }

Antes de indexar qualquer coisa com o SQD, precisamos ter algo para indexar! Esta seção mostra como implantar um token ERC-20 na sua rede com Tanssi para, em seguida, indexá-lo. Você pode pular para [Criar um Projeto Squid](#create-a-squid-project) se:

- Já implantou um token ERC-20 na sua rede (e fez várias transferências)
- Prefere usar um token ERC-20 já implantado na rede EVM de demonstração (há vários eventos de transferência lá)

Se quiser usar um token existente na rede EVM de demonstração, use o contrato `MyTok.sol` abaixo. Os hashes de transferências também são fornecidos para ajudar na depuração.

Nesta seção, vamos implantar um ERC-20 na sua rede EVM e criar um script rápido para disparar uma série de transferências que serão capturadas pelo indexador SQD. Certifique-se de ter inicializado um projeto Hardhat vazio conforme as instruções em [Criando um Projeto Hardhat](/pt/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\_blank}.

Antes de criar o projeto, instale algumas dependências: o [plugin Hardhat Ethers](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=\_blank} e os [contratos OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x){target=\_blank}. O plugin Hardhat Ethers facilita o uso da biblioteca [Ethers](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank} para interagir com a rede. Usaremos a implementação base ERC-20 do OpenZeppelin para criar o token. Para instalar as dependências:

=== "npm"

    ```bash
    npm install @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
    ```

=== "yarn"

    ```bash
    yarn add @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
    ```

Agora edite `hardhat.config.js` para incluir as configurações de rede e conta. Substitua os valores da rede EVM de demonstração pelos parâmetros da sua rede com tecnologia Tanssi, que podem ser encontrados em [apps.tanssi.network](https://apps.tanssi.network){target=\_blank}.

???+ code "hardhat.config.js"

    ```js
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/hardhat-config.js'
    ```

!!! remember
    Nunca armazene suas chaves privadas em arquivos JavaScript ou Python. Fazemos isso aqui apenas para fins de demonstração. Use sempre um gerenciador de segredos ou serviço similar.

### Criar um contrato ERC-20 {: #create-an-erc-20-contract }

Para este tutorial, criaremos um contrato ERC-20 simples, usando a implementação base do OpenZeppelin. Crie o arquivo do contrato `MyTok.sol`:

```bash
mkdir -p contracts && touch contracts/MyTok.sol
```

Agora edite `MyTok.sol` para incluir o contrato abaixo, que cunha uma oferta inicial de MYTOKs e permite que apenas o owner do contrato cunhe mais tokens:

???+ code "MyTok.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/MyTok.sol'
    ```

### Implantar o Contrato ERC-20 {: #deploy-erc-20-contract }

Com o contrato pronto, podemos compilá-lo e implantá-lo.

Para compilar:

```bash
npx hardhat compile
```

![Compilar contratos no Hardhat](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-1.webp)

Esse comando compila o contrato e gera o diretório `artifacts` contendo o ABI.

Para implantar, criaremos um script que faz o deploy do contrato ERC-20 e cunha uma oferta inicial de 1000 MYTOK usando a conta da Alith. A oferta inicial será enviada ao owner do contrato (Alith).

Siga os passos:

1. Crie o diretório e o arquivo do script:

    ```bash
    mkdir -p scripts && touch scripts/deploy.js
    ```

2. No arquivo `deploy.js`, adicione:

    ???+ code "deploy.js"

        ```ts
        --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/deploy.js'
        ```

3. Execute o script usando a configuração da rede `demo` definida em `hardhat.config.js`:

    ```bash
    npx hardhat run scripts/deploy.js --network demo
    ```

O endereço do contrato implantado será exibido no terminal. Guarde-o; precisaremos dele para interagir com o contrato na próxima seção.

### Transferir ERC-20s {: #transfer-erc-20s }

Como vamos indexar eventos `Transfer`, enviaremos algumas transações transferindo tokens da conta de Alith para outras contas de teste. Criaremos um script simples que transfere 10 MYTOKs para Baltathar, Charleth, Dorothy e Ethan. Siga:

Crie um novo script para enviar transações:

```bash
touch scripts/transactions.js
```

No arquivo `transactions.js`, adicione o script abaixo e insira o endereço do contrato MyTok implantado (exibido no passo anterior):

???+ code "transactions.js"

    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/transactions.js'
    ```

Execute o script para enviar as transações:

```bash
npx hardhat run scripts/transactions.js --network demo
```

Cada transação enviará um log para o terminal.

![Enviar transações usando Hardhat](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-2.webp)

Agora podemos criar o Squid para indexar os dados no nó local de desenvolvimento.

## Criar um Projeto Squid {: #create-a-squid-project }

Vamos criar o projeto Subquid. Primeiro, instale o [Squid CLI](https://docs.sqd.ai/squid-cli/){target=\_blank}:

```bash
npm i -g @subsquid/cli@latest
```

Para verificar a instalação:

```bash
sqd --version
```

Agora podemos usar o comando `sqd` no projeto. Para criá-lo, usaremos o flag `--template` (`-t`) e o template EVM Squid, que é um projeto inicial para indexar cadeias EVM.

Execute o comando para criar um EVM Squid chamado `tanssi-squid`:

```bash
sqd init tanssi-squid --template evm
```

Isso criará um Squid com todas as dependências. Instale-as:

```bash
cd tanssi-squid && npm ci
```

Com o ponto de partida pronto, vamos configurar o projeto para indexar eventos `Transfer` do ERC-20 na nossa rede Tanssi.

##  Configurar o Indexador para Transferências ERC-20 {: #set-up-the-indexer-for-erc-20-transfers}

Para indexar transferências ERC-20, faremos:

1. Definir o schema do banco e gerar as classes de entidades
2. Usar o ABI do contrato `ERC20` para gerar classes de interface TypeScript
3. Configurar o processor especificando exatamente quais dados ingerir
4. Transformar os dados e inseri-los em um banco TypeORM em `main.ts`
5. Rodar o indexador e consultar o squid

Primeiro, defina o schema para os dados de transferência. Edite o arquivo `schema.graphql` (na raiz) e crie as entidades `Transfer` e `Account`. Copie o schema abaixo, removendo qualquer schema existente.

???+ code "schema.graphql"

    ```graphql
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/schema.graphql'
    ```

Agora gere as classes de entidades a partir do schema (criadas em `src/model/generated`):

```bash
sqd codegen
```

No próximo passo, usaremos o ABI do ERC-20 para gerar classes de interface TypeScript. Abaixo há um ABI padrão do ERC-20. Copie-o para um arquivo `erc20.json` na pasta `abi` na raiz do projeto.

??? code "ERC-20 ABI"

    ```json
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/erc20.json'
    ```

Em seguida, use o ABI para gerar as interfaces TypeScript:

```bash
sqd typegen
```

![Executar comandos do Squid](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-3.webp)

Isso gera as classes em `src/abi/erc20.ts`. Neste tutorial, usaremos os `events`.

### Configurar o Processor {: #configure-the-processor}

O arquivo `processor.ts` indica ao SQD quais dados ingerir. A transformação virá depois. Em `processor.ts`, precisamos indicar fonte de dados, endereço do contrato, evento(s) a indexar e intervalo de blocos.

Abra `src/processor.ts`. Primeiro, informe ao processor qual contrato nos interessa. Crie a constante do endereço assim:

```ts
export const CONTRACT_ADDRESS = 'INSERT_CONTRACT_ADDRESS'.toLowerCase();
```

O `.toLowerCase()` é fundamental porque o processor diferencia maiúsculas/minúsculas e alguns explorers exibem endereços com capitalização. Em seguida, localize `export const processor = new EvmBatchProcessor()` seguido de `.setDataSource`. Faremos algumas alterações. O SQD tem [archives disponíveis para várias cadeias](https://docs.sqd.ai/subsquid-network/reference/networks/){target=\_blank} que aceleram a obtenção de dados, mas é improvável que sua rede já tenha um archive hospedado. Sem problema: o SQD pode obter os dados via RPC da sua rede. Comente ou remova a linha do archive. O código deve ficar assim:

```ts
.setDataSource({
  chain: {
    url: assertNotNull(
      '{{ networks.dancelight.demo_evm_rpc_url }}'
    ),
    rateLimit: 300,
  },
})
```

O template vem com uma variável para a URL RPC no `.env`. Você pode substituir pela URL da sua rede. Para demonstração, a URL da rede EVM de teste está hardcoded acima. Se preferir definir no `.env`, a linha ficará:

```text
RPC_ENDPOINT={{ networks.dancelight.demo_evm_rpc_url }}
```

Agora defina o evento a indexar:

```ts
.addLog({
  address: [contractAddress],
  topic0: [erc20.events.Transfer.topic],
  transaction: true,
})
```

O evento `Transfer` está em `erc20.ts`, gerado pelo `sqd typegen`. O import `import * as erc20 from './abi/erc20'` já vem no template.

O intervalo de blocos é importante para restringir o escopo. Por exemplo, se você implantou o ERC-20 no bloco `650000`, não há motivo para consultar blocos anteriores. Definir um intervalo preciso melhora a performance do indexador. Configure o bloco inicial assim:

```ts
.setBlockRange({from: 632400,})
```

O bloco escolhido corresponde ao início relevante na rede EVM de demonstração; troque para o bloco adequado à sua rede.

Altere `setFields` para especificar os dados a ingerir:

```ts
.setFields({
  log: {
    topics: true,
    data: true,
  },
  transaction: {
    hash: true,
  },
})
```

Também adicione estes imports em `processor.ts`:

```ts
import { Store } from '@subsquid/typeorm-store';
import * as erc20 from './abi/erc20';
```

Após concluir, seu `processor.ts` deve estar parecido com:

???+ code "processor.ts"

    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/processor.ts'
    ```

### Transformar e Salvar os Dados {: #transform-and-save-the-data}

Enquanto `processor.ts` define o que é consumido, `main.ts` define como processar e transformar os dados. Em resumo, processamos os dados ingeridos pelo processor e inserimos os trechos desejados em um banco TypeORM. Para detalhes, consulte a [documentação SQD sobre desenvolvimento de Squid](https://docs.sqd.ai/sdk/how-to-start/squid-development/){target=\_blank}.

O `main.ts` vai percorrer cada bloco processado em busca de eventos `Transfer` e decodificar detalhes como remetente, destinatário e valor. Ele também busca detalhes de contas e cria objetos de transferência com os dados extraídos, inserindo-os no TypeORM para consulta fácil. Em ordem:

1. `main.ts` roda o processor e refina os dados coletados. Em `processor.run`, o processor percorre os blocos selecionados e busca logs de `Transfer`, armazenando-os em um array de eventos de transferência para processamento posterior
2. A interface `transferEvent` define a estrutura que guarda os dados extraídos dos logs
3. `getTransfer` é um helper que extrai e decodifica dados do evento `Transfer` de um log, retornando um objeto `TransferEvent` com ID da transação, número do bloco, remetente, destinatário e valor. É chamado ao armazenar os eventos relevantes no array
4. `processTransfers` enriquece os dados e insere os registros no banco TypeORM usando `ctx.store`. O Template `account`, embora não estritamente necessário, permite introduzir outra entidade no schema para demonstrar múltiplas entidades no Squid
5. `getAccount` é um helper que recupera/cria objetos de conta. Dado um ID e um mapa de contas existentes, retorna a conta correspondente; se não existir, cria, adiciona ao mapa e retorna

Mostraremos uma query de exemplo adiante. Copie o código abaixo para `main.ts`:

???+ code "main.ts"

    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/main.ts'
    ```

Pronto, já podemos rodar o indexador!

### Rodar o Indexador {: #run-the-indexer }

Para rodar, execute a sequência de comandos `sqd`:

Compile o projeto:

```bash
sqd build
```

Suba o banco:

```bash
sqd up
```

Remova o arquivo de migration que vem com o template EVM e gere um novo para nosso schema:

```bash
sqd migration:generate
```

```bash
sqd migration:apply
```

Inicie o processor:

```bash
sqd process
```

No terminal, você verá o indexador começando a processar blocos!

![Executar o Squid](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-4.webp)

## Consultar o Squid {: #query-your-squid }

Para consultar o squid, abra um novo terminal no projeto e rode:

```bash
sqd serve
```

Pronto! Agora você pode fazer queries no playground GraphQL em `http://localhost:4350/graphql`. Crie sua própria query ou use a abaixo:

???+ code "Exemplo de query"

    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sample-query.graphql'
    ```

![Executando queries no GraphQL playground](/images/builders/toolkit/integrations/indexers/sqd/erc20-transfers/sqd-5.webp)

## Depurar o Squid {: #debug-your-squid }

Pode parecer difícil depurar erros ao construir o Squid, mas há técnicas para facilitar. Primeiro, se encontrar erros, habilite o modo debug no `.env` descomentando a linha de debug. Isso gera logs bem mais verbosos e ajuda a localizar o problema.

```text
# Descomentar a linha abaixo habilita o modo debug
SQD_DEBUG=*
```

Você também pode adicionar logs diretamente em `main.ts` para indicar parâmetros específicos, como altura de bloco. Por exemplo, veja esta versão de `main.ts` com logging detalhado:

??? code "main.ts"

    ```ts
    --8<-- 'code/builders/toolkit/integrations/indexers/sqd/erc20-transfers/main-with-logging.ts'
    ```

Consulte o [guia de logging do SQD](https://docs.sqd.ai/sdk/reference/logger/){target=\_blank} para mais informações sobre o modo debug.

### Erros Comuns {: #common-errors }

Alguns erros comuns ao construir o projeto e como resolvê-los:

```text
Error response from daemon: driver failed programming external connectivity on endpoint my-awesome-squid-db-1
(49df671a7b0531abbb5dc5d2a4a3f5dc7e7505af89bf0ad1e5480bd1cdc61052):
Bind for 0.0.0.0:23798 failed: port is already allocated
```

Esse erro indica que você tem outra instância do SQD rodando. Pare-a com `sqd down` ou clicando em **Stop** no container no Docker Desktop.

```text
Error: connect ECONNREFUSED 127.0.0.1:23798
     at createConnectionError (node:net:1634:14)
     at afterConnectMultiple (node:net:1664:40) {
     errno: -61,code: 'ECONNREFUSED',syscall: 'connect',
     address: '127.0.0.1',port: 23798}
```

Para resolver, rode `sqd up` antes de `sqd migration:generate`.

Seu Squid está sem erros, mas nenhuma transferência aparece? Verifique se os logs estão consistentes e iguais aos esperados pelo processor. O endereço do contrato também precisa estar em minúsculas; garanta isso definindo assim:

```ts
export const contractAddress = '0x37822de108AFFdd5cDCFDaAa2E32756Da284DB85'.toLowerCase();
```

--8<-- 'text/_disclaimers/third-party-content.md'
