import Phaser from 'phaser';
export class Bullet extends Phaser.GameObjects.Image {
    constructor(scene){
        super(scene,0,0);

        this.setTexture('shoot1').setScale(0.2);
        this.speed = 1;
        this.angle = 0;
        this.xSpeed = 1;
        this.ySpeed = 1;
        this.timeAlive = 0;
        
    }

    shoot(shooter,mouseX,mouseY){
        this.timeAlive = 0;
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
        
        //Shoots in the direciton the player is facing. 
            this.xSpeed = this.speed * Math.sign(shooter.nonZeroVelocity.x); 
            this.ySpeed = this.speed * Math.sign(shooter.nonZeroVelocity.y);
       
        if(this.timeAlive > 2000){
            this.setActive(false);
            this.setVisible(false);
        }
    
    }

    update(time,delta){
        this.timeAlive += delta;
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        
        if(this.timeAlive > 2000){
            this.setActive(false);
            //this.setVisible(false);
        }
    }

}