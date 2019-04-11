
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

        }
    }
}






export default phaserMock;