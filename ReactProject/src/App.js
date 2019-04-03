import React, { Component } from 'react';
import Game from './PhaserGame/Game'
import './App.css';

import Amplify  from 'aws-amplify';
import aws_exports from './aws-exports';
import {Authenticator ,withAuthenticator} from 'aws-amplify-react';
Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showGame:false, hideButton:true};
  }

  signInHandler = ()=>{
    this.setState({showGame:!this.state.showGame});
  }


  render() {
    let gameClass = this.state.showGame ? '' : 'hidden';
    let buttonText = this.state.showGame ? 'Sign In' : 'Play';

    return (
      <div className="App">
      <h1>React Phaser Game</h1>

      <button onClick={this.signInHandler}>{buttonText}</button>

      <Authenticator hideDefault={this.state.showGame} onStateChange={this.signInHandler}/>

      <div className={gameClass}>
        <Game />
      </div>

      </div>
    );
  }
}

export default App;
