import { emptyBar } from "../PhaserGame/gameObjects/StatusBar";
import { HpBar } from "../PhaserGame/gameObjects/StatusBar";
import { ManaBar } from "../PhaserGame/gameObjects/StatusBar";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
jest.mock('phaser');
//jest.mock('../PhaserGame/gameObjects/StatusBar');
//jest.mock('../PhaserGame/scenes/PlayScene');

test('Testing empty bar declaration', ()=>{
    const x = 0; 
    const y = 0;
    const ebar = new emptyBar( new PlayScene(), x, y );

    expect(ebar).not.toBeFalsy();
});


//some useful variables
const x = 0; 
const y = 0;
const type = 'HP';
const type2 = 'Mana';
const value = 200;
const value2 = 100;


//testing HP bar class

const hpbar = new HpBar( new PlayScene(), x, y, type, value );

test('Testing HP bar class constructer correctly intializes a hp bar', ()=>{

    expect(hpbar).toBeDefined();
    expect(hpbar.type).toBe(type);
    expect(hpbar.value).toBe(value);
    expect(hpbar.currentHP).toBeDefined();
});


test('Testing the cutHPBar method in HP bar class', ()=>{

    const damage = 10;
    let corretValue = 200 - damage
    hpbar.cutHPBar(damage);

    //test when first time taking damage: if the current hp = value - damage
    expect(hpbar.currentHP).toBe(corretValue);

    hpbar.cutHPBar(damage);
    corretValue -= damage;
    //test when taking damage for the second time: if now the current hp will be reduce based on last change
    expect(hpbar.currentHP).toBe(corretValue);
});


test('Testing the method in HP bar class', ()=>{

    const recoveramount = 10;
    let corretValue = 190;
    hpbar.regenHPBar(recoveramount);

    //hp has been recover up to 190, test if current hp = 190
    expect(hpbar.currentHP).toBe(corretValue);

    //test if full hp now
    hpbar.regenHPBar(recoveramount);
    corretValue = 200;
    expect(hpbar.currentHP).toBe(corretValue);

})



// Mana bar class

const manabar = new ManaBar( new PlayScene(), x, y, type2, value2 );

test('Testing HP bar class constructer correctly intializes a hp bar', ()=>{

    expect(manabar).toBeDefined();
    expect(manabar.type).toBe(type2);
    expect(manabar.value).toBe(value2);
    expect(manabar.currentMana).toBeDefined();
});


test('Testing the cutManaBar method in Mana bar class', ()=>{

    let manacost = 10;
    manabar.cutManaBar(manacost);

    let correctMana = manabar.value - manacost;

    //test if the mana is reduced by 10
    expect(manabar.currentMana).toBe(correctMana);

    //test if the mana is reduced again by 10 based on the last change
    manabar.cutManaBar(manacost);
    correctMana -= manacost;
    
    expect(manabar.currentMana).toBe(correctMana);

});

test('Testing if the regenManaBar method in ManaBar class works', ()=>{

    let regenamount = 10;
    manabar.regenManaBar(regenamount);

    let correctMana = 90;

    // test if the current mana value has been recoved up to 90;
    expect(manabar.currentMana).toBe(correctMana);

    // test if the mana is now full again
    correctMana = 100;
    manabar.regenManaBar(regenamount);
    expect(manabar.currentMana).toBe(correctMana);
});

test('Testing if the resetBar function in the statusbar works', ()=>{
    let width = 1023;
    let height = 2048;

    hpbar.setCrop = jest.fn();
    hpbar.width = width;
    hpbar.height = height;
    hpbar.resetBar();

    expect(hpbar.currentHP).toBe(value);
    expect(hpbar.cutWith).toBe(1023);

    expect(hpbar.setCrop).toBeCalledTimes(1);
    expect(hpbar.setCrop.mock.calls[0][0]).toBe(0);
    expect(hpbar.setCrop.mock.calls[0][1]).toBe(0);
    expect(hpbar.setCrop.mock.calls[0][2]).toBe(width);
    expect(hpbar.setCrop.mock.calls[0][3]).toBe(height);

});