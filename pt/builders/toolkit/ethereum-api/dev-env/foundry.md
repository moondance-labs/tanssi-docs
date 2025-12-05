---
title: Implante Contratos com Foundry
description: Aprenda a usar o Foundry, um ambiente de desenvolvimento Ethereum, para compilar, implantar e interagir com contratos inteligentes Solidity na sua rede EVM da Tanssi.
icon: octicons-code-square-24
categories: EVM-Template
---

# Usando Foundry para implantar na sua rede EVM

## Introdução {: #introduction }

[Foundry](https://github.com/foundry-rs/foundry){target=_blank} é um ambiente de desenvolvimento Ethereum escrito em Rust que ajuda a gerenciar dependências, compilar projetos, executar testes, implantar contratos e interagir com blockchains pela linha de comando. Foundry interage diretamente com a API Ethereum das redes EVM baseadas na Tanssi, então você pode usá-lo para implantar e interagir com contratos inteligentes na sua rede Tanssi.

Quatro ferramentas compõem o Foundry:

- **[Forge](https://getfoundry.sh/forge/overview/){target=_blank}** – compila, testa e implanta contratos
- **[Cast](https://getfoundry.sh/cast/overview/){target=_blank}** – CLI para interagir com contratos
- **[Anvil](https://getfoundry.sh/anvil/overview/){target=_blank}** – nó TestNet local para desenvolvimento que pode bifurcar redes existentes
- **[Chisel](https://getfoundry.sh/chisel/overview/){target=_blank}** – REPL Solidity para testar rapidamente trechos de código

Este guia mostra como usar o Foundry para compilar, implantar e depurar contratos Ethereum na rede EVM de demonstração. Para sua própria rede Tanssi, basta trocar a URL RPC e o Chain ID nos exemplos.

## Verificando pré-requisitos {: #checking-prerequisites }

Você precisará de:

 - Uma conta com fundos
 - [Foundry instalado](https://getfoundry.sh/introduction/installation/){target=_blank}

## Criando um projeto Foundry {: #creating-a-foundry-project }

Crie um projeto Foundry se ainda não tiver um:

1. Instale o Foundry (no Windows é necessário instalar Rust e compilar a partir da fonte):

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

2. Inicialize o projeto, que criará uma pasta com três subpastas:

    ```bash
    forge init foundry
    ```

Se aparecer um erro sobre diretório Git já existente, faça um commit (ou um commit falso) e execute novamente.

O projeto padrão cria:

- `lib` – dependências como submódulos git  
- `src` – seus contratos inteligentes  
- `test` – testes Forge em Solidity  

Um repositório git e um `.gitignore` pré-preenchido também são criados.

## A pasta `src` {: #the-src-folder }

O repositório padrão inclui `Counter.sol` em `src`, `Counter.s.sol` em `script` e `Counter.t.sol` em `test`. Exclua-os para evitar erros ao compilar/implantar `MyToken.sol`:

```bash
rm src/Counter.sol script/Counter.s.sol test/Counter.t.sol
```

Crie o contrato ERC-20 de exemplo:

```bash
cd src
touch MyToken.sol
```

Abra o arquivo e adicione:

```solidity
--8<-- 'code/builders/toolkit/ethereum-api/dev-env/foundry/erc20.sol'
```

Antes de compilar, instale os contratos OpenZeppelin como dependência. O Foundry usa submódulos git por padrão; use o repositório GitHub:

```bash
forge install OpenZeppelin/openzeppelin-contracts
```

## Compilando Solidity {: #compiling-solidity }

Depois das dependências, compile o contrato:

```bash
forge build
```

![Foundry Contract Compile](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-1.webp)

Serão criadas as pastas `out` e `cache` (já ignoradas no `.gitignore`) com ABI e bytecode.

## Implantando o contrato {: #deploying-the-contract }

Para implantar com o Forge é um comando só, mas requer endpoint RPC, chave privada financiada e argumentos do construtor. `MyToken.sol` pede oferta inicial; o exemplo usa 100:

```bash
forge create --rpc-url {{ networks.dancelight.demo_evm_rpc_url }} \
--constructor-args 100 \
--private-key INSERT_YOUR_PRIVATE_KEY \
src/MyToken.sol:MyToken
```

Após alguns segundos o contrato é implantado; o endereço aparece no terminal.

![Foundry Contract Deploy](/images/builders/toolkit/ethereum-api/dev-environments/foundry/foundry-2.webp)

## Interagindo com o contrato {: #interacting-with-the-contract }

Use o [Cast](https://getfoundry.sh/cast/overview/){target=_blank} (CLI) para fazer chamadas RPC.

Recupere o nome do token (substitua `INSERT_YOUR_CONTRACT_ADDRESS`):

```bash
cast call INSERT_YOUR_CONTRACT_ADDRESS "name()" --rpc-url {{ networks.dancelight.demo_evm_rpc_url }}
```

Converta o retorno hexadecimal para ASCII:

```bash
cast --to-ascii 0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000074d79546f6b656e00000000000000000000000000000000000000000000000000
```

Para queimar tokens enviando-os ao endereço zero:

```bash
cast send --private-key INSERT_YOUR_PRIVATE_KEY \
--rpc-url {{ networks.dancelight.demo_evm_rpc_url }} \
--chain {{ networks.dancelight.demo_evm_chain_id }} \
INSERT_YOUR_CONTRACT_ADDRESS \
"transfer(address,uint256)" 0x0000000000000000000000000000000000000001 1
```

## Bifurcando com Anvil {: #forking-with-anvil }

[Anvil](https://getfoundry.sh/anvil/overview/){target=_blank} é um nó local que pode bifurcar redes. Para bifurcar a rede demo EVM:

```bash
anvil --fork-url {{ networks.dancelight.demo_evm_rpc_url }}
```

A instância terá 10 contas de desenvolvimento pré-financiadas. Verifique o último bloco e compare com a [rede demo]({{ networks.dancelight.demo_evm_blockscout_url }}){target=_blank}:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545
```

Depois, você pode implantar novos contratos ou interagir com os existentes. Exemplo para ver saldo dos tokens cunhados:

```bash
cast call INSERT_CONTRACT_ADDRESS "balanceOf(address)(uint256)" INSERT_YOUR_ADDRESS --rpc-url http://localhost:8545
```

## Usando Chisel {: #using-chisel }

[Chisel](https://getfoundry.sh/chisel/overview/){target=_blank} é um REPL Solidity. Escreva Solidity direto no console para testar rapidamente, sem montar projeto ou implantar contrato.

Para iniciar:

```bash
chisel
```

Exemplo de codificação ABI:

```solidity
bytes memory myData = abi.encode(100, true, "Build with Tanssi");
```

Veja como o valor é armazenado em memória:

```bash
!memdump
```

Descubra a posição na pilha:

```bash
!rawstack myData
```

Você verá que `myData` está em `0x80`; o dump de memória mostrará os valores correspondentes.

Limpe o estado do Chisel se quiser recomeçar:

```bash
!clear
```

Você também pode avaliar expressões diretamente:

```bash
abi.encode(100, true, "Build with Tanssi")
```

Para persistir estado:

```bash
uint256 myNumber = 101;
!save 1
!quit
```

Depois, liste e carregue:

```bash
chisel list
chisel load 1
!rawstack myNumber
```

É possível bifurcar dentro do Chisel:

```bash
!fork {{ networks.dancelight.demo_evm_rpc_url }}
```

E consultar, por exemplo, saldo de uma conta:

```text
0x44236223aB4291b93EEd10E4B511B37a398DEE55.balance
```

## Foundry com Hardhat {: #foundry-with-hardhat }

Se você precisa integrar a um projeto já configurado em [Hardhat](/pt/builders/toolkit/ethereum-api/dev-env/hardhat/){target=_blank}, é possível criar um projeto híbrido com o plugin [hardhat-foundry](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-foundry){target=_blank}:

```bash
npm init
npm install --save-dev hardhat @nomicfoundation/hardhat-foundry
npx hardhat init
```

Edite `hardhat.config.js` para incluir:

```javascript
require('@nomicfoundation/hardhat-foundry');
```

Mova os contratos de `contracts` para `src` e ajuste `foundry.toml` para incluir `lib` e `node_modules`:

```toml
[profile.default]
src = 'src'
out = 'out'
libs = ['lib', 'node_modules']
solc = '0.8.20'
evm_version = 'london'
```

Agora `forge build` e `npx hardhat compile` funcionam; `forge test` testa Solidity e `npx hardhat test` testa JavaScript. Você pode unificar em um script:

```json
"scripts": {
  "test": "npx hardhat test && forge test"
}
```

Parabéns, você implantou e interagiu com contratos na sua rede EVM Tanssi usando o Foundry! Para saber mais, consulte o [Foundry Book](https://getfoundry.sh/){target=_blank}.

--8<-- 'text/pt/_disclaimers/third-party-content.pt.md'
