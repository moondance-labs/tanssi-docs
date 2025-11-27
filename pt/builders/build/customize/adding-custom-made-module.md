---
title: Adding a Custom-Made Module
description: Discover how to incorporate custom-made modules to add unique or specialized features to your network that go beyond the capabilities of the built-in modules.
icon: octicons-terminal-24
categories: Custom-Runtime
---

````json
{
  "source_path": "builders/build/customize/adding-custom-made-module.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "b8b11c3fb6c5d536ea52e09ce28d72f8d98fce0247da77e09369026089079f82",
  "content": "--- \ntitle: Adding a Custom-Made Module\ndescription: Discover how to incorporate custom-made modules to add unique or specialized features to your network that go beyond the capabilities of the built-in modules.\nicon: octicons-terminal-24\ncategories: Custom-Runtime\n---\n\n# Adding a Custom-Made Module {: #adding-custom-made-module }\n\n## Introduction {: #introduction }\n\nAo fornecer uma biblioteca abrangente de módulos pré-construídos que abordam muitos requisitos comuns, a estrutura simplifica enormemente o processo de construção de um blockchain e acelera a implantação e evolução em uma rede com tecnologia Tanssi. No entanto, abordar um caso de uso inovador geralmente exige um esforço de desenvolvimento para atender totalmente aos requisitos e, no Substrate, adicionar lógica personalizada se traduz em escrever e integrar módulos de tempo de execução.\n\nO exemplo apresentado no artigo [Modularidade](/learn/framework/modules/#custom-module-example){target=\\_blank} mostra um módulo de loteria simples que expõe duas transações:\n\n- **Comprar bilhetes** - esta função gerencia a entrada de um usuário na loteria. Essencialmente, ela verifica se o participante tem saldo suficiente, não está participando e cuida da transferência de fundos para registrar o usuário na loteria\n- **Prêmio de atribuição** - esta função que lida com um usuário que entra na loteria. Em alto nível, ela busca um número pseudo-aleatório para obter um vencedor e lida com a distribuição do prêmio\n\nA implementação dessas transações também usa armazenamento, emite eventos, define erros personalizados e depende de outros módulos para lidar com a moeda (para cobrar pelos bilhetes e transferir o valor total para o vencedor) e aleatorizar a seleção do vencedor.\n\nNeste artigo, as seguintes etapas, necessárias para construir e adicionar o módulo de exemplo ao tempo de execução, serão abordadas:\n\n1. Criar os arquivos do módulo de loteria (pacote).\n2. Configurar as dependências do módulo.\n3. Adicionar lógica personalizada.\n4. Configurar o tempo de execução com o novo módulo.\n\n--8<-- 'text/_common/not-for-production-code-guard.md'\n\n## Checking Prerequisites {: #checking-prerequisites }\n\nPara seguir as etapas deste guia, você precisará ter o seguinte:\n\n- Clonar o [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\\_blank} do Github\n- Compilador Rust e gerenciador de pacotes Cargo\n\nV ocê pode ler mais sobre como instalar o Rust e o Cargo no artigo de [pré-requisitos](/builders/build/customize/prerequisites/#installing-rust){target=\\_blank}.\n\n## Criando os arquivos do módulo de loteria {: #creating-lottery-module-files }\n\nAntes de iniciar seu processo de codificação, é essencial criar os arquivos que contêm sua lógica. Os módulos Substrate são abstratos e destinados ao reaproveitamento em diferentes tempos de execução com várias personalizações. Para conseguir isso, você usará o Cargo, o gerenciador de pacotes do Rust, para criar o módulo como um novo pacote.\n\nComo mencionado na seção de pré-requisitos, a primeira etapa é clonar o [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\\_blank} e, na pasta raiz, navegar até `pallets`, onde o módulo será criado.\n\n```bash\ncd container-chains/pallets\n```\n\nEm seguida, crie o pacote do módulo com o Cargo:\n\n```bash\ncargo new lottery-example\n```\n\nPor padrão, o Cargo cria o novo pacote em uma pasta com o nome fornecido (`lottery-example`, neste caso), contendo um arquivo de manifesto, `Cargo.toml` e uma pasta `src` com um arquivo `main.rs`. Para respeitar a convenção de nomenclatura usada no Substrate, o arquivo `main.rs` é renomeado para `lib.rs`:\n\n```bash\nmv lottery-example/src/main.rs lottery-example/src/lib.rs\n```\n\nDepois de executar todos os comandos, o módulo é criado e está pronto para conter a lógica personalizada que você adicionará nas seções a seguir.\n\n## Configurar as dependências do módulo {: #configure-module-dependencies}\n\nComo o módulo funciona como um pacote independente, ele tem seu próprio arquivo Cargo.toml, onde você deve especificar os atributos e dependências do módulo.\n\nPor exemplo, você pode usar atributos para especificar detalhes como o nome do módulo, versão, autores e outras informações relevantes. Por exemplo, no módulo `lottery-example`, o arquivo `Cargo.toml` pode ser configurado da seguinte forma:\n\n```toml\n[package]\nname = \"module-lottery-example\"\nversion = \"4.0.0-dev\"\ndescription = \"Simple module example\"\nauthors = [\"\"]\nhomepage = \"\"\n...\n```\n\nEste arquivo também define as dependências do módulo, como a funcionalidade principal que permite a integração perfeita com o tempo de execução e outros módulos, acesso ao armazenamento, emissão de eventos e muito mais.\n\nO exemplo completo do arquivo `Cargo.toml` define, além dos atributos, as dependências exigidas pelo Substrate:\n\n??? code \"Ver o arquivo Cargo.toml completo\"\n\n    ```rust\n    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-cargo.toml'\n    ```\n\n## Adicionando lógica personalizada {: #adding-custom-logic}\n\nConforme apresentado na seção [módulo personalizado](/learn/framework/modules/#custom-modules){target=\\_blank} do artigo sobre modularidade, a criação de um módulo envolve a implementação das seguintes macros de atributo, das quais as três primeiras são obrigatórias:\n\n--8<-- 'text/builders/build/customize/custom-made-module/pallets-macros-descriptions.md'\n\n### Implementando a estrutura básica do módulo {: #implementing-basic-structure }\n\nAs duas primeiras macros obrigatórias, `#[frame_support::pallet]` e `#[pallet::pallet]`, fornecem a estrutura básica do módulo e são necessárias para habilitar o módulo a ser usado em um tempo de execução Substrate.\n\nA seguir, é apresentada a estrutura geral de um módulo Substrate personalizado.\n\n```rust\n#[frame_support::pallet(dev_mode)]\npub mod pallet {\n    ...\n    #[pallet::pallet]\n    pub struct Pallet<T>(_);\n    \n    // Toda a lógica vai aqui\n}\n```\nA próxima etapa seria adicionar a terceira macro obrigatória (`#[pallet::config]`) e toda a lógica personalizada, conforme mostrado nas seções a seguir.\n\n### Implementando a configuração do módulo {: #implementing-module-configuration }\n\nPara tornar os módulos altamente adaptáveis, sua configuração é abstrata o suficiente para permitir que sejam adaptados aos requisitos específicos do caso de uso que o tempo de execução implementa.\n\nA implementação da macro `#[pallet::config]` é obrigatória e define a dependência do módulo em outros módulos e os tipos e valores especificados pelas configurações específicas do tempo de execução.\n\nNo módulo `lottery-example` personalizado que você está construindo, o módulo depende de outros módulos para gerenciar a moeda e a função aleatória para selecionar o vencedor. O módulo também lê e usa o preço do bilhete e o número máximo de participantes diretamente das configurações do tempo de execução. Consequentemente, a configuração precisa incluir essas dependências:\n\n- **Eventos** - o módulo depende da definição de um evento do tempo de execução para poder emiti-los\n- **Moeda** - o módulo `lottery-example` precisa poder transferir fundos, portanto, precisa da definição do sistema monetário do tempo de execução\n- **Aleatoriedade** - este módulo é usado para selecionar de forma justa o vencedor do prêmio da lista de participantes. Ele gera os números aleatórios usando os hashes de bloco anteriores e o número do bloco atual como semente\n- **Custo do bilhete** - o preço a ser cobrado dos compradores que participam da loteria\n- **Número máximo de participantes** - o limite máximo de participantes permitido em cada rodada da loteria\n- **ID do módulo** - o identificador exclusivo do módulo é necessário para acessar a conta do módulo para manter os fundos dos participantes até serem transferidos para o vencedor\n\nA implementação da configuração descrita para este exemplo é mostrada no seguinte trecho de código:\n\n```rust\n#[pallet::config]\npub trait Config: frame_system::Config {\n\n    // Definição do evento\n    type RuntimeEvent: From<Event<Self>> \n        + IsType<<Self as frame_system::Config>::RuntimeEvent>;\n\n    // Moeda\n    type Currency: Currency<Self::AccountId>;\n\n    // Aleatoriedade\n    type MyRandomness: Randomness<Self::Hash, BlockNumberFor<Self>>;\n\n    // Custo do bilhete\n    #[pallet::constant]\n    type TicketCost: Get<BalanceOf<Self>>;\n\n    // Número máximo de participantes\n    #[pallet::constant]\n    type MaxParticipants: Get<u32>;\n\n    // ID do módulo\n    #[pallet::constant]\n    type PalletId: Get<PalletId>;\n}\n```\n\nEsta definição abstrata de dependências é crucial para evitar o acoplamento a um caso de uso específico e para permitir que os módulos sirvam como blocos de construção básicos para as redes Substrate.\n\n### Implementando Transações {: #implementing-transactions }\n\nChamadas representam o comportamento que um tempo de execução expõe na forma de transações que podem ser despachadas para processamento, expondo a lógica personalizada adicionada ao módulo.\n\nCada chamada está incluída na macro `#[pallet::call]` e apresenta os seguintes elementos:\n\n- **Índice de chamada** - é um identificador exclusivo obrigatório para cada chamada despachável\n- **Peso** - é uma medida do esforço computacional que uma extrínseca leva ao ser processada. Mais sobre pesos está na [documentação do Polkadot](https://docs.polkadot.com/polkadot-protocol/parachain-basics/blocks-transactions-fees/fees/#how-fees-are-calculated){target=\\_blank}\n- **Origem** - identifica a conta de assinatura que está fazendo a chamada\n- **Resultado** - o valor de retorno da chamada, que pode ser um `Erro` se alguma coisa der errado\n\nA seguinte trecho apresenta a estrutura geral da implementação da macro mencionada e os elementos de chamada:\n\n```rust\n#[pallet::call]\nimpl<T: Config> Pallet<T> {\n    \n    #[pallet::call_index(0)]\n    #[pallet::weight(0)]\n    pub fn one_call(origin: OriginFor<T>) -> DispatchResult { }\n\n    #[pallet::call_index(1)]\n    #[pallet::weight(0)]\n    pub fn another_call(origin: OriginFor<T>) -> DispatchResult { }\n\n    // Outras chamadas\n}\n```\n\nNeste módulo `lottery-example`, definimos duas chamadas com a seguinte lógica:\n\n```rust\n#[pallet::call]\nimpl<T: Config> Pallet<T> {\n    \n    #[pallet::call_index(0)]\n    #[pallet::weight(0)]\n    pub fn buy_ticket(origin: OriginFor<T>) -> DispatchResult {\n\n        // 1. Valida a assinatura de origem\n        // 2. Verifica se o usuário tem saldo suficiente para pagar o preço do bilhete\n        // 3. Verifica se o usuário já não está participando\n        // 4. Adiciona o usuário como um novo participante do prêmio\n        // 5. Transfere o custo do bilhete para a conta do módulo, para ser mantido até ser transferido para o vencedor\n        // 6. Notifica o evento\n    \n    }\n\n    #[pallet::call_index(1)]\n    #[pallet::weight(0)]\n    pub fn award_prize(origin: OriginFor<T>) -> DispatchResult {\n\n        // 1. Valida a assinatura de origem\n        // 2. Obtém um número aleatório do módulo de aleatoriedade\n        // 3. Seleciona o vencedor da lista de participantes\n        // 4. Transfere o prêmio total para a conta do vencedor\n        // 5. Redefine a lista de participantes e prepara-se para outra rodada da loteria\n\n    }\n}\n```\n\nEssas chamadas também emitem eventos para manter o usuário informado e podem retornar erros caso alguma das validações dê errado.\n\nAqui está a implementação completa das chamadas com a lógica da loteria personalizada:\n\n??? code \"Ver o código de chamadas completo\"\n\n    ```rust\n    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-calls.rs'\n    ```\n\n### Implementando erros personalizados {: #implementing-custom-errors}\n\nA macro `#[pallet::error]` é usada para anotar uma enumeração de erros potenciais que poderiam ocorrer durante a execução. É crucial para a segurança garantir que todas as situações de erro sejam tratadas com elegância, sem causar a falha do tempo de execução.\n\nO exemplo a seguir desta implementação de macro mostra os erros que podem ocorrer no módulo da loteria:\n\n```rust\n// Erros informam aos usuários que algo deu errado.\n#[pallet::error]\npub enum `Error`<T> {\n    NotEnoughCurrency,\n    AccountAlreadyParticipating,\n    CanNotAddParticipant,\n}\n```\n\n### Implementando eventos {: #implementing-events }\n\nA macro `#[pallet::event]` é aplicada a uma enumeração de eventos para informar o usuário sobre quaisquer alterações no estado ou ações importantes que ocorreram durante a execução no tempo de execução.\n\nComo exemplo, para o módulo `lottery-example`, esta macro pode ser configurada com os seguintes eventos:\n\n```rust\n#[pallet::event]\n#[pallet::generate_deposit(pub(super) fn deposit_event)]\npub enum Event<T: Config> {\n    /// Event emitted when a ticket is bought\n    TicketBought { who: T::AccountId },\n    /// Event emitted when the prize is awarded\n    PrizeAwarded { winner: T::AccountId },\n    /// Event emitted when there are no participants\n    ThereAreNoParticipants,\n}\n```\n\n### Implementando o armazenamento para persistência de estado {: #implementing-storage }\n\nA macro `#[pallet::storage]` inicializa uma estrutura de armazenamento de tempo de execução. No ambiente altamente restrito de blockchains, decidir o que armazenar e qual estrutura usar pode ser fundamental em termos de desempenho. Mais sobre esse tópico é abordado na [documentação Substrate](https://docs.polkadot.com/develop/parachains/customize-parachain/make-custom-pallet/#pallet-storage){target=\\_blank}.\n\nNeste exemplo, o módulo `lottery-example` precisa de uma estrutura de armazenamento de valor básica para persistir a lista de participantes em um vetor de capacidade limitada ([BoundedVec](https://crates.parity.io/frame_support/storage/bounded_vec/struct.BoundedVec.html){target=\\_blank}). Isso pode ser inicializado da seguinte forma:\n\n```rust\n#[pallet::storage]\n#[pallet::getter(fn get_participants)]\npub(super) type Participants<T: Config> = StorageValue<\n    _,\n    BoundedVec<T::AccountId, T::MaxParticipants>,\n    OptionQuery\n>;\n```\n\n### O módulo completo {: #complete-module }\n\nPara juntar todas as peças, após implementar todas as macros necessárias e adicionar a lógica personalizada, o módulo agora está completo e pronto para ser usado no tempo de execução.\n\n??? code \"Ver o arquivo do módulo completo\"\n\n    ```rust\n    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example.rs'\n    ```\n\n## Configurar o tempo de execução {: #configure-runtime }\n\nFinalmente, com o módulo finalizado, ele pode ser incluído no tempo de execução. Ao fazer isso, as transações `buy_tickets` e `award_prize` serão chamáveis pelos usuários. Isso também significa que a [API Polkadot.js](/builders/toolkit/substrate-api/libraries/polkadot-js-api/){target=\\_blank} será decorada com este módulo e todas as chamadas disponíveis que ele contém.\n\nPara configurar o tempo de execução, abra o arquivo `lib.rs`, que contém a definição para o tempo de execução do modelo incluído e está localizado (no caso de usar o compatível com EVM) na pasta:\n\n```text\n*/container-chains/templates/frontier/runtime/src/\n```\n\nPara adicionar o módulo da loteria, configure os módulos da seguinte forma:\n\n```rust\n\n// Adicione a configuração para o módulo de aleatoriedade. Nenhum parâmetro necessário.\nimpl pallet_insecure_randomness_collective_flip::Config for Runtime {\n}\n\n// ID de módulo personalizado\nparameter_types! {\n\tpub const PalletId: PalletId = PalletId(*b\"loex5678\");\n}\n\n// Adicione a configuração para o módulo da loteria\nimpl pallet_lottery_example::Config for Runtime {\n\ttype RuntimeEvent = RuntimeEvent;\n\ttype Currency = Balances;\n\ttype TicketCost = ConstU128<1000000000000000>;\n\ttype PalletId = PalletId;\n\ttype MaxParticipants = ConstU32<500>;\n\ttype MyRandomness = RandomCollectiveFlip;\n}\n```\n\nCom os módulos configurados, adicione a macro `construct_runtime!` (que define os módulos que serão incluídos ao construir o tempo de execução) e os módulos de aleatoriedade e loteria.\n\n```rust\nconstruct_runtime!(\n\tpub struct Runtime {\n        ...\n        // Inclua a lógica personalizada do pallet-template no tempo de execução.\n        RandomCollectiveFlip: pallet_insecure_randomness_collective_flip,\n        Lottery: pallet_lottery_example,\n        ...\n    }\n)\n```\n\nCom tudo definido, a rede agora tem suporte para uma implementação básica de uma loteria.\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Adicionando um Módulo Feito Sob Medida\ndescription: Descubra como incorporar módulos feitos sob medida para adicionar recursos exclusivos ou especializados à sua rede que vão além das capacidades dos módulos integrados.\nicon: octicons-terminal-24\ncategories: Custom-Runtime\n---\n\n# Adicionando um Módulo Feito Sob Medida {: #adding-custom-made-module }\n\n## Introdução {: #introduction }\n\nAo fornecer uma biblioteca abrangente de módulos pré-construídos que abordam muitos requisitos comuns, a estrutura simplifica bastante o processo de construção de um blockchain e acelera a implantação e evolução em uma rede com tecnologia Tanssi. No entanto, abordar um caso de uso inovador geralmente exige um esforço de desenvolvimento para atender totalmente aos requisitos e, no Substrate, adicionar lógica personalizada se traduz em escrever e integrar módulos de tempo de execução.\n\nO exemplo apresentado no artigo [Modularidade](/learn/framework/modules/#custom-module-example){target=\\_blank} mostra um módulo de loteria simples que expõe duas transações:\n\n- **Comprar bilhetes** - esta função gerencia a entrada de um usuário na loteria. Essencialmente, ela verifica se o participante tem saldo suficiente, não está participando e cuida da transferência de fundos para registrar o usuário na loteria\n- **Prêmio de atribuição** - esta função que lida com um usuário que entra na loteria. Em alto nível, ela busca um número pseudo-aleatório para obter um vencedor e lida com a distribuição do prêmio\n\nA implementação dessas transações também usa armazenamento, emite eventos, define erros personalizados e depende de outros módulos para lidar com a moeda (para cobrar pelos bilhetes e transferir o valor total para o vencedor) e aleatorizar a seleção do vencedor.\n\nNeste artigo, as seguintes etapas, necessárias para construir e adicionar o módulo de exemplo ao tempo de execução, serão abordadas:\n\n1. Criar os arquivos do módulo de loteria (pacote).\n2. Configurar as dependências do módulo.\n3. Adicionar lógica personalizada.\n4. Configurar o tempo de execução com o novo módulo.\n\n--8<-- 'text/_common/not-for-production-code-guard.md'\n\n## Verificando Pré-requisitos {: #checking-prerequisites }\n\nPara seguir as etapas deste guia, você precisará ter o seguinte:\n\n- Clonar o [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\\_blank} do Github\n- Compilador Rust e gerenciador de pacotes Cargo\n\nVocê pode ler mais sobre como instalar o Rust e o Cargo no artigo de [pré-requisitos](/builders/build/customize/prerequisites/#installing-rust){target=\\_blank}.\n\n## Criando os arquivos do módulo de loteria {: #creating-lottery-module-files }\n\nAntes de iniciar seu processo de codificação, é essencial criar os arquivos que contêm sua lógica. Os módulos Substrate são abstratos e destinados ao reaproveitamento em diferentes tempos de execução com várias personalizações. Para conseguir isso, você usará o Cargo, o gerenciador de pacotes do Rust, para criar o módulo como um novo pacote.\n\nComo mencionado na seção de pré-requisitos, a primeira etapa é clonar o [repositório Tanssi](https://github.com/moondance-labs/tanssi){target=\\_blank} e, na pasta raiz, navegar até `pallets`, onde o módulo será criado.\n\n```bash\ncd container-chains/pallets\n```\n\nEm seguida, crie o pacote do módulo com o Cargo:\n\n```bash\ncargo new lottery-example\n```\n\nPor padrão, o Cargo cria o novo pacote em uma pasta com o nome fornecido (`lottery-example`, neste caso), contendo um arquivo de manifesto, `Cargo.toml` e uma pasta `src` com um arquivo `main.rs`. Para respeitar a convenção de nomenclatura usada no Substrate, o arquivo `main.rs` é renomeado para `lib.rs`:\n\n```bash\nmv lottery-example/src/main.rs lottery-example/src/lib.rs\n```\n\nDepois de executar todos os comandos, o módulo é criado e está pronto para conter a lógica personalizada que você adicionará nas seções a seguir.\n\n## Configurar as dependências do módulo {: #configure-module-dependencies}\n\nComo o módulo funciona como um pacote independente, ele tem seu próprio arquivo Cargo.toml, onde você deve especificar os atributos e dependências do módulo.\n\nPor exemplo, você pode usar atributos para especificar detalhes como o nome do módulo, versão, autores e outras informações relevantes. Por exemplo, no módulo `lottery-example`, o arquivo `Cargo.toml` pode ser configurado da seguinte forma:\n\n```toml\n[package]\nname = \"module-lottery-example\"\nversion = \"4.0.0-dev\"\ndescription = \"Simple module example\"\nauthors = [\"\"]\nhomepage = \"\"\n...\n```\n\nEste arquivo também define as dependências do módulo, como a funcionalidade principal que permite a integração perfeita com o tempo de execução e outros módulos, acesso ao armazenamento, emissão de eventos e muito mais.\n\nO exemplo completo do arquivo `Cargo.toml` define, além dos atributos, as dependências exigidas pelo Substrate:\n\n??? code \"Ver o arquivo Cargo.toml completo\"\n\n    ```rust\n    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-cargo.toml'\n    ```\n\n## Adicionando lógica personalizada {: #adding-custom-logic}\n\nConforme apresentado na seção [módulo personalizado](/learn/framework/modules/#custom-modules){target=\\_blank} do artigo sobre modularidade, a criação de um módulo envolve a implementação das seguintes macros de atributo, das quais as três primeiras são obrigatórias:\n\n--8<-- 'text/builders/build/customize/custom-made-module/pallets-macros-descriptions.md'\n\n### Implementando a estrutura básica do módulo {: #implementing-basic-structure }\n\nAs duas primeiras macros obrigatórias, `#[frame_support::pallet]` e `#[pallet::pallet]`, fornecem a estrutura básica do módulo e são necessárias para habilitar o módulo a ser usado em um tempo de execução Substrate.\n\nA seguir, é apresentada a estrutura geral de um módulo Substrate personalizado.\n\n```rust\n#[frame_support::pallet(dev_mode)]\npub mod pallet {\n    ...\n    #[pallet::pallet]\n    pub struct Pallet<T>(_);\n    \n    // Toda a lógica vai aqui\n}\n```\nA próxima etapa seria adicionar a terceira macro obrigatória (`#[pallet::config]`) e toda a lógica personalizada, conforme mostrado nas seções a seguir.\n\n### Implementando a configuração do módulo {: #implementing-module-configuration }\n\nPara tornar os módulos altamente adaptáveis, sua configuração é abstrata o suficiente para permitir que sejam adaptados aos requisitos específicos do caso de uso que o tempo de execução implementa.\n\nA implementação da macro `#[pallet::config]` é obrigatória e define a dependência do módulo em outros módulos e os tipos e valores especificados pelas configurações específicas do tempo de execução.\n\nNo módulo `lottery-example` personalizado que você está construindo, o módulo depende de outros módulos para gerenciar a moeda e a função aleatória para selecionar o vencedor. O módulo também lê e usa o preço do bilhete e o número máximo de participantes diretamente das configurações do tempo de execução. Consequentemente, a configuração precisa incluir essas dependências:\n\n- **Eventos** - o módulo depende da definição de um evento do tempo de execução para poder emiti-los\n- **Moeda** - o módulo `lottery-example` precisa poder transferir fundos, portanto, precisa da definição do sistema monetário do tempo de execução\n- **Aleatoriedade** - este módulo é usado para selecionar de forma justa o vencedor do prêmio da lista de participantes. Ele gera os números aleatórios usando os hashes de bloco anteriores e o número do bloco atual como semente\n- **Custo do bilhete** - o preço a ser cobrado dos compradores que participam da loteria\n- **Número máximo de participantes** - o limite máximo de participantes permitido em cada rodada da loteria\n- **ID do módulo** - o identificador exclusivo do módulo é necessário para acessar a conta do módulo para manter os fundos dos participantes até serem transferidos para o vencedor\n\nA implementação da configuração descrita para este exemplo é mostrada no seguinte trecho de código:\n\n```rust\n#[pallet::config]\npub trait Config: frame_system::Config {\n\n    // Definição do evento\n    type RuntimeEvent: From<Event<Self>> \n        + IsType<<Self as frame_system::Config>::RuntimeEvent>;\n\n    // Moeda\n    type Currency: Currency<Self::AccountId>\n\n    // Aleatoriedade\n    type MyRandomness: Randomness<Self::Hash, BlockNumberFor<Self>>;\n\n    // Custo do bilhete\n    #[pallet::constant]\n    type TicketCost: Get<BalanceOf<Self>>;\n\n    // Número máximo de participantes\n    #[pallet::constant]\n    type MaxParticipants: Get<u32>;\n\n    // ID do módulo\n    #[pallet::constant]\n    type PalletId: Get<PalletId>;\n}\n```\n\nEsta definição abstrata de dependências é crucial para evitar o acoplamento a um caso de uso específico e para permitir que os módulos sirvam como blocos de construção básicos para as redes Substrate.\n\n### Implementando Transações {: #implementing-transactions }\n\nChamadas representam o comportamento que um tempo de execução expõe na forma de transações que podem ser despachadas para processamento, expondo a lógica personalizada adicionada ao módulo.\n\nCada chamada está incluída na macro `#[pallet::call]` e apresenta os seguintes elementos:\n\n- **Índice de chamada** - é um identificador exclusivo obrigatório para cada chamada despachável\n- **Peso** - é uma medida do esforço computacional que uma extrínseca leva ao ser processada. Mais sobre pesos está na [documentação do Polkadot](https://docs.polkadot.com/polkadot-protocol/parachain-basics/blocks-transactions-fees/fees/#how-fees-are-calculated){target=\\_blank}\n- **Origem** - identifica a conta de assinatura que está fazendo a chamada\n- **Resultado** - o valor de retorno da chamada, que pode ser um `Erro` se alguma coisa der errado\n\nA seguinte trecho apresenta a estrutura geral da implementação da macro mencionada e os elementos de chamada:\n\n```rust\n#[pallet::call]\nimpl<T: Config> Pallet<T> {\n    \n    #[pallet::call_index(0)]\n    #[pallet::weight(0)]\n    pub fn one_call(origin: OriginFor<T>) -> DispatchResult { }\n\n    #[pallet::call_index(1)]\n    #[pallet::weight(0)]\n    pub fn another_call(origin: OriginFor<T>) -> DispatchResult { }\n\n    // Outras chamadas\n}\n```\n\nNeste módulo `lottery-example`, definimos duas chamadas com a seguinte lógica:\n\n```rust\n#[pallet::call]\nimpl<T: Config> Pallet<T> {\n    \n    #[pallet::call_index(0)]\n    #[pallet::weight(0)]\n    pub fn buy_ticket(origin: OriginFor<T>) -> DispatchResult {\n\n        // 1. Valida a assinatura de origem\n        // 2. Verifica se o usuário tem saldo suficiente para pagar o preço do bilhete\n        // 3. Verifica se o usuário já não está participando\n        // 4. Adiciona o usuário como um novo participante do prêmio\n        // 5. Transfere o custo do bilhete para a conta do módulo, para ser mantido até ser transferido para o vencedor\n        // 6. Notifica o evento\n    \n    }\n\n    #[pallet::call_index(1)]\n    #[pallet::weight(0)]\n    pub fn award_prize(origin: OriginFor<T>) -> DispatchResult {\n\n        // 1. Valida a assinatura de origem\n        // 2. Obtém um número aleatório do módulo de aleatoriedade\n        // 3. Seleciona o vencedor da lista de participantes\n        // 4. Transfere o prêmio total para a conta do vencedor\n        // 5. Redefine a lista de participantes e prepara-se para outra rodada da loteria\n\n    }\n}\n```\n\nEssas chamadas também emitem eventos para manter o usuário informado e podem retornar erros caso alguma das validações dê errado.\n\nAqui está a implementação completa das chamadas com a lógica da loteria personalizada:\n\n??? code \"Ver o código de chamadas completo\"\n\n    ```rust\n    --8<-- 'code/builders/build/customize/custom-made-module/lottery-example-calls.rs'\n    ```\n\n### Implementando erros personalizados {: #implementing-custom-errors}\n\nA macro `#[pallet::error]` é usada para anotar uma enumeração de erros potenciais que poderiam ocorrer durante a execução. É crucial para a segurança garantir que todas as situações de erro sejam tratadas com elegância, sem causar a falha do tempo de execução.\n\nO exemplo a seguir desta implementação de macro mostra os erros que podem ocorrer no módulo da loteria:\n\n```rust\n// Erros informam aos usuários que algo deu errado.\n#[pallet::error]\npub enum Error<T> {\n    NotEnoughCurrency,\n    AccountAlreadyParticipating,\n    CanNotAddParticipant,\n}\n```\n\n### Implementando eventos {: #implementing-events }\n\nA macro `#[pallet::event]` é aplicada a uma enumeração de eventos para informar o usuário sobre quaisquer alterações no estado ou ações importantes que ocorreram durante a execução no tempo de execução.\n\nComo exemplo, para o módulo `lottery-example`, esta macro pode ser configurada com os seguintes eventos:\n\n```rust\n#[pallet::event]\n#[pallet::generate_deposit(pub(super) fn deposit_event)]\npub enum Event<T: Config> {\n    /// Event emitted when a ticket is bought\n    TicketBought { who: T::AccountId },\n    /// Event emitted when the prize is awarded\n    PrizeAwarded { winner: T::AccountId },\n    /// Event emitted when there are no participants\n    ThereAreNoParticipants,\n}\n```\n\n### Implementando o armazenamento para persistência de estado {: #implementing-storage }\n\nA macro `#[pallet::storage]` inicializa uma estrutura de armazenamento de tempo de execução. No ambiente altamente restrito de blockchains, decidir o que armazenar e qual estrutura usar pode ser fundamental em termos de desempenho. Mais sobre esse tópico é abordado na [documentação Substrate](https://docs.polkadot.com/develop/parachains/customize-parachain/make-custom-pallet/#pallet-storage){target=\\_blank}.\n\nNeste exemplo, o módulo `lottery-example` precisa de uma estrutura de armazenamento de valor básica para persistir a lista de participantes em um vetor de capacidade limitada ([BoundedVec](https://crates.parity.io/frame_support/storage/bounded_vec/struct.BoundedVec.html){target=\\_blank}). Isso pode ser inicializado da seguinte forma:\n\n```rust\n#[pallet::storage]\n#[pallet::getter(fn get_participants)]\npub(super) type Participants<T: Config> = StorageValue<\n    _,\n    BoundedVec<T::AccountId, T::MaxParticipants>,\n    OptionQuery\n>;\n```\n\n### O módulo completo {: #complete-module }\n\nPara juntar todas as peças, após implementar todas as macros necessárias e adicionar a lógica personalizada






























```bash

```

```bash


```


```bash

```






````

```rust
```toml

```
````

```rust



```





```rust

    ```













```rust








```

```rust













```

```rust



























```

````
```rust

```
````

```rust







```

```rust










```




```rust



```

````
```rust

```
````

```text

```

```rust












```






    ```rust
    ```







```rust
```













```rust










```







```rust







```







    ```rust

    ```







```text

```



```rust



















```



```rust









```
