import Item from "../Item.js";

export default class Shape extends Item{
    constructor(shape, type){
        super(type)
        this.shape = shape;

        this.renderLayer = null;
        this.isVisible = true;
        this.stroke = true;
        this.strokeColor = "black";
        this.strokeWidth = 1;
        this.fill = true;
        this.opacity = 1;

        this.collisions = null;//[]
        this.collidable = true;
        this.controllable = true;
        this.dragable = true;
        this.isBeingDragged = false;

        this.boundingBox = null;
        this.collisions = [];
        this.logCollisions = false;
        
        this.injections = [];
        this.detections = {}
        this.detectionFunctions = [];
        this.updateFunctions = [];

        this.markForDeletion = false;
    }

    update(){
        this.updateLoop();
    }

    onCollision(item){

    }

    getBoundingbox(){
        return this.boundingBox;
    }

    updateCollision(){
        return;
        for(var i = 0; i < this.collisions.length; i++){
            if(!this.collisions[i].collidable) continue
            let collisionItem = this.collisions[i];
        }
        return null;
    }

    updateLoop(){
        for(let i = 0; i < this.updateFunctions.length; i++){
            let func = this.updateFunctions[i];
            func(this);
        }
         this.updateCollision();
    }

    loadDetections(...detectionObjs){
        for(let dObj of detectionObjs){
            for(const key in dObj.detections){
                this.detections[key] = dObj.detections[key];
            }
            this.detectionFunctions.push(dObj.func);
        }
    }
}