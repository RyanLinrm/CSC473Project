import { Rider } from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';

test('Testing Bomber constructor',()=>{
    const hP = 78; const movementSpeed = 51; const id = "c3f";
    const player = new Rider(new PlayScene(),300,300, "rider", "rider_01.png",hP, movementSpeed,id);

    expect(player.healthPoints).toBe(hP);
    expect(player.movementSpeed).toBe(movementSpeed);
    expect(player.id).toBe(id);
    expect(player.createWeapon).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
});