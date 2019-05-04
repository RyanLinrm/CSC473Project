import PlayerScene, { PlayScene } from '../PhaserGame/scenes/PlayScene';
import Phaser from 'phaser';
import {Enemy} from "../gameObjects/Enemy";
jest.mock('phaser');
jest.mock('../PhaserGame/scenes/PlayScene');

const x=100;
const y=100;
const textureName="wolf";
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

test('Testing enemy class constructer correctly and intializes a new enemy wolf', ()=>{

    expect(newEnemy).toBeDefined();
    expect(newEnemy.x).toBe(x);
    expect(newEnemy.y).toBe(y);
    expect(newEnemy.textureName).toBe("wolf");
    expect(newEnemy.target).toBe(player);
    expect(newEnemy.enemyID).toBe(enemyID);
    expect(newEnemy.healthPoints).toBe(healthPoints);
    expect(newEnemy.attackRate).toBe(attackRate);
    expect(newEnemy.ATK).toBe(ATK);
    expect(newEnemy.attackRange).toBe(attackRange);
    expect(newEnemy.movementSpeed).toBe(movementSpeed);
    expect(newEnemy.cooldown).toBe(cooldown);
    expect(newEnemy.uid).toBe("233");

});


test('Testing the changetarget function in enemy class', ()=>{

    const newtarget =tower;

    //test wheather the current target is player 
    expect(newEnemy.target).toBe(player);

    newEnemy.changetarget(newtarget);
    newEnemy.target=newtarget;
    //test wheather the target is changed to tower
    expect(newEnemy.target).toBe(tower);
});



