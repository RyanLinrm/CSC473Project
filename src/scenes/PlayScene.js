//Play scene for our basic playground
//All the functions and character added in this file will be temporary
//just for demo
//Use scene list to generate keyword
import { CST } from "../CST";
import { Units } from "../Units";
export class PlayScene extends Phaser.Scene{
    constructor(){
        super({key:CST.SCENES.PLAY});
    }

    preload(){ 
    }

    create(){
        //create phaser game object, and add in sprite
        this.player = this.physics.add.sprite(400, 400, "magic", "Magic_01.png" );
        this.angle=new Units(this,200,150,"angle","angle_01.png");
        this.wolf = this.physics.add.sprite(300, 300, "wolf", "Wolf_01.png" );

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
     
        let collider = this.physics.add.overlap(this.wolf, this.player, (overlaped) =>{
            overlaped.body.stop();
            this.player.destroy();
            this.physics.world.removeCollider(collider);
        }, null, this);

    }

    update(time,delta) {
        
        //key control
        //movement note: we should only be able to move our character when it is alive
        this.physics.moveToObject(this.wolf, this.player);
        this.physics.moveToObject(this.angle, this.player);

        if(this.player.active === true){
            if(this.keyboard.W.isDown){
                this.player.setVelocityY(-64);
                this.player.play("up", true);
            }
            if(this.keyboard.S.isDown){
                this.player.setVelocityY(64);
                this.player.play("down", true);
            }
            if(this.keyboard.A.isDown){
                this.player.setVelocityX(-64);
                this.player.play("left", true);
            }
            if(this.keyboard.D.isDown){
                this.player.setVelocityX(64);
                this.player.play("right", true);
            }
            if(this.keyboard.W.isUp && this.keyboard.S.isUp){
                this.player.setVelocityY(0);

            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp){
                this.player.setVelocityX(0);

            }
        }
    }

}