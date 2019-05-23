import Phaser from 'phaser';
    /**
     * The Bullet class.
     * The class where the properties of the bullets are generated.
     * Including player shooting, enemy and tower shooting.
     */
export class Bullet extends Phaser.GameObjects.Image {
     /**
     * 
     * sets up the bullets object. In the case of our project, the bullets that players,
     * enemies and towers shoot out.
     * Prepare the behavior and properties of bullets that are used.
     * 
     * @param {Phaser.Scene} scene - The Scene that the Enemy is going to be in
     * @param {number} speed- The speed that the bullet is shot
     * @param {string} parent - The ower of the bullet
     * @param {number} shootRange - The time that the bullet will last
     */
    constructor(scene,speed=1,parent='233',shootRange){
        if(speed === 0)
            speed = 1;
        super(scene,0,0,speed);
        this.setTexture('shoot1').setScale(0.15).setSize(32,30);
        this.speed=speed;
        this.angle = 20;
        /**
         * The x-axis shooting speed of the bullet
         * 
         * @name Bullet#xSpeed
         * @type number
         */
        this.xSpeed = speed;
        /**
         * The y-axis shooting speed of the bullet
         * 
         * @name Bullet#ySpeed
         * @type number
         */
        this.ySpeed = speed;
        /**
         * The initial time that the bullet is alive
         * 
         * @name Bullet#timeAlive
         * @type number
         */
        this.timeAlive = 0;
        this.shootRange=200;
    }

    /**
     * collision function that is called when a collision occurs to the bullet. 
     * Set the bullet's status to not active and not visible
     */
    collision(){
        this.setActive(false);
        this.setVisible(false);
    }
    /**
     * Set up the shooter and target of the shooting progress
     * Provide who and where to shoot the bullet 
     * And perform the shooting.
     * @param {string} uid - the uid of the owner that shoots the bullet
     * @param {object} shooter - the one who shoots the bullet 
     * @param {number} velocity - the velocity of the bullets
     * @param {boolean} exactDirection - the boolean value to detect whether it is a exact direction
     */
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
    
   /**
    * update method that gets called by the playscene 60 times a second
    * keep track of the actions of the bullet until it is not available
    * 
    * @param {number} delta - the delta time that gets passed by Phaser when update is called
    */
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
    /**
     * The bomb class.
     * The child class of the bullet class where the properties of the special bullets bombs are generated.
     * This bomb class provides the bullets that the bomber will use
     */
export class Bomb extends Phaser.GameObjects.Image {
    constructor(scene){
        super(scene,0,0);

        this.setTexture('shoot2').setSize(32,30);
        this.timeAlive = -1;

        this.scene = scene;
        
    }
   /**
    * Function to set up the bomb that the bomber put into the scene
    * Which will later be exploded by the explode function
    * 
    * @param {object} shooter - the shooter who put the bomb
    * @param {string} uid - the uid of the shooter
    */
    place(shooter,uid){
        this.uid=uid;
        this.timeAlive = 0;
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(shooter.x,shooter.y);
        this.setAngle(shooter.body.rotation);
    
    }
  /**
    * Function to explode bomb that the bomber put into the scene
    * Which is basically create and shoot bullets in 8 directions of the shooter
    * 
    * @param {Phaser.scene} scene - the scene that the shooter and the bomb is in
    */
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
   /**
    * update method that gets called by the playscene 60 times a second
    * Set up and execute the bomb. First the bomber put the bomb and 
    * after 3 seconds the bomb will exploded and become bullets.
    * 
    * @param {number} delta - the delta time that gets passed by Phaser when update is called
    */
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