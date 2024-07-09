import { Rectangle } from "../../library/classes/shapes.js";
import { SideDetection } from "../../library/classes/DetectionObj.js";

export default class Player extends Rectangle{
    constructor(x,y){
        super(x,y, 15,15, 'green', 'player');

        this.maxVX = 3;
        this.acc = 0.05;
        this.friction = .1;
        this.beingMoved = false;

        this.jumping = false;
        this.jumpHeight = 2;

        this.applyGravity = true;

        

        this.loadDetections(SideDetection)
    }

    update(){
        this.move();
        this.updateCollision(); 
        if(this.touchingCeiling) this.vY = 0;
        if(!this.beingMoved && this.vX != 0) this.applyFriction();

        if(this.touchingWall) this.vX = 0;
        if(this.vX > this.maxVX) this.vX = this.maxVX;
    }

    jump(){
        if(!this.touchingFloor && this.touchingWall) this.wallJump();
        if(!this.allowJump()) return false;

        this.jumping = true;
        this.vY = -this.jumpHeight;
    }

    wallJump(){
        if(this.sides.right){
            this.vX += -2;
        } else if(this.sides.left){
            this.vX += 2;
        } 
        this.vY = -this.jumpHeight;
    }

    allowJump(){
        if( !this.falling) return true;
        else return false;
    }

    onCollision(item){
        this.pushOutOfBoundary(item, item.solidSides, null)
    }

    applyFriction(){
        if(this.vX < 0) this.vX += this.friction;
        else this.vX -= this.friction;

        if(this.vX < 0.1 && this.vX > -0.1){
            this.vX = 0;
            return;
        }
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

        if(keys[32]) this.jump();
    }
}