//Play scene for our basic playground
//All the functions and character added in this file will be temporary
//just for demo
//Use scene list to generate keyword
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


export class PlayScene extends Phaser.Scene{

    constructor(sceneKey = CST.SCENES.PLAY){
        super({key:sceneKey});
        this.sceneType = "Single";
        this.seatNumber = 1;
        this.single = true;
    }

    preload(){ 
        spriteAnimations(this);
        this.load.image("tiles1", `${process.env.PUBLIC_URL}/assets/tiles/map_atlas.png`);
        this.load.image("tiles2", `${process.env.PUBLIC_URL}/assets/tiles/map_atlas2.png`);

        this.load.tilemapTiledJSON("Mymap",`${process.env.PUBLIC_URL}/assets/map/map.json`);
    }

    init(data){
        this.spritekey = data
    }

    create(uid, multi){
        this.playerUid = uid;
        if(multi) this.single = false;
        console.log(this.single);
        //Create an enemygroup with runChildUpdate set to true. Every enem y added to this group will have its update function then called. 
        //Without this groupt the update funciton would not be called for the enemies
       
        this.updatingSpriteGroup = this.add.group({runChildUpdate: true}); //Sprites that should run their own update function
        this.updateSprite = (sprite) => this.updatingSpriteGroup.add(sprite); //adds sprite to updating group

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
        this.bothCollisions = (objectA,objectB)=>{
            
            if(objectA.active && objectB.active){
                if(objectA.uid !== objectB.uid){
                objectA.collision();
                objectB.collision();
                }
                 
            }
        };
        this.physics.add.overlap(this.damageItems, this.enemyTowers,this.bothCollisions);
        this.physics.add.overlap(this.damageItems, this.enemies,this.bothCollisions);
        this.physics.add.overlap(this.enemiesAttacks,this.enemyPlayers,this.bothCollisions);
        this.physics.add.overlap(this.towerShooting,this.enemyPlayers,this.bothCollisions);
        this.physics.add.overlap(this.enemiesAttacks,this.enemyTowers,this.bothCollisions);
        this.physics.add.overlap(this.towerShooting,this.enemies,this.bothCollisions);
        //this.physics.add.overlap(this.damageItems,this.enemyPlayers,bothCollisions);
        let playerStartingPos = this.startingPosFromTowerNum(1);
      //  this.player = new Bomber(this,playerStartingPos.x,playerStartingPos.y, "p1", "p1_01.png",0,500,150);
        switch(this.spritekey){
            case "bomber":
            this.player = new Bomber(this,playerStartingPos.x,playerStartingPos.y, "p1", "p1_01.png",0,500,150,this.playerUid);
            break;
            case "rider":
            this.player = new Rider(this,playerStartingPos.x,playerStartingPos.y, "rider", "rider_01.png",1,500,200,this.playerUid).setScale(0.8);
            break;
        }
        this.enemyPlayers.add(this.player);

        
        this.towers = this.add.group(); 
        this.towers.removeCallback = (tower)=>{
            
            if(tower.tower_ID === this.seatNumber){
                this.towerDestroyed(tower.tower_ID);
            }
            else{
                console.log(this.towers.getLength());
                if(this.towers.getLength() === 1 && this.GameIsGoing === true){
                    this.wonGame();
                }
            }
           
        };

        //adjust player hit box
        //this.player.setSize( 24, 28).setOffset(5,5);
      
        //The enemies  
        this.wolf = new Enemy(this, 100, 100, "wolf", "Wolf_01.png",this.player,0,200,0.1,5,20,60,'224');
        this.ninjabot= new Enemy(this, 200, 150, "ninjabot", "ninjabot_1.png",this.player,1) ;
  
        
        //this.container= this.add.container(200, 200);
        this.demon1=new Enemy(this,300,300,"demon1","demon1_01",this.player,2,200).setScale(1.5);
   
        //this.container.add(this.skill)
        this.enemies.add(this.wolf); ///Need to move this into the enemy class
        this.enemies.add(this.ninjabot);
        this.enemies.add(this.demon1);


    
       
        //warning when manabar is too low for a special attack
        this.manawarning = this.add.text(150,73,'low mana').setDepth(3);
        this.manawarning.setScrollFactor(0);
        this.manawarning.setVisible(false)

      
        //Mini Map

        //create a sample minimap ---needs to change to dynamic
      /*  this.minimap = this.cameras.add(this.game.renderer.width - 255, 0, 300, 300).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 600;  
        this.minimap.scrollY = 500; */

        this.timer = this.add.text(550,65,'Timer:'+ Math.trunc(this.time)).setDepth(3);
        this.timer.setScrollFactor(0);

        //adding buildings for each player
        
        this.building=new Units(this,1200,1200,1150,1099,"building1",1,4,1000,1,180,200).setScale(0.15);
        this.university=new Units(this,1200,0,1150,-1,"university",1,2,1000).setScale(1.5);
        this.pyramid=new Units(this,0,0,100,-1,"pyramid",1,1,1000,4,180,200,this.playerUid).setScale(1.5);
        this.magicstone=new Units(this,0,1200,100,1089,"magicstone",1,3,1000).setScale(1.5);
        this.towers.add(this.building); //Move into unit class
        this.towers.add(this.university);
        this.towers.add(this.pyramid);
        this.towers.add(this.magicstone);

        console.log(this.building.tower_ID);
        console.log(this.university.tower_ID);
        console.log(this.pyramid.tower_ID);
        console.log(this.magicstone.tower_ID);        
        //adding resrouces to the middle 
        this.sword_in_the_stone=new Units(this,645,645,645,595,"sword_in_the_stone");
        this.sword_in_the_stone.setScale(0.5);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.player, this.enemies);
      

