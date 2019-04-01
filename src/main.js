/** @type {import { "../typing/phaser" };} */

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";

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
    scene:[
       LoadScene,MenuScene,PlayScene
    ],
    render:{
        pixelArt: true
    }
});
scene.scene.add(unitscene, sceneConfig, autoStart);

