import React, { Component } from 'react';
import Game from './PhaserGame/Game'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>React Phaser Game</h1>
      <Game />
      </div>
    );
  }
}

export default App;
