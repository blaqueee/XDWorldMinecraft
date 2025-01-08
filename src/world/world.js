class World {
    constructor() {
        this.chunkSize = chunkSize;
        this.renderDistance = renderDistance;
        this.seed = seed;
        this.loadedChunks = new Map();
        this.layerList = new Module.JSLayerList(true);
        this.layer = this.layerList.createLayer('world', Module.ELT_POLYHEDRON);
        this.layer.setMinDistance(0);
        this.layer.setMaxDistance(1000000);
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

                    if (this.spawn === null || this.spawn === undefined) {
                        this.spawn = newChunk.blocks[0].getCorners()[0];
                    }

                    newChunk.blocks.forEach((block) => {
                        var coordinates = block.getCorners();
                        var polygon = Module.createPolygon(`${block.x} - ${block.y} - ${block.z}`);
                        var vertex = new Module.JSVec3Array();
                        var part = new Module.Collection();

                        coordinates.forEach((coordinate) => {
                            vertex.push(new Module.JSVector3D(coordinate.longitude, coordinate.latitude, coordinate.height));
                        });

                        part.add(coordinates.length);
                        polygon.setPartCoordinates(vertex, part);
                        polygon.setHeight(blockSizeMeters);
                        
                        var polygonStyle = new Module.JSPolygonStyle();
                        polygonStyle.setFill(true);
                        polygonStyle.setFillColor(new Module.JSColor(255, 0, 0));
                        polygon.setStyle(polygonStyle);

                        this.layer.addObject(polygon, 0);
                    });
                    
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