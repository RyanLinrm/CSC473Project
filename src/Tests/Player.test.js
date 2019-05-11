import {Player} from "../PhaserGame/gameObjects/Player";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';



test('Testing the Player constructer correctly intializes player',()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);

    expect(player.healthPoints).toBe(hP);
    expect(player.movementSpeed).toBe(movementSpeed);
    expect(player.uid).toBe(id);
    expect(player.characterId).toBe(1);
    expect(player.createWeapon).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
    expect(player.specialAttack).toBeDefined();
    expect(player.removeSpecialWeapon).toBeDefined();
});

test('Testing the setVelocity function for nonZero values of x and y', ()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    
    player.setNonZeroVelocity(57,233);
    expect(player.nonZeroVelocity).toEqual({x:57,y:233});
    player.setNonZeroVelocity(-31,233);
    expect(player.nonZeroVelocity).toEqual({x:-31,y:233});
    player.setNonZeroVelocity(31,-233);
    expect(player.nonZeroVelocity).toEqual({x:31,y:-233});
    player.setNonZeroVelocity(0,0);
    expect(player.nonZeroVelocity).toEqual({x:31,y:-233});

});

test('Testing the setVelocity function for zero values of x and y', ()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    
    player.setNonZeroVelocity(57,233);
    expect(player.nonZeroVelocity).toEqual({x:57,y:233});
    player.setNonZeroVelocity(0,0);
    expect(player.nonZeroVelocity).toEqual({x:57,y:233});
    player.setNonZeroVelocity(0,500);
    expect(player.nonZeroVelocity).toEqual({x:0,y:500});
    player.setNonZeroVelocity(500,0);
    expect(player.nonZeroVelocity).toEqual({x:500,y:0});
    player.setNonZeroVelocity(0,0);
    expect(player.nonZeroVelocity).toEqual({x:500,y:0});

});

test('Testing if takeDamage correctly decrease the damage', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    
    player.takeDamage(20);
    expect(player.healthPoints).toEqual(80);
    player.takeDamage(10);
    expect(player.healthPoints).toEqual(70);
    player.takeDamage(1);
    expect(player.healthPoints).toEqual(69);
    player.takeDamage(5);
    expect(player.healthPoints).toEqual(64);
    player.takeDamage(0);
    expect(player.healthPoints).toEqual(64);
 

});

test('Testing if takeDamage calls kill when damage is less than 0', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.kill = jest.fn();
    player.takeDamage(105);
    expect(player.healthPoints).toEqual(-5);
    expect(player.kill).toBeCalledTimes(1);

});

test('Testing if takeDamage calls setHealthInDatabase when mode of the scene is multi', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";

    let scene = new PlayScene();
    scene.mode = 'multi';
    scene.setHealthInDB = jest.fn();

    const player = new Player(scene,300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.kill = jest.fn();
    player.takeDamage(105);

    expect(scene.setHealthInDB).toBeCalledTimes(1);

});

test('Testing if takeDamage doesnt call setHealthInDatabase when mode of the scene is single', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";

    let scene = new PlayScene();
    scene.setHealthInDB = jest.fn();

    const player = new Player(scene,300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.kill = jest.fn();
    player.takeDamage(105);

    expect(scene.setHealthInDB).toBeCalledTimes(0);

});

test('Testing if collision funciton correctly works', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);

    player.takeDamage = jest.fn();
    player.collision();

    expect(player.beingAttacked).toEqual(true);
    expect(player.canbeAttacked).toEqual(false);
    expect(player.takeDamage).toBeCalledTimes(1);

});

test('Testing if collision funciton correctly works when the player isnt the user', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.user = false;
    player.takeDamage = jest.fn();
    player.collision();

    expect(player.beingAttacked).toEqual(true);
    expect(player.canbeAttacked).toEqual(false);
    expect(player.takeDamage).toBeCalledTimes(0);

});

test('Testing if isInjured function correctly work (changes tint and count) while being attacked', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    let scene = new PlayScene();
    scene.mode = 'single';
    const player = new Player(scene,300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);

    player.beingAttacked = true;
    player.isInjured(560);

    expect(player.tint).toEqual(0xff0000);
    expect(player.count).toEqual(560);
    
});

test('Testing if isInjured function correctly work (changes tint and count) while not attacked', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.count = 100
    //time > this.count + 500
    player.beingAttacked = false;

    player.isInjured(6000);
    expect(player.tint).toEqual(0xffffff);
    expect(player.canbeAttacked).toEqual(true);
    
});

test('Testing if player_movement works when the characterID is 0', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.characterId = 0;
    player.play = jest.fn();
   
    //velocity.x > 0
    player.body.velocity.x = 10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(1);
    expect(player.play.mock.calls[0][0]).toBe("p1_right");
    expect(player.play.mock.calls[0][1]).toBe(true);

    //velocity.x < 0
    player.body.velocity.x = -10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(2);
    expect(player.play.mock.calls[1][0]).toBe("p1_left");
    expect(player.play.mock.calls[1][1]).toBe(true);

    //velocity.y > 0
    player.body.velocity.x = 0;
    player.body.velocity.y = 10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(3);
    expect(player.play.mock.calls[2][0]).toBe("p1_down");
    expect(player.play.mock.calls[2][1]).toBe(true);

    //velocity.y < 0
    player.body.velocity.y = -10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(4);
    expect(player.play.mock.calls[3][0]).toBe("p1_up");
    expect(player.play.mock.calls[3][1]).toBe(true);
});

