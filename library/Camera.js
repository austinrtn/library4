import RenderClone from "./RenderClone.js";
import {getArea} from './utils.js';

export default class Camera {
    constructor(dimensions, parentDims, cont){
        this.dimensions = {...dimensions};
        this.parentDims = {...parentDims};
        this.startingDims = {...dimensions};

        this.container = cont;
        this.zoom = 0;
        this.items = [];
    }

    addItem(item){
        item.camera = this;
        this.items.push(new RenderClone(item));
    }

    delete(item){
        this.items = this.items.filter(delItem => item !== delItem);
    }

    update(){
        for(let item of this.items){
            this.translate(item);
        }
    }

    translate(item){             
        let conversion = this.getConversion();   
        item.x = this.dimensions.x + (item.parent.x * conversion.x);
        item.y = this.dimensions.y + (item.parent.y * conversion.y);
        if(item.shape == 'circle') item.r = (item.parent.r * conversion.total);
        else if(item.shape == 'rectangle'){
            item.width = item.parent.width * conversion.x;
            item.height = item.parent.height * conversion.y;
        }
        
    }

    getConversion(){
        return {
            x: this.dimensions.width / this.parentDims.width,
            y: this.dimensions.height / this.parentDims.height,
            total:(this.dimensions.width * this.dimensions.height) / (this.parentDims.width * this.parentDims.height),
        }
    }

    getDimensions(){
        let x = (this.dimensions.width / this.parentDims.width);
        let y = (this.dimensions.height / this.parentDims.height);

        return {x:x, y:y};
    }

    addZoom(zoom){
        let container = this.container
        this.zoom += zoom;
        let xZoom = zoom*100 * (this.startingDims.width/getArea(this.startingDims) );
        let yZoom = zoom*100 * (this.startingDims.height/getArea(this.startingDims));
        
        this.dimensions.x = this.dimensions.x + -xZoom/2;
        this.dimensions.y = this.dimensions.y + -yZoom/2;
        this.dimensions.width = this.dimensions.width + xZoom;
        this.dimensions.height = this.dimensions.height + yZoom; 

        container.x = this.dimensions.x;
        container.y = this.dimensions.y;
        container.width = this.dimensions.width;
        container.height = this.dimensions.height;
    }

    resetZoom(){
        this.zoom = 0;
        this.dimensions = {...this.startingDims};
    }
}
