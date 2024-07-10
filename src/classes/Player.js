import { Rectangle } from "../../library/classes/shapes.js";
import {Mechanics} from "../../library/mechanics/Mechanics.js";

export default class Player extends Rectangle{
    constructor(x,y){
        super(x,y, 15,15, 'green', 'player');

        Mechanics.Jumping.Inject(this,null);

        this.applyGravity = true;
    }

    update(){
        this.updateLoop();
    }

    onCollision(item){
        if(item.solid) this.pushOutOfBoundary(item, item.solidSides, null);
        if(item.type == 'button' && !item.pressed) item.press();
    }

    controller(keys){
        if(keys[65] ){
            this.vX += -this.acc;

            this.beingMoved = true;
        }
        if(keys[68]){ 
            this.vX += this.acc;
            this.beingMoved = true;
        }

        if(!keys[65] && !keys[68]){
            this.beingMoved = false;
        }

        if(keys[32]) this.jump(this);
    }
}