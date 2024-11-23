import CollisionDetection from "../../CollisionDetection.js";

export default class BoundingBox{
    constructor(item, size){
        this.x = item.x - size*4;
        this.y = item.y = size * 4;
        this.width = item.width + size * 4;
        this.height = item.height + size * 4;

    }

    onCollision(item){
        CollisionDetection.detectCollision(this.item, item);
    }
}