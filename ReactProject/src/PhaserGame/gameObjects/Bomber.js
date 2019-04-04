import {Player} from "../gameObjects/Player";
import { Bomb } from "../gameObjects/Projectiles";
export class Bomber extends Player{
    constructor(scene,x,y,key,textureName,healthPoints = 100){
        super(scene,x,y,key,textureName,healthPoints = 500);
    }

    createWeapon(scene) {
        let bombs = scene.physics.add.group({ classType: Bomb, runChildUpdate: true });
        this.attack = () => {
            let bomb = bombs.get();
            scene.children.add(bomb);
            bomb.place(this);
        };

        this.removeWeapon = () => { //destroys the weapon used
            bombs.destroy();
            this.attack = null;
        };

    }
} 