import { Bullet } from "../gameObjects/Projectiles";
import Phaser from 'phaser';
export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,healthPoints = 100){
        super(scene,x,y,key,textureName);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.setOrigin(0,0);
        this.nonZeroVelocity = {x:0,y:1};

        //enables body in the phsyics world in the game
        scene.physics.world.enableBody(this);
        this.createWeapon(scene);
        this.createSpecialWeapon(scene);
        //Create intial Healthpoints for the player
        this.mana = 100;
        this.healthPoints = healthPoints;

    }

    createSpecialWeapon(scene){ //Need to limit range of attack
        let bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});
        
        let canAttack = false;

        this.specialAttack = () => {
            
            if (this.mana >= 100) {
                canAttack = true;
            }

            if (canAttack) {
                let velocityArray = [{x:1,y:1},{x:-1,y:1},{x:1,y:-1},{x:-1,y:-1},{x:0,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}];
            
                velocityArray.forEach((v)=>{
                    let bullet = bullets.get();
                    scene.children.add(bullet);
                    bullet.shoot(this,v);
                });
                    
                this.mana--;
            }

            if (this.mana === 80) {
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
        this.removeWeapon();
        this.removeSpecialWeapon();
        this.destroy();
    }

    takeDamage(damage){
        this.healthPoints = this.healthPoints - damage;

        if( this.healthPoints <= 0 ){
            this.kill();
        }
    }

}