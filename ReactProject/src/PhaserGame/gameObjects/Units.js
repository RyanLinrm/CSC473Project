import Phaser from 'phaser';
import { Bullet } from "../gameObjects/Projectiles";
import { emptyBar, HpBar, ManaBar } from "../gameObjects/StatusBar";
import { Enemy } from './Enemy';

export class Units extends Phaser.Physics.Arcade.Sprite  {
// init the units properties
    
    constructor(scene,x,y,name,type=0,tower_ID=null,healthPoints=500,speed=1,range=null){
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

        this.scene = scene;
        this.healthPoints=healthPoints;
        this.speed=speed;
        this.range=range;
        this.createDefense(scene);
     

        this.canAttack = 0;
        this.healthPoints=healthPoints;
        this.speed=speed;
        this.range=range;
        this.tower_ID=tower_ID;
        //this.bar=bar;
    }
    create(){
        //new Enemy(this.scene,500,500,'dragonrider','dragonrider_01');

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
            console.log("this");
            let bullet = this.bullets.get();
            scene.children.add(bullet);
            bullet.shoot(this,target,true);
        };

        this.removeDefense = ()=>{ //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };    

    }

    update(){
        
    if (Math.abs(this.scene.player.x - this.x) < 180 && Math.abs(this.scene.player.y - this.y) < 180){
        let speed = 10;
        let distance = Math.sqrt(Math.pow(this.scene.player.x - this.x, 2) + Math.pow(this.scene.player.y - this.y, 2));
        let angle = Math.atan((this.scene.player.y - this.y)/(this.scene.player.x - this.x));
        let vX = (this.scene.player.x - this.x)/distance;
        let vY = (this.scene.player.y - this.y)/distance;
        this.defend({x: vX - this.body.velocity.x ,y: vY - this.body.velocity.y});
    }
 
    }

    //still need to modify to let this work...
    attackTower(scene){  
    this.bullets= scene.physics.add.group({classType: Bullet, runChildUpdate: true});  

    scene.physics.add.overlap(this.towers,this.player.bullets,(tower, bullet)=>{
        if(this.canAttack < this.time){
            if (tower.active && bullet.active ){
                bullet.setActive(false);
                bullet.destroy();
                bullet.setVisible(false);
            }
            
            if(tower.tower_ID==1){
                this.pyramid_bar.cutHPBar(10)
                this.pyramid.takeDamage(10);
            }
            if(tower.tower_ID==2){
                this.University_bar.cutHPBar(5)
                this.University.takeDamage(5);
            }
            if(tower.tower_ID==3){
                this.magicstone_bar.cutHPBar(5)
                this.magicstone.takeDamage(5);
            }
            if(tower.tower_ID==4){
                this.building_bar.cutHPBar(5)
                this.building.takeDamage(5);
            }
            this.canAttack = this.time + 2000;
        }
    
    },null,this);}

    update(time,delta) {
       // this.create();
       //this.attackTower(this.scene);
    }
}