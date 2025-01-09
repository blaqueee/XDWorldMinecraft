class Player {
    constructor(spawn) {
        this.camera = new Camera();
        this.camera.init(spawn.longitude, spawn.latitude, maxHeight * blockSizeMeters);
    }
}