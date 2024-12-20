import RenderClone from "./RenderClone.js";
import {getArea} from './utils.js';

export default class Camera {
    constructor(dimensions, parentDims, zoomRange, panSpeed, zoomSpeed){
        this.dimensions = {...dimensions};
        this.parentDims = {...parentDims};
        this.startingDims = {...dimensions};
        this.zoomRange  = zoomRange;
        this.panSpeed = panSpeed;
        this.zoomSpeed = zoomSpeed;
        
        this.zoom = 0;
        this.items = [];
        console.log(this);
        
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
            this.scale(item);
             
            item.x += item.xOffset;
            item.y += item.yOffset;
        }
    }

    pan(amnt){
        amnt.x *= this.panSpeed;
        amnt.y *= this.panSpeed;
        
        for(let item of this.items){
            item.xOffset += amnt.x;
            item.yOffset += amnt.y;
        }
    }

    scale(item){             
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
            let x = this.dimensions.width / this.parentDims.width;
            let y = this.dimensions.height / this.parentDims.height;
            let total = (x + y)/2;

            return {x:x, y:y, total: total};
    }

    getDimensions(){
        let x = (this.dimensions.width / this.parentDims.width);
        let y = (this.dimensions.height / this.parentDims.height);

        return {x:x, y:y};
    }

    addZoom(zoom, dir){
        if((this.zoom >= this.zoomRange.max && zoom > 0) ||
        (this.zoom <= this.zoomRange.min && zoom < 0)) return;
        if(!zoom) zoom = this.zoomSpeed;
        zoom *= dir;
        
        this.zoom += zoom;
        let xZoom = zoom*100 * (this.startingDims.width/getArea(this.startingDims));
        let yZoom = zoom*100 * (this.startingDims.height/getArea(this.startingDims));
        
        this.dimensions.x = this.dimensions.x + -xZoom/2;
        this.dimensions.y = this.dimensions.y + -yZoom/2;
        this.dimensions.width = this.dimensions.width + xZoom;
        this.dimensions.height = this.dimensions.height + yZoom;         
    }

    resetZoom(){
        this.zoom = 0;
        this.dimensions = {...this.startingDims};
        for(let item of this.items){
            item.xOffset = 0;
            item.yOffset = 0;
        }
    }
}
