import Phaser from 'phaser';
import {PlayScene} from './PlayScene.js';
import {Player} from "../gameObjects/Player";
import {Rider} from "../gameObjects/Rider";
import { CST } from "../CST";
import {generate} from 'randomstring';
import * as firebase from 'firebase';
import { ConsoleLogger } from '@aws-amplify/core';
import {HUD} from "../gameObjects/HUD";
import {Enemy} from "../gameObjects/Enemy";
import spriteAnimations from '../gameObjects/Animations';

export class PlaySceneMultiplayer extends PlayScene{ //The difference here is that everything is going to be rendered based on the database 
    constructor() {
        super(CST.SCENES.PLAYMULTIPLAYER);
        this.updates = {};
        this.otherPlayers = {};

        this.isCreator = false;
        this.GameIsGoing = false; 
        this.seatNumber = -1;
        //Checking who is the HostID    
    }

    init(data){
        this.playerID = data.playerID;
        this.gameRoom = data.roomkey;
        this.seatNumber = data.seatNumber;
        this.spritekey = data.chartype;
    }


    createPlayer = (id,position,velocity) =>{
        console.log("CreatingPlayer");
        firebase.database().ref(`Games/${this.gameRoom}/Players/${id}/playerType`).once('value', (snapShot)=>{
            this.temp = snapShot.val();
        })
        console.log(this.temp);
        if(this.temp == "bomber"){
        this.otherPlayers[id] = new Player(this,position.x,position.y, "p1", "p1_01.png",0,100,64,id);
        }
        else if (this.temp == "rider"){
        this.otherPlayers[id] = new Rider(this,position.x,position.y, "rider", "rider_01.png",1,100,200,id).setScale(0.8); 
        }
        this.otherPlayers[id].setVelocity(velocity.x,velocity.y);

        firebase.database().ref(`Games/${this.gameRoom}/Players/${id}/movementData`).on("child_changed", (snapShot) => {
            let dataChanged = snapShot.val();
            let changedKey = snapShot.key;

            if(changedKey === 'pos'){
                this.otherPlayers[id].setPosition(dataChanged.x,dataChanged.y); 
            }else{
                this.otherPlayers[id].setVelocity(dataChanged.x,dataChanged.y); 
            }
            
        });

        firebase.database().ref(`Games/${this.gameRoom}/Players/${id}/attack`).on("child_changed", (snapShot) => {      
            let dataChanged = snapShot.val();  
            let changedKey = snapShot.key;

            if(changedKey === 'pos'){
                this.otherPlayers[id].setPosition(dataChanged.x,dataChanged.y); 
            }else if(changedKey === 'velocity'){
                this.otherPlayers[id].setVelocity(dataChanged.x,dataChanged.y); 
            }
            else{
                this.otherPlayers[id].attack();
            }

        });
    }

    removePlayer = (id)=>{
        console.log("REMOVING");
        this.otherPlayers[id].kill();
        delete this.otherPlayers[id];
        firebase.database().ref(`Games/${this.gameRoom}/Players/${id}/movementData`).off();
    }

    addNewEnemy = (x, y, type, playerid) => {

        if(type==='wolf'){              
            this.newenemy =new Enemy(this, x, y, "wolf", "Wolf_01.png",this.player1,0,200,0.1,5,20,99,200,playerid);
        }

        else if(type==='ninjabot'){              
            this.newenemy=new Enemy(this, x, y, "ninjabot", "ninjabot_1.png",this.player1,1,100,0.8,5,180,60,700,playerid)
        }
        
        else if(type==='skull'){              
            this.newenemy=new Enemy(this, x, y, "skull","skull_01",this.player1,3,200,0.8,5,180,60,600,playerid).setScale(0.9);
        }
        else if(type==='demon1'){              
            this.newenemy=new Enemy(this, x, y, "demon1","demon1_01",this.player1,2,200,0.7,2,200,70,600, playerid).setScale(1.5);
        }
        else if(type==='wall'){              
            this.newenemy=new Enemy(this, x, y, "wall","wall_01",this.player1,null,100,0,0,0,0,0,playerid).setScale(0.5);
            this.newenemy.body.immovable=true;
            this.newenemy.body.moves=false;
        }
        this.enemies.add(this.newenemy);

        this.attackableGroup.add(this.newenemy);

    }

