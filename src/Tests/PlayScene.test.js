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

//For the create method tests
const scene = new PlayScene();
const uid = "uid"; const multi = "neither";
scene.startingPosFromTowerNum = jest.fn();
scene.create(uid,multi);

test('testing that the create method in playscene correctly creates all the inital player groups',()=>{


    expect(scene.add.group).toBeCalledTimes(9);

    expect(scene.updateSprite).toBeDefined();
    
    expect(scene.add.group.mock.calls[0][0].runChildUpdate).toBe(true);
    expect(scene.add.group.mock.calls[1][0].runChildUpdate).toBe(true);
  
});

test('testing that the create method in playscene correctly creates and intializes the physics groups with each other',()=>{

    expect(scene.bothCollisions).toBeDefined();

    expect(scene.physics.add.overlap).toBeCalledTimes(6);

    expect(scene.physics.add.overlap.mock.calls[0][0]).toBe(scene.damageItems);
    expect(scene.physics.add.overlap.mock.calls[0][1]).toBe(scene.enemyTowers);

    expect(scene.physics.add.overlap.mock.calls[1][0]).toBe(scene.damageItems);
    expect(scene.physics.add.overlap.mock.calls[1][1]).toBe(scene.enemies);

    expect(scene.physics.add.overlap.mock.calls[2][0]).toBe(scene.enemiesAttacks);
    expect(scene.physics.add.overlap.mock.calls[2][1]).toBe(scene.enemyPlayers);

    expect(scene.physics.add.overlap.mock.calls[3][0]).toBe(scene.towerShooting);
    expect(scene.physics.add.overlap.mock.calls[3][1]).toBe(scene.enemyPlayers);

    expect(scene.physics.add.overlap.mock.calls[4][0]).toBe(scene.enemiesAttacks);
    expect(scene.physics.add.overlap.mock.calls[4][1]).toBe(scene.enemyTowers);

    expect(scene.physics.add.overlap.mock.calls[5][0]).toBe(scene.towerShooting);
    expect(scene.physics.add.overlap.mock.calls[5][1]).toBe(scene.enemies);

    for(let i = 0; i < 6;i++){
        expect(scene.physics.add.overlap.mock.calls[i][2]).toBe(scene.bothCollisions);
    }
  
});

test('testing the towerremoved function of the playscene when there is 1 tower left and your game is going',()=>{
    let tower = {
        uid: 1,
    };
    scene.towers.getLength = jest.fn(() => 1); //the amount of towers in the group
    scene.towerDestroyed = jest.fn();
    scene.wonGame = jest.fn();
    scene.GameIsGoing = true;

    scene.towerRemoved(tower);
    
    expect(scene.wonGame).toBeCalledTimes(1);
  
});

let tower = {
    uid: 1,
};

test('testing the towerremoved function when the tower removed is the players tower',()=>{

    scene.towerDestroyed = jest.fn();
    scene.playerUid = 1

    scene.towerRemoved(tower);
    
    expect(scene.towerDestroyed).toBeCalledTimes(1);
  
});

test('testing the towerremoved function when a tower is removed and there are multiple towers left',()=>{

    scene.playerUid = 2;
    scene.towerDestroyed = jest.fn();
    scene.wonGame = jest.fn();

    scene.towerRemoved(tower);
    
    expect(scene.towerDestroyed).toBeCalledTimes(0);
    expect(scene.towerDestroyed).toBeCalledTimes(0);
  
});

