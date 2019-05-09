import {Units} from "../PhaserGame/gameObjects/Units";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import { Player } from "../PhaserGame/gameObjects/Player";
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
const player = new Player(scene,300,300, "p1", "p1_01.png",100, 64,'233');
const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
test('Testing Units class constructer correctly and intializes a new Units tower', ()=>{
 
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
    expect(tower).toBeDefined();
    expect(tower.type).toBe(type);
    expect(tower.healthPoints).toBe(healthPoints);
    expect(tower.speed).toBe(speed);
    expect(tower.range).toBe(range);
    expect(tower.cooldown).toBe(cooldown);
    expect(tower.uid).toBeDefined();
    expect(tower.createDefense).toBeDefined();
    expect(tower.removeDefense).toBeDefined();
    expect(tower.beingAttacked).toBeDefined();
    
    
});

test('Testing the changetarget function in Units class', ()=>{

    const newtarget =tower;
    tower.target=player;
    //test wheather the current target is player 
    expect(tower.target).toBe(player);
    
    tower.changetarget(newtarget);
    let correctTarget=tower;
    //test wheather the target is changed to tower
    expect(tower.target).toBe(correctTarget);
});

test('Testing the assignID function in Units class', ()=>{

    const newid ="123";
    
    tower.assignID(newid);
    let correctID="123";
    //test wheather the new id is assigned to tower
    expect(tower.uid).toBe(correctID);
});

test('Testing the distance function in Units class', ()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),0,0, "p1", "p1_01.png",1,hP, movementSpeed,id);
    const tower = new Units(new PlayScene(),0,0,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
    tower.distance=jest.fn();
    let shortestpath=tower.distance(tower,player);
    expect(tower.distance).toBeCalledTimes(1);
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
    tower.defend = undefined; tower.removeDefense = undefined; //since it gets called in the constructor. Setting it to undefined for this unit test

    tower.createDefense(newScene);
    expect(newScene.physics.add.group).toBeCalledTimes(1);
    expect(tower.defend).toBeDefined();
    expect(tower.removeDefense).toBeDefined();
    
});

test('Testing the removeDefense function in units class', ()=>{
    let scene = new PlayScene();

    let destroyMock = jest.fn();

    scene.physics.add.group = ()=>{
        return {
            destroy:destroyMock
        };
    }
    
    let tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);


    tower.removeDefense();
    expect(destroyMock).toBeCalledTimes(1);
    expect(tower.defend).toBe(null);

})
/*
test('Testing the defend function in units class', ()=>{
    let scene = new PlayScene();

    scene.towerShooting = {
        add: jest.fn()
    };
    let shootMock = jest.fn();
    let setTextureMock =jest.fn();
    let setPositionMock= jest.fn();
    let setScaleMock= jest.fn();
    scene.physics.add.group = ()=>{
        return {
            get:() => ({shoot:shootMock,
                        setPosition:setPositionMock,
                        setScale:setScaleMock,
                        setTexture:setTextureMock})
            
        };
    }
    let tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);

    tower.defend();
    expect(scene.towerShooting.add).toBeCalledTimes(1);
    expect(shootMock).toBeCalledTimes(1);

})*/

test('Testing the update function of the Units class',()=>{
    const tower = new Units(scene,x,y,barx,bary,name,type,healthPoints,speed,range,cooldown,uid);
    tower.isInjured = jest.fn();
    tower.towerAttack=jest.fn();

    tower.update(1000);
    expect(tower.isInjured).toBeCalledTimes(1);
    expect(tower.isInjured.mock.calls[0][0]).toBe(1000);
    expect(tower.beingAttacked).toEqual(false);
});

