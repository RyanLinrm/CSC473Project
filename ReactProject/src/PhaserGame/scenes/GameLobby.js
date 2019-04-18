import Phaser, { Scene } from 'phaser';
import { CST } from "../CST";
import {generate} from 'randomstring';
import * as firebase from 'firebase';

export class GameLobby extends Phaser.Scene {
    constructor(){
        super(CST.SCENES.WAIT);
        this.ref = firebase.database().ref("Games");
        this.GameState = {OPEN: 1, ONEJOINED: 2, TWOJOINED: 3, FULL: 4};
        this.seatNumber = -1;
        this.playerID = generate(10);
        this.checkCycle = 0;
    }

    createGame = () =>{
        console.log('creating a game!');
        this.yesorno = false;

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
    }

    joinGame = (key) =>{
        console.log('joining game', key);

        let childref = this.ref.child(key);
        
        childref.once('value', snapShot=>{
            let game = snapShot.val();
            if( game.seat !== 4 ){
                let val = game.seat + 1;
                this.seatNumber = val; //Need a way to know the order of the seat which determines which side of the map people are on. 
                let joiner = {
                    uid: this.playerID,
                    userName: this.playerID
                }

                childref.update( {seat : val} );
                childref.push().set(joiner, (error)=>{
                    if(error){
                        console.log('error when player joining game');
                    }
                    else{
                        console.log('a player sits down');
                    }
                });
            }
            else{
                alert('Full Room!');
            }
            /*
        this.ref.child(key).transaction( (game) =>{
            if( !game.joiner ){
                game.state = this.GameState.ONEJOINED;
                game.joiner = {
                    uid: this.playerID,
                    userName: this.playerID
                }
                console.log('p1 sits down');
            }*/
            /*
            else if( game.state !== 4 ){
                game.state = this.GameState.TWOJOINED;
                game.joiner2 = {
                    uid: this.playerID,
                    userName: this.playerID
                }
                console.log('p2 sits down');
            }
            else if( game.state !== 4 ){
                game.state = this.GameState.FULL;
                game.joiner3 = {
                    uid: this.playerID,
                    userName: this.playerID
                }
                console.log('p3 sits down');
            }
            return game;
        }, (error, committed, snapShot)=> {
            if(committed){
                if(snapShot.val().state === this.GameState.FULL){
                    console.log("FULL ROOM");
                    this.yesorno = true;
                    //this.scene.start(CST.SCENES.PLAYMULTIPLAYER);
                }
            }
            else {
                console.log('error joining game 1st');
            }*/
        });
    }

    create(){
        this.ref.once("value", snapShot => {
            let gamerooms = snapShot.val();
            /*if(gamerooms)
            console.log(Object.keys(gamerooms)[0]);*/
            if( !gamerooms ){
                this.createGame();
            }
            /*else if( this.CanCreateGame() ){
                this.createGame();
            }*/
            else {
                this.roomkeys = Object.keys(gamerooms)[0];
                this.joinGame(this.roomkeys);
            }
        });
    }

    update(time, delta){
        if( this.checkCycle < time && this.roomkeys !== undefined ){
            this.ref.child(this.roomkeys).once('value', snapShot =>{
                console.log( snapShot.val().seat );
                if( snapShot.val().seat === this.GameState.FULL){
                    this.scene.start(CST.SCENES.PLAYMULTIPLAYER, {
                        playerID : this.playerID,
                        roomkey : this.roomkeys,
                        seatNumber: this.seatNumber
                    });
                }
            });
            this.checkCycle = 5000 + time;
        }
    }
}