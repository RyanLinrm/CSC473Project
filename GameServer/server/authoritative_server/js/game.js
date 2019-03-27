

/** @type {import { "../typing/phaser" };} */

let game = new Phaser.Game({
    type: Phaser.HEADLESS,
    parent: 'phaser-example',
    width:800,
    height:600,
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
   io.on('connection',(socket)=>{
       console.log("User connect");

       socket.on('disconnect',()=>{
            console.log("user disconnect");
       });
   });

}

function update(){
  
}

window.gameLoaded();