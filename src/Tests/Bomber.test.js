import { Bomber } from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';

test('Testing Bomber constructor',()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    expect(player.healthPoints).toBe(hP);
    expect(player.movementSpeed).toBe(movementSpeed);
    expect(player.id).toBe(id);
    expect(player.createWeapon).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
});