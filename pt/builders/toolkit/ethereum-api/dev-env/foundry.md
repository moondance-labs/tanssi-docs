---
title: Deploy Contracts with Foundry
description: Learn how to use Foundry, an Ethereum development environment, to compile, deploy, and interact with Solidity smart contracts on your Tanssi EVM network.
icon: octicons-code-square-24
categories: EVM-Template
---

````json
{
  "source_path": "builders/toolkit/ethereum-api/dev-env/foundry.md",
  "source_language": "EN",
  "target_language": "PT",
  "checksum": "3b0f07df250ce2278a5c8ee097ff4663836afcebaae098d3d6250b62d3123df3",
  "content": "--- \ntitle: Deploy Contracts with Foundry\ndescription: Learn how to use Foundry, an Ethereum development environment, to compile, deploy, and interact with Solidity smart contracts on your Tanssi EVM network.\nicon: octicons-code-square-24\ncategories: EVM-Template\n---\n\n# Usando Foundry para implantar em sua rede EVM\n\n## Introdução {: #introduction }\n\n[Foundry](https://github.com/foundry-rs/foundry){target=\\_blank} é um ambiente de desenvolvimento Ethereum escrito em Rust que ajuda os desenvolvedores a gerenciar dependências, compilar projetos, executar testes, implantar contratos e interagir com blockchains na linha de comando. Foundry pode interagir diretamente com a API Ethereum das redes EVM baseadas em Tanssi, para que possa ser usado para implantar e interagir com contratos inteligentes em sua rede Tanssi.\n\nHá quatro ferramentas que compõem o Foundry:\n\n- **[Forge](https://getfoundry.sh/forge/overview/){target=\\_blank}** - compila, testa e implanta contratos\n- **[Cast](https://getfoundry.sh/cast/overview/){target=\\_blank}** - uma interface de linha de comando para interagir com contratos\n- **[Anvil](https://getfoundry.sh/anvil/overview/){target=\\_blank}** - um nó TestNet local para fins de desenvolvimento que pode bifurcar redes preexistentes\n- **[Chisel](https://getfoundry.sh/chisel/overview/){target=\\_blank}** - um REPL Solidity para testar rapidamente snippets Solidity\n\nEste guia abordará como usar o Foundry para compilar, implantar e depurar contratos inteligentes Ethereum na rede demo EVM. Você pode seguir as mesmas etapas para realizar essas ações em sua rede EVM Tanssi, substituindo a URL RPC e o ID da cadeia mostrados nos exemplos.\n\n## Verificando os pré-requisitos {: #checking-prerequisites }\n\nPara começar, você precisará do seguinte:\n\n - Uma conta com fundos\n - [Foundry instalado](https://getfoundry.sh/introduction/installation/){target=\\_blank}\n\n## Criando um projeto Foundry {: #creating-a-foundry-project }\n\nVocê precisará criar um projeto Foundry se ainda não tiver um. Você pode criar um seguindo as etapas a seguir:\n\n1. Instale o Foundry com os comandos abaixo. As instruções do Windows são notavelmente diferentes, pois você terá que instalar o Rust e, em seguida, construir o Foundry a partir da fonte\n\n    === \"Ubuntu\"\n\n        ```bash\n        curl -L https://foundry.paradigm.xyz | bash foundryup\n        ```\n\n    === \"MacOS\"\n\n        ```bash\n        curl -L https://foundry.paradigm.xyz | bash foundryup\n        ```\n\n    === \"Windows\"\n\n        ```bash\n        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh\n        cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil --bins --locked\n        ```\n\n     Após a instalação, talvez seja necessário reiniciar sua sessão de terminal ou adicionar `foundryup` ao seu PATH.\n\n2. Crie o projeto, que criará uma pasta com três pastas dentro dela:\n\n    ```bash\n    forge init foundry\n    ```\n\nVocê pode obter um erro, como `O diretório de destino faz parte ou, por si só, de um repositório git já inicializado,\ne ele exige áreas de trabalho e preparo limpas, incluindo arquivos não rastreados.` Para resolver isso, você pode adicionar arquivos e fazer um commit se estiver mantendo este projeto em um repositório GitHub. Caso contrário, você pode fazer um commit falso sem enviar por push. Se você executar `forge init foundry` mais uma vez, não terá mais o erro.\n\nCom o projeto padrão criado, você deverá ver três pastas.\n\n- `lib` - todas as dependências do projeto na forma de submódulos git\n- `src` - onde colocar seus contratos inteligentes (com funcionalidade)\n- `test` - onde colocar os testes de forge para seu projeto, que são escritos em Solidity\n\nAlém dessas três pastas, um projeto git também será criado junto com um arquivo `.gitignore` pré-escrito com tipos de arquivos e pastas relevantes ignorados.\n\n## A pasta Source {: #the-src-folder }\n\nO repositório `foundry` pré-configurado inclui `Counter.sol` na pasta `src`, bem como um `Counter.s.sol` na pasta `script` e `Counter.t.sol` na pasta `test`. Você deve excluir esses arquivos para evitar erros ao tentar compilar e implantar `MyToken.sol`. Você pode fazer isso com o seguinte comando:\n\n```bash\nrm src/Counter.sol script/Counter.s.sol test/Counter.t.sol\n```\n\nNas etapas a seguir, você implantará um contrato ERC-20. No diretório contracts, você pode criar o arquivo `MyToken.sol`:\n\n```bash\ncd src\ntouch MyToken.sol\n```\n\nAbra o arquivo e adicione o seguinte contrato a ele:\n\n```solidity\n--8<-- 'code/builders/toolkit/ethereum-api/dev-env/foundry/erc20.sol'\n```\n\nAntes de tentar compilar, instale os contratos OpenZeppelin como uma dependência. Pode ser necessário commitar as alterações anteriores para git antes. Por padrão, o Foundry usa submódulos git em vez de pacotes npm, portanto, o caminho de importação npm tradicional e o comando não são usados. Em vez disso, use o nome do repositório GitHub do OpenZeppelin:\n\n```bash\nforge install OpenZeppelin/openzeppelin-contracts\n```\n\n## Compilando Solidity {: #compiling-solidity }\n\nDepois que todas as dependências forem instaladas, você pode compilar o contrato:\n\n```bash\nforge build\n```\n\n![Foundry Contract Compile](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-1.webp)\n\nApós a compilação, duas pastas serão criadas: `out` e `cache`. O ABI e o bytecode para seus contratos estarão contidos na pasta `out`. Essas duas pastas já são ignoradas pelo `.gitignore` incluído na inicialização padrão do projeto Foundry.\n\n## Implantando o contrato {: #deploying-the-contract }\n\nA implantação do contrato com o Forge leva um único comando, mas você precisará incluir um endpoint RPC, uma chave privada financiada e argumentos de construtor. `MyToken.sol` pede um fornecimento inicial de tokens em seu construtor, portanto, o seguinte comando inclui 100 como um argumento de construtor. Você pode implantar o contrato `MyToken.sol` usando o seguinte comando modificado para a rede correta:\n\n```bash\nforge create --rpc-url {{ networks.dancelight.demo_evm_rpc_url }} \\\n--constructor-args 100 \\\n--private-key INSERT_YOUR_PRIVATE_KEY \\\nsrc/MyToken.sol:MyToken\n```\n\nApós alguns segundos, o contrato é implantado e você deve ver o endereço no terminal.\n\n![Foundry Contract Deploy](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-2.webp)\n\nParabéns, seu contrato está ativo! Salve o endereço, pois você o usará para interagir com esta instância do contrato na próxima etapa.\n\n## Interagindo com o contrato {: #interacting-with-the-contract }\n\nFoundry inclui [Cast](https://getfoundry.sh/cast/overview/){target=\\_blank}, uma CLI para executar chamadas RPC Ethereum.\n\nTente recuperar o nome do seu token usando Cast, onde `INSERT_YOUR_CONTRACT_ADDRESS` é o endereço do contrato que você implantou na seção anterior:\n\n```bash\ncast call INSERT_YOUR_CONTRACT_ADDRESS \"name()\" --rpc-url {{ networks.dancelight.demo_evm_rpc_url }}\n```\n\nVocê deve obter esses dados em formato hexadecimal:\n\n```text\n0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000074d79546f6b656e00000000000000000000000000000000000000000000000000\n```\n\nIsso está longe de ser legível, mas você pode usar Cast para convertê-lo para o formato desejado. Neste caso, os dados são texto, então você pode convertê-los em caracteres ASCII para ver \"My Token\":\n\n![Foundry Contract View](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-3.webp)\n\n```bash\ncast --to-ascii 0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000074d79546f6b656e00000000000000000000000000000000000000000000000000\n```\n\nVocê também pode mutar dados com Cast também. Tente queimar tokens enviando-os para o endereço zero.\n\n```bash\ncast send --private-key INSERT_YOUR_PRIVATE_KEY \\\n--rpc-url {{ networks.dancelight.demo_evm_rpc_url }} \\\n--chain {{ networks.dancelight.demo_evm_chain_id }} \\\nINSERT_YOUR_CONTRACT_ADDRESS \\\n\"transfer(address,uint256)\" 0x0000000000000000000000000000000000000001 1\n```\n\nA transação será assinada pela sua conta EVM e será transmitida para a rede. A saída deve ser semelhante a:\n\n![Foundry Contract Interaction](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-4.webp)\n\nParabéns, você implantou e interagiu com um contrato com sucesso usando o Foundry!\n\n## Bifurcando com Anvil {: #forking-with-anvil }\n\nComo mencionado anteriormente, [Anvil](https://getfoundry.sh/anvil/overview/){target=\\_blank} é um nó TestNet local para fins de desenvolvimento que pode bifurcar redes preexistentes. A bifurcação da rede demo EVM permite que você interaja com contratos ativos implantados na rede.\n\nPara bifurcar a rede demo EVM da linha de comando, você pode executar o seguinte comando dentro do diretório do seu projeto Foundry. Você também pode substituir a URL RPC pela URL RPC da sua rede EVM Tanssi.\n\n```bash\nanvil --fork-url {{ networks.dancelight.demo_evm_rpc_url }}\n```\n\nSua instância bifurcada terá 10 contas de desenvolvimento que são pré-financiadas com 10.000 tokens de teste. A instância bifurcada está disponível em `http://127.0.0.1:8545/`. A saída no seu terminal deve ser semelhante à seguinte:\n\n![Forking terminal screen](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-5.webp)\n\nPara verificar se você bifurcou a rede, você pode consultar o número do bloco mais recente e compará-lo com o número do bloco atual da [rede demo EVM]({{ networks.dancelight.demo_evm_blockscout_url }}){target=\\_blank}.\n\n```bash\ncurl --data '{\"method\":\"eth_blockNumber\",\"params\":[],\"id\":1,\"jsonrpc\":\"2.0\"}' -H \"Content-Type: application/json\" -X POST localhost:8545 \n```\n\nSe você converter o `result` de [hex para decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html){target=\\_blank}, você deverá obter o número do último bloco a partir do momento em que você bifurcou a rede.\n\nA partir daqui, você pode implantar novos contratos em sua instância bifurcada da rede demo EVM (ou qualquer outra rede EVM alimentada por Tanssi) ou interagir com contratos já implantados. Partindo do exemplo anterior neste guia, você pode fazer uma chamada usando Cast para verificar o saldo dos tokens MYTOK cunhados na conta com a qual você implantou o contrato:\n\n```bash\ncast call INSERT_CONTRACT_ADDRESS  \"balanceOf(address)(uint256)\" \\\n INSERT_YOUR_ADDRESS --rpc-url http://localhost:8545\n```\n\n## Usando Chisel {: #using-chisel }\n\n[Chisel](https://getfoundry.sh/chisel/overview/){target=\\_blank} é um REPL ou shell Solidity. Ele permite que um desenvolvedor escreva Solidity diretamente no console para testar pequenos trechos de código, permitindo que os desenvolvedores ignorem as etapas de configuração do projeto e implantação do contrato para o que deve ser um processo rápido.\n\nComo o Chisel é útil principalmente para testes rápidos, ele pode ser usado fora de um projeto Foundry. Mas, se executado dentro de um projeto Foundry, ele manterá as configurações dentro de `foundry.toml` durante a execução.\n\nPara este exemplo, você testará alguns dos recursos de `abi` dentro do Solidity porque é complexo o suficiente para demonstrar como o Chisel pode ser útil. Para começar a usar o Chisel, execute o seguinte na linha de comando para iniciar o shell:\n\n```bash\nchisel\n```\n\nNo shell, você pode escrever código Solidity como se estivesse sendo executado em uma função:\n\n```solidity\nbytes memory myData = abi.encode(100, true, \"Build with Tanssi\");\n```\n\nDigamos que você estivesse interessado em como `abi` codificou dados porque você está analisando como armazenar dados com mais eficiência no blockchain e, assim, economizar gás. Para visualizar como o `myData` é armazenado na memória, você pode usar o seguinte comando enquanto estiver no shell Chisel:\n\n```bash\n!memdump\n```\n\n`memdump` despejará todos os dados em sua sessão atual. Você provavelmente verá algo assim abaixo. Se você não for bom em ler hexadecimal ou se não souber como a codificação ABI funciona, talvez não consiga encontrar onde a variável `myData` foi armazenada.\n\n![memdump in Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-6.webp)\n\nFelizmente, Chisel permite que você descubra facilmente onde essas informações são armazenadas. Usando o comando `!rawstack`, você pode encontrar o local na pilha onde o valor de uma variável está:\n\n```bash\n!rawstack myData\n```\n\nNesta situação, como `myData` tem mais de 32 bytes de comprimento, o ponteiro de memória é exibido. Mas é exatamente isso que é necessário, pois você já sabe a totalidade da pilha do comando `!memdump`.\n\n![rawstack in Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-7.webp)\n\nO comando `!rawstack` mostra que a variável `myData` é armazenada em `0x80`, então, ao comparar isso com o dump de memória recuperado do comando `!memdump`, parece que `myData` é armazenado assim:\n\n```text\n[0x80:0xa0]: 0x00000000000000000000000000000000000000000000000000000000000000a0\n[0xa0:0xc0]: 0x0000000000000000000000000000000000000000000000000000000000000064\n[0xc0:0xe0]: 0x0000000000000000000000000000000000000000000000000000000000000001\n[0xe0:0x100]: 0x0000000000000000000000000000000000000000000000000000000000000060\n[0x100:0x120]: 0x0000000000000000000000000000000000000000000000000000000000000011\n[0x120:0x140]: 0x4275696c6420776974682054616e737369000000000000000000000000000000\n```\n\nÀ primeira vista, isso faz sentido, pois `0xa0` tem um valor de `0x64`, que é igual a 100, e `0xc0` tem um valor de `0x01`, que é igual a true. Se você quiser saber mais sobre como a codificação ABI funciona, a [documentação Solidity para ABI é útil](https://docs.soliditylang.org/en/v0.8.18/abi-spec.html){target=\\_blank}. Neste caso, há muitos zeros neste método de empacotamento de dados, então, como um desenvolvedor de contratos inteligentes, você pode tentar usar structs ou empacotar os dados juntos de forma mais eficiente com código bitwise.\n\nComo você terminou com este código, você pode limpar o estado do Chisel para que ele não interfira em nenhuma lógica futura que você deseja experimentar (enquanto executa a mesma instância do Chisel):\n\n```bash\n!clear\n```\nHá uma maneira ainda mais fácil de testar com Chisel. Ao escrever um código que termina com ponto e vírgula, `;`, Chisel irá executá-lo como uma instrução, armazenando seu valor no estado de tempo de execução do Chisel. Mas se você só precisasse ver como os dados codificados por ABI foram representados, poderia se safar executando o código como uma expressão. Para experimentar isso com o mesmo exemplo `abi`, escreva o seguinte no shell Chisel:\n\n```bash\nabi.encode(100, true, \"Build with Tanssi\")\n```\n\nVocê deve ver algo como o seguinte:\n\n![Expressions in Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-8.webp)\n\nEmbora não exiba os dados da mesma forma, você ainda obtém o conteúdo dos dados e também quebra ainda mais como as informações são codificadas, como informá-lo de que o valor `0xa0` define o tamanho dos dados.\n\nPor padrão, ao sair do shell Chisel, nenhum dos dados persiste. Mas você pode instruir o Chisel a fazê-lo. Por exemplo, você pode seguir as seguintes etapas para armazenar uma variável:\n\n1. Armazenar um `uint256` em Chisel\n\n    ```bash\n    uint256 myNumber = 101;\n    ```\n\n2. Armazenar a sessão com `!save`. Para este exemplo, você pode usar o número `1` como um ID de salvamento\n\n    ```bash\n    !save 1\n    ```\n\n3. Saia da sessão\n    ```bash\n    !quit\n    ```\n\nEm seguida, para visualizar e interagir com seus estados Chisel armazenados, você pode seguir as seguintes etapas:\n\n1. Visualize uma lista de estados Chisel salvos\n\n    ```bash\n    chisel list\n    ```\n\n2. Carregue seu estado armazenado fornecendo o comando `chisel load` seguido pelo ID do estado\n\n    ```bash\n    chisel load 1\n    ```\n\n3. Visualize o `uint256` salvo em Chisel do conjunto anterior de etapas\n\n    ```bash\n    !rawstack myNumber\n    ```\n\n![Saving state in Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-9.webp)\n\nVocê pode até bifurcar redes ao usar o Chisel:\n\n```bash\n!fork {{ networks.dancelight.demo_evm_rpc_url }}\n```\n\nEm seguida, por exemplo, você pode consultar o saldo da conta Alice na rede demo EVM:\n\n```text\n0x44236223aB4291b93EEd10E4B511B37a398DEE55.balance\n```\n\n![Forking in Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-10.webp)\n\nSe você quiser saber mais sobre o Chisel, baixe o Foundry e consulte sua [página de referência oficial](https://getfoundry.sh/chisel/reference/){target=\\_blank}.\n\n## Foundry com Hardhat {: #foundry-with-hardhat }\n\nFreqüentemente, haverá o caso em que um projeto com o qual você deseja integrar terá toda a sua configuração dentro de [Hardhat](/builders/toolkit/ethereum-api/dev-env/hardhat/){target=\\_blank}, tornando-se uma tarefa árdua converter a totalidade do projeto em Foundry. Este trabalho adicional é evitável criando um projeto híbrido que usa os recursos Hardhat e Foundry juntos. Isso é possível com o [plugin hardhat-foundry](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-foundry){target=\\_blank} do Hardhat.\n\nPara converter seu projeto Foundry preexistente em um projeto híbrido, você precisará essencialmente instalar um projeto Hardhat na mesma pasta:\n\n```bash\nnpm init\nnpm install --save-dev hardhat @nomicfoundation/hardhat-foundry\nnpx hardhat init\n```\n\nPara obter mais informações, consulte nossa documentação sobre [Criando um projeto Hardhat](/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\\_blank}.\n\nDepois de inicializar o novo projeto Hardhat, algumas novas pastas e arquivos devem aparecer: `contracts`, `hardhat.config.js`, `scripts` e `test/Lock.js`. Você precisará fazer algumas modificações para criar um projeto híbrido:\n\n1. Edite o arquivo `hardhat.config.js` dentro do seu repositório. Abra-o e, no topo, adicione o seguinte:\n\n    ```javascript\n    require('@nomicfoundation/hardhat-foundry');\n    ```\n\n    Após adicionar o plugin `hardhat-foundry`, as pastas `contracts` típicas para Hardhat não funcionarão porque agora o Hardhat espera que todos os contratos inteligentes sejam armazenados na pasta `src` do Foundry\n\n2. Mova todos os contratos inteligentes dentro da pasta `contracts` para a pasta `src` e, em seguida, exclua a pasta `contracts`\n3. Edite o arquivo `foundry.toml` para garantir que as dependências instaladas via submódulos Git e npm possam ser compiladas pela ferramenta Forge. Edite o `profile.default` para garantir que a entrada `libs` tenha `lib` e `node_modules`:\n\n    ```toml\n    [profile.default]\n    src = 'src'\n    out = 'out'\n    libs = ['lib', 'node_modules']\n    solc = '0.8.20'\n    evm_version = 'london'\n    ```\n\nAgora, tanto `forge build` quanto `npx hardhat compile` devem funcionar independentemente das dependências.\n\nTanto `forge test` quanto `npx hardhat test` agora devem ser capazes de acessar todos os contratos inteligentes e dependências. `forge test` só testará os testes Solidity, enquanto `npx hardhat test` só testará os testes JavaScript. Se você deseja usá-los em conjunto, pode criar um novo script dentro do seu arquivo `package.json`:\n\n```json\n\"scripts\": {\n    \"test\": \"npx hardhat test && forge test\"\n}\n```\n\nVocê pode executar este comando com:\n\n```bash\nnpm run test\n```\n\nFinalmente, embora não seja necessário, pode valer a pena mover todos os scripts JavaScript da pasta `scripts` para a pasta `script` do Foundry e excluir a pasta `scripts` para que você não tenha duas pastas que sirvam ao mesmo propósito.\n\nParabéns, você implantou e interagiu com sucesso com contratos inteligentes em sua rede EVM Tanssi usando o Foundry! Para obter mais informações, consulte o [Foundry Book](https://getfoundry.sh/){target=\\_blank}.\n\n--8<-- 'text/_disclaimers/third-party-content.md'\n",
  "translated_content": "--- \ntitle: Implante Contratos com Foundry\ndescrição: Aprenda a usar o Foundry, um ambiente de desenvolvimento Ethereum, para compilar, implantar e interagir com contratos inteligentes Solidity em sua rede Tanssi EVM.\nicon: octicons-code-square-24\ncategories: EVM-Template\n---\n\n# Usando Foundry para implantar em sua rede EVM\n\n## Introdução {: #introduction }\n\n[Foundry](https://github.com/foundry-rs/foundry){target=\\_blank} é um ambiente de desenvolvimento Ethereum escrito em Rust que ajuda os desenvolvedores a gerenciar dependências, compilar projetos, executar testes, implantar contratos e interagir com blockchains na linha de comando. Foundry pode interagir diretamente com a API Ethereum das redes EVM baseadas em Tanssi, para que possa ser usado para implantar e interagir com contratos inteligentes em sua rede Tanssi.\n\nHá quatro ferramentas que compõem o Foundry:\n\n- **[Forge](https://getfoundry.sh/forge/overview/){target=\\_blank}** - compila, testa e implanta contratos\n- **[Cast](https://getfoundry.sh/cast/overview/){target=\\_blank}** - uma interface de linha de comando para interagir com contratos\n- **[Anvil](https://getfoundry.sh/anvil/overview/){target=\\_blank}** - um nó TestNet local para fins de desenvolvimento que pode bifurcar redes preexistentes\n- **[Chisel](https://getfoundry.sh/chisel/overview/){target=\\_blank}** - um REPL Solidity para testar rapidamente snippets Solidity\n\nEste guia abordará como usar o Foundry para compilar, implantar e depurar contratos inteligentes Ethereum na rede demo EVM. Você pode seguir as mesmas etapas para realizar essas ações em sua rede EVM Tanssi, substituindo a URL RPC e o ID da cadeia mostrados nos exemplos.\n\n## Verificando os pré-requisitos {: #checking-prerequisites }\n\nPara começar, você precisará do seguinte:\n\n - Uma conta com fundos\n - [Foundry instalado](https://getfoundry.sh/introduction/installation/){target=\\_blank}\n\n## Criando um projeto Foundry {: #creating-a-foundry-project }\n\nVocê precisará criar um projeto Foundry se ainda não tiver um. Você pode criar um seguindo as etapas a seguir:\n\n1. Instale o Foundry com os comandos abaixo. As instruções do Windows são notavelmente diferentes, pois você terá que instalar o Rust e, em seguida, construir o Foundry a partir da fonte\n\n    === \"Ubuntu\"\n\n        ```bash\n        curl -L https://foundry.paradigm.xyz | bash foundryup\n        ```\n\n    === \"MacOS\"\n\n        ```bash\n        curl -L https://foundry.paradigm.xyz | bash foundryup\n        ```\n\n    === \"Windows\"\n\n        ```bash\n        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh\n        cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil --bins --locked\n        ```\n\n     Após a instalação, talvez seja necessário reiniciar sua sessão de terminal ou adicionar `foundryup` ao seu PATH.\n\n2. Crie o projeto, que criará uma pasta com três pastas dentro dela:\n\n    ```bash\n    forge init foundry\n    ```\n\nVocê pode obter um erro, como `O diretório de destino faz parte ou, por si só, de um repositório git já inicializado,\ne ele exige áreas de trabalho e preparo limpos, incluindo arquivos não rastreados.` Para resolver isso, você pode adicionar arquivos e fazer um commit se estiver mantendo este projeto em um repositório GitHub. Caso contrário, você pode fazer um commit falso sem enviar por push. Se você executar `forge init foundry` mais uma vez, não terá mais o erro.\n\nCom o projeto padrão criado, você deverá ver três pastas.\n\n- `lib` - todas as dependências do projeto na forma de submódulos git\n- `src` - onde colocar seus contratos inteligentes (com funcionalidade)\n- `test` - onde colocar os testes de forge para seu projeto, que são escritos em Solidity\n\nAlém dessas três pastas, um projeto git também será criado junto com um arquivo `.gitignore` pré-escrito com tipos de arquivos e pastas relevantes ignorados.\n\n## A pasta Source {: #the-src-folder }\n\nO repositório `foundry` pré-configurado inclui `Counter.sol` na pasta `src`, bem como um `Counter.s.sol` na pasta `script` e `Counter.t.sol` na pasta `test`. Você deve excluir esses arquivos para evitar erros ao tentar compilar e implantar `MyToken.sol`. Você pode fazer isso com o seguinte comando:\n\n```bash\nrm src/Counter.sol script/Counter.s.sol test/Counter.t.sol\n```\n\nNas etapas a seguir, você implantará um contrato ERC-20. No diretório contracts, você pode criar o arquivo `MyToken.sol`:\n\n```bash\ncd src\ntouch MyToken.sol\n```\n\nAbra o arquivo e adicione o seguinte contrato a ele:\n\n```solidity\n--8<-- 'code/builders/toolkit/ethereum-api/dev-env/foundry/erc20.sol'\n```\n\nAntes de tentar compilar, instale os contratos OpenZeppelin como uma dependência. Pode ser necessário commitar as alterações anteriores para git antes. Por padrão, o Foundry usa submódulos git em vez de pacotes npm, portanto, o caminho de importação npm tradicional e o comando não são usados. Em vez disso, use o nome do repositório GitHub do OpenZeppelin:\n\n```bash\nforge install OpenZeppelin/openzeppelin-contracts\n```\n\n## Compilando Solidity {: #compiling-solidity }\n\nDepois que todas as dependências forem instaladas, você pode compilar o contrato:\n\n```bash\nforge build\n```\n\n![Foundry Contract Compile](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-1.webp)\n\nApós a compilação, duas pastas serão criadas: `out` e `cache`. O ABI e o bytecode para seus contratos estarão contidos na pasta `out`. Essas duas pastas já são ignoradas pelo `.gitignore` incluído na inicialização padrão do projeto Foundry.\n\n## Implantando o contrato {: #deploying-the-contract }\n\nA implantação do contrato com o Forge leva um único comando, mas você precisará incluir um endpoint RPC, uma chave privada financiada e argumentos de construtor. `MyToken.sol` pede um fornecimento inicial de tokens em seu construtor, portanto, o seguinte comando inclui 100 como um argumento de construtor. Você pode implantar o contrato `MyToken.sol` usando o seguinte comando modificado para a rede correta:\n\n```bash\nforge create --rpc-url {{ networks.dancelight.demo_evm_rpc_url }} \\\n--constructor-args 100 \\\n--private-key INSERT_YOUR_PRIVATE_KEY \\\nsrc/MyToken.sol:MyToken\n```\n\nApós alguns segundos, o contrato é implantado e você deve ver o endereço no terminal.\n\n![Foundry Contract Deploy](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-2.webp)\n\nParabéns, seu contrato está ativo! Salve o endereço, pois você























        ```bash

        ```



        ```bash

        ```



        ```bash


        ```





    ```bash

    ```
















```bash

```

```bash

```



```solidity

```

```bash


```




```bash

```

```text

```

```bash

```
```bash




```


```bash

```

```bash

```

```bash

```
```bash

```
```text

```solidity
```


```bash

```

```bash
```


```text
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

```bash

```


```bash


```



```bash



```

```bash

```



```bash

```  

```bash

```


```solidity

```

```bash


```

````
```javascript

```


```bash

```

```toml





```text
```

````

```json


```

```bash

```
```bash

```



```bash

```











    ```bash

    ```



    ```bash

    ```


    ```bash

    ```





    ```bash

    ```



    ```bash

    ```



    ```bash

    ```  





```bash

```



```text

```











```bash



```







    ```javascript

    ```






    ```toml






    ```





```json



```



```bash

```
