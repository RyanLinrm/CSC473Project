
import Phaser from 'phaser';
import { CST } from "../CST";


export class GameOverScene extends Phaser.Scene{

    constructor(sceneKey = CST.SCENES.GAMEOVER){
        super({key:sceneKey});
      
    }

    init(data){
        this.playerID = data.playerID;
        this.gameRoom = data.roomkey;
        this.charType = data.charType;
        this.score = data.score
    }

    create(){
        let { width, height } = this.sys.game.canvas;
        let LosingText= this.add.text(width/2, height/2, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
        LosingText.setOrigin(0.5,0.5); 
        let dataText = this.add.text(width/2, height/2+100, `Player ID : ${this.playerID}`);
        this.add.text(width/2, height/2+150, `Your character : ${this.charType}`);
        this.add.text(width/2-40, height/2+200, `Your final score : ${this.score}`);

       
        //adding in a restart button
        let buttonCursor = this.add.image(100, 100, "cursor");
        buttonCursor.setScale(0.03);
        buttonCursor.setVisible(false);


        this.add.text(width/2, height/2+250, 'Play Again?', { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });

        let anothersingle = this.add.text(width/2-200, height/2+300, 'single player', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        anothersingle.setInteractive();

        anothersingle.on("pointerup", () => {
            this.scene.start(CST.SCENES.CHAR);
          });

        anothersingle.on("pointerover", ()=>{
            buttonCursor.setVisible(true);
            buttonCursor.x = anothersingle.x - 20;
            buttonCursor.y = anothersingle.y + 20;
        });

        anothersingle.on("pointerout", ()=>{
            buttonCursor.setVisible(false);
        });

        let anothermulti = this.add.text(width/2+200, height/2+300, 'Multiplayer', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        anothermulti.setInteractive();

        anothermulti.on("pointerup", () => {
            this.scene.start(CST.SCENES.MULTIPLAYERCHARSELECT);
          });

        anothermulti.on("pointerover", ()=>{
            buttonCursor.setVisible(true);
            buttonCursor.x = anothermulti.x - 20;
            buttonCursor.y = anothermulti.y + 20;
        });

        anothermulti.on("pointerout", ()=>{
            buttonCursor.setVisible(false);
        });

        
    }
}