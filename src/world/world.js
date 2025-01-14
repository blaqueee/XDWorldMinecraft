class World {
    constructor() {
        this.chunkSize = chunkSize;
        this.renderDistance = renderDistance;
        this.seed = seed;
        this.loadedChunks = new Map();
        this.layerList = new Module.JSLayerList(true);
        this.layer = this.layerList.createLayer('world', Module.ELT_POLYHEDRON);
        this.layer.setMinDistance(0);
        this.layer.setMaxDistance(130);
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

                        if (block.type === 'stone') {
                            polygonStyle.setFillColor(new Module.JSColor(89, 89, 90));
                        } else if (block.type === 'dirt') {
                            polygonStyle.setFillColor(new Module.JSColor(0, 165, 0));
                        }

                        polygon.setStyle(polygonStyle);
                        this.layer.addObject(polygon, 0);
                    });
                }
            }
        }
    }

    unloadChunk(playerX, playerZ) {
        const playerChunkX = Math.floor(playerX / this.chunkSize);
        const playerChunkZ = Math.floor(playerZ / this.chunkSize);
    
        for (let [key, chunk] of this.loadedChunks) {
            const [chunkX, chunkZ] = key.split(',').map(Number);
    
            const distanceX = Math.abs(chunkX - playerChunkX);
            const distanceZ = Math.abs(chunkZ - playerChunkZ);
    
            if (distanceX > this.renderDistance || distanceZ > this.renderDistance) {
                this.loadedChunks.delete(key);
            }
        }
    }
    
    updateWorld(player) {
        var playerX = player.position.x;
        var playerZ = player.position.z;
        this.loadChunk(playerX, playerZ);
        // this.unloadChunk(playerX, playerZ);
    }
}