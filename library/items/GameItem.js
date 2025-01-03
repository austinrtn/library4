import Item from "./Item.js";
import CollisionDetection from "../CollisionDetection.js";
import Render from "../Render.js";
import Rectangle from "./shapes/Rectangle.js";
import Circle from "./shapes/Circle.js";
import Text from "./Text.js";
import Line from "./Line.js";
import GameEngine from "../GameEngine.js";

function selectRenderElement(renderElement, dims, item){
    if(checkRenderElement(renderElement) == false) return;
    renderElement = renderElement.toUpperCase();
    
    if(Array.isArray(dims)) dims = getDimObject(renderElement, dims); 
    
    if(renderElement == 'circle') Circle.inject(dims.x, dims.y, dims.r, item);
    else if(renderElement == 'rectangle') Rectangle.inject(dims.x, dims.y, dims.w, dims.h,item);
    else if(renderElement == 'line') Line.inject(item);
    else if(renderElement == 'text') Text.inject(item);
}

function checkRenderElement(renderElement){
    if(renderElement == null) return true;
    let bool = false;
    for(let key in Render.getRenderElements()){
        if(key == renderElement) bool = true;
        if(bool == true) break;
    }

    if(bool == false){
        throw new Error("Error: renderElement must be 'circle', 'rectangle'"+
        ", 'rect', 'line', 'text', or null");
    }
    
    return bool;
}

function getDimObject(renderElement, dims){
    let newDims = {};
    
    newDims.x = dims[0];
    newDims.y = dims[1]

    if(renderElement == 'CIRCLE') newDims.r = dims[2];
    else if(renderElement == 'RECTANGLE' || renderElement == 'RECT'){
        newDims.w = dims[2];
        newDims.h = dims[3];
    }else if(renderElement == 'LINE'){};

    return newDims;
}

function injectClass(...classes){
    for(let cls of classes){
        cls = cls.toUpperCase();
        if(cls == 'RENDER') Render.inject(this);
    }
}

class GameItem {
    static inject(renderElement, dimensions, render, camera, addToCollisions, type, item){
        
        if(renderElement) {
            renderElement = renderElement.toUpperCase();
            selectRenderElement(renderElement, dimensions, item);
            
        }
        if(render) Render.addToLayer(item);
        if(camera) camera.addItem(item);
        if(addToCollisions) CollisionDetection.addItem(item);
        Item.inject(item,type);
        
        item.injectClass = injectClass;
        return item;
    }

    constructor(renderElement, dimensions, render, camera, addToCollisions, type,){
        GameItem.inject(renderElement, dimensions, render, camera, addToCollisions, type, this);
        GameEngine.items.push(this);
    }
    
}

export default GameItem;