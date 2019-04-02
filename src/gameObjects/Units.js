
export class Units extends Phaser.Physics.Arcade.Sprite  {
// init the units properties
    
    constructor(scene,x,y,name,frame,type=0,healthPoints=10,speed=1,range=null,target){
        super(scene,x,y,name,frame,type,target);
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
     
    }
    setupMovement(scene,target){
        //sets up the movement funciton that is called by the update method.
        this.moveEnemy = () =>{
            scene.physics.moveToObject(this, target);
        };
    }

    kill(){
        this.destroy();
    }

    tower_destory(){
        if (this.tower=true && this.healthPoints<=0){
            this.destroy();
            //the player who owns the tower lost
        }
            
    }
 

    


    
}