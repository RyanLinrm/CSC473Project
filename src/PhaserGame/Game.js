/** @type {import { "../typing/phaser" };} */

import React, { Component } from 'react';
import Phaser from 'phaser';
import {CST} from "./CST"; 
import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";
import { LoadScene2 } from "./scenes/LoadScene2";
import { GameLobby } from "./scenes/GameLobby";
import { GameOverScene } from "./scenes/GameOverScene";
import { PlaySceneMultiplayer } from "./scenes/PlaySceneMultiplayer";
import {CharSelectScene} from "./scenes/CharSelectScene"
import { MULTIPLAYERCHARSELECT } from './scenes/Multiplayercharselect';


/**
 * React Game Component, contains the actual Phaser canvas. 
 * @alias Game
 */
export default class Game extends React.Component{


    /**
     * @instance
     * @memberof Game
     * @method componentDidMount
     * @description method that is called by react. The phaser game is created here
     */
    componentDidMount(){
        
        let game = new Phaser.Game({
            type: Phaser.AUTO,
            width: window.innerWidth,
            height:window.innerHeight/1.15,
            parent: 'phaser-game',
            physics: {
                default: 'arcade',
                
                arcade: {
                    debug: false
                }
            },
            scene:[
               LoadScene,MenuScene,PlayScene,GameLobby,PlaySceneMultiplayer,CharSelectScene,MULTIPLAYERCHARSELECT,GameOverScene
            ],
            render:{
                pixelArt: true
            },
            assetsLoaded: false
        });

         /**
          * (function created when react calls componentDidMount)
          * 
          * 
          * this function starts the single player scene in phaser
          */
        this.startSinglePlayer = function(){
                game.scene.start(CST.SCENES.CHAR);
        }

         /**
          * (function created when react calls componentDidMount)
          * 
          * 
          * this function starts the multiplayer player scene in phaser
          */
        this.startMultiplayer = function(){
                game.scene.start(CST.SCENES.MULTIPLAYERCHARSELECT);
        }
    }


    /**
     * @instance
     * @memberof Game
     * @method shouldComponentUpdate
     * @description stopping the react component from updating so it doesn't mess with phaser to re render.
     */
    shouldComponentUpdate(){
        return false;
    }

    /**
     * @instance
     * @memberof Game
     * @method componentWillReceiveProps
     * @description called when react recieves changed props used to start the actual phaser game
     * @param {object} newProps - the props passed by react when the state change. it should be {gameType:val, gameShouldStart:val}
     */
    componentWillReceiveProps(newProps){
    
            if(newProps.gameType === 'single' && newProps.gameShouldStart){
                console.log(newProps.gameType);
                this.startSinglePlayer();
            }
            else if(newProps.gameShouldStart){
                this.startMultiplayer();
                console.log(newProps.gameType);
            }
    }

    /**
     * @instance
     * @memberof Game
     * @method render
     * @description The render method which returns a div, The div is of id='phaser-game' and is used by the phaser game to attach the canvas as a child to it
     */
    render(){
        return <div id='phaser-game' />
    }
}