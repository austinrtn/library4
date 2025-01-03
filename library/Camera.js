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

        this.xPanOffset = 0;
        this.yPanOffset = 0;

        this.active = true;
        this.visible = true;
        
        this.zoom = 0;
        this.items = [];        
    }

    
    toggleVisibility(){
        if(this.active) this.active = false;
        else this.active = true;
    }


    addItem(item){
        let renderClone = new RenderClone(item, this);
        this.items.push(renderClone);
        item.camera = this;
        renderClone.camera = this;
    }

    removeItem(item){        
        this.items = this.items.filter(delItem => item !== delItem);
        if(item.type == 'renderClone') item.delete();
        else if(item.renderClone) item.renderClone.delete();
    }

    update(){
        if(!this.active) return;
        for(let item of this.items){            
            if(item.render != item.parent.render) item.render = item.parent.render;
            this.scale(item);
            item.x += this.xPanOffset;
            item.y += this.yPanOffset;            
        }
    }

    pan(amnt){
        amnt.x *= this.panSpeed;
        amnt.y *= this.panSpeed;
        
        this.xPanOffset += amnt.x;
        this.yPanOffset += amnt.y;
    }

    scale(item){             
        let conversion = this.getScaleConversion();
       
        if(item.shape == 'circle') this.scaleCircle(item, conversion);
        else if(item.shape == 'rectangle') this.scaleRect(item, conversion);
        else if(item.shape == 'line') this.scaleLine(item, conversion);
    }

    scaleCircle(circle, conversion){
        this.scaleCoords(circle, conversion);
        circle.r = (circle.parent.r * conversion.total);
        return circle;
    }

    scaleRect(rect, conversion){
        this.scaleCoords(rect, conversion);
        rect.width = rect.parent.width * conversion.x;
        rect.height = rect.parent.height * conversion.y;
    }

    scaleLine(line, conversion){
        line.setPoints(this.scaleCoords(line.getPoints().point1, conversion), this.scaleCoords(line.getPoints().point2, conversion))
    }

    scaleCoords(item, conversion){
        item.x = this.dimensions.x + (item.parent.x * conversion.x);
        item.y = this.dimensions.y + (item.parent.y * conversion.y);
        return item;
    }

    getScaleConversion(){
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
        this.xPanOffset = 0;
        this.yPanOffset = 0;
        this.dimensions = {...this.startingDims};
    }

    delete(){
        for(let item of this.items){
            this.removeItem(item);
        }
    }
}
