import React, { Component } from 'react';
import Game from './PhaserGame/Game';
import Leaderboard from './LeaderBoard.js';
import HomeNavBar from './HomeNavBar.js';
import './App.css';
import { Button } from 'react-bootstrap';
import {Auth} from 'aws-amplify';
import { Authenticator ,withAuthenticator} from 'aws-amplify-react';

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
      infobutton: true 
    };

    
  }

  signInHandler = (signInState) => {
    this.setState({ showbuttons: !this.state.showbuttons });
    if (signInState === 'signedIn') {
   
    }
    this.setState({ showGame: !this.state.showGame });
  }

  showSinglePlayerHandler = () => {
    this.setState({ 
      showsingle: !this.state.showsingle,
      showbuttons: !this.state.showbuttons,
      infobutton: !this.state.infobutton});
  }
  
  showMultiPlayerHandler = () => {
    this.setState({ 
      showmulti: !this.state.showmulti,
      showbuttons: !this.state.showbuttons,
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
    this.setState({ 
      showLeaderboard: !this.state.showLeaderboard,
      showbuttons: !this.state.showbuttons,
      infobutton: !this.state.infobutton});
  }
  

  render() {
    let gameClass = this.state.showGame ? '' : 'hidden';
    let buttonText = this.state.showGame ? 'Sign In' : 'Play';
    let leaderBoardList = [[1,"playerName1",1200,"6:30"],[2,"playerName2",800,"9:30"],[3,"playerName3",765,"10:30"]
    ,[4,"playerName4",1200,"6:30"],[5,"playerName5",800,"9:30"],[6,"playerName6",765,"10:30"]
  ];

    return (
      <div className="App">
        {!this.state.showsingle && !this.state.showmulti &&
          <HomeNavBar leaderBoardOnClick={this.showLeaderBoardHandler} signInOnClick={this.signInHandler} signInButtonText={buttonText} />
        }
        <Authenticator hideDefault={this.state.showGame} onStateChange={this.signInHandler} />
        {this.state.showbuttons && (
          <div className="mostButtons">
            <ul>
              <li><Button variant="success"onClick={this.showSinglePlayerHandler}>Single Player</Button></li>
              <li><Button onClick={this.showMultiPlayerHandler} variant="primary">Multiplayer</Button></li>
              <li><Button variant="info">Tutorial</Button></li>
              <li> <Button variant="danger">Store</Button></li>
            </ul>
          </div>
        )}

    {this.state.showLeaderboard && (
        <div>
        <Leaderboard list={leaderBoardList}/>
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}  



      {this.state.showsingle && (
        <div>
        <Game name={"singleplayer"}/>
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}

      {this.state.showmulti && (
        <div>
       <Game name={"multiplayer"}/>
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
