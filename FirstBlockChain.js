const SHA256 = require('crypto-js/sha256')
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.caculateHash()
        this.nonce = 0
    }
    caculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("a")) {
            console.log("Ericle check this.hash.substring - Array.join: ", Array(difficulty + 1).join("a"))
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
    }
    createGenesisBlock() {
        return new Block(0, '19/5/2022', `Uncle Ho's birthday`, '0')
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        //newBlock.hash = newBlock.caculateHash()
        this.chain.push(newBlock)
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

console.log('Mining block 1......')
savjeeCoin.addBlock(new Block(1, '20/5/2022', { amount: 5 }))

console.log('Mining block 2......')
savjeeCoin.addBlock(new Block(1, '20/5/2022', { amount: 5 }))

//5console.log(JSON.stringify(savjeeCoin, null, 3))


