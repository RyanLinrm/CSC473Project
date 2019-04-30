import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';

export default function HomeNavbar(props){
    let signInText = "Sign In";
    if(props.signInButtonName !== null){
        signInText = props.signInButtonName;
    }


    return(
        <Navbar bg="dark" variant="dark">
            <Container className ="d-flex justify-content-around">

                <Nav >
                    <Nav.Link onClick={props.leaderBoardOnClick}>Leaderboard</Nav.Link>
                </Nav>
                
                <Nav  >
                <Navbar.Brand href="#home">React Phaser Game</Navbar.Brand>
                </Nav>
               
                <Nav >
                    <Nav.Link onClick={props.signInOnClick}>{signInText}</Nav.Link>
                </Nav>
               
            </Container>
        </Navbar>
    );


}