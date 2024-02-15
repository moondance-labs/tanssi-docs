const chain = defineChain({
  id: INSERT-EVM-CHAIN-ID,
  name: 'dancebox-evm-container',
  rpcUrls: {
    default: {
      http: ['INSERT_RPC_URL'],
    },
    public: {
      http: ['INSERT_RPC_URL'],
    }
  }
})