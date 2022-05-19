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
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.caculateHash()
        }
        console.log("Block mined: ", this.hash)
    }

}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }
    createGenesisBlock() {
        return new Block(0, '19/5/2022', `Uncle Ho's birthday`, '0')
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.caculateHash()
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
savjeeCoin.addBlock(new Block(1, '20/5/2022', { amount: 5 }))
savjeeCoin.addBlock(new Block(2, '21/5/2022', { amount: 10 }))

console.log(JSON.stringify(savjeeCoin, null, 3))
console.log("Ericle check BlockChain is valid?: ", savjeeCoin.isChainValid())

savjeeCoin.chain[1].data = { amount: 4 }
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].caculateHash()

console.log("Ericle check BlockChain is valid?: ", savjeeCoin.isChainValid())
console.log(JSON.stringify(savjeeCoin, null, 3))