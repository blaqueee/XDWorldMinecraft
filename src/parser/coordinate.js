class Coordinate {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getRealCoords() {
        const [minLon, minLat, maxLon, maxLat] = bbox;

        const relX = this.x / scaleFactorX;
        const relZ = 1.0 - (this.z / scaleFactorZ);

        const lon = minLon + relX * (maxLon - minLon);
        const lat = minLat + relZ * (maxLat - minLat);
        const height = this.y * scaleFactorY + offsetY;
        
        return { latitude: lat, longitude: lon, height: height };
    }

}