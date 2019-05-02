import { Melee } from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';

test('Testing Melee constructor',()=>{
    const hP = 32; const movementSpeed = 40; const id = "9oo";
    const player = new Melee(new PlayScene(),300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    expect(player.healthPoints).toBe(hP);
    expect(player.movementSpeed).toBe(movementSpeed);
    expect(player.id).toBe(id);
    expect(player.createWeapon).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
});