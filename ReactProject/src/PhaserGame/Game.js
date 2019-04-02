/** @type {import { "../typing/phaser" };} */

import React, { Component } from 'react';
import Phaser from 'phaser';

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";

export default class Game extends React.Component{
    componentDidMount(){

        let game = new Phaser.Game({
            type: Phaser.AUTO,
            width:1080,
            height:680,
            autoCenter:Phaser.Scale.CENTER_BOTH,
            
            physics: {
                default: 'arcade',
                
                arcade: {
                    debug: true
                }
            },
            scene:[
               LoadScene,MenuScene,PlayScene
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