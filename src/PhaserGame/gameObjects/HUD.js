import Phaser from 'phaser';
import {Enemy} from "../gameObjects/Enemy";
import { emptyBar, HpBar, ManaBar } from "../gameObjects/StatusBar";

export class HUD {
    constructor(scene) {
        //Mana and Health Bars
        //Stauts bars : hp with a front bar and backing bar
        scene.emptybar = new emptyBar(scene, 130,scene.game.renderer.height- 21).setDepth(2);
        scene.emptybar.setScrollFactor(0);
        scene.hpbar = new HpBar(scene, 130,scene.game.renderer.height- 20, 'hp', scene.player.healthPoints).setDepth(3);
        scene.hpbar.setScrollFactor(0);

        //Mana bar
        scene.emptybar2 = new emptyBar(scene, 130,scene.game.renderer.height- 51).setDepth(2);
        scene.emptybar2.setScrollFactor(0);
        scene.manabar = new ManaBar(scene, 130,scene.game.renderer.height- 50, 'mana', scene.player.mana).setDepth(3);
        scene.manabar.setScrollFactor(0);
        //Mana and Health Bars

        //Side HUD
        let sideHUD = scene.add.rectangle(0, scene.game.renderer.height/2,
            140, scene.game.renderer.height/2 * 4 , 0x000000).setInteractive();

        sideHUD.setScrollFactor(0);

        let player1 = scene.add.sprite(35, scene.game.renderer.height / 5 , "p1").setScrollFactor(0).setInteractive();
        let player1Health = scene.add.text(35, scene.game.renderer.height / 5 + 30, '500/500', { fontSize: 15, color: '#FF0000' });
        
        let player2 = scene.add.sprite(35, scene.game.renderer.height /5 * 2, "p1").setScrollFactor(0).setInteractive();
        let player2Health = scene.add.text(35, scene.game.renderer.height /5 * 2 + 30, '500/500', { fontSize: 15, color: '#FF0000' });

        let player3 = scene.add.sprite(35, scene.game.renderer.height/ 5 * 3, "p1").setScrollFactor(0).setInteractive();
        let player3Health = scene.add.text(35, scene.game.renderer.height/ 5 * 3 + 30, '500/500', { fontSize: 15, color: '#FF0000'});

        let player4 = scene.add.sprite(35, scene.game.renderer.height/ 5 * 4, "p1").setScrollFactor(0).setInteractive();
        let player4Health = scene.add.text(35, scene.game.renderer.height/ 5 * 4 + 30, '500/500', { fontSize: 15, color: '#FF0000'});

        this.playerHealthLabels = [player1Health,player2Health,player3Health,player4Health];

        player1Health.setOrigin(0.5); player2Health.setOrigin(0.5); 
        player3Health.setOrigin(0.5); player4Health.setOrigin(0.5);
        player1Health.setScrollFactor(0); player2Health.setScrollFactor(0); 
        player3Health.setScrollFactor(0); player4Health.setScrollFactor(0);
        //Side HUD

        this.setPlayerHealth(1,400);

        //BottomHUD
        let hud = scene.add.rectangle(scene.game.renderer.width / 2, scene.game.renderer.height,
            scene.game.renderer.width , 140, 0x000000).setInteractive();


        hud.setScrollFactor(0);
        let unit1 = scene.add.sprite(scene.game.renderer.width*0.25, scene.game.renderer.height-35, "ninjabot").setScrollFactor(0).setInteractive();
        let unit2 = scene.add.sprite(scene.game.renderer.width*0.35, scene.game.renderer.height-35, "wolf").setScrollFactor(0).setInteractive();
        let unit3 = scene.add.sprite(scene.game.renderer.width*0.45, scene.game.renderer.height-35, "skull").setScrollFactor(0).setInteractive();
        let unit4 = scene.add.sprite(scene.game.renderer.width*0.55, scene.game.renderer.height-35, "demon1").setScrollFactor(0).setInteractive();
        let unit5 = scene.add.sprite(scene.game.renderer.width*0.65, scene.game.renderer.height-35, "wall").setScrollFactor(0).setInteractive().setScale(0.4);
        
       

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
            //   scene.add.sprite(pointer.worldX, pointer.worldY, unit.texture.key);
           if(scene.player.mana>5){
                if(unit.texture.key==='wolf'){              
                   scene.newenemy=new Enemy(scene, pointer.worldX, pointer.worldY, "wolf", "Wolf_01.png",scene.player,0,200,0.1,5,20,99);
                   scene.player.mana-=50;
                   scene.manabar.cutManaBar(50);
               }
       
               if(unit.texture.key==='ninjabot'){              
                   scene.newenemy=new Enemy(scene, pointer.worldX, pointer.worldY, "ninjabot", "ninjabot_1.png",scene.player,1)
                   scene.player.mana-=25;
                   scene.manabar.cutManaBar(25)
               }
               
               if(unit.texture.key==='skull'){              
                   scene.newenemy=new Enemy(scene,pointer.worldX,pointer.worldY,"skull","skull_01",scene.player,3,200).setScale(0.9);
                   scene.player.mana-=25;
                   scene.manabar.cutManaBar(25);
               }
               if(unit.texture.key==='demon1'){              
                   scene.newenemy=new Enemy(scene,pointer.worldX,pointer.worldY,"demon1","demon1_01",scene.player,2,200,0.7,2,200,70).setScale(1.5);
                   scene.player.mana-=40;
                   scene.manabar.cutManaBar(40);
               }
               if(unit.texture.key==='wall'){              
                scene.newenemy=new Enemy(scene,pointer.worldX,pointer.worldY,"wall","wall_01",scene.player,null,100,0,0,0,0,0).setScale(0.5);
                scene.newenemy.body.immovable=true;
                scene.newenemy.body.moves=false;
                scene.player.mana-=20;
                scene.manabar.cutManaBar(20);
                }
               unit.x = originalX;
               unit.y = originalY;
               scene.enemies.add(scene.newenemy);
       
               scene.attackableGroup.add(scene.newenemy);
       
           }});
        //Bottom HUD
    }

    setPlayerHealth = (playerNumber,health)=>{
        this.playerHealthLabels[playerNumber - 1].setText(`${health}/500`); //setsThePlayer health label to the given health value
    }
}