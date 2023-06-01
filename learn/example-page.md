---
title: example page with long
description: ...
---

# Example Example Example

![Banner](/images/example/example-banner.png)

## Introduction

Hello

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

!!! note
    Hello! `hiiiiii`


```js
const code = 'a';
```

=== "Something sort of"

    ```
    hi
    ```

=== "Long and stuff"

    ```
    bye
    ```

Variable usage: {{ var }}

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


|                                         Network                                         | Network Type  |                                  Relay Chain                                   | Native Asset Symbol | Native Asset Decimals |
|:---------------------------------------------------------------------------------------:|:-------------:|:------------------------------------------------------------------------------:|:-------------------:|:---------------------:|
|           [Moonbeam](/builders/get-started/networks/moonbeam){target=_blank}            |    MainNet    |              [Polkadot](https://polkadot.network/){target=_blank}              |        GLMR         |          18           |
|          [Moonriver](/builders/get-started/networks/moonriver){target=_blank}           |    MainNet    |                [Kusama](https://kusama.network/){target=_blank}                |        MOVR         |          18           |
|        [Moonbase Alpha](/builders/get-started/networks/moonbase){target=_blank}         |    TestNet    | [Alphanet relay](/learn/platform/networks/moonbase#relay-chain){target=_blank} |         DEV         |          18           |
| [Moonbeam Development Node](/builders/get-started/networks/moonbeam-dev){target=_blank} | Local TestNet |                                      None                                      |         DEV         |          18           |


### Learn Something

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

```js
--8<-- 'code/example.js'
```

--8<-- 'text/example.md'


#### Learn something else

```js
const simpleDexAddress = "INSERT-ADDRESS-OF-DEX";

async function checkBalances(demoToken) {
  // Get the signer
  const signer = (await ethers.getSigner()).address;

  // Get the balance of the DEX and print it
  const dexBalance = ethers.utils.formatEther(
    await demoToken.balanceOf(simpleDexAddress)
  );
  console.log(`Dex ${simpleDexAddress} has a balance of: ${dexBalance} DTOKs`);

  // Get the balance of the signer and print it
  const signerBalance = ethers.utils.formatEther(
    await demoToken.balanceOf(signer)
  );
  console.log(`Account ${signer} has a balance of: ${signerBalance} DTOKs`);
}

async function main() {
  // Create instance of SimpleDex.sol
  const simpleDex = await ethers.getContractAt("SimpleDex", simpleDexAddress);

  // Create instance of DemoToken.sol
  const demoTokenAddress = await simpleDex.token();
  const demoToken = await ethers.getContractAt("DemoToken", demoTokenAddress);

  // Create instance of Batch.sol
  const batchAddress = "0x000";
  const batch = await ethers.getContractAt("Batch", batchAddress);

  // Parse the value to swap to Wei
  const amountDtok = ethers.utils.parseEther(
    "INSERT-AMOUNT-OF-DEV-TO-SWAP"
  );

  // Get the encoded call data for the approval and swap
  const approvalCallData = demoToken.interface.encodeFunctionData("approve", [
    simpleDexAddress,
    amountDtok,
  ]);
  const swapCallData = simpleDex.interface.encodeFunctionData(
    "swapDemoTokenForDev",
    [amountDtok]
  );

  const batchAll = await batch.batchAll(
    [demoTokenAddress, simpleDexAddress], // to address
    [], // value of the native token to send
    [approvalCallData, swapCallData], // call data
    [] // gas limit
  );

  ? : 'hello'

  await batchAll.wait();
  console.log(`Approve and swap demo tokens for dev tokens: ${batchAll.hash}`);

  // Check balances after the swap
  await checkBalances(demoToken);

  let x = 1234n;
  let y = true;
  var w = 0;

  ><
}
main();
```

```python
from web3 import Web3

abi = 'XCM-UTILS-ABI-HERE'  # Paste or import the x-tokens ABI
# This is for demo purposes, never store your private key in plain text
private_key = 'INSERT-YOUR-PRIVATE-KEY'
# The wallet address that corresponds to your private key
address = 'INSERT-YOUR-ADDRESS'

# Create Web3 wallet & contract instance
web3 = Web3(Web3.HTTPProvider('https://rpc.api.moonbase.moonbeam.network'))
xcm_utils = web3.eth.contract(
    # XCM Utilities Precompile address
    address='0x000000000000000000000000000000000000080C',
    abi=abi
)


def sendXcm():
    # Define parameters required for the xcmSend function
    encoded_calldata = '0x020c000400010000070010a5d4e81300010000070010a5d4e8000d010004010101000c36e9ba26fa63c60ec728fe75fe57b86a450d94e7fee7f9f9eddd0d3f400d67'
    dest = [
        1,  # Parents: 1
        []  # Interior: Here
    ]

    # Create transaction
    tx = xcm_utils.functions.xcmSend(
        dest,
        encoded_calldata
    ).buildTransaction(
        {
            'from': address,
            'nonce': web3.eth.get_transaction_count(address),
        }
    )

    # Sign transaction
    signed_tx = web3.eth.account.sign_transaction(tx, private_key)

    # Send tx
    hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    receipt = web3.eth.wait_for_transaction_receipt(hash)
    print(f'Transaction receipt: { receipt.transactionHash.hex() }')

    000000


sendXcm()
```