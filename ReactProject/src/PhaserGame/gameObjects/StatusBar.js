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
        this.currentHP = this.value;

        this.setVisible(true);
        //this.setPosition(0,0);

        this.cutWith = this.width;
    }

    cutHPBar(damage){
        //cut the bar to display reducing effect

        let ratio = damage / this.currentHP;

        this.cutWith = this.cutWith-(this.cutWith * ratio);
        this.setCrop(0,0,this.cutWith,this.height);

        this.currentHP = this.currentHP - damage;

    }
}


export class ManaBar extends Phaser.GameObjects.Image{
    constructor(scene,x,y, type='Mana', value='100'){
        super(scene,x,y, 'playermanabar');

        //add the hp bar to the display list
        scene.sys.displayList.add(this);

        this.type = type;

        this.value = value;
        this.currentMana = this.value;

        this.setVisible(true);
        //this.setPosition(0,0);

        this.cutWith = this.width;
    }

    cutManaBar(cost){
        //cut the bar to display reducing effect
        
        if(this.currentMana > 0){
            let ratio = cost / this.currentMana;

            this.cutWith = this.cutWith-(this.cutWith * ratio);
            this.setCrop(0,0,this.cutWith,this.height);

            this.currentMana = this.currentMana - cost;
        }

    }
}