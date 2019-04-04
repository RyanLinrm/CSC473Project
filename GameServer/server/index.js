const path = require('path');
const jsdom = require('jsdom');
const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io').listen(server);

const { JSDOM } = jsdom;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});


//BoilerPlate toget server to run the phaser files and wait for virtual DOM to load
const setupAutoritativePhaser = () =>{
  JSDOM.fromFile(path.join(__dirname,'authoritative_server/index.html'),{
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true
  }).then((dom)=>{
      dom.window.gameLoaded = ()=>{
        server.listen(8081,()=> console.log("listening on port 8081"));
      };
      dom.window.io = io;
  }).catch((error)=>{
      console.log("Error");
  });
};

setupAutoritativePhaser();