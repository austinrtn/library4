import { getDistance, getDistanceRect } from "../utils/utils.js";
import Item from "./Item.js";

class Shape extends Item{
    constructor(shape, type){
        super(type)
        this.shape = shape;

        this.renderLayer = null;
        this.isVisible = true;
        this.stroke = true;
        this.strokeColor = "black";
        this.fill = true;
        this.opacity = 1;

        this.collisions = null;//[]
        this.collidable = true;
        this.controllable = true;
        this.dragable = true;
        this.isBeingDragged = false;

        this.boundingBox = null;
        this.collisions = [];

        
        this.injections = [];
        this.detections = {}
        this.detectionFunctions = [];
        this.updateFunctions = [];
    }

    update(){
        this.updateLoop();
    }

    onCollision(item){

    }

    getBoundingbox(){
        return this.boundingBox;
    }

    updateCollision(){
        return;
        for(var i = 0; i < this.collisions.length; i++){
            if(!this.collisions[i].collidable) continue
            let collisionItem = this.collisions[i];
        }
        return null;
    }

    updateLoop(){
        for(let i = 0; i < this.updateFunctions.length; i++){
            let func = this.updateFunctions[i];
            func(this);
        }
         this.updateCollision();
    }
}

export class Rectangle extends Shape{
    constructor(x,y,width,height,color,type){
        super("rectangle", type);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
        this.color = color;

        this.sides = {
            top: false, 
            right: false,
            bottom: false,
            left: false
        }

    }

    getCenter(){
        return {
            x: this.x + this.width/2, 
            y: this.y + this.height/2
        };
    }

    loadDetections(...detectionObjs){
        for(let dObj of detectionObjs){
            for(const key in dObj.detections){
                this.detections[key] = dObj.detections[key];
            }
            this.detectionFunctions.push(dObj.func);
        }
    }

    updateCollision(){
        let detections = structuredClone(this.detections)

        for(let item of this.collisions){
            for(let func of this.detectionFunctions) func(detections, item, this);
        }

        for (const key in detections) {
           this[key] = detections[key];
        }

    }

    getSideOfCollision(item){
        let selectedSide = {dist: Infinity};
        let sides = [
            {side: "top", dist: Math.abs(this.y - (item.y + item.height))},
            {side: "right", dist: Math.abs((this.x + this.width) - item.x) },
            {side: "bottom", dist: Math.abs((this.y + this.height) - item.y)},
            {side: "left", dist: Math.abs(this.x - (item.x + item.width))},
        ];
        
        for(let side of sides) if(side.dist < selectedSide.dist) selectedSide = side;
        return selectedSide;
    }

    pushOutOfBoundary(boundary, sidesToDetect, sideObj){
       if(!sideObj) sideObj = this.getSideOfCollision(boundary);
       let side = sideObj.side;
       if(sideObj.dist < 0.01) return;
       
       if(!sidesToDetect) sidesToDetect = {top: true, right: true, bottom: true, left: true};
       if(side == "top" && sidesToDetect.top) this.y = boundary.y + boundary.height;
       if(side == "right" && sidesToDetect.right) this.x = boundary.x - this.width;
       if(side == "bottom" && sidesToDetect.bottom) this.y = boundary.y - this.height;
       if(side == "left" && sidesToDetect.left) this.x = boundary.x + boundary.width;;

       return;
    }

    getBoundingbox(){
         
    }
}

export class Circle extends Shape{
    constructor(x,y,r,color,type){
        super("circle", type);
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

}

export class Line{
    constructor(x1, x2, y1, y2, color, size){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.color = color;
        this.size = size;

        this.collidable = false;
        this.isVisible = true;
        this.shape = "line";
    }

    getLength(){
        return getDistance(
            {x: this.x1, y: this.y1},
            {x: this.x2, y: this.y2}
        )
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