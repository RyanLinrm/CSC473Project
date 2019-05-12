import React, { Component } from 'react';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as firebase from 'firebase';

export default class GameLobby extends Component{
    constructor(props){
        super(props);
        this.gameref = firebase.database().ref('Games');
        this.state = {
            gamerooms: {},
            noroom: true,
            roomkey: '',
            seatNumber: -1,
            username: props.username,
            uid: props.uid,
            gotoroom: false
        }

        /**
         * Numerical representation of the state of game and the number of players in the room
         * @name GameLobby#GameState
         * @type Object
         */
        this.GameState = {OPEN: 1, ONEJOINED: 2, TWOJOINED: 3, FULL: 4};

        this.getRooms();
    }

    getRooms() {
        this.gameref.once('value', snapShot =>{
            let gamerooms = snapShot.val();
            
            if(gamerooms){
                let keys = Object.keys(gamerooms);
                let rooms = {};
                for( let i = 0; i < keys.length; i++ ){
                    if(!gamerooms[keys[i]].start){
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
                let val = game.seat;
                if( game.seat !== 4 ){
                    let val = game.seat + 1;
                    this.seatNumber = val; //Need a way to know the order of the seat which determines which side of the map people are on. 
                    let joiner = {
                        uid: this.state.uid,
                        userName: this.state.username
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

    renderRoomList() {
        let roomKeys = Object.keys(this.state.gamerooms);
        let roomList = [];

        for( let i = 0; i < roomKeys.length; i++ ){
            
            this.state.gamerooms[roomKeys[i]].id = roomKeys[i];
            roomList.push(this.state.gamerooms[roomKeys[i]])
        }

        let JSXoutList = roomList.map( (room) =>{
            <div className='text-center' key={room.id}>
                <div>
                    <h6>Room ID: {room.id}</h6>
                    <button onClick={()=>this.joinGameHandler(room.id)}>Join</button>
                </div>
            </div>
        })
    }

    render(){
        console.log(this.state);
        return(
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
                    {!this.state.noroom && (
                        <div className='text-center'>
                            <h6>a room</h6>
                        </div>   
                    )}
                    <button onClick={()=>this.createGame()}>Create Room</button>
                </div>
            </div>
        )
    }
}