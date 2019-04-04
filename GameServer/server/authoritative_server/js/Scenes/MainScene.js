"use strict";
export class MainScene extends Phaser.Scene{
    constructor(){
        super({key:"MainScene"});
    }

    preload(){

    }

    create(){
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
                 io.emit("playerDisconnect",socket.id);
            });
        });
    }

    update(){

    }
}