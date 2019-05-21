import Phaser from 'phaser';
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import { PlaySceneMultiplayer } from '../PhaserGame/scenes/PlaySceneMultiplayer';
import spriteAnimations from '../PhaserGame/gameObjects/Animations';

jest.mock('../PhaserGame/gameObjects/Animations');
jest.mock('../PhaserGame/scenes/PlayScene');
jest.mock('../PhaserGame/gameObjects/Player');

const scene = new PlaySceneMultiplayer();

test('testing the constructor of the playscene multiplayer',()=>{
    
    expect(scene.updates).toEqual({});
    expect(scene.otherPlayers).toEqual({});
    expect(scene.sceneType).toBe("Multiplayer");
    expect(scene.seatNumber).toBe(-1);
    expect(scene.isCreator).toBe(false);
    expect(scene.GameIsGoing).toBe(false);
    expect(scene.bots).toBe(0);
    expect(scene.databaseListners).toEqual([]);
    expect(scene.otherenemies).toEqual({});
    expect(scene.mybuddies).toEqual({});
    expect(scene.score).toBe(0);
    expect(scene.startingPlayerHealth).toBe(250);
    
});

test('testing the init function of playscene multiplayer',()=>{
    
    let data = {
        playerID: '123',
        roomkey: 'ABC',
        seatNumber: 3,
        chartype: '1',
        numOfPlayers: 4
    };
    scene.init(data);

    expect(scene.playerID).toBe('123');
    expect(scene.gameRoom).toBe('ABC');
    expect(scene.seatNumber).toBe(3);
    expect(scene.spritekey).toBe('1');
    expect(scene.players).toBe(4);
    
});