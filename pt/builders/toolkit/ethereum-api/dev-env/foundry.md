---
title: Implante Contratos com Foundry
description: Aprenda a usar o Foundry, um ambiente de desenvolvimento Ethereum, para compilar, implantar e interagir com contratos inteligentes Solidity na sua rede EVM da Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

# Usando Foundry para Implantar na Sua Rede EVM

## Introdução {: #introduction }

[Foundry](https://github.com/foundry-rs/foundry){target=\_blank} é um ambiente de desenvolvimento Ethereum escrito em Rust que ajuda a gerenciar dependências, compilar projetos, executar testes, implantar contratos e interagir com blockchains pela linha de comando. O Foundry pode interagir diretamente com a API Ethereum de redes EVM powered by Tanssi, portanto pode ser usado para implantar e interagir com contratos inteligentes na sua rede Tanssi.

Quatro ferramentas compõem o Foundry:

- **[Forge](https://getfoundry.sh/forge/overview/){target=\_blank}** – compila, testa e implanta contratos
- **[Cast](https://getfoundry.sh/cast/overview/){target=\_blank}** – interface de linha de comando para interagir com contratos
- **[Anvil](https://getfoundry.sh/anvil/overview/){target=\_blank}** – nó local de TestNet para desenvolvimento que pode bifurcar redes existentes
- **[Chisel](https://getfoundry.sh/chisel/overview/){target=\_blank}** – REPL Solidity para testar rapidamente trechos de código

Este guia mostra como usar o Foundry para compilar, implantar e depurar contratos Ethereum na rede EVM de demonstração. Você pode seguir os mesmos passos na sua rede EVM da Tanssi trocando a URL RPC e o Chain ID dos exemplos.

## Verificando Pré-requisitos {: #checking-prerequisites }

Para começar, você precisará de:

 - Uma conta com fundos
 - [Foundry instalado](https://getfoundry.sh/introduction/installation/){target=\_blank}

## Criando um Projeto Foundry {: #creating-a-foundry-project }

Você precisa criar um projeto Foundry se ainda não tiver um. Siga os passos:

1. Instale o Foundry com os comandos abaixo. No Windows, é necessário instalar o Rust e compilar o Foundry a partir do código-fonte:

    === "Ubuntu"

        ```bash
        curl -L https://foundry.paradigm.xyz | bash foundryup
        ```

    === "MacOS"

        ```bash
        curl -L https://foundry.paradigm.xyz | bash foundryup
        ```

    === "Windows"

        ```bash
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh
        cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil --bins --locked
        ```

    Após instalar, talvez seja necessário reiniciar o terminal ou adicionar `foundryup` ao PATH.

2. Crie o projeto (será criada uma pasta com três subpastas):

    ```bash
    forge init foundry
    ```

Você pode receber um erro como `The target directory is a part of or on its own an already initialized git repository, and it requires clean working and staging areas, including no untracked files.` Para resolver, adicione arquivos e faça um commit se estiver mantendo o projeto em um repositório GitHub. Caso contrário, faça um commit fictício sem enviar. Se executar `forge init foundry` novamente, o erro não aparecerá.

Com o projeto padrão criado, você verá três pastas:

- `lib` – dependências do projeto como submódulos git
- `src` – onde colocar seus contratos inteligentes (com funcionalidade)
- `test` – onde colocar os testes do Forge em Solidity

Além dessas três pastas, um repositório git será criado com um `.gitignore` pré-preenchido ignorando tipos de arquivo e pastas relevantes.

## A Pasta `src` {: #the-src-folder }

O repositório `foundry` pré-configurado inclui `Counter.sol` em `src`, `Counter.s.sol` em `script` e `Counter.t.sol` em `test`. Exclua esses arquivos para evitar erros ao compilar e implantar `MyToken.sol`. Você pode fazer isso com:

```bash
rm src/Counter.sol script/Counter.s.sol test/Counter.t.sol
```

Nas etapas seguintes, você implantará um contrato ERC-20. No diretório `src`, crie o arquivo `MyToken.sol`:

```bash
cd src
touch MyToken.sol
```

Abra o arquivo e adicione o contrato:

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/dev-env/foundry/erc20.sol'
```

Antes de compilar, instale os contratos OpenZeppelin como dependência. Você pode ter que fazer commit das mudanças anteriores antes. Por padrão, o Foundry usa submódulos git em vez de pacotes npm, então o caminho e comando tradicionais do npm não são usados. Em vez disso, use o nome do repositório do OpenZeppelin no GitHub:

```bash
forge install OpenZeppelin/openzeppelin-contracts
```

## Compilando Solidity {: #compiling-solidity }

Com todas as dependências instaladas, compile o contrato:

```bash
forge build
```

![Compilar contrato no Foundry](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-1.webp)

Após a compilação, duas pastas serão criadas: `out` e `cache`. A ABI e o bytecode dos contratos ficam em `out`. Essas duas pastas já estão ignoradas no `.gitignore` incluído na inicialização padrão do projeto Foundry.

## Implantando o Contrato {: #deploying-the-contract }

Implantar o contrato com Forge exige apenas um comando, mas você precisa incluir um endpoint RPC, uma chave privada financiada e argumentos do builder. `MyToken.sol` pede uma oferta inicial de tokens em seu builder, portanto o comando inclui 100 como argumento do builder. Você pode implantar o contrato `MyToken.sol` usando o comando abaixo (ajuste para a rede correta):

```bash
forge create --rpc-url {{ networks.dancelight.demo_evm_rpc_url }} \
--constructor-args 100 \
--private-key INSERT_YOUR_PRIVATE_KEY \
src/MyToken.sol:MyToken
```

Depois de alguns segundos, o contrato é implantado e você verá o endereço no terminal.

![Implantação de contrato no Foundry](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-2.webp)

Parabéns, seu contrato está ativo! Salve o endereço, pois o usará para interagir com esta instância no próximo passo.

## Interagindo com o Contrato {: #interacting-with-the-contract }

O Foundry inclui o [Cast](https://getfoundry.sh/cast/overview/){target=\_blank}, uma CLI para realizar chamadas RPC Ethereum.

Recupere o nome do token usando o Cast, onde `INSERT_YOUR_CONTRACT_ADDRESS` é o endereço do contrato implantado na seção anterior:

```bash
cast call INSERT_YOUR_CONTRACT_ADDRESS "name()" --rpc-url {{ networks.dancelight.demo_evm_rpc_url }}
```

Você deve obter os dados em hexadecimal:

```text
0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000074d79546f6b656e00000000000000000000000000000000000000000000000000
```

Isso não é legível, mas você pode usar o Cast para converter para o formato desejado. Neste caso, o dado é texto, então converta para ASCII para ver "My Token":

![Visualizar contrato no Foundry](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-3.webp)

```bash
cast --to-ascii 0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000074d79546f6b656e00000000000000000000000000000000000000000000000000
```

Você também pode alterar dados com o Cast. Tente queimar tokens enviando-os para o endereço zero.

```bash
cast send --private-key INSERT_YOUR_PRIVATE_KEY \
--rpc-url {{ networks.dancelight.demo_evm_rpc_url }} \
--chain {{ networks.dancelight.demo_evm_chain_id }} \
INSERT_YOUR_CONTRACT_ADDRESS \
"transfer(address,uint256)" 0x0000000000000000000000000000000000000001 1
```

A transação será assinada pela sua conta EVM e transmitida à rede. A saída deve se parecer com:

![Interação de contrato no Foundry](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-4.webp)

Parabéns, você implantou e interagiu com um contrato usando Foundry!

## Bifurcando com Anvil {: #forking-with-anvil }

Como mencionado, o [Anvil](https://getfoundry.sh/anvil/overview/){target=\_blank} é um nó local de TestNet para desenvolvimento que pode bifurcar redes existentes. Bifurcar a rede demo EVM permite interagir com contratos vivos implantados na rede.

Para bifurcar a rede demo EVM na linha de comando, execute o seguinte comando no diretório do projeto Foundry. Você também pode substituir a URL RPC pela URL RPC da sua rede EVM da Tanssi:

```bash
anvil --fork-url {{ networks.dancelight.demo_evm_rpc_url }}
```

A instância bifurcada terá 10 contas de desenvolvimento pré-financiadas com 10.000 tokens de teste. A instância fica disponível em `http://127.0.0.1:8545/`. A saída no terminal deve ser semelhante a:

![Tela do terminal ao bifurcar](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-5.webp)

Para verificar se você bifurcou a rede, consulte o último número do bloco e compare com o número atual da [rede demo EVM]({{ networks.dancelight.demo_evm_blockscout_url }}){target=\_blank}.

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

Se converter o `result` de [hex para decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html){target=\_blank}, você deve obter o número mais recente do bloco do momento em que bifurcou.

A partir daqui, você pode implantar novos contratos na instância bifurcada da rede demo EVM (ou qualquer outra rede EVM com Tanssi) ou interagir com contratos já implantados. Seguindo o exemplo anterior, você pode fazer uma chamada com o Cast para verificar o saldo de tokens MYTOK cunhados na conta que implantou o contrato:

```bash
cast call INSERT_CONTRACT_ADDRESS  "balanceOf(address)(uint256)" \
 INSERT_YOUR_ADDRESS --rpc-url http://localhost:8545
```

## Usando Chisel {: #using-chisel }

O [Chisel](https://getfoundry.sh/chisel/overview/){target=\_blank} é um REPL ou shell Solidity. Ele permite escrever Solidity diretamente no console para testar trechos pequenos de código, permitindo pular a configuração de projeto e implantação de contrato para processos rápidos.

Como o Chisel é útil para testes rápidos, ele pode ser usado fora de um projeto Foundry. Mas, se for executado dentro de um projeto Foundry, ele mantém as configurações do `foundry.toml`.

Neste exemplo, você testará alguns recursos do `abi` em Solidity para demonstrar como o Chisel pode ser útil. Para começar a usar o Chisel, execute no terminal para iniciar o shell:

```bash
chisel
```

No shell, escreva código Solidity como se estivesse dentro de uma função:

```solidity
bytes memory myData = abi.encode(100, true, "Build with Tanssi");
```

Suponha que você esteja interessado em como o `abi` codifica dados porque quer armazenar dados de forma mais eficiente no blockchain e economizar gás. Para ver como `myData` é armazenado em memória, use o comando a seguir no shell do Chisel:

```bash
!memdump
```

`memdump` despejará todos os dados da sessão atual. Você verá algo como abaixo. Se não souber ler hexadecimal ou não souber como funciona a codificação ABI, talvez não consiga encontrar onde a variável `myData` foi armazenada.

![memdump no Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-6.webp)

Felizmente, o Chisel permite descobrir facilmente onde a informação está armazenada. Usando o comando `!rawstack`, é possível encontrar a posição na pilha onde o valor de uma variável está:

```bash
!rawstack myData
```

Nesse caso, como `myData` tem mais de 32 bytes, o ponteiro de memória é exibido. Mas é exatamente o que precisamos, já que você já conhece toda a pilha pelo comando `!memdump`.

![rawstack no Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-7.webp)

O comando `!rawstack` mostra que a variável `myData` está em `0x80`; comparando com o dump de memória do `!memdump`, parece que `myData` está armazenado assim:

```text
[0x80:0xa0]: 0x00000000000000000000000000000000000000000000000000000000000000a0
[0xa0:0xc0]: 0x0000000000000000000000000000000000000000000000000000000000000064
[0xc0:0xe0]: 0x0000000000000000000000000000000000000000000000000000000000000001
[0xe0:0x100]: 0x0000000000000000000000000000000000000000000000000000000000000060
[0x100:0x120]: 0x0000000000000000000000000000000000000000000000000000000000000011
[0x120:0x140]: 0x4275696c6420776974682054616e737369000000000000000000000000000000
```

A princípio, isso faz sentido, pois `0xa0` tem valor `0x64` (igual a 100) e `0xc0` tem valor `0x01` (igual a true). Para saber mais sobre a codificação ABI, veja a [documentação de Solidity para ABI](https://docs.soliditylang.org/en/v0.8.18/abi-spec.html){target=\_blank}. Neste caso, há muitos zeros nesse tipo de empacotamento de dados, então, como desenvolvedor de smart contracts, você pode tentar usar structs ou empacotar os dados de forma mais eficiente com código bitwise.

Quando terminar com esse código, limpe o estado do Chisel para não interferir em qualquer lógica futura que queira testar (mantendo a mesma instância do Chisel):

```bash
!clear
```

Há um jeito ainda mais fácil de testar com o Chisel. Quando você escreve código terminando com ponto e vírgula `;`, o Chisel executa como uma instrução, armazenando o valor no estado de runtime do Chisel. Mas, se você só precisa ver como os dados ABI codificados aparecem, pode rodar o código como uma expressão. Para testar com o mesmo exemplo de `abi`, escreva no shell do Chisel:

```bash
abi.encode(100, true, "Build with Tanssi")
```

Você verá algo como:

![Expressões no Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-8.webp)

Embora não exiba os dados do mesmo jeito, você ainda vê o conteúdo e ele quebra mais detalhes, como informar que o valor `0xa0` define o comprimento dos dados.

Por padrão, ao sair do shell do Chisel, nenhum dado persiste. Mas você pode instruir o Chisel a persistir. Por exemplo, siga estes passos para armazenar uma variável:

1. Armazene um `uint256` no Chisel

    ```bash
    uint256 myNumber = 101;
    ```

2. Armazene a sessão com `!save`. Neste exemplo, use o número `1` como ID de salvamento

    ```bash
    !save 1
    ```

3. Saia da sessão  
    ```bash
    !quit
    ```

Para visualizar e interagir com os estados do Chisel salvos, siga estes passos:

1. Veja a lista de estados salvos do Chisel

    ```bash
    chisel list
    ```

2. Carregue seu estado salvo fornecendo o comando `chisel load` seguido do ID do estado

    ```bash
    chisel load 1
    ```

3. Visualize o `uint256` salvo no Chisel a partir do conjunto de passos anterior

    ```bash
    !rawstack myNumber
    ```  

![Salvar estado no Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-9.webp)

Você pode até bifurcar redes enquanto usa o Chisel:

```bash
!fork {{ networks.dancelight.demo_evm_rpc_url }}
```

Então, por exemplo, você pode consultar o saldo da conta Alice na rede demo EVM:

```text
0x44236223aB4291b93EEd10E4B511B37a398DEE55.balance
```

![Bifurcando no Chisel](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-10.webp)

Se quiser saber mais sobre o Chisel, baixe o Foundry e consulte a [página de referência oficial](https://getfoundry.sh/chisel/reference/){target=\_blank}.

## Foundry com Hardhat {: #foundry-with-hardhat }  

Muitas vezes, um projeto que você quer integrar tem toda a configuração em [Hardhat](/pt/builders/toolkit/ethereum-api/dev-env/hardhat/){target=\_blank}, tornando penosa a tarefa de converter tudo para Foundry. Esse trabalho extra é evitável criando um projeto híbrido que use recursos do Hardhat e do Foundry juntos, o que é possível com o plugin [hardhat-foundry](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-foundry){target=\_blank}.  

Para converter seu projeto Foundry pré-existente em híbrido, essencialmente você vai instalar um projeto Hardhat na mesma pasta:

```bash
npm init
npm install --save-dev hardhat @nomicfoundation/hardhat-foundry
npx hardhat init
```

Para mais informações, consulte nossa documentação sobre [Criando um Projeto Hardhat](/pt/builders/toolkit/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=\_blank}.

Após inicializar o novo projeto Hardhat, algumas pastas e arquivos novos devem aparecer: `contracts`, `hardhat.config.js`, `scripts` e `test/Lock.js`. Você precisará fazer algumas modificações para criar o projeto híbrido:

1. Edite o arquivo `hardhat.config.js` dentro do repositório. Abra-o e, no topo, adicione:

    ```javascript
    require('@nomicfoundation/hardhat-foundry');
    ```

    Após adicionar o plugin `hardhat-foundry`, as pastas `contracts` típicas do Hardhat não funcionarão porque agora o Hardhat espera que todos os contratos inteligentes estejam na pasta `src` do Foundry

2. Mova todos os contratos da pasta `contracts` para a pasta `src` e então apague a pasta `contracts`
3. Edite o arquivo `foundry.toml` para garantir que dependências instaladas via submódulos Git e npm possam ser compiladas pela ferramenta Forge. Edite o `profile.default` para garantir que a entrada `libs` contenha `lib` e `node_modules`:

    ```toml
    [profile.default]
    src = 'src'
    out = 'out'
    libs = ['lib', 'node_modules']
    solc = '0.8.20'
    evm_version = 'london'
    ```

Agora tanto `forge build` quanto `npx hardhat compile` devem funcionar independentemente das dependências.  

Tanto `forge test` quanto `npx hardhat test` conseguem acessar todos os contratos e dependências. O `forge test` testará apenas os testes em Solidity, enquanto `npx hardhat test` testará apenas os testes em JavaScript. Se quiser usá-los em conjunto, você pode criar um novo script no arquivo `package.json`:

```json
"scripts": {
    "test": "npx hardhat test && forge test"
}
```

Você pode executar este comando com:

```bash
npm run test
```

Por fim, embora não seja necessário, pode valer a pena mover todos os scripts JavaScript da pasta `scripts` para a pasta `script` do Foundry e apagar a pasta `scripts` para não ter duas pastas com o mesmo propósito.

Parabéns, você implantou e interagiu com contratos inteligentes na sua rede EVM Tanssi usando Foundry! Para mais informações, consulte o [Foundry Book](https://getfoundry.sh/){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'
