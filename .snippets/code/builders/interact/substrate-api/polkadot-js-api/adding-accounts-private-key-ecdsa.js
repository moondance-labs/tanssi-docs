// Import the required packages
import Keyring from '@polkadot/keyring';

// Import Ethereum account from private key
const keyringECDSA = new Keyring({ type: 'ethereum' });
const privateKeyInput = 'INSERT_PK';

// Extract address from private key
const otherPair = keyringECDSA.addFromUri(privateKeyInput);
console.log(`Derived Address from provided Private Key: ${otherPair.address}`);
