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

export class PlayScene extends Phaser.Scene{
    constructor(){
        super({key:CST.SCENES.PLAY});
    }

    preload(){ 
       this.load.image("tiles1", `${process.env.PUBLIC_URL}/assets/tiles/map_atlas.png`);
        this.load.image("tiles2", `${process.env.PUBLIC_URL}/assets/tiles/map_atlas2.png`);

        this.load.tilemapTiledJSON("Mymap",`${process.env.PUBLIC_URL}/assets/map/map.json`);
    }

    create(){
        //Create an enemygroup with runChildUpdate set to true. Every enemy added to this group will have its update function then called. 
        //Without this groupt the update funciton would not be called for the enemies
        this.enemyGroup = this.add.group({runChildUpdate: true}); 
        this.bullets = this.add.group({runChildUpdate: true}); 
        //create phaser game object, and add in sprite
  
        //this.player = new Player(this,300,300, "p1", "p1_01.png",10);

        this.player = new Bomber(this,300,300, "p1", "p1_01.png",100);
        //adjust player hit box
        this.player.setSize( 24, 28).setOffset(5,5);
        //The enemies  
        this.wolf = new Enemy(this,100,100, "wolf", "Wolf_01.png",this.player,10);
        this.ninjabot= new Enemy(this,200,150,"ninjabot","ninjabot_1.png",this.player,10);
        this.demon1=new Enemy(this,575,500,"demon1","demon1_01").setScale(1.5);
        this.enemyGroup.add(this.wolf);
        this.enemyGroup.add(this.ninjabot);

       
        //create a sample minimap ---needs to change to dynamic
        this.minimap = this.cameras.add(590, 5, 250, 150).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.scrollX = 600;
        this.minimap.scrollY = 600;

        //adding buildings for each player
        
        this.building=new Units(this,1200,1200,"building1");
        this.building.setScale(0.15);
        this.University=new Units(this,1200,0,"University");
        this.University.setScale(1.5);
        this.pyramid=new Units(this,0,0,"pyramid");
        this.pyramid.setScale(1.5);
        this.magicstone=new Units(this,0,1200,"magicstone");
        this.magicstone.setScale(1.5);
        //adding resrouces to the middle 
        this.sword_in_the_stone=new Units(this,645,645,"sword_in_the_stone");
        this.sword_in_the_stone.setScale(0.5);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.enemyGroup, this.enemyGroup);
        this.physics.add.collider(this.player, this.enemyGroup);
       
       //set up attacking animation check
       this.anims.create({
        key: "ab2",
        frameRate: 8,
        //walking downward animation frames
        frames: this.anims.generateFrameNames('ability2', {
        start:1, end:10, zeroPad:1,
        prefix:'a2_', suffix: '.png'
        }),
        repeat: -1
     });
        this.add.sprite(600, 500, 'a2_01').play('ab2');




        //create animations for different directions 
    

        this.anims.create({
            key: "down",
            frameRate: 8,
            //walking downward animation frames
            frames: this.anims.generateFrameNames('p1', {
            start:0, end:2, zeroPad:1,
            prefix:'p1_', suffix: '.png'
            })
        });
        

        this.anims.create({
            key:'left', 
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('p1', {
            start:3, end:5, zeroPad:1,
            prefix:'p1_', suffix: '.png'
            })
        });

        this.anims.create({
            key:'right', 
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('p1', {
            start:6, end:8, zeroPad:1,
            prefix:'p1_', suffix: '.png'
            })
        });

        this.anims.create({
            key:'up',
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('p1', {
            start:9, end:11, zeroPad:1,
            prefix:'p1_', suffix: '.png'
            })
        });

        //input and phyics
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D, SHIFT, Q");
      
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Rbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.Tbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        //Map

        //add in our map
        let Mymap = this.add.tilemap("Mymap");

        let tiles1 = Mymap.addTilesetImage("map_atlas", "tiles1");
        let tiles2 = Mymap.addTilesetImage("map_atlas2", "tiles2");

