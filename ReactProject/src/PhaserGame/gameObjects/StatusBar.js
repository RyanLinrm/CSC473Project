import Phaser from 'phaser';

export class emptyBar extends Phaser.GameObjects.Image{
    constructor(scene,x,y){
        super(scene,x,y, 'bar');

        //add the empty bar to the display list
        scene.sys.displayList.add(this);

        this.setVisible(true);
    }
}

export class HpBar extends Phaser.GameObjects.Image{
    constructor(scene,x,y, type='HP', value='100'){
        super(scene,x,y, 'playerhpbar');

        //add the hp bar to the display list
        scene.sys.displayList.add(this);

        this.type = type;

        this.value = value;

        this.setVisible(true);
        //this.setPosition(0,0);
    }
}


export class ManaBar extends Phaser.GameObjects.Image{
    constructor(scene,x,y, type='Mana', value='100'){
        super(scene,x,y, 'playermanabar');

        //add the hp bar to the display list
        scene.sys.displayList.add(this);

        this.type = type;

        this.value = value;

        this.setVisible(true);
        //this.setPosition(0,0);
    }
}