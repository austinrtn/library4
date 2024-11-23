import BoundingBox from "./BoundingBox.js";
import Shape from "./Shape.js";

export default class Rectangle extends Shape{
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

    centerRect(){
        this.x = this.x - this.width/2;
        this.y = this.y - this.height/2;
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

    setBoundingBox(size){
        //this.boundingBox = new BoundingBox(this, size);
    }
}