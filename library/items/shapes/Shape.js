import Item from "../Item.js";

class Shape{
    static inject(shape, type, item){
        Item.inject(item, type);
        item.shape = shape;

        item.render = {};
        item.render.layer = null;
        item.render.visible = true;
        item.render.color = "black";
        item.render.stroke = true;
        item.render.strokeColor = "black";
        item.render.strokeWidth = 1;
        item.render.fill = true;
        item.render.opacity = 1;

        item.collisions = null;//[]
        item.collidable = true;
        item.controllable = true;
        item.dragable = true;
        item.isBeingDragged = false;

        item.boundingBox = null;
        item.collisions = [];
        item.logCollisions = false;
        
        item.injections = [];
        item.detections = {}
        item.detectionFunctions = [];
        item.updateFunctions = [];

        item.markForDeletion = false;
    }
}

export default Shape;