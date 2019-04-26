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
      showsingle:false,
      showmulti:false, 
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
  

  render() {
    let gameClass = this.state.showGame ? '' : 'hidden';
    let buttonText = this.state.showGame ? 'Sign In' : 'Play';

    return (
      <div className="App">
      {!this.state.showsingle && !this.state.showmulti  &&
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
      <li><button onClick ={this.showSinglePlayerHandler}>Single Player</button></li>
      <li><button onClick ={this.showMultiPlayerHandler}>Multiplayer</button></li>
      <li><button>store</button></li>
      <li><button>tutorial</button></li>
      </ul>
      </div>
      )}

      {this.state.showsingle && (
        <div>
        <Game name={"singleplayer"}/>
        <button onClick={this.startingpage}>back</button>
        </div>
      )}

      {this.state.showmulti && (
        <div>
       <Game name={"multiplayer"}/>
        <button onClick={this.startingpage}>back</button>
        </div>
      )}
      {this.state.infobutton &&
      <button className="infobutton">info</button>
      }
      </div>
    );
  }
}

export default App;
