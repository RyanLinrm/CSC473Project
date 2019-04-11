//Play scene for our basic playground
//All the functions and character added in this file will be temporary
//just for demo
//Use scene list to generate keyword
import { CST } from "../CST";
import { Units } from "../Units";
export class PlayScene extends Phaser.Scene{
    constructor(){
        super({key:CST.SCENES.PLAY});
    }

    preload(){ 
        this.load.image("tiles1", "./assets/tiles/map_atlas.png");
        this.load.image("tiles2", "./assets/tiles/map_atlas2.png");

        this.load.tilemapTiledJSON("Mymap","./assets/map/map.json");
    }

    create(){
        //create phaser game object, and add in sprite
        this.player = this.physics.add.sprite(300, 300, "magic", "Magic_01.png" );
        this.angle=new Units(this,200,150,"angle","angle_01.png");
        this.wolf = this.physics.add.sprite(100, 100, "wolf", "Wolf_01.png" );
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

        this.hud = this.add.rectangle(this.game.renderer.width/2, this.game.renderer.height, 
                                      this.game.renderer.width*2/3, 140, 0x000000).setInteractive();
        this.hud.setScrollFactor(0);

        this.unit1 = this.add.sprite(this.game.renderer.width/3, this.game.renderer.height-35, "magic").setScrollFactor(0).setInteractive();
        this.unit2 = this.add.sprite(this.game.renderer.width/2, this.game.renderer.height-35, "wolf").setScrollFactor(0).setInteractive();
        this.unit3 = this.add.sprite(this.game.renderer.width*2/3, this.game.renderer.height-35, "angel").setScrollFactor(0).setInteractive();

        this.input.setDraggable([this.unit1, this.unit2, this.unit3]);
        var originalX;
        var originalY;
        this.input.on('dragstart', (pointer, unit) => {
            originalX = unit.x;
            originalY = unit.y;
        });
        this.input.on('drag', (pointer, unit, dragX, dragY) => {
            unit.x = dragX;
            unit.y = dragY;
        }); 
        this.input.on('dragend', (pointer, unit) => {
            this.add.sprite(pointer.worldX, pointer.worldY, unit.texture.key);
            unit.x = originalX;
            unit.y = originalY;
        }); 
    
        

        //create animations for different directions 
    

        this.anims.create({
            key: "down",
            frameRate: 8,
            //walking downward animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:1, end:4, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });
        

        this.anims.create({
            key:'left', 
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:5, end:8, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key:'right', 
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:9, end:12, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });

        this.anims.create({
            key:'up',
            frameRate: 8,
            //walking left animation frames
            frames: this.anims.generateFrameNames('magic', {
            start:13, end:16, zeroPad:2,
            prefix:'Magic_', suffix: '.png'
            }),
            repeat: -1
        });

        //input and phyics
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        
        //add in our map
        let Mymap = this.add.tilemap("Mymap");

        let tiles1 = Mymap.addTilesetImage("map_atlas", "tiles1");
        let tiles2 = Mymap.addTilesetImage("map_atlas2", "tiles2");

        //display layers
        let groundLayer = Mymap.createStaticLayer("GroundLayer", [tiles1], 0 , 0).setDepth(-1);
        let centerLayer = Mymap.createStaticLayer("Center", [tiles2], 0 , 0).setDepth(-1);
        let waterLayer = Mymap.createStaticLayer("Water", [tiles1], 0 , 0).setDepth(-1);
        let objectLayer = Mymap.createStaticLayer("Objects", [tiles1], 0 , 0).setDepth(-1);
        let addonLayer = Mymap.createStaticLayer("AddOn", [tiles1], 0 , 0).setDepth(-1);


        //Camera
        // set bounds to avoid camera goes outside the map
        this.physics.world.setBounds(0, 0, Mymap.widthInPixels, Mymap.heightInPixels);

        //camera follows the player
        this.cameras.main.startFollow(this.player);


        //If it gets the character, character dies
        /*let collider = this.physics.add.overlap(this.wolf, this.player, (overlaped) =>{
            //stop when they overplay, kill the player(test)
            overlaped.body.stop();
            this.player.destroy();
            this.physics.world.removeCollider(collider);
        }, null, this);*/

    }

    update(time,delta) {
        
        //key control
        //movement note: we should only be able to move our character when it is alive
     
        if(this.player.active){
            if(this.keyboard.W.isDown){
                this.player.setVelocityY(-64);
                this.player.play("up", true);
            }
            if(this.keyboard.S.isDown){
                this.player.setVelocityY(64);
                this.player.play("down", true);
            }
            if(this.keyboard.A.isDown){
                this.player.setVelocityX(-64);
                this.player.play("left", true);
            }
            if(this.keyboard.D.isDown){
                this.player.setVelocityX(64);
                this.player.play("right", true);
            }
            if(this.keyboard.W.isUp && this.keyboard.S.isUp){
                this.player.setVelocityY(0);

            }
            if(this.keyboard.A.isUp && this.keyboard.D.isUp){
                this.player.setVelocityX(0);

            }
        }

        //TEST!!!---let the monster chases our character
        this.physics.moveToObject(this.wolf, this.player);
        this.physics.moveToObject(this.angle, this.player);
    }

}