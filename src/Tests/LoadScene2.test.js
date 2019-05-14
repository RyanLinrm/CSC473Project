import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import { LoadScene } from '../PhaserGame/scenes/LoadScene';
jest.mock('phaser');

let scene = new PlayScene();


test('Testing if load scene loads a image in loadscene2',()=>{
    const path="'key', `${process.env.PUBLIC_URL}/assets/title_bg.jpg`"
    let newimage = scene.load.image(path);

    expect(newimage).toBe("'key', `${process.env.PUBLIC_URL}/assets/title_bg.jpg`");

});

test('Testing if load scene loads an atlas in loadscene2',()=>{
    const path="'key', atlaspath"

    let newatlas = scene.load.atlas(path);

    expect(newatlas).toBe("'key', atlaspath");

});

test('Testing if load scene loads an audio in loadscene2',()=>{
    const path="'key', audiopath"
    let newaudio = scene.load.audio(path);

    expect(newaudio).toBe("'key', audiopath");

});
test('Testing if init/preload/create are defined in loadscene2',()=>{
    let newloadscene=new LoadScene();
 
    expect(newloadscene.init).toBeDefined();
    expect(newloadscene.preload).toBeDefined();
    expect(newloadscene.create).toBeDefined();
});

test('Testing if init/preload/create are called in loadscene2',()=>{
    let newloadscene=new LoadScene();
    newloadscene.preload = jest.fn();
    newloadscene.init = jest.fn();
    newloadscene.create = jest.fn();
    
    expect(newloadscene.init).toBeCalledTimes(0);
    expect(newloadscene.preload).toBeCalledTimes(0);
    expect(newloadscene.create).toBeCalledTimes(0);
});


