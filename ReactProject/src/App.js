import React, { Component } from 'react';
import Game from './PhaserGame/Game';
import './App.css';

import {Auth} from 'aws-amplify';
import { Authenticator ,withAuthenticator} from 'aws-amplify-react';

import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showGame:false, hideButton:true};

    
  }

  signInHandler = (signInState) => {
    if (signInState === 'signedIn') {
   
    }
    this.setState({ showGame: !this.state.showGame });
  }


  render() {
    let gameClass = this.state.showGame ? '' : 'hidden';
    let buttonText = this.state.showGame ? 'Sign In' : 'Play';

    return (
      <div className="App">
      <nav className="topbar">
        <ul>
          <li><button id="leader">Leaderboards</button></li>
          <li><h1>React Phaser Game</h1></li>
          <li><button id="signin" onClick={this.signInHandler}>{buttonText}</button></li>
        </ul>
      </nav>
  
      <Authenticator hideDefault={this.state.showGame} onStateChange={this.signInHandler}/>
      <div className="mostButtons">
      <ul>
      <li><button >Single Player</button></li>
      <li><button >Multiplayer</button></li>
      <li><button>store</button></li>
      <li><button>tutorial</button></li>
      </ul>
      </div>
      <div className={gameClass}>
        <Game />
      </div>

      </div>
    );
  }
}

export default App;
