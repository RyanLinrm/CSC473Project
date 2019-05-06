import React, { Component } from "react";
import { Button } from "react-bootstrap";
import './Tutorial.css';
import basicsprite from './tutorialimages/basicsprite.png'
import charselect from './tutorialimages/characterselect.png'
import HUD from './tutorialimages/playerHud.png'

export default class Tutorial extends Component {
  state = {
    nextCounter: 0
  };

  inccount = () => {
    this.setState({
      nextCounter: this.state.nextCounter + 1
    });
  };

  deccounter = () => {
    this.setState({
      nextCounter: this.state.nextCounter - 1
    });
  };
  render() {
    return (
      <div>
        {this.state.nextCounter == 0 && (
          <div>
            <h2> The aim of the game is survival</h2>
            <div className='filler'> </div>
            <div className='box'>
            <Button className="prev" variant="btn btn-light">
              Previous{" "}
            </Button>
            <img src={basicsprite}/>
            <Button className='next' onClick={this.inccount}>NEXT </Button>
            </div>
          </div>
        )}
        {this.state.nextCounter == 1 && (
            <div>

            <h2>Choose your character wisely</h2>
            <div className='filler'> </div>
            <div className='box'>
            <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
              Previous{" "}
            </Button>
            <img src={charselect} />
            <Button className='next' onClick={this.inccount}>NEXT </Button>           
            </div>
            <ul className='class list'>
            <li><h3>the bomber class</h3></li>
            <li><h3>the Rider class</h3></li>
            </ul>
            </div>
        )}
        {this.state.nextCounter == 2 && (
          <div>
          <h2> Movement </h2>
          <div className='filler'> </div>
          <div className='box'>
          <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
            Previous{" "}
          </Button>
          <Button className='next' onClick={this.inccount}>NEXT </Button>
          </div>
        </div>
        )}
        {this.state.nextCounter == 3 && (
          <div>
          <h2> Win Multiplayer by being the last building standing  </h2>
          <div className='filler'> </div>
          <div className='box'>
          <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
            Previous{" "}
          </Button>
          <Button className='next' onClick={this.inccount}>NEXT </Button>
          </div>
        </div>
        )}
        {this.state.nextCounter == 4 && (
          <div>
          <h2> Movement </h2>
          <div className='filler'> </div>
          <div className='box'>
          <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
            Previous{" "}
          </Button>
          <Button className='next' onClick={this.inccount}>NEXT </Button>
          </div>
        </div>
        )}
        {this.state.nextCounter == 5 && (
          <div>
          <h2> Drag and drop from your player HUD</h2>
          <div className='filler'> </div>
          <div className='box'>
          <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
            Previous{" "}
          </Button>
          <Button className='next' variant='light'>NEXT </Button>
          </div>
        </div>
        )}
      </div>
    );
  }
}