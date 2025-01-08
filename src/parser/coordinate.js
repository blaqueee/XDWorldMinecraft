class Coordinate {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getRealCoords() {
        const [minLon, minLat, maxLon, maxLat] = bbox;
    
        // Scale the x and z coordinates to the bounding box (min/max longitude and latitude)
        const relX = this.x / scaleFactorX; // Adjust x based on longitude scale factor
        const relZ = 1.0 - (this.z / scaleFactorZ); // Adjust z based on latitude scale factor, invert z if necessary
    
        // Calculate longitude and latitude based on bounding box
        const lon = minLon + relX * (maxLon - minLon); // Scale to longitude range
        const lat = minLat + relZ * (maxLat - minLat); // Scale to latitude range
        
        // Calculate height based on y-coordinate and scale factor
        const height = this.y * scaleFactorY + offsetY; // Apply scale and offset for height
    
        return { latitude: lat, longitude: lon, height: height };
    }
    

}