
import Phaser from 'phaser';
import { CST } from "../CST";
export class PlayScene extends Phaser.Scene{

    constructor(sceneKey = CST.SCENES.GAMEOVER){
        super({key:sceneKey});
    }
}