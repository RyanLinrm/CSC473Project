import Phaser from 'phaser';
export class Bullet extends Phaser.GameObjects.Image {
    constructor(scene,speed=1,parent='233',shootRange){
        if(speed === 0)
            speed = 1;
        super(scene,0,0,speed);
        this.setTexture('shoot1').setScale(0.15).setSize(32,30);
        this.speed=speed;
        this.angle = 20;
        this.xSpeed = speed;
        this.ySpeed = speed;
        this.timeAlive = 0;
        this.shootRange=200;
    }


    collision(){
        this.setActive(false);
        this.setVisible(false);
    }

    shoot(uid,shooter,velocity,exactDirection = false){
        this.uid = uid;
        this.timeAlive = 0;
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
        
        //Shoots in the direciton the player is facing. 
        if(!exactDirection){
            this.xSpeed = this.speed * Math.sign(velocity.x); 
            this.ySpeed = this.speed * Math.sign(velocity.y);
        }
        else{
            this.xSpeed = this.speed * velocity.x; 
            this.ySpeed = this.speed * velocity.y;   
        } 
       
        if(this.timeAlive > 2000){
            this.setActive(false);
            this.setVisible(false);
        }
    
    }
    

    update(time,delta){
        this.timeAlive += delta;
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        
        //just modified for rider's poison
        if(this.timeAlive > this.shootRange){
           // this.destroy();
            this.setActive(false);
            this.setVisible(false);
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

    place(shooter,uid){
        this.uid=uid;
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
            bullet.setTexture('shoot3').setScale(0.4).setSize(32,30);
            //scene.children.add(bullet);
            scene.damageItems.add(bullet);
            bullet.shoot(this.uid,this,v);
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
        this.timeAlive = -1;
        this.scene = scene;      
    }

    place(shooter,uid){
        this.uid=uid;
        this.timeAlive = 0;
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
        this.explode(this.scene);
    }

    explode(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});
        let velocityArray = [{x:0,y:-1},{x:1,y:-1},{x:-1,y:-1}];
        velocityArray.forEach((v)=>{
            let bullet = this.bullets.get();
            bullet.speed=0.03;
            bullet.shootRange=2000;
            bullet.setTexture('shoot4').setScale(0.3).setSize(45,40);
            //scene.children.add(bullet);
            scene.damageItems.add(bullet);
            bullet.shoot(this.uid,this,v);
        });


            this.setVisible(false);
    }

    update(time,delta){
        this.timeAlive += delta;
        if(this.timeAlive > 4000){
    
          this.bullets.getChildren().map(child => child.destroy());
         // this.bullets.clear(true);
        };
    }
}


export class sword extends Phaser.GameObjects.Image {
    constructor(scene){
        super(scene,0,0);
        this.timeAlive = -1;
        this.scene = scene;      
    }
        shoot(shooter,velocity){
            this.timeAlive = 0;
            this.setActive(true);
            this.setVisible(true);
            this.speed=0.01;
            this.setPosition(shooter.x+40,shooter.y+60);
            this.setAngle(shooter.body.rotation);
            this.setTexture('shoot1').setScale(0.5).setSize(45,40);
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
        if(this.timeAlive > 0){
          this.setVisible(false);
          this.setActive(false);
          //this.destroy();
          //this.bullets.clear(true);
          //this.bullets.getChildren().map(child => child.destroy());
        };
    }
}