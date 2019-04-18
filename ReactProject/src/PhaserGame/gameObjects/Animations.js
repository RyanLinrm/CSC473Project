export default function spriteAnimations (scene) {
         
    //=================animations for p1=================
    scene.anims.create({
           key: "p1_down",
           frameRate: 8,
           //walking downward animation frames
           frames: scene.anims.generateFrameNames('p1', {
           start:0, end:2, zeroPad:1,
           prefix:'p1_', suffix: '.png'
           })
       });
       

       scene.anims.create({
           key:'p1_left', 
           frameRate: 8,
           //walking left animation frames
           frames: scene.anims.generateFrameNames('p1', {
           start:3, end:5, zeroPad:1,
           prefix:'p1_', suffix: '.png'
           })
       });

       scene.anims.create({
           key:'p1_right', 
           frameRate: 8,
           //walking right animation frames
           frames: scene.anims.generateFrameNames('p1', {
           start:6, end:8, zeroPad:1,
           prefix:'p1_', suffix: '.png'
           })
       });

       scene.anims.create({
           key:'p1_up',
           frameRate: 8,
           //walking up animation frames
           frames: scene.anims.generateFrameNames('p1', {
           start:9, end:11, zeroPad:1,
           prefix:'p1_', suffix: '.png'
           })
       });
       //================animations for rider=================

       scene.anims.create({
           key: "rider_down",
           frameRate: 8,
           frames: scene.anims.generateFrameNames('rider', {
           start:0, end:3, zeroPad:1,
           prefix:'rider_', suffix: '.png'
           })
       });
       
       scene.anims.create({
           key:'rider_left', 
           frameRate: 8,
           frames: scene.anims.generateFrameNames('rider', {
           start:4, end:7, zeroPad:1,
           prefix:'rider_', suffix: '.png'
           })
       });
       scene.anims.create({
           key:'rider_up', 
           frameRate: 8,
           frames: scene.anims.generateFrameNames('rider', {
           start:8, end:11, zeroPad:1,
           prefix:'rider_', suffix: '.png'
           })
       });
       scene.anims.create({
           key:'rider_right',
           frameRate: 8,
           frames: scene.anims.generateFrameNames('rider', {
           start:12, end:15, zeroPad:1,
           prefix:'rider_', suffix: '.png'
           })
       });
        //================animations for wolf=================
        scene.anims.create({
            key: "wolf_down",
            frameRate: 8,
            frames: scene.anims.generateFrameNames('wolf', {
            start:1, end:4, zeroPad:1,
            prefix:'wolf_', suffix: '.png'
            })
        });
        
        scene.anims.create({
            key:'wolf_left', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('wolf', {
            start:5, end:8, zeroPad:1,
            prefix:'wolf_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'wolf_up', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('wolf', {
            start:9, end:12, zeroPad:1,
            prefix:'wolf_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'wolf_right',
            frameRate: 8,
            frames: scene.anims.generateFrameNames('wolf', {
            start:13, end:16, zeroPad:1,
            prefix:'wolf_', suffix: '.png'
            })
        });
             //================animations for ninjabot=================
             scene.anims.create({
                key: "ninjabot_down",
                frameRate: 8,
                frames: scene.anims.generateFrameNames('ninjabot', {
                start:1, end:3, zeroPad:2,
                prefix:'ninjabot', suffix: '.png'
                })
            });
            
            scene.anims.create({
                key:'ninjabot_left', 
                frameRate: 8,
                frames: scene.anims.generateFrameNames('ninjabot', {
                start:4, end:6, zeroPad:2,
                prefix:'ninjabot_', suffix: '.png'
                })
            });
            scene.anims.create({
                key:'ninjabot_right', 
                frameRate: 8,
                frames: scene.anims.generateFrameNames('ninjabot', {
                start:7, end:9, zeroPad:2,
                prefix:'ninjabot_', suffix: '.png'
                })
            });
            scene.anims.create({
                key:'ninjabot_up',
                frameRate: 8,
                frames: scene.anims.generateFrameNames('ninjabot', {
                start:10, end:12, zeroPad:2,
                prefix:'ninjabot_', suffix: '.png'
                })
            });
}
   
