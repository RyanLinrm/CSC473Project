import React, { Component } from "react";
import { Button } from "react-bootstrap";
import './Tutorial.css';

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
            <div className='box'>
            <Button className="prev" variant="btn btn-light">
              Previous{" "}
            </Button>
            <Button onClick={this.inccount}>NEXT </Button>
            </div>
          </div>
        )}
        {this.state.nextCounter == 1 && (
            <div>
            <h2> Earn LeaderBoard Points by destoying other buildings and other players</h2>
            <div className='box'>
            <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
              Previous{" "}
            </Button>
            <Button onClick={this.inccount}>NEXT </Button>
            </div>
          </div>
        )}
        {this.state.nextCounter == 2 && (
          <div>
          <h2> use the W, A, S, D buttons to move</h2>
          <div className='box'>
          <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
            Previous{" "}
          </Button>
          <Button onClick={this.inccount}>NEXT </Button>
          </div>
        </div>
        )}
        {this.state.nextCounter == 3 && (
          <div>
          <h2> The Objective of this game is to</h2>
          <div className='box'>
          <Button onClick={this.deccounter} className="prev" variant="btn btn-dark">
            Previous{" "}
          </Button>
          <Button variant='light'>NEXT </Button>
          </div>
        </div>
        )}
      </div>
    );
  }
}
