import { Bullet } from "../gameObjects/Projectiles";
import Phaser from 'phaser';
export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,healthPoints = 100,movementSpeed=64,id=0){
        super(scene,x,y,key,textureName,movementSpeed);
        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.id=id;
      //  this.setOrigin(0,0);

        this.nonZeroVelocity = {x:0,y:1};

        //enables body in the phsyics world in the game
        scene.physics.world.enableBody(this);
        scene.updateSprite(this); 
        this.createWeapon(scene);
        this.createSpecialWeapon(scene);
        //Create intial Healthpoints for the player
        this.mana = 100;
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
           // console.log("this");
            let bullet = this.bullets.get();
            scene.children.add(bullet);
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


    setVelocity(x,y){ //overriding setVelocity so that we caan set nonZeroVelocity
        super.setVelocity(x,y);

        if (x != 0 || y != 0){
            this.nonZeroVelocity = {'x':x, 'y':y};
        }
    }

    update(){
        //Player Update Function
        if(this.body.velocity.x > 0){
            this.play("right", true);
        } else if(this.body.velocity.x < 0){
            this.play("left",true);
        }else if(this.body.velocity.y > 0){
            this.play("down",true);
        }else if(this.body.velocity.y < 0){
            this.play("up",true);
        }
    }


}