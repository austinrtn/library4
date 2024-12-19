import Shape from "./Shape.js";

export default class Circle extends Shape{
    constructor(x,y,r,color,type){
        super("circle", type);
        this.x = x;
        this.y = y;
        this.r = r;
        this.render.color = color;
    }

}