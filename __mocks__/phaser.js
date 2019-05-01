
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

            this.setActive = () =>{};
            this.setVisible = () =>{};
            this.setPosition = ()=>{};
            this.setAngle = ()=>{};

        }
    },

    Physics: {
        Arcade:{
            Sprite: function(){

            }
        }
    },

    Scene: function(){
        this.sys = {
            updateList:{add:()=>{}},
            displayList:{add:()=>{}}
        };

        this.physics = {
            world:{
                enableBody: ()=>{}
            },
            add:{
                group: ()=>{}
            }
        };

        this.updateSprite = ()=>{};
    }
}

export default phaserMock;