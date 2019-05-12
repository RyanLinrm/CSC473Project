import Phaser, { Scene } from 'phaser';
import { CST } from "../CST";
import {generate} from 'randomstring';
import * as firebase from 'firebase';
import { ConsoleLogger } from '@aws-amplify/core';

/**
 * GameRoom - extends Phaser.Scene
 * The scene where players all set into a game room
 */
export class GameRoom extends Phaser.Scene {
    /**
     * creates the scene and assign a key of this scene to phaser scene
     * and creates ref, GameState, seatNumber, playerID property
    */
    constructor(){
        super(CST.SCENES.WAIT);

        /**
         * General reference on the Game path in databse.
         * @name GameRoom#ref
         * @type firebase.database.Reference
         */
        this.ref = firebase.database().ref("Games");

        /**
         * Numerical representation of the state of game and the number of players in the room
         * @name GameRoom#GameState
         * @type Object
         */
        this.GameState = {OPEN: 1, ONEJOINED: 2, TWOJOINED: 3, FULL: 4};

        /**
         * Seat number of the player, will be passed to the actual game scene to assign seat for player on the map
         * @name GameRoom#seatNumber
         * @type Integer
         */
        this.seatNumber = -1;

        /**
         * Player's ID used to keep track of the player and distinguish among players
         * @name GameRoom#playerID
         * @type String
         */
        this.playerID = generate(10);

        /**
         * number of bots the player should create when the game starts. 
         * @name GameRoom#botToCreate
         * @type number
         */
        this.botToCreate = 0;
    }
    
    /**
     * init is a phaser scene function will it initialize a scene
     * @param {String} data - the type of character
     */
    init(data){

        /**
         * The type of character that's chosen by the player before join the lobby
         * @name GameRoom#playertype
         * @type String
         */
        this.playertype = data;
    } 
    
    /**
     * createButton method takes in parameter key which is the key of the game room and 
     * then create a game start button for the game master to force a game start instead of waiting
     * for all other player to fulfill the room
     * @param {String} key - the string key of the game room
     */
    createbutton (key) {
        this.startButton =
            this.add.image(this.game.renderer.width / 2,
                this.game.renderer.height / 2 + 225, "PlayButton").setDepth(1);

        this.startButton.setInteractive();
        
        let ref = this.ref.child(key);
        ref.child('start').set(false);

        this.startButton.on("pointerup", ()=>{
            ref.update({start: true});
          });
    }

    /**
     * litsenGame function takes in a parameter of the key of the game room
     * and it listen to the stage changing in that room: if the seat in the room is full
     * which is 4, or if the game master has pressed the start button, the game will begins
     * @param {String} key - the string key of the game room
     */
    litsenGame(key) {
        this.ref.child(key).on('value', snapShot=>{
            let seat = snapShot.val().seat;

            /*if( seat === this.GameState.FULL ){
                this.scene.start(CST.SCENES.PLAYMULTIPLAYER, {
                    playerID : this.playerID,
                    roomkey : this.roomkeys,
                    seatNumber: this.seatNumber,
                    chartype: this.playertype,
                    numOfBots: this.botToCreate,
                    numOfPlayers: seat
                });
                this.ref.child(key).off();
            }*/
            //else 
            if(snapShot.val().start){
                this.scene.start(CST.SCENES.PLAYMULTIPLAYER, {
                    playerID : this.playerID,
                    roomkey : this.roomkeys,
                    seatNumber: this.seatNumber,
                    chartype: this.playertype,
                    numOfBots: this.botToCreate,
                    numOfPlayers: seat
                });
                this.ref.child(key).off();
            }
            else{
                this.seatinfo.setText(seat + ' player(s) in the room, waiting...');
            }
        })
    }

    /**
     * A phaser scene function which is being called when a scene is created, in this method
     * all the matchmaking system will be handled, and it will also display the information about
     * the game room real time
     */
    create(){

        let info = this.add.text(600, 250, "Game Lobby", {fontSize: '32px'});
        let info2 = this.add.text(625, 280, "Waiting...", {fontSize: '24px'});
        this.seatinfo = this.add.text(500, 300, '1 player in the room, waiting...', {fontSize: '24px'});


        this.litsenGame(this.roomkeys);
 
    }
}