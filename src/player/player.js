class Player {
    constructor(coordinate) {
        this.camera = new Camera();
        this.position = coordinate;
        var spawn = coordinate.getCenter();
        this.camera.init(spawn.longitude, spawn.latitude, maxHeight * blockSizeMeters);
    }
}