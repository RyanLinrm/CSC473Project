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

test('testing the setTemp funciton for playScene Multiplayer',()=>{
    let snapshot = {
        val: jest.fn(() => 'a')
    };

    scene.setTemp(snapshot);

    expect(snapshot.val).toBeCalledTimes(1);
    expect(scene.temp).toBe('a');

    snapshot.val = jest.fn(()=>'b');

    scene.setTemp(snapshot);

    expect(snapshot.val).toBeCalledTimes(1);
    expect(scene.temp).toBe('b');

});

test('testing the enemyMovementDataChanged function when the snapshot key is "pos"',()=>{
    //mocking and setting up the default values to when the funciton will be called
    let id = 'abc';
    scene.otherPlayers = {};
    scene.otherPlayers[id] = {
        setPosition: jest.fn(),
        setVelocity: jest.fn()
    };
    //

    let snapShot = {
        key: 'pos',
        val: jest.fn(()=>({x:1,y:2}))
    };

    scene.enemyMovementDataChanged(id,snapShot);

    expect(snapShot.val).toBeCalledTimes(1);
    expect(scene.otherPlayers[id].setPosition).toBeCalledTimes(1);
    expect(scene.otherPlayers[id].setPosition.mock.calls[0][0]).toBe(1);
    expect(scene.otherPlayers[id].setPosition.mock.calls[0][1]).toBe(2);
    
 


});

test('testing the enemyMovementDataChanged function when the snapshot key is not "pos"', ()=>{
   //testing when the snapShot key isn't pos
   let id = 'abc';
   scene.otherPlayers = {};
   scene.otherPlayers[id] = {
       setPosition: jest.fn(),
       setVelocity: jest.fn()
   };
   //

   let snapShot = {
       key: 'velocity',
       val: jest.fn(()=>({x:3,y:4}))
   };

   scene.enemyMovementDataChanged(id,snapShot);

   expect(snapShot.val).toBeCalledTimes(1);
   expect(scene.otherPlayers[id].setVelocity).toBeCalledTimes(1);
   expect(scene.otherPlayers[id].setVelocity.mock.calls[0][0]).toBe(3);
   expect(scene.otherPlayers[id].setVelocity.mock.calls[0][1]).toBe(4);
});

test('testing the enemyAttackDataChanged function when the snapshot key is pos',()=>{
  //testing when the snapShot key is pos
   let id = 'abc';
   scene.otherPlayers = {};
   scene.otherPlayers[id] = {
       setPosition: jest.fn(),
       setVelocity: jest.fn(),
       attack: jest.fn()
   };

   let snapShot = {
       key: 'pos',
       val: jest.fn(()=>({x:3,y:4}))
   };
  //

   scene.enemyAttackDataChanged(id,snapShot);
   expect(snapShot.val).toBeCalledTimes(1);
   expect(scene.otherPlayers[id].setPosition).toBeCalledTimes(1);
   expect(scene.otherPlayers[id].setPosition.mock.calls[0][0]).toBe(3);
   expect(scene.otherPlayers[id].setPosition.mock.calls[0][1]).toBe(4);


});

test('testing the enemyAttackDataChanged function when the snapshot key is velcoity',()=>{
    //testing when the snapShot key isn't pos
     let id = 'abc';
     scene.otherPlayers = {};
     scene.otherPlayers[id] = {
         setPosition: jest.fn(),
         setVelocity: jest.fn(),
         attack: jest.fn()
     };
  
     let snapShot = {
         key: 'velocity',
         val: jest.fn(()=>({x:1,y:3}))
     };
    //
  
     scene.enemyAttackDataChanged(id,snapShot);
     expect(snapShot.val).toBeCalledTimes(1);
     expect(scene.otherPlayers[id].setVelocity).toBeCalledTimes(1);
     expect(scene.otherPlayers[id].setVelocity.mock.calls[0][0]).toBe(1);
     expect(scene.otherPlayers[id].setVelocity.mock.calls[0][1]).toBe(3);
  
  
  });

  test('testing the enemyAttackDataChanged function when the snapshot key isnt pos or velocity which means attack',()=>{
      let id = 'abc';

      scene.otherPlayers = {};
      scene.otherPlayers[id] = {
        attack: jest.fn()
    };

    let snapShot = {
        key: 'attack',
        val: jest.fn()
    };

    scene.enemyAttackDataChanged(id,snapShot);
    expect(snapShot.val).toBeCalledTimes(1);
    expect(scene.otherPlayers[id].attack).toBeCalledTimes(1);


  });

  test('testing the enemyCheckIfInGame function',()=>{
    let id = 'abc';  
    //value is false
    let snapShot = {
        val: jest.fn(()=>false)
    };
    scene.removePlayer = jest.fn();

    scene.enemyCheckIfInGame(id,snapShot);
    expect(snapShot.val).toBeCalledTimes(1);
    expect(scene.removePlayer).toBeCalledTimes(1);
    expect(scene.removePlayer.mock.calls[0][0]).toBe(id);

     snapShot = {
        val: jest.fn(()=>true)
    };

    scene.enemyCheckIfInGame(id,snapShot);
    expect(snapShot.val).toBeCalledTimes(1);
    expect(scene.removePlayer).toBeCalledTimes(1);

  });