import { Bullet } from "./Projectiles";
import Phaser from 'phaser';
import {HUD} from "../gameObjects/HUD";
export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,characterId,healthPoints = 100,movementSpeed=64,uid='233'){
        super(scene,x,y,key,textureName,movementSpeed);
        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.characterId=characterId;
        this.uid = uid;
        // this.setOrigin(0,0);
        this.nonZeroVelocity = {x:0,y:1};
        this.beingAttacked=false;
        this.canbeAttacked=true;
        //enables body in the phsyics world in the game
        scene.physics.world.enableBody(this);
        scene.updateSprite(this); 
        this.createWeapon(scene);
        this.createSpecialWeapon(scene);
        //Create intial Healthpoints for the player
        this.mana = 1000;
        this.healthPoints = healthPoints;
        this.movementSpeed=movementSpeed;
        //adjust player hit box
        this.setSize(34, 36);
    }

    createSpecialWeapon(scene){ //Need to limit range of attack
        let bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});
        
        let canAttack = false;

        this.specialAttack = () => {
            
            if (this.mana >= 10) {
                canAttack = true;
            }

            if (canAttack) {
                let velocityArray = [{x:1,y:1},{x:-1,y:1},{x:1,y:-1},{x:-1,y:-1},{x:0,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}];
            
                velocityArray.forEach((v)=>{
                    let bullet = bullets.get();
                  //  scene.children.add(bullet);
                    scene.damageItems.add(bullet);
                    bullet.shoot(this.uid,this,v);
                });
                    
                this.mana-=10;
            }

            if (this.mana <10) {
                canAttack = false;
            }

        }

        this.removeSpecialWeapon = ()=>{ //destroys the weapon used
            bullets.destroy();
            this.specialAttack = null;
        };  
        
    }

    
    createWeapon(scene){
        let bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.attack = ()=>{
            let bullet = bullets.get();
          //  scene.children.add(bullet);
            scene.damageItems.add(bullet);
            bullet.shoot(this.uid,this,this.nonZeroVelocity);
        };

        this.removeWeapon = ()=>{ //destroys the weapon used
            bullets.destroy();
            this.attack = null;
        };    

    }

    kill(){
        //Remove a player so we can handle other things related to the death such as removing the wepopn    
        console.log(this);
        this.destroy();
    }

    takeDamage(damage){
        if(this.canbeAttacked===true){
        this.healthPoints = this.healthPoints - damage;
        
       }

        if( this.healthPoints <= 0 ){
            this.kill();
        }

    }

    collision(){
        this.takeDamage(5);
        this.beingAttacked=true;
        this.canbeAttacked=false;
    }

    isInjured(time){
        if(this.beingAttacked===true){
            this.tint=0xff0000;
 
            this.count=time;
        }   
    
        if(time>this.count+100)
            {this.tint=0xffffff;
             this.canbeAttacked=true;
            }
            

        }
    

    setVelocity(x,y){ //Jest was calling super.setVelocity instead of the overridden setVelocity so I changed the function to seperate the new logic
        super.setVelocity(x,y);
        this.setNonZeroVelocity(x,y);
    }


    setNonZeroVelocity(x,y){ 
        if (x != 0 || y != 0){
            this.nonZeroVelocity = {'x':x, 'y':y};
        }
    }
    player_movement(){
        //Player Update Function
        if(this.characterId===0){
           if(this.body.velocity.x > 0){
               this.play("p1_right", true);
           } else if(this.body.velocity.x < 0){
               this.play("p1_left",true);
           }else if(this.body.velocity.y > 0){
               this.play("p1_down",true);
           }else if(this.body.velocity.y < 0){
               this.play("p1_up",true);
           }
       }
           if(this.characterId===1){
           if(this.body.velocity.x > 0){
               this.play("rider_right", true);
           } else if(this.body.velocity.x < 0){
               this.play("rider_left",true);
           }else if(this.body.velocity.y > 0){
               this.play("rider_down",true);
           }else if(this.body.velocity.y < 0){
               this.play("rider_up",true);
           }
       }
   
   }

    update(time){
        this.isInjured(time);
      //  console.log(this.healthPoints)
        this.beingAttacked=false;
        //Player Update Function
        this.player_movement();
    }


}