import Item from "./Item.js";
import { getDistance, point } from "../utils.js";

export default class Line{
    constructor(x1, y1, x2, y2, color, size){
        Item.inject('line', this);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.size = size;

        this.collidable = false;
    }

    getPoints(){
        return {
            point1: point(this.x1, this.y1),
            point2: point(this.x2, this.y2)
        };
    }

    setPoints(point1, point2){
        if(point1){
            this.x1 = point1.x;
            this.y1 = point1.y;
        }
        if(point2){
            this.x2 = point2.x;
            this.y2 = point2.y;
        }
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