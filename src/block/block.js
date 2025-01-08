class Block {

    constructor(x, y, z, type) {
        if (x instanceof Coordinate) {
            this.coordinate = x;
            this.type = y;
        } else {
            this.coordinate = new Coordinate(x, y, z);
            this.type = type;
        }
    }

    convertToRealCoords(x, y, z) {
        var coordinate = new Coordinate(x, y, z);
        return coordinate.getRealCoords();
    }
    
    
    
    
    getCorners() {
        const offsets = [
            [-blockHalfSize, -blockHalfSize], // Bottom-left
            [blockHalfSize, -blockHalfSize],  // Bottom-right
            [blockHalfSize, blockHalfSize],   // Top-right
            [-blockHalfSize, blockHalfSize],  // Top-left
        ];
    
        const baseCoords = this.coordinate;
    
        // Compute corners based on offsets
        const corners = offsets.map(([offsetX, offsetZ]) => {
            const cornerX = baseCoords.x + offsetX / blockSizeMeters;
            const cornerZ = baseCoords.z + offsetZ / blockSizeMeters;
    
            return this.convertToRealCoords(cornerX, baseCoords.y, cornerZ);
        });
    
        console.log(corners);
        return corners;
    }
    
    
}