import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';

export default function Leaderboard(props){
    let entries = [];
    
    props.list.forEach(element => {
        let newEntry =    <tr>
                            <td>{element[0]}</td>
                            <td>{element[1]}</td>
                            <td>{element[2]}</td>
                            <td>{element[3]}</td>
                          </tr> ; 

        entries.push(newEntry);
    });

    return (
        <Container>
            <Container>
                <h1>Leaderboard</h1>
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
                    {entries}
                </tbody>
            </Table>
        </Container>
    );
    
}