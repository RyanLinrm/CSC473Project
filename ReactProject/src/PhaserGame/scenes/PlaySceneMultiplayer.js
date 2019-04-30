import Phaser from 'phaser';
import {PlayScene} from './PlayScene.js';
import {Player} from "../gameObjects/Player";
import {Rider} from "../gameObjects/Rider";
import { CST } from "../CST";
import {generate} from 'randomstring';
import * as firebase from 'firebase';
import { ConsoleLogger } from '@aws-amplify/core';

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
    }


    createPlayer = (id,position,velocity) =>{
        console.log("CreatingPlayer");
        this.otherPlayers[id] = new Player(this,position.x,position.y, "p1", "p1_01.png",0,100,64,id);
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

    create() {
        super.create(this.playerID);

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
        this.player.setPosition(startingPlayerPosition.x,startingPlayerPosition.y);
        this.player1 = new Player(this,startingPlayerPosition.x,startingPlayerPosition.y, "p1", "p1_01.png",0,100,64,this.playerID);
        this.player1.setVisible(false);
        this.player.setVisible(true);
        this.physics.add.collider(this.player1, this.CollisionLayer);
        this.physics.add.collider(this.player1, this.waterLayer);

       let countDownText= this.add.text(this.player.x, this.player.y, 5, { fontFamily: 'Arial', fontSize: 700, color: '#ffffff' });
       countDownText.setOrigin(0.5,0.5); 

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
            playerType: "Bomber"
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
                this.player.setPosition(dataChanged.x,dataChanged.y); 
            }else{
                this.player.setVelocity(dataChanged.x,dataChanged.y); 
            }
        });

        database.ref(`Games/${this.gameRoom}/Players/${this.playerID}/attack/time`).on("value", (snapShot) => { 
            if (snapShot.val() != 0)       
                this.player.attack();

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
        
        let ref = database.ref(`Games/${this.gameRoom}/Players/`);
        ref.on('child_added',snapShot=> {
            for( let pid in this.otherPlayers ){
                this.physics.add.overlap(this.damageItems, this.otherPlayers[pid],this.bothCollisions);
            }
            if(Object.keys(this.otherPlayers).length >= 3){
                this.physics.add.overlap(this.damageItems, this.player1, this.bothCollisions);
                ref.off();
            }
        });

    }

    update(){
        
        let inputVelocity = {x:0,y:0}; //Velocity based on player input
        let speed = 64;

        if (this.GameIsGoing) {


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