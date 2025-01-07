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
        return (Math.sin(hash) * 10000 - Math.floor(Math.sin(hash) * 10000)) % 1;
    }

    generateBlocks() {
        for (let x = 0; x < this.chunkSize; x++) {
            for (let z = 0; z < this.chunkSize; z++) {
                for (let y = 0; y < 256; y++) {
                    const blockType = this.getBlockType(x, y, z);
                    var block = new Block(x, y, z, blockType);
                    console.log(block.getCorners());
                    this.blocks.push(block);
                }
            }
        }
    }

    getBlockType(x, y, z) {
        const noise = this.random(this.chunkX * this.chunkSize + x, y, this.chunkZ * this.chunkSize + z);

        if (y < 60 + noise * 20) {
            return "stone";
        } else if (y < 80 + noise * 10) {
            return "dirt";
        } else {
            return "air";
        }
    }

    getBlocks() {
        return this.blocks;
    }
}