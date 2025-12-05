---
title: Adicionar um módulo personalizado
description: Descubra como incorporar módulos feitos sob medida para adicionar recursos únicos ou especializados à sua rede que vão além das capacidades dos módulos embutidos.
icon: octicons-terminal-24
categories: Custom-Runtime
---
  
# Adicionar um módulo personalizado {: #adding-custom-made-module }
  
## Introdução {:  #introduction }
  
Ao fornecer uma biblioteca abrangente de módulos pré-construídos que abordam muitos requisitos comuns, a estrutura simplifica enormemente o processo de construção de um blockchain e acelera a implantação e evolução em uma rede com tecnologia Tanssi. No entanto, abordar um caso de uso inovador geralmente exige um esforço de desenvolvimento para atender totalmente aos requisitos e, no Substrate, adicionar lógica personalizada se traduz em escrever e integrar módulos de tempo de execução.
  
O exemplo apresentado no artigo [Modularidade](/pt/learn/framework/modules/#custom-module-example){target=\_blank} mostra um módulo de loteria simples que expõe duas transações:
  
- **Buy tickets** - esta função gerencia a entrada de um usuário na loteria. Essencialmente, ela verifica se o participante tem saldo suficiente, não está participando e cuida da transferência de fundos para registrar o usuário na loteria
- **Award prize** - esta função que lida com um usuário que entra na loteria. Em alto nível, ela busca um número pseudo-aleatório para obter um vencedor e lida com a distribuição do prêmio
  
A implementação dessas transações também usa armazenamento, emite eventos, define erros personalizados e depende de outros módulos para lidar com a moeda (para cobrar pelos bilhetes e transferir o valor total para o vencedor) e aleatorizar a seleção do vencedor.
  
Neste artigo, as seguintes etapas, necessárias para construir e adicionar o módulo de exemplo ao tempo de execução, serão abordadas:

1. Criar os arquivos do módulo de loteria (pacote).
2. Configurar as dependências do módulo.
3. Adicionar lógica personalizada.
4. Configurar o tempo de execução com o novo módulo.

--8<-- 'text/pt/_common/not-for-production-code-guard.md'

## Verificando Pré-requisitos {: #checking-prerequisites }

Para seguir as etapas deste guia, você precisará ter o seguinte:

- Clonar o [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank} do Github
- Compilador Rust e gerenciador de pacotes Cargo

Você pode ler mais sobre como instalar o Rust e o Cargo no artigo de [pré-requisitos](/pt/builders/build/customize/prerequisites/#installing-rust){target=\_blank}.

## Criando os arquivos do módulo de loteria {: #creating-lottery-module-files }

Antes de iniciar seu processo de codificação, é essencial criar os arquivos que contêm sua lógica. Os módulos Substrate são abstratos e destinados ao reaproveitamento em diferentes tempos de execução com várias personalizações. Para conseguir isso, você usará o Cargo, o gerenciador de pacotes do Rust, para criar o módulo como um novo pacote.

Como mencionado na seção de pré-requisitos, a primeira etapa é clonar o [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\_blank} e, na pasta raiz, navegar até `pallets`, onde o módulo será criado.


```bash
cd container-chains/pallets
```

Em seguida, crie o pacote do módulo com o Cargo:

```bash
cargo new lottery-example
```

Por padrão, o Cargo cria o novo pacote em uma pasta com o nome fornecido (`lottery-example`, neste caso), contendo um arquivo de manifesto, `Cargo.toml` e uma pasta `src` com um arquivo `main.rs`. Para respeitar a convenção de nomenclatura usada no Substrate, o arquivo `main.rs` é renomeado para `lib.rs`:

```bash
mv lottery-example/src/main.rs lottery-example/src/lib.rs
```

Depois de executar todos os comandos, o módulo é criado e está pronto para conter a lógica personalizada que você adicionará nas seções a seguir.

## Configurar as dependências do módulo {: #configure-module-dependencies}

Como o módulo funciona como um pacote independente, ele tem seu próprio arquivo Cargo.toml, onde você deve especificar os atributos e dependências do módulo.

Por exemplo, você pode usar atributos para especificar detalhes como o nome do módulo, versão, autores e outras informações relevantes. Por exemplo, no módulo `lottery-example`, o arquivo `Cargo.toml` pode ser configurado da seguinte forma:

```toml
#[pallet::storage]
#[pallet::getter(fn get_participants)]
pub(super) type Participants<T: Config> = StorageValue<
    _,
    BoundedVec<T::AccountId, T::MaxParticipants>,
    OptionQuery
>;
```

Este arquivo também define as dependências do módulo, como a funcionalidade principal que permite a integração perfeita com o tempo de execução e outros módulos, acesso ao armazenamento, emissão de eventos e muito mais.

O exemplo completo do arquivo `Cargo.toml` define, além dos atributos, as dependências exigidas pelo Substrate:

??? code "Ver o arquivo Cargo.toml completo"

    ```rust   
    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-cargo.toml'
    ```

## Adicionando lógica personalizada {: #adding-custom-logic}

Conforme apresentado na seção [módulo personalizado](/pt/learn/framework/modules/#custom-modules){target=\_blank} do artigo sobre modularidade, a criação de um módulo envolve a implementação das seguintes macros de atributo, das quais as três primeiras são obrigatórias:

--8<-- 'text/pt/builders/build/customize/custom-made-module/pallets-macros-descriptions.md'

### Implementando a estrutura básica do módulo {: #implementing-basic-structure }

As duas primeiras macros obrigatórias, `#[frame_support::pallet]` e `#[pallet::pallet]`, fornecem a estrutura básica do módulo e são necessárias para habilitar o módulo a ser usado em um tempo de execução Substrate.

A seguir, é apresentada a estrutura geral de um módulo Substrate personalizado.

```rust
#[frame_support::pallet(dev_mode)]
pub mod pallet {
    ...
    #[pallet::pallet]
    pub struct Pallet<T>(_); 

       // Toda a lógica vai aqui
}
```

A próxima etapa seria adicionar a terceira macro obrigatória (`#[pallet::config]`) e toda a lógica personalizada, conforme mostrado nas seções a seguir.

### Implementando a configuração do módulo {: #implementing-module-configuration }

Para tornar os módulos altamente adaptáveis, sua configuração é abstrata o suficiente para permitir que sejam adaptados aos requisitos específicos do caso de uso que o tempo de execução implementa.

A implementação da macro `#[pallet::config]` é obrigatória e define a dependência do módulo em outros módulos e os tipos e valores especificados pelas configurações específicas do tempo de execução.

No módulo `lottery-example` personalizado que você está construindo, o módulo depende de outros módulos para gerenciar a moeda e a função aleatória para selecionar o vencedor. O módulo também lê e usa o preço do bilhete e o número máximo de participantes diretamente das configurações do tempo de execução. Consequentemente, a configuração precisa incluir essas dependências:

- **Events** - o módulo depende da definição de um evento do tempo de execução para poder emiti-los
- **Currency** - o módulo `lottery-example` precisa poder transferir fundos, portanto, precisa da definição do sistema monetário do tempo de execução
- **Randomness** - este módulo é usado para selecionar de forma justa o vencedor do prêmio da lista de participantes. Ele gera os números aleatórios usando os hashes de bloco anteriores e o número do bloco atual como semente
- **Ticket coste** - o preço a ser cobrado dos compradores que participam da loteria
- **Maximum number of participants** - o limite máximo de participantes permitido em cada rodada da loteria
- **Module Id** - o identificador exclusivo do módulo é necessário para acessar a conta do módulo para manter os fundos dos participantes até serem transferidos para o vencedor

A implementação da configuração descrita para este exemplo é mostrada no seguinte trecho de código:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {

    // Definição do evento
    type RuntimeEvent: From<Event<Self>>
        + IsType<<Self as frame_system::Config>::RuntimeEvent>;
               
    // Moeda
    type Currency: Currency<Self::AccountId>;
                
    // Aleatoriedade
    type MyRandomness: Randomness<Self::Hash, BlockNumberFor<Self>>;
    
    // Custo do bilhete
    #[pallet::constant]
    type TicketCost: Get<BalanceOf<Self>>;
    
    // Número máximo de participantes
    #[pallet::constant]
    type MaxParticipants: Get<u32>;
    
    // ID do módulo
    #[pallet::constant]
    type PalletId: Get<PalletId>;
}
```

Esta definição abstrata de dependências é crucial para evitar o acoplamento a um caso de uso específico e para permitir que os módulos sirvam como blocos de construção básicos para as redes Substrate.

### Implementando Transações {: #implementing-transactions }

Chamadas representam o comportamento que um tempo de execução expõe na forma de transações que podem ser despachadas para processamento, expondo a lógica personalizada adicionada ao módulo.

Cada chamada está incluída na macro `#[pallet::call]` e apresenta os seguintes elementos:

- **Call Index** - é um identificador exclusivo obrigatório para cada chamada despachável
- **Weight** - é uma medida do esforço computacional que uma extrínseca leva ao ser processada. Mais sobre pesos está na [documentação do Polkadot](https://docs.polkadot.com/polkadot-protocol/parachain-basics/blocks-transactions-fees/fees/#how-fees-are-calculated){target=\_blank}
- **Origin** - identifica a conta de assinatura que está fazendo a chamada
- **Result** - o valor de retorno da chamada, que pode ser um `Erro` se alguma coisa der errado

A seguinte trecho apresenta a estrutura geral da implementação da macro mencionada e os elementos de chamada:

```rust
#[pallet::call]
impl<T: Config> Pallet<T> {

    #[pallet::call_index(0)]
    #[pallet::weight(0)]
    pub fn one_call(origin: OriginFor<T>) -> DispatchResult { }
            
    #[pallet::call_index(1)]
    #[pallet::weight(0)]
    pub fn another_call(origin: OriginFor<T>) -> DispatchResult { }
                        
    // Outras chamadas
}
```

Neste módulo `lottery-example`, definimos duas chamadas com a seguinte lógica:
                            
```rust
#[pallet::call]
impl<T: Config> Pallet<T> {

    #[pallet::call_index(0)]    
    #[pallet::weight(0)]
    pub fn buy_ticket(origin: OriginFor<T>) -> DispatchResult {
        
        // 1. Valida a assinatura de origem
        // 2. Verifica se o usuário tem saldo suficiente para pagar o preço do bilhete
        // 3. Verifica se o usuário já não está participando
        // 4. Adiciona o usuário como um novo participante do prêmio
        // 5. Transfere o custo do bilhete para a conta do módulo, para ser mantido até ser transferido para o vencedor
        // 6. Notifica o evento
    }
                                                            
    #[pallet::call_index(1)]
    #[pallet::weight(0)]
    pub fn award_prize(origin: OriginFor<T>) -> DispatchResult {
        // 1. Valida a assinatura de origem
        // 2. Obtém um número aleatório do módulo de aleatoriedade
        // 3. Seleciona o vencedor da lista de participantes
        // 4. Transfere o prêmio total para a conta do vencedor
        // 5. Redefine a lista de participantes e prepara-se para outra rodada da loteria
    }
}
```
        
Essas chamadas também emitem eventos para manter o usuário informado e podem retornar erros caso alguma das validações dê errado.
        
Aqui está a implementação completa das chamadas com a lógica da loteria personalizada:
        
??? code "Ver o código de chamadas completo"
        
    ```rust
    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-calls.rs'
    ```
                    
### Implementando erros personalizados {: #implementing-custom-errors}

A macro `#[pallet::error]` é usada para anotar uma enumeração de erros potenciais que poderiam ocorrer durante a execução. É crucial para a segurança garantir que todas as situações de erro sejam tratadas com elegância, sem causar a falha do tempo de execução.

O exemplo a seguir desta implementação de macro mostra os erros que podem ocorrer no módulo da loteria:

```rust
// Erros informam aos usuários que algo deu errado.
#[pallet::error]
pub enum `Error`<T> {
    NotEnoughCurrency,
    AccountAlreadyParticipating,
    CanNotAddParticipant,
}
```

### Implementando eventos {: #implementing-events }

A macro `#[pallet::event]` é aplicada a uma enumeração de eventos para informar o usuário sobre quaisquer alterações no estado ou ações importantes que ocorreram durante a execução no tempo de execução.

Como exemplo, para o módulo `lottery-example`, esta macro pode ser configurada com os seguintes eventos:

```rust
#[pallet::event]
#[pallet::generate_deposit(pub(super) fn deposit_event)]
pub enum Event<T: Config> {

    // Evento emitido quando um bilhete é comprado
    TicketBought { who: T::AccountId },
    // Evento emitido quando o prêmio é concedido
    PrizeAwarded { winner: T::AccountId },
    // Evento emitido quando não há participantes  
    ThereAreNoParticipants,
    }
```
    
### Implementando o armazenamento para persistência de estado {: #implementing-storage }

A macro `#[pallet::storage]` inicializa uma estrutura de armazenamento de tempo de execução. No ambiente altamente restrito de blockchains, decidir o que armazenar e qual estrutura usar pode ser fundamental em termos de desempenho. Mais sobre esse tópico é abordado na [documentação Substrate](https:/docs.polkadot.com/develop/parachains/customize-parachain/make-custom-pallet/#pallet-storage){target=\_blank}.

Neste exemplo, o módulo `lottery-example` precisa de uma estrutura de armazenamento de valor básica para persistir a lista de participantes em um vetor de capacidade limitada ([BoundedVec](https:/crates.parity.io/frame_support/storage/bounded_vec/struct.BoundedVec.html){target=\_blank}). Isso pode ser inicializado da seguinte forma:

```rust
#[pallet::storage]
#[pallet::getter(fn get_participants)]
pub(super) type Participants<T: Config> = StorageValue<
    _,
    BoundedVec<T::AccountId, T::MaxParticipants>,
    OptionQuery
>;
```

### O módulo completo {: #complete-module }

Para juntar todas as peças, após implementar todas as macros necessárias e adicionar a lógica personalizada, o módulo agora está completo e pronto para ser usado no tempo de execução.

??? code "Ver o arquivo do módulo completo"
    
    ```rust    
    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example.rs'
    ```
    
## Configurar o tempo de execução {: #configure-runtime }

Finalmente, com o módulo finalizado, ele pode ser incluído no tempo de execução. Ao fazer isso, as transações `buy_tickets` e `award_prize` serão chamáveis pelos usuários. Isso também significa que a [API Polkadot.js](pt/builders/toolkit/substrate-api/libraries/polkadot-js-api/){target=\_blank} será decorada com este módulo e todas as chamadas disponíveis que ele contém.\n\nPara configurar o tempo de execução, abra o arquivo `lib.rs`, que contém a definição para o tempo de execução do modelo incluído e está localizado (no caso de usar o compatível com EVM) na pasta:

```text
*/container-chains/templates/frontier/runtime/src/
```

Para adicionar o módulo da loteria, configure os módulos da seguinte forma:

```rust

// Adicione a configuração para o módulo de aleatoriedade. Nenhum parâmetro necessário.
impl pallet_insecure_randomness_collective_flip::Config for Runtime {
}

// // ID de módulo personalizado
 parameter_types! {
    pub const PalletId: PalletId = PalletId(*b"loex5678");
}

// Adicione a configuração para o módulo da loteria
impl pallet_lottery_example::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;
    type Currency = Balances;
    type TicketCost = ConstU128<1000000000000000>;
    type PalletId = PalletId;
    type MaxParticipants = ConstU32<500>;
    type MyRandomness = RandomCollectiveFlip;
    }
```
Com os módulos configurados, adicione a macro `construct_runtime!` (que define os módulos que serão incluídos ao construir o tempo de execução) e os módulos de aleatoriedade e loteria.
    
    
```rust
construct_runtime!(
    pub struct Runtime {
        ...
        // Inclua a lógica personalizada do pallet-template no tempo de execução.
        RandomCollectiveFlip: pallet_insecure_randomness_collective_flip,
        Lottery: pallet_lottery_example,
        ...
}
)
```

Com tudo definido, a rede agora tem suporte para uma implementação básica de uma loteria.
    
--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'

