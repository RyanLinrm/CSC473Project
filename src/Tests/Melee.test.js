import { Melee } from "../PhaserGame/gameObjects/Melee";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
jest.mock('phaser');
jest.mock('../PhaserGame/gameObjects/Player')

test('Testing Melee constructor',()=>{
    const hP = 32; const movementSpeed = 40; const id = "9oo";
    const player = new Melee(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);

    expect(player.healthPoints).toBe(hP);
    expect(player.movementSpeed).toBe(movementSpeed);
    expect(player.uid).toBe(id);
    expect(player.beingAttacked).toBeFalsy();
    expect(player.beingAttacked).toBeFalsy();
    expect(player.createWeapon).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
});

test('Testing createWeapon for Melee',()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    const newScene = new PlayScene();
    newScene.physics.add.group = jest.fn();
    const player = new Melee(new PlayScene(),300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);
    player.attack = undefined; player.removeWeapon = undefined;

    player.createWeapon(newScene);
    expect(newScene.physics.add.group).toBeCalledTimes(1);
    expect(player.attack).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
});

test('Testing removeWeapon for Melee', ()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    let scene = new PlayScene();

    let destroyMock = jest.fn();

    scene.physics.add.group = ()=>{
        return {
            destroy:destroyMock
        };
    }
    
    let player = new Melee(scene,300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);

    player.removeWeapon();
    expect(destroyMock).toBeCalledTimes(1);
    expect(player.attack).toBe(null);

});

test('Testing the update function for Melee',()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    const player = new Melee(new PlayScene(),300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);
    player.isInjured = jest.fn();
    player.player_movement = jest.fn();

    player.update(1000);
    expect(player.isInjured).toBeCalledTimes(1);
    expect(player.player_movement).toBeCalledTimes(1);
    expect(player.isInjured.mock.calls[0][0]).toBe(1000);
    expect(player.beingAttacked).toEqual(false);
});