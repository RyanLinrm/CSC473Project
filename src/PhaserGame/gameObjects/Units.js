import Phaser from 'phaser';
import { Bullet } from "./Projectiles";
import { emptyBar, HpBar, ManaBar } from "./StatusBar";
import { Enemy } from './Enemy';


export class Units extends Phaser.Physics.Arcade.Sprite  {
// init the units properties
    
    constructor(scene,x,y,barx,bary,name,type=0,tower_ID=null,healthPoints=500,speed=1,range=null,uid='234'){
        super(scene,x,y,name,type);
        if (this.type=1){
            this.tower=true;
        }
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        //this.setScale(1);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        //this.setImmovable(true);
        this.barx=this.barx;
        this.bary=this.bary;
        this.scene = scene;
        this.healthPoints=healthPoints;
        this.speed=speed;
        this.range=range;
        this.createDefense(scene);
        this.beingAttacked=false;

        this.canAttack = 0;
        this.healthPoints=healthPoints;
        this.speed=speed;
        this.range=range;
        this.tower_ID=tower_ID;
        
        this.uid = uid;

        this.playersTower = false;
        this.setPlayersTower = ()=>{
            this.playersTower = true;
        };
       

        scene.updateSprite(this);
        scene.enemyTowers.add(this);

        this.scene = scene;
        
        //console.log("Helo " + x + " " + y);
        this.building_bar = new HpBar(scene,barx ,bary,'hp',this.healthPoints);
    }
    create(){
        //new Enemy(this.scene,500,500,'dragonrider','dragonrider_01');

    }


    collision(){
        this.building_bar.cutHPBar(5);
        this.takeDamage(5);
        this.beingAttacked=true;
    }
    isInjured(time){
        if(this.beingAttacked===true){
            this.tint=0xff0000;
            this.count=time;
        }
        else{
            if(time>this.count+1000)
            {this.tint=0xffffff;}

        }
    }


    kill(){
        this.destroy();
    }

    takeDamage(damage){
        this.healthPoints = this.healthPoints - damage;
       
        if( this.healthPoints <= 0 ){
            this.kill();

        }
    }
    
    tower_destory(){
        if (this.tower=true && this.healthPoints<=0){
            this.destroy();
          
            //the player who owns the tower lost
            //need some function to stop the play's action
        }
    }

    createDefense(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.defend = (target)=>{
            //console.log("this");
            let bullet = this.bullets.get();
            scene.towerShooting.add(bullet);
            bullet.shoot(this.uid,this,target,true);
            bullet.setTexture('shoot3').setScale(0.2).setSize(32,30);
        };

        this.removeDefense = ()=>{ //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };    

    }

    update(time){
        this.isInjured(time);
        this.beingAttacked=false;
        if (Math.abs(this.scene.player.x - this.x) < 180 && Math.abs(this.scene.player.y - this.y) < 180){
            let speed = 10;
            let distance = Math.sqrt(Math.pow(this.scene.player.x - this.x, 2) + Math.pow(this.scene.player.y - this.y, 2));
            let angle = Math.atan((this.scene.player.y - this.y)/(this.scene.player.x - this.x));
            let vX = (this.scene.player.x - this.x)/distance;
            let vY = (this.scene.player.y - this.y)/distance;
            this.defend({x: vX - this.body.velocity.x ,y: vY - this.body.velocity.y});
        }
    }
}