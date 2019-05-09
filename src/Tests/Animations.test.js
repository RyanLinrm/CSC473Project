import spriteAnimations from '../PhaserGame/gameObjects/Animations';
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import {Player} from "../PhaserGame/gameObjects/Player";
jest.mock('phaser');

let scene = new PlayScene();
let player = new Player(scene,1,1, "p1", "p1_01.png",0,500,64);

//some testing animation config value
const key = "player_walking_down"
const framerate = 8;
const spritename = 'player'
const frameConfig = {
    start:0, end:2, zeroPad:1,
    prefix:'player_', suffix: '.png'
}

test('Testing animation generated correctly with animation config object',()=>{
    spriteAnimations(scene);
    let newAnimation = scene.anims.create({
        key: key,
        frameRate: framerate,
        frames: scene.anims.generateFrameNames( spritename, frameConfig)
    });

    expect(newAnimation.key).toBe("player_walking_down");
    expect(newAnimation.frameRate).toBe(8);
    expect(newAnimation.frames).toBe(frameConfig);

});

test('Testing animation plays correctly', ()=> {
    let walkingAnimation = scene.anims.create({
        key: key,
        frameRate: framerate,
        frames: scene.anims.generateFrameNames( spritename, frameConfig)
    });

    player.setVelocityX(120);

    expect(player.play('player_walking_down')).toBe(key);
})