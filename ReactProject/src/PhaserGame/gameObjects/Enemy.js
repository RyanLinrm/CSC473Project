import Phaser from 'phaser';
import { Bullet } from "../gameObjects/Projectiles";
export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,target,healthPoints = 50,attackRate=1000,ATK=20,attackRange=500){
        super(scene,x,y,key,textureName,target);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.addbBullet(this.scene);
        this.setOrigin(0,0);

        //enable body in physics game
        scene.physics.world.enableBody(this);

        //Health
        this.healthPoints = healthPoints;
        

        //Attack Speed
        this.attackRate = attackRate;
        this.nextAttack = 0;

        //Attack power
        this.ATK = ATK;
     
        //Attack Range
        //this.distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
        this.attackRange=attackRange;

        //setup the movement of the enemy
        this.setupMovement(scene,target);
        this.setVisible = false;

        //scene.updateSprite(this);

        
    }

    setupMovement(scene,target){
        //sets up the movement funciton that is called by the update method.
        this.moveEnemy = () =>{
            scene.physics.moveToObject(this, target);
            //console.log(this);
            
        };
    }

    kill(){
     
        this.destroy();
        
    }
    addbBullet(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});
        this.attack = ()=>{
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.shoot(this,this.nonZeroVelocity);
    }
}

    basicAttack(){
        //Add an attack ability.  
         //    if(this.distance<=this.attackRange){
            this.attack();

        
    }

    

    takeDamage(damage){
        this.healthPoints = this.healthPoints - damage;
       
        if( this.healthPoints <= 0 ){
            this.kill();
        }
    }

    update(time, delta){
        //We can add a check so if the enemy is within a certain distance of a player it can launch an attack.
        //this.moveEnemy(); remove comment to test moving enemy
        //this.basicAttack();
    }

    collision(){
        this.takeDamage(20);
    }
}