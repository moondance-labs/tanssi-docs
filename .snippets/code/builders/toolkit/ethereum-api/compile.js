// 1. Import packages
import fs from 'fs';
import solc from 'solc';

{{ networks.dancebox.token_symbol }}

// 2. Get path and load contract
const source = fs.readFileSync('Incrementer.sol', 'utf8');

// 3. Create input object
const input = {
  language: 'Solidity',
  sources: {
    'Incrementer.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
// 4. Compile the contract
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];

// 5. Export contract data
export default contractFile;
