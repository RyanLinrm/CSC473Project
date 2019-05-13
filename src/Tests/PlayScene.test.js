import Phaser from 'phaser';
import { PlayScene } from '../PhaserGame/scenes/PlayScene';

import spriteAnimations from '../PhaserGame/gameObjects/Animations';

jest.mock('../PhaserGame/gameObjects/Animations');
jest.mock('../PhaserGame/gameObjects/Player');

test('testing the constructor of the playscene',()=>{
    const scene = new PlayScene();

    expect(scene.sceneType).toBe("Single");
    expect(scene.seatNumber).toBe(1);
    expect(scene.single).toBe(true);
    expect(scene.startingPlayerHealth).toBe(500);
    expect(scene.mode).toBe("single");
});

test('testing the preload method of the playscene',()=>{
    const scene = new PlayScene();

    scene.load = {
        image: jest.fn(),
        tilemapTiledJSON: jest.fn()
    }
    
    scene.preload();

    expect(spriteAnimations).toBeCalledTimes(1);
    expect(scene.load.image).toBeCalledTimes(2);
    expect(scene.load.tilemapTiledJSON).toBeCalledTimes(1);

    expect(spriteAnimations.mock.calls[0][0]).toBe(scene);

    expect(scene.load.image.mock.calls[0][0]).toBe("tiles1");
    expect(scene.load.image.mock.calls[0][1]).toBe(`${process.env.PUBLIC_URL}/assets/tiles/map_atlas.png`);

    expect(scene.load.image.mock.calls[1][0]).toBe("tiles2");
    expect(scene.load.image.mock.calls[1][1]).toBe(`${process.env.PUBLIC_URL}/assets/tiles/map_atlas2.png`);

    expect(scene.load.tilemapTiledJSON.mock.calls[0][0]).toBe("Mymap");
    expect(scene.load.tilemapTiledJSON.mock.calls[0][1]).toBe(`${process.env.PUBLIC_URL}/assets/map/map.json`);

});

test('testing the init method of the playscene',()=>{
    const scene = new PlayScene();
    const data = "data";
    scene.load = {
        image: jest.fn(),
        tilemapTiledJSON: jest.fn() 
    }
    
    scene.init(data);

    expect(scene.spritekey).toBe(data);
    expect(scene.players).toBe(1);

});

test('testing that the create method in playscene correctly creates all the inital player groups',()=>{
    const scene = new PlayScene();
    const uid = "uid"; const multi = "neither";

    scene.create(uid,multi);

    expect(scene.add.group).toBeCalledTimes(9);
  
});