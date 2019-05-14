import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Tutorial.css";
import Table from "react-bootstrap/Table";
import basicsprite from "./tutorialimages/basicsprite.png";
import charselect from "./tutorialimages/characterselect.png";
import HUD from "./tutorialimages/playerHud.png";
import status from "./tutorialimages/healthandmana.png";
import otherHealth from "./tutorialimages/playerhealt.png";
import rider from "./tutorialimages/riderclass.png";
import shooter from "./tutorialimages/shooter.png";
import useHUD from "./tutorialimages/usehud.gif";
/**
 * Tutorial class
 */
class Tutorial extends Component {
  /**
   * @param {integer} Counter want the page not to be static so counter just keeps track of what step in the page you are on
   */
  state = {
    Counter: 0
  };
  // <img src={status}/>


  /**
   *when we click(next), it execute this instruction to tell the page to move on to the next set of tutorial elements
   */
  inccount = () => {
    this.setState({
      Counter: this.state.Counter + 1
    });
  };
  /**
   * when we click(prev), it execute this instruction to tell the page to move on to the previous set of tutorial elements
   */
  deccounter = () => {
    this.setState({
      Counter: this.state.Counter - 1
    });
  };

  /**
   * standard react render method where all the aspects of the website can be displayed
   */
  render() {
    return (
      <div>
        {this.state.Counter == 0 && (
          <div>
            <h2> The aim of the game is survival</h2>
            <div className="filler"> </div>
            <div className="box">
              <Button className="prev" variant="btn btn-light">
                Previous{" "}
              </Button>
              <img src={basicsprite} />
              <Button className="next" onClick={this.inccount}>
                NEXT{" "}
              </Button>
            </div>
          </div>
        )}
        {this.state.Counter === 1 && (
          <div>
            <h2>Character Selection</h2>
            <div className="filler"> </div>
            <div className="box">
              <Button
                onClick={this.deccounter}
                className="prev"
                variant="btn btn-dark"
              >
                Previous{" "}
              </Button>
              <img src={charselect} />
              <Button className="next" onClick={this.inccount}>
                NEXT{" "}
              </Button>
              <h4>
                At the start of the game you are told to choose your charcater.
                choose wisely as you are unable to change charcater classes in
                the instance of the game{" "}
              </h4>
              <h2>class stats</h2>
              <Table align="center">
                <tr>
                  <th>class name:</th>
                  <th className="rider">
                    <h3>Rider Class</h3>
                  </th>
                  <th className="shooter">
                    <h3>Shooter Class</h3>
                  </th>
                </tr>
                <tr>
                  <th>attack photo:</th>
                  <th className="rider">
                    <img src={rider} />
                  </th>
                  <th className="shooter">
                    <img src={shooter} />
                  </th>
                </tr>
                <tr>
                  <th>attack description:</th>
                  <th className="rider">
                    <h4>shoot out a sludge from behind</h4>
                  </th>
                  <th className="shooter">
                    <h3>shoot</h3>
                  </th>
                </tr>
                <tr>
                  <th>Starting Health:</th>
                  <th className="rider">
                    <h4>150</h4>
                  </th>
                  <th className="shooter">
                    <h3>100</h3>
                  </th>
                </tr>
                <tr>
                  <th>Starting mana:</th>
                  <th className="rider">
                    <h4>100</h4>
                  </th>
                  <th className="shooter">
                    <h3>150</h3>
                  </th>
                </tr>
                <tr>
                  <th>Speed in single player:</th>
                  <th className="rider">
                    <h4> </h4>
                  </th>
                  <th className="shooter">
                    <h3>150</h3>
                  </th>
                </tr>
                <tr>
                  <th>Speed in multiplayer player:</th>
                  <th className="rider">
                    <h4>100</h4>
                  </th>
                  <th className="shooter">
                    <h3>150</h3>
                  </th>
                </tr>
              </Table>
            </div>
          </div>
        )}
        {this.state.Counter === 2 && (
          <div>
            <h2> Movement </h2>
            <div className="filler"> </div>
            <div className="box">
              <Button
                onClick={this.deccounter}
                className="prev"
                variant="btn btn-dark"
              >
                Previous{" "}
              </Button>
              <Button className="next" onClick={this.inccount}>
                NEXT{" "}
              </Button>
            </div>
          </div>
        )}
        {this.state.Counter === 3 && (
          <div>
            <h2> Single Player Objective</h2>
            <div className="filler"> </div>
            <div className="box">
              <Button
                onClick={this.deccounter}
                className="prev"
                variant="btn btn-dark"
              >
                Previous{" "}
              </Button>
              <Button className="next" onClick={this.inccount}>
                NEXT{" "}
              </Button>
            </div>
          </div>
        )}
        {this.state.Counter === 4 && (
          <div>
            <h2> Multiplayer Objective</h2>
            <div className="filler"> </div>
            <div className="box">
              <Button
                onClick={this.deccounter}
                className="prev"
                variant="btn btn-dark"
              >
                Previous{" "}
              </Button>
              <Button className="next" onClick={this.inccount}>
                NEXT{" "}
              </Button>
            </div>
          </div>
        )}
        {this.state.Counter === 5 && (
          <div>
            <h2> opposing health </h2>
            <div className="filler"> </div>
            <div className="box">
              <Button
                onClick={this.deccounter}
                className="prev"
                variant="btn btn-dark"
              >
                Previous{" "}
              </Button>
              <Button className="next" onClick={this.inccount}>
                NEXT{" "}
              </Button>
              <img src={otherHealth}/>
            </div>
          </div>
        )}
        {this.state.Counter === 6 && (
          <div>
            <h2> Drag and drop from your player HUD members</h2>
            <div className="box">
              <Button
                onClick={this.deccounter}
                className="prev"
                variant="btn btn-dark"
              >
                Previous{" "}
              </Button>
              <Button className="next" variant="light">
                NEXT{" "}
              </Button>
              <img id="Hud" src={useHUD} />
              <h3>Everytime one is placed, it reduced player mana</h3>
              <h2> Functionality of HUD </h2>
              <img className="directHUD" src={HUD} />
              <Table className="directHUD" align="center">
                <tr>
                  <th>robot</th>
                  <th>wolf</th>
                  <th>skeletor</th>
                  <th>demon</th>
                  <th>wall</th>
                </tr>
                <tr>
                  <th>attack players and towers</th>
                  <th>attack players and towers</th>
                  <th>attack players and towers</th>
                  <th>attack players and towers</th>
                  <th>Blocks players path and attacks</th>
                </tr>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Tutorial;
