class World {
    constructor() {
        this.chunkSize = chunkSize;
        this.renderDistance = renderDistance;
        this.seed = seed;
        this.loadedChunks = new Map();
    }

    loadChunk(playerX, playerZ) {
        const chunkX = Math.floor(playerX / this.chunkSize);
        const chunkZ = Math.floor(playerZ / this.chunkSize);
    
        const startChunkX = chunkX - this.renderDistance;
        const endChunkX = chunkX + this.renderDistance;
        const startChunkZ = chunkZ - this.renderDistance;
        const endChunkZ = chunkZ + this.renderDistance;
    
        for (let x = startChunkX; x <= endChunkX; x++) {
            for (let z = startChunkZ; z <= endChunkZ; z++) {
                const chunkKey = `${x},${z}`;
    
                if (!this.loadedChunks.has(chunkKey)) {
                    const newChunk = new Chunk(x, z, this.chunkSize, this.seed);
                    this.loadedChunks.set(chunkKey, newChunk);
                    console.log(`Loaded chunk at (${x}, ${z}) with seed: ${this.seed}`);
                }
            }
        }
    }

    unloadChunk(playerX, playerZ) {
        const playerChunkX = Math.floor(playerX / this.chunkSize);
        const playerChunkZ = Math.floor(playerZ / this.chunkSize);
    
        for (let [key, chunk] of this.loadedChunks) {
            const [chunkX, chunkZ] = key.split(',').map(Number);
    
            const distance = Math.abs(chunkX - playerChunkX) + Math.abs(chunkZ - playerChunkZ);
    
            if (distance > this.renderDistance) {
                this.loadedChunks.delete(key);
                console.log(`Unloaded chunk at (${chunkX}, ${chunkZ})`);
            }
        }
    }
    
    updateWorld(playerX, playerZ) {
        this.loadChunk(playerX, playerZ);
        this.unloadChunk(playerX, playerZ);
    }
}