import {In} from 'typeorm'
import {assertNotNull} from '@subsquid/evm-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as erc20 from './abi/erc20'
import {Account, Transfer} from './model'
import {Block, CONTRACT_ADDRESS, Log, Transaction, processor} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    let transfers: TransferEvent[] = []

    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            if (log.address === CONTRACT_ADDRESS && log.topics[0] === erc20.events.Transfer.topic) {
                transfers.push(getTransfer(ctx, log))
            }
        }
    }

    await processTransfers(ctx, transfers)
})

interface TransferEvent {
    id: string
    block: Block
    transaction: Transaction
    from: string
    to: string
    amount: bigint
}

function getTransfer(ctx: any, log: Log): TransferEvent {
    let event = erc20.events.Transfer.decode(log)

    let from = event.from.toLowerCase()
    let to = event.to.toLowerCase()
    let amount = event.value

    let transaction = assertNotNull(log.transaction, `Missing transaction`)

    return {
        id: log.id,
        block: log.block,
        transaction,
        from,
        to,
        amount,
    }
}

async function processTransfers(ctx: any, transfersData: TransferEvent[]) {
    let accountIds = new Set<string>()
    for (let t of transfersData) {
        accountIds.add(t.from)
        accountIds.add(t.to)
    }

    let accounts = await ctx.store
        .findBy(Account, {id: In([...accountIds])})
        .then((q: any[]) => new Map(q.map((i: any) => [i.id, i])))

    let transfers: Transfer[] = []

    for (let t of transfersData) {
        let {id, block, transaction, amount} = t

        let from = getAccount(accounts, t.from)
        let to = getAccount(accounts, t.to)

        transfers.push(
            new Transfer({
                id,
                blockNumber: block.height,
                timestamp: new Date(block.timestamp),
                txHash: transaction.hash,
                from,
                to,
                amount,
            })
        )
    }

    await ctx.store.upsert(Array.from(accounts.values()))
    await ctx.store.insert(transfers)
}

function getAccount(m: Map<string, Account>, id: string): Account {
    let acc = m.get(id)
    if (acc == null) {
        acc = new Account()
        acc.id = id
        m.set(id, acc)
    }
    return acc
}
