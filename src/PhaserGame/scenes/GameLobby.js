import Phaser, { Scene } from 'phaser';
import { CST } from "../CST";
import {generate} from 'randomstring';
import * as firebase from 'firebase';
import { ConsoleLogger } from '@aws-amplify/core';

/**
 * GameLobby - extends Phaser.Scene
 * The scene where players create and join gameroom. 
 */
export class GameLobby extends Phaser.Scene {
    /**
     * creates the scene and assign a key of this scene to phaser scene
     * and creates ref, GameState, seatNumber, playerID property
    */
    constructor(){
        super(CST.SCENES.WAIT);

        /**
         * General reference on the Game path in databse.
         * @name GameLobby#ref
         * @type firebase.database.Reference
         */
        this.ref = firebase.database().ref("Games");

        /**
         * Numerical representation of the state of game and the number of players in the room
         * @name GameLobby#GameState
         * @type Object
         */
        this.GameState = {OPEN: 1, ONEJOINED: 2, TWOJOINED: 3, FULL: 4};

        /**
         * Seat number of the player, will be passed to the actual game scene to assign seat for player on the map
         * @name GameLobby#seatNumber
         * @type Integer
         */
        this.seatNumber = -1;

        /**
         * Player's ID used to keep track of the player and distinguish among players
         * @name GameLobby#playerID
         * @type String
         */
        this.playerID = generate(10);

        /**
         * number of bots the player should create when the game starts. 
         * @name GameLobby#botToCreate
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
         * @name GameLobby#playertype
         * @type String
         */
        this.playertype = data;
    } 

    /**
     * createGame is a function that creates a game room by pushing the creator's player id and the game state or seats
     * into the firebase
     */
    createGame (){
        console.log('creating a game!');

        let currentGame = {
            creator: {
                uid: this.playerID,
                userName: this.playerID
            },
            seat: this.GameState.OPEN
        };

        let key = this.ref.push();
        this.roomkeys = key.key;
        this.seatNumber = 1;
        key.set(currentGame, (error)=>{
            if(error){
                console.log("error");
            }else {
                console.log('created game',key);
                key.onDisconnect().remove();
            }
        });
        this.createbutton(this.roomkeys);
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
     * joinGame method takes in a parameter which is the room key and allow player to join that game
     * @param {String} key - the string key of the game room
     */
    joinGame(key) {
        console.log('joining game', key);

        let childref = this.ref.child(key);
        childref.transaction( (snapShot) =>{
        
            childref.once('value', snapShot =>{
                let game = snapShot.val();
                let val = game.seat;
                if( game.seat !== 4 ){
                    let val = game.seat + 1;
                    this.seatNumber = val; //Need a way to know the order of the seat which determines which side of the map people are on. 
                    let joiner = {
                        uid: this.playerID,
                        userName: this.playerID
                    }

                    childref.update( {seat : val} );
                    childref.push(joiner);
                }
                else{
                    alert('Full Room! Sorry, an error appears, reload page now');
                    window.location.reload();
                }
                })
        }/*, (err, commit, snapShot) =>{
            if(commit){
                console.log(snapShot.val());
            }
        } */)
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

            if( seat === this.GameState.FULL ){
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
            else if(snapShot.val().start){
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


        this.ref.once('value', snapShot => {
            let gamerooms = snapShot.val();
            
            if( !gamerooms ){
                this.createGame();
            }
            
            else {
                let keys = Object.keys(gamerooms);

                for( let i = 0; i < keys.length; i++ ){

                    if( gamerooms[keys[i]].seat < 4 && !gamerooms[keys[i]].start ){

                        this.roomkeys = keys[i];
                        this.joinGame(this.roomkeys);
                        break;
                    }
                    else if(i === keys.length - 1){
                        this.createGame();
                        break;
                    }
                };
            }
        }).then( snapShot =>{
            this.litsenGame(this.roomkeys);
        });
 
    }
}