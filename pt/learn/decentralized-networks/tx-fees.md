---
title: Taxas de Transação
description: Saiba como funciona o mecanismo de taxas em redes Tanssi, do ponto de vista Substrate e na camada EVM compatível com EIP-1559.
icon: material-piggy-bank-outline 
categories: Basics
---

# Taxas de Transação {: #transaction-fees }

## Introdução {: #introduction}

Redes powered by Tanssi são construídas com um [framework modular](/pt/learn/framework/){target=\_blank} chamado [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/){target=\_blank}. Com esse framework, você pode criar formas próprias de lidar com taxas de transação. Por exemplo, a maioria das transações usa um módulo específico chamado [Transaction Payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment){target=\_blank}. Contudo, em redes Tanssi compatíveis com EVM, as taxas podem ser cobradas no nível da execução EVM, contornando outros módulos relacionados a taxas.

Sob o capô, para Runtime, em vez de um mecanismo baseado em gas, todas as redes Tanssi usam um [mecanismo baseado em weight](https://docs.polkadot.com/polkadot-protocol/parachain-basics/blocks-transactions-fees/fees/){target=\_blank}. Weight refere-se ao tempo (em picosegundos) para validar um bloco. De modo geral, para redes Tanssi EVM e não EVM, todas as chamadas têm um weight associado, que define limites de entrada/saída de storage e de computação. Para redes Tanssi EVM, há um mapeamento gas-to-weight totalmente compatível com os requisitos de gas esperados por ferramentas baseadas na Ethereum API.

Um esquema de taxas é aplicado sobre o mecanismo de weight para alinhar incentivos econômicos, limitando Runtime, computação e número de chamadas (leituras/gravações). Taxas são fundamentais para evitar spam, pois representam o custo de usar o serviço da rede Tanssi. Assim, um usuário que interage com a rede por meio de uma chamada paga uma taxa determinada por um algoritmo de taxa base.

Esta página aborda os fundamentos das taxas em redes Tanssi. Primeiro cobre a arquitetura subjacente de taxas e como ela é adaptada a um Template totalmente compatível com EIP-1559 para redes Tanssi EVM.

## Baseline Fees Calculation {: #baseline-fees }

Cada ação que altera o estado de uma rede Tanssi gera uma taxa de transação. Essa taxa é essencial para a operação da rede, cobrindo os recursos computacionais necessários para processar transações, de forma similar aos parâmetros de gas e gas price em cadeias compatíveis com EVM como a Ethereum.

O [framework modular](/pt/learn/framework/){target=\_blank} das redes Tanssi usa um mecanismo de cálculo baseado em weight para determinar taxas. Essa abordagem considera vários fatores, incluindo recursos computacionais e operações de storage (inputs/outputs), para refletir com precisão o custo real das transações. Ao contabilizar esses elementos, a rede garante alocação de recursos justa e eficiente.

Além disso, a modularidade das redes Tanssi garante que redes compatíveis com EVM suportem mecanismos de precificação legados e [compatíveis com EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank}, assegurando compatibilidade total com ambientes de desenvolvimento usados na Ethereum.

Esta seção apresenta os diferentes conceitos associados às taxas em redes Tanssi.

### Weight {: #baseline-weight}

De forma ampla, weight refere-se ao Runtime para validar um bloco, medido em picosegundos. O weight se divide em duas variáveis:

- **`refTime`** - peso associado a tempo de computação e leituras/gravações em banco de dados
- **`proofSize`** - peso associado ao tamanho da Prova de Validade (PoV). A PoV se relaciona ao estado relevante de uma transação, e é o que o Sequencer da rede Tanssi compartilha com os operators do provedor de segurança para validar e finalizar um bloco como parte do [fluxo de transações da rede](/pt/learn/decentralized-networks/overview/#network-transaction-flow){target=\_blank}

Para descobrir os weights de todas as chamadas, elas são benchmarked em hardware de referência, e valores aproximados de `refTime` e `proofSize` são definidos. Esse processo se repete para todas as chamadas que consomem espaço de bloco e afetam a PoV.

Para transações em que as taxas são tratadas pelo módulo [transaction payment](https://docs.rs/pallet-transaction-payment/latest/pallet_transaction_payment){target=\_blank}, todos os parâmetros baseados em weight passam por um algoritmo _weight to fee_ que converte tudo em um valor final, deduzido da conta do remetente ao executar a chamada. O algoritmo pode ser personalizado, mas redes Tanssi definem um valor constante.

Para transações EVM, o gas é convertido em weight por meio de um algoritmo gas-to-weight, para que todas as chamadas EVM possam ser mapeadas para o Runtime do bloco. Ainda assim, as taxas são tratadas no nível da execução EVM.

### Baseline Transaction Fees {: #baseline-transaction-fees}

<!-- https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/transaction-payment/src/lib.rs#L627-L652 -->

Com todas as chamadas benchmarked, a taxa de transação para cada chamada específica pode ser obtida. As taxas geralmente são compostas pelos seguintes elementos:

- **`BaseFee`** - custo básico para incluir a transação. Cobre a sobrecarga de inclusão, como verificação de assinatura. A taxa é definida por dois parâmetros:
    - **`ExtrinsicBaseWeight`** - valor constante que representa o weight da sobrecarga de inclusão
    - **`WeightToFee`** - função polinomial que converte weight em taxa
- **`WeightFee`** - taxa definida por dois parâmetros:
    - **`BenchmarkedWeight`** - weight que reflete a complexidade (Runtime) de uma chamada específica
    - **`CongestionMultiplier`** - função que converte weight em taxa e pode ser ajustada para considerar a congestão da rede (weight consumido no bloco anterior). A estratégia padrão nas redes Tanssi é [`SlowAdjustingFeeUpdate`](https://research.web3.foundation/Polkadot/overview/token-economics#2-slow-adjusting-mechanism){target=\_blank}, que ajusta esse multiplicador lentamente conforme a carga da rede
- **`LengthFee`** - taxa correlacionada ao tamanho em bytes da chamada. Definida por dois parâmetros:
    - **`ByteLengthFunctionCall`** - tamanho em bytes da chamada
    - **`LengthToFee`** - função que define o algoritmo de taxa por byte. Nas redes Tanssi, é um valor constante
- **`Tip`** - valor opcional que aumenta a taxa total, elevando a prioridade da transação ao incentivar Sequencers a incluí-la no próximo bloco

Assim, em termos gerais, a taxa de transação pode ser calculada pela equação:

<!-- https://github.com/moondance-labs/substrate/blob/master/frame/support/src/weights/extrinsic_weights.rs#L57 -->
<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L265-L277 -->

```text
BaseFee = ExtrinsicBaseWeight * WeightToFee
WeightFee = BenchmarkedWeight  * CongestionMultiplier
LengthFee = ByteLengthFunctionCall * LengthToFee

InclusionFee = BaseFee + WeightFee + LengthFee
FinalFee = InclusionFee + Tip
```

Todas as chamadas não EVM disponíveis aos desenvolvedores usam esses cálculos básicos para taxas. Redes Tanssi EVM adicionam uma camada extra para traduzir esse esquema para algo semelhante ao Template Ethereum do ponto de vista da Ethereum JSON-RPC e da EVM.

### EVM Transaction Fees {: #evm-transaction-fees }

<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/frame/base-fee/src/lib.rs#L126-L199 -->

A Tanssi oferece [templates para redes EVM completas](/builders/build/templates/evm/){target=\_blank}. Essas redes fornecem um ambiente similar ao Ethereum, onde os desenvolvedores podem usar bibliotecas como [Ethers.js](/pt/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, [Hardhat](/pt/builders/toolkit/ethereum-api/dev-env/hardhat/){target=_blank} e [Foundry](/pt/builders/toolkit/ethereum-api/dev-env/foundry/){target=\_blank}.

Além disso, todas as redes Tanssi compatíveis com EVM têm um mecanismo de precificação [compatível com EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} para transações EVM. Elas suportam os dois tipos de transação EVM mais comuns:

- **Tipo 0 (Legacy)** - a taxa é calculada por um valor único de gas price incluído no blob da transação assinada. Como as redes Tanssi EVM têm precificação dinâmica, o gas price deve ser maior que o `baseFee` do bloco atual para a transação ser válida
- **Tipo 2 (EIP-1559)** - a taxa é calculada com a combinação de `maxFeePerGas` e `maxPriorityFeePerGas` no blob da transação, e o `baseFee` da rede muda dinamicamente com base na congestão do bloco

Independentemente do tipo de transação, o resultado é um custo em tokens nativos que a rede deve cobrar.

Por padrão, redes Tanssi compatíveis com EVM têm os seguintes parâmetros:

- **Minimum BaseFee** - gas price mínimo da rede caso não haja transações por longos períodos. O valor padrão é 1 GWei
- **Block Fulness Target (Elasticity)** - alvo de gas usado em um bloco para manter o `baseFee` estável. A [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} define esse valor como 2, significando que a meta de uso é 50% do limite de gas do bloco. Todas as redes Tanssi EVM usam a mesma meta
- **Maximum BaseFee Increase** - aumento máximo do `baseFee`, em pontos percentuais, com base no uso-alvo do bloco anterior. A [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559){target=\_blank} define esse valor como 12,5%. Assim, se o bloco estiver cheio/vazio, o `baseFee` aumenta/diminui 12,5%, ajustando-se linearmente para valores intermediários. Esse valor é configurável, mas o padrão nas redes Tanssi EVM é 12,5%

!!! note
    Uma diferença importante na implementação EIP-1559 das redes Tanssi EVM é que as taxas são calculadas usando o `baseFee` do bloco anterior.

O custo de taxa de transação para chamadas EVM nas redes Tanssi é capturado no nível de execução EVM. Ainda assim, transações EVM consomem Runtime de bloco. Portanto, é necessário um algoritmo gas-to-weight para contabilizar o weight consumido por uma chamada em relação ao gas usado.

<!-- https://github.com/moondance-labs/tanssi/blob/master/container-chains/templates/frontier/runtime/src/lib.rs#L825 -->
<!-- https://github.com/polkadot-evm/frontier/blob/272fe8839f87161ed89350de166b379f1f4c6136/primitives/evm/src/lib.rs#L253-L265 -->

Por fim, a taxa e o weight associados a uma chamada EVM em uma rede Tanssi compatível com EVM podem ser calculados assim:

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
