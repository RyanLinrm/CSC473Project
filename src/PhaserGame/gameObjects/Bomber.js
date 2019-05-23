import {Player} from "../gameObjects/Player";
import { Bomb } from "./Projectiles";
/**
 * Bomber Class. One character type of the player.
 * Holds the same properties as a regular player but have 
 * the ability to use bomb bullet. 
 */
export class Bomber extends Player{
    /**
     * 
     * sets up the bomber object. calls createWeapon and createSpecialWeapon
     * adds the sprite to the scene
     * 
     * @param {Phaser.Scene} scene - The Scene that the bomber is going to be in
     * @param {number} x - The X axis position of the bomber in the scene
     * @param {number} y - The Y axis poistion of the bomber in the scene
     * @param {string} key - The key of the bomber object for phaser
     * @param {string} textureName - The name of the texture that is used for the bomber
     * @param {number} characterId - The specific character type of the bomber
     * @param {number} healthPoints - The health that a bomber will have in the game
     * @param {number} movementSpeed - the speed that the bomber moves 
     * @param {string} uid - unique id of each bomber object
     */
    constructor(scene,x,y,key,textureName,characterId,healthPoints = 500,movementSpeed=64,uid='233'){
        super(scene,x,y,key,textureName,characterId,healthPoints,movementSpeed,uid);
        this.movementSpeed=movementSpeed;
        this.characterId=characterId;
        this.beingAttacked=false;
        this.healthPoints=healthPoints;
        this.uid=uid;
        this.createWeapon(scene);
    }

    /**
     * Intializes the weapon of the bomber so that the bomber can shoot
     * creates the bullets which is added to the scene
     * creates the attack function and removeWeapon funciton for the bomber
     * 
     * @param {Phaser.Scene} scene - The scene that the bomber is inside that is used to create the bullet group inside the createWeapon function
     */
    createWeapon(scene) {
        this.bullets = scene.physics.add.group({ classType: Bomb, runChildUpdate: true });
        /**
         * (Function is created by the createWeapon function)
         * 
         * calling attack will place and explode the bomb that the bomber shot.
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
    * handles isInjured and bomber animation
    * 
    * @param {number} time - time that gets passed by Phaser when update is called
    */
    update(time){
        this.player_movement();
        this.isInjured(time);
        this.beingAttacked=false;
    }
 
} 