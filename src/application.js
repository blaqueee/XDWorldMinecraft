
var Module = {

    locateFile : function(s) {
        return "https://cdn.xdworld.kr/latest/"+ s;
    },
    postRun: function() {

        // Call engine initialization API(essential)
        Module.initialize({
            container: document.getElementById("map"),
            terrain : {
                dem : {
                    url : "https://xdworld.vworld.kr",
                    name : "dem",
                    servername : "XDServer3d",
                    encoding : true
                },
                image : {
                    url : "https://xdworld.vworld.kr",
                    name : "tile",
                    servername : "XDServer3d"
                }
            },
            worker : {
                use : true,
                path : "../worker/XDWorldWorker.js",
                count : 5
            },
            defaultKey : "DFG~EpIREQDmdJe1E9QpdBca#FBSDJFmdzHoe(fB4!e1E(JS1I=="
        });

        var player = new Player(new Coordinate(0, 0, 0));

        var world = new World();
        world.updateWorld(player);

    }
};