import Phaser from 'phaser';
import { Bullet } from "../gameObjects/Projectiles";
import { emptyBar, HpBar, ManaBar } from "./StatusBar";
export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,target,enemyID=null,healthPoints = 50,attackRate=1000,ATK=20,attackRange=180){
        super(scene,x,y,key,textureName,target);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.addbBullet(this.scene);
        this.setOrigin(0,0);
        this.enemyID=enemyID;
        scene.updateSprite(this); 
        this.createAttack(scene);
        //enable body in physics game
        scene.physics.world.enableBody(this);
        this.beingAttacked=false;
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

    takeDamage(damage){
        this.healthPoints = this.healthPoints - damage;
       
        if( this.healthPoints <= 0 ){
            this.kill();
        }
    }
    
    collision(){
        this.takeDamage(20);
        this.beingAttacked=true;

    
    }
    isInjured(time){
        if(this.beingAttacked===true){
            this.tint=0xff0000;
            this.count=time;
        }
        else{
            if(time>this.count+1000)
            {this.tint=0xffffff;}

        }
    }


    createAttack(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.basicattack = (target)=>{
            //console.log("this");
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.shoot(this,target,true);
            bullet.setTexture('shoot3').setScale(0.7).setSize(32,30);
        };

        this.removeDefense = ()=>{ //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };    

    }

    enemymovement(){
        //movement for wolf
        if(this.enemyID===0){
            if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                this.play('wolf_down',true);
            }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                this.play('wolf_right',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                this.play('wolf_left',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                this.play('wolf_up',true);
        
            }
        }
        //movement for ninjabot
        if(this.enemyID===1){
            if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                this.play('ninjabot_down',true);
            }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                this.play('ninjabot_right',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                this.play('ninjabot_left',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                this.play('ninjabot_up',true);
        
            }
        }
    }

    update(time, delta){
        this.isInjured(time);
        this.beingAttacked=false;
        //We can add a check so if the enemy is within a certain distance of a player it can launch an attack.
        this.enemymovement();
        this.moveEnemy();
    
        this.body.velocity.x=this.body.velocity.x;
        this.body.velocity.y=this.body.velocity.y;
        if (Math.abs(this.scene.player.x - this.x) < this.attackRange && Math.abs(this.scene.player.y - this.y) < this.attackRange){
            
            let distance = Math.sqrt(Math.pow(this.scene.player.x - this.x, 2) + Math.pow(this.scene.player.y - this.y, 2));
            let vX = (this.scene.player.x - this.x)/distance;
            let vY = (this.scene.player.y - this.y)/distance;
            this.basicattack({x: vX - this.body.velocity.x ,y: vY - this.body.velocity.y});
        }
    }

    
}