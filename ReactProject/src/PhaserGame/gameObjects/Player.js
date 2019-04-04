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

        //Create intial Healthpoints for the player
        this.healthPoints = healthPoints;

    }

    createWeapon(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.attack = ()=>{
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.shoot(this, scene.input.x, scene.input.y);
        };

        this.removeWeapon = ()=>{ //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };    

    }

    kill(){
        //Remove a player so we can handle other things related to the death such as removing the wepopn
        this.removeWeapon();
        this.destroy();
    }

    takeDamage(damage){
        this.healthPoints = this.healthPoints - damage;

        if( this.healthPoints <= 0 ){
            this.kill();
        }
    }

}