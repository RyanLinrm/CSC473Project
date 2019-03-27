export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,healthPoints = 50){
        super(scene,x,y,key,textureName);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.setOrigin(0,0);

        //enable body in physics game
        scene.physics.world.enableBody(this);

        this.healthPoints = healthPoints;
    }
}