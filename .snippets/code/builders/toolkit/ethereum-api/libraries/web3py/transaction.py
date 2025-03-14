# 1. Add imports
from web3 import Web3
from web3.gas_strategies.rpc import rpc_gas_price_strategy

# 2. Create web3.py provider
provider_rpc = {
    # Insert your RPC URL here
    "evm_network": "https://dancebox-3001.tanssi-api.network",
}
web3 = Web3(Web3.HTTPProvider(provider_rpc["evm_network"]))

# 3. Create address variables
account_from = {
    "private_key": "INSERT_ YOUR_PRIVATE_KEY",
    "address": "INSERT_ PUBLIC_ADDRESS_OF_PK",
}
address_to = "INSERT_ ADDRESS_TO"

print(
    f'Attempting to send transaction from { account_from["address"] } to { address_to }'
)

# 4. Set the gas price strategy
web3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

# 5. Sign tx with PK
tx_create = web3.eth.account.sign_transaction(
    {
        "nonce": web3.eth.get_transaction_count(
            Web3.to_checksum_address(account_from["address"])
        ),
        "gasPrice": web3.eth.generate_gas_price(),
        "gas": 21000,
        "to": Web3.to_checksum_address(address_to),
        "value": web3.to_wei("1", "ether"),
    },
    account_from["private_key"],
)

# 6. Send tx and wait for receipt
tx_hash = web3.eth.send_raw_transaction(tx_create.rawTransaction)
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

print(f"Transaction successful with hash: { tx_receipt.transactionHash.hex() }")