       // display layers
        let groundLayer = Mymap.createStaticLayer("GroundLayer", [tiles1], 0 , 0).setDepth(-3);
        let centerLayer = Mymap.createStaticLayer("Center", [tiles2], 0 , 0).setDepth(-1);
        let waterLayer = Mymap.createStaticLayer("Water", [tiles1], 0 , 0).setDepth(-2);
        let objectLayer = Mymap.createStaticLayer("Objects", [tiles1], 0 , 0).setDepth(-1);
        let addonLayer = Mymap.createStaticLayer("AddOn", [tiles1], 0 , 0).setDepth(-1);
        let CollisionLayer = Mymap.createStaticLayer("Collision",[tiles1], 0, 0);

        //Collision layer handler
        CollisionLayer.setCollisionByProperty({collides:true});
        waterLayer.setCollisionByProperty({collides:true});

        //Assign collider objects
        this.physics.add.collider(this.player, CollisionLayer);
        this.physics.add.collider(this.player, waterLayer);
        this.physics.add.collider(this.enemyGroup, waterLayer);
        this.physics.add.collider(this.enemyGroup, CollisionLayer);
  
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



       /* //If it gets the character, character decreases healthpoint until he is dead
        let collider = this.physics.add.overlap(this.wolf, this.player, (overlaped) =>{
            //stop when they overplay, kill the player(test)
            overlaped.body.stop();
            this.player.healthPoints--;
            if(this.player.healthPoints<=0){
            this.player.kill();}
            this.physics.world.removeCollider(collider);
        }, null, this);*/

        /*let collider2 = this.physics.add.overlap(this.bullets, this.wolf, (overlaped) =>{
            //stop when they overplay, kill the player(test)
            overlaped.body.stop();
            this.player.kill();
            this.physics.world.removeCollider(collider2);
        }, null, this);*/

        this.physics.world.addCollider(this.wolf, this.ninjabot, ()=>{} );
        this.physics.world.addCollider(this.player, this.ninjabot, ()=>{} );

        this.physics.add.overlap(this.wolf,this.player.bullets,overlapHandler);

        function overlapHandler(enemy, bullet){
            console.log('hit!');
                if (enemy.active && bullet.active ){
                    bullet.setActive(false);
                    bullet.setVisible(false);
                }
                enemy.takeDamage(10);
        }
    }

    update(time,delta) {
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
            if (Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                this.player.attack();
            }
            if(this.keyboard.Q.isDown){
                this.player.specialAttack();
            }
            if(this.keyboard.W.isUp && this.keyboard.S.isUp){
                this.player.setVelocityY(0);

            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp){
                this.player.setVelocityX(0);

            }
            if(this.player.body.velocity.x > 0){
                this.player.play("right", true);
            } else if(this.player.body.velocity.x < 0){
                this.player.play("left",true);
            }else if(this.player.body.velocity.y > 0){
                this.player.play("down",true);
            }else if(this.player.body.velocity.y < 0){
                this.player.play("up",true);
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
            if(this.keyboard.SHIFT.isDown&this.keyboard.W.isDown)
            {
                this.player.setVelocityY(-(3*this.player.movementSpeed));
            }
            if(this.keyboard.SHIFT.isDown&this.keyboard.A.isDown)
            {
                this.player.setVelocityX(-(3*this.player.movementSpeed));
            }
            if(this.keyboard.SHIFT.isDown&this.keyboard.S.isDown)
            {
                this.player.setVelocityY(3*this.player.movementSpeed);
            }
            if(this.keyboard.SHIFT.isDown&this.keyboard.D.isDown)
            {
                this.player.setVelocityX(3*this.player.movementSpeed);
            }
            //still need to work on how to combine the two using only one key
            if (Phaser.Input.Keyboard.JustDown(this.Rbar))
            {
                this.player.setScale(2);
            }
            if (Phaser.Input.Keyboard.JustDown(this.Tbar))
            {
                this.player.setScale(1);
            }
    


        /*this.physics.world.addCollider(this.player, this.wolf, (collider)=>{
            this.wolf.attackEnemy();
            this.damessage = this.add.text(this.player.x, this.player.y - 10, '', { font: '16px Courier', fill: '#FF0000' });
            this.damessage.setText('- ' + this.wolf.ATK);
        })*/


    }
    }
}