test('Testing if player_movement works when the characterID is 1', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.characterId = 1;
    player.play = jest.fn();

    //velocity.x > 0
    player.body.velocity.x = 10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(1);
    expect(player.play.mock.calls[0][0]).toBe("rider_right");
    expect(player.play.mock.calls[0][1]).toBe(true);

    //velocity.x < 0
    player.body.velocity.x = -10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(2);
    expect(player.play.mock.calls[1][0]).toBe("rider_left");
    expect(player.play.mock.calls[1][1]).toBe(true);

    //velocity.y > 0
    player.body.velocity.x = 0;
    player.body.velocity.y = 10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(3);
    expect(player.play.mock.calls[2][0]).toBe("rider_down");
    expect(player.play.mock.calls[2][1]).toBe(true);

    //velocity.y < 0
    player.body.velocity.y = -10;
    player.player_movement();
    expect(player.play).toBeCalledTimes(4);
    expect(player.play.mock.calls[3][0]).toBe("rider_up");
    expect(player.play.mock.calls[3][1]).toBe(true);
});

test('Testing if createweapon correctly initialized the  weapons for the player',()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const newScene = new PlayScene();
    newScene.physics.add.group = jest.fn();
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.attack = undefined; player.removeWeapon = undefined; //since it gets called in the constructor. Setting it to undefined for this unit test

    player.createWeapon(newScene);
    expect(newScene.physics.add.group).toBeCalledTimes(1);
    expect(player.attack).toBeDefined();
    expect(player.removeWeapon).toBeDefined();
    
});

test('Testing the update function of the player',()=>{
    const hP = 53; const movementSpeed = 42; const id = "abc";
    const player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",1,hP, movementSpeed,id);
    player.isInjured = jest.fn();
    player.player_movement = jest.fn();

    player.update(1000);
    expect(player.isInjured).toBeCalledTimes(1);
    expect(player.player_movement).toBeCalledTimes(1);
    expect(player.isInjured.mock.calls[0][0]).toBe(1000);
    expect(player.beingAttacked).toEqual(false);
});


test('Testing if mana decreases after a special attack', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    let scene = new PlayScene();
    scene.damageItems = {
        add: jest.fn()
    };
    let player = new Player(scene,300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    player.specialAttack();
    expect(player.mana).toEqual(990);
    player.specialAttack();
    expect(player.mana).toEqual(980);
})

test('Testing if special attack does not decrease mana when less than 10', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    let scene = new PlayScene();
    scene.damageItems = {
        add: jest.fn()
    };
    let player = new Player(scene,300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    for(let i = 0; i < 130; i++){
        player.specialAttack();
    }
    expect(player.mana).toEqual(0); //should not be negative
})

test('Testing the removeSpecialWeapon function', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    let scene = new PlayScene();

    let destroyMock = jest.fn();

    scene.physics.add.group = ()=>{
        return {
            destroy:destroyMock
        };
    }
    
    let player = new Player(scene,300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    player.removeSpecialWeapon();
    expect(destroyMock).toBeCalledTimes(1);
    expect(player.specialAttack).toBe(null);

})


test('Testing the attack function', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    let scene = new PlayScene();

    scene.damageItems = {
        add: jest.fn()
    };

    let shootMock = jest.fn();

    scene.physics.add.group = ()=>{
        return {
            get:() => ({shoot:shootMock})
        };
    }
    
    let player = new Player(scene,300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    player.attack();
    expect(scene.damageItems.add).toBeCalledTimes(1);
    expect(shootMock).toBeCalledTimes(1);

})

test('Testing the removeWeapon function', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    let scene = new PlayScene();

    let destroyMock = jest.fn();

    scene.physics.add.group = ()=>{
        return {
            destroy:destroyMock
        };
    }
    
    let player = new Player(scene,300,300, "p1", "p1_01.png",hP, movementSpeed,id);

    player.removeWeapon();
    expect(destroyMock).toBeCalledTimes(1);
    expect(player.attack).toBe(null);

})

test('Testing the kill function when mode is single', ()=>{
    const hP = 100; const movementSpeed = 42; const id = "abc";
    let player = new Player(new PlayScene(),300,300, "p1", "p1_01.png",hP, movementSpeed,id);
    player.handleRespawn = jest.fn();
    player.setActive = jest.fn();
    player.setVisible = jest.fn();

    player.kill();
    expect(player.setActive).toBeCalledTimes(1);
    expect(player.setVisible).toBeCalledTimes(1);
    expect(player.handleRespawn).toBeCalledTimes(0);

})