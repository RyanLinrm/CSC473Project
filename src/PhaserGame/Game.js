/** @type {import { "../typing/phaser" };} */

import React, { Component } from 'react';
import Phaser from 'phaser';

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";
import { LoadScene2 } from "./scenes/LoadScene2";
import { GameLobby } from "./scenes/GameLobby";
import { GameOverScene } from "./scenes/GameOverScene";
import { PlaySceneMultiplayer } from "./scenes/PlaySceneMultiplayer";
import {CharSelectScene} from "./scenes/CharSelectScene"

export default class Game extends React.Component{
    componentDidMount(){
        console.log(this.props.name)
        let game =""
        if(this.props.name == "singleplayer"){
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
               LoadScene,MenuScene,PlayScene,GameLobby,PlaySceneMultiplayer,CharSelectScene,GameOverScene
            ],
            render:{
                pixelArt: true
            }
        });
    }       
    else{
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
               LoadScene2,MenuScene,PlayScene,GameLobby,PlaySceneMultiplayer,CharSelectScene,GameOverScene
            ],
            render:{
                pixelArt: true
            }
        });
    }

    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        return <div id='phaser-game' />
    }
}