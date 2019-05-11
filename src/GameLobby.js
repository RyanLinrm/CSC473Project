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
            gamerooms: [],
            noroom: true
        }

        this.getRooms();
    }

    componentDidMount(){
        this.gameref.on('value', snapShot =>{
            let gamerooms = snapShot.val();
            
            if(gamerooms){
                this.setState({gamerooms:[...gamerooms], noroom: false}); 
            }
            else{
                this.setState({noroom: true});
            }
        })
    }

    render(){
        return(
            <div>
                <div>
                    <h1 className='text-center'>Game Lobby</h1>
                    <h3 className='text-center'>Game Rooms:</h3>
                </div>
            </div>
        )
    }
}