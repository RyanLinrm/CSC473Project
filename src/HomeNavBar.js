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
                    <Nav.Link className="leaderboard" onClick={props.leaderBoardOnClick}>Leaderboard</Nav.Link>
                </Nav>
                
                <Nav  >
                <Navbar.Brand onClick={startingpage}>Strategy Arena</Navbar.Brand>
                </Nav>
               
                <Nav >
                    <Nav.Link className="signin" onClick={props.signInOnClick}>{signInText}</Nav.Link>
                </Nav>
               
            </Container>
        </Navbar>
    );


}

function startingpage () {
    window.location.reload();
}