import Phaser from 'phaser';
import { Bullet } from "../gameObjects/Projectiles";
export class Units extends Phaser.Physics.Arcade.Sprite  {
// init the units properties
    
    constructor(scene,x,y,name,frame,type=0,healthPoints=10,speed=1,range=null){
        super(scene,x,y,name,frame,type);
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
     
    }

    kill(){
        this.destroy();
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
    
}