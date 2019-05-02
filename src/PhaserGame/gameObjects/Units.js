import Phaser from 'phaser';
import { Bullet } from "./Projectiles";
import { emptyBar, HpBar, ManaBar } from "./StatusBar";
import { Enemy } from './Enemy';


export class Units extends Phaser.Physics.Arcade.Sprite  {
// init the units properties
    
    constructor(scene,x,y,barx,bary,name,type=0,tower_ID=null,healthPoints=500,speed=1,range=180,cooldown=100,uid='235'){
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
        this.cooldown=cooldown;
        this.createDefense(scene);
        this.beingAttacked=false;
        this.timeCycle=0;
        this.canAttack = 0;
        this.healthPoints=healthPoints;
        this.speed=speed;
        this.range=range;
        this.tower_ID=tower_ID;
        this.target=scene.player;

        this.uid = uid;


        scene.updateSprite(this);
        scene.enemyTowers.add(this);

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
    distance(enemy,target){
        let distance=Phaser.Math.Distance.Between(enemy.x, enemy.y, target.x, target.y);
        return distance;
    }
    towerAttack(tower,target,time){
        this.enemies=this.scene.enemies.getChildren();
        let len = this.scene.enemies.getLength()
        let shortestDistance=1000000000;
        console.log(this.len)
        this.findnearenemy = () =>{
            for (var i = 0; i < len; i++) {
                if(this.enemies[i].active){
                let enemydistance=this.distance(tower,this.towers[i]);
                if (enemydistance<shortestDistance){
                    shortestDistance=enemydistance;      
                    this.changetarget(this.enemies[i]);}
                }
            } };  
        if (Math.abs(target.x - tower.x) < this.range && Math.abs(target.y - tower.y) < this.range){
        if(target.uid!=tower.uid){
            let distance = Math.sqrt(Math.pow(target.x - tower.x, 2) + Math.pow(target.y - tower.y, 2));
            let angle = Math.atan((target.y - tower.y)/(target.x - tower.x));
            let vX = (target.x - tower.x)/distance;
            let vY = (target.y - tower.y)/distance;
            if(this.timeCycle < time){
                this.defend({x: vX - tower.body.velocity.x ,y: vY - tower.body.velocity.y});
                this.timeCycle = time + tower.cooldown ;}
        }
    }
    }
    update(time){
        this.isInjured(time);
        this.beingAttacked=false;
        this.towerAttack(this,this.target,time);
       // console.log(this.len)
           
        
    }
}