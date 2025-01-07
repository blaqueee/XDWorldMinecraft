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

    convertToRealCoords(x, y, z, bbox, scaleFactorX, scaleFactorZ, scaleFactorY) {
        const [minLon, minLat, maxLon, maxLat] = bbox;
    
        const relX = x / scaleFactorX;
        const relZ = 1.0 - (z / scaleFactorZ);

        const lon = minLon + relX * (maxLon - minLon);
        const lat = minLat + relZ * (maxLat - minLat);
    
        const relY = y / scaleFactorY;
        const height = minHeight + relY * (maxHeight - minHeight);
    
        return { latitude: lat, longitude: lon, height: height };
    }

    getCorners() {
        const corners = [
            this.convertToRealCoords(
                this.coordinate.x - blockHalfSize, 
                this.coordinate.y, 
                this.coordinate.z - blockHalfSize, 
                bbox, scaleFactorX, scaleFactorZ, scaleFactorY), // Bottom-left
    
            this.convertToRealCoords(
                this.coordinate.x + blockHalfSize, 
                this.coordinate.y, 
                this.coordinate.z - blockHalfSize, 
                bbox, scaleFactorX, scaleFactorZ, scaleFactorY), // Bottom-right
    
            this.convertToRealCoords(
                this.coordinate.x + blockHalfSize, 
                this.coordinate.y, 
                this.coordinate.z + blockHalfSize, 
                bbox, scaleFactorX, scaleFactorZ, scaleFactorY), // Top-right
    
            this.convertToRealCoords(
                this.coordinate.x - blockHalfSize, 
                this.coordinate.y, 
                this.coordinate.z + blockHalfSize, 
                bbox, scaleFactorX, scaleFactorZ, scaleFactorY) // Top-left
        ];

        return corners;
    }
}