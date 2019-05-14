import React, { Component } from 'react';
import Game from './PhaserGame/Game';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as firebase from 'firebase';
import {generate} from 'randomstring';

/**
 * GameLobby - extends react component
 * The scene where players create and join game room
 *
 */
export default class GameLobby extends Component{
    constructor(props){
        super(props);
        this.gameref = firebase.database().ref('Games');

        let name = props.username;
        let uid = props.uid;
        
        this.state = {
            gamerooms: {},
            noroom: true,
            roomkey: '',
            seatNumber: -1,
            username: name,
            uid: uid,
            gotoroom: false
        }

        this.gametype = 'multi'

        /**
         * Numerical representation of the state of game and the number of players in the room
         * @name GameLobby#GameState
         * @type Object
         */
        this.GameState = {OPEN: 1, ONEJOINED: 2, TWOJOINED: 3, FULL: 4};

        this.getRooms();
    }

    /**
     * update the state of all the game room to display on this page
     *
     */
    getRooms() {
        this.gameref.once('value', snapShot =>{
            let gamerooms = snapShot.val();
            
            if(gamerooms){
                let keys = Object.keys(gamerooms);
                let rooms = {};
                for( let i = 0; i < keys.length; i++ ){
                    if(!gamerooms[keys[i]].start && gamerooms[keys[i]].seat ){
                        rooms[keys[i]] = gamerooms[keys[i]]
                    }
                }
                this.setState({gamerooms:{...rooms}, noroom: false}); 
            }
            else{
                this.setState({noroom: true});
            }
        })
    }

    /**
     * createGame is a function that creates a game room by pushing the creator's player id and the game state or seats
     * into the firebase
     */
    createGame (){
        console.log('creating a game!');

        let currentGame = {
            creator: {
                uid: this.state.uid,
                userName: this.state.username
            },
            seat: this.GameState.OPEN
        };

        let key = this.gameref.push();
        this.setState({roomkey: key.key,
            seatNumber: 1})

        key.set(currentGame, (error)=>{
            if(error){
                console.log("error");
            }else {
                console.log('created game',key);
                key.onDisconnect().remove();
            }
        });

        this.setRedirect(key.key, 1);
    }

    /**
     * joinGame method takes in a parameter which is the room key and allow player to join that game
     * @param {String} roomid- the string key of the game room
     */
    joinGameHandler(roomid) {
        let childref = this.gameref.child(roomid);
        childref.transaction( (snapShot) =>{
        
            childref.once('value', snapShot =>{
                let game = snapShot.val();
                //let val = game.seat;
                if( game.seat !== 4 ){
                    let val = game.seat + 1;
                    //this.seatNumber = val; //Need a way to know the order of the seat which determines which side of the map people are on. 
                    let joiner = {
                        uid: this.state.uid,
                        userName: this.state.username
                    }

                    childref.update( {seat : val} );
                    childref.push(joiner);

                    this.setState({roomkey: roomid,
                        seatNumber: val})

                        this.setRedirect(roomid, val);
                }
                else{
                    alert('Full Room! Sorry, an error appears, reload page now');
                    window.location.reload();
                }
                })
                
        })

    }

    setRedirect(roomkey, seat) {
        this.props.handler(roomkey,seat);
    }

    renderRoomList() {
        let roomKeys = Object.keys(this.state.gamerooms);
        let roomList = [];

        for( let i = 0; i < roomKeys.length; i++ ){
            
            this.state.gamerooms[roomKeys[i]].id = roomKeys[i];
            roomList.push(this.state.gamerooms[roomKeys[i]])
        }

        let JSXoutList = roomList.map( (room) =>
            <div className='text-center' key={room.id}>
                <div>
                    <h6>Room ID: {room.id}</h6>
                    <button onClick={()=>this.joinGameHandler(room.id)}>Join</button>
                </div>
            </div>
        )

        return JSXoutList;
    }

    render(){
        
        let gamelist = this.renderRoomList();
        
        return(
            <div>
                <div>
                    <div className='text-center'>
                        <h1 className='text-center'>Game Lobby</h1>
                        <h3 className='text-center'>Game Rooms:</h3>
                        {this.state.noroom && (
                                <div className='text-center'>
                                    <h5>There is no any game room yet, let's create one</h5>
                                </div>
                            )
                            }
                            {gamelist}
                            <button onClick={()=>this.createGame()}>Create Room</button>
                        </div>
                        <div className='text-center'>
                            <button onClick={()=>this.getRooms()}>refresh</button>
                    </div>
                </div>
            </div>
        )
    }
}