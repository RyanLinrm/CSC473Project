import Phaser from 'phaser';
import {Enemy} from "../gameObjects/Enemy";
import { emptyBar, HpBar, ManaBar } from "../gameObjects/StatusBar";
import * as firebase from 'firebase';

    /**
     * The HUD class.
     * This class is used in the playscene to create the heads up display for the class
     * this class was created in order to create seperate the things that are specific to the heads up display
     */
export class HUD {

    /**
     * 
     * sets up the hud using the data passed. 
     * 
     * @param {PlayScene} scene - the scene where the hud should go
     * @param {Player} player - the main player of the scene
     * @param {string} uid - the uid
     * @param {string} gamemode - the type of game "single" or "multi"
     * @param {*} room - the room id
     */
    constructor(scene, player, uid, gamemode, room) {
        this.gamemode=gamemode;
        this.scene=scene;
        this.draggable=true;
        this.dragCd=0;
        scene.player=player;
        if(gamemode === 'multi'){
            this.ref = firebase.database();
            this.roomkey = room;
            this.ref.ref(`Games/${this.roomkey}`).child(`dragdata`).child(uid).set({
                x: -1, y: -1, type: 'wolf', ownerid: uid, enemyid: '123'
            });
            this.ref.ref(`Games/${this.roomkey}`).child(`enemies`).set({});

        }
        //Mana and Health Bars
        //Stauts bars : hp with a front bar and backing bar
        scene.emptybar = new emptyBar(scene, 130,scene.game.renderer.height- 21).setDepth(2);
        scene.emptybar.setScrollFactor(0);
        this.hpbar = new HpBar(scene, 130,scene.game.renderer.height- 20, 'hp', player.healthPoints, player.uid).setDepth(3);
        this.hpbar.setScrollFactor(0);
        this.hpbar.value=scene.startingPlayerHealth;

        //Mana bar
        scene.emptybar2 = new emptyBar(scene, 130,scene.game.renderer.height- 51).setDepth(2);
        scene.emptybar2.setScrollFactor(0);
        this.manabar = new ManaBar(scene, 130,scene.game.renderer.height- 50, 'mana', player.mana, player.uid).setDepth(3);
        this.manabar.setScrollFactor(0);
        //Mana and Health Bars

        //Side HUD
        let sideHUD = scene.add.rectangle(0, scene.game.renderer.height/2,
            140, scene.game.renderer.height/2 * 4 , 0x000000).setInteractive();

        sideHUD.setScrollFactor(0);
        this.timer = scene.add.text(0,60,'Timer:'+ Math.trunc(scene.time),{ fontFamily: 'Georgia', fontSize: 17, color: '#ffffff' });
        this.timer.setScrollFactor(0);    

        if(gamemode === 'multi'){
            this.scoreShow = scene.add.text(0,80,'Score: 0',{ fontFamily: 'Georgia', fontSize: 17, color: '#ffffff' });
            this.scoreShow.setScrollFactor(0);
        }

        this.startingPlayerHealth = scene.startingPlayerHealth;

        let player1 = scene.add.sprite(35, scene.game.renderer.height / 5 , "p1").setScrollFactor(0).setInteractive();
        let player1Health = scene.add.text(35, scene.game.renderer.height / 5 + 30, `${this.startingPlayerHealth}/${this.startingPlayerHealth}`, { fontSize: 15, color: '#FF0000' });
        player1Health.setOrigin(0.5); player1Health.setScrollFactor(0);
        this.playerHealthLabels = [player1Health];

        for(let i = 1; i < scene.players; i++){
            let player = scene.add.sprite(35, scene.game.renderer.height / 5 * (i+1), "p1").setScrollFactor(0).setInteractive();
            let playerHealth = scene.add.text(35, scene.game.renderer.height /5 * (i+1) + 30,  `${this.startingPlayerHealth}/${this.startingPlayerHealth}`, { fontSize: 15, color: '#FF0000' });
            playerHealth.setScrollFactor(0); playerHealth.setOrigin(0.5);
            this.playerHealthLabels.push(playerHealth);
        }
        
      


        //BottomHUD
        let hud = scene.add.rectangle(scene.game.renderer.width / 2, scene.game.renderer.height,
            scene.game.renderer.width , 140, 0x000000).setInteractive();

        hud.setScrollFactor(0);
        let unit1 = scene.add.sprite(scene.game.renderer.width*0.25, scene.game.renderer.height-35, "ninjabot").setScrollFactor(0).setInteractive();
        let unit2 = scene.add.sprite(scene.game.renderer.width*0.35, scene.game.renderer.height-35, "wolf").setScrollFactor(0).setInteractive();
        let unit3 = scene.add.sprite(scene.game.renderer.width*0.45, scene.game.renderer.height-35, "skull").setScrollFactor(0).setInteractive();
        let unit4 = scene.add.sprite(scene.game.renderer.width*0.55, scene.game.renderer.height-35, "demon1").setScrollFactor(0).setInteractive();
        let unit5 = scene.add.sprite(scene.game.renderer.width*0.65, scene.game.renderer.height-35, "wall").setScrollFactor(0).setInteractive().setScale(0.4);
        
      
    
        if(this.draggable){
        scene.input.setDraggable([unit1, unit2, unit3,unit4,unit5]);
        var originalX;
        var originalY;
        scene.input.on('dragstart', (pointer, unit) => {
            originalX = unit.x;
            originalY = unit.y;
        });
        scene.input.on('drag', (pointer, unit, dragX, dragY) => {
            unit.x = dragX;
            unit.y = dragY;
        });
        
        
      
        scene.input.on('dragend', (pointer, unit) => {
            if(player.mana>=100 && player.active){
            //   scene.add.sprite(pointer.worldX, pointer.worldY, unit.texture.key);
                if(unit.texture.key==='wolf'){              
                    scene.newenemy =new Enemy(scene, pointer.worldX, pointer.worldY, "wolf", "wolf_01.png",player,0,200,0.1,5,50,99,200,player.uid);
                    scene.player.mana-=50;
                    this.manabar.cutManaBar(50);
                    if(gamemode === 'multi'){
                        let enemyid = this.updateDragToOtherPlayers(pointer.worldX,pointer.worldY,'wolf',player.uid);
                        scene.newenemy.assignSelfID(enemyid, this.roomkey);
                        scene.mybuddies[enemyid] = scene.newenemy;
                    }
               }
       
               if(unit.texture.key==='ninjabot'){              
                    scene.newenemy=new Enemy(scene, pointer.worldX, pointer.worldY, "ninjabot", "ninjabot_01.png",player,1,100,0.8,5,180,60,700,player.uid)
                    scene.player.mana-=25;
                    this.manabar.cutManaBar(25)
                    if(gamemode === 'multi'){
                        let enemyid = this.updateDragToOtherPlayers(pointer.worldX,pointer.worldY,'ninjabot',player.uid);
                        scene.newenemy.assignSelfID(enemyid, this.roomkey);
                        scene.mybuddies[enemyid] = scene.newenemy;
                    }
               }
               
               if(unit.texture.key==='skull'){              
                    scene.newenemy=new Enemy(scene,pointer.worldX,pointer.worldY,"skull","skull_01.png",player,3,200,0.8,5,180,60,650,player.uid).setScale(0.9);
                    scene.player.mana-=25;
                    this.manabar.cutManaBar(25);
                    if(gamemode === 'multi'){
                        let enemyid = this.updateDragToOtherPlayers(pointer.worldX,pointer.worldY,'skull',player.uid);
                        scene.newenemy.assignSelfID(enemyid, this.roomkey);
                        scene.mybuddies[enemyid] = scene.newenemy;
                    }
               }
               if(unit.texture.key==='demon1'){              
                    scene.newenemy=new Enemy(scene,pointer.worldX,pointer.worldY,"demon1","demon1_01.png",player,2,200,0.7,2,200,70,500, player.uid).setScale(1.5);
                    scene.player.mana-=50
                    this.manabar.cutManaBar(50);
                    if(gamemode === 'multi'){
                        let enemyid = this.updateDragToOtherPlayers(pointer.worldX,pointer.worldY,'demon1',player.uid);
                        scene.newenemy.assignSelfID(enemyid, this.roomkey);
                        scene.mybuddies[enemyid] = scene.newenemy;
                    }
               }
               if(unit.texture.key==='wall'){              
                    scene.newenemy=new Enemy(scene,pointer.worldX,pointer.worldY,"wall","wall.png",player,null,100,0,0,0,0,0,player.uid).setScale(0.5);
                    scene.newenemy.body.immovable=true;
                    scene.newenemy.body.moves=false;
                    scene.player.mana-=20;
                    this.manabar.cutManaBar(20);
                    if(gamemode === 'multi'){
                        let enemyid = this.updateDragToOtherPlayers(pointer.worldX,pointer.worldY,'wall',player.uid);
                        scene.newenemy.assignSelfID(enemyid, this.roomkey);
                        scene.mybuddies[enemyid] = scene.newenemy;
                    }
                }
               unit.x = originalX;
               unit.y = originalY;
               scene.enemies.add(scene.newenemy);
               scene.attackableGroup.add(scene.newenemy);
       
     } });}
        //Bottom HUD
     }

    setPlayerHealth = (playerNumber,health)=>{
        this.playerHealthLabels[playerNumber - 1].setText(`${health}/${this.startingPlayerHealth}`); //setsThePlayer health label to the given health value
    }

    setScore = ( newscore ) => {
        this.scoreShow.setText('Score: '+ `${newscore}`);
    }


    updateDragToOtherPlayers = (xval, yval, enemytype, playerid ) => {
        //store enemy into database to keep track
        let key = this.ref.ref(`Games/${this.roomkey}/enemies`).push({
            ownerid: playerid,
            alive: true,
            killerid: ''
        });
        let enemyid = key.key;
        
        //save the information of the new enemy into database for other players to generate on their local machine
        this.ref.ref(`Games/${this.roomkey}/dragdata/${playerid}`).update({ 
            x: xval,
            y: yval,
            type: enemytype,
            ownerid: playerid,
            enemyid: enemyid});
        
        return enemyid;
    
    }
    update(time,player,scene){

 
        if(player.beingAttacked===true){
            this.hpbar.cutHPBar(5);             
            }

        this.timer.setText( 'Timer: ' + Math.trunc(time/1000));

    }

}
