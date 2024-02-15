const chain = defineChain({
  id: INSERT-EVM-CHAIN-ID,
  name: 'dancebox-evm-container',
  rpcUrls: {
    default: {
      http: ['INSERT-RPC-URL'],
    },
    public: {
      http: ['INSERT-RPC-URL'],
    }
  }
})