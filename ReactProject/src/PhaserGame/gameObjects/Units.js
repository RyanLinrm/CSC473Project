import Phaser from 'phaser';
import { emptyBar, HpBar, ManaBar } from "../gameObjects/StatusBar";
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
        
        this.healthPoints=healthPoints;
        this.speed=speed;
        this.range=range;
        this.tower_ID=tower_ID;
        //this.bar=bar;
    }

    getTowerId(){
        if(this.tower_ID==1){
            return 1;}
        if(this.tower_ID==2){
            return 2;}
        if(this.tower_ID==3){
            return 3;}     
        if(this.tower_ID==4){
            return 4;}

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
    
}