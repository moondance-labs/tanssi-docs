## Checking Prerequisites {: #checking-prerequisites }

For the examples in this guide, you will need to have the following:

- A Tanssi appchain (Snap or Dedicated)
- The account you used when registering the appchain, imported in any of the [supported wallets](/builders/deploy/dapp/#supported-wallets){target=\_blank}
- Your appchain's Sudo account, also imported in any of the [supported wallets](/builders/deploy/dapp/#supported-wallets){target=\_blank}

!!! note
    The appchain's registration account is always a Substrate one, whereas the appchain's Sudo account depends on the chain type. If the chain is EVM-compatible, then the Sudo account will be an Ethereum type and, otherwise, a Substrate type.

### Retrieving the Registration Account {: #retrieving-registration-account }

--8<-- 'text/builders/manage/dapp/locate-registration-account.md'

### Retrieving the Sudo Account {: #retrieving-sudo-account }

--8<-- 'text/builders/manage/locate-sudo-account.md'

