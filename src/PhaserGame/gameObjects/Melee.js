import {Player} from "./Player";
import { sword } from "./Projectiles";
/**
 * Melee Class. One character type of the player.
 * Holds the same properties as a regular player but have 
 * the ability to use sword bullet. 
 */
export class Melee extends Player{
    /**
     * 
     * sets up the bomber object. calls createWeapon and createSpecialWeapon
     * adds the sprite to the scene
     * 
     * @param {Phaser.Scene} scene - The Scene that the Melee is going to be in
     * @param {number} x - The X axis position of the Melee in the scene
     * @param {number} y - The Y axis poistion of the Melee in the scene
     * @param {string} key - The key of the Melee object for phaser
     * @param {string} textureName - The name of the texture that is used for the Melee
     * @param {number} characterId - The specific character type of the Melee
     * @param {number} healthPoints - The health that a Melee will have in the game
     * @param {number} movementSpeed - the speed that the Melee moves 
     * @param {string} uid - unique id of each Melee object
     */
    constructor(scene,x,y,key,textureName,characterId,healthPoints = 100,movementSpeed=64,uid){
        super(scene,x,y,key,textureName,characterId, healthPoints, movementSpeed, uid);
        this.movementSpeed=movementSpeed;
        this.scene=scene;
        this.timeAlive = 0;
        this.healthPoints=healthPoints;
        this.uid=uid;
        this.createWeapon(scene);
    }

    /**
     * Intializes the weapon of the Melee so that the Melee can shoot
     * creates the bullets which is added to the scene
     * creates the attack function and removeWeapon funciton for the Melee
     * 
     * @param {Phaser.Scene} scene - The scene that the Melee is inside that is used to create the bullet group inside the createWeapon function
     */
    createWeapon(scene) {
        this.bullets = scene.physics.add.group({ classType: sword, runChildUpdate: true });
        /**
         * (Function is created by the createWeapon function)
         *
         * calling attack will shoot the bullet the melee is facing.
         */
        this.attack = () => {
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.shoot(this.uid,this,this.nonZeroVelocity);
        };
     
       /**
        * calling removeWeapon destroys the weapon used by the player sets attack back to null
        */
        this.removeWeapon = () => { //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };

    }
   /**
    * update method that gets called by the playscene 60 times a second
    * handles isInjured and melee animation
    * 
    * @param {number} time - time that gets passed by Phaser when update is called
    */
    update(time){
        this.player_movement();
        this.isInjured(time);
        this.beingAttacked=false;
    }
} 