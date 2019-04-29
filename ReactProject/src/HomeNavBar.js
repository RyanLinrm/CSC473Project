import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';

export default function HomeNavbar(props){

    return(
        <Navbar bg="dark" variant="dark">
            <Container>

                <Nav className="mx-auto">
                    <Nav.Link onClick={props.leaderBoardOnClick}>Leaderboard</Nav.Link>
                </Nav>
                
                <Navbar.Brand className="mx-auto" href="#home">React Phaser Game</Navbar.Brand>

                <Nav className="mx-auto">
                    <Nav.Link onClick={props.signInOnClick}>{props.signInButtonText}</Nav.Link>
                </Nav>

            </Container>
        </Navbar>
    );


}