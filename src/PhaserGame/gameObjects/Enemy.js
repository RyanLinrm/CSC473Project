import Phaser from 'phaser';
import { Bullet } from "./Projectiles";
import { emptyBar, HpBar, ManaBar } from "./StatusBar";
/**
     * Enemy class
     * The class where the properties of the enemy units are generated.
     * Including enemy behavior, enemy attacking,auto target finding and
     * several other standard functions.
     */
export class Enemy extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * sets up the Enemy object. calls createAttack, setupMovement.
     * Prepare the behavior and properties of enemy to be later add the scene.
     * 
     * @param {Phaser.Scene} scene - The Scene that the Enemy is going to be in
     * @param {number} x - The X axis position of the Enemy in the scene
     * @param {number} y - The Y axis poistion of the Enemy in the scene
     * @param {string} key - The key of the Enemy object for phaser
     * @param {string} textureName - The name of the texture that is used for the Enemy
     * @param {number} enemyID - The specific Enemy type of the Enemy
     * @param {number} healthPoints - The health that the Enemy will have in the game
     * @param {number} attackRate - The speed of the bullets that the Enemy will shoot
     * @param {number} ATK - The attack power that the Enemy has.
     * @param {number} attackRange - The range that the Enemy can attack a target
     * @param {number} movementSpeed - The speed that the Enemy moves 
     * @param {number} cooldown - The cooldown restriction that the Enemy can perform next attack
     * @param {string} uid - The unique id of Enemy object which is same as the player who created the enemy.
     */
    constructor(scene,x,y,key,textureName,target,enemyID=null,healthPoints = 50,attackRate=0.8,ATK=5,attackRange=180,movementSpeed=60,cooldown=600,uid='233'){
        super(scene,x,y,key,textureName,target);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setOrigin(0,0);
        this.building=scene.building;
        this.university=scene.university;
        this.pyramid=scene.pyramid;
        this.magicstone=scene.magicstone;
        this.sword_in_the_stone=scene.sword_in_the_stone;

        /**
         * The array that has the list of the towers
         * @name Enemy#towers
         * @type array
         */
        this.towers=[this.pyramid,this.university,this.magicstone,this.building];
        this.enemyID=enemyID;
        this.timeCycle=0;
        this.cooldown=cooldown;
        scene.updateSprite(this); 
        this.createAttack(scene);
        //enable body in physics game
        scene.physics.world.enableBody(this);
        /**
         * true or false that says if the Enemy is being attacked
         * @name Player#beingAttacked
         * @type boolean
         */
        this.beingAttacked=false;
        this.bulletscale=0.15;
        //Health
        this.healthPoints = healthPoints;
        
        this.bulletTexture="shoot3";
        //Attack Speed and movementSpeed
        this.uid = uid;

        //Attack Speed
        this.attackRate = attackRate;
        this.nextAttack = 0;
        this.movementSpeed=movementSpeed;
        //this.demonskill=scene.add.sprite(40, 0, 'a2_01')
        //this.demonskill.play('ab2');
        //this.scene.physics.world.enableBody(this.demonskill);
        //Attack power
        this.ATK = ATK;
        
        //Attack Range
        //this.distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
        this.attackRange=attackRange;

        //setup the movement of the enemy
        this.target=target;
        this.setupMovement(scene,this.target);
        this.setVisible = false;

        this.body.immvoable = true;

        

    }
     
    changetarget(newtarget){
        this.target=newtarget;
    }
    distance(enemy,target){
        let distance=Phaser.Math.Distance.Between(enemy.x, enemy.y, target.x, target.y);
        return distance;
    }
    setupMovement(scene,target){
 
        //sets up the movement funciton that is called by the update method.
        this.moveEnemy = () =>{
            if(this.movementSpeed!=0){
            this.EnemyBehavior(this,target);
            
            scene.physics.moveToObject(this,this.target,this.movementSpeed);}
         
        };
    }

    EnemyBehavior(enemy,target){
        target=this.target;

        //generate the random movement of enemies
        this.randomMove = () =>{
        const randNumber = Math.floor((Math.random() * 5) + 1);
        const randomdist = Math.floor((Math.random() * 100) + 1);
        switch(randNumber) {
          case 1: 
            enemy.setPosition(target.x+randomdist,target.y+randomdist); 
            break;
          case 2:
            enemy.setPosition(target.x+randomdist,target.y-randomdist); 
            break;
          case 3:
           enemy.setPosition(target.x-randomdist,target.y+randomdist); 
            break;
          case 4:
           enemy.setPosition(target.x-randomdist,target.y-randomdist); 
            break;
          case 5:
           enemy.setPosition(target.x,target.y); 
            break;
        } };    
        //if the enemy collide with other enemy or player, it will move to other direction
        this.scene.physics.add.overlap(enemy, target, this.randomMove, null, this);
        this.scene.physics.add.overlap(enemy, enemy, this.randomMove, null, this);
      
      /*  this.scene.physics.add.overlap(enemy, this.scene.CollisionLayer, (enemy,CollisionLayer)=>{
            enemy.setVelocityX(-200);
            enemy.setVelocityY(200);
        },null,this);*/

        //set up the findneartower function which finds the nearest tower to attack
        let shortestDistance=1000000000;
        this.findneartower = () =>{
            if(this.scene.mode === 'single' && this.sword_in_the_stone.uid!=enemy.uid){
                this.changetarget(this.sword_in_the_stone);}
        for (var i = 0; i < 4; i++) {
            if(this.towers[i].active && this.towers[i].uid!=enemy.uid){
            let towerdistance=this.distance(enemy,this.towers[i]);
            if (towerdistance<shortestDistance){
                shortestDistance=towerdistance;      
                this.changetarget(this.towers[i]);}
            }
        } };  
      /*  if(Math.abs(enemy.x - enemy.x) < this.attackRange && Math.abs(enemy.y - enemy.y) < this.attackRange){
            if(enemy.uid!=enemy.uid){
                this.changetarget(enemy);}
            }
        */
        if( this.scene.otherPlayers !== undefined && Object.keys(this.scene.otherPlayers).length > 0){
            this.enemyplayers = this.scene.otherPlayers;
            this.enemyplayers.self = this.scene.player1;
            this.enemyplayerid = Object.keys(this.scene.otherPlayers);

            for( let i = 0; i < this.enemyplayerid.length; i++ ){
                let player = this.enemyplayers[this.enemyplayerid[i]];
                if(Math.abs(player.x - enemy.x) < this.attackRange+30 && Math.abs(player.y - enemy.y) < this.attackRange+30){
                    if(player.active && player.uid!=enemy.uid){
                        this.changetarget(player);
                        break;
                    }
                    else{
                        this.findneartower();}
                }
        
                else{     
                    this.findneartower();}
            }
        }
        else this.findneartower();
        
        if(this.scene.mode === 'single'){
            let player=this.scene.player;
            if(Math.abs(target.x - enemy.x) < this.attackRange && Math.abs(target.y - enemy.y) < this.attackRange){
                this.movementSpeed=this.movementSpeed+1;}

            if(this.movementSpeed>=player.movementSpeed+20){
                this.movementSpeed=65;         
         }
            if(Math.abs(this.scene.player.x - enemy.x) < this.attackRange+40 && Math.abs(this.scene.player.y - enemy.y) < this.attackRange+40){
                if(this.scene.player.active && this.scene.player.uid!=enemy.uid){
                this.changetarget(this.scene.player);
        }
        else{
            this.findneartower();}
        }
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
    
    collision(){
        this.takeDamage(20);
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

    enemymovement(){
        
        //movement for wolf
        if(this.enemyID===0){
            this.bulletTexture="shoot5";
            if(this.healthPoints>=100){
                if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                    this.play('wolf_down',true);
                }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                    this.play('wolf_right',true);
                }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                    this.play('wolf_left',true);
                }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                    this.play('wolf_up',true);       
                }}
           //when the wolf's hp is below its half, it will turn into a werewolf
           //and the attackrate and atackrange will increase.
            else{
                this.attackRate=0.8;
                this.attackRange=300;
                this.cooldown=40;
                if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                    this.play('werewolf_down',true);
                }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                    this.play('werewolf_right',true);
                }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                    this.play('werewolf_left',true);
                }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                    this.play('werewolf_up',true);
            
                }}

            }
        
        //movement for ninjabot
        if(this.enemyID===1){
            this.bulletTexture="shoot6";
            this.bulletscale=0.5;
            if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                this.play('ninjabot_down',true);
            }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                this.play('ninjabot_right',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                this.play('ninjabot_left',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                this.play('ninjabot_up',true);
        
            }
        }
        if(this.enemyID===2){
            this.bulletTexture="shoot7";
            /*
            this.container= this.scene.add.container(200, 200);
            this.container.add(this.demonskill);  
            this.container.x=this.x;
            this.container.y=this.y;*/
            if(this.healthPoints<=0){
                this.container.getChildren().map(child => child.destroy());
            }
            if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                this.play('demon1_down',true);
            }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                this.play('demon1_right',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                this.play('demon1_left',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                this.play('demon1_up',true);
          
            }
            if(this.healthPoints<100){
                this.movementSpeed=120;
                this.setScale(2);
                this.bulletscale=0.8;
                this.attackRate=1;
                this.cooldown = 50;
            }
        }
        if(this.enemyID===3){
            this.bulletTexture="shoot8";
            this.bulletscale=0.6;
            if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                this.play('skull_down',true);
            }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                this.play('skull_right',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                this.play('skull_left',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                this.play('skull_up',true);
        
            }
        }

    }
    createAttack(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.basicattack = (target)=>{
            let bullet = this.bullets.get();
            bullet.speed=this.attackRate;
            scene.enemiesAttacks.add(bullet);
            bullet.shoot(this.uid,this,target,true);
            bullet.setPosition(this.x+26,this.y+40);
            bullet.setTexture(this.bulletTexture).setScale(this.bulletscale).setSize(32,30);
        };

        this.removeDefense = ()=>{ //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };    

    }
    enemyAttack(enemy,target,time){

         if (Math.abs(target.x - enemy.x) < this.attackRange && Math.abs(target.y - enemy.y) < enemy.attackRange){
            let distance=Phaser.Math.Distance.Between(enemy.x, enemy.y, target.x, target.y);
            let vX = (target.x - enemy.x)/distance;
            let vY = (target.y - enemy.y)/distance;
            if(this.timeCycle < time){
            this.basicattack({x: vX,y: vY});
            this.timeCycle = time + this.cooldown ;}
    }
}

    update(time, delta){
        
        this.isInjured(time);
        this.beingAttacked=false;
        //We can add a check so if the enemy is within a certain distance of a player it can launch an attack.

        this.enemymovement();
        this.moveEnemy();
        this.enemyAttack(this,this.target,time);

        }
    
    }
    