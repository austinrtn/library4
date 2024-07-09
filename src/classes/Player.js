import { Rectangle } from "../../library/classes/shapes.js";
import { Jumping, Movement } from "../../library/physics/player_mechanics.js";

export default class Player extends Rectangle{
    constructor(x,y){
        super(x,y, 15,15, 'green', 'player');

        new Movement(this,null);
        new Jumping(this,null);

        this.applyGravity = true;
        this.jumpHeight = 2;
    }

    onCollision(item){
        this.pushOutOfBoundary(item, item.solidSides, null)
    }

    controller(keys){
        if(keys[65] && this.vX > -this.maxVX){
            this.vX += -this.acc;
            this.beingMoved = true;
        }
        if(keys[68] && this.vX < this.maxVX){ 
            this.vX += this.acc;
            this.beingMoved = true;
        }

        if(!keys[65] && !keys[68]){
            this.beingMoved = false;
        }

        if(keys[32]) Jumping.Jump(this);
    }
}