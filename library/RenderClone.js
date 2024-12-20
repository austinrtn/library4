import Render from "./Render.js";

export default class RenderClone {
    constructor(parent){
        parent.renderClone = this;
        this.parent = parent;
        this.xOffset = 0;
        this.yOffset = 0;

        this.x = parent.x;
        this.y = parent.y;
        this.shape = parent.shape;
        this.render = parent.render;

        if(this.shape == 'circle'){
            this.r = parent.r;
        } else if(this.shape == 'rectangle'){
            this.width = parent.width;
            this.height = parent.height;
        }
        Render.addToLayer(this);        
    }
}