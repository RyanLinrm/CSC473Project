import { Rider } from "../PhaserGame/gameObjects/Rider";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
jest.mock('phaser');
jest.mock('../PhaserGame/gameObjects/Player')

const hP = 78; const movementSpeed = 51; const id = "c3f";
let scene = new PlayScene();
const rider = new Rider(scene,300,300, "rider", "rider_01.png",1,hP, movementSpeed,id);

test('Testing Rider constructor',()=>{

    expect(rider.healthPoints).toBe(hP);
    expect(rider.movementSpeed).toBe(movementSpeed);
    expect(rider.uid).toBe(id);
    expect(rider.beingAttacked).toBeFalsy();
});
