import {Player} from "./Player";
import { Bullet, sword } from "./Projectiles";
import { Units } from "./Units";
export class Melee extends Player{
    constructor(scene,x,y,key,textureName,healthPoints = 100,movementSpeed=64){
        super(scene,x,y,key,textureName,healthPoints = 500);
        this.movementSpeed=movementSpeed;
        this.scene=scene;
        this.timeAlive = 0;
    }

    createWeapon(scene) {
        this.bullets = scene.physics.add.group({ classType: sword, runChildUpdate: true });
        this.attack = () => {
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.shoot(this,this.nonZeroVelocity);
        };

        this.removeWeapon = () => { //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };

    }
    update(time){
        this.player_movement();
        this.isInjured(time);
        this.beingAttacked=false;
    }
} 