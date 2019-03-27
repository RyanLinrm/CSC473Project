/** @type {import { "../typing/phaser" };} */

let game = new Phaser.Game({
    type: Phaser.AUTO,
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
    }
});

function preload(){

};

function create(){
    this.socket = io();
};

function update(){

};