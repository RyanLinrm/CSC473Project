import {Player} from "../gameObjects/Player";
import { Posion } from "./Projectiles";
/**
 * Rider Class. One character type of the player.
 * Holds the same properties as a regular player but have 
 * the ability to use posion bullet. 
 */
export class Rider extends Player{
    /**
     * 
     * sets up the rider object. calls createWeapon and createSpecialWeapon
     * adds the sprite to the scene
     * 
     * @param {Phaser.Scene} scene - The Scene that the rider is going to be in
     * @param {number} x - The X axis position of the rider in the scene
     * @param {number} y - The Y axis poistion of the rider in the scene
     * @param {string} key - The key of the rider object for phaser
     * @param {string} textureName - The name of the texture that is used for the rider
     * @param {number} characterId - The specific character type of the rider
     * @param {number} healthPoints - The health that a rider will have in the game
     * @param {number} movementSpeed - the speed that the rider moves 
     * @param {string} uid - unique id of each rider object
     */
    constructor(scene,x,y,key,textureName,characterId,healthPoints = 100,movementSpeed=128,uid='233'){
        super(scene,x,y,key,textureName,characterId,healthPoints,movementSpeed,uid);
        this.movementSpeed=movementSpeed;
        this.characterId=characterId;
        this.beingAttacked=false;
        this.healthPoints=healthPoints;
        this.uid=uid;
        this.createWeapon(scene);

    } 
   /**
     * Intializes the weapon of the rider so that the rider can shoot
     * creates the bullets which is added to the scene
     * creates the attack function and removeWeapon funciton for the rider
     * 
     * @param {Phaser.Scene} scene - The scene that the rider is inside that is used to create the bullet group inside the createWeapon function
     */
    createWeapon(scene) {
        this.bullets = scene.physics.add.group({ classType: Posion, runChildUpdate: true });
        
        /**
         * (Function is created by the createWeapon function)
         * 
         * calling attack will shoot three bullets in rider's upper directions. 
         */
        this.attack = () => {
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.place(this,this.uid);
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
    * handles isInjured and rider animation
    * 
    * @param {number} time - time that gets passed by Phaser when update is called
    */
    update(time){
        this.player_movement();
        this.isInjured(time);
        this.beingAttacked=false;
    }
 

}
