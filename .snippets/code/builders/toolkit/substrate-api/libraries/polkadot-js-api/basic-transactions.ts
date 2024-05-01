import { ApiPromise, WsProvider } from '@polkadot/api';
import Keyring from '@polkadot/keyring';

const main = async () => {
  // Construct API provider
  const wsProvider = new WsProvider('INSERT_APPCHAIN_WSS_ENDPOINT');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Create a keyring instance (ECDSA)
  const keyring = new Keyring({ type: 'ethereum' });

  // Initialize wallet key pairs
  const alice = keyring.addFromUri('INSERT_ALICES_PRIVATE_KEY');

  // Form the transaction
  const tx = await api.tx.balances.transferAllowDeath(
    'INSERT_BOBS_ADDRESS',
    BigInt(INSERT_VALUE)
  );

  // Retrieve the encoded calldata of the transaction
  const encodedCalldata = tx.method.toHex();
  console.log(`Encoded calldata: ${encodedCalldata}`);

  // Sign and send the transaction
  const txHash = await tx.signAndSend(alice);

  // Show the transaction hash
  console.log(`Submitted with hash ${txHash}`);

  // Disconnect the API
  await api.disconnect();
};

main();
