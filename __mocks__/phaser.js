
//add onto this as you need
//Use function(){} for constructors
//Use ()=>({...}) to have a propety that is a function that returns an object


const phaserMock = {
    GameObjects: {
        Image: function(){
            
            this.setTexture = () => ({
                setScale: () => ({
                    setSize: jest.fn()
                })
            });

            this.setActive = jest.fn();
            this.setVisible = jest.fn();
            this.setPosition = ()=>{};
            this.setAngle = ()=>{};
            this.setCrop = () =>{};

        }
    },

    Physics: {
        Arcade:{
            Sprite: function(){
                this.destroy = ()=>{};
                this.body = {
                    velocity:{
                        x:0,
                        y:0
                    }
                };
                this.setSize = (a, b) =>{};
                this.setVelocityX = ( velocityValue ) => { };
                
                this.play = (key, loop) => {
                    return key;
                };
            },
           
        }
    },

    Scene: function(){
        this.sys = {
            updateList:{add:()=>{}},
            displayList:{add:()=>{}}
        };

        this.hpbar = {
            cutHPBar: ()=>{}
        };

        this.physics = {
            world:{
                enableBody: ()=>{}
            },
            add:{
                group: ()=>{
                    return {
                        get:() => ({shoot:jest.fn()})
                    };
                }
            }
        };

        this.anims = {
            create: ( animationConfig ) =>{
                return animationConfig;
            },
            generateFrameNames: (spritename, configObject) => {
                return configObject;
            },
        }

        this.updateSprite = ()=>{};
    }
}

export default phaserMock;