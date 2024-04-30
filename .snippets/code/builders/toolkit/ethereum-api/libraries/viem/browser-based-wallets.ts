const [account] = await window.ethereum.request({
  method: 'eth_requestAccounts',
});
const walletClient = createWalletClient({
  account,
  chain: demo,
  transport: custom(window.ethereum),
});
