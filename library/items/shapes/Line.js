export default class Line{
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