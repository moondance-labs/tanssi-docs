---
title: Batch Precompile
description: Learn how to combine multiple transfers and contract interactions together via a Solidity interface with Tanssi's Batch Precompile for your EVM network.
keywords: solidity, ethereum, batch, transaction, moonbeam, precompiled, contracts
icon: octicons-stack-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/precompiles/batch.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "ccf7b289d851f5dcb8398880157a10a60a7b1615fc045d991563f7de787c2fad",
  "content": "--- \ntitle: Batch Precompile\ndescription: Learn how to combine multiple transfers and contract interactions together via a Solidity interface with Tanssi's Batch Precompile for your EVM network.\nkeywords: solidity, ethereum, batch, transaction, moonbeam, precompiled, contracts\nicon: octicons-stack-24\ncategories: EVM-Template\n---\n\n# Interagindo com o Batch Precompile\n\n## Introdução {: #introduction }\n\nO contrato Batch Precompile em redes EVM com tecnologia Tanssi permite que os desenvolvedores combinem várias chamadas EVM em uma só.\n\nAtualmente, fazer com que os usuários interajam com vários contratos exigiria várias confirmações de transação na carteira do usuário. Um exemplo seria aprovar o acesso de um contrato inteligente a um token e, em seguida, transferi-lo imediatamente. Com o Batch Precompile, os desenvolvedores podem aprimorar a experiência do usuário com transações em lote, pois isso minimiza o número de transações que um usuário precisa confirmar. Além disso, as taxas de gás pagas por um usuário podem ser reduzidas, pois o lote evita várias taxas de gás base (as 21000 unidades de gás iniciais gastas para iniciar uma transação).\n\nO precompile interage diretamente com o [palete EVM do Substrate](https://polkadot-evm.github.io/frontier){target=\\_blank}. O chamador da função em lote terá seu endereço atuando como o `msg.sender` para todas as subtransações, mas, ao contrário das [chamadas delegadas](https://docs.soliditylang.org/en/v0.8.15/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries){target=\\_blank}, o contrato de destino ainda afetará seu próprio armazenamento. É efetivamente o mesmo que se o usuário assinasse várias transações, mas com apenas uma confirmação.\n\nO Batch Precompile está localizado no seguinte endereço:\n\n```text\n{{ networks.demo_evm.precompiles.batch }}\n```\n\n--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'\n\n## A Interface Batch Solidity {: #the-batch-interface }\n\n[`Batch.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Batch.sol){target=\\_blank} é uma interface Solidity que permite aos desenvolvedores interagir com os três métodos do precompile.\n\n??? code \"Batch.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/batch.sol'\n    ```\n\nA interface inclui as seguintes funções:\n\n???+ function \"**batchSome**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — realiza várias chamadas, onde o mesmo índice de cada array se combina nas informações necessárias para uma única sub-chamada. Se uma sub-chamada reverter, as sub-chamadas seguintes ainda serão tentadas\"\n\n    === \"Parâmetros\"\n\n        - `to` - uma array de endereços para direcionar subtransações, onde cada entrada é uma subtransação\n        - `value` - um array de valores de moeda nativos para enviar nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes serão definidas como 0 por padrão\n        - `callData` - um array de dados de chamada para incluir nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes não incluirão dados de chamada\n        - `gasLimit` - um array de limites de gás nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Valores de 0 são interpretados como ilimitados e terão todo o gás restante da transação em lote encaminhado. Se este array for menor que o array *to*, todas as subtransações seguintes terão todo o gás restante encaminhado\n\n??? function \"**batchSomeUntilFailure**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — realiza várias chamadas, onde o mesmo índice de cada array se combina nas informações necessárias para uma única sub-chamada. Se uma sub-chamada reverter, nenhuma sub-chamada seguinte será executada\"\n\n    === \"Parâmetros\"\n\n        - `to` - um array de endereços para direcionar subtransações, onde cada entrada é uma subtransação\n        - `value` - um array de valores de moeda nativos para enviar nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes serão definidas como 0 por padrão\n        - `callData` - um array de dados de chamada para incluir nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes não incluirão dados de chamada\n        - `gasLimit` - um array de limites de gás nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Valores de 0 são interpretados como ilimitados e terão todo o gás restante da transação em lote encaminhado. Se este array for menor que o array *to*, todas as subtransações seguintes terão todo o gás restante encaminhado\n\n??? function \"**batchAll**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — realiza várias chamadas atomicamente, onde o mesmo índice de cada array se combina nas informações necessárias para uma única sub-chamada. Se uma sub-chamada reverter, todas as sub-chamadas reverterão\"\n\n    === \"Parâmetros\"\n\n        - `to` - um array de endereços para direcionar subtransações, onde cada entrada é uma subtransação\n        - `value` - um array de valores de moeda nativos para enviar nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes serão definidas como 0 por padrão\n        - `callData` - um array de dados de chamada para incluir nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes não incluirão dados de chamada\n        - `gasLimit` - um array de limites de gás nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Valores de 0 são interpretados como ilimitados e terão todo o gás restante da transação em lote encaminhado. Se este array for menor que o array *to*, todas as subtransações seguintes terão todo o gás restante encaminhado\n\nA interface também inclui os seguintes eventos necessários:\n\n- **SubcallSucceeded**(*uint256* index) - emitido quando uma sub-chamada do índice fornecido é bem-sucedida\n- **SubcallFailed**(*uint256* index) - emitido quando uma sub-chamada do índice fornecido falha\n\n## Interaja com a Interface Solidity {: #interact-with-the-solidity-interface }\n\n### Verificando os Pré-requisitos {: #checking-prerequisites }\n\nPara acompanhar este tutorial, você precisará ter sua carteira configurada para funcionar com sua rede EVM e uma conta financiada com tokens nativos. Você pode adicionar sua rede EVM ao MetaMask com um clique no [Tanssi dApp](https://apps.tanssi.network){target=\\_blank}. Ou, você [configura o MetaMask para Tanssi com a rede EVM de demonstração](/builders/toolkit/ethereum-api/wallets/metamask/){target=\\_blank}.\n\n### Contrato de Exemplo {: #example-contract}\n\nO contrato `SimpleContract.sol` será usado como um exemplo de interações em lote de contratos, mas, na prática, qualquer contrato pode ser interagido.\n\n```solidity\n--8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/simple-contract.sol'\n```\n\n### Configuração do Remix {: #remix-set-up }\n\nVocê pode interagir com o Batch Precompile usando [Remix](https://remix.ethereum.org){target=\\_blank}. Você precisará de uma cópia de [`Batch.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Batch.sol){target=\\_blank} e `SimpleContract.sol`. Para adicionar o precompile ao Remix e acompanhar o tutorial, você precisará:\n\n1. Clique na aba **File explorer**\n2. Cole o contrato `Batch.sol` em um arquivo Remix chamado **Batch.sol**\n3. Cole o contrato `SimpleContract.sol` em um arquivo Remix chamado **SimpleContract.sol**\n\n### Compile o Contrato {: #compile-the-contract }\n\nEm seguida, você precisará compilar ambos os arquivos no Remix:\n\n1. Certifique-se de que o arquivo **Batch.sol** esteja aberto\n2. Clique na aba **Compile**, a partir de cima\n3. Para compilar o contrato, clique em **Compile Batch.sol**\n\n![Compilando Batch.sol](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-1.webp)\n\nSe a interface foi compilada com sucesso, você verá uma marca de verificação verde ao lado da aba **Compile**.\n\n### Acesse o Precompile {: #access-the-precompile }\n\nEm vez de implantar o Batch Precompile, você acessará a interface dado o endereço do contrato pré-compilado:\n\n1. Clique na aba **Deploy and Run** diretamente abaixo da aba **Compile** no Remix. Observe que o contrato pré-compilado já está implantado\n2. Certifique-se de que **Injected Provider - MetaMask** esteja selecionado no menu suspenso **ENVIRONMENT**. Depois de selecionar **Injected Provider - MetaMask**, você poderá ser solicitado pelo MetaMask a conectar sua conta ao Remix\n3. Certifique-se de que a conta correta seja exibida em **ACCOUNT**\n4. Certifique-se de que **Batch.sol** esteja selecionado no menu suspenso **CONTRACT**. Como este é um contrato pré-compilado, não há necessidade de implantar nenhum código. Em vez disso, forneceremos o endereço do precompile no campo **At Address**\n5. Forneça o endereço do Batch Precompile: `{{networks.demo_evm.precompiles.batch}}` e clique em **At Address**\n\n![Access the address](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-2.webp)\n\nO precompile **BATCH** aparecerá na lista de **Deployed Contracts**.\n\n### Implante o contrato de exemplo {: #deploy-example-contract }\n\nPor outro lado, `SimpleContract.sol` será implantado como um novo contrato. Antes de começar esta seção, repita a [etapa de compilação](#compile-the-contract) com o arquivo `SimpleContract.sol`.\n\n1. Clique na aba **Deploy and Run** diretamente abaixo da aba **Compile** no Remix\n2. Certifique-se de que **Injected Provider - MetaMask** esteja selecionado no menu suspenso **ENVIRONMENT**. Depois de selecionar **Injected Provider - MetaMask**, você poderá ser solicitado pelo MetaMask a conectar sua conta ao Remix\n3. Certifique-se de que a conta correta seja exibida em **ACCOUNT**\n4. Certifique-se de que **SimpleContract** esteja selecionado no menu suspenso **CONTRACT**\n5. Clique em **Deploy**\n6. Confirme a transação MetaMask que aparece clicando em **Confirm**\n\n![Deploy SimpleContract](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-3.webp)\n\nO contrato **SIMPLECONTRACT** aparecerá na lista de **Deployed Contracts**.\n\n### Envie a Moeda Nativa via Precompile {: #send-native-currency-via-precompile }\n\nEnviar a moeda nativa com o Batch Precompile envolve mais do que pressionar alguns botões no Remix ou MetaMask. Para este exemplo, você usará a função **batchAll** para enviar moeda nativa atomicamente.\n\nAs transações têm um campo de valor para especificar a quantidade de moeda nativa enviada. No Remix, isso é determinado pela entrada **VALUE** na aba **DEPLOY & RUN TRANSACTIONS**. No entanto, para o Batch Precompile, esses dados são fornecidos na entrada do array **value** das funções em lote.\n\nTente transferir o token nativo de sua rede para duas carteiras de sua escolha via Batch Precompile:\n\n1. Expanda o contrato em lote em **Deployed Contracts**\n2. Expanda a função **batchAll**\n3. Para a entrada **to**, insira seus endereços no seguinte formato: `[\"INSERT_ADDRESS_1\", \"INSERT_ADDRESS_2\"]`, onde o primeiro endereço corresponde à primeira carteira de sua escolha e o segundo endereço corresponde à segunda carteira de sua escolha\n4. Para a entrada **value**, insira a quantia que deseja transferir em Wei para cada endereço. Por exemplo, `[\"1000000000000000000\", \"2000000000000000000\"]` transferirá 1 token nativo para o primeiro endereço e 2 tokens nativos para o segundo endereço\n5. Para **callData**, insira `[]`. Os dados de chamada não são relevantes para simplesmente transferir o token nativo\n6. Para as entradas **gasLimit**, insira `[]`\n7. Pressione **transact**\n8. Pressione **Confirm** na extensão MetaMask para confirmar a transação\n\n![Send Batch Transfer](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-4.webp)\n\nDepois que a transação for concluída, você poderá verificar os saldos das duas contas, no MetaMask ou no explorador de blocos de sua rede, cujo link pode ser encontrado no [Tanssi dApp](https://apps.tanssi.network){target=\\_blank}. Parabéns! Agora você enviou uma transferência em lote via Batch Precompile.\n\n!!! note\n     Normalmente, se você quisesse enviar a moeda nativa para ou através de um contrato, você teria que definir o valor dentro do objeto de transação geral e interagir com uma função pagável. No entanto, como o Batch Precompile interage diretamente com o código Substrate, esta não é uma transação Ethereum típica e, portanto, não é necessária.\n\n### Encontre os Dados de Chamada de uma Interação de Contrato {: #find-a-contract-interactions-call-data }\n\nInterfaces visuais como [Remix](/builders/toolkit/ethereum-api/dev-env/remix/){target=\\_blank} e bibliotecas úteis como [Ethers.js](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\\_blank} escondem a maneira como as transações Ethereum interagem com os contratos inteligentes Solidity. O nome e os tipos de entrada de uma função são transformados em hash em um [seletor de função](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector-and-argument-encoding){target=\\_blank} e os dados de entrada são codificados. Essas duas partes são então combinadas e enviadas como os dados de chamada da transação. Para enviar uma subtransação em uma transação em lote, o remetente precisa saber seus dados de chamada de antemão.\n\nTente encontrar os dados de chamada de uma transação usando o Remix:\n\n1. Expanda o contrato `SimpleContract.sol` em **Deployed Contracts**\n2. Expanda a função **setMessage**\n3. Insira o **id** desejado, como `1`\n4. Insira a **message** desejada, como `"tanssi"`\n5. Em vez de enviar a transação, clique no botão de cópia ao lado do botão **transact** para copiar os dados da chamada\n\n![Transaction Call Data](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-5.webp)\n\nAgora você tem os dados de chamada da transação! Considerando os valores de exemplo de `1` e `"tanssi"`, podemos ficar de olho em seus valores codificados nos dados de chamada:\n\n```text\n0x648345c8                                                        // function selector\n0000000000000000000000000000000000000000000000000000000000000001  // 1 id\n0000000000000000000000000000000000000000000000000000000000000040  // 32 byte offset\n000000000000000000000000000000000000000000000000000000000000000   // 32 byte length\n674616e7373690000000000000000000000000000000000000000000000000000 // \"tanssi\" in bytes\n```\n\nOs dados da chamada podem ser divididos em cinco linhas onde:\n\n - A primeira linha é o seletor de função\n - A segunda linha é igual a 1, que é o **id** que foi fornecido\n - O que resta envolve a entrada da **message**. Essas últimas três linhas são complicadas, pois as strings são um [tipo dinâmico](https://docs.soliditylang.org/en/v0.8.15/abi-spec.html#use-of-dynamic-types){target=\\_blank} com um comprimento dinâmico. A terceira linha se refere a um deslocamento para definir onde os dados da string começam. A quarta linha se refere ao comprimento da mensagem na linha a seguir, que é de 32 bytes no total - a mensagem \"tanssi\" mais o preenchimento\n \nVocê pode repetir as etapas acima para capturar os dados da chamada para os valores de `2` e `"hello"` para que várias sub-chamadas possam ser enviadas atomicamente com o Batch Precompile na próxima seção.\n\n### Interação de função via Precompile {: #function-interaction-via-precompile }\n\nO exemplo desta seção usará a função **batchAll** que garantirá que as transações sejam resolvidas atomicamente. Tenha em mente que também existem outras duas funções em lote que podem continuar as subtransações, apesar dos erros, ou interromper as subtransações subsequentes, mas não reverter as anteriores.\n\nA interação com uma função é muito semelhante a [enviar uma moeda nativa](#send-native-currency-via-precompile), pois ambas são transações. No entanto, os dados da chamada são necessários para fornecer a entrada para as funções corretamente e o remetente pode desejar limitar a quantidade de gás gasta em cada subtransação.\n\nOs campos `callData` e `gasLimit` são mais relevantes para subtransações que interagem com contratos. Para cada função na interface em lote, a entrada `callData` é uma array onde cada índice corresponde aos dados de chamada para cada destinatário da subtransação, ou seja, cada entrada `to`. Se o tamanho da array `callData` for menor que a array `to`, as subtransações restantes não terão dados de chamada (funções sem entradas). A entrada `gasLimit` é uma array que corresponde à quantidade de gás que cada uma pode gastar para cada subtransação. Se seu valor em um índice for 0 ou o índice for o tamanho da array ou maior (e menor que o tamanho da array `to`), todo o gás restante da subtransação anterior será encaminhado.\n\nPara usar o precompile para enviar uma transação em lote atômica combinando duas interações de contrato, siga estas etapas:\n\n1. Copie o endereço do contrato `SimpleContract.sol` com o botão de cópia no lado direito de seu cabeçalho. Certifique-se também de ter os [dados de chamada da seção anterior](#find-a-contract-interactions-call-data)\n2. Expanda o contrato em lote em **Deployed Contracts**\n3. Expanda a função **batchAll**\n4. Para a entrada **to**, cole o endereço `SimpleContract.sol` da seguinte forma: `[\"INSERT_SIMPLE_CONTRACT_ADDRESS\",\"INSERT_SIMPLE_CONTRACT_ADDRESS\"]`. Observe que você precisará repetir o endereço para quantas transações você estiver agrupando, mesmo que o endereço do contrato seja o mesmo\n5. Para a entrada de valor, uma vez que `SimpleContract.sol` não exige que nenhuma moeda nativa seja paga a ela, insira `[0,0]` para 0 Wei\n6. Para a entrada **callData**, insira seus dados de chamada da seção anterior no seguinte formato: `[\"INSERT_FIRST_CALL_DATA\",\"INSERT_SECOND_CALL_DATA\"]`\n7. Para a entrada **gasLimit**, insira `[]`. Você pode inserir um valor de limite de gás para cada sub-chamada ou deixá-lo como uma array vazia\n8. Pressione **transact**\n9. Pressione **Confirm** na extensão MetaMask para confirmar a transação\n\n![Batch Function Interaction](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-6.webp)\n\nSe você usou os mesmos dados de chamada do tutorial, pode verificar se a transação foi bem-sucedida da seguinte forma:\n\n1. Expanda o contrato `SimpleContract.sol` em **Deployed Contracts**\n2. À direita do botão **messages**, insira `1`\n3. Pressione o botão azul **messages**\n\n![SimpleContract Confirmation](/images/builders/toolkit/ethereum-api/precompiles/batch/batch-7.webp)\n\nA frase **\"tanssi\"** deve aparecer abaixo dela. Você pode repetir as etapas acima com um id de \"2\" e deverá ver **\"hello\"**. Parabéns! Você interagiu com uma função com o Batch Precompile.\n\n### Combinando Subtransações {: combining-subtransactions }\n\nAte agora, a transferência de moeda nativa e a interação com as funções foram separadas, mas podem ser interligadas.\n\nAs quatro strings a seguir podem ser combinadas como entradas para uma transação em lote. Elas enviarão 1 token nativo para a conta pública Gerald (`0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b`) e interagirão com um contrato `SimpleContract.sol` pré-implantado duas vezes. Aqui está uma divisão:\n\nExistem três subtransações que correspondem a três endereços na array de entrada `to`. A primeira é a conta pública Gerald e as duas seguintes são um contrato `SimpleContract.sol`. Você pode substituir os dois últimos por sua própria instância de `SimpleContract.sol`, se desejar. Ou, substitua apenas um: você pode interagir com vários contratos em uma única mensagem.\n\n```text\n[\n  \"0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b\",\n  \"0xd14b70a55F6cBAc06d4FA49b99be0370D0e1BD39\", \n  \"0xd14b70a55F6cBAc06d4FA49b99be0370D0e1BD39\"\n]\n```\n\nHaverá também três valores para a array `value`. O primeiro endereço na array de entrada `to` indica `1000000000000000000` wei ou `1` UNIT do token nativo. Lembre-se de que os tokens nativos das redes EVM com tecnologia Tanssi têm [18 casas decimais, assim como o Ethereum](https://eth-converter.com){target=\\_blank}. Os dois valores seguintes são `0` porque a função com a qual suas subtransações estão interagindo não aceita ou exige moeda nativa.\n\n```text\n[\"1000000000000000000\", \"0\", \"0\"]\n```\n\nVocê precisará de três valores para a array `callData`. Como a transferência de moeda nativa não exige dados de chamada, a string é simplesmente em branco. O segundo e o terceiro valores na array correspondem às invocações de **setMessage** que definem as mensagens para os IDs 5 e 6.\n\n```text\n[\n  \"0x\", \n  \"0x648345c8000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000009796f752061726520610000000000000000000000000000000000000000000000\", \n  \"0x648345c800000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000e61206d6f6f6e6265616d2070726f000000000000000000000000000000000000\"\n]\n```\n\nA entrada final é para `gas_input`. Esta array será deixada vazia para encaminhar todo o gás restante para cada subtransação.\n\n```text\n[]\n```\n\nTente enviar uma transação em lote com essas entradas no Remix da mesma forma que [você agrupou uma chamada de função](#function-interaction-via-precompile).\n\nE é isso! Você interagiu com sucesso com o precompile ERC-20 usando MetaMask e Remix!\n\n## Bibliotecas de Desenvolvimento Ethereum {: #ethereum-development-libraries }\n\nSe você seguiu o [tutorial do Ethers.js](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\\_blank}, pode ser difícil encontrar os dados de chamada de uma função. A resposta está oculta no objeto `Interface` do Ether, onde a função [encodeFunctionData](https://docs.ethers.org/v6/api/abi/#Interface-encodeFunctionData){target=\\_blank} permite que você insira o nome da sua função e as entradas para receber os dados de chamada resultantes. [Web3.js](/builders/toolkit/ethereum-api/libraries/web3js/){target=\\_blank} tem uma função semelhante, [encodeFunctionCall](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall){target=\\_blank}.\n\n!!! note\n    Os trechos de código apresentados nas seções a seguir não se destinam a ambientes de produção. Certifique-se de adaptá-los para cada caso de uso.\n\n=== \"Ethers.js\"\n\n     ```js\n     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/ethers-batch.js'\n     ```\n\n=== \"Web3.js\"\n\n     ```js\n     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/web3js-batch.js'\n     ```\n\n=== \"Web3.py\"\n\n     ```py\n     --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/web3py-batch.py'\n     ```\n\nDepois, você deverá estar pronto para interagir com o Batch Precompile como normalmente faria com um contrato no [Ethers](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\\_blank}.\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Pré-compilação em Lote\ndescrição: Aprenda como combinar múltiplas transferências e interações de contratos por meio de uma interface Solidity com o Batch Precompile da Tanssi para sua rede EVM.\npalavras-chave: solidity, ethereum, lote, transação, moonbeam, precompiled, contratos\nicon: octicons-stack-24\ncategorias: EVM-Template\n---\n\n# Interagindo com o Pré-compilado em Lote\n\n## Introdução {: #introduction }\n\nO contrato de Pré-compilado em Lote em redes EVM com tecnologia Tanssi permite que os desenvolvedores combinem múltiplas chamadas EVM em uma só.\n\nAtualmente, fazer com que os usuários interajam com múltiplos contratos exigiria múltiplas confirmações de transação na carteira do usuário. Um exemplo seria aprovar o acesso de um contrato inteligente a um token e, em seguida, transferi-lo imediatamente. Com o Pré-compilado em Lote, os desenvolvedores podem aprimorar a experiência do usuário com transações em lote, pois isso minimiza o número de transações que um usuário precisa confirmar. Além disso, as taxas de gás pagas por um usuário podem ser reduzidas, pois o lote evita múltiplas taxas de gás base (as 21000 unidades de gás iniciais gastas para iniciar uma transação).\n\nO precompile interage diretamente com o [palete EVM do Substrate](https://polkadot-evm.github.io/frontier){target=\\_blank}. O chamador da função em lote terá seu endereço atuando como o `msg.sender` para todas as subtransações, mas, ao contrário das [chamadas delegadas](https://docs.soliditylang.org/en/v0.8.15/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries){target=\\_blank}, o contrato de destino ainda afetará seu próprio armazenamento. É efetivamente o mesmo que se o usuário assinasse múltiplas transações, mas com apenas uma confirmação.\n\nO Pré-compilado em Lote está localizado no seguinte endereço:\n\n```text\n{{ networks.demo_evm.precompiles.batch }}\n```\n\n--8<-- 'text/builders/toolkit/ethereum-api/precompiles/security-note.md'\n\n## A Interface Solidity em Lote {: #the-batch-interface }\n\n[`Batch.sol`](https://github.com/moondance-labs/tanssi/blob/master/test/contracts/solidity/Batch.sol){target=\\_blank} é uma interface Solidity que permite aos desenvolvedores interagir com os três métodos do precompile.\n\n??? code \"Batch.sol\"\n\n    ```solidity\n    --8<-- 'code/builders/toolkit/ethereum-api/precompiles/batch/batch.sol'\n    ```\n\nA interface inclui as seguintes funções:\n\n???+ function \"**batchSome**(*address[]* to, *uint256[]* value, *bytes[]* callData, *uint64[]* gasLimit) — realiza múltiplas chamadas, onde o mesmo índice de cada array se combina nas informações necessárias para uma única sub-chamada. Se uma sub-chamada reverter, as sub-chamadas seguintes ainda serão tentadas\"\n\n    === \"Parâmetros\"\n\n        - `to` - uma array de endereços para direcionar subtransações, onde cada entrada é uma subtransação\n        - `value` - um array de valores de moeda nativos para enviar nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes serão definidas como 0 por padrão\n        - `callData` - um array de dados de chamada para incluir nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Se este array for menor que o array *to*, todas as subtransações seguintes não incluirão dados de chamada\n        - `gasLimit` - um array de limites de gás nas subtransações, onde o índice corresponde à subtransação do mesmo índice no array *to*. Valores de 0 são interpretados como ilimitados e terão todo o gás restante da transação em lote encaminhado. Se este array for menor que o array *to*, todas as subtransações seguintes terão todo o gás restante encamin





```text

```

````

```solidity

```

````

```solidity


    ```






```text





```

```text

```

```text





```

```text

```

````

 ```js

 ```



 ```js

 ```



 ```py
```solidity

 ```


























































































```text





```

















































```text





```



```text

```



```text





```



```text

```














     ```js

     ```



     ```js

     ```



     ```py

     ```
