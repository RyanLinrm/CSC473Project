import Phaser from 'phaser';
import { CST } from "../CST";
import {generate} from 'randomstring';

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(){

    }

    create(){
        //add Main menu image
      
        let a = this.add.image(0, 0, "key1").setOrigin(0.5, 0.5).setDepth(0);
        a.setScale(2,2);
        a.x = window.innerWidth/2 ;
        a.y = window.innerHeight/2 ;
        console.log(a);
        //add Start Button image

        let startButton =
            this.add.image(this.game.renderer.width / 2,
                this.game.renderer.height / 2 + 225, "PlayButton").setDepth(1);

        let multiplayerStartButton =
            this.add.image(this.game.renderer.width / 2,
                this.game.renderer.height / 2 + 300, "MultiplayerButton").setDepth(1);


        //add background music
        //let bgmusic = this.sound.add("menuMusic");
      //  bgmusic.play();


        let buttonCursor = this.add.image(100, 100, "cursor");
        buttonCursor.setScale(0.03);
        buttonCursor.setVisible(false);

        
        startButton.setInteractive();
        multiplayerStartButton.setInteractive();

        startButton.on("pointerover", ()=>{
            buttonCursor.setVisible(true);
            buttonCursor.x = startButton.x - 60;
            buttonCursor.y = startButton.y;
        });

        multiplayerStartButton.on("pointerover", ()=>{
            buttonCursor.setVisible(true);
            buttonCursor.x = multiplayerStartButton.x - 180;
            buttonCursor.y = multiplayerStartButton.y;
        });

        startButton.on("pointerout", ()=>{
            buttonCursor.setVisible(false);
        });

        multiplayerStartButton.on("pointerout", ()=>{
            buttonCursor.setVisible(false);
        });



        this.startSingleplayer = () => this.scene.start(CST.SCENES.CHAR);
        this.startMultiplayer = () => this.scene.start(CST.SCENES.MULTIPLAYERCHARSELECT);

  

    }
}