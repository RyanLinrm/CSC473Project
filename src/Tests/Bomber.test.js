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
});