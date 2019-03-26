

export class Bullet extends Phaser.GameObjects.Image {
    constructor(scene){
        
        super(scene,0,0);

        this.setTexture('Magic_01.png');
        this.speed = 10;
        this.xSpeed = 1;
        this.ySpeed = 1;
        this.timeAlive = 0;
        
    }

    shoot(shooter){
        this.setActive(true);
        this.setVisible(true);
        
        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
    }

    update(time,delta){
        this.timeAlive += delta;
        console.log("Hello");
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta; 

        if(this.timeAlive > 2000){
            this.setActive(false);
            this.setVisible(false);
        }
    }

}