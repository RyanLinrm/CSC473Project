import Phaser from "phaser";

import { CST } from "../CST";

/**
 * CharSelectScene - extendx Phaser.Scene
 * character selection scene, where player can select his or her character to
 * player the game
 */
export class CharSelectScene extends Phaser.Scene {

  /**
   * creates the scene and assign a key of this scene to phaser scene
   * @param {String} sceneKey 
   */
  constructor(sceneKey = CST.SCENES.CHAR) {
    super({ key: sceneKey });
  }

  /**
   * Load in the assets of game map
   */
  preload() {
    this.load.image(
      "tiles1",
      `${process.env.PUBLIC_URL}/assets/tiles/map_atlas.png`
    );
    this.load.image(
      "tiles2",
      `${process.env.PUBLIC_URL}/assets/tiles/map_atlas2.png`
    );

    this.load.tilemapTiledJSON(
      "Mymap",
      `${process.env.PUBLIC_URL}/assets/map/map.json`
    );
  }

  /**
   * Display the main character selection scene, show all the available characters,
   * and click on a character means pick it and will start the game scene
   */
  create() {
    let a = this.add
      .image(0, 0, "key1")
      .setOrigin(0.5, 0.5)
      .setDepth(0);
    a.setScale(2, 2);
    a.x = window.innerWidth / 2;
    a.y = window.innerHeight / 2;

    this.add.text(this.game.renderer.width / 2 - 605, 90, "Choose Your Warrior", { fontSize: 100, color: '#ffffff' });

    let Riderchar = this.add
      .image(
        this.game.renderer.width / 2 - 90,
        this.game.renderer.height / 2 + 225,
        "rider"
      )
      .setDepth(1);

    let bomberchar = this.add
      .image(
        this.game.renderer.width / 2 +90,
        this.game.renderer.height / 2 + 225,
        "p1"
      ).setScale(3);

    Riderchar.setInteractive();
    bomberchar.setInteractive();

    Riderchar.on("pointerup", () => {
      this.scene.start(CST.SCENES.PLAY, "rider");
    });

    bomberchar.on("pointerup", () => {
        this.scene.start(CST.SCENES.PLAY, "bomber");
      });
  }
}