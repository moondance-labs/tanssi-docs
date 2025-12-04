---
title: Taxas de Transação
description: Aprenda sobre o mecanismo de taxas de transação nas redes Tanssi, como ele funciona sob uma perspectiva Substrate e na camada de emulação EVM do Ethereum com EIP-1559.
icon: material-piggy-bank-outline
categories: Basics
---

# Taxas de Transação {: #transaction-fees }

## Introdução {: #introduction}

As redes com tecnologia Tanssi são construídas com uma [estrutura modular](/pt/learn/framework/){target=\_blank} chamada [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/){target=\_blank}. Com esta estrutura, você pode construir maneiras exclusivas de lidar com as taxas de transação. Por exemplo, a maioria das transações usa um módulo específico chamado [Transaction Payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment){target=\_blank}. No entanto, as taxas de transação em redes compatíveis com EVM com tecnologia Tanssi podem ser cobradas em um nível de execução EVM, ignorando outros módulos relacionados a taxas.

Por dentro, para tempo de execução, em vez de trabalhar com um mecanismo baseado em gás, todas as redes Tanssi trabalham com um [mecanismo baseado em peso](https://docs.polkadot.com/polkadot-protocol/parachain-basics/blocks-transactions-fees/fees/){target=\_blank}. Peso refere-se ao tempo (em picossegundos) que leva para validar um bloco. Em geral, para redes Tanssi EVM e não-EVM, todas as chamadas de função têm um peso associado a elas, que define limites de entrada/saída de armazenamento e computação. Para redes Tanssi EVM, existe um mapeamento de gás para peso que está totalmente em conformidade com os requisitos de gás esperados para ferramentas baseadas em API Ethereum.

Um esquema de taxas de transação é aplicado sobre o mecanismo baseado em peso para garantir que os incentivos econômicos estejam alinhados para limitar o tempo de execução, a computação e o número de chamadas (leitura/gravação de banco de dados) para realizar operações. As taxas de transação são fundamentais para prevenir spam na rede, pois representam o custo de usar o serviço de rede Tanssi. Consequentemente, um usuário que interage com a rede por meio de uma chamada de função específica pagará uma taxa de transação determinada por um algoritmo de taxa de base.

Esta página aborda os fundamentos das taxas de transação para as redes Tanssi. Primeiro, ela aborda a arquitetura subjacente das taxas de transação e como ela é adaptada a um modelo totalmente compatível com EIP-1559 para as redes Tanssi EVM.

## Cálculo de Taxas de Base {: #baseline-fees }

Cada ação que altera o estado de uma rede Tanssi incorre em uma taxa de transação. Essa taxa é essencial para a operação da rede, cobrindo os recursos computacionais necessários para processar transações, semelhante aos parâmetros de gás e preço do gás em cadeias compatíveis com EVM, como o Ethereum.

A [estrutura modular](/pt/learn/framework/){target=\_blank} das redes Tanssi usa um mecanismo de cálculo de taxa baseado em peso para determinar as taxas de transação. Essa abordagem considera vários fatores, incluindo recursos computacionais e operações de armazenamento (entradas/saídas), para refletir com precisão o custo real das transações. Ao contabilizar esses elementos, a rede garante uma alocação de recursos justa e eficiente.

Além disso, a modularidade das redes Tanssi garante que as redes compatíveis com EVM suportem mecanismos de preços de transação legados e [compatíveis com EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank}, garantindo total compatibilidade com os ambientes de desenvolvimento comumente usados no Ethereum.

Esta seção descreve todos os diferentes conceitos associados às taxas de transação para as redes Tanssi.

### Peso {: #baseline-weight}

De modo geral, o peso se refere ao tempo de execução necessário para validar um bloco, medido em picossegundos. O peso é dividido em duas variáveis separadas:

- **`refTime`** - corresponde ao peso associado ao tempo de computação e às leituras/gravações do banco de dados
- **`proofSize`** - corresponde ao peso associado ao tamanho da Prova de Validade (ou PoV, em resumo). A PoV está associada ao estado relevante de uma transação e é o que o sequenciador da rede Tanssi compartilha com os operadores do provedor de segurança para obter um bloco validado e finalizado como parte do [fluxo de transações da rede](/pt/learn/decentralized-networks/overview/#network-transaction-flow){target=\_blank}

Para encontrar os pesos para todas as chamadas de função, elas são benchmarkadas em um sistema com hardware de referência e os valores aproximados de `refTime` e `proofSize` são definidos. Esse processo é repetido para todas as chamadas de função que consomem espaço de bloco e afetam a PoV.

Para transações em que as taxas são tratadas pelo módulo [transaction payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment){target=\_blank}, todos os parâmetros baseados em peso são então passados por um algoritmo _peso para taxa_ que converte tudo em um valor final, deduzido da conta do remetente ao executar a chamada de função. O algoritmo pode ser personalizado, mas as redes Tanssi têm um valor constante definido.

Para transações EVM, gás é convertido em peso por meio de um algoritmo de gás para peso para que todas as chamadas EVM possam ser mapeadas para o tempo de execução do bloco. No entanto, as taxas são tratadas em um nível de execução EVM.

### Taxas de transação base {: #baseline-transaction-fees}

<!-- https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/transaction-payment/src/lib.rs#L627-L652 -->

Com todas as chamadas de função benchmarkadas, a taxa de transação para cada chamada específica pode ser obtida. As taxas de transação são normalmente compostas pelos seguintes elementos:

- **`BaseFee`** - custo base para uma transação ser incluída. Ele contabiliza a sobrecarga de inclusão da transação, como a verificação da assinatura. A taxa é definida por dois parâmetros separados:
  - **`ExtrinsicBaseWeight`** - um valor constante que representa o peso da sobrecarga de inclusão da transação
  - **`WeightToFee`** - uma função polinomial que converte peso em taxa
- **`WeightFee`** - taxa definida por dois parâmetros separados:
  - **`BenchmarkedWeight`** - peso que contabiliza a complexidade (tempo de execução) de uma chamada específica
  - **`CongestionMultiplier`** - uma função que converte peso em taxa e pode ser ajustada para contabilizar o congestionamento da rede (peso consumido no bloco anterior). A estratégia padrão para redes Tanssi é [`SlowAdjustingFeeUpdate`](https://research.web3.foundation/Polkadot/overview/token-economics#2-slow-adjusting-mechanism){target=\_blank}, que ajusta esse multiplicador lentamente ao longo do tempo, acompanhando a carga da rede
- **`LengthFee`** - uma taxa correlacionada ao comprimento em bytes da chamada de função. A taxa é definida por dois parâmetros separados:
  - **`ByteLengthFunctionCall`** - comprimento em bytes da chamada que está sendo executada
  - **`LengthToFee`** - uma função que define o algoritmo de taxa por byte. Para redes Tanssi, este é um valor constante
- **`Tip`** - um valor opcional que aumenta a taxa geral, aumentando a prioridade da transação, incentivando os sequenciadores a incluí-la no próximo bloco

Portanto, em termos gerais, a taxa de transação pode ser calculada com a seguinte equação:

<!-- https://github.com/moondance-labs/substrate/blob/master/frame/support/src/weights/extrinsic_weights.rs#L57 -->

<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L265-L277 -->

```text
BaseFee = ExtrinsicBaseWeight * WeightToFee
WeightFee = BenchmarkedWeight  * CongestionMultiplier
LengthFee = ByteLengthFunctionCall * LengthToFee

InclusionFee = BaseFee + WeightFee + LengthFee
FinalFee = InclusionFee + Tip
```

Todas as chamadas de função não EVM disponíveis para desenvolvedores usam esses cálculos básicos para taxas de transação. As redes Tanssi EVM têm uma camada extra para traduzir este esquema de taxas em um esquema semelhante ao Ethereum, a partir de uma perspectiva JSON-RPC e EVM do Ethereum.

### Taxas de transação EVM {: #evm-transaction-fees }

<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/frame/base-fee/src/lib.rs#L126-L199 -->

A Tanssi oferece [modelos para redes totalmente compatíveis com Tanssi EVM](/pt/builders/build/templates/evm/){target=\_blank}. Tais redes fornecem um ambiente semelhante ao Ethereum para desenvolvedores, onde eles podem usar bibliotecas específicas do Eth, como [Ethers.js](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, [Hardhat](/pt/builders/toolkit/ethereum-api/dev-env/hardhat/){target=\_blank} e [Foundry](/pt/builders/toolkit/ethereum-api/dev-env/foundry/){target=\_blank}.

Além disso, todas as redes compatíveis com Tanssi EVM têm um mecanismo de preços de transação [compatível com EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} para transações EVM. Mas elas suportam ambos os tipos de transação EVM comumente usados:

- **Tipo 0 (Legacy)** - a taxa de transação é calculada por meio de um único valor de preço de gás que é incluído no blob de transação assinado. Como as redes compatíveis com Tanssi EVM possuem um mecanismo de preços dinâmicos, o preço do gás deve ser maior que o `baseFee` do bloco atual para que uma transação seja considerada válida
- **Tipo 2 (EIP-1559)** - a taxa de transação é calculada com uma combinação de `maxFeePerGas` e `maxPriorityFeePerGas` do blob de transação assinado e o `baseFee` da rede muda dinamicamente com base no congestionamento do bloco

Independentemente do tipo de transação, o resultado de todas as transações EVM é que existe um custo associado em tokens nativos que a rede deve cobrar.

Por padrão, as redes compatíveis com Tanssi EVM são configuradas com os seguintes parâmetros:

- **BaseFee Mínima** - o preço mínimo do gás da rede caso não haja transações por longos períodos. O valor padrão é definido como 1 GWei
- **Meta de preenchimento de bloco (Elasticidade)** - o gás usado como meta em um bloco, de modo que o `baseFee` permaneça o mesmo. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} define esse valor como uma constante definida como 2, o que significa que o uso-alvo é 50% do limite de gás do bloco. Todas as redes compatíveis com Tanssi EVM são configuradas com a mesma meta
- **Aumento máximo da BaseFee** - a quantidade máxima que o `baseFee` pode aumentar ou diminuir, em pontos percentuais, com base no uso-alvo do bloco anterior. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} define esse valor como uma constante definida como 12,5%. Consequentemente, se o bloco estiver cheio/vazio, o `baseFee` aumentará/diminuirá em 12,5%, e quaisquer valores intermediários serão ajustados linearmente. Os desenvolvedores podem configurar esse valor para redes compatíveis com Tanssi EVM, mas o valor padrão é 12,5%

!!! nota
  Uma diferença importante na implementação do EIP-1559 nas redes compatíveis com Tanssi EVM é que as taxas de transação são calculadas usando o `baseFee` do bloco anterior.

O custo da taxa de transação EVM associado a todas as redes compatíveis com Tanssi EVM é capturado em um nível de execução EVM. No entanto, as transações EVM consomem tempo de execução do bloco. Portanto, um algoritmo de gás para peso é necessário para contabilizar o peso consumido por uma chamada específica em relação ao gás que ela está consumindo.

<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L825 -->

<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/primitives/evm/src/lib.rs#L253-L265 -->

Em última análise, a taxa de transação e o peso associados a uma chamada EVM em uma rede compatível com Tanssi EVM podem ser calculados com a seguinte fórmula:

=== "EIP-1559"
    ```text
    Gas Price = baseFee + maxPriorityFeePerGas < maxFeePerGas ? 
               baseFee + maxPriorityFeePerGas : 
               maxFeePerGas;
    Transaction Fee = Gas Price * Gas Used
    Transaction Weight = Gas Used * GasToWeight
    ```

=== "Legacy"
    ```text
    Transaction Fee = GasPrice * GasUsed
    Transaction Weight = GasUsed * GasToWeight
    ```


`GasToWeight` é um valor constante definido como `{{ templates.evm.gas_to_weight }}`.
