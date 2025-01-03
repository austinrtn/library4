export default class Circle{
    static inject(x,y,r, item){        
        item.x = x;
        item.y = y;
        item.r = r;

        item.shape = 'circle';
        item.setDimensions = this.setDimensions;
        item.getDimensions = this.getDimensions;
        return item;
    }

    static setDimensions(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    static getDimensions(){
        return {
            x: this.x,
            y: this.y,
            r: this.r
        }
    }
}