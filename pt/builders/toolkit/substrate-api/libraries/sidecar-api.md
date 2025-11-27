---
title: Using Substrate API Sidecar
description: Learn how to use Substrate-based REST service with Tanssi-powered networks to access blocks, account balance, compute gas used, and more.
icon: octicons-code-24
categories: Substrate-Template
---

````json
{
  "source_path": "builders/toolkit/substrate-api/libraries/sidecar-api.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "54ddd86f3d205c267099c21bc40a22ba7f0b50b1f886088d2e343cd99cef829b",
  "content": "--- \ntitle: Using Substrate API Sidecar\ndescription: Learn how to use Substrate-based REST service with Tanssi-powered networks to access blocks, account balance, compute gas used, and more.\nicon: octicons-code-24\ncategories: Substrate-Template\n---\n\n# Using Substrate API Sidecar\n\n## Introduction {: #introduction }\n\nSubstrate API Sidecar permite que aplicativos acessem blocos, saldo da conta e outras informações de blockchains baseados em Substrate através de uma API REST. Isso pode ser útil para exchanges, carteiras ou outros tipos de aplicativos que precisam acompanhar o saldo da conta e outras mudanças de estado em uma rede alimentada pela Tanssi. Esta página descreverá como instalar e executar um Substrate API Sidecar para uma rede Tanssi e os endpoints de API comumente usados.\n\n## Installing and Running Substrate API Sidecar {: #installing-and-running-substrate-api-sidecar }\n\nHá várias maneiras de instalar e executar o Substrate API Sidecar. Este guia descreverá as etapas para instalá-lo e executá-lo localmente através do NPM. Para executar o Substrate API Sidecar através do Docker, ou construí-lo e executá-lo a partir da fonte, consulte o [repositório Github do Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar#readme).\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n### Installing the Substrate API Sidecar {: #installing-the-substrate-api-sidecar }\n\nPara instalar o serviço Substrate API Sidecar localmente no diretório atual, execute isto na linha de comando:\n\n```bash\nnpm install @substrate/api-sidecar@{{ networks.mainnet.substrate_api_sidecar.stable_version }}\n```\n\n!!! note\n    Se a pasta atual ainda não tiver uma estrutura de projeto Node.js, você precisará criar manualmente o diretório `node_modules` digitando `mkdir node_modules`.\n\nSubstrate API Sidecar v{{ networks.mainnet.substrate_api_sidecar.stable_version }} é a versão estável atual que foi testada para funcionar com redes Tanssi. Você pode verificar se a instalação foi bem-sucedida digitando na raiz do diretório de instalação:\n\n```bash\nnode_modules/.bin/substrate-api-sidecar --version\n```\n\n## Setting up the Substrate API Sidecar {: #setting-up-the-substrate-api-sidecar }\n\nNo terminal em que o Sidecar será executado, exporte a variável de ambiente para o endpoint WS da rede à qual você deseja se conectar. Por exemplo, o endpoint WSS da sua rede Tanssi. Alguns exemplos:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL=wss://{{ networks.mainnet.dns_name }}\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL=wss://{{ networks.dancelight.dns_name }}\n    ```\n\n=== \"Demo EVM Network\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL={{ networks.dancelight.demo_evm_rpc_wss_url }}\n    ```\n\n=== \"Your Network\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL=INSERT_NETWORK_WSS_ENDPOINT\n    ```\n\nDepois de definir a variável de ambiente, você pode usar o comando `echo` para verificar se a variável de ambiente foi definida corretamente, digitando:\n\n```bash\necho $SAS_SUBSTRATE_URL\n```\n\nE ele deve exibir o endpoint de rede que você acabou de definir.\n\n## Running Substrate API Sidecar {: #running-substrate-api-sidecar }\n\nCom a variável de ambiente do endpoint de rede definida e a partir da raiz do diretório de instalação, execute:\n\n```bash\nnode_modules/.bin/substrate-api-sidecar\n```\n\nSe a instalação e configuração forem bem-sucedidas, você deverá ver esta saída no console:\n\n![Successful Output](/images/builders/toolkit/substrate-api/libraries/sidecar-api/sidecar-1.webp)\n\n## Substrate API Sidecar Endpoints {: #substrate-api-sidecar-endpoints }\n\nAlguns dos endpoints do Substrate API Sidecar comumente usados incluem:\n\n - **GET /blocks​/head** — Obtenha o bloco finalizado mais recentemente. O parâmetro opcional `finalized` pode ser definido como `false` para obter o bloco mais novo conhecido, que pode não estar finalizado\n - **GET /blocks/head/header** — Obtenha o cabeçalho do bloco finalizado mais recentemente. O parâmetro opcional `finalized` pode ser definido como `false` para obter o cabeçalho do bloco mais novo conhecido, que pode não estar finalizado\n - **GET /blocks/{blockId}** — Obtenha um bloco por sua altura ou hash\n - **GET /accounts/{accountId}/balance-info** — Obtenha informações de saldo para uma conta\n - **GET /node/version** — Obtenha informações sobre a implementação e versionamento do nó Substrates\n - **GET /runtime/metadata** — Obtenha os metadados do tempo de execução em formato JSON decodificado\n\nPara obter uma lista completa dos endpoints da API disponíveis no Substrate API Sidecar, consulte a [documentação oficial](https://paritytech.github.io/substrate-api-sidecar/dist).\n\n## Field Mapping in Block JSON Object {: #fields-mapping-in-block-json-object }\n\nSubstrate API Sidecar retorna blocos como um objeto JSON. Parte desse objeto JSON é uma estrutura de aninhamento para extrinsics individuais processados em um bloco específico. Cada extrinsic chama um método específico de um determinado módulo. De modo geral, para extrinsics individuais, a estrutura de aninhamento é a seguinte:\n\n```text\nRESPONSE JSON Block Object:\n    |--extrinsics\n        |--{extrinsic_number}\n            |--method\n                |--pallet: \"MODULE_NAME\"\n                |--method: \"METHOD_NAME\"\n            |--signature\n            |--nonce\n            |--args\n                |--transaction\n                    |--{transaction_type}\n            |--hash\n            |--events\n                |--{event_number}\n                    |--method\n                        |--pallet: \"MODULE_NAME\"\n                        |--method: \"METHOD_EVENT_NAME\"\n                    |--data\n                        |--0\n                        |--1\n                        |--2\n                        |--3\n    ...\n\n```\n\nConsequentemente, informações de extrinsics específicos (como transferências de saldo) podem ser extraídas conhecendo o módulo e o método chamado pelo extrinsic.\n\n## EVM Field Mapping in Block JSON Object {: #evm-fields-mapping-in-block-json-object }\n\nPara redes Tanssi EVM, as informações relacionadas à execução EVM de cada transação de rede Tanssi EVM podem ser identificadas pelo campo `method` sob o objeto extrinsic atual, onde ele é definido como:\n\n```text\n{extrinsic_number}.method.pallet = \"ethereum\"\n{extrinsic_number}.method.method = \"transact\"\n```\n\nA estrutura de aninhamento para transações EVM é a seguinte:\n\n```text\nRESPONSE JSON Block Object:\n    |--extrinsics\n        |--{extrinsic_number}\n            |--method\n                |--pallet: \"ethereum\"\n                |--method: \"transact\"\n            |--signature\n            |--nonce\n            |--args\n                |--transaction\n                    |--{transaction_type}\n            |--hash\n            |--events\n                |--{event_number}\n                    |--method\n                        |--pallet: \"ethereum\"\n                        |--method: \"Executed\"\n                    |--data\n                        |--0\n                        |--1\n                        |--2\n                        |--3\n    ...\n\n```\n\nPor exemplo, para transações Substrate, os campos \\\"Nonce\\\" e \\\"Signature\\\" estão em:\n\n```text\nextrinsics[extrinsic_number]\n```\n\n### EVM Transaction Types and Payload {: #transaction-types-and-payload }\n\nAs redes Tanssi EVM atualmente suportam três padrões de transação: `legacy`, `eip1559` e `eip2930`. Eles correspondem ao campo `transaction type` no diagrama do objeto JSON acima. Para cada tipo de transação, a carga da transação contém os seguintes campos:\n\n=== \"EIP1559\"\n\n    ```text\n        ...\n        |--eip1559\n            |--chainId\n            |--nonce\n            |--maxPriorityFeePerGas\n            |--maxFeePerGas\n            |--gasLimit\n            |--action\n            |--value\n            |--input\n            |--accessList\n            |--oddYParity\n            |--r\n            |--s\n        ...\n    ```\n\n=== \"Legacy\"\n\n    ```text\n        ...\n        |--legacy\n            |--nonce\n            |--gasPrice\n            |--gasLimit\n            |--action\n            |--value\n            |--input\n            |--signature\n        ...\n    ```\n\n=== \"EIP2930\"\n\n    ```text\n        ...\n        |--eip2930\n            |--chainId\n            |--nonce\n            |--gasPrice\n            |--gasLimit\n            |--action\n            |--value\n            |--input\n            |--accessList\n            |--oddYParity\n            |--r\n            |--s\n        ...\n    ```\n\nPara obter mais informações sobre os novos tipos de transações [EIP1559](https://eips.ethereum.org/EIPS/eip-1559){target=\\_blank} e [EIP2930](https://eips.ethereum.org/EIPS/eip-2930){target=\\_blank} e o que cada campo significa, consulte as respectivas especificações oficiais da proposta Ethereum.\n\n### Transaction Field Mappings {: #transaction-field-mappings }\n\nPara obter o endereço do remetente EVM, o endereço do destinatário e o hash EVM de qualquer tipo de transação EVM, verifique o campo `events` sob o objeto extrinsic atual e identifique o evento em que o campo `method` está definido como:\n\n```text\n{event_number}.method.pallet: \"ethereum\"\n{event_number}.method.method: \"Executed\"\n```\n\nOs mapeamentos de campo EVM são então resumidos da seguinte forma:\n\n=== \"EIP1559\"\n    |        EVM Field         |                               Block JSON Field                               | \n    |:------------------------:|:----------------------------------------------------------------------------:|\n    |         Chain ID         |       `extrinsics[extrinsic_number].args.transaction.eip1559.chainId`        |\n    |          Nonce           |        `extrinsics[extrinsic_number].args.transaction.eip1559.nonce`         |\n    | Max priority fee per gas | `extrinsics[extrinsic_number].args.transaction.eip1559.maxPriorityFeePerGas` |\n    |     Max fee per gas      |     `extrinsics[extrinsic_number].args.transaction.eip1559.maxFeePerGas`     |\n    |        Gas limit         |       `extrinsics[extrinsic_number].args.transaction.eip1559.gasLimit`       |\n    |       Access list        |      `extrinsics[extrinsic_number].args.transaction.eip1559.accessList`      |\n    |        Signature         |    `extrinsics[extrinsic_number].args.transaction.eip1559.oddYParity/r/s`    |\n    |      Sender address      |         `extrinsics[extrinsic_number].events[event_number].data[0]`          |\n    |    Recipient address     |         `extrinsics[extrinsic_number].events[event_number].data[1]`          |\n    |         EVM hash         |         `extrinsics[extrinsic_number].events[event_number].data[2]`          |\n    |   EVM execution status   |         `extrinsics[extrinsic_number].events[event_number].data[3]`          |\n\n=== \"Legacy\"\n    |      EVM Field       |                         Block JSON Field                         |\n    |:--------------------:|:----------------------------------------------------------------:|\n    |        Nonce         |   `extrinsics[extrinsic_number].args.transaction.legacy.nonce`   |\n    |      Gas price       | `extrinsics[extrinsic_number].args.transaction.legacy.gasPrice`  |\n    |      Gas limit       | `extrinsics[extrinsic_number].args.transaction.legacy.gasLimit`  |\n    |        Value         |   `extrinsics[extrinsic_number].args.transaction.legacy.value`   |\n    |      Signature       | `extrinsics[extrinsic_number].args.transaction.legacy.signature` |\n    |    Sender address    |   `extrinsics[extrinsic_number].events[event_number].data[0]`    |\n    |  Recipient address   |   `extrinsics[extrinsic_number].events[event_number].data[1]`    |\n    |       EVM hash       |   `extrinsics[extrinsic_number].events[event_number].data[2]`    |\n    | EVM execution status |   `extrinsics[extrinsic_number].events[event_number].data[3]`    |\n\n=== \"EIP2930\"\n    |      EVM Field       |                            Block JSON Field                            |\n    |:--------------------:|:----------------------------------------------------------------------:|\n    |       Chain ID       |    `extrinsics[extrinsic_number].args.transaction.eip2930.chainId`     |\n    |        Nonce         |     `extrinsics[extrinsic_number].args.transaction.eip2930.nonce`      |\n    |      Gas price       |    `extrinsics[extrinsic_number].args.transaction.eip2930.gasPrice`    |\n    |      Gas limit       |    `extrinsics[extrinsic_number].args.transaction.eip2930.gasLimit`    |\n    |        Value         |     `extrinsics[extrinsic_number].args.transaction.eip2930.value`      |\n    |     Access list      |   `extrinsics[extrinsic_number].args.transaction.eip2930.accessList`   |\n    |      Signature       | `extrinsics[extrinsic_number].args.transaction.eip2930.oddYParity/r/s` | \n    |    Sender address    |      `extrinsics[extrinsic_number].events[event_number].data[0]`       |\n    |  Recipient address   |      `extrinsics[extrinsic_number].events[event_number].data[1]`       |\n    |       EVM hash       |      `extrinsics[extrinsic_number].events[event_number].data[2]`       |\n    | EVM execution status |      `extrinsics[extrinsic_number].events[event_number].data[3]`       |\n\nPor exemplo, para transações EVM, os campos \\\"Nonce\\\" e \\\"Signature\\\" estão em:\n\n```text\nextrinsics[extrinsic_number].args.transaction[transaction_type]\n```\n\nConsequentemente, isso deixa o \\\"Nonce\\\" e \\\"Signature\\\" para o campo de nível Substrate `extrinsics[extrinsic_number]` como `null`.\n\nUma transação EVM executada com sucesso retornará `succeed: \\\"Stopped\\\"` ou `succeed: \\\"Returned\\\"` sob o campo \\\"EVM Execution Status\\\" .\n\n## Monitor Token Balance Transfers {: #monitor-transfers }\n\nOs exemplos de código a seguir demonstrarão como ouvir transferências de tokens nativos, enviadas via Substrate ou API Ethereum, e transferências de tokens ERC-20 enviadas via API Ethereum, usando Substrate API Sidecar. As transferências via API Ethereum são aplicáveis ​​apenas a redes Tanssi EVM.\n\n### Native Token Transfers { #native-token-transfers }\n\nAs redes Tanssi não-EVM e EVM podem executar transferências de saldo de token nativo baseadas em Substrate.\n\nO seguinte snippet de código usa o cliente HTTP Axios para consultar o endpoint Sidecar [`/blocks/head`](https://paritytech.github.io/substrate-api-sidecar/dist){target=\\_blank} para o último bloco finalizado e, em seguida, decodifica o bloco para `from`, `to`, `value`, `tx hash` e `transaction status` de transferências de token nativo em ambos os níveis de API EVM e Substrate.\n\n```typescript\n--8<-- 'code/builders/toolkit/substrate-api/libraries/sidecar/sidecar-transfer.ts'\n```\n\n### ERC-20 Token Transfers {: #erc-20-token-transfers }\n\nEventos emitidos por contratos inteligentes, como um contrato de token ERC-20 implantado em redes Tanssi EVM, podem ser decodificados de objetos JSON de bloco Sidecar. A estrutura de aninhamento é a seguinte:\n\n```text\nRESPONSE JSON Block Object:\n    |--extrinsics\n        |--{extrinsic_number}\n            |--method\n                |--pallet: \"ethereum\"\n                |--method: \"transact\"\n            |--signature:\n            |--nonce:\n            |--args\n                |--transaction\n                    |--{transaction_type}\n            |--hash\n            |--events\n                |--{event_number}\n                    |--method\n                        |--pallet: \"evm\"\n                        |--method: \"Log\"\n                    |--data\n                        |--0\n                            |-- address\n                            |-- topics\n                                |--0\n                                |--1\n                                |--2\n					        |-- data\n            ...\n    ...\n\n```\n\nAs transferências de token ERC-20 emitirão o evento [`Transfer`](https://eips.ethereum.org/EIPS/eip-20){target=\\_blank}, que pode ser decodificado da seguinte forma:\n\n|     Informações da transação      |                           Campo JSON do bloco                            |\n|:-----------------------:|:---------------------------------------------------------------------:|\n| Endereço do contrato ERC-20 |  `extrinsics[extrinsic_number].events[event_number].data[0].address`  |\n|  Hash de assinatura do evento   | `extrinsics[extrinsic_number].events[event_number].data[0].topics[0]` |\n|     Endereço do remetente      | `extrinsics[extrinsic_number].events[event_number].data[0].topics[1]` |\n|    Endereço do destinatário    | `extrinsics[extrinsic_number].events[event_number].data[0].topics[2]` |\n|         Amount          |   `extrinsics[extrinsic_number].events[event_number].data[0].data`    |\n\nOutros eventos emitidos por contratos inteligentes EVM podem ser decodificados de maneira semelhante, mas o conteúdo dos campos de tópicos e dados mudará dependendo da definição do evento específico.\n\n!!! note\n    A quantia transferida é dada levando em consideração os decimais e em formato hexadecimal.\n\n## Substrate API Transaction Fees {: #substrate-api-transaction-fees }\n\nPara redes Tanssi não-EVM e EVM, todas as informações sobre dados de taxas para transações enviadas via API Substrate podem ser extraídas do seguinte endpoint de bloco:\n\n```text\nGET /blocks/{blockId}\n```\n\nOs endpoints de bloco retornarão dados relevantes para um ou mais blocos. Você pode ler mais sobre os endpoints de bloco na [documentação oficial do Sidecar](https://paritytech.github.io/substrate-api-sidecar/dist/#operations-tag-blocks){target=\\_blank}.\n\nLido como um objeto JSON, para um determinado `pallet` (módulo) e `method`, a taxa de transação é fornecida por um evento associado com a seguinte estrutura:\n\n```text\n{event_number}.method.pallet: \"transactionPayment\"\n{event_number}.method.method: \"TransactionFeePaid\"\n```\n\nA estrutura de aninhamento relevante é a seguinte:\n\n```text\nRESPONSE JSON Block Object:\n    ...\n    |--number\n    |--extrinsics\n        |--{extrinsic_number}\n            |--method\n            |--signature\n            |--nonce\n            |--args\n            |--tip\n            |--hash\n            |--info\n            |--era\n            |--events\n                |--{event_number}\n                    |--method\n                        |--pallet: \"transactionPayment\"\n                        |--method: \"TransactionFeePaid\"\n                    |--data\n                        |--0\n                        |--1\n                        |--2\n    ...\n\n```\n\nOs mapeamentos de objetos são resumidos da seguinte forma:\n\n|   Informações da transação   |                      Campo JSON do bloco                       |\n|:------------------:|:-----------------------------------------------------------:|\n| Conta pagadora de taxas | `extrinsics[extrinsic_number].events[event_number].data[0]` |\n|  Taxas totais pagas   | `extrinsics[extrinsic_number].events[event_number].data[1]` |\n|        Gorjeta         | `extrinsics[extrinsic_number].events[event_number].data[2]` |\n\nEntão, a taxa total de transação paga por esta extrinsic é mapeada para o seguinte campo do objeto JSON do bloco:\n\n```text\nextrinsics[extrinsic_number].events[event_number].data[1]\n```\n\n## Ethereum API Transaction Fees {: #ethereum-api-transaction-fees }\n\nPara redes Tanssi EVM, os usuários também podem enviar fundos via API Ethereum. Para calcular a taxa incorrida em transações enviadas via API Ethereum, a seguinte fórmula pode ser usada:\n\n=== \"EIP-1559\"\n\n    ```text\n    GasPrice = BaseFee + MaxPriorityFeePerGas < MaxFeePerGas ?\n                BaseFee + MaxPriorityFeePerGas : \n                MaxFeePerGas;\n    Transaction Fee = (GasPrice * TransactionWeight) / 25000\n    ```\n\n=== \"Legacy\"\n\n    ```text\n    Transaction Fee = (GasPrice * TransactionWeight) / 25000\n    ```\n\n=== \"EIP-2930\"\n\n    ```text\n    Transaction Fee = (GasPrice * TransactionWeight) / 25000\n    ```\n\nAs seções a seguir descrevem com mais detalhes cada um dos componentes necessários para calcular a taxa de transação.\n\n### Base Fee {: #base-fee}\n\nO `BaseFee` é o valor mínimo cobrado para enviar uma transação e é um valor definido pela própria rede. Foi introduzido no [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\\_blank}. As redes Tanssi EVM têm um mecanismo de taxa dinâmica que visa replicar o [mecanismo de mercado de taxas EIP-1559](https://eips.ethereum.org/EIPS/eip-1559#specification){target=\\_blank}, onde a taxa base é ajustada com base no congestionamento do bloco.\n\nPor exemplo, para o modelo de rede Tanssi EVM, o preço mínimo do gás é `1 GWei`.\n\nO `BaseFee` pode ser recuperado diretamente do armazenamento `baseFeePerGas` encontrado no módulo (pallet) `baseFee`, usando o seguinte endpoint:\n\n```text\nGET /pallets/baseFee/storage/baseFeePerGas?at={blockId}\n```\n\nLido como um objeto JSON, a estrutura de aninhamento relevante é a seguinte:\n\n```text\nRESPONSE JSON Storage Object:\n    |--at\n        |--hash\n        |--height\n    |--pallet\n    |--palletIndex\n    |--storageItem\n    |--keys\n    |--value\n```\n\nOs dados relevantes serão armazenados na chave `value` do objeto JSON. Este valor é um tipo de dados de ponto fixo, portanto, o valor real é encontrado dividindo o `value` pelos decimais.\n\n### GasPrice, MaxFeePerGas e MaxPriorityFeePerGas {: #gasprice-maxfeepergas-maxpriorityfeepergas }\n\nO `GasPrice` é usado para especificar o preço do gás de transações herdadas antes do [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\\_blank}. O `MaxFeePerGas` e o `MaxPriorityFeePerGas` foram introduzidos no EIP-1559 junto com o `BaseFee`. O `MaxFeePerGas` define a taxa máxima permitida a ser paga por unidade de gás e é a soma do `BaseFee` e do `MaxPriorityFeePerGas`. O `MaxPriorityFeePerGas` é a taxa de prioridade máxima configurada pelo remetente de uma transação que é usada para incentivar a priorização de uma transação em um bloco.\n\nApesar de as redes Tanssi EVM serem compatíveis com Ethereum, elas também são cadeias baseadas em Substrate em sua essência, e as prioridades funcionam de maneira diferente no Substrate do que no Ethereum. No Substrate, as transações não são priorizadas pelo preço do gás. Para resolver isso, as redes Tanssi EVM usam um sistema de priorização modificado que reprioriza as transações Substrate usando uma solução Ethereum first. Uma transação Substrate ainda passa pelo processo de validade, onde recebe tags de transação, longevidade e uma prioridade. A prioridade original é então substituída por uma nova prioridade com base na taxa de gás da transação, que é derivada da gorjeta e do peso da transação. Se a transação for uma transação Ethereum, a prioridade será definida de acordo com a taxa de prioridade.\n\nÉ importante observar que a prioridade não é o único componente responsável por determinar a ordem das transações em um bloco. Outros componentes, como a longevidade de uma transação, também desempenham um papel no processo de classificação.\n\nOs valores de `GasPrice`, `MaxFeePerGas` e `MaxPriorityFeePerGas` para os tipos de transação aplicáveis ​​podem ser lidos do objeto JSON do bloco de acordo com a estrutura descrita na [página da API Sidecar](#evm-fields-mapping-in-block-json-object).\n\nOs dados de uma transação Ethereum em um determinado bloco podem ser extraídos do seguinte endpoint de bloco:\n\n```text\nGET /blocks/{blockId}\n```\n\nOs caminhos para os valores relevantes também foram truncados e reproduzidos abaixo:\n\n=== \"EIP1559\"\n    |      EVM Field       |                               Block JSON Field                               | \n    |:--------------------:|:----------------------------------------------------------------------------:|\n    |     MaxFeePerGas     |     `extrinsics[extrinsic_number].args.transaction.eip1559.maxFeePerGas`     |\n    | MaxPriorityFeePerGas | `extrinsics[extrinsic_number].args.transaction.eip1559.maxPriorityFeePerGas` |\n\n=== \"Legacy\"\n    | EVM Field |                        Block JSON Field                         |\n    |:---------:|:---------------------------------------------------------------:| \n    | GasPrice  | `extrinsics[extrinsic_number].args.transaction.legacy.gasPrice` |\n\n=== \"EIP2930\"\n    | EVM Field |                         Block JSON Field                         |\n    |:---------:|:----------------------------------------------------------------:| \n    | GasPrice  | `extrinsics[extrinsic_number].args.transaction.eip2930.gasPrice` |\n\n### Transaction Weight {: #transaction-weight}\n\n`TransactionWeight` é um mecanismo Substrate usado para medir o tempo de execução que uma determinada transação leva para ser executada dentro de um bloco. Para todos os tipos de transações, `TransactionWeight` pode ser recuperado sob o evento do extrinsic relevante, onde o campo `method` está definido como:\n\n```text\npallet: \"system\", method: \"ExtrinsicSuccess\"\n```\n\nE então `TransactionWeight` é mapeado para o seguinte campo do objeto JSON do bloco:\n\n```text\nextrinsics[extrinsic_number].events[event_number].data[0].weight\n```\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Usando Substrate API Sidecar\ndescription: Aprenda a usar o serviço REST baseado em Substrate com redes alimentadas pela Tanssi para acessar blocos, saldo da conta, calcular o gás usado e muito mais.\nicon: octicons-code-24\ncategories: Substrate-Template\n---\n\n# Usando Substrate API Sidecar\n\n## Introdução {: #introduction }\n\nSubstrate API Sidecar permite que aplicativos acessem blocos, saldo da conta e outras informações de blockchains baseados em Substrate por meio de uma API REST. Isso pode ser útil para exchanges, carteiras ou outros tipos de aplicativos que precisam acompanhar o saldo da conta e outras mudanças de estado em uma rede alimentada pela Tanssi. Esta página descreverá como instalar e executar um Substrate API Sidecar para uma rede Tanssi, bem como os endpoints de API comumente usados.\n\n## Instalando e Executando Substrate API Sidecar {: #installing-and-running-substrate-api-sidecar }\n\nHá várias maneiras de instalar e executar o Substrate API Sidecar. Este guia descreverá as etapas para instalá-lo e executá-lo localmente por meio do NPM. Para executar o Substrate API Sidecar por meio do Docker, ou criar e executá-lo a partir da fonte, consulte o [repositório Github do Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar#readme).\n\n--8<-- 'text/_common/general-js-tutorial-check.md'\n\n### Instalando o Substrate API Sidecar {: #installing-the-substrate-api-sidecar }\n\nPara instalar o serviço Substrate API Sidecar localmente no diretório atual, execute isto na linha de comando:\n\n```bash\nnpm install @substrate/api-sidecar@{{ networks.mainnet.substrate_api_sidecar.stable_version }}\n```\n\n!!! note\n    Se a pasta atual ainda não tiver uma estrutura de projeto Node.js, você precisará criar manualmente o diretório `node_modules` digitando `mkdir node_modules`.\n\nSubstrate API Sidecar v{{ networks.mainnet.substrate_api_sidecar.stable_version }} é a versão estável atual que foi testada para funcionar com redes Tanssi. Você pode verificar se a instalação foi bem-sucedida digitando no diretório raiz de instalação:\n\n```bash\nnode_modules/.bin/substrate-api-sidecar --version\n```\n\n## Configurando o Substrate API Sidecar {: #setting-up-the-substrate-api-sidecar }\n\nNo terminal em que o Sidecar será executado, exporte a variável de ambiente para o endpoint WS da rede que você deseja se conectar. Por exemplo, o endpoint WSS da sua rede Tanssi. Alguns exemplos:\n\n=== \"Tanssi MainNet\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL=wss://{{ networks.mainnet.dns_name }}\n    ```\n\n=== \"Dancelight TestNet\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL=wss://{{ networks.dancelight.dns_name }}\n    ```\n\n=== \"Demo EVM Network\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL={{ networks.dancelight.demo_evm_rpc_wss_url }}\n    ```\n\n=== \"Your Network\"\n\n    ```bash\n    export SAS_SUBSTRATE_URL=INSERT_NETWORK_WSS_ENDPOINT\n    ```\n\nDepois de definir a variável de ambiente, você pode usar o comando `echo` para verificar se a variável de ambiente foi definida corretamente, digitando:\n\n```bash\necho $SAS_SUBSTRATE_URL\n```\n\nE ele deve exibir o endpoint de rede que você acabou de definir.\n\n## Executando o Substrate API Sidecar {: #running-substrate-api-sidecar }\n\nCom a variável de ambiente do endpoint de rede definida e a partir da raiz do diretório de instalação, execute:\n\n```bash\nnode_modules/.bin/substrate-api-sidecar\n```\n\nSe a instalação e a configuração forem bem-sucedidas, você deverá ver esta saída no console:\n\n![Saída Bem-sucedida](/images/builders/toolkit/substrate-api/libraries/sidecar-api/sidecar-1.webp)\n\n## Endpoints do Substrate API Sidecar {: #substrate-api-sidecar-endpoints }\n\nAlguns dos endpoints do Substrate API Sidecar comumente usados ​​incluem:\n\n - **GET /blocks​/head** — Obtenha o bloco finalizado mais recentemente. O parâmetro opcional `finalized` pode ser definido como `false` para obter o bloco mais novo conhecido, que pode não









```bash

```

```bash

```

````

```bash

```



```bash

```

    ```bash

    ```


    ```bash

    ```

````
    ```bash

    ```

```bash

```
```text


```bash

```







```bash

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



```text










```



```text



```



```text

```




````

    ```text


```

```text

```

```typescript

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

```text






```

















```text

```

````

```text




```



```text

```



```text

```

````

```text

```

```text


```







```text

```

```text

```
```typescript

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



```text









```















```text

```























```text

```



```text

```
