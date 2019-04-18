import { emptyBar } from "../PhaserGame/gameObjects/StatusBar";
import { HpBar } from "../PhaserGame/gameObjects/StatusBar";
import { ManaBar } from "../PhaserGame/gameObjects/StatusBar";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';
//jest.mock('phaser');
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

test('Testing HP bar class constructer correctly intializes a hp bar', ()=>{

    const hpbar = new HpBar( new PlayScene(), x, y, type, value );

    expect(hpbar).toBeDefined();
    expect(hpbar.type).toBe(type);
    expect(hpbar.value).toBe(value);
    expect(hpbar.currentHP).toBeDefined();
});

/*
test('Testing the cutHPBar method in HP bar class', ()=>{

    const hpbar = new HpBar( new PlayScene(), x, y, type, value );

    let barwidth = hpbar.width;
    const damage = 10;
    let corretValue = 200 - damage
    //hpbar.setCrop(0,0,hpbar.cutWith,hpbar.width);
    hpbar.cutHPBar(damage);

    //test when first time taking damage: if the current hp = value - damage
    //  and if the bar get cut shorter
    expect(hpbar.currentHP).toBe(corretValue);
    expect(hpbar.cutWith).toBeLessThan(barwidth);

    barwidth = hpbar.cutWith;
    hpbar.cutHPBar(damage);
    corretValue = 200 - damage * 2;
    //test when taking damage for the second time: if now the current hp will be reduce based on last change
    //  and if the bar get cut once again shorter
    expect(hpbar.currentHP).toBe(corretValue);
    expect(hpbar.cutWith).toBeLessThan(barwidth);
});
*/


// Mana bar class

test('Testing HP bar class constructer correctly intializes a hp bar', ()=>{

    const manabar = new ManaBar( new PlayScene(), x, y, type2, value2 );

    expect(manabar).toBeDefined();
    expect(manabar.type).toBe(type2);
    expect(manabar.value).toBe(value2);
    expect(manabar.currentMana).toBeDefined();
});