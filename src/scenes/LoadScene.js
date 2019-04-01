import {CST} from "../CST";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){
        
    }

    preload(){

        //add Loading image, sound and spritesheet
        this.load.image('key1', './assets/title_bg.jpg');
        this.load.image("StartButton", "./assets/StartButton.png");
        this.load.image("cursor", "./assets/fight.png");
        this.load.image("fire","./assets/SkillEffect1.png");
        this.load.image("shoot1","./assets/shoot1.png");
        this.load.atlas("angle", "./assets/sprite/angle.png", "./assets/sprite/angle.json");
        this.load.atlas("ninjabot", "./assets/sprite/units/ninjabot.png", "./assets/sprite/units/ninjabot.json");
        this.load.atlas("demon1", "./assets/sprite/units/demon1.png", "./assets/sprite/units/demon1.json");
        this.load.atlas("ability2", "./assets/ability/ability2.png", "./assets/ability/ability2.json");
        this.load.atlas("magic", "./assets/sprite/magic.png", "./assets/sprite/magic.json");
        this.load.atlas("p1", "./assets/sprite/p1.png", "./assets/sprite/p1.json");
        this.load.atlas("wolf", "./assets/sprite/wolf.png", "./assets/sprite/wolf.json");
        this.load.atlas("building1", "./assets/sprite/buildings/building1.png", "./assets/sprite/buildings/building1_atlas.json");
        this.load.atlas("University", "./assets/sprite/buildings/University.png", "./assets/sprite/buildings/University.json");
        this.load.atlas("pyramid", "./assets/sprite/buildings/pyramid.png", "./assets/sprite/buildings/pyramid.json");
        this.load.atlas("magicstone", "./assets/sprite/buildings/magicstone.png", "./assets/sprite/buildings/magicstone.json");
        this.load.audio("menuMusic", "./assets/music/Rise of spirit.mp3");
        this.load.atlas("sword_in_the_stone", "./assets/sprite/sword_in_the_stone.png", "./assets/sprite/sword_in_the_stone.json");
        this.load.audio("beginsound", "./assets/soundeffect/metal-clash.wav");

        //add loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        //add Loading event
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, 
                                this.game.renderer.width * percent, 50);
            
        })



   
    }

    create(){
        this.scene.start(CST.SCENES.MENU);
    }
}