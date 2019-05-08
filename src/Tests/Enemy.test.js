import PlayerScene, { PlayScene } from '../PhaserGame/scenes/PlayScene';
import Phaser from 'phaser';
import {Player} from "../PhaserGame/gameObjects/Player";
import {Units} from "../PhaserGame/gameObjects/Units";
import { Enemy } from "../PhaserGame/gameObjects/Enemy";
jest.mock('phaser');
jest.mock('../PhaserGame/gameObjects/Player');
jest.mock('../PhaserGame/gameObjects/Units');
const x=0;
const y=0;
const scene=new PlayScene();
const key="wolf";
const textureName="wolf_01";
const player = new Player(scene,300,300, "p1", "p1_01.png",100, 64,'233');
const tower = new Units(scene,0,0,100,-1,"pyramid",1,1000,4,180,200);
const target=player;
const enemyID=0;
const healthPoints=100;
const attackRate=0;
const ATK=0;
const attackRange=0;
const movementSpeed=0;
const cooldown=0;
const uid="233";

const newEnemy = new Enemy(scene,x,y,key,textureName,target,enemyID,healthPoints,attackRate,ATK,attackRange,movementSpeed,cooldown,uid);
// still need to add more to it and fix the testing errors
test('Testing enemy class constructer correctly and intializes a new enemy wolf', ()=>{
    const x=0;
    const y=0;
    const newEnemy = new Enemy(scene,x,y,key,textureName,target,enemyID,healthPoints,attackRate,ATK,attackRange,movementSpeed,cooldown,uid);

    expect(newEnemy).toBeDefined();
    expect(newEnemy.target).toBe(player);
    expect(newEnemy.enemyID).toBe(enemyID);
    expect(newEnemy.healthPoints).toBe(healthPoints);
    expect(newEnemy.attackRate).toBe(attackRate);
    expect(newEnemy.ATK).toBe(ATK);
    expect(newEnemy.attackRange).toBe(attackRange);
    expect(newEnemy.movementSpeed).toBe(movementSpeed);
    expect(newEnemy.cooldown).toBe(cooldown);
    expect(newEnemy.uid).toBeDefined();
    expect(newEnemy.createAttack).toBeDefined();
    expect(newEnemy.removeDefense).toBeDefined();
    expect(newEnemy.beingAttacked).toBeDefined();
    
    
});


test('Testing the changetarget function in enemy class', ()=>{

    const newtarget =tower;

    //test wheather the current target is player 
    expect(newEnemy.target).toBe(player);

    newEnemy.changetarget(newtarget);
    let correctTarget=tower;
    //test wheather the target is changed to tower
    expect(newEnemy.target).toBe(correctTarget);
});

test('Testing the distance function in enemy class', ()=>{

    const otherEnemy = new Enemy(scene,0,0,key,textureName,target,enemyID,healthPoints,attackRate,ATK,attackRange,movementSpeed,cooldown,uid);
 
    shortestpath=newEnemy.distance(newEnemy,otherEnemy);
    expect(shortestpath).toBe(0);
});


test('Testing if takeDamage correctly decrease the hp of enemy', ()=>{

    newEnemy.takeDamage(20);
    expect(newEnemy.healthPoints).toEqual(80);
    newEnemy.takeDamage(10);
    expect(newEnemy.healthPoints).toEqual(70);
    newEnemy.takeDamage(1);
    expect(newEnemy.healthPoints).toEqual(69);
    newEnemy.takeDamage(5);
    expect(newEnemy.healthPoints).toEqual(64);
    newEnemy.takeDamage(0);
    expect(newEnemy.healthPoints).toEqual(64);
 
});

test('Testing if takeDamage calls kill function when enemy hp is less than 0', ()=>{
 
    newEnemy.kill = jest.fn();
    newEnemy.takeDamage(105);
    expect(newEnemy.healthPoints).toEqual(-5);
    expect(newEnemy.kill).toBeCalledTimes(1);

});

test('Testing if collision funciton correctly works for enemy class', ()=>{
   
    newEnemy.takeDamage = jest.fn();
    newEnemy.collision();

    expect(newEnemy.beingAttacked).toEqual(true);
    expect(newEnemy.takeDamage).toBeCalledTimes(1);

});

test('Testing if isInjured function correctly work (changes tint and count) while being attacked', ()=>{
 
    newEnemy.beingAttacked = true;
    newEnemy.isInjured(666);

    expect(newEnemy.tint).toEqual(0xff0000);
    expect(newEnemy.count).toEqual(666);
    
});

test('Testing if isInjured function correctly work (changes tint and count) while not attacked', ()=>{

    newEnemy.count = 100
    newEnemy.beingAttacked = false;

    newEnemy.isInjured(6000);
    expect(newEnemy.tint).toEqual(0xffffff);
    
});

test('Testing if createAttack correctly initialized the  weapons for the enemy',()=>{
    const newScene = new PlayScene();
    newScene.physics.add.group = jest.fn();
    const newEnemy = new Enemy(scene,x,y,key,textureName,target,enemyID,healthPoints,attackRate,ATK,attackRange,movementSpeed,cooldown,uid);
    newEnemy.basicattack = undefined; newEnemy.removeDefense = undefined; //since it gets called in the constructor. Setting it to undefined for this unit test

    newEnemy.createAttack(newScene);
    expect(newScene.physics.add.group).toBeCalledTimes(1);
    expect(newEnemy.basicattack).toBeDefined();
    expect(newEnemy.removeDefense).toBeDefined();
    
});

