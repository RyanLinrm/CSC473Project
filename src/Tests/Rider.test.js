import { Rider } from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';

test('Testing Rider constructor',()=>{
    const hP = 78; const movementSpeed = 51; const id = "c3f";
    const rider = new Rider(new PlayScene(),300,300, "rider", "rider_01.png",hP, movementSpeed,id);

    expect(rider.healthPoints).toBe(hP);
    expect(rider.movementSpeed).toBe(movementSpeed);
    expect(rider.id).toBe(id);
    expect(rider.createWeapon).toBeDefined();
    expect(rider.removeWeapon).toBeDefined();
});