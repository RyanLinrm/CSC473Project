import React, { Component } from 'react';
import Game from './PhaserGame/Game';
import Leaderboard from './LeaderBoard.js';
import HomeNavBar from './HomeNavBar.js';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import {Auth} from 'aws-amplify';
import { Authenticator ,withAuthenticator} from 'aws-amplify-react';
import Tutorial from './Tutorial'

import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGame:false, 
      showsingle:false,
      showmulti:false,
      showLeaderboard:false, 
      hideButton:true,
      showbuttons: false,
      infobutton: true,
      signInName: null,
      gameType: "single",
      showTutorial: false
    };

    
  }

  showTutorialHandler = () => {
    this.setState({ 
      showTutorial: !this.state.showTutorial,
      showbuttons: !this.state.showbuttons,
      infobutton: !this.state.infobutton});
  }

  signInHandler = (signInState) => {
    if(!this.state.showLeaderboard){
    this.setState({ showbuttons: !this.state.showbuttons });
    if (signInState === 'signedIn') {
     Auth.currentAuthenticatedUser().then((cognitoUser)=>{
      console.log(cognitoUser);
      this.setState({ 
        signInName:cognitoUser.username
      });
       
       
     });
    }
    else if(signInState === 'signIn'){
      this.setState({ 
        signInName:null
      });
    }
    this.setState({ showGame: !this.state.showGame });
  }
  else{
    this.setState({
       showLeaderboard: !this.state.showLeaderboard 
      });
    if (signInState === 'signedIn') {
     Auth.currentAuthenticatedUser().then((cognitoUser)=>{
      console.log(cognitoUser);
      this.setState({ 
        signInName:cognitoUser.username
      });
       
       
     });
    }
    else if(signInState === 'signIn'){
      this.setState({ 
        signInName:null
      });
    }
    this.setState({ showGame: !this.state.showGame });
  }
  }

  showSinglePlayerHandler = () => {
    this.setState({ 
      showsingle: !this.state.showsingle,
      showbuttons: !this.state.showbuttons,
      gameType:"single",
      infobutton: !this.state.infobutton});
  }
  
  showMultiPlayerHandler = () => {
    this.setState({ 
      showmulti: !this.state.showmulti,
      showbuttons: !this.state.showbuttons,
      gameType:"multiplayer",
      infobutton: !this.state.infobutton});
  }

  startingpage = () => {
    /*this.setState({
      showGame:true,
      showsingle:false,
      showmulti:false,  
      hideButton:true,
      showbuttons: true,
      infobutton: true   
    })*/
    window.location.reload();
  }

  showLeaderBoardHandler = ()=>{
    if(this.state.showGame){
    this.setState({ 
      showLeaderboard: !this.state.showLeaderboard,
      showbuttons: !this.state.showbuttons,
      infobutton: !this.state.infobutton});
    }
    else{
      this.setState({ 
        showLeaderboard: !this.state.showLeaderboard,
        showGame: !this.state.showGame,
        infobutton: !this.state.infobutton});

      }
    
  }
  

  render() {
   
    let gameClass = !this.state.showbuttons ? '' : 'hidden';
    let leaderBoardList = [[1,"playerName1",1200,"6:30"],[2,"playerName2",800,"9:30"],[3,"playerName3",765,"10:30"]
    ,[4,"playerName4",1200,"6:30"],[5,"playerName5",800,"9:30"],[6,"playerName6",765,"10:30"]
  ];


    return (
      <div className="App ">
        {!this.state.showsingle && !this.state.showmulti && !this.state.showTutorial && 
          <HomeNavBar leaderBoardOnClick={this.showLeaderBoardHandler} signInOnClick={this.signInHandler} signInButtonName={this.state.signInName} />
        }
        <Authenticator hideDefault={this.state.showGame} onStateChange={this.signInHandler} />
        {this.state.showbuttons && (
          
          <Container >

            <br></br>

            <Row className="form-group"> {/* Form Group add 15px spacing */}
              <Col>
                <Button className="col-md-2" variant="success" onClick={this.showSinglePlayerHandler}>Single Player</Button>
              </Col>
            </Row>

            <Row className="form-group">
              <Col>
                <Button className="col-md-2" onClick={this.showMultiPlayerHandler} variant="primary">Multiplayer</Button>
              </Col>
            </Row>

            <Row className="form-group">
              <Col>
                <Button onClick={this.showTutorialHandler} className="col-md-2" variant="info">Tutorial</Button>
              </Col>
            </Row>

            <Row className="form-group">
              <Col>
                <Button className="col-md-2" variant="danger">Store</Button>
              </Col>
            </Row>


          </Container>
     
        )}

    {this.state.showLeaderboard && (
        <div>
        <Leaderboard list={leaderBoardList}/>
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}  

    {!this.state.showLeaderboard && this.state.showGame && !this.state.showTutorial &&(
      <div className={gameClass}>
        <Game gameType={this.state.gameType} gameShouldStart={!this.state.showbuttons} />
      </div>
    )
    }

    {this.state.showTutorial && (
      <div>
        <Tutorial />
        <Button className='back' onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
    )}

      {this.state.showsingle && (
        <div>
         
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}

      {this.state.showmulti && (
        <div>
          
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}
      {this.state.infobutton &&
      <Button className="infobutton" variant="secondary">Info</Button>
      }
      </div>
    );
  }
}

export default App;
