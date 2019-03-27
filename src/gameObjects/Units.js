
export class Units extends Phaser.Physics.Arcade.Sprite  {
// init the units properties
    
    constructor(scene,x,y,name,frame,healthPoints=10,speed=1,range=null){
        super(scene,x,y,name,frame);

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


    
}