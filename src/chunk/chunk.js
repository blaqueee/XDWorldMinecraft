class Chunk {
    constructor(chunkX, chunkZ, chunkSize, seed) {
        this.chunkX = chunkX;
        this.chunkZ = chunkZ;
        this.chunkSize = chunkSize;
        this.seed = seed;
        this.blocks = [];
        this.generateBlocks();
    }

    random(x, y, z) {
        const hash = (x + y * 57 + z * 131) + this.seed;
        return Math.abs(Math.sin(hash) * 10000 % 1);
    }
    

    generateBlocks() {
        for (let x = 0; x < this.chunkSize; x++) {
            for (let z = 0; z < this.chunkSize; z++) {
                for (let y = 0; y < maxHeight; y++) {
                    const blockType = this.getBlockType(x, y, z);
                    if (blockType === 'air') continue;
                    var block = new Block(x, y, z, blockType);
                    this.blocks.push(block);
                }
            }
        }
    }

    getBlockType(x, y, z) {
        const noise = this.random(this.chunkX * this.chunkSize + x, y, this.chunkZ * this.chunkSize + z);
    
        const stoneHeight = 12 + noise * 5;
        const dirtHeight = 16 + noise * 2;
    
        if (y < stoneHeight) {
            return "stone";
        } else if (y < dirtHeight) {
            return "dirt";
        } else {
            return "air";
        }
    }
    

    getBlocks() {
        return this.blocks;
    }
}