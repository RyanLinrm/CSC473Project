import { PlayScene } from '../PhaserGame/scenes/PlayScene';
import { LoadScene } from '../PhaserGame/scenes/LoadScene';
jest.mock('phaser');

let scene = new PlayScene();


test('Testing if load scene loads a image',()=>{
    const path="'key', `${process.env.PUBLIC_URL}/assets/title_bg.jpg`"
    let newimage = scene.load.image(path);

    expect(newimage).toBe("'key', `${process.env.PUBLIC_URL}/assets/title_bg.jpg`");

});

test('Testing if load scene loads an atlas',()=>{
    const path="'key', atlaspath"

    let newatlas = scene.load.atlas(path);

    expect(newatlas).toBe("'key', atlaspath");

});

test('Testing if load scene loads an audio',()=>{
    const path="'key', audiopath"
    let newaudio = scene.load.audio(path);

    expect(newaudio).toBe("'key', audiopath");

});
test('Testing if init/preload/create are defined',()=>{
    let newloadscene=new LoadScene();
 
    expect(newloadscene.init).toBeDefined();
    expect(newloadscene.preload).toBeDefined();
    expect(newloadscene.create).toBeDefined();
});

test('Testing if init/preload/create are called',()=>{
    let newloadscene=new LoadScene();
   // newloadscene.preload = jest.fn();
    newloadscene.init = jest.fn();
    newloadscene.create = jest.fn();
    newloadscene.preload();
    expect(newloadscene.init).toBeCalledTimes(0);
  //  expect(newloadscene.preload).toBeCalledTimes(0);
    expect(newloadscene.create).toBeCalledTimes(0);
});


