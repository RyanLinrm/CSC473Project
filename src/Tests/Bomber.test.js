import { Bomber } from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';

test('Testing Bomber constructor',()=>{
    const hP = 42; const movementSpeed = 30; const id = "483";
    const bomber = new Bomber(new PlayScene(),300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    expect(bomber.healthPoints).toBe(hP);
    expect(bomber.movementSpeed).toBe(movementSpeed);
    expect(bomber.id).toBe(id);
    expect(bomber.createWeapon).toBeDefined();
    expect(bomber.removeWeapon).toBeDefined();
});