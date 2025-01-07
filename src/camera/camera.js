class Camera {
    constructor() {
        this.camera = Module.getViewCamera();
    }

    init(lon, lat, alt) {
        this.camera.setTraceTarget(GLOBAL.TRACE_TARGET);
        this.camera.setTraceActive(true);
        this.camera.setLocation(new Module.JSVector3D(lon, lat, alt));
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