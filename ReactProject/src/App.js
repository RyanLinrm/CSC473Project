import React, { Component } from 'react';
import Game from './PhaserGame/Game';
import './App.css';

import {Auth} from 'aws-amplify';
import { Authenticator ,withAuthenticator} from 'aws-amplify-react';

import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGame:false, 
      showGame2:false,
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

  showGameHandler = () => {
    this.setState({ 
      showGame2: !this.state.showGame2,
      showbuttons: !this.state.showbuttons});
  }
  
  startingpage = () => {
    this.setState({
      showGame:true,
      showGame2:false, 
      hideButton:true,
      showbuttons: true,  
    })
  }
  

  render() {
    let gameClass = this.state.showGame ? '' : 'hidden';
    let buttonText = this.state.showGame ? 'Sign In' : 'Play';

    return (
      <div className="App">
      {!this.state.showGame2  &&
      <nav className="topbar">
        <ul>
          <li><button id="leader">Leaderboards</button></li>
          <li><h1>React Phaser Game</h1></li>
          <li><button id="signin" onClick={this.signInHandler}>{buttonText}</button></li>
        </ul>
      </nav>
      }
      <Authenticator hideDefault={this.state.showGame} onStateChange={this.signInHandler}/>
      {this.state.showbuttons && (
      <div className="mostButtons">
      <ul>
      <li><button onClick ={this.showGameHandler}>Single Player</button></li>
      <li><button onClick ={this.showGameHandler}>Multiplayer</button></li>
      <li><button>store</button></li>
      <li><button>tutorial</button></li>
      </ul>
      </div>
      )}

      {this.state.showGame2 && (
        <div>
        <Game />
        <button onClick={this.startingpage}>back</button>
        </div>
      )}
      <button className="infobutton">info</button>
      </div>
    );
  }
}

export default App;
