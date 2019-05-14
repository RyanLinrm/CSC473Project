import { Rider } from "../PhaserGame/gameObjects/Rider";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import { Posion } from "../PhaserGame/gameObjects/Projectiles";
jest.mock('phaser');
jest.mock('../PhaserGame/gameObjects/Player');
jest.mock('../PhaserGame/gameObjects/Projectiles');


const hP = 78; const movementSpeed = 51; const id = "c3f";
let scene = new PlayScene();
const rider = new Rider(scene,300,300, "rider", "rider_01.png",1,hP, movementSpeed,id);

test('Testing Rider constructor',()=>{

    expect(rider.healthPoints).toBe(hP);
    expect(rider.movementSpeed).toBe(movementSpeed);
    expect(rider.uid).toBe(id);
    expect(rider.beingAttacked).toBeFalsy();
  //  expect(bomber.createWeapon).toBeDefined();
  //  expect(bomber.removeWeapon).toBeDefined();
});
/*
test('Testing createWeapon for Rider',()=>{
    scene.physics.add.group = jest.fn();
    const rider = new Rider(new PlayScene(),300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);
    rider.attack = undefined; rider.removeWeapon = undefined;

    rider.createWeapon(scene);
    expect(scene.physics.add.group).toBeCalledTimes(1);
    expect(rider.attack).toBeDefined();
    expect(rider.removeWeapon).toBeDefined();
});

test('Testing removeWeapon for Rider', ()=>{
    let destroyMock = jest.fn();

    scene.physics.add.group = ()=>{
        return {
            destroy:destroyMock
        };
    }
    
    let rider = new Rider(scene,300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);

    rider.removeWeapon();
    expect(destroyMock).toBeCalledTimes(1);
    expect(rider.attack).toBe(null);
});
*/
test('Testing the update function for Rider',()=>{
    const rider = new Rider(new PlayScene(),300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);
    rider.isInjured = jest.fn();
    rider.player_movement = jest.fn();

    rider.update(1000);
    expect(rider.isInjured).toBeCalledTimes(1);
    expect(rider.player_movement).toBeCalledTimes(1);
    expect(rider.isInjured.mock.calls[0][0]).toBe(1000);
    expect(rider.beingAttacked).toEqual(false);
});