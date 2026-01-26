Existem várias formas de interagir com os contratos inteligentes:

- Usando o [Symbiotic CLI](https://github.com/symbioticfi/cli){target=\_blank}
- Usando o [Etherscan](https://etherscan.io/){target=\_blank}
- Usando o [Safe](https://safe.global/){target=\_blank} para configurações multisig

Em todos os casos, você precisará assinar a transação com a conta que pretende usar para o nó. Você pode fazer isso de diferentes maneiras:

- Usando a chave privada da conta diretamente (não recomendado)
- Usando uma hot wallet, como o [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}
- Usando uma cold wallet, como o [Ledger](https://www.ledger.com/){target=\_blank}

A seção a seguir descreve os passos para instalar o Symbiotic CLI, caso essa seja sua opção.

### Configurar o Symbiotic CLI {: #set-up-the-cli }

O [Symbiotic CLI](https://github.com/symbioticfi/cli){target=\_blank} é uma ferramenta para interagir com os contratos principais do Symbiotic. Ele é escrito em [Python](https://www.python.org/){target=\_blank}, portanto você precisará instalar o interpretador Python e o [pip](https://pypi.org/project/pip/){target=\_blank}, o instalador de pacotes do Python:

=== "Linux (Ubuntu/Debian)"

    ```bash
     sudo apt-get install python3 && \
     sudo apt install python3-pip
    ```

=== "MacOS"

    ```bash
    brew install python3
    ```

Agora, com o Python instalado, baixe o Symbiotic CLI e suas dependências:

```bash
git clone https://github.com/symbioticfi/cli.git && \
cd cli && \
pip3 install -r requirements.txt
```

Execute o comando abaixo para verificar se a instalação foi bem-sucedida:

```bash
python3 symb.py --help
```

O terminal deve mostrar uma lista grande dos comandos disponíveis do CLI:

<div id="termynal" data-termynal>
    <span data-ty="input"><span class="file-path"></span>python3 symb.py --help</span>
    <span data-ty>Usage: symb.py [OPTIONS] COMMAND [ARGS]...</span>
    <br>
<span data-ty>Options:</></span>
  <span data-ty>&emsp;--chain CHAIN    Chain ID to use.  [default: mainnet]</span>
  <span data-ty>&emsp;--provider TEXT  Ethereum provider URL [http(s)].</span>
  <span data-ty>&emsp;--help           Show this message and exit.</span>
  <br>
<span data-ty>Commands:
<span data-ty>&emsp;active-balance-of&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Get an active balance of a given account...</span>
<span data-ty>&emsp;check-opt-in-network&emsp;&emsp;&ensp; Check if operator is opted in to a network.</span>
<span data-ty>&emsp;check-opt-in-vault&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Check if operator is opted in to a vault.</span>
<span data-ty>&emsp;claim&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Claim a withdrawal for some epoch at the...</span>
<span data-ty>&emsp;deposit&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Deposit to the vault.</span>
<span data-ty>&emsp;.......&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;..........</span>
</div>
