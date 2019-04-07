import Phaser from 'phaser';
export class Bullet extends Phaser.GameObjects.Image {
    constructor(scene,speed=1){
        super(scene,0,0);

        //this.setTexture('shoot1').setScale(0.15).setSize(32,30);
        this.setTexture('shoot3').setScale(0.7).setSize(45,40);
        this.speed=speed;
        this.angle = 20;
        this.xSpeed = 1;
        this.ySpeed = 1;
        this.timeAlive = 0;
        
    }
    //111

    shoot(shooter,velocity){
        this.timeAlive = 0;
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
        
        //Shoots in the direciton the player is facing. 
            this.xSpeed = this.speed * Math.sign(velocity.x); 
            this.ySpeed = this.speed * Math.sign(velocity.y);
       
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

export class Bomb extends Phaser.GameObjects.Image {
    constructor(scene){
        super(scene,0,0);

        this.setTexture('shoot2').setSize(32,30);
        this.timeAlive = -1;

        this.scene = scene;
        
    }

    place(shooter){
        this.timeAlive = 0;
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
    
    }

    explode(scene){
        let bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});
        let velocityArray = [{x:1,y:1},{x:-1,y:1},{x:1,y:-1},{x:-1,y:-1},{x:0,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}];
        velocityArray.forEach((v)=>{
            let bullet = bullets.get();
            bullet.speed=1;
            scene.children.add(bullet);
            bullet.shoot(this,v);
        });

            this.setActive(false);
            this.setVisible(false);
    }

    update(time,delta){
        if(this.timeAlive >= 0)
            this.timeAlive += delta;
  
        
        if(this.timeAlive > 3000){
            this.explode(this.scene);
            this.timeAlive = -1;
        }
    }

}

export class Posion extends Phaser.GameObjects.Image {
    constructor(scene){
        super(scene,0,0);

        this.setTexture('shoot2').setSize(32,30);
        this.timeAlive = -1;

        this.scene = scene;
        
    }

    place(shooter){
        this.timeAlive = 0;
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
    
    }

    explode(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});
        let velocityArray = [{x:0,y:-1},{x:1,y:-1},{x:-1,y:-1}];
        velocityArray.forEach((v)=>{
            let bullet = this.bullets.get();
            bullet.speed=0.05;
            scene.children.add(bullet);
            bullet.shoot(this,v);
        });

            this.setActive(false);
            this.setVisible(false);
    }

    update(time,delta){
        this.timeAlive += delta;
        this.explode(this.scene);
        if(this.timeAlive > 2000){
            this.bullets.setActive(false);
            this.bullets.destroy();
            this.bullets.setVisible(false);
        };
    }
}

