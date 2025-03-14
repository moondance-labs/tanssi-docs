There are several ways to interact with the smart contract:

1. Using the [Symbiotic CLI](https://github.com/symbioticfi/cli){target=\_blank}
2. Using [Etherscan](https://etherscan.io/){target=\_blank}
3. Using [Safe](https://safe.global/){target=\_blank} for multi-sig setups

In any case, you'll need to sign the transaction using the account you intend to use for the node. You can choose between different options to do so:

1. Using the account's private key directly (although this method is not recommended)
2. Using a hot wallet, such as [Metamask](/builders/toolkit/ethereum-api/wallets/metamask/#install-the-metamask-extension){target=\_blank}
3. Using a cold wallet, such as [ledger](https://www.ledger.com/){target=\_blank}

The following section outlines the steps for installing the Symbiotic CLI, if that's your method of preference.

### Setting Up the Symbiotic CLI {: #setting-up-the-cli }

The [Symbiotic CLI](https://github.com/symbioticfi/cli){target=\_blank} is a tool for interacting with Symbiotic's core smart contracts. It is written in [Python](https://www.python.org/){target=\_blank}, so you'll need to install the Python interpreter and [pip](https://pypi.org/project/pip/){target=\_blank}, Python's package installer:

=== "Linux (Ubuntu/Debian)"

    ```bash
     sudo apt-get install python3 && \
     sudo apt install python3-pip
    ```

=== "MacOS"

    ```bash
    brew install python3
    ```

Now, with Python installed, download the Symbiotic CLI and its dependencies:

```bash
git clone https://github.com/symbioticfi/cli.git && \
cd cli && \
pip3 install -r requirements.txt
```

Run the following command to check if the installation was successful:

```bash
python3 symb.py --help
```

The terminal should show a long list of the CLI available commands:

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