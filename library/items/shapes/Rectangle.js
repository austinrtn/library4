class Rectangle{
    static inject(x,y,width,height,item){
        item.x = x;
        item.y = y;
        item.width = width;
        item.height = height; 

        item.shape ='rectangle';
        item.getArea = this.getArea;
        item.setDimensions = this.setDimensions;
        item.getDimensions = this.getDimensions;
        item.getCenter = this.getCenter;
        item.getRect = this.getRect;

        return item;
    }

    static getArea(){
        return this.width * this.height;
    }
    
    static setDimensions(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    static getDimensions(){
        return {
            x: this.x, 
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }

    static getCenter(){
        return {
            x: this.x + this.width/2, 
            y: this.y + this.height/2
        };
    }

    static centerRect(){
        this.x = this.x - this.width/2;
        this.y = this.y - this.height/2;
    }
}

export default Rectangle;