    create() {
        //this.spritekey = "bomber";
        super.create(this.playerID, 'multi');

        this.towers.removeCallback = ()=>{
            if(this.towers.getLength() === 1){
                this.GameIsGoing = false;
                let countDownText= this.add.text(this.player.x, this.player.y, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
                countDownText.setOrigin(0.5,0.5); 
            }

        };
        
        this.lastVelocity = {x:0, y:0}; //Save last velocity to keep track of what we sent to the database
        let database = firebase.database();
        let startingPlayerPosition = this.startingPosFromTowerNum(this.seatNumber);
        console.log(this.seatNumber);
        this.player.setPosition(startingPlayerPosition.x,startingPlayerPosition.y);
        if(this.spritekey == "bomber"){
        this.player1 = new Player(this,startingPlayerPosition.x,startingPlayerPosition.y, "p1", "p1_01.png",0,100,64,this.playerID);
        }
        else if(this.spritekey == "rider"){
        this.player1 = new Rider(this,startingPlayerPosition.x,startingPlayerPosition.y, "rider", "rider_01.png",1,100,200,this.playerID).setScale(0.6);
        }
        //this.player1.setVisible(false);
        //this.player.setVisible(true);
        this.player1.setVisible(true);
        this.player.setVisible(false);
        this.physics.add.collider(this.player1, this.CollisionLayer);
        this.physics.add.collider(this.player1, this.waterLayer);
        //adjust player hit box
        this.player1.setSize(34, 36);

        if(this.seatNumber === 1) this.pyramid.assignID(this.playerID);
        else if(this.seatNumber === 2) this.university.assignID(this.playerID);
        else if(this.seatNumber === 3) this.building.assignID(this.playerID);
        else this.magicstone.assignID(this.playerID);

       let countDownText= this.add.text(this.player.x, this.player.y, 5, { fontFamily: 'Arial', fontSize: 700, color: '#ffffff' });
       countDownText.setOrigin(0.5,0.5); 

       this.cameras.main.startFollow(this.player1);
       this.player.kill();
       this.hUD = new HUD(this, this.player1, this.playerID, this.mode, this.gameRoom);

       database.ref(`Games/${this.gameRoom}/creator`).once("value", (snapShot) => {
            let value = snapShot.val();
            let uID = value.uid;

            if(uID === this.playerID){ //check if playerCreated the room
                this.isCreator = true;
                this.updates[`Games/${this.gameRoom}/HostID`] = this.playerID;
                let count = 10;
                let updateCountDown = ()=>{
                    
                    if(count > -2){
                        this.updates[`Games/${this.gameRoom}/countDown`] = count;
                        setTimeout(updateCountDown, 1000);
                    }
                    count--;
                };
                updateCountDown();
            }
        });

        
        database.ref(`Games/${this.gameRoom}/countDown`).on('value',(snapShot)=>{
            let countDown = snapShot.val();
            if(countDown > 0){
                countDownText.setText(countDown);
            }
            if(countDown === 0){
                countDownText.setText("Go");
                let poop = this.countDownText;
                let tween = this.tweens.add({
                    targets: countDownText,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 2000
                });
                this.GameIsGoing = true;
            }


        });

        database.ref(`Games/${this.gameRoom}/Players/${this.playerID}`).set({
            movementData: {
                pos: this.startingPosFromTowerNum(this.seatNumber),
                velocity: {x:0,y:0}
            },
            attack: {
                time:0,
                pos: this.startingPosFromTowerNum(this.seatNumber),
                velocity: {x: 0, y:0}
            },    
            playerType: this.spritekey
        });

        database.ref(`Games/${this.gameRoom}/Towers/${this.seatNumber}`).set({ //CreateTowerInDatabase
            HP: 100,
            owner: this.playerID  
        });

        database.ref(`Games/${this.gameRoom}/Players`).on('child_added',(snapShot)=>{
            let id = snapShot.key;

            if(id === this.playerID)
                return;

            let playerData = snapShot.val();
            this.createPlayer(id,playerData.movementData.pos,playerData.movementData.velocity);

        });

        database.ref(`Games/${this.gameRoom}/Players/${this.playerID}/movementData`).on('child_changed', (snapShot) => {        
            let dataChanged = snapShot.val(); //The new data
            let changedKey = snapShot.key; //The key for the data that was changed

            if(changedKey === 'pos'){
                this.player1.setPosition(dataChanged.x,dataChanged.y); 
            }else{
                this.player1.setVelocity(dataChanged.x,dataChanged.y); 
            }
        });

        database.ref(`Games/${this.gameRoom}/Players/${this.playerID}/attack/time`).on("value", (snapShot) => { 
            if (snapShot.val() != 0)       
                this.player1.attack();

        });


        firebase.database().ref(`Games/${this.gameRoom}/Players/`).on("child_removed", (snapShot) => {
            this.removePlayer(snapShot.key);
        });

        /*Just to prevent game crashing caused by game master leaving the room, will add in futher implement later */
        database.ref(`Games/${this.gameRoom}`).on('child_removed', (snapShot) =>{
            
            if(!snapShot.val().Playsers){
                database.ref(`Games/${this.gameRoom}`).remove();
            }
        });
        /** */

        window.addEventListener('beforeunload', (event) => {

            database.ref(`Games/${this.gameRoom}/Players/${this.playerID}`).remove();

        });
        
        //check if otherplayer has placed a new enemy on the map
        firebase.database().ref(`Games/${this.gameRoom}/enemy`).on('child_changed', snapShot=>{
            let newenemyinfo = snapShot.val();

            if( newenemyinfo.x >= 0 && newenemyinfo.y >= 0 && newenemyinfo.ownerid !== this.playerID ){
                this.addNewEnemy( newenemyinfo.x, newenemyinfo.y, newenemyinfo.type, newenemyinfo.ownerid );
            }
        })

        //add in collider
        let ref = database.ref(`Games/${this.gameRoom}/Players/`);
        ref.on('child_added',snapShot=> {
            this.physics.add.overlap(this.damageItems, this.player1, this.bothCollisions);
            for( let pid in this.otherPlayers ){
                this.physics.add.overlap(this.damageItems, this.otherPlayers[pid],this.bothCollisions);
                this.physics.add.collider(this.otherPlayers[pid], this.CollisionLayer);
                this.physics.add.collider(this.otherPlayers[pid], this.waterLayer);
            }
        });

    }

    update(){
        
        let inputVelocity = {x:0,y:0}; //Velocity based on player input
        let speed = 64;

        if (this.GameIsGoing && this.player1.active) {


            if (this.keyboard.SHIFT.isDown) {
                speed = 192;
            }

            if (this.keyboard.W.isDown) {
                inputVelocity.y = -speed;
            }
            if (this.keyboard.S.isDown) {
                inputVelocity.y = speed;
            }
            if (this.keyboard.A.isDown) {
                inputVelocity.x = -speed;
            }
            if (this.keyboard.D.isDown) {
                inputVelocity.x = speed;
            }

            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                let newAttack = {
                    time: Date.now(),
                    pos: { x: Math.round(this.player1.x), y: Math.round(this.player1.y) },
                    velocity: inputVelocity
                };

                this.updates[`Games/${this.gameRoom}/Players/${this.playerID}/attack/`] = newAttack;

            }

            if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
                inputVelocity.y = 0;
            }
            if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
                inputVelocity.x = 0;
            }

            if (inputVelocity.x !== this.lastVelocity.x || inputVelocity.y !== this.lastVelocity.y) { //Don't want to update database if we don't have to 
                this.lastVelocity = { ...inputVelocity };
                this.player1.setVelocity(inputVelocity.x, inputVelocity.y);

                this.updates[`Games/${this.gameRoom}/Players/${this.playerID}/movementData/velocity`] = inputVelocity;
                this.updates[`Games/${this.gameRoom}/Players/${this.playerID}/movementData/pos`] = { x: Math.round(this.player1.x), y: Math.round(this.player1.y) };

            }


        }




        if(Object.keys(this.updates).length !== 0){ //If updates contains something then send it to the database. This is for future updates
            firebase.database().ref().update(this.updates);
        }



    }
}