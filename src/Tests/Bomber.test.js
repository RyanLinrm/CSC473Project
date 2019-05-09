import { Bomber } from "../PhaserGame/gameObjects/Bomber";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import { Posion } from "../PhaserGame/gameObjects/Projectiles";
jest.mock('phaser');
jest.mock('../PhaserGame/gameObjects/Player');
jest.mock('../PhaserGame/gameObjects/Projectiles')

test('Testing Bomber constructor',()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    const bomber = new Bomber(new PlayScene(),300,300, "p1", "p1_01.png",0, hP, movementSpeed,id);

    expect(bomber.healthPoints).toBe(hP);
    expect(bomber.movementSpeed).toBe(movementSpeed);
    expect(bomber.uid).toBe(id);
    expect(bomber.beingAttacked).toBeFalsy();
    expect(bomber.createWeapon).toBeDefined();
    expect(bomber.removeWeapon).toBeDefined();
});

test('Testing createWeapon for Bomber',()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    const newScene = new PlayScene();
    newScene.physics.add.group = jest.fn();
    const bomber = new Bomber(new PlayScene(),300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);
    bomber.attack = undefined; bomber.removeWeapon = undefined;

    bomber.createWeapon(newScene);
    expect(newScene.physics.add.group).toBeCalledTimes(1);
    expect(bomber.attack).toBeDefined();
    expect(bomber.removeWeapon).toBeDefined();
});

test('Testing removeWeapon for Bomber', ()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    let scene = new PlayScene();

    let destroyMock = jest.fn();

    scene.physics.add.group = ()=>{
        return {
            destroy:destroyMock
        };
    }
    
    let bomber = new Bomber(scene,300,300, "p1", "p1_01.png",0,hP, movementSpeed,id);

    bomber.removeWeapon();
    expect(destroyMock).toBeCalledTimes(1);
    expect(bomber.attack).toBe(null);

});