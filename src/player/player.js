class Player {
    constructor(coordinate) {
        this.camera = new Camera();
        this.position = coordinate;
        var spawn = coordinate.getCenter();
        this.camera.init(spawn.longitude, spawn.latitude, maxHeight * blockSizeMeters);
        this.world = new World();
        this.world.updateWorld(this);
        this.setKeyboardMoveEvent();
    }

    setKeyboardMoveEvent() {
        document.addEventListener('keydown', function(event) {
            const key = event.key.toLowerCase();
            KEYBOARD_PRESS[key] = true;
        });
    
        document.addEventListener('keyup', function(event) {
            const key = event.key.toLowerCase();
            KEYBOARD_PRESS[key] = false;
        });
    
        setInterval(() => this.renewPlayerMoving(), 20);
    }

    renewPlayerMoving() {
        var speed = playerSpeed;
        var location;

        if (KEYBOARD_PRESS.w) {
            location = this.camera.moveFrontBack(speed);
        } else if (KEYBOARD_PRESS.s) {
            location = this.camera.moveFrontBack(-speed);
        } else;
    
        if (KEYBOARD_PRESS.a) {
            location = this.camera.moveLeftRight(-speed);
        } else if (KEYBOARD_PRESS.d) {
            location = this.camera.moveLeftRight(speed);
        } else;

        if (location === null || location === undefined) {
            return;
        }

        this.position = Coordinate.fromRealCoords(location.latitude, location.longitude, location.height);
            
        this.world.updateWorld(this);

        Module.XDRenderData();
    }
}

var KEYBOARD_PRESS = {
	w: false,
	a: false,
	s: false,
	d: false,
};