import { assertNotNull } from '@subsquid/util-internal';
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from '@subsquid/evm-processor';
import { Store } from '@subsquid/typeorm-store';
import * as erc20 from './abi/erc20';

// Here you'll need to import the contract
export const contractAddress = 'INSERT_CONTRACT_ADDRESS'.toLowerCase();

export const processor = new EvmBatchProcessor()
  .setDataSource({
    chain: {
      url: assertNotNull(
        'https://dancelight-2001.tanssi-api.network'
      ),
      rateLimit: 300,
    },
  })
  .setFinalityConfirmation(10)
  .setFields({
    log: {
      topics: true,
      data: true,
    },
    transaction: {
      hash: true,
    },
  })
  .addLog({
    address: [contractAddress],
    topic0: [erc20.events.Transfer.topic],
    transaction: true,
  })
  .setBlockRange({
    from: INSERT_START_BLOCK, // Note the lack of quotes here
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
