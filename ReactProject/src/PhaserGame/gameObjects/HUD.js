import Phaser from 'phaser';
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


        player1Health.setOrigin(0.5); player2Health.setOrigin(0.5); 
        player3Health.setOrigin(0.5); player4Health.setOrigin(0.5);
        player1Health.setScrollFactor(0); player2Health.setScrollFactor(0); 
        player3Health.setScrollFactor(0); player4Health.setScrollFactor(0);
        //Side HUD



        //BottomHUD
        let hud = scene.add.rectangle(scene.game.renderer.width / 2, scene.game.renderer.height,
            scene.game.renderer.width , 140, 0x000000).setInteractive();


        hud.setScrollFactor(0);

        let unit1 = scene.add.sprite(scene.game.renderer.width / 3, scene.game.renderer.height - 35, "ninjabot").setScrollFactor(0).setInteractive();
        let unit2 = scene.add.sprite(scene.game.renderer.width / 2, scene.game.renderer.height - 35, "wolf").setScrollFactor(0).setInteractive();
        let unit3 = scene.add.sprite(scene.game.renderer.width * 2 / 3, scene.game.renderer.height - 35, "skull").setScrollFactor(0).setInteractive();

        scene.input.setDraggable([unit1, unit2, unit3]);
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
            scene.add.sprite(pointer.worldX, pointer.worldY, unit.texture.key);
            unit.x = originalX;
            unit.y = originalY;
        });
        //Bottom HUD
    }
}