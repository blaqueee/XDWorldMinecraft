class Coordinate {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getSquareCoords() {
        const metersPerLonDegreeAtEquator = metersPerLatDegree;
        const metersPerLonDegree = (lat) => metersPerLonDegreeAtEquator * Math.cos((lat * Math.PI) / 180);
    
        const baseLat = 0;
        const baseLon = 0;
    
        const centerLonMeters = (this.x + 0.5) * blockSizeMeters;
        const centerLatMeters = (this.z + 0.5) * blockSizeMeters;
    
        const centerLat = baseLat + (centerLatMeters / metersPerLatDegree);
        const centerLon = baseLon + (centerLonMeters / metersPerLonDegree(baseLat));
    
        const cornerOffsets = [
            { dLat: blockHalfSize, dLon: -blockHalfSize },
            { dLat: blockHalfSize, dLon: blockHalfSize },
            { dLat: -blockHalfSize, dLon: blockHalfSize },
            { dLat: -blockHalfSize, dLon: -blockHalfSize }
        ];
    
        const corners = cornerOffsets.map(({ dLat, dLon }) => {
            const cornerLat = centerLat + (dLat / metersPerLatDegree);
            const cornerLon = centerLon + (dLon / metersPerLonDegree(centerLat));
            const height = this.y * blockSizeMeters + offsetY;
            return { latitude: cornerLat, longitude: cornerLon, height };
        });
    
        return corners;
    }


    getCenter() {
        const metersPerLonDegreeAtEquator = metersPerLatDegree;
        const metersPerLonDegree = (lat) => metersPerLonDegreeAtEquator * Math.cos((lat * Math.PI) / 180);
    
        const baseLat = 0;
        const baseLon = 0;
    
        const centerLonMeters = (this.x + 0.5) * blockSizeMeters;
        const centerLatMeters = (this.z + 0.5) * blockSizeMeters;
    
        const centerLat = baseLat + (centerLatMeters / metersPerLatDegree);
        const centerLon = baseLon + (centerLonMeters / metersPerLonDegree(baseLat));
        const height = this.y * blockSizeMeters + offsetY;
    
        return { latitude: centerLat, longitude: centerLon, height: height };
    }

    static fromRealCoords(latitude, longitude, height) {
        const metersPerLonDegreeAtEquator = metersPerLatDegree;
        const metersPerLonDegree = (lat) => metersPerLonDegreeAtEquator * Math.cos((lat * Math.PI) / 180);

        const baseLat = 0;
        const baseLon = 0;

        const centerLatMeters = (latitude - baseLat) * metersPerLatDegree;
        const centerLonMeters = (longitude - baseLon) * metersPerLonDegree(latitude);

        const x = Math.floor(centerLonMeters / blockSizeMeters - 0.5);
        const z = Math.floor(centerLatMeters / blockSizeMeters - 0.5);
        const y = Math.floor((height - offsetY) / blockSizeMeters);

        return new Coordinate(x, y, z);
    }
}