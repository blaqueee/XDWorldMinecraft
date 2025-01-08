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
    
    getCorners() {
        return this.coordinate.getSquareCoords();
    }
    
    
}