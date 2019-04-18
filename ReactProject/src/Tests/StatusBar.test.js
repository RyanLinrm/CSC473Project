import { emptyBar } from "../PhaserGame/gameObjects/StatusBar";
import { HpBar } from "../PhaserGame/gameObjects/StatusBar";
import { ManaBar } from "../PhaserGame/gameObjects/StatusBar";
import { PlayScene } from '../PhaserGame/scenes/PlayScene';

test('Testing empty bar declaration',()=>{
    const x = 0; 
    const y = 0;
    const ebar = new emptyBar( new PlayScene(), x, y );

    expect(ebar).not.toBeFalsy();
});

test('Testing HP bar class constructer correctly intializes a hp bar',()=>{
    const x = 0; 
    const y = 0;
    const type = 'HP';
    const value = '200';

    const hpbar = new HpBar( new PlayScene(), x, y, type, value );

    expect(hpbar).not.toBeFalsy();
    expect(hpbar.type).toBe(type);
    expect(hpbar.value).toBe(value);
    expect(hpbar.currentHP).not.toBeFalsy();
});