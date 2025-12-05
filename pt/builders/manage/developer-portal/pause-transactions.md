---
title: Pausando Transações
description: Aprenda a usar o Sudo para pausar temporariamente transações selecionadas, impedindo sua execução, enquanto todas as outras transações prosseguem normalmente.
icon: octicons-stopwatch-24
categories: Appchain
---

# Pausando Transações

## Introdução {: #introduction }

O [módulo de Pausa de Transação](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/tx-pause/src/lib.rs){target=\_blank} é um dos [módulos embutidos](/pt/learn/framework/modules/#built-in-modules){target=\_blank} incluídos no Polkadot SDK, e está disponível em qualquer rede alimentada por Tanssi baseada nos [modelos oficiais](/pt/builders/build/templates/overview/){target=\_blank} versão [400](https://github.com/moondance-labs/tanssi/releases/tag/runtime-400-templates){target=\_blank} ou superior.

Este módulo permite que um governador de rede evite temporariamente a execução de um conjunto de transações selecionadas, enquanto o restante das transações continua normalmente. Esse recurso é útil em vários cenários, como desabilitar uma funcionalidade em que uma ameaça à segurança foi descoberta, habilitar uma funcionalidade sazonal somente quando necessário e habilitar um conjunto de transações exatamente na data de lançamento.

Em um cenário de emergência, quando um exploit crítico é descoberto, este módulo permite que a rede isole e pare apenas a funcionalidade afetada, minimizando efetivamente o impacto geral.

!!! atenção
    No momento em que este artigo foi escrito, este módulo ainda não foi auditado; portanto, não é recomendado para uso em produção.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para os exemplos deste guia, você precisará ter o seguinte:

- Uma rede alimentada por Tanssi (Quick Trial ou Dedicada) com o módulo Pausa de Transação. Qualquer nova implantação de rede baseada em um dos modelos servirá; caso contrário, certifique-se de [incluir o módulo](/pt/builders/build/customize/adding-built-in-module/){target=\_blank} em seu runtime de rede personalizado
- A conta Sudo da sua rede conectada aos seus Polkadot.js Apps da rede. Você pode consultar o guia [Managing Sudo](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank} para obter instruções sobre como injetar sua conta Sudo no Polkadot.js Apps

--8<-- 'text/pt/builders/manage/locate-sudo-account.md'

## Nomes de Módulo e Transação {: #modules-transaction-names }

O [módulo Pausa de Transação](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/tx-pause/src/lib.rs){target=\_blank} funciona filtrando a execução de transações específicas contidas nos módulos incluídos no tempo de execução da rede. Para fazer isso, ele mantém uma lista interna das transações banidas, identificadas por nome de módulo e transação. Esta lista diferencia maiúsculas de minúsculas e só funciona quando há uma correspondência exata entre um item na lista de transações pausadas e a transação que está sendo processada. Portanto, o uso dos nomes exatos dos módulos e das transações é crucial.

Para descobrir os nomes dos módulos disponíveis em seu tempo de execução, você precisa ler a seção `construct_runtime!()` no arquivo `lib.rs` do seu tempo de execução de rede no repositório do seu projeto. Se sua rede for baseada em um dos modelos oficiais, você encontrará o arquivo no [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank}:

- Para redes baseadas no modelo EVM: [o arquivo lib.rs](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/frontier/src/lib.rs){target=\_blank}
- Para redes baseadas no modelo Substrate: [o arquivo lib.rs](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/simple/src/lib.rs){target=\_blank}

O snippet a seguir é um exemplo de como a seção `construct_runtime!()` se parece. Os nomes dos módulos são os localizados à esquerda dos dois pontos.

```rust
    pub enum Runtime
    {
        ...
        Migrations: pallet_migrations = 7,
        MaintenanceMode: pallet_maintenance_mode = 8,
        TxPause: pallet_tx_pause = 9,
        Balances: pallet_balances = 10,
        Multisig: pallet_multisig = 16,      
        ...
   }
```

Para identificar os nomes das transações incluídas em um módulo, você precisa consultar seu código-fonte. Os módulos integrados no [Substrate](/pt/learn/framework/overview/#substrate-framework){target=\_blank} identificam suas transações usando uma macro `#[pallet::call_index(INDEX)]`, onde `INDEX` é um número. No caso de um [módulo embutido](/pt/builders/build/customize/adding-built-in-module/){target=\_blank}, o código está localizado na [pasta FRAME](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame){target=\_blank} do repositório Polkadot-SDK. Por exemplo, se você quiser saber sobre os nomes das transações no módulo `Balances`, consulte seu arquivo [lib.rs](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/balances/src/lib.rs){target=\_blank} e procure os nomes das funções abaixo das macros `#[pallet::call_index(INDEX)]`. O snippet a seguir é a transação `transfer_allow_death` do módulo `Balances`, que é o usado como exemplo neste guia:

```rust
pub fn transfer_allow_death(
    origin: OriginFor<T>,
    dest: AccountIdLookupOf<T>,
    #[pallet::compact] value: T::Balance,
) -> DispatchResult {
    // Code
    Ok(())
}
```

### Alguns Módulos e Transações Usados com Frequência {: #frequently-used-modules-transactions }

Ao usar qualquer um dos módulos Substrate embutidos, o nome com o qual ele é referenciado no tempo de execução é totalmente de responsabilidade do desenvolvedor, mas os nomes das transações não são personalizáveis. Aqui está uma lista de alguns dos módulos mais comumente usados com as transações mais comumente usadas que eles contêm. Esses são os nomes das transações a serem usados neste módulo Pausa de Transação.

??? function "[**pallet-ethereum**](https://github.com/polkadot-evm/frontier/blob/master/frame/ethereum/src/lib.rs){target=\_blank} — Este módulo, junto com o módulo EVM, fornece compatibilidade total com o Ethereum para a rede"

    ```
    | Nome da Transação |        Descrição        |
    |:----------------:|:-------------------------:|
    |    `transact`    | Executa uma chamada Ethereum |
    ```

??? function "[**pallet_balances**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/balances/src/lib.rs){target=\_blank} — Este módulo fornece funcionalidade para lidar com contas e saldos para a moeda nativa da rede"

    ```
    |    Nome da Transação    |                                                                 Descrição                                                                  |
    |:----------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
    | `transfer_allow_death` |      Executa uma transferência de saldo, excluindo a conta do remetente quando seu saldo final fica abaixo do requisito mínimo de existência      |
    | `transfer_keep_alive`  | Executa uma transferência de saldo, mantendo a conta do remetente ativa mesmo quando seu saldo final fica abaixo do requisito mínimo de existência |
    |     `transfer_all`     |                                              Transfere todos os saldos não bloqueados para um destino                                               |
    |         `burn`         |                                     Queima o saldo da conta de origem, reduzindo a emissão total                                     |
    ```

??? function "[**pallet_assets**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/assets/src/lib.rs){target=\_blank} — Este módulo fornece funcionalidade para lidar com tokens fungíveis"

    ```
    |   Nome da Transação    |                                                                Descrição                                                                 |
    |:---------------------:|:------------------------------------------------------------------------------------------------------------------------------------------:|
    |       `create`        |                                                   Emite uma nova classe de ativos fungíveis                                                    |
    |    `start_destroy`    |                                          Inicia o processo de destruição de uma classe de ativos fungíveis                                           |
    |  `destroy_accounts`   |                       Destrói todas as contas associadas a um determinado ativo para as quais o processo de destruição foi iniciado                        |
    |  `destroy_approvals`  |                       Destrói todas as aprovações associadas a um determinado ativo para o qual o processo de destruição foi iniciado                       |
    |   `finish_destroy`    |                          Conclui o processo de destruição de um determinado ativo para o qual o processo de destruição foi iniciado                          |
    |        `mint`         |                                                                Cria ativos                                                                |
    |        `burn`         |                                                                Queima ativos                                                                |
    |      `transfer`       |      Executa uma transferência de ativos excluindo a conta do remetente quando seu saldo final fica abaixo do requisito mínimo de existência      |
    | `transfer_keep_alive` | Executa uma transferência de ativos mantendo a conta do remetente ativa mesmo quando seu saldo final fica abaixo do requisito mínimo de existência |
    |       `freeze`        |                                          Não permite transferências de um ativo de uma conta específica                                           |
    |        `thaw`         |                                         Permite novamente transferências de um ativo de uma conta específica                                         |
    |    `freeze_asset`     |                                                      Não permite transferências de um ativo                                                       |
    |     `thaw_asset`      |                                                     Permite novamente transferências de um ativo                                                     |
    |    `set_metadata`     |                                                       Define os metadados para um ativo                                                       |
    |   `clear_metadata`    |                                                      Limpa os metadados para um ativo                                                      |
    ```

??? function "[**pallet_nfts**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/nfts/src/lib.rs){target=\_blank} — Este módulo fornece funções para lidar com tokens não fungíveis"

    ```
    |      Nome da Transação       |                        Descrição                         |
    |:---------------------------:|:----------------------------------------------------------:|
    |          `create`           |       Emite uma nova coleção de itens não fungíveis        |
    |          `destroy`          |        Destrói uma coleção de itens não fungíveis         |
    |           `mint`            |            Cria um item em uma coleção NFT              |
    |           `burn`            |          Destrói um item de uma coleção NFT           |
    |         `transfer`          |                      Transfere um NFT                      |
    |    `lock_item_transfer`     |              Não permite a transferência de um item              |
    |   `unlock_item_transfer`    |         Permite novamente a transferência de um item bloqueado         |
    |       `set_attribute`       |     Define um atributo para uma coleção NFT ou um item     |
    |      `clear_attribute`      |    Limpa um atributo para uma coleção NFT ou um item    |
    |       `set_metadata`        |               Define os metadados para um item                |
    |      `clear_metadata`       |              Limpa os metadados para um item               |
    |  `set_collection_metadata`  |  Define os metadados para uma coleção de itens não fungíveis  |
    | `clear_collection_metadata` | Limpa os metadados para uma coleção de itens não fungíveis |
    |         `set_price`         |                 Define o preço de um item                 |
    |         `buy_item`          |        Compre um item, desde que esteja à venda         |
    ```

??? function "[**pallet_multisig**](https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/multisig/src/lib.rs){target=\_blank} — Este módulo fornece funções para lidar com esquemas de múltiplas assinaturas"

    ```
    |    Nome da Transação    |                                                                 Descrição                                                                  |
    |:----------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
    | `as_multi_threshold_1` |                                           Registra uma chamada de múltiplas assinaturas com uma única aprovação                                            |
    |       `as_multi`       | Registra uma chamada de múltiplas assinaturas a ser feita de uma conta composta, se aprovada pelo limite mínimo especificado dos outros signatários |
    |   `approve_as_multi`   |              Registra a aprovação de uma chamada de múltiplas assinaturas e despacha a chamada quando o limite de signatários é atingido              |
    |   `cancel_as_multi`    |                                         Cancela uma transação de múltiplas assinaturas pré-existente e em andamento                                          |
    ```

## Pausando Transações {: #pausing-transactions }

Como você sabe, a conta Sudo [pode executar ações privilegiadas](/pt/builders/manage/developer-portal/sudo/){target=\_blank}, como atualizações de rede, criação de novos tokens e, neste caso, pausar e despausar transações.

Para pausar uma transação, navegue até a guia **Desenvolvedor** do Polkadot.js Apps para sua rede alimentada por Tanssi e clique em **Sudo**. Se você não vir **Sudo** neste menu, não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que sua [conta Sudo seja injetada por sua carteira e conectada aos Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Em seguida, siga as seguintes etapas:

1. Selecione o módulo **txPause**
2. Selecione o método **pause**
3. Insira o nome do **módulo** que contém a transação que será pausada
4. Insira o nome da **transação** que será pausada
5. Pressione **Submit Sudo** e confirme a transação no pop-up resultante

Neste exemplo, a transação pausada é `transfer_allow_death` do módulo `Balances`:

![Pause transaction](/images/builders/manage/developer-portal/pause-transactions/pause-transactions-2.webp)

Para verificar se a transação foi efetivamente pausada, tente executá-la. Você deve obter um erro.

![Check that the transaction is paused](/images/builders/manage/developer-portal/pause-transactions/pause-transactions-3.webp)

!!! atenção
    A transação `pause` não verifica os nomes dos módulos ou transações e diferencia maiúsculas de minúsculas, portanto, qualquer erro de digitação passará despercebido e a transação será executada com sucesso. Você sempre deve verificar se a transação foi efetivamente pausada.

## Despausando Transações {: #unpausing-transactions }

Para despausar uma transação e retorná-la à operação normal, navegue até a guia **Desenvolvedor** do Polkadot.js Apps para sua rede alimentada por Tanssi e clique em **Sudo**. Se você não vir **Sudo** neste menu, você não associou a conta Sudo aos Polkadot.js Apps. Certifique-se de que sua [conta Sudo seja injetada por sua carteira e conectada aos Polkadot.js Apps](/pt/builders/manage/developer-portal/sudo/#configuring-polkadotjs-apps){target=\_blank}. Em seguida, siga as seguintes etapas:

1. Selecione o módulo **txPause**
2. Selecione o método **unpause**
3. Insira o nome do **módulo** que contém a transação que será despausada
4. Insira o nome da **transação** que será despausada
5. Pressione **Submit Sudo** e confirme a transação no pop-up resultante

Neste exemplo, a transação a ser despausada é `transfer_allow_death` do módulo `Balances`:

![Unpause transaction](/images/builders/manage/developer-portal/pause-transactions/pause-transactions-4.webp)

A transação `unpause` é executada com sucesso somente se os parâmetros do módulo e da transação tiverem sido pausados ​​anteriormente; caso contrário, ela falha. Após o despausamento bem-sucedido, a transação pode ser chamada e executada novamente.

E é isso! A seção [Portal do Desenvolvedor](/pt/builders/manage/developer-portal/) tem muitos mais guias sobre como gerenciar sua rede Tanssi.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
