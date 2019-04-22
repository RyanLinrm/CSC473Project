import { Bullet } from "../gameObjects/Projectiles";
import Phaser from 'phaser';
export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,characterId,healthPoints = 100,movementSpeed=64,id=0){
        super(scene,x,y,key,textureName,movementSpeed);
        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.characterId=characterId;
        // this.setOrigin(0,0);
       
        this.nonZeroVelocity = {x:0,y:1};
        this.beingAttacked=false;
        //enables body in the phsyics world in the game
        scene.physics.world.enableBody(this);
        scene.updateSprite(this); 
        this.createWeapon(scene);
        this.createSpecialWeapon(scene);
        //Create intial Healthpoints for the player
        this.mana = 1000;
        this.healthPoints = healthPoints;
        this.movementSpeed=movementSpeed;
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
                    scene.children.add(bullet);
                    bullet.shoot(this,v);
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
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.attack = ()=>{
            let bullet = this.bullets.get();
          //  scene.children.add(bullet);
            scene.damageItems.add(bullet);
            bullet.shoot(this,this.nonZeroVelocity);
        };

        this.removeWeapon = ()=>{ //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };    

    }

    kill(){
        //Remove a player so we can handle other things related to the death such as removing the wepopn    
        this.destroy();
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
        this.beingAttacked=false;
        //Player Update Function
        this.player_movement();
    }


}