import {Player} from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';



test('Testing the Player constructer correctly intializes player',()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    expect(player.healthPoints).toBe(hP);
    expect(player.movementSpeed).toBe(movementSpeed);
    expect(player.id).toBe(id);
    expect(player.createWeapon).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
    expect(player.specialAttack).toBeDefined();
    expect(player.removeSpecialWeapon).toBeDefined();
});

test('Testing the setVelocity function of the Player Class', ()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",hP, movementSpeed,id);
    player.setVelocity(57,233);
    expect(player.body.nonZeroVelocity).toEqual({x:57,y:233});
    player.setVelocity(-31,233);
    expect(player.nonZeroVelocity).toEqual({x:-31,y:233});
    player.setVelocity(31,-233);
    expect(player.nonZeroVelocity).toEqual({x:31,y:-233});
    player.setVelocity(0,0);
    expect(player.nonZeroVelocity).toEqual({x:31,y:-233});

});



