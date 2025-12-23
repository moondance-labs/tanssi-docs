---
title: Pré-compilado Batch
description: Aprenda a combinar várias transferências e interações de contrato por meio de uma interface Solidity usando o Batch Precompile na sua rede EVM powered by Tanssi.
keywords: solidity, ethereum, batch, transação, tanssi, precompiled, contratos
icon: octicons-stack-24
categories: EVM-Template
---

# Interagindo com o Batch Precompile

## Introdução {: #introduction }

O contrato Batch Precompile em redes EVM powered by Tanssi permite agrupar várias chamadas EVM em uma só.

Normalmente, fazer o usuário interagir com vários contratos exige várias confirmações de transação na carteira. Um exemplo seria aprovar o acesso de um contrato a um token e logo em seguida transferi-lo. Com o Batch Precompile, você melhora a experiência do usuário com transações em lote, pois reduz o número de confirmações necessárias. Além disso, as taxas de gás podem diminuir, já que o batching evita múltiplas taxas base (as 21000 unidades iniciais de gás de cada transação).

O precompile interage diretamente com o [pallet EVM do Substrate](https://polkadot-evm.github.io/frontier){target=\_blank}. Quem chama a função em lote tem seu endereço agindo como `msg.sender` para todas as subtransações, mas, diferente de [delegate calls](https://docs.soliditylang.org/en/v0.8.15/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries){target=\_blank}, o contrato de destino ainda altera o próprio armazenamento. É como se o usuário assinasse várias transações, mas com apenas uma confirmação.

O Batch Precompile está localizado neste endereço:

```text
{{ networks.demo_evm.precompiles.batch }}
```

--8<-- 'text/pt/builders/toolkit/ethereum-api/precompiles/security-note.md'

## A Interface Solidity em Lote {: #the-batch-interface }

[`Batch.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Batch.sol){target=\_blank} é uma interface Solidity que permite interagir com os três métodos do precompile.

??? code "Batch.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/batch.sol'
    ```

A interface inclui as seguintes funções:

???+ function "**batchSome**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — executa várias chamadas, combinando os mesmos índices dos arrays para formar cada subchamada. Se uma subchamada reverter, as seguintes ainda serão tentadas"

    === "Parâmetros"

        - `to` - array de endereços para direcionar as subtransações, em que cada entrada é uma subtransação
        - `value` - array de valores em moeda nativa para enviar nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Se este array for menor que o array *to*, todas as subtransações seguintes terão valor 0
        - `callData` - array de dados de chamada para incluir nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Se este array for menor que o array *to*, todas as subtransações seguintes não terão dados de chamada
        - `gasLimit` - array de limites de gás nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Valores 0 são interpretados como ilimitados e encaminham todo o gás restante da transação em lote. Se este array for menor que o array *to*, todas as subtransações seguintes encaminharão todo o gás restante

??? function "**batchSomeUntilFailure**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — executa várias chamadas, combinando os mesmos índices dos arrays para formar cada subchamada. Se uma subchamada reverter, nenhuma subchamada seguinte será executada"

    === "Parâmetros"

        - `to` - array de endereços para direcionar as subtransações, em que cada entrada é uma subtransação
        - `value` - array de valores em moeda nativa para enviar nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Se este array for menor que o array *to*, todas as subtransações seguintes terão valor 0
        - `callData` - array de dados de chamada para incluir nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Se este array for menor que o array *to*, todas as subtransações seguintes não terão dados de chamada
        - `gasLimit` - array de limites de gás nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Valores 0 são interpretados como ilimitados e encaminham todo o gás restante da transação em lote. Se este array for menor que o array *to*, todas as subtransações seguintes encaminharão todo o gás restante

??? function "**batchAll**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — executa várias chamadas de forma atômica, combinando os mesmos índices dos arrays para formar cada subchamada. Se uma subchamada reverter, todas as subchamadas irão reverter"

    === "Parâmetros"

        - `to` - array de endereços para direcionar as subtransações, em que cada entrada é uma subtransação
        - `value` - array de valores em moeda nativa para enviar nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Se este array for menor que o array *to*, todas as subtransações seguintes terão valor 0
        - `callData` - array de dados de chamada para incluir nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Se este array for menor que o array *to*, todas as subtransações seguintes não terão dados de chamada
        - `gasLimit` - array de limites de gás nas subtransações, em que o índice corresponde à subtransação no mesmo índice em *to*. Valores 0 são interpretados como ilimitados e encaminham todo o gás restante da transação em lote. Se este array for menor que o array *to*, todas as subtransações seguintes encaminharão todo o gás restante

A interface também inclui os seguintes eventos:

- **SubcallSucceeded**(*uint256* index) - emitido quando uma subchamada do índice informado é bem-sucedida
- **SubcallFailed**(*uint256* index) - emitido quando uma subchamada do índice informado falha

## Interaja com a Interface Solidity {: #interact-with-the-solidity-interface }

### Verificando Pré-requisitos {: #checking-prerequisites }

Para acompanhar este tutorial, você precisa ter a carteira configurada para sua rede EVM e uma conta com tokens nativos. Você pode adicionar sua rede EVM à MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network){target=\_blank}. Ou [configurar a MetaMask para a Tanssi com a rede EVM de demonstração](/pt/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

### Contrato de Exemplo {: #example-contract}

O contrato `SimpleContract.sol` será usado como exemplo de interação em lote, mas, na prática, qualquer contrato pode ser usado.

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/simple-contract.sol'
```

### Configuração do Remix {: #remix-set-up }

Você pode interagir com o Batch Precompile usando o [Remix](https://remix.ethereum.org){target=\_blank}. Tenha uma cópia de [`Batch.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Batch.sol){target=\_blank} e de `SimpleContract.sol`. Para adicionar o precompile no Remix e seguir o tutorial:

1. Clique na aba **File explorer**
2. Cole o contrato `Batch.sol` em um arquivo do Remix chamado **Batch.sol**
3. Cole o contrato `SimpleContract.sol` em um arquivo do Remix chamado **SimpleContract.sol**

### Compile o Contrato {: #compile-the-contract }

Em seguida, compile os dois arquivos no Remix:

1. Certifique-se de que o arquivo **Batch.sol** está aberto
2. Clique na aba **Compile**, a segunda de cima
3. Para compilar, clique em **Compile Batch.sol**

![Compiling Batch.sol](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-1.webp)

Se a interface foi compilada com sucesso, você verá um check verde ao lado da aba **Compile**.

### Acesse o Precompile {: #access-the-precompile }

Em vez de implantar o Batch Precompile, acesse a interface informando o endereço do contrato pré-compilado:

1. Clique na aba **Deploy and Run** logo abaixo da aba **Compile** no Remix. Observe que o contrato pré-compilado já está implantado
2. Certifique-se de que **Injected Provider - MetaMask** está selecionado no menu **ENVIRONMENT**. Ao selecionar, a MetaMask pode solicitar que você conecte sua conta ao Remix
3. Confirme que a conta correta aparece em **ACCOUNT**
4. Garanta que **Batch.sol** está selecionado no menu **CONTRACT**. Como é um contrato pré-compilado, não é necessário implantar código. Vamos apenas fornecer o endereço do precompile no campo **At Address**
5. Informe o endereço do Batch Precompile: `{{networks.demo_evm.precompiles.batch}}` e clique em **At Address**

![Access the address](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-2.webp)

O precompile **BATCH** aparecerá na lista de **Deployed Contracts**.

### Implemente o Contrato de Exemplo {: #deploy-example-contract }

Por outro lado, `SimpleContract.sol` será implantado como um novo contrato. Antes de começar esta seção, repita a [etapa de compilação](#compile-the-contract) com o arquivo `SimpleContract.sol`.

1. Clique na aba **Deploy and Run** logo abaixo da aba **Compile** no Remix
2. Certifique-se de que **Injected Provider - MetaMask** está selecionado em **ENVIRONMENT**. Ao selecionar, a MetaMask pode solicitar que você conecte sua conta ao Remix
3. Confirme que a conta correta aparece em **ACCOUNT**
4. Garanta que **SimpleContract** está selecionado no menu **CONTRACT**
5. Clique em **Deploy**
6. Confirme a transação que aparecerá na MetaMask clicando em **Confirm**

![Deploy SimpleContract](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-3.webp)

O contrato **SIMPLECONTRACT** aparecerá na lista de **Deployed Contracts**.

### Envie moeda nativa via precompile {: #send-native-currency-via-precompile }

Enviar moeda nativa com o Batch Precompile exige mais do que alguns cliques no Remix ou na MetaMask. Neste exemplo, você usará a função **batchAll** para enviar moeda nativa de forma atômica.

Transações têm um campo `value` para indicar o valor de moeda nativa a enviar. No Remix, isso é definido pelo input **VALUE** na aba **DEPLOY & RUN TRANSACTIONS**. Porém, para o Batch Precompile, esses valores são fornecidos no array **value** das funções em lote.

Tente transferir o token nativo da sua rede para duas carteiras usando o Batch Precompile:

1. Expanda o contrato do batch em **Deployed Contracts**
2. Expanda a função **batchAll**
3. No campo **to**, insira os endereços neste formato: `["INSERIR_ENDERECO_1", "INSERIR_ENDERECO_2"]`, onde o primeiro endereço corresponde à primeira carteira e o segundo à segunda carteira
4. No campo **value**, insira o valor que deseja transferir em Wei para cada endereço. Por exemplo, `["1000000000000000000", "2000000000000000000"]` transferirá 1 token nativo para o primeiro endereço e 2 tokens para o segundo
5. Para **callData**, insira `[]`. Não há dados de chamada para uma simples transferência de token nativo
6. Para **gasLimit**, insira `[]`
7. Clique em **transact**
8. Clique em **Confirm** na MetaMask para confirmar a transação

![Send Batch Transfer](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-4.webp)

Quando a transação for concluída, você pode conferir os saldos das duas contas na MetaMask ou no explorador da sua rede (link no [Tanssi dApp](https://apps.tanssi.network){target=\_blank}). Parabéns! Você enviou uma transferência em lote via Batch Precompile.

!!! note
     Normalmente, para enviar moeda nativa para ou através de um contrato, seria preciso definir o `value` no objeto geral da transação e interagir com uma função payable. Contudo, como o Batch Precompile interage diretamente com o código Substrate, esta não é uma transação Ethereum típica, então isso não é necessário.

### Descubra o call data de uma interação de contrato {: #find-a-contract-interactions-call-data }

Interfaces visuais como o [Remix](/pt/builders/toolkit/ethereum-api/dev-env/remix/){target=\_blank} e bibliotecas como [Ethers.js](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank} ocultam como transações Ethereum interagem com contratos Solidity. O nome e os tipos de entrada de uma função são transformados em um [seletor de função](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector-and-argument-encoding){target=\_blank} e os dados de entrada são codificados. Esses dois elementos são combinados e enviados como o call data da transação. Para enviar uma subtransação dentro de uma transação em lote, o remetente precisa conhecer previamente esse call data.

Tente encontrar o call data de uma transação usando o Remix:

1. Expanda o contrato `SimpleContract.sol` em **Deployed Contracts**
2. Expanda a função **setMessage**
3. Insira o **id** desejado, como `1`
4. Insira a **message** desejada, como `"tanssi"`
5. Em vez de enviar a transação, clique no botão de copiar ao lado de **transact** para copiar o call data

![Transaction Call Data](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-5.webp)

Agora você tem o call data da transação! Considerando os valores de exemplo `1` e `"tanssi"`, podemos observar seus valores codificados no call data:

```text
0x648345c8                                                        // function selector
0000000000000000000000000000000000000000000000000000000000000001  // 1 id
0000000000000000000000000000000000000000000000000000000000000040  // 32 byte offset
000000000000000000000000000000000000000000000000000000000000000   // 32 byte length
674616e7373690000000000000000000000000000000000000000000000000000 // "tanssi" em bytes
```

O call data pode ser dividido em cinco linhas em que:

 - A primeira linha é o seletor de função
 - A segunda linha é igual a 1, que é o **id** fornecido
 - O restante envolve o input **message**. Essas três últimas linhas são mais complexas, pois strings são um [tipo dinâmico](https://docs.soliditylang.org/en/v0.8.15/abi-spec.html#use-of-dynamic-types){target=\_blank} com tamanho variável. A terceira linha se refere ao offset que define onde os dados da string começam. A quarta linha se refere ao comprimento da mensagem na linha seguinte, que é de 32 bytes no total — a mensagem "tanssi" mais o preenchimento
 
Você pode repetir as etapas acima para capturar o call data para os valores `2` e `"hello"` e enviar várias subchamadas de forma atômica com o Batch Precompile na próxima seção.

### Interação de Função via Precompile {: #function-interaction-via-precompile }

O exemplo desta seção usará a função **batchAll**, que garante a resolução atômica das transações. Lembre-se de que há outras duas funções em lote que podem continuar subtransações apesar de erros ou parar subtransações seguintes sem reverter as anteriores.

Interagir com uma função é muito semelhante a [enviar moeda nativa](#send-native-currency-via-precompile), já que ambas são transações. Entretanto, é necessário call data para fornecer entradas às funções corretamente, e o remetente pode querer limitar o gás gasto em cada subtransação.

Os campos `callData` e `gasLimit` são mais relevantes para subtransações que interagem com contratos. Para cada função da interface em lote, `callData` é um array em que cada índice corresponde ao call data de cada destinatário da subtransação, ou seja, cada entrada em `to`. Se o tamanho do array `callData` for menor que o array `to`, as subtransações restantes não terão call data (funções sem entradas). O `gasLimit` é um array que define quanto gás cada subtransação pode gastar. Se o valor em um índice for 0 ou o índice estiver fora do tamanho do array (mas ainda menor que o tamanho de `to`), todo o gás restante da transação anterior é encaminhado.

Para usar o precompile e enviar uma transação em lote atômica combinando duas interações de contrato, faça o seguinte:

1. Copie o endereço do contrato `SimpleContract.sol` com o botão de copiar à direita do cabeçalho. Tenha também o [call data da seção anterior](#find-a-contract-interactions-call-data)
2. Expanda o contrato do batch em **Deployed Contracts**
3. Expanda a função **batchAll**
4. Para o campo **to**, cole o endereço de `SimpleContract.sol` assim: `["INSERIR_ENDERECO_SIMPLE_CONTRACT","INSERIR_ENDERECO_SIMPLE_CONTRACT"]`. Observe que é preciso repetir o endereço para cada transação em lote, mesmo que o contrato seja o mesmo
5. Para o campo **value**, como `SimpleContract.sol` não requer moeda nativa, insira `[0,0]` para 0 Wei
6. Para o campo **callData**, insira os call data da seção anterior neste formato: `["INSERIR_PRIMEIRO_CALL_DATA","INSERIR_SEGUNDO_CALL_DATA"]`
7. Para o campo **gasLimit**, insira `[]`. Você pode definir um valor de gás para cada subchamada ou deixar como array vazio
8. Clique em **transact**
9. Clique em **Confirm** na MetaMask para confirmar a transação

![Batch Function Interaction](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-6.webp)

Se você usou o mesmo call data do tutorial, pode verificar se a transação deu certo assim:

1. Expanda o contrato `SimpleContract.sol` em **Deployed Contracts**
2. À direita do botão **messages**, insira `1`
3. Clique no botão azul **messages**

![SimpleContract Confirmation](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-7.webp)

A frase **"tanssi"** deve aparecer embaixo. Você pode repetir com o id "2" e verá **"hello"**. Parabéns! Você interagiu com uma função usando o Batch Precompile.

### Combinando Subtransações {: combining-subtransactions }

Até aqui, transferir moeda nativa e interagir com funções foram ações separadas, mas elas podem ser combinadas.

As quatro strings a seguir podem ser usadas como inputs de uma transação em lote. Elas enviam 1 token nativo para a conta pública Gerald (`0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b`) e interagem com um contrato `SimpleContract.sol` pré-implantado duas vezes. Eis o detalhamento:

Há três subtransações que correspondem a três endereços no array `to`. O primeiro é a conta pública Gerald e os dois seguintes são um contrato `SimpleContract.sol`. Você pode substituir os dois últimos pelo seu próprio contrato `SimpleContract.sol` se quiser. Ou substituir apenas um: é possível interagir com múltiplos contratos em uma única mensagem.

```text
[
  "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b",
  "0xd14b70a55F6cBAc06d4FA49b99be0370D0e1BD39", 
  "0xd14b70a55F6cBAc06d4FA49b99be0370D0e1BD39"
]
```

Também haverá três valores para o array `value`. O primeiro endereço em `to` indica `1000000000000000000` wei ou `1` UNIT do token nativo. Lembre que os tokens nativos de redes EVM powered by Tanssi têm [18 casas decimais, assim como no Ethereum](https://eth-converter.com){target=\_blank}. Os dois valores seguintes são `0` porque a função com que suas subtransações interagem não aceita nem exige moeda nativa.  

```text
["1000000000000000000", "0", "0"]
```

Você precisará de três valores para o array `callData`. Como transferir moeda nativa não requer call data, a string fica vazia. O segundo e o terceiro valores correspondem a chamadas de **setMessage** que definem mensagens para os IDs 5 e 6.

```text
[
  "0x", 
  "0x648345c8000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000009796f752061726520610000000000000000000000000000000000000000000000", 
  "0x648345c800000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000e61206d6f6f6e6265616d2070726f000000000000000000000000000000000000"
]
```

O input final é para `gas_input`. Este array ficará vazio para encaminhar todo o gás restante a cada subtransação.

```text
[]
```

Tente enviar uma transação em lote com esses inputs no Remix da mesma forma que [você agrupou uma chamada de função](#function-interaction-via-precompile).

E é isso! Você interagiu com o precompile de batching usando MetaMask e Remix!

## Bibliotecas de Desenvolvimento Ethereum {: #ethereum-development-libraries }

Se você seguiu o [tutorial de Ethers.js](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, pode ser difícil encontrar o call data de uma função. A resposta está escondida no objeto `Interface` do Ethers, onde a função [encodeFunctionData](https://docs.ethers.org/v6/api/abi/#Interface-encodeFunctionData){target=\_blank} permite informar o nome da função e os inputs para obter o call data resultante. O [Web3.js](/pt/builders/toolkit/ethereum-api/libraries/web3js/){target=\_blank} tem função semelhante, [encodeFunctionCall](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall){target=\_blank}.

!!! note
    Os trechos de código a seguir não são destinados a ambientes de produção. Adapte-os conforme cada caso de uso.

=== "Ethers.js"

     ```js
     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/ethers-batch.js'
     ```

=== "Web3.js"

     ```js
     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/web3js-batch.js'
     ```

=== "Web3.py"

     ```py
     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/web3py-batch.py'
     ```

Depois disso, você estará pronto para interagir com o Batch Precompile como faria normalmente com um contrato no [Ethers](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'
