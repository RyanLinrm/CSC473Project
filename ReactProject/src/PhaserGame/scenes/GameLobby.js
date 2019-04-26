import Phaser, { Scene } from 'phaser';
import { CST } from "../CST";
import {generate} from 'randomstring';
import * as firebase from 'firebase';
import { ConsoleLogger } from '@aws-amplify/core';

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

    litsenGame = (key) => {
        this.ref.child(key).on('child_changed', snapShot=>{
            let seat = snapShot.val();

            if( seat === this.GameState.FULL ){
                this.scene.start(CST.SCENES.PLAYMULTIPLAYER, {
                    playerID : this.playerID,
                    roomkey : this.roomkeys,
                    seatNumber: this.seatNumber
                });
            }
            else{
                this.seatinfo.setText(seat + ' player(s) in the room, waiting...');
            }
        })
    }

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

                    if( gamerooms[keys[i]].seat < 4 ){

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