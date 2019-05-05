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

export default class Game extends React.Component{
    componentDidMount(){
        this.inGame = false; 
        let game = new Phaser.Game({
            type: Phaser.AUTO,
            width: window.innerWidth,
            height:window.innerHeight/1.15,
            parent: 'phaser-game',
            physics: {
                default: 'arcade',
                
                arcade: {
                    debug: true
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

        this.startSinglePlayer = function(){
        
                game.scene.start(CST.SCENES.CHAR);
            
        }

        this.startMultiplayer = function(){
            
                game.scene.start(CST.SCENES.MULTIPLAYERCHARSELECT);
            
        }


    }

    shouldComponentUpdate(){
        return false;
    }

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

    render(){
        return <div id='phaser-game' />
    }
}