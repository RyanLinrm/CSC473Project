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
});