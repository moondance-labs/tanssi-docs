const chain = defineChain({
  id: INSERT_EVM_CHAIN_ID,
  name: 'dancebox-evm-container',
  rpcUrls: {
    default: {
      http: ['INSERT_RPC_URL'],
    },
    public: {
      http: ['INSERT_RPC_URL'],
    },
  },
});
