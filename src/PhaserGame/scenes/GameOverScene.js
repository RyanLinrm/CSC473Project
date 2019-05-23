
import Phaser from 'phaser';
import { CST } from "../CST";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

/**
 * GameOverScene - extends Phaser.Scene
 * The scene where player(s) who lose the game will be led to
 */
export class GameOverScene extends Phaser.Scene{

    /**
     * creates the scene and assign a key of this scene to phaser scene
     *
    */
    constructor(sceneKey = CST.SCENES.GAMEOVER){
        super({key:sceneKey});
      
    }

    /**
     * Pass in an object of player data of player id, character type, and score of the game
     * from game scene to this class.
     * @param {Object} data - Player data object passes from multiplayer game scene
     */
    init(data){

        /**
         * The player ID
         * @name GameOverScene#playerID
         * @type String
         */
        this.playerID = data.playerID;

        //this.gameRoom = data.roomkey;

        if(data.chartype === 'bomber'){

            /**
             * Type of the character the player plays in game
             * @name GameOverScene#charType
             * @type String
             */
            this.charType = 'shooter';
        }
        else 
        this.charType = data.chartype;

        /**
         * The final score of this player
         * @name GameOverScene#score
         * @type Number
         */
        this.score = data.score
    }

    /**
     * Phaser scene built in function, will be called after init function. In this function, the text
     * diplays game over will be rendered, and with the data obtained from init function, ID, character,
     * and score of the losing game will be displayed as well. Moreover, user can choose to play agian or
     * back to main page here.
     */
    create(){
        let { width, height } = this.sys.game.canvas;
        let LosingText= this.add.text(width/2, height/2, "Game Over", { fontFamily: 'Arial', fontSize: 150, color: '#ffffff' });
        LosingText.setOrigin(0.5,0.5); 
        this.add.text(width/2, height/2+100, `Player ID : ${this.playerID}`);
        this.add.text(width/2, height/2+150, `Your character : ${this.charType}`);
        this.add.text(width/2, height/2+200, `Your final score : ${this.score}`);
  

        //adding in a restart button
        let buttonCursor = this.add.image(100, 100, "cursor");
        buttonCursor.setScale(0.03);
        buttonCursor.setVisible(false);


        this.add.text(width/2, height/2+250, 'Play Again?', { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });

        let anothersingle = this.add.text(width/2-200, height/2+300, 'single player', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        anothersingle.setInteractive();

        anothersingle.on("pointerup", () => {
            this.scene.start(CST.SCENES.CHAR);
            });

        anothersingle.on("pointerover", ()=>{
            buttonCursor.setVisible(true);
            buttonCursor.x = anothersingle.x - 20;
            buttonCursor.y = anothersingle.y + 20;
        });

        anothersingle.on("pointerout", ()=>{
            buttonCursor.setVisible(false);
        });

        let anothermulti = this.add.text(width/2+200, height/2+300, 'Multiplayer', { fontFamily: 'Arial', fontSize: 30, color: '#ffffff' });
        anothermulti.setInteractive();

        anothermulti.on("pointerup", () => {
           window.location.reload();
            });

        anothermulti.on("pointerover", ()=>{
            buttonCursor.setVisible(true);
            buttonCursor.x = anothermulti.x - 20;
            buttonCursor.y = anothermulti.y + 20;
        });

        anothermulti.on("pointerout", ()=>{
            buttonCursor.setVisible(false);
        });
        this.storeIntoDB();

    }

    /**
     * Store the game data into database for further use and record, will also determine if this
     * new score is a better score then update the best score of this player.
     */
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