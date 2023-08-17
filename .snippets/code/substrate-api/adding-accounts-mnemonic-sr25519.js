// Import the required packages
import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

const main = async () => {
  await cryptoWaitReady();

  // Import SR25519 account from mnemonic
  const keyring = new Keyring({ type: 'sr25519' });
  const mnemonic = 'MNEMONIC_HERE';

  // Extract SR25519 address from mnemonic
  const newPair = keyring.addFromUri(`${mnemonic}`);
  console.log(`Derived SR25519 Address from Mnemonic: ${newPair.address}`);
};

main();
