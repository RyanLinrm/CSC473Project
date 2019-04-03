/** @type {import { "../typing/phaser" };} */

let game = new Phaser.Game({
    type: Phaser.AUTO,
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
    }
});

function preload(){

};

function create(){
    this.socket = io();

    this.socket.on("connection",(players)=>{
        //InitialPlayerConnection
        //Going to map each player in players into a sprite and place them in proper position on the screen
    });

    this.socket.on("newPlayer",(player)=>{
        //New player Joined the game
        //Add player to the postiion 
    });

    this.socket.on("playerDisconnect",()=>{
        //A player has disconnnected handle logic towards that
        //In this game it may be good to replace the player with a bot. 
    });
};

function update(){

};