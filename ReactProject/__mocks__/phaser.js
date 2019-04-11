
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

    }
}






export default phaserMock;