import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';

export default class Leaderboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            userinfo:[],
            sorted: 'time'
        };
        this.entries = [];

        this.getUserinfo();
    }

    async getUserinfo() {
        await API.graphql(graphqlOperation(queries.listGameUsers, {filter:{ bestScore: { ne: 0 } } }))
        .then( (data)=>{
            if(data.data.listGameUsers.items.length === 0){
                console.log('no user!')
            }
            else{
                this.setState({userinfo:[...data.data.listGameUsers.items]});
              }
        });
    }

    SortedByTime() {
        let userList = this.state.userinfo;
        let leaderBoardList = [];
        let entries = [];

        userList.sort( (a, b) => (a.bestTime > b.bestTime ) ? 1 : -1 );

        for( let i = 0; i < userList.length; i++ ){
            let temp = [ i+1, userList[i].username, userList[i].bestScore, userList[i].bestTime, userList[i].lastChar ];
            leaderBoardList.push(temp);
        }
        
        leaderBoardList.forEach( element => {
            let newEntry =    <tr key={element[0]}>
                                <td>{element[0]}</td>
                                <td>{element[1]}</td>
                                <td>{element[2]}</td>
                                <td>{element[3]} s</td>
                                <td>{element[4]}</td>
                              </tr> ; 
    
            entries.push(newEntry);
        });

        return entries;
    }

    SortedByScore() {
        let userList = this.state.userinfo;
        let leaderBoardList = [];
        let entries = [];

        userList.sort( (a, b) => (a.bestScore < b.bestScore ) ? 1 : -1 );

        for( let i = 0; i < userList.length; i++ ){
            let temp = [ i+1, userList[i].username, userList[i].bestScore, userList[i].bestTime, userList[i].lastChar ];
            leaderBoardList.push(temp);
        }
        
        leaderBoardList.forEach( element => {
            let newEntry =    <tr key={element[0]}>
                                <td>{element[0]}</td>
                                <td>{element[1]}</td>
                                <td>{element[2]}</td>
                                <td>{element[3]} s</td>
                                <td>{element[4]}</td>
                              </tr> ; 
    
            entries.push(newEntry);
        });

        return entries;
    }

    render(){
        if(this.state.sorted === 'time'){
            this.entries = this.SortedByTime();
        }
        else if(this.state.sorted === 'score'){
            this.entries = this.SortedByScore();
        }
        else console.log('there is an error');

        return (
            <Container>
                <Container>
                    <h1>Leaderboard</h1>
                    <h4>TOP 10 Players!</h4>
                </Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Score</th>
                            <th>Fastest Time</th>
                            <th>Character</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.entries}
                    </tbody>
                </Table>
                <button className="btn btn-outline-success"
                     onClick={()=>this.setState({sorted:'time'})}>Best Time</button>
                <button className="btn btn-outline-success" 
                    onClick={()=>this.setState({sorted:'score'})}>Best Score</button>
            </Container>
        );
    }
    
}