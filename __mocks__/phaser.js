
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
             
                this.setCollideWorldBounds=()=>{};
             
                this.destroy = ()=>{};
                this.body = {
        
                    velocity:{
                        x:0,
                        y:0
                    },

                };
                this.setSize = (a, b) =>{};
                
            },
           
        }
    },
    Math:{
        Distance:{
            Between: (a,b,c,d)=>{},
        }
    },
              
            

        
        
    
    Scene: function(){
        this.enemyTowers= {
            add:()=>{}
        };
        this.player={};
        this.sys = {
            updateList:{add:()=>{}},
            displayList:{add:()=>{}}
        };

        this.hpbar = {
            cutHPBar: ()=>{}
        };
        this
        this.physics = {
            world:{
                enableBody: ()=>{},
                enable:()=>{}
            },
            add:{
                group: ()=>{
                    return {
                        get:() => ({shoot:jest.fn()})
                    };
     
            },
      
              
            }
        };
    
        this.updateSprite = ()=>{};
       
    }
}

export default phaserMock;