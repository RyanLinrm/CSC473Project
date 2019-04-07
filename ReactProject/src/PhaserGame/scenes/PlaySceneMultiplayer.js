import {PlayScene} from './PlayScene.js';
import {generate} from 'randomstring';
import * as firebase from 'firebase';

export class PlaySceneMultiplayer extends PlayScene{ //The difference here is that everything is going to be rendered based on the database
    constructor() {
        super();
        let update = {};
        this.playerID = generate(10);
    
    }

    create() {
        super.create();
        this.lastVelocity = {x:0, y:0}; //Save last velocity to keep track of what we sent to the database
        let database = firebase.database();
        this.player.setVisible = false;

        database.ref('Games/Game1/Players/' + this.playerID).set({
            initialPosition: { x: 300, y: 300 },
            velocity: {x:0,y:0},
            playerType: "Bomber"
        });

        database.ref('Games/Game1/Players/' + this.playerID + '/velocity').on('value', (snapShot) => {
            let newVelocity = snapShot.val();
            this.player.setVelocity(newVelocity.x,newVelocity.y); //Gets value from database when changed
        });

        window.addEventListener('beforeunload', (event) => {

            database.ref('Games/Game1/Players/' + this.playerID).remove();

        });

    }

    update(){
        let updates = {};

        let inputVelocity = {x:0,y:0}; //Velocity based on player input

        let keyDown = false;
        if(this.keyboard.W.isDown){
            inputVelocity.y = -64;
            keyDown = true;
        }
        if(this.keyboard.S.isDown){
            inputVelocity.y = 64;
            keyDown = true;
        }
        if(this.keyboard.A.isDown){
            inputVelocity.x = -64;
            keyDown = true;
        }
        if(this.keyboard.D.isDown){
            inputVelocity.x = 64;
            keyDown = true;
        }
        
        if(this.keyboard.W.isUp && this.keyboard.S.isUp){
            inputVelocity.y = 0;

        }
        if(this.keyboard.A.isUp && this.keyboard.D.isUp){
            inputVelocity.x = 0;
        }

        
        if(inputVelocity.x !== this.lastVelocity.x || inputVelocity.y !== this.lastVelocity.y){ //Don't want to update database if we don't have to 
            this.lastVelocity = {...inputVelocity};
            updates['Games/Game1/Players/' + this.playerID + '/velocity'] = inputVelocity ;
            
        }

        if(Object.keys(updates).length !== 0){ //If updates contains something then send it to the database. This is for future updates
            console.log("updating");
            firebase.database().ref().update(updates);
        }



    }
}