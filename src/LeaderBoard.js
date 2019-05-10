import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';

export default class Leaderboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            userinfo:[]
        };
        this.entries = [];

        this.getUserinfo();
    }

    async getUserinfo() {
        await API.graphql(graphqlOperation(queries.listGameUsers, {filter:{ bestTime: { ne: 0 } } }))
        .then( (data)=>{
            if(data.data.listGameUsers.items.length === 0){
                console.log('no user!')
            }
            else{
                this.setState({userinfo:[...data.data.listGameUsers.items]});
              }
        });
    }

    renderBasicFormat() {
        let userList = this.state.userinfo;
        let leaderBoardList = [];

        userList.sort( (a, b) => (a.bestTime < b.bestTime ) ? 1 : -1 );

        for( let i = 0; i < userList.length; i++ ){
            let temp = [ i+1, userList[i].username, userList[i].bestScore, userList[i].bestTime ];
            leaderBoardList.push(temp);
        }
        
        leaderBoardList.forEach( element => {
            let newEntry =    <tr key={element[0]}>
                                <td>{element[0]}</td>
                                <td>{element[1]}</td>
                                <td>{element[2]}</td>
                                <td>{element[3]}</td>
                              </tr> ; 
    
            this.entries.push(newEntry);
        });
    }

    render(){

        this.renderBasicFormat();
        return (
            <Container>
                <Container>
                    <h1>Leaderboard</h1>
                    <h3>TOP 10 Players!</h3>
                </Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Score</th>
                            <th>Fastest Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.entries}
                    </tbody>
                </Table>
            </Container>
        );
    }
    
}