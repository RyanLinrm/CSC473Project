import React, { Component } from "react";
import { Button } from "react-bootstrap";
import './Tutorial.css';
import basicsprite from './tutorialimages/basicsprite.png'
import charselect from './tutorialimages/characterselect.png'
import HUD from './tutorialimages/playerHud.png'
import status from './tutorialimages/healthandmana.png'
import otherHealth from './tutorialimages/playerhealt.png'
import rider from './tutorialimages/riderclass.png'
import shooter from './tutorialimages/shooter.png'

export default class Tutorial extends Component {
  state = {
    nextCounter: 0
  };
//  <img src={HUD}/>
 // <img src={status}/>
 // <img src={otherHealth}/>

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

            <h2>Character Selection</h2>
            <div className='filler'> </div>
            <div className='box'>
            <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
              Previous{" "}
            </Button>
            <img src={charselect} />
            <Button className='next' onClick={this.inccount}>NEXT </Button>           
            <h4>At the start of the game you are told to choose your charcater. choose wisely as you are unable to 
              change charcater classes in the instance of the game </h4>
              <h2>class stats</h2>
            <table align="center">
              <tr>
                <th>class name:</th>
                <th className='rider'><h3>Rider Class</h3></th>
                <th className='shooter'><h3>Shooter Class</h3></th>
              </tr>
              <tr>
                <th>attack photo:</th>
                <th className='rider' ><img src={rider}/></th>
                <th className='shooter'><img src={shooter}/></th>
              </tr>
              <tr>
                <th>attack description:</th>
                <th className='rider'><h4>shoot out a sludge from behind</h4></th>
                <th className='shooter'><h3>shoot</h3></th>
              </tr>
              <tr>
                <th>Starting Health:</th>
                <th className='rider'><h4>150</h4></th>
                <th className='shooter'><h3>100</h3></th>
              </tr>
              <tr>
                <th>Starting mana:</th>
                <th className='rider'><h4>100</h4></th>
                <th className='shooter'><h3>150</h3></th>
              </tr>
              <tr>
                <th>Speed in single player:</th>
                <th className='rider'><h4>100</h4></th>
                <th className='shooter'><h3>150</h3></th>
              </tr>
              <tr>
                <th>Speed in multiplayer player:</th>
                <th className='rider'><h4>100</h4></th>
                <th className='shooter'><h3>150</h3></th>
              </tr>
            </table>
           </div>
           
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
          <h2> opposing health </h2>
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