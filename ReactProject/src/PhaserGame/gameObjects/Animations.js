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
            start:0, end:3, zeroPad:2,
            prefix:'wolf_', suffix: '.png'
            })
        });
        
        scene.anims.create({
            key:'wolf_left', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('wolf', {
            start:4, end:7, zeroPad:2,
            prefix:'wolf_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'wolf_right', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('wolf', {
            start:8, end:11, zeroPad:2,
            prefix:'wolf_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'wolf_up',
            frameRate: 8,
            frames: scene.anims.generateFrameNames('wolf', {
            start:12, end:15, zeroPad:2,
            prefix:'wolf_', suffix: '.png'
            })
        });
         //================animations for werewolf=================
        scene.anims.create({
            key: "werewolf_down",
            frameRate: 8,
            frames: scene.anims.generateFrameNames('werewolf', {
            start:0, end:3, zeroPad:2,
            prefix:'werewolf_', suffix: '.png'
            })
        });
        
        scene.anims.create({
            key:'werewolf_left', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('werewolf', {
            start:4, end:7, zeroPad:2,
            prefix:'werewolf_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'werewolf_right', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('werewolf', {
            start:8, end:11, zeroPad:2,
            prefix:'werewolf_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'werewolf_up',
            frameRate: 8,
            frames: scene.anims.generateFrameNames('werewolf', {
            start:12, end:15, zeroPad:2,
            prefix:'werewolf_', suffix: '.png'
            })
        });
        //================animations for ninjabot=================
        scene.anims.create({
            key: "ninjabot_down",
            frameRate: 8,
            frames: scene.anims.generateFrameNames('ninjabot', {
            start:1, end:3, zeroPad:2,
            prefix:'ninjabot_', suffix: '.png'
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
        //================animations for skull=================
        scene.anims.create({
            key: "skull_down",
            frameRate: 8,
            frames: scene.anims.generateFrameNames('skull', {
            start:1, end:4, zeroPad:2,
            prefix:'skull_', suffix: '.png'
            })
        });
        
        scene.anims.create({
            key:'skull_left', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('skull', {
            start:5, end:8, zeroPad:2,
            prefix:'skull_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'skull_up', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('skull', {
            start:9, end:12, zeroPad:2,
            prefix:'skull_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'skull_right',
            frameRate: 8,
            frames: scene.anims.generateFrameNames('skull', {
            start:13, end:16, zeroPad:2,
            prefix:'skull_', suffix: '.png'
            })
        });
         
       //set up attacking animation check
       scene.anims.create({
        key: "ab2",
        frameRate: 8,
        //walking downward animation frames
        frames: scene.anims.generateFrameNames('ability2', {
        start:1, end:10, zeroPad:1,
        prefix:'a2_', suffix: '.png'
        }),
        repeat: -1
     });
       //================animations for demon1=================

        scene.anims.create({
            key: "demon1_down",
            frameRate: 8,
            frames: scene.anims.generateFrameNames('demon1', {
            start:1, end:4, zeroPad:2,
            prefix:'demon1_', suffix: '.png'
            })
        });
        
        scene.anims.create({
            key:'demon1_left', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('demon1', {
            start:5, end:8, zeroPad:2,
            prefix:'demon1_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'demon1_right', 
            frameRate: 8,
            frames: scene.anims.generateFrameNames('demon1', {
            start:9, end:12, zeroPad:2,
            prefix:'demon1_', suffix: '.png'
            })
        });
        scene.anims.create({
            key:'demon1_up',
            frameRate: 8,
            frames: scene.anims.generateFrameNames('demon1', {
            start:12, end:16, zeroPad:2,
            prefix:'demon1_', suffix: '.png'
            })
        });
}
   
