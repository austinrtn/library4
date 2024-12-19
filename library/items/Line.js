import Item from "./Item.js";
import { getDistance } from "../utils.js";

export default class Line extends Item{
    constructor(x1, y1, x2, y2, color, size){
        super('line');
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.render.color = color;
        this.size = size;

        this.collidable = false;
        this.isVisible = true;
        this.shape = "line";
    }

    getLength(){
        return getDistance(
            {x: this.x1, y: this.y1},
            {x: this.x2, y: this.y2}
        ).total
    }

    setBoundingBox(dimensions){
        if(!dimensions){
            dimensions = {
                x: this.x, 
                y: this.y,
                w: this.w,
                h: this.h
            }
        }

        this.boundingBox = dimensions;
    }
}