import {Player} from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';



test('Testing the Player constructer correctly intializes player',()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);

    expect(player.healthPoints).toBe(hP);
    expect(player.movementSpeed).toBe(movementSpeed);
    expect(player.uid).toBe(id);
    expect(player.characterId).toBe(1);
    expect(player.createWeapon).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
    expect(player.specialAttack).toBeDefined();
    expect(player.removeSpecialWeapon).toBeDefined();
});

test('Testing the setVelocity function for nonZero values of x and y', ()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    
    player.setNonZeroVelocity(57,233);
    expect(player.nonZeroVelocity).toEqual({x:57,y:233});
    player.setNonZeroVelocity(-31,233);
    expect(player.nonZeroVelocity).toEqual({x:-31,y:233});
    player.setNonZeroVelocity(31,-233);
    expect(player.nonZeroVelocity).toEqual({x:31,y:-233});
    player.setNonZeroVelocity(0,0);
    expect(player.nonZeroVelocity).toEqual({x:31,y:-233});

});

test('Testing the setVelocity function for zero values of x and y', ()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    
    player.setNonZeroVelocity(57,233);
    expect(player.nonZeroVelocity).toEqual({x:57,y:233});
    player.setNonZeroVelocity(0,0);
    expect(player.nonZeroVelocity).toEqual({x:57,y:233});
    player.setNonZeroVelocity(0,500);
    expect(player.nonZeroVelocity).toEqual({x:0,y:500});
    player.setNonZeroVelocity(500,0);
    expect(player.nonZeroVelocity).toEqual({x:500,y:0});
    player.setNonZeroVelocity(0,0);
    expect(player.nonZeroVelocity).toEqual({x:500,y:0});

});

test('Testing if takeDamage correctly decrease the damage', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    
    player.takeDamage(20);
    expect(player.healthPoints).toEqual(80);
    player.takeDamage(10);
    expect(player.healthPoints).toEqual(70);
    player.takeDamage(1);
    expect(player.healthPoints).toEqual(69);
    player.takeDamage(5);
    expect(player.healthPoints).toEqual(64);
    player.takeDamage(0);
    expect(player.healthPoints).toEqual(64);
 

});

test('Testing if takeDamage calls kill when damage is less than 0', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.kill = jest.fn();
    player.takeDamage(105);
    expect(player.healthPoints).toEqual(-5);
    expect(player.kill).toBeCalledTimes(1);

});

test('Testing if collision funciton correctly works', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);

    player.takeDamage = jest.fn();
    player.collision();

    expect(player.beingAttacked).toEqual(true);
    expect(player.canbeAttacked).toEqual(false);
    expect(player.takeDamage).toBeCalledTimes(1);

});

test('Testing if isInjured function correctly work (changes tint and count) while being attacked', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);

    player.beingAttacked = true;
    player.isInjured(560);

    expect(player.tint).toEqual(0xff0000);
    expect(player.count).toEqual(560);
    
});

test('Testing if isInjured function correctly work (changes tint and count) while not attacked', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.count = 100
    //time > this.count + 500
    player.beingAttacked = false;

    player.isInjured(6000);
    expect(player.tint).toEqual(0xffffff);
    expect(player.canbeAttacked).toEqual(true);
    
});






