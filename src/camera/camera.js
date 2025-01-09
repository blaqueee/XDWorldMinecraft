class Camera {
    constructor() {
        this.camera = Module.getViewCamera();
    }

    init(lon, lat, alt) {
        console.log(lon, lat, alt);
        this.camera.setTraceActive(true);
        this.camera.setLocation(new Module.JSVector3D(lon, lat, alt));
        this.camera.setTilt(10);
        this.camera.setDirect(50);
        this.camera.setFov(90);
    }

    move(position, tilt, direct, speed) {
        this.camera.move(new Module.JSVector3D(
                position.lon,
                position.lat,
                position.alt,
            ),
            tilt,
            direct,
            speed
        );
    }
}