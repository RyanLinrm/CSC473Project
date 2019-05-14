
import Phaser from 'phaser';
import { CST } from "../CST";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';


export class GameOverScene extends Phaser.Scene{

    constructor(sceneKey = CST.SCENES.GAMEOVER){
        super({key:sceneKey});
      
    }

    init(data){
        this.playerID = data.playerID;
        //this.gameRoom = data.roomkey;
        if(data.chartype === 'bomber'){
            this.charType = 'shooter';
        }
        else 
        this.charType = data.chartype;
        this.score = data.score
    }

    create(){
        let { width, height } = this.sys.game.canvas;
        let LosingText= this.add.text(width/2, height/2, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
        LosingText.setOrigin(0.5,0.5); 
        let dataText = this.add.text(width/2, height/2+100, `Player ID : ${this.playerID}`);
        this.add.text(width/2, height/2+150, `Your character : ${this.charType}`);
        this.add.text(width/2, height/2+200, `Your final score : ${this.score}`);
        
        //adding in a restart button
        let buttonCursor = this.add.image(100, 100, "cursor");
        buttonCursor.setScale(0.03);
        buttonCursor.setVisible(false);


        let anothergame = this.add.text(width/2, height/2+250, 'Play Again?', { fontFamily: 'Arial', fontSize: 60, color: '#ffffff' });
        anothergame.setInteractive();

        anothergame.on("pointerup", () => {
            this.scene.start(CST.SCENES.CHAR);
            });

        anothergame.on("pointerover", ()=>{
            buttonCursor.setVisible(true);
            buttonCursor.x = anothergame.x - 60;
            buttonCursor.y = anothergame.y + 30;
        });

        anothergame.on("pointerout", ()=>{
            buttonCursor.setVisible(false);
        });

        this.storeIntoDB();

    }

    async storeIntoDB() {
        await API.graphql(graphqlOperation(queries.listGameUsers, 
            {filter:{ sub: { eq: this.playerID } } })).then( async (data) =>{
                if(data.data.listGameUsers.items.length === 1){
                    let id = data.data.listGameUsers.items[0].id;
                    
                    //handler best score
                    let bestscore = data.data.listGameUsers.items[0].bestScore;
                    let newbestscore = bestscore;
                    
                    if( this.score > bestscore ){
                        newbestscore = this.score;
                    }

                    //store all the info into DB
                    await API.graphql(graphqlOperation(mutations.updateGameUser, {input: {
                        id: id,
                        lastScore: this.score,
                        bestScore: newbestscore,
                        lastChar: this.charType
                    }}))
                }
            })
    }
}