import { PlaySceneMultiplayer } from '../PhaserGame/scenes/PlaySceneMultiplayer';
import * as firebase from 'firebase';

jest.mock('../PhaserGame/gameObjects/Animations');
jest.mock('../PhaserGame/scenes/PlayScene');
jest.mock('../PhaserGame/gameObjects/Player');
jest.mock('../PhaserGame/gameObjects/Rider');

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

  test('testing the enemeyHealthChanged function',()=>{
      let id = 'abc';

      scene.otherPlayers = {};
      scene.otherPlayers[id] = {
          setHealth: jest.fn(),
          setCollideWorldBounds:jest.fn(),
          setVelocity: jest.fn(),
          towerPosition:'position'
      };

      scene.hUD = {
          setPlayerHealth: jest.fn()
      }

      let snapShot = {
        val: jest.fn(() => 500)
    };

    scene.enemeyHealthChanged(id,snapShot);

    expect(snapShot.val).toBeCalledTimes(1);
    expect(scene.otherPlayers[id].setHealth).toBeCalledTimes(1);
    expect(scene.otherPlayers[id].setHealth.mock.calls[0][0]).toBe(500);

    expect(scene.hUD.setPlayerHealth).toBeCalledTimes(1);
    expect(scene.hUD.setPlayerHealth.mock.calls[0][0]).toBe('position');
    expect(scene.hUD.setPlayerHealth.mock.calls[0][1]).toBe(500);

  });

  
//Mocking Firebase for the unit tests in the multiplayer scene
  jest.mock('firebase',()=>{
      let onceMock = jest.fn();
      let onMock = jest.fn();
      let offMock = jest.fn();
      return {
    database: function(){
        return {
            ref:jest.fn(()=>({
                once: onceMock,
                on:onMock,
                off:offMock
            }))
        }
    }
}});

  test('testing the firebase listener creations for the createPlayer funciton',()=>{
      scene.building = {
        assignID: jest.fn()
      };

      scene.enemyPlayers = {
          add:jest.fn()
      }

      scene.physics = {
          add: {
              overlap:jest.fn(),
              collider: jest.fn()
          }
      }

      scene.createPlayer('abc',{x:1,y:2},{x:3,y:4});

      expect(firebase.database().ref().once).toBeCalledTimes(1);
      expect(firebase.database().ref().on).toBeCalledTimes(4);
  });

  test('testing the physics collider creations for the createPlayer function',()=>{
    scene.physics.add.overlap = jest.fn();
    scene.physics.add.collider = jest.fn();
    scene.damageItems = 'damageItems'; scene.bothCollisions = 'bothCollisions';
    
    scene.createPlayer('abc',{x:1,y:2},{x:3,y:4});
    

    expect(scene.physics.add.overlap).toBeCalledTimes(1);

    expect(scene.physics.add.overlap.mock.calls[0][0]).toBe('damageItems');
    expect(scene.physics.add.overlap.mock.calls[0][1]).toBe(scene.otherPlayers['abc']);
    expect(scene.physics.add.overlap.mock.calls[0][2]).toBe('bothCollisions');

    expect(scene.physics.add.collider).toBeCalledTimes(5);
  });

  test('testing the positioning logic of the createPlayer function',()=>{
    scene.building.assignID = jest.fn();
    scene.createPlayer('abc',{x:1,y:2},{x:3,y:4}); 

    expect(scene.otherPlayers['abc'].towerPosition).toBe(4);
    expect(scene.building.assignID).toBeCalledTimes(1);

    scene.pyramid = {assignID : jest.fn()};
    scene.createPlayer('abc',{x:300,y:300},{x:3,y:4}); 

    expect(scene.otherPlayers['abc'].towerPosition).toBe(1);
    expect(scene.pyramid.assignID).toBeCalledTimes(1);

    scene.university = {assignID : jest.fn()};
    scene.createPlayer('abc',{x:1000,y:300},{x:3,y:4}); 

    expect(scene.otherPlayers['abc'].towerPosition).toBe(2);
    expect(scene.university.assignID).toBeCalledTimes(1);

    scene.magicstone = {assignID : jest.fn()};
    scene.createPlayer('abc',{x:300,y:1000},{x:3,y:4}); 

    expect(scene.otherPlayers['abc'].towerPosition).toBe(3);
    expect(scene.magicstone.assignID).toBeCalledTimes(1);
  });

  test('testing the creation of scene.otherPlayer for the createPlayer function',()=>{
    scene.otherPlayers['abc'].setVelocity = jest.fn();
    scene.createPlayer('abc',{x:300,y:1000},{x:300,y:40}); 

    expect(scene.otherPlayers['abc'].user).toBe(false);
    expect(scene.otherPlayers['abc'].setVelocity).toBeCalledTimes(1);

    expect(scene.otherPlayers['abc'].setVelocity.mock.calls[0][0]).toBe(300);
    expect(scene.otherPlayers['abc'].setVelocity.mock.calls[0][1]).toBe(40);
  });

  test('testing the setHealthInDB function',()=>{
      scene.updates = {};
      scene.gameRoom = 'room1';
      scene.playerID = 'abc';
      let healthPath = `Games/room1/Players/abc/health`;

      scene.setHealthInDB(400);
      expect(scene.updates[healthPath]).toBe(400);

      scene.setHealthInDB(0);
      expect(scene.updates[healthPath]).toBe(0);

      scene.setHealthInDB(34);
      expect(scene.updates[healthPath]).toBe(34);
  });

  test('testing the removePlayer function for the PlaySceneMultiplayer',()=>{
      const scene1 = new PlaySceneMultiplayer();
      let killMock = jest.fn();
      scene1.otherPlayers = {
          'abc': {
              kill: killMock
          }
      };

      scene1.removePlayer('abc');

      expect(killMock).toBeCalledTimes(1);
      expect(scene1.otherPlayers).toEqual({});
      let firebaseOffMock = firebase.database().ref().off;

      expect(firebaseOffMock).toBeCalledTimes(3);
  });