import React, { Component } from 'react';
import Game from './PhaserGame/Game';
import Leaderboard from './LeaderBoard.js';
import HomeNavBar from './HomeNavBar.js';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import {Auth} from 'aws-amplify';
import { Authenticator ,withAuthenticator} from 'aws-amplify-react';
import Tutorial from './Tutorial'
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

import * as firebase from 'firebase';
import { config } from 'aws-sdk/global';

/**
* App class
*/
class App extends Component {
      /**
  * @param {Bool} showGame toggle for the sign in feature
  * @param {Bool} showsingle toggle for the single player feature (when true single player should be displayed)
  * @param {Bool} showmulti toggle for the multiplayer feature (when true multiplayer should be displayed)
  * @param {Bool} showLeaderboard when true the leaderboard is shown
  * @param {Bool} showbuttons takes the multiplayer, single player, tutorial buttons off the screen when we show game or leaderboards
  * @param {Bool} infobutton toggles the info button at the bottom on and off
  * @param {null} signInName let's us pass a string into an null string approving of the username
  * @param {String} gameType toggles the info button at the bottom on and off
  * @param {Bool} showTutorial when true tutorial page is suppose to load
  */
  constructor(props) {
    super(props);
    this.state = {
      showGame:false, 
      showsingle:false,
      showmulti:false,
      showLeaderboard:false, 
      hideButton:true,
      showbuttons: false,
      infobutton: true,
      signInName: null,
      gameType: "single",
      showTutorial: false
    };

    
  }
  /**
  *let's us toggle all the buttons we need to toggle so the tutorial component is the only thing showing
  */
  showTutorialHandler = () => {
    this.setState({ 
      showTutorial: !this.state.showTutorial,
      showbuttons: !this.state.showbuttons,
      infobutton: !this.state.infobutton});
  }
  /**
  * this is the sign in handler that is connected to aws appsync and enables us to load user information into the website
  */
  signInHandler = (signInState) => {
    if(!this.state.showLeaderboard){
    this.setState({ showbuttons: !this.state.showbuttons });
    if (signInState === 'signedIn') {
      Auth.currentAuthenticatedUser().then( async (cognitoUser)=>{
        
        const uid = cognitoUser.attributes.sub;

        const User = await API.graphql(graphqlOperation(queries.listGameUsers, 
            {filter:{ sub: { eq: uid } } }))
            .then( async (data)=>{
          
              if(data.data.listGameUsers.items.length === 0){
              
                const newGamer = {
                  sub: uid,
                  username: cognitoUser.username,
                  bestTime: 0,
                  lastTime: 0,
                  bestScore: 0,
                  lastScore: 0,
                  lastChar: 'none'
                }
          
                try{
                  const newgamer = await API.graphql(graphqlOperation(mutations.createGameUser, {input: newGamer}));
                  console.log(newgamer);
                }catch(err){
                  console.log('error ',err);
                }
              }
        });

      this.setState({ 
        signInName:cognitoUser.username
      });
       
       
     });
    }
    else if(signInState === 'signIn'){
      this.setState({ 
        signInName:null
      });
    }
    this.setState({ showGame: !this.state.showGame });
  }
  else{
    this.setState({
       showLeaderboard: !this.state.showLeaderboard 
      });
    if (signInState === 'signedIn') {
     Auth.currentAuthenticatedUser().then((cognitoUser)=>{
      console.log(cognitoUser);
      this.setState({ 
        signInName:cognitoUser.username
      });
       
       
     });
    }
    else if(signInState === 'signIn'){
      this.setState({ 
        signInName:null
      });
    }
    this.setState({ showGame: !this.state.showGame });
  }
  }
  /**
   * called to set toggle the single player state to true, remove buttons from page and tell phaser that you want to play single player
   */
  showSinglePlayerHandler = () => {
    this.setState({ 
      showsingle: !this.state.showsingle,
      showbuttons: !this.state.showbuttons,
      gameType:"single",
      infobutton: !this.state.infobutton});
  }
    /**
   * called to set bool the multiplayer state to true, remove buttons from page and tell phaser that you want to play multiplayer
   */
  showMultiPlayerHandler = () => {
    this.setState({ 
      showmulti: !this.state.showmulti,
      showbuttons: !this.state.showbuttons,
      gameType:"multiplayer",
      infobutton: !this.state.infobutton});
  }
  /** 
   * function to reset all the toggle buttons and page to the original state
  */
  startingpage = () => {
    window.location.reload();
  }

    /**
   * this just sets the state so that the leaderboard is the only state showing on the webpage at the time of click
   * or if leaderboard is there resets the page to the starting page
   */
  showLeaderBoardHandler = ()=>{
    if(this.state.showGame){
    this.setState({ 
      showLeaderboard: !this.state.showLeaderboard,
      showbuttons: !this.state.showbuttons,
      infobutton: !this.state.infobutton});
    }
    else{
      this.setState({ 
        showLeaderboard: !this.state.showLeaderboard,
        showGame: !this.state.showGame});

      }
    
  }
  
  /**
   * standard react render method where all the aspects of the website can be displayed
   */
  render() {
   
    let gameClass = !this.state.showbuttons ? '' : 'hidden';
    let leaderBoardList = [[1,"playerName1",1200,"6:30"],[2,"playerName2",800,"9:30"],[3,"playerName3",765,"10:30"]
    ,[4,"playerName4",1200,"6:30"],[5,"playerName5",800,"9:30"],[6,"playerName6",765,"10:30"]
  ];


    return (
      <div className="App ">
        {!this.state.showsingle && !this.state.showmulti && !this.state.showTutorial && 
          <HomeNavBar leaderBoardOnClick={this.showLeaderBoardHandler} signInOnClick={this.signInHandler} signInButtonName={this.state.signInName} />
        }
        <Authenticator hideDefault={this.state.showGame} onStateChange={this.signInHandler} />
        {this.state.showbuttons && (
          
          <Container >

            <br></br>

            <Row className="form-group"> {/* Form Group add 15px spacing */}
              <Col>
                <Button className="col-md-2" variant="success" onClick={this.showSinglePlayerHandler}>Single Player</Button>
              </Col>
            </Row>

            <Row className="form-group">
              <Col>
                <Button className="col-md-2" onClick={this.showMultiPlayerHandler} variant="primary">Multiplayer</Button>
              </Col>
            </Row>

            <Row className="form-group">
              <Col>
                <Button onClick={this.showTutorialHandler} className="col-md-2" variant="info">Tutorial</Button>
              </Col>
            </Row>

            <Row className="form-group">
              <Col>
                <Button className="col-md-2" variant="danger">Store</Button>
              </Col>
            </Row>


          </Container>
     
        )}

    {this.state.showLeaderboard && (
        <div>
        <Leaderboard list={leaderBoardList}/>
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}  

    {!this.state.showLeaderboard && this.state.showGame && !this.state.showTutorial &&(
      <div className={gameClass}>
        <Game gameType={this.state.gameType} gameShouldStart={!this.state.showbuttons} />
      </div>
    )
    }

    {this.state.showTutorial && (
      <div className='Tutorial' align="center">
        <Tutorial />
        <Button className='back' onClick={this.startingpage} variant="secondary">Home</Button>
        </div>
    )}

      {this.state.showsingle && (
        <div>
         
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}

      {this.state.showmulti && (
        <div>
          
        <Button onClick={this.startingpage} variant="secondary">Back</Button>
        </div>
      )}
      {this.state.infobutton && this.state.showGame && !this.state.showLeaderboard &&
      <Button className="infobutton" variant="secondary">Info</Button>
      }
      </div>
    );
  }
}

export default App;