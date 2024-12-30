import Shape from "./Shape.js";

export default class Circle{
    static inject(x,y,r,color, type, item){
        Shape.inject('circle', type, item);
        item.x = x;
        item.y = y;
        item.r = r;
        item.render.color = color;


    }

    static getDimensions (){
        return {
            x: this.x,
            y: this.y,
            r: this.r
        }
    }
}