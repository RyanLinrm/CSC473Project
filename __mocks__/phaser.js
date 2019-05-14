
//add onto this as you need
//Use function(){} for constructors
//Use ()=>({...}) to have a propety that is a function that returns an object


const phaserMock = {

    GameObjects: {
        Image: function () {

            this.setTexture = () => ({
                setScale: () => ({
                    setSize: jest.fn()
                })
            });

            this.setActive = jest.fn();
            this.setVisible = jest.fn();
            this.setPosition = () => { };
            this.setAngle = () => { };
            this.setCrop = () => { };

        }
    },

    Physics: {
        Arcade: {
            Sprite: function () {

                this.setCollideWorldBounds = () => { };

                this.destroy = () => { };
                this.body = {

                    velocity: {
                        x: 0,
                        y: 0
                    },

                };
                this.setSize = (a, b) => { };
                this.setVelocityX = (velocityValue) => { };

                this.play = (key, loop) => {
                    return key;
                };
            },

        }
    },
    Math: {
        Distance: {
            Between: (a, b, c, d) => { },
        }
    },

    Scene: function () {

        this.cameras = {
            main:{
                startFollow: jest.fn()
            }
        }

        this.add = {
            group: jest.fn(() => ({ add: jest.fn() })),
            text: jest.fn(
                () => ({
                    setDepth: jest.fn(()=>({
                        setScrollFactor: jest.fn(),
                        setVisible: jest.fn()
                    }))
                })
            ),
            tilemap: jest.fn(()=>({
                addTilesetImage: jest.fn(),
                createStaticLayer: jest.fn(
    
                    ()=>({
                        setDepth:jest.fn(
                            ()=>({
                                setCollisionByProperty:jest.fn()
                            })
                        ),
                        setCollisionByProperty:jest.fn()
                    })
    
                ),
                renderDebug: jest.fn()
            })
            ),
            graphics: jest.fn()
        };

        this.enemyTowers = {
            add: () => { }
        };
        this.player = {
            setCollideWorldBounds: jest.fn(),
            setSize: jest.fn()
        };
        this.sys = {
            updateList: { add: () => { } },
            displayList: { add: () => { } }
        };

        this.hpbar = {
            cutHPBar: () => { }
        };
        this.physics = {
            world: {
                enableBody: () => { },
                enable: () => { },
                setBounds: jest.fn()
            },
            add: {
                group: () => {
                    return {
                        get: () => ({ shoot: jest.fn() })
                    };

                },
                overlap: jest.fn(),
                collider: jest.fn()


            }
        };
        this.anims = {
            create: (animationConfig) => {
                return animationConfig;
            },
            generateFrameNames: (spritename, configObject) => {
                return configObject;
            },
        };

        this.updateSprite = () => { };

        this.input = {
            keyboard: {
                addKeys: jest.fn(),
                addKey: jest.fn()
            }
        };
        this.load = {
            image:(loadimage)=>{
                return loadimage;
            },
            atlas:(loadatlas)=>{
                return loadatlas;
            },
            audio:(loadaudio)=>{
                return loadaudio;
            },
        },
        this.updateSprite = ()=>{};
        this.create= ()=>{};
        this.preload= ()=>{};
        this.update= ()=>{};
    

    },

    Input: {
        Keyboard: {
            KeyCodes: {
                SPACE: 'val'
            }
        }},
        

    Display:{
        Color:jest.fn()
    }
}

export default phaserMock;