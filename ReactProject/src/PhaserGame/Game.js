/** @type {import { "../typing/phaser" };} */

import React, { Component } from 'react';
import Phaser from 'phaser';

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";
import { PlaySceneMultiplayer } from "./scenes/PlaySceneMultiplayer";

export default class Game extends React.Component{
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
               LoadScene,MenuScene,PlayScene,PlaySceneMultiplayer
            ],
            render:{
                pixelArt: true
            }
        });


    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        return <div id='phaser-game' />
    }
}