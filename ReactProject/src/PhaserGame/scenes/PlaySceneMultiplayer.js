import {PlayScene} from './PlayScene.js';
import {generate} from 'randomstring';
import * as firebase from 'firebase';

export class PlaySceneMultiplayer extends PlayScene{
    constructor() {
        super();
        let update = {};
        this.playerID = generate(10);
    
    }

    create() {
        super.create();
        this.lastVelocity = {x:0, y:0}; //Save last velocity to keep track of what we sent to the database
        let database = firebase.database();


        database.ref('Games/Game1/Players/' + this.playerID).set({
            initialPosition: { x: 300, y: 300 },
            velocity: {x:0,y:0},
            playerType: "Bomber"
        });

        database.ref('Games/Game1/Players').on('value', (snapShot) => {
            console.log(snapShot.val());

        });

        window.addEventListener('beforeunload', (event) => {

            database.ref('Games/Game1/Players/' + this.playerID).remove();

        });

    }

    update(){
        let updates = {};
        let keyDown = false;
        if(this.keyboard.W.isDown){
            this.player.setVelocityY(-64);
            keyDown = true;
        }
        if(this.keyboard.S.isDown){
            this.player.setVelocityY(64);
            keyDown = true;
        }
        if(this.keyboard.A.isDown){
            this.player.setVelocityX(-64);
            keyDown = true;
        }
        if(this.keyboard.D.isDown){
            this.player.setVelocityX(64);
            keyDown = true;
        }
        
        if(this.keyboard.W.isUp && this.keyboard.S.isUp){
            this.player.setVelocityY(0);

        }
        if(this.keyboard.A.isUp && this.keyboard.D.isUp){
            this.player.setVelocityX(0);

        }


        let playerVelocity = this.player.body.velocity;
        if(playerVelocity.x !== this.lastVelocity.x || playerVelocity.y !== this.lastVelocity.y){
            this.lastVelocity = {...playerVelocity};
            updates['Games/Game1/Players/' + this.playerID + '/velocity'] = this.player.body.velocity ;
            firebase.database().ref().update(updates);
        }
    }
}