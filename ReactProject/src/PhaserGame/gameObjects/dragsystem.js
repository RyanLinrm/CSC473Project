 //adding drag to the ui scene.
 import {Enemy} from "../gameObjects/Enemy";
 export default function dragsystem (scene) {
    scene.hud = scene.add.rectangle(scene.game.renderer.width/2, scene.game.renderer.height, 
        scene.game.renderer.width*2/3, 140, 0x000000).setInteractive();
        scene.hud.setScrollFactor(0);

        scene.unit1 = scene.add.sprite(scene.game.renderer.width*0.25, scene.game.renderer.height-35, "ninjabot").setScrollFactor(0).setInteractive();
        scene.unit2 = scene.add.sprite(scene.game.renderer.width*0.35, scene.game.renderer.height-35, "wolf").setScrollFactor(0).setInteractive();
        scene.unit3 = scene.add.sprite(scene.game.renderer.width*0.45, scene.game.renderer.height-35, "skull").setScrollFactor(0).setInteractive();
        scene.unit4 = scene.add.sprite(scene.game.renderer.width*0.55, scene.game.renderer.height-35, "demon1").setScrollFactor(0).setInteractive();
        scene.input.setDraggable([scene.unit1, scene.unit2, scene.unit3,scene.unit4]);
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
        unit.x = originalX;
        unit.y = originalY;
        scene.enemies.add(scene.newenemy);

        scene.attackableGroup.add(scene.newenemy);

    }});
    
}
