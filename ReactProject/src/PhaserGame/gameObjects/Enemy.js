import Phaser from 'phaser';
import { Bullet } from "./Projectiles";
import { emptyBar, HpBar, ManaBar } from "./StatusBar";
export class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,textureName,target,enemyID=null,healthPoints = 50,attackRate=0.8,ATK=5,attackRange=180,movementSpeed=60){
        super(scene,x,y,key,textureName,target);

        //adds to the scenes update and display list
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setOrigin(0,0);
        this.enemyID=enemyID;
        scene.updateSprite(this); 
        this.createAttack(scene);
        //enable body in physics game
        scene.physics.world.enableBody(this);
        this.beingAttacked=false;
        this.bulletscale=0.15;
        //Health
        this.healthPoints = healthPoints;
        
        this.bulletTexture="shoot3";
        //Attack Speed and movementSpeed
        

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
        this.setupMovement(scene,target);


        this.setVisible = false;

        

    }
     

    setupMovement(scene,target){
 
        //sets up the movement funciton that is called by the update method.
        this.moveEnemy = () =>{
            scene.physics.moveToObject(this, target,this.movementSpeed);
            this.EnemyBehavior(this,target);
      
            
        };
    }

    EnemyBehavior(enemy,target){
        this.randomMove = () =>{
        const randNumber = Math.floor((Math.random() * 4) + 1);
      //  this.distance=Phaser.Math.Distance.Between(enemy.x, enemy.y, target.x, target.y);
        switch(randNumber) {
          case 1:
            enemy.body.setVelocityX(100);    
            break;
          case 2:
            enemy.body.setVelocityX(-100);
            break;
          case 3:
            enemy.body.setVelocityY(100);
            break;
          case 4:
            enemy.body.setVelocityY(-100);
            break;
         // default:
         //   enemy.body.setVelocityX(100);
         
        } };    
        // this.matter.world.on('collisionstart', function (event, bodyA, bodyB) { 
     //   this.scene.physics.add.overlap(enemy, target, this.randomMove, null, this);
        if(Math.abs(target.x - enemy.x) > this.attackRange && Math.abs(target.y - enemy.y) > this.attackRange){
           this.movementSpeed=this.movementSpeed+1;
         //   if(this.ally===false ){
        //        target=enemy;}
            if(this.movementSpeed>=target.movementSpeed){
               this.movementSpeed=60;
           }
        }

        //need some function to assign the target to the next attackable enemies or players
        //need a way to assign ally 
        
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
       /*     this.container= this.scene.add.container(200, 200);
            this.container.add(this.demonskill);  
            this.container.x=this.x;
            this.container.y=this.y;
            this.bulletTexture="shoot3";
            if(this.healthPoints<=0){
                this.container.getChildren().map(child => child.destroy());
            }*/
            if(this.body.velocity.x > 0 && this.body.velocity.y > 0){
                this.play('demon1_down',true);
            }else if(this.body.velocity.x > 0 && this.body.velocity.y < 0){
                this.play('demon1_right',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y > 0){
                this.play('demon1_left',true);
            }else if(this.body.velocity.x < 0 && this.body.velocity.y < 0){
                this.play('demon1_up',true);
          
            }
            if(this.healthPoints<60){
                this.movementSpeed=120;
                this.setScale(2);
                this.bulletscale=0.8;
                this.attackRate=1;
            }
        }
    }
    createAttack(scene){
        this.bullets = scene.physics.add.group({classType: Bullet, runChildUpdate: true});

        this.basicattack = (target)=>{
            //console.log("this");
            let bullet = this.bullets.get();
            bullet.speed=this.attackRate;
            //scene.children.add(bullet);
            scene.enemiesAttacks.add(bullet);
            bullet.shoot(this,target,true);
            bullet.setPosition(this.x+26,this.y+40);
            bullet.setTexture(this.bulletTexture).setScale(this.bulletscale).setSize(32,30);
        };

        this.removeDefense = ()=>{ //destroys the weapon used
            this.bullets.destroy();
            this.attack = null;
        };    

    }

    update(time, delta){
        this.isInjured(time);
        this.beingAttacked=false;
        //We can add a check so if the enemy is within a certain distance of a player it can launch an attack.

        this.enemymovement();
        this.moveEnemy();
        console.log(this.healthPoints)
        if (Math.abs(this.scene.player.x - this.x) < this.attackRange && Math.abs(this.scene.player.y - this.y) < this.attackRange){
          //  let distance = Math.sqrt(Math.pow(this.scene.player.x - this.x, 2) + Math.pow(this.scene.player.y - this.y, 2));
            let distance=Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
            let vX = (this.scene.player.x - this.x)/distance;
            let vY = (this.scene.player.y - this.y)/distance;
            this.basicattack({x: vX,y: vY});
        }
    }

    
}