        //HUD
        if(this.single) {
            var hUD = new HUD(this, this.player, this.player.uid);
            this.player.setSize(34, 36);
        }    

        //adjust player hit box
        this.player.setSize(34, 36);
        //The enemies  
        this.wolf = new Enemy(this, 200, 200, "wolf", "Wolf_01.png",this.player,0,200,0.1,5,20,99,200,this.playerUid);
        this.ninjabot= new Enemy(this, 300, 350, "ninjabot", "ninjabot_1.png",this.player,1,100,0.8,5,180,60,700,this.playerUid) ;
  
        
        //this.container= this.add.container(200, 200);
        //this.demon1=new Enemy(this,300,300,"demon1","demon1_01",this.player,2,200).setScale(1.5);
   
        //this.container.add(this.skill)
        this.enemies.add(this.wolf); ///Need to move this into the enemy class
        this.enemies.add(this.ninjabot);
    
        this.newenemyposx=hUD.newenemyposx;
        this.newenemyposy=hUD.newenemyposy;
        console.log(this.newenemyposx)
        //input and phyics
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SHIFT");     
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Rbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.Tbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.Qbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
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
        this.physics.add.collider(this.enemies, this.waterLayer);
        this.physics.add.collider(this.enemies, this.CollisionLayer);
  
        //Map collision debug mode
        this.debugGraphics = this.add.graphics();
 
        Mymap.renderDebug(this.debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 128), 
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) 
          });



        //Camera

        // set bounds to avoid camera goes outside the map
        this.physics.world.setBounds(0, 0, Mymap.widthInPixels, Mymap.heightInPixels);

        //camera follows the player
        this.cameras.main.startFollow(this.player);


        // Useful states to manage handlers in update function

        this.canBeAttacked = 0; //If our character can be attacked
        this.canAttack = 0; //If the enemy can be attacked

        this.player_scale = 2;
    }

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



    update(time,delta) {
        if(this.GameIsGoing === false){
            return;
        }
        //console.log(this.player.mana);
        this.timer.setText( 'Timer: ' + Math.trunc(time/1000))

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
                /*this.player.mana -= 2;
                this.manabar.cutManaBar(2);*/
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
                this.hpbar.regenHPBar(10);

                if(this.player_scale === 2){
                    this.player.setScale(this.player_scale);
                    this.player_scale  --;
                }
                else{
                    this.player.setScale(this.player_scale);
                    this.player_scale  ++;
                }
            }
            this.manabar.update(time,delta);
        }

        wonGame = ()=>{
            this.GameIsGoing = false;
            let countDownText= this.add.text(this.player.x, this.player.y, "You Won", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
            countDownText.setOrigin(0.5,0.5); 
        }
    
        gameOver = ()=>{
            this.GameIsGoing = false;
            let countDownText= this.add.text(this.player.x, this.player.y, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
            countDownText.setOrigin(0.5,0.5); 
        }

        towerDestroyed = ()=>{
            let countDownText= this.add.text(this.player.x, this.player.y, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
            countDownText.setOrigin(0.5,0.5); 
        }
        
    }
