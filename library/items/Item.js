import { createId } from "../uid.js";

export default class Item {
    constructor(type){
        this.type = type
        this.id = createId();
    }

    update(){
        this.move();
        this.updateCollision();
    }

   

    onCollision(collisionItem){
        return collisionItem;
    }


    onDrag(x,y){
        this.x = x 
        this.y = y
    }


    controller(keys){
        
    }
}