import {Player} from "../gameObjects/Player";
import { Posion } from "./Projectiles";
export class Rider extends Player{
    constructor(scene,x,y,key,textureName,characterId,healthPoints = 100,movementSpeed=128,uid='233'){
        super(scene,x,y,key,textureName,characterId,healthPoints,movementSpeed,uid);
        this.movementSpeed=movementSpeed;
        this.characterId=characterId;
        this.beingAttacked=false;
        this.healthPoints=healthPoints;
        this.uid=uid;
    } 

    createWeapon(scene) {
        this.bullets = scene.physics.add.group({ classType: Posion, runChildUpdate: true });
        this.attack = () => {
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.place(this,this.uid);
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
