import Phaser from 'phaser';
export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,target,healthPoints = 50,attackRate=1000,ATK=20){
        super(scene,x,y,key,textureName,target);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        this.setOrigin(0,0);

        //enable body in physics game
        scene.physics.world.enableBody(this);

        //Health
        this.healthPoints = healthPoints;

        //Attack Speed
        this.attackRate = attackRate;
        this.nextAttack = 0;

        //Attack power
        this.ATK = ATK;

        //setup the movement of the enemy
        this.setupMovement(scene,target);

        
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

    attack(){
        //Add an attack ability.
    }

    takeDamage(damage){
        this.healthPoints = this.healthPoints - damage;
       
        if( this.healthPoints <= 0 ){
            this.kill();
        }
    }

    update(time, delta){
        //We can add a check so if the enemy is within a certain distance of a player it can launch an attack.
        this.moveEnemy();

    }
}