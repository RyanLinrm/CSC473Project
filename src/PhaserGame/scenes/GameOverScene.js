
import Phaser from 'phaser';
import { CST } from "../CST";


export class GameOverScene extends Phaser.Scene{

    constructor(sceneKey = CST.SCENES.GAMEOVER){
        super({key:sceneKey});
      
    }

    create(){
        let { width, height } = this.sys.game.canvas;
        let countDownText= this.add.text(width/2, height/2, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
        countDownText.setOrigin(0.5,0.5); 
    }
}