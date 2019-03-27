/** @type {import { "../typing/phaser" };} */

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";

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
    scene:[
       LoadScene,MenuScene,PlayScene
    ],
    render:{
        pixelArt: true
    }
});

