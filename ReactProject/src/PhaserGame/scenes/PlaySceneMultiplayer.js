import Phaser from 'phaser';
import {PlayScene} from './PlayScene.js';
import {Player} from "../gameObjects/Player";
import { CST } from "../CST";
import {generate} from 'randomstring';
import * as firebase from 'firebase';

export class PlaySceneMultiplayer extends PlayScene{ //The difference here is that everything is going to be rendered based on the database 
    constructor() {
        super(CST.SCENES.PLAYMULTIPLAYER);
        let update = {};
        this.otherPlayers = {};
        this.playerID = generate(10);
        this.gameRoom = 'Game1';
    
    }

    createPlayer = (id,position,velocity) =>{
        this.otherPlayers[id] = new Player(this,position.x,position.y, "p1", "p1_01.png");
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
        super.create();
        this.lastVelocity = {x:0, y:0}; //Save last velocity to keep track of what we sent to the database
        let database = firebase.database();
        this.player.setVisible = false;
        this.player1 = new Player(this,300,300, "p1", "p1_01.png");
        this.player1.setVisible();

        this.physics.add.collider(this.player1, this.CollisionLayer);
        this.physics.add.collider(this.player1, this.waterLayer);

        database.ref(`Games/${this.gameRoom}/Players/${this.playerID}`).set({
            movementData: {
                pos: { x: 300, y: 300 },
                velocity: {x:0,y:0}
            },
            attack: {
                time:0,
                pos: {x:300,y:300},
                velocity: {x: 0, y:0}
            },    
            playerType: "Bomber"
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

        window.addEventListener('beforeunload', (event) => {

            database.ref(`Games/${this.gameRoom}/Players/${this.playerID}`).remove();

        });

    }

    update(){
        let updates = {};
        let inputVelocity = {x:0,y:0}; //Velocity based on player input
        let speed = 64;
        if(this.keyboard.SHIFT.isDown){
            speed = 192;
        }

        if(this.keyboard.W.isDown){
            inputVelocity.y = -speed;
        }
        if(this.keyboard.S.isDown){
            inputVelocity.y = speed;
        }
        if(this.keyboard.A.isDown){
            inputVelocity.x = -speed;
        }
        if(this.keyboard.D.isDown){
            inputVelocity.x = speed;
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            let newAttack = {
                time: Date.now(),
                pos:{x:Math.round(this.player1.x), y:Math.round(this.player1.y)},
                velocity: inputVelocity
            };
           
            updates[`Games/${this.gameRoom}/Players/${this.playerID}/attack/`] = newAttack;

        }
        
        if(this.keyboard.W.isUp && this.keyboard.S.isUp){
            inputVelocity.y = 0;
        }
        if(this.keyboard.A.isUp && this.keyboard.D.isUp){
            inputVelocity.x = 0;
        }

        if(inputVelocity.x !== this.lastVelocity.x || inputVelocity.y !== this.lastVelocity.y){ //Don't want to update database if we don't have to 
            this.lastVelocity = {...inputVelocity};
            this.player1.setVelocity(inputVelocity.x,inputVelocity.y);
         
            updates[`Games/${this.gameRoom}/Players/${this.playerID}/movementData/velocity`] = inputVelocity ;
            updates[`Games/${this.gameRoom}/Players/${this.playerID}/movementData/pos`] = {x:Math.round(this.player1.x), y:Math.round(this.player1.y)};
            
        }

        if(Object.keys(updates).length !== 0){ //If updates contains something then send it to the database. This is for future updates
            firebase.database().ref().update(updates);
        }



    }
}