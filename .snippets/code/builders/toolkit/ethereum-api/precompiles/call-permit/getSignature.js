import { ethers } from 'ethers';

const from = 'INSERT_FROM_ADDRESS';
const to = 'INSERT_TO_ADDRESS';
const value = 0;
const data =
  '0x4ed3885e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000';
const gaslimit = 100000;
const nonce = 'INSERT_SIGNERS_NONCE';
const deadline = 'INSERT_DEADLINE';

const createPermitMessageData = () => {
  const message = {
    from: from,
    to: to,
    value: value,
    data: data,
    gaslimit: gaslimit,
    nonce: nonce,
    deadline: deadline,
  };

  const typedData = {
    types: {
      CallPermit: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'gaslimit', type: 'uint64' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    primaryType: 'CallPermit',
    domain: {
      name: 'Call Permit Precompile',
      version: '1',
      chainId: INSERT-CHAIN-ID,
      verifyingContract: '0x0000000000000000000000000000000000000802',
    },
    message: message,
  };

  return {
    typedData,
    message,
  };
};

const messageData = createPermitMessageData();

// For demo purposes only. Never store your private key in a JavaScript/TypeScript file
const privateKey = 'INSERT_PRIVATE_KEY';
const wallet = new ethers.Wallet(privateKey);

const signature = await wallet.signTypedData(messageData.typedData.domain, messageData.typedData.types, messageData.message);

console.log(`Transaction successful with hash: ${signature}`);

const ethersSignature = ethers.Signature.from(signature);
const formattedSignature = {
  r: ethersSignature.r,
  s: ethersSignature.s,
  v: ethersSignature.v,
};

console.log(formattedSignature);