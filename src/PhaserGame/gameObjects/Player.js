import { Bullet } from "./Projectiles";
import Phaser from 'phaser';
import * as firebase from 'firebase';

/**
 * Player Class. The actual player sprite that gets added the the scene which is controlled by the user or bot or player data from the database
 */
export class Player extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * sets up the player object. calls createWeapon and createSpecialWeapon
     * adds the sprite to the scene
     * 
     * @param {Phaser.Scene} scene - The Scene that the player is going to be in
     * @param {number} x - The X axis position of the player in the scene
     * @param {number} y - The Y axis poistion of the player in the scene
     * @param {string} key - The key of the player object for phaser
     * @param {string} textureName - The name of the texture that is used for the player
     * @param {number} characterId - The specific character type of the player
     * @param {number} healthPoints - The health that a player will have in the game
     * @param {number} movementSpeed - the speed that the player moves 
     * @param {string} uid - unique id of each player object
     */
    constructor(scene,x,y,key,textureName,characterId,healthPoints = 100,movementSpeed=64,uid='233'){
        super(scene,x,y,key,textureName);
        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        /**
         * The spawnPosition of the player
         * This is where the player will respawn 
         * 
         * @name Player#spawnPosition
         * @type object
         */
        this.spawnPosition = {'x':x,'y':y};

        /**
         * The specific character type of the player
         * 
         * @name Player#characterId
         * @type String
         */
        this.characterId=characterId;

        /**
         * unique id of each player object
         * 
         * @name Player#uid
         * @type String
         */
        this.uid = uid;

        /**
         * object that has x and y for velocity. either x or y will always be > 0
         * @name Player#nonZeroVelocity
         * @type object
         */
        this.nonZeroVelocity = {x:0,y:1};

        
        /**
         * true or false that says if the player is being attacked
         * @name Player#beingAttacked
         * @type boolean
         */
        this.beingAttacked=false;

        /**
         * true or false that says if the player is being attacked
         * @name Player#canbeAttacked
         * @type boolean
         */
        this.canbeAttacked=true;

        //enables body in the phsyics world in the game
        scene.physics.world.enableBody(this);
        scene.updateSprite(this); 
        this.createWeapon(scene);
        this.createSpecialWeapon(scene);
        this.stopattack=30;
        /**
         * amount of mana of the player has at the momment
         * @name Player#mana
         * @type number
         */
        this.mana = 1000;

        /**
         * amount of health of the player has at the moment
         * @name Player#healthPoints
         * @type number
         */
        this.healthPoints = healthPoints;

        /**
         * the speed the player moves at
         * @name Player#movementSpeed
         * @type number
         */
        this.movementSpeed=movementSpeed;

        /**
         * tells if the player is a user
         * @name Player#user
         * @type boolean
         */
        this.user = true;

        /**
         * value to check if player is a bot and not an actual human
         * @name Player#isBot
         * @type boolean
         */
        this.isBot = false;


    /**
     * @instance
     * @memberof Player
     * @method becomeBot
     * @description function makes the player into a bot switching its update function to botUpdate. Permanant change for this object
     */
        this.becomeBot = ()=>{
            this.isBot = true;
            this.update = this.botUpdate.bind(this,scene);
        }

        /**
         * value from the scene that tells the player what type of scene we are in. 
         * @name Player#mode
         * @type string
         */
        this.mode = scene.mode;

        this.scene = scene;
      
    }

    /**
     * Intializes the special weapon of the player that is called during player construction
     * Creates two functions specialAttack and removeSpecialWeapon
     * Creates a group of bullets that is used when the player is attacked. 
     * 
     * 
     * @param {Phaser.Scene} scene - The scene that the player is inside that is used to create the bullet group
     */
    createSpecialWeapon(scene){ //Need to limit range of attack
        let bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});
        
        let canAttack = false;


        /**
         * (Function is created by the createSpecialWeapon function) 
         * 
         * 
         * specialAttack is a function which starts the attack and shoots the bullets corresponding to the behavior of the shooting
         * If the mana is >10 the player can atttack and it decreases by 10 per attack. If you have less then 10 mana you can't
         * The behavior of the attack is shooting bullets diagonally
         */
        this.specialAttack = () => {
            
            if (this.mana >= 10) {
                canAttack = true;
            }

            if (canAttack) {
                let velocityArray = [{x:1,y:1},{x:-1,y:1},{x:1,y:-1},{x:-1,y:-1},{x:0,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}];
            
                velocityArray.forEach((v)=>{
                    let bullet = bullets.get();
                  //  scene.children.add(bullet);
                    scene.damageItems.add(bullet);
                    bullet.shoot(this.uid,this,v);
                });
                    
                this.mana-=10;
            }

            if (this.mana <10) {
                canAttack = false;
            }

        }

        /**
         * (Function is created by the createSpecialWeapon function) 
         * 
         * 
         * removeSpecialWeapon removes the special weapon from being shot and disables it from the plaeyer
         * destroys the bullets group which is used for the special attack shooting.
         * It also sets the specialAttack funciton to null
         */
        this.removeSpecialWeapon = ()=>{ //destroys the weapon used
            bullets.destroy();
            this.specialAttack = null;
        };  
        
    }

    /**
     * Intializes the weapon of the player so that the player can shoot
     * creates the bullets which is added to the scene
     * creates the attack function and removeWeapon funciton for the player
     * 
     * @param {Phaser.Scene} scene - The scene that the player is inside that is used to create the bullet group inside the createWeapon function
     */
    createWeapon(scene){
        let bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        /**
         * (Function is created by the createWeapon function)
         * 
         * 
         * calling attack will shoot a bullet in the direction that the player is facing. 
         */
        this.attack = ()=>{
            let bullet = bullets.get();
          //  scene.children.add(bullet);
            scene.damageItems.add(bullet);
            bullet.shoot(this.uid,this,this.nonZeroVelocity);
        };

        /**
         * calling removeWeapon destroys the weapon used by the player sets attack back to null
         */
        this.removeWeapon = ()=>{ //destroys the weapon used
            bullets.destroy();
            this.attack = null;
        };    

    }

    /**
     * Sets the players active and visible property to false. Effectively removing them from the game.
     * If the scene is a multiplayer scene the player respawns after 5 seconds 
     * Handles the respawing of the player in the multiplayer scene
     */
    kill(attackeruid){

      this.setActive(false);
      this.setVisible(false);

      if(this.scene.mode === 'multi'){
          //this.scene.handlePlayerKill( this.uid, attackeruid );
          this.handleRespawn();
      }

    }

    /**
     * Handles the respawing of the player
     * Tints the scene and creates a countdown time for the respawn
     * runs the respawn function 
     */
    handleRespawn(){
        if (this.user && this.scene.GameIsGoing) {
            var countDownText = this.scene.add.text(this.scene.game.renderer.width / 2, this.scene.game.renderer.height / 2, `Respawning in: 5`, { fontFamily: 'Arial', fontSize: 50, color: '#ffffff' });
            countDownText.setScrollFactor(0);
            countDownText.setOrigin(0.5, 0.5);


            var tintOverlay = this.scene.add.rectangle(this.scene.game.renderer.width / 2, this.scene.game.renderer.height / 2,
                this.scene.game.renderer.width, this.scene.game.renderer.height, 0x000000);

            tintOverlay.setScrollFactor(0);
            tintOverlay.alpha = 0.5;
            tintOverlay.setDepth(4);
        }

        let time = 6;

        let updateCountDown = () => {

            if (time === 0) {
                this.respawn();
              
                if (tintOverlay !== undefined && countDownText !== undefined) {
                    tintOverlay.destroy();
                    countDownText.destroy();
                }
            }
            else {
                time--;

                if(countDownText !== undefined){
                  countDownText.setText(`Respawning in: ${time}`);
                }
                
                setTimeout(updateCountDown, 1000);
            }

        }
        updateCountDown();
    }

    /**
     * damages the player by the the given number supplied to the funciton
     * If the ending healthpoints is less than 0 it calls the kill function
     * 
     * @param {number} damage - the amount of damage the player should take
     */
    takeDamage(damage, attackeruid){

        if (this.canbeAttacked === true) {
            this.healthPoints = this.healthPoints - damage;
        }

        if (this.scene.mode === 'multi') {
            this.scene.setHealthInDB(this.healthPoints);
        }

        if (this.healthPoints <= 0) {
            this.kill(attackeruid);
        }


    }

    /**
     * function to set the the health of the player
     */
    setHealth(health){
        
        this.healthPoints = health;
            
        if( this.healthPoints <= 0 ){
            this.kill();
        }
    }

    /**
     * collision function that is called when a collision occurs to the player. 
     * calls the takeDamage function and prevents the beingAttacked
     */
    collision(attackeruid){

        if(this.user){
            this.takeDamage(5, attackeruid);
        }
        
        this.beingAttacked=true;
        this.canbeAttacked=false;
    }

    /**
     * changes tint and canbeAttacked based on the time passed into the funciton
     * if beingAttacked is true it tints the player red and sets the count ot the current count
     * 
     * @param {number} time - the time that is used to determine how long the player should be tinted
     */
    isInjured(time){
        if(this.beingAttacked===true){
            this.tint=0xff0000;
 
            this.count=time;
        }  
        if(this.mode==="single") this.stopattack=8;
        if(time>this.count+this.stopattack)
            {this.tint=0xffffff;
             this.canbeAttacked=true;
            }
            

        }
    
        /**
         * overrides the setVelocity funciton of Phaser.Physics.Arcade.Sprite which calls the setNonZeroVelocity funciton 
         * sets teh velocity to the x and y passed into the function
         * 
         * @param {number} x - x velocity
         * @param {number} y - y velocity
         */
    setVelocity(x,y){ //Jest was calling super.setVelocity instead of the overridden setVelocity so I changed the function to seperate the new logic
        super.setVelocity(x,y);
        this.setNonZeroVelocity(x,y);
    }


    /**
     * takes x and y as parameter and sets the nonZeroVelocity property of the player to the x and y if and only if either x and y not zero
     * 
     * @param {number} x - x velocity
     * @param {number} y - y velocity
     */
    setNonZeroVelocity(x,y){ 
        if (x != 0 || y != 0){
            this.nonZeroVelocity = {'x':x, 'y':y};
        }
    }

    /**
     * calling this function is for the animation of the movement of the player
     * the animation plays based upon the direction that the player is moving or the velocity
     */
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

   /**
    * update method that gets called by the playscene 60 times a second
    * handles isInjured and player animation
    * 
    * @param {number} time - time that gets passed by Phaser when update is called
    */
    update(time){
        this.isInjured(time);
      //  console.log(this.healthPoints)
        this.beingAttacked=false;
        //Player Update Function
        this.player_movement();
    }

    respawn = ()=>{
        this.x = this.spawnPosition.x;
        this.y = this.spawnPosition.y;
        this.nonZeroVelocity = {x:0,y:1};
        this.beingAttacked=false;
        this.canbeAttacked=true;
        this.healthPoints = this.scene.startingPlayerHealth;

        if(this.user){
            this.scene.hUD.hpbar.resetBar();
        }
        if (this.scene.mode === 'multi'&& this.scene.GameIsGoing) {
            this.scene.setHealthInDB(this.scene.startingPlayerHealth);
        }

        this.setActive(true);
        this.setVisible(true);
    }

    botUpdate(scene,time){
        let towers = scene.towers;
        let players = scene.players;
        let towerDistance = 100;

        let maxDistance = 1000000000;
        let distance = 0;
        let closestTower = null;
        towers.children.entries.forEach((a)=>{
            let dX = a.x - scene.player1.x;
            let dY = a.y - scene.player1.y;
            distance = Math.sqrt((dX * dX) + (dY * dY));
 
            if(distance <= maxDistance){
                maxDistance = distance;
                closestTower = a;
            }
        });

      if(maxDistance < 250){
        closestTower.tint = 0x0000ff;
      }
      else{
        closestTower.tint = 0xff0000;
      }
    }


}