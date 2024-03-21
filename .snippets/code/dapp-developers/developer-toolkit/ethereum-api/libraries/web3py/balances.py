# 1. Import web3.py
from web3 import Web3

# 2. Create web3.py provider
provider_rpc = {
    # Insert your RPC URL here
    "evm_containerchain": "https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network",
}
web3 = Web3(Web3.HTTPProvider(provider_rpc["evm_containerchain"]))

# 2. Create address variables
address_from = "INSERT_ADDRESS_FROM"
address_to = "INSERT_ADDRESS_TO"

# 4. Fetch balance data
balance_from = web3.from_wei(
    web3.eth.get_balance(Web3.to_checksum_address(address_from)), "ether"
)
balance_to = web3.from_wei(
    web3.eth.get_balance(Web3.to_checksum_address(address_to)), "ether"
)

print(f"The balance of { address_from } is: { balance_from } TANGO")
print(f"The balance of { address_to } is: { balance_to } TANGO")
