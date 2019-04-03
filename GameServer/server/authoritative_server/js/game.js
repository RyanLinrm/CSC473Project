

/** @type {import { "../typing/phaser" };} */



let game = new Phaser.Game({
    type: Phaser.HEADLESS,
    parent: 'phaser-example',
    width:1280,
    height:720,
    autoCenter:Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene:{
        preload:preload,
        create: create,
        update: update
    },
    render:{
        pixelArt: true
    },
    autoFocus: false
});

function preload(){
   
}


function create(){
    //socket.io connection 
    this.players = {};


   io.on('connection',(socket)=>{
      

       //add player 
        this.players[socket.id] = {
            id: socket.id,
            x:0,
            y:0,
            rotation:0
        }
        socket.emit("connection",this.players);
        socket.broadcast.emit("newPlayer",this.players[socket.id]);

       socket.on('disconnect',()=>{
            console.log("user disconnect");
            delete this.players[socket.id];
            io.emit("playerDisconnet");
       });
   });

}

function update(){
  
}

window.gameLoaded();