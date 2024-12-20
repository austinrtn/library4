import Render from "./Render.js";

export default class RenderClone {
    constructor(parent){
        this.parent = parent;

        this.x = parent.x;
        this.y = parent.y;
        this.shape = parent.shape;
        this.render = {...parent.render};
        this.render.color = 'red';

        if(this.shape == 'circle'){
            this.r = parent.r;
        } else if(this.shape == 'rectangle'){
            this.width = parent.width;
            this.height = parent.height;
        }

        Render.addToLayer(this);        
    }
}