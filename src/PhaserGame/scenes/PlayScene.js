import Phaser from 'phaser';

import { CST } from "../CST";
import { Bullet } from "../gameObjects/Projectiles";
import { Units } from "../gameObjects/Units";
import {Player} from "../gameObjects/Player";
import {Bomber} from "../gameObjects/Bomber";
import {Enemy} from "../gameObjects/Enemy";
import {Rider} from "../gameObjects/Rider";
import {Melee} from "../gameObjects/Melee";
import {HUD} from "../gameObjects/HUD";
import spriteAnimations from '../gameObjects/Animations';

/**
 * PlayScene - extends Phaser.Scene
 * The main scene where the game plays out. 
 */
export class PlayScene extends Phaser.Scene{

    /**
     * creates the scene and assigns the scenekey to be identified by phaeser later
     * creates sceneType, seatNumber, single and mode property
     * @param {string} sceneKey 
     */
    constructor(sceneKey = CST.SCENES.PLAY){
        super({key:sceneKey});
        
    /**
     * The scene type "Multiplayer" or "Single"
     *
     * @name Player#sceneType
     * @type String
     */
        this.sceneType = "Single";

    /**
     * The positionOfThePlayer on the board. 1 is top left 2 top right 3 bottom left 4 is bottom right
     *
     * @name Player#seatNumber
     * @type number
     */
        this.seatNumber = 1;
        this.single = true;

        /**
         * The starting health of players in the game
         *
         * @name Player#startingPlayerHealth
         * @type number
         */
        this.startingPlayerHealth = 500;

///////////////////////////////////////////COMBINE IT WITH this.sceneType/////////////////////////////
        this.mode = 'single';
    }

    /**
     * preload function that is called by phaser and is used for loading
     */
    preload(){ 
        spriteAnimations(this);
        this.load.image("tiles1", `${process.env.PUBLIC_URL}/assets/tiles/map_atlas.png`);
        this.load.image("tiles2", `${process.env.PUBLIC_URL}/assets/tiles/map_atlas2.png`);

        this.load.tilemapTiledJSON("Mymap",`${process.env.PUBLIC_URL}/assets/map/map.json`);
    }

    /**
     * initialization for the scene assigns the spritekey property of this scene to data
     * @param {string} data 
     */
    init(data){

    /**
     * The spriteKey corresponding to the type of player the player is (Rider,Bomber etc)
     *
     * @name Player#spritekey
     * @type number
     */
        this.spritekey = data

    /**
     * The amount of players in the game
     *
     * @name Player#players
     * @type number
     */
        this.players = 1;
    }

    /**
     * create function that is called by phaser to create the scene and to start it
     * 
     * @param {string} uid 
     * @param {string} multi 
     */
    create(uid, multi){

    /**
     * The uID of the player
     *
     * @name Player#playerUid
     * @type number
     */        
        this.playerUid = uid;
        if(multi !== undefined) this.mode = multi;
        //Create an enemygroup with runChildUpdate set to true. Every enem y added to this group will have its update function then called. 
        //Without this groupt the update funciton would not be called for the enemies
       
        let updatingSpriteGroup = this.add.group({runChildUpdate: true}); //Sprites that should run their own update function

        
        /**
         * (Function is created by the create function) 
         * 
         * adds a sprite to the updatingSpriteGroup which is a group of sprites where the update function of each sprite is called 60 times a second
         * @param {Phaser.Physics.Arcade.Sprite} sprite - the sprite to add into the group that will update 60 times a second
         */
        this.updateSprite = (sprite) => updatingSpriteGroup.add(sprite); //adds sprite to updating group


        
        
        this.attackableGroup = this.add.group({runChildUpdate: true}); 
        //Create Groups for updating andn collision detection;  
        this.enemies = this.add.group(); 
        this.enemyPlayers = this.add.group();
        this.enemyTowers = this.add.group();
        this.damageItems = this.add.group(); 
        this.enemiesAttacks = this.add.group();
        this.towerShooting =this.add.group();
        //Collision Functions
        //Funciton to run collision funciton of both objects


        /**
         * (function created when the create funciton for the scene is called)
         * function that is used for collision handling
         * if both objectA and objectB are active it calls the collision function of both objects without passing andy paramaters
         * 
         * @param {object} objectA 
         * @param {object} objectB 
         */
        this.bothCollisions = (objectA,objectB)=>{
            
            if(objectA.active && objectB.active){
                if(objectA.uid !== objectB.uid){
                objectA.collision();
                objectB.collision(objectA.uid);
                }
                 
            }
        };

        this.physics.add.overlap(this.damageItems, this.enemyTowers,this.bothCollisions);
        this.physics.add.overlap(this.damageItems, this.enemies,this.bothCollisions);
        this.physics.add.overlap(this.enemiesAttacks,this.enemyPlayers,this.bothCollisions);
        this.physics.add.overlap(this.towerShooting,this.enemyPlayers,this.bothCollisions);
        this.physics.add.overlap(this.enemiesAttacks,this.enemyTowers,this.bothCollisions);
        this.physics.add.overlap(this.towerShooting,this.enemies,this.bothCollisions);
        this.physics.add.overlap(this.enemiesAttacks,this.enemies,this.bothCollisions);

        //this.physics.add.overlap(this.damageItems,this.enemyPlayers,bothCollisions);
        const randNumber = Math.floor((Math.random() * 4) + 1);
        let playerStartingPos = this.startingPosFromTowerNum(randNumber);
      //  this.player = new Bomber(this,playerStartingPos.x,playerStartingPos.y, "p1", "p1_01.png",0,500,150);
        switch(this.spritekey){
            case "bomber":
            this.player = new Bomber(this,playerStartingPos.x,playerStartingPos.y, "p1", "p1_0.png",0,this.startingPlayerHealth,150,'123');
            break;
            case "rider":
            this.player = new Rider(this,playerStartingPos.x,playerStartingPos.y, "rider", "rider_0.png",1,this.startingPlayerHealth,200,'123').setScale(0.8);
            break;
        }
        this.enemyPlayers.add(this.player);

        this.towers = this.add.group(); 

        /**
         * (function created when the create function for the scene is called)
         *  
         * 
         * function that gets passed to this.towers.removeCallback which gets called when a tower gets removed
         * 
         * @param {object} tower - the tower that got destroyed
         */
        this.towerRemoved = (tower)=>{
            
            if(tower.uid === this.playerUid){
                this.towerDestroyed(tower.uid);
            }
            else{
               // console.log(this.towers.getLength());
                if(this.towers.getLength() === 1 && this.GameIsGoing === true){
                    this.wonGame();
                }
            }
           
        };
    
        this.towers.removeCallback = this.towerRemoved; 


        //warning when manabar is too low for a special attack
        this.manawarning = this.add.text(150,73,'low mana').setDepth(3);
        this.manawarning.setScrollFactor(0);
        this.manawarning.setVisible(false)

      /*
        //Mini Map
        //create a sample minimap ---needs to change to dynamic
        this.minimap = this.cameras.add(this.game.renderer.width - 255, 0, 240, 300).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 600;  
        this.minimap.scrollY = 600; */


        //adding buildings for each player

        //adding resrouces to the middle 
  
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.player, this.enemies);
        //adjust player hit box
        this.player.setSize(30, 30);
        if(this.mode === 'single'){
  
            this.hud = new HUD(this, this.player, this.playerUid, this.mode)
            this.manabar=this.hud.manabar;
            this.hpbar=this.hud.hpbar;
            this.sword_in_the_stone=new Units(this,645,645,645,595,"sword_in_the_stone",1,2000,1,200,100,this.player.uid,this.player.uid,"sword_in_the_stone.svg");
            this.sword_in_the_stone.setScale(0.5);

            this.building=new Units(this,1200,1200,1150,1099,"building1",1,200,4,180,200).setScale(0.15);
            this.university=new Units(this,1200,0,1150,-1,"university",1,200,4,180,200).setScale(1.5);
            this.pyramid=new Units(this,0,0,100,-1,"pyramid",1,200,4,180,200).setScale(1.5);
            this.magicstone=new Units(this,0,1200,100,1089,"magicstone",1,200,4,180,200).setScale(1.5);


            //The enemies are in four different towers.
            this.wolf0=new Enemy(this, 1100,1200, "wolf", "wolf_01.png",this.player,0,200,0.1,5,50,65,200);
            this.wolf1=new Enemy(this, 1050,1200, "wolf", "wolf_01.png",this.player,0,200,0.1,5,50,65,200);
            this.wolf2=new Enemy(this, 1000,1200, "wolf", "wolf_01.png",this.player,0,200,0.1,5,50,65,200);
            this.wolf3=new Enemy(this, 950,1200, "wolf", "wolf_01.png",this.player,0,200,0.1,5,50,65,200);
            //this.wolf4=new Enemy(this, 900,1200, "wolf", "Wolf_01.png",this.player,0,200,0.1,5,50,65,200);

            
            this.ninjabot0=new Enemy(this, 1000,200, "ninjabot", "ninjabot_01.png",this.player,1,100,0.8,5,180,55,700);
            this.ninjabot1=new Enemy(this, 950,200, "ninjabot", "ninjabot_01.png",this.player,1,100,0.8,5,180,55,700);
            this.ninjabot2=new Enemy(this, 900,200, "ninjabot", "ninjabot_01.png",this.player,1,100,0.8,5,180,55,700);
            this.ninjabot3=new Enemy(this, 850,200, "ninjabot", "ninjabot_01.png",this.player,1,100,0.8,5,180,55,700);
            //this.ninjabot4=new Enemy(this, 800,200, "ninjabot", "ninjabot_1.png",this.player,1,100,0.8,5,180,55,700);

            this.skull0=new Enemy(this,50,300,"skull","skull_01.png",this.player,3,200,0.8,5,180,45,650).setScale(0.9);
            this.skull1=new Enemy(this,100,300,"skull","skull_01.png",this.player,3,200,0.8,5,180,45,650).setScale(0.9);
            this.skull2=new Enemy(this,150,300,"skull","skull_01.png",this.player,3,200,0.8,5,180,45,650).setScale(0.9);
            this.skull3=new Enemy(this,200,300,"skull","skull_01.png",this.player,3,200,0.8,5,180,45,650).setScale(0.9);
            //this.skull4=new Enemy(this,250,300,"skull","skull_01",this.player,3,200,0.8,5,180,45,650).setScale(0.9);

            this.demon0=new Enemy(this,50,1200,"demon1","demon1_01.png",this.player,2,200,0.7,2,200,50,500).setScale(1.5);
            this.demon1=new Enemy(this,100,1200,"demon1","demon1_01.png",this.player,2,200,0.7,2,200,50,500).setScale(1.5);
            this.demon2=new Enemy(this,150,1200,"demon1","demon1_01.png",this.player,2,200,0.7,2,200,50,500).setScale(1.5);
            this.demon3=new Enemy(this,200,1200,"demon1","demon1_01.png",this.player,2,200,0.7,2,200,50,500).setScale(1.5);
            //this.demon4=new Enemy(this,250,1200,"demon1","demon1_01",this.player,2,200,0.7,2,200,50,500).setScale(1.5);

            this.enemies.add(this.demon0);
            this.enemies.add(this.demon1);
            this.enemies.add(this.demon2);
            this.enemies.add(this.demon3);
            //this.enemies.add(this.demon4);

            this.enemies.add(this.skull0);
            this.enemies.add(this.skull1);
            this.enemies.add(this.skull2);
            this.enemies.add(this.skull3);
            //this.enemies.add(this.skull4);

            this.enemies.add(this.wolf0);
            this.enemies.add(this.wolf1);
            this.enemies.add(this.wolf2);
            this.enemies.add(this.wolf3);
            //this.enemies.add(this.wolf4);

            this.enemies.add(this.ninjabot0);
            this.enemies.add(this.ninjabot1);
            this.enemies.add(this.ninjabot2);
            this.enemies.add(this.ninjabot3);
            //this.enemies.add(this.ninjabot4);

            this.timecycle=0;
           /**
            * Function to generate new enemy wave every Couple Of Seconds 
            * It creates each type of enemy unit in four towers
            * 
            * @param {number} time - The time cooldown that the enemies will be created.
            */    
            this.createEnemies = (time) =>{
                if(this.timecycle < time){
                    this.wolf=new Enemy(this, 1160,1150, "wolf", "wolf_01.png",this.player,0,200,0.1,5,50,99,200);
                    this.ninjabot=new Enemy(this, 1220,120, "ninjabot", "ninjabot_01.png",this.player,1,100,0.8,5,180,60,700);
                    this.skull=new Enemy(this,130,115,"skull","skull_01.png",this.player,3,200,0.8,5,180,60,650).setScale(0.9);
                    this.demon=new Enemy(this,85,1150,"demon1","demon1_01.png",this.player,2,200,0.7,2,200,70,500).setScale(1.5);
                    this.enemies.add(this.wolf);
                    this.enemies.add(this.ninjabot);
                    this.enemies.add(this.skull);
                    this.enemies.add(this.demon);
                    this.timecycle = time +5000;
                }
                
            };  
            
        }
        if(this.mode === 'multi'){
            this.pyramid=new Units(this,0,0,100,-1,"pyramid",1,500,1,200,100,'123','123','pyramid.png').setScale(1.5);
            this.university=new Units(this,1200,0,1150,-1,"university",1,500,1,200,100,'234','234',"university.png").setScale(1.5);
            this.building=new Units(this,1200,1200,1150,1099,"building1",1,500,1,200,100,'345','345','sprite0').setScale(0.15);
            this.magicstone=new Units(this,0,1200,100,1089,"magicstone",1,500,1,200,100,'456','456','magicstones.png').setScale(1.5);
            this.sword_in_the_stone=new Units(this,645,645,645,595,"sword_in_the_stone",1,300,1,190,100,'567','567',"sword_in_the_stone.svg").setScale(0.5);

            this.physics.add.collider(this.enemies, this.waterLayer);
           
      
        }
        this.towers.add(this.building); 
        this.towers.add(this.university);
        this.towers.add(this.pyramid);
        this.towers.add(this.magicstone);
 
        //input and phyics
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SHIFT");     
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Rbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.Tbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.Qbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.Zbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.Ebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //Map

        //add in our map
        let Mymap = this.add.tilemap("Mymap");

        let tiles1 = Mymap.addTilesetImage("map_atlas", "tiles1");
        let tiles2 = Mymap.addTilesetImage("map_atlas2", "tiles2");

       // display layers
        let groundLayer = Mymap.createStaticLayer("GroundLayer", [tiles1], 0 , 0).setDepth(-3);
        let centerLayer = Mymap.createStaticLayer("Center", [tiles2], 0 , 0).setDepth(-1);
        this.waterLayer = Mymap.createStaticLayer("Water", [tiles1], 0 , 0).setDepth(-2);
        let objectLayer = Mymap.createStaticLayer("Objects", [tiles1], 0 , 0).setDepth(-1);
        let addonLayer = Mymap.createStaticLayer("AddOn", [tiles1], 0 , 0).setDepth(-1);
        this.CollisionLayer = Mymap.createStaticLayer("Collision",[tiles1], 0, 0);

        //Collision layer handler
        this.CollisionLayer.setCollisionByProperty({collides:true});
        this.waterLayer.setCollisionByProperty({collides:true});

        //Assign collider objects
        this.physics.add.collider(this.player, this.CollisionLayer);
        this.physics.add.collider(this.player, this.waterLayer);
        this.physics.add.collider(this.enemies, this.CollisionLayer);
        
        //Map collision debug mode
        /*this.debugGraphics = this.add.graphics();
 
        Mymap.renderDebug(this.debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 128), 
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) 
          });*/



        //Camera

        // set bounds to avoid camera goes outside the map
        this.physics.world.setBounds(0, 0, Mymap.widthInPixels, Mymap.heightInPixels);

        //camera follows the player
        this.cameras.main.startFollow(this.player);


        // Useful states to manage handlers in update function

        this.canBeAttacked = 0; //If our character can be attacked
        this.canAttack = 0; //If the enemy can be attacked

        this.player_scale = 2;
        this.cooldowntime = 0;
        this.stopcooldown = 0;

            
    }
     
        changeEnemyColor=(player,time)=>{
            let enemiestochange=[]
            this.enemies.getChildren().map(child => enemiestochange.push(child)); 
            for (let i = 0; i < enemiestochange.length; i++) {
                if(enemiestochange[i].uid!=player.uid){
                    if( enemiestochange[i].tint!=0xffb3b3){
                        enemiestochange[i].tintcolor=0xffb3b3;              
            }
        }      
    }}
        /**
         * Function to create the ultimate ability for player. The player can press t key and cost 
         * certain amount of his/her mana, and the the enemies that near certain range within the 
         * player will all be killed. The ability will have a cooldwon restriction.
         * 
         * @param {number} time -The time passes to keep track of whether the cooldown is fine.
         */
        createUltimate = (time) =>{
            //player ability to destory enemies near the range
                this.manabar.cutManaBar(300);
                this.demonskill=this.add.sprite(this.player.x, this.player.y, 'a2_01').setScale(1.8)
                this.demonskill.play('ab2');
                this.enemylist=[];
                this.destroytime = time + 1000;
                this.cooldowntime = time + 10000;
                this.enemies.getChildren().map(child => this.enemylist.push(child));  
                for (let i = 0; i < this.enemylist.length; i++) {
                    if (this.enemylist[i].uid!=this.player.uid){
                        if (Math.abs(this.enemylist[i].x - this.player.x) < 200 && Math.abs(this.enemylist[i].y - this.player.y) < 200){ 
                        this.enemylist[i].kill(true,this.playerUid);       
                        }
                    }
                }
        }
         /**
         * Function to create the other ultimate ability for player. The player can press z key and cost 
         * certain amount of his/her mana, and the the enemies that near certain range within the 
         * player will all be stopped, enemies can not move nor attack within certain amount of time.
         * The ability has a cooldown as well.
         * 
         * @param {number} time -The time passes to keep track of whether the cooldown is fine.
         */
        RoomUltimate = (time) =>{
            //player ability to stop near enemies' actions 
                this.stoplist=[];
                this.manabar.cutManaBar(150);
                this.enemylist=[];
                this.wallList=[];
                this.stoptime=time+6000;
                this.stopcooldown = time + 5000;
                this.enemies.getChildren().map(child => this.enemylist.push(child));  
                for (let i = 0; i < this.enemylist.length; i++) {
                    if (this.enemylist[i].uid!=this.player.uid){
                        if (Math.abs(this.enemylist[i].x - this.player.x) < 150 && Math.abs(this.enemylist[i].y - this.player.y) < 100){ 
                            this.wall1=new Enemy(this,this.enemylist[i].x+25,this.enemylist[i].y+25,"wall","wall.png",this.player,null,100,0,0,0,0,0,this.player.uid).setScale(0.2);
                            this.wall2=new Enemy(this,this.enemylist[i].x-25,this.enemylist[i].y-25,"wall","wall.png",this.player,null,100,0,0,0,0,0,this.player.uid).setScale(0.2);
                            this.wall3=new Enemy(this,this.enemylist[i].x+25,this.enemylist[i].y-25,"wall","wall.png",this.player,null,100,0,0,0,0,0,this.player.uid).setScale(0.2);
                            this.wall4=new Enemy(this,this.enemylist[i].x-25,this.enemylist[i].y+25,"wall","wall.png",this.player,null,100,0,0,0,0,0,this.player.uid).setScale(0.2);
                        
                            this.stoplist.push(this.enemylist[i]);
                            this.wallList.push(this.wall1);
                            this.wallList.push(this.wall2);
                            this.wallList.push(this.wall3);
                            this.wallList.push(this.wall4);
                        
                            this.enemylist[i].body.immovable=true;
                            this.enemylist[i].body.moves=false;
                            this.enemylist[i].attackRange=0;
                            this.enemylist[i].tint=0x888C8D;
                            this.checkstop=() =>{
                                for (let j=0; j < this.wallList.length; j++){
                                    this.wallList[j].destroy();
                                }
                                for (let i = 0; i < this.stoplist.length; i++) {
                                    if(this.stoplist[i].active){
                                    this.stoplist[i].body.immovable=false;
                                    this.stoplist[i].body.moves=true;
                                    this.stoplist[i].attackRange=100;
                                    this.stoplist[i].tint=0xffb3b3;}                            
                                    }
                                }
                            }
                        }
                    }
                }
                   
                
    /**
     * returns the position the player should start out with depending on the tower they own
     * 
     * @param {number} towerNumber - the number of the tower 1 through 4
     * @returns {object} - {x:xValue,y:yValue}
     */
    startingPosFromTowerNum(towerNumber){
        if(towerNumber === 1){
            return {x:300,y:300};
        }
        else if(towerNumber === 2){
            return {x:1000,y:300};
        }
        else if(towerNumber === 3){
            return {x:300,y:1000};
        }
        else if(towerNumber === 4){
            return {x:1000,y:1000};
        }
    }


    /**
     * the update function of the scene that gets called by phaser 60 times a second
     * 
     * @param {number} time 
     * @param {number} delta 
     */
    update(time,delta) {
        //console.log(this.player.mana)
        this.count=0;
        if(this.GameIsGoing === false){
            return;
        }
        // if sword_in_the_stone is destoryed or the player's hp is below 0
        // you lsoe the game       
        if(this.mode==="single"){
            this.createEnemies(time);
            if(this.sword_in_the_stone.healthPoints<=0 && this.player.healthPoints<=0){
                
                this.scene.start(CST.SCENES.GAMEOVER);
        }
        // if all the enemy towers are destoryed, you win the game
        if(this.building.healthPoints<=0 && this.pyramid.healthPoints<=0 && this.magicstone.healthPoints<=0 &&this.building.healthPoints<=0){
            this.wonGame()
        }
    }
       // console.log(this.player.healthPoints)
        this.hud.update(time,this.player,this);
        if(this.player.mana<=1000){
        this.player.mana+=delta/1000;
        this.manabar.regenManaBar(delta/1000);}
        this.changeEnemyColor(this.player,time);
     
        //Handler character getting attacked by enemy, cooldown 3s

    /*    this.physics.world.collide(this.enemies, this.player, (enemy,player)=>{
            if(this.canBeAttacked < time){
               // console.log('got hit!');
                if (enemy.active && player.active ){
                    player.takeDamage(enemy.ATK);
                    console.log(player.healthPoints);
                    this.hpbar.cutHPBar(enemy.ATK);
                }
                this.canBeAttacked = time + 3000;
            }
        },null,this);*/


        //key control
        //movement note: we should only be able to move our character when it is alive

        if(this.player.active){
            if(this.keyboard.W.isDown){
                this.player.setVelocityY(-this.player.movementSpeed);
            }
            if(this.keyboard.S.isDown){
                this.player.setVelocityY(this.player.movementSpeed);
     
            }
            if(this.keyboard.A.isDown){
                this.player.setVelocityX(-this.player.movementSpeed);

            }
            if(this.keyboard.D.isDown){
                this.player.setVelocityX(this.player.movementSpeed);
 
            }
            if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.player.mana >= 5)
            {
                this.player.attack();

                //Testing: everytime we attack, decreases some mana
                this.player.mana -= 2;
                this.manabar.cutManaBar(2);
            }

            if(this.keyboard.W.isUp && this.keyboard.S.isUp){
                this.player.setVelocityY(0);

            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp){
                this.player.setVelocityX(0);

            }

            if(this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0){
                this.player.nonZeroVelocity = {x:this.player.body.velocity.x,y:this.player.body.velocity.y}; 
                //velocity unless the actual velocity is zero then it stores previous nonzero velocity
                //Need this value to keep track of the current direction when player is standing still. Prob will chage this later to direction
            }
            //Generate player ability and skills
            /*if (Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                this.player.attack();
            }*/
            //speed up the movement 

            if(this.player.mana>= 10 && Phaser.Input.Keyboard.JustDown(this.Qbar)){
                this.player.specialAttack();
                this.manabar.cutManaBar(10);
                
            }
            if(this.player.mana< 10 && Phaser.Input.Keyboard.JustDown(this.Qbar)){
                this.manawarning.setVisible(true);            
            }
            if(this.player.mana > 10){
                this.manawarning.setVisible(false);
            }

            if(this.keyboard.SHIFT.isDown&this.keyboard.W.isDown)
            {
                this.player.setVelocityY(-(3*this.player.movementSpeed));
                this.player.mana-=0.1;
            }
            if(this.keyboard.SHIFT.isDown&this.keyboard.A.isDown)
            {
                this.player.setVelocityX(-(3*this.player.movementSpeed));
                this.player.mana-=0.1;
            }
            if(this.keyboard.SHIFT.isDown&this.keyboard.S.isDown)
            {
                this.player.setVelocityY(3*this.player.movementSpeed);
                this.player.mana-=0.1;
            }
            if(this.keyboard.SHIFT.isDown&this.keyboard.D.isDown)
            {
                this.player.setVelocityX(3*this.player.movementSpeed);
                this.player.mana-=0.1;
            }
            
            }
            if (Phaser.Input.Keyboard.JustDown(this.Rbar))
            {   
                //test on regenerate hp function
                //his.hpbar.regenHPBar(10);

                if(this.player_scale === 2){
                    this.player.setScale(this.player_scale);
                    this.player_scale  --;
                    this.player.movementSpeed=200;
                }
                else{
                    this.player.setScale(this.player_scale);
                    this.player_scale  ++;
                    this.player.movementSpeed=150;
                }
            }
            if (Phaser.Input.Keyboard.JustDown(this.Tbar) && this.cooldowntime< time)
            {  
                this.createUltimate(time);
            
            }
            if (Phaser.Input.Keyboard.JustDown(this.Zbar)&& this.stopcooldown<time)
            {  
                this.RoomUltimate(time);
                this.stop=true;
            }
            if(this.destroytime < time){
                this.demonskill.destroy();
            }
            if(this.stoptime < time && this.stop){
                this.checkstop();
            
            }
   
}

       
  
    
    /**
     * @instance
     * @memberof PlayScene
     * @method wonGame
     * @description function that gets called when the player wins the game
     */
    wonGame = () => {
        this.GameIsGoing = false;
        let countDownText = this.add.text(this.player.x, this.player.y, "You Won", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
        countDownText.setOrigin(0.5, 0.5);
    }

    /**
     * @instance
     * @memberof PlayScene
     * @method gameOver
     * @description function that gets called when the player loses the game
     */
    gameOver = () => {
        this.GameIsGoing = false;
        let countDownText = this.add.text(this.player.x, this.player.y, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
        countDownText.setOrigin(0.5, 0.5);
    }

    /**
     * @instance
     * @memberof PlayScene
     * @method towerDestroyed
     * @description function that gets called when the players tower gets destroyed
     */
    towerDestroyed = () => {
        let countDownText = this.add.text(this.player.x, this.player.y, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
        countDownText.setOrigin(0.5, 0.5);
    }
        
    }