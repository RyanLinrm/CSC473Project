import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";

/** @type {import { "../typing/phaser" };} */

let game = new Phaser.Game({
    type: Phaser.AUTO,
    width:800,
    height:600,
    scene:[
        LoadScene,MenuScene
    ]
});