import { Rectangle } from "../../library/classes/shapes.js";
import { moveToLayer } from "../../library/render.js";
export class Platform extends Rectangle{
    constructor(x,y, width, height, color, push){
        super(x,y,width,height,color,'platform');
        this.push = push;
        this.solid = true;
        
    }

    onCollision(item){
        if(item.solid)    this.pushOutOfBoundary(item, item.solidSides, null)
    }

    open(){
        moveToLayer('background', this)
        this.solid = false;
        this.color = 'white';
        this.pressed = true;
    }

}

export class Button extends Rectangle{
    constructor(x,y,link){
        super(x,y,5,5,'orange', 'button');
        this.link = link
        this.solid = false;
        this.renderLayer = 'background'
    }

    press(){
        this.link.open();
    }
}