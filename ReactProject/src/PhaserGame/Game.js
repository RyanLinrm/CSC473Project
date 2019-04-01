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
            width:800,
            height:600,
            
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