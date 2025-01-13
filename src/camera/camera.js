class Camera {
    constructor() {
        this.camera = Module.getViewCamera();
    }

    init(lon, lat, alt) {
        this.camera.setTraceActive(true);
        this.camera.setLocation(new Module.JSVector3D(lon, lat, alt));
        this.camera.setTilt(10);
        this.camera.setDirect(0);
        this.camera.setFov(90);
    }

    moveFrontBack(speed) {
        this.camera.moveFrontBack(speed);
        return this.camera.getLocation();
    }

    moveLeftRight(speed) {
        this.camera.moveLeftRight(speed);
        return this.camera.getLocation();
    }

}