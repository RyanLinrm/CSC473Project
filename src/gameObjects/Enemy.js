export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,target,healthPoints = 50){
        super(scene,x,y,key,textureName,target);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.setOrigin(0,0);

        //enable body in physics game
        scene.physics.world.enableBody(this);

        //Health
        this.healthPoints = healthPoints;
        
        //setup the movement of the enemy
        this.setupMovement(scene,target);
    }

    setupMovement(scene,target){
        //sets up the movement funciton that is called by the update method.
        this.moveEnemy = () =>{
            scene.physics.moveToObject(this, target);
        };
    }

    attack(){
        //Add an attack ability.
    
        
    }

    update(){
        //We can add a check so if the enemy is within a certain distance of a player it can launch an attack.

        this.moveEnemy();
    }

    die(){
        this.destroy();
    }
}