import Phaser from "phaser";

import { CST } from "../CST";
import { Bullet } from "../gameObjects/Projectiles";
import { Units } from "../gameObjects/Units";
import { Player } from "../gameObjects/Player";
import { Bomber } from "../gameObjects/Bomber";
import { Enemy } from "../gameObjects/Enemy";
import { Rider } from "../gameObjects/Rider";
import { emptyBar, HpBar, ManaBar } from "../gameObjects/StatusBar";
export class CharSelectScene extends Phaser.Scene {
  constructor(sceneKey = CST.SCENES.CHAR) {
    super({ key: sceneKey });
  }

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