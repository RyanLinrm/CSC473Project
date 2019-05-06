import {Units} from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import { Player } from "../PhaserGame/gameObjects/StatusBar";
const scene=new PlayScene();
const x=0;
const y=0;
const barx=0;
const bary=0;
const name="tower";
const type=1;
const healthPoints=100;
const speed=1;
const range=180;
const cooldown=100;
const uid="233";

const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
test('Testing Units class constructer correctly and intializes a new Units tower', ()=>{

    expect(tower).toBeDefined();
    expect(tower.x).toBe(x);
    expect(tower.y).toBe(y);
    expect(tower.barx).toBe(barx);
    expect(tower.bary).toBe(bary);
    expect(tower.name).toBe("tower");
    expect(tower.type).toBe(type);
    expect(tower.healthPoints).toBe(healthPoints);
    expect(tower.speed).toBe(speed);
    expect(tower.range).toBe(range);
    expect(tower.cooldown).toBe(cooldown);
    expect(tower.uid).toBe("233");
    expect(tower.createDefense).toBeDefined();
    expect(tower.removeDefense).toBeDefined();
    expect(tower.beingAttacked).toBeDefined();
    
    
});

test('Testing the changetarget function in Units class', ()=>{

    const newtarget =tower;

    //test wheather the current target is player 
    expect(tower.target).toBe(player);

    tower.changetarget(newtarget);
    let correctTarget=tower;
    //test wheather the target is changed to tower
    expect(tower.target).toBe(correctTarget);
});

test('Testing the distance function in Units class', ()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),0,0, "p1", "p1_01.png",1,hP, movementSpeed,id);
 
    shortestpath=tower.distance(tower,player);
    expect(shortestpath).toBe(0);
});

test('Testing if takeDamage correctly decrease the damage in Units class', ()=>{
   
    
    tower.takeDamage(20);
    expect(tower.healthPoints).toEqual(80);
    tower.takeDamage(10);
    expect(tower.healthPoints).toEqual(70);
    tower.takeDamage(1);
    expect(tower.healthPoints).toEqual(69);
    tower.takeDamage(5);
    expect(tower.healthPoints).toEqual(64);
    tower.takeDamage(0);
    expect(tower.healthPoints).toEqual(64);
 

});

test('Testing if takeDamage calls kill when Tower hp is less than 0', ()=>{
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
    tower.kill = jest.fn();
    tower.takeDamage(105);
    expect(tower.healthPoints).toEqual(-5);
    expect(tower.kill).toBeCalledTimes(1);

});

test('Testing if collision funciton correctly works in Units class', ()=>{
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);

    tower.takeDamage = jest.fn();
    tower.collision();

    expect(tower.beingAttacked).toEqual(true);
    expect(tower.takeDamage).toBeCalledTimes(1);

});

test('Testing in Units class, if isInjured function correctly work (changes tint and count) while being attacked', ()=>{
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);

    tower.beingAttacked = true;
    tower.isInjured(560);

    expect(tower.tint).toEqual(0xff0000);
    expect(tower.count).toEqual(560);
    
});

test('Testing in Units class, if isInjured function correctly work (changes tint and count) while not attacked', ()=>{
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
    tower.count = 100
    tower.beingAttacked = false;

    tower.isInjured(6000);
    expect(tower.tint).toEqual(0xffffff);
    
});

test('Testing if createDefense correctly initialized the  weapons for the tower',()=>{
    const newScene = new PlayScene();
    newScene.physics.add.group = jest.fn();
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
    tower.attack = undefined; tower.removeWeapon = undefined; //since it gets called in the constructor. Setting it to undefined for this unit test

    player.createDefense(newScene);
    expect(newScene.physics.add.group).toBeCalledTimes(1);
    expect(tower.attack).toBeDefined();
    expect(tower.removeWeapon).toBeDefined();
    
});

test('Testing the update function of the Units class',()=>{
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
    tower.isInjured = jest.fn();

    tower.update(1000);
    expect(tower.isInjured).toBeCalledTimes(1);
    expect(tower.isInjured.mock.calls[0][0]).toBe(1000);
    expect(tower.beingAttacked).toEqual(false);
});

