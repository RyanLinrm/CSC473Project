//Play scene for our basic playground
//All the functions and character added in this file will be temporary
//just for demo
//Use scene list to generate keyword
import { CST } from "../CST";
export class PlayScene extends Phaser.Scene{
    
    constructor(){
        super({key:CST.SCENES.PLAY});
    }

    init(){

    }

    preload(){ 
    }

    create(){
        //create phaser game object, and add in sprite
        let magic = Phaser.GameObjects.sprite = this.physics.add.sprite(400, 400, "magic", "Magic_01.png");

        let wolf = Phaser.GameObjects.sprite = this.physics.add.sprite(300, 300, "wolf", "Wolf_01.png" );

        
        //create animations for different directions 
        
        this.anims.create({
            key: "down",
            frameRate: 8,
            //walking downward animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:1, end:4, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key:'left', 
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:5, end:8, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key:'right', 
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:9, end:12, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key:'up',
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:13, end:16, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });

        //input and phyics
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

    }

    update(time,delta) {
        
        //key control
        
        if(this.keyboard.W.isDown){
            magic.setVelocityY(-64);
            magic.play("up", true);
        }
        if(this.keyboard.S.isDown){
            magic.setVelocityY(64);
            magic.play("down", true);
        }
        if(this.keyboard.A.isDown){
            magic.setVelocityX(-64);
            magic.play("left", true);
        }
        if(this.keyboard.D.isDown){
            magic.setVelocityX(64);
            magic.play("right", true);
        }
        if(this.keyboard.W.isUp && this.keyboard.S.isUp){
            magic.setVelocityY(0);

        }
        if(this.keyboard.A.isUp && this.keyboard.D.isUp){
            magic.setVelocityX(0);

        }
    
    }

}