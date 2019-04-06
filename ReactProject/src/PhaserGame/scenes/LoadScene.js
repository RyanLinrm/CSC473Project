import Phaser from 'phaser';
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
    
    this.load.image('key1', `${process.env.PUBLIC_URL}/assets/title_bg.jpg`);
    this.load.image("StartButton", `${process.env.PUBLIC_URL}/assets/StartButton.png`);
    this.load.image("cursor", `${process.env.PUBLIC_URL}/assets/fight.png`);
    this.load.image("fire", `${process.env.PUBLIC_URL}/assets/SkillEffect1.png`);
    this.load.image("shoot1", `${process.env.PUBLIC_URL}/assets/shoot1.png`);
    this.load.atlas("angel", `${process.env.PUBLIC_URL}/assets/sprite/angel.png`, `${process.env.PUBLIC_URL}/assets/sprite/angel.json`);
    this.load.atlas("ninjabot", `${process.env.PUBLIC_URL}assets/sprite/units/ninjabot.png`, `${process.env.PUBLIC_URL}/assets/sprite/units/ninjabot.json`);
    this.load.atlas("demon1", `${process.env.PUBLIC_URL}assets/sprite/units/demon1.png`, `${process.env.PUBLIC_URL}/assets/sprite/units/demon1.json`);
    this.load.atlas("magic", `${process.env.PUBLIC_URL}/assets/sprite/magic.png`, `${process.env.PUBLIC_URL}/assets/sprite/magic.json`);
    this.load.atlas("s1", `${process.env.PUBLIC_URL}/assets/ability/s1.png`, `${process.env.PUBLIC_URL}/assets/ability/s1.json`);
    this.load.atlas("ability2", `${process.env.PUBLIC_URL}/assets/ability/ability2.png`, `${process.env.PUBLIC_URL}/assets/ability/ability2.json`);
    this.load.atlas("p1", `${process.env.PUBLIC_URL}/assets/sprite/p1.png`, `${process.env.PUBLIC_URL}/assets/sprite/p1.json`);
    
    this.load.atlas("wolf", `${process.env.PUBLIC_URL}/assets/sprite/wolf.png`, `${process.env.PUBLIC_URL}/assets/sprite/wolf.json`);
    this.load.atlas("building1",`${process.env.PUBLIC_URL}/assets/sprite/buildings/building1.png`, `${process.env.PUBLIC_URL}/assets/sprite/buildings/building1_atlas.json`);
    this.load.atlas("University", `${process.env.PUBLIC_URL}/assets/sprite/buildings/University.png`, `${process.env.PUBLIC_URL}/assets/sprite/buildings/University.json`);
    this.load.atlas("pyramid", `${process.env.PUBLIC_URL}/assets/sprite/buildings/pyramid.png`, `${process.env.PUBLIC_URL}/assets/sprite/buildings/pyramid.json`);
    this.load.atlas("magicstone", `${process.env.PUBLIC_URL}/assets/sprite/buildings/magicstone.png`, `${process.env.PUBLIC_URL}/assets/sprite/buildings/magicstone.json`);
    this.load.audio("menuMusic", `${process.env.PUBLIC_URL}/assets/music/Rise of spirit.mp3`);
    this.load.atlas("sword_in_the_stone", `${process.env.PUBLIC_URL}/assets/sprite/sword_in_the_stone.png`, `${process.env.PUBLIC_URL}/assets/sprite/sword_in_the_stone.json`);
    this.load.audio("beginsound", `${process.env.PUBLIC_URL}/assets/soundeffect/metal-clash.wav`);

    this.load.image("bar",`${process.env.PUBLIC_URL}/assets/statusbar/barempty.png`);
    this.load.image("playerhpbar",`${process.env.PUBLIC_URL}/assets/statusbar/hpbar.png`);
    this.load.image("playermanabar",`${process.env.PUBLIC_URL}/assets/statusbar/manabar.png`);
    this.load.image("enemyhpbar",`${process.env.PUBLIC_URL}/assets/statusbar/hpbar2.png`);

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

    update(){
    }
}
