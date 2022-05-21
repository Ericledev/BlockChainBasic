const SHA256 = require('crypto-js/sha256')

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.caculateHash()
        this.nonce = 0
    }
    caculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("a")) {
            console.log("Ericle check  Array.join: ", Array(difficulty + 1).join("a"))
            this.nonce++
            this.hash = this.caculateHash()
        }
        console.log("Block mined: ", this.hash)
    }

}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.pendingTransactions = []
        this.miningReward = 100
    }
    createGenesisBlock() {
        return new Block('01/01/2017', `Genesis block`, '0')
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash
    //     newBlock.mineBlock(this.difficulty)
    //     //newBlock.hash = newBlock.caculateHash()
    //     this.chain.push(newBlock)
    // }
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
        console.log("Erilce: Block successfuly mined")
        this.chain.push(block)

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction)
    }
    getBalanceOfAddress(address) {
        let balance = 0
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if (currentBlock.hash !== currentBlock.caculateHash()) {
                return false
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true
    }
}
let savjeeCoin = new BlockChain()

savjeeCoin.createTransaction(new Transaction("address1", "address2", 100))
savjeeCoin.createTransaction(new Transaction("address2", "address1", 50))

console.log("\n Starting the miner...")
savjeeCoin.minePendingTransactions('xaviers-address')
console.log('\n Balance of xaviers is ', savjeeCoin.getBalanceOfAddress('xaviers-address'))

console.log("\n Starting the miner again 1...")
savjeeCoin.minePendingTransactions('xaviers-address')
// console.log('\n Balance of xaviers is ', savjeeCoin.getBalanceOfAddress('xaviers-address'))

// console.log("\n Starting the miner again 2...")
// savjeeCoin.minePendingTransactions('xaviers-address')
// console.log('\n Balance of xaviers is ', savjeeCoin.getBalanceOfAddress('xaviers-address'))

console.log("Ericle check savjeeCoin: ", JSON.stringify(savjeeCoin, null, 4))