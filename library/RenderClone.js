import Render from "./Render.js";
import GameEngine from "./GameEngine.js";

export default class RenderClone {
    constructor(parent, camera){
        this.parent = parent;
        this.camera = camera;

        this.xOffset = 0;
        this.yOffset = 0;

        this.x = parent.x;
        this.y = parent.y;
        this.shape = parent.shape;
        
        this.render = parent.render;
        this.type = 'renderClone';

        if(this.shape == 'circle'){
            this.r = parent.r;
        } else if(this.shape == 'rectangle'){
            this.width = parent.width;
            this.height = parent.height;
        }
        
        parent.renderClone = this;
        GameEngine.createItems(true, false, this);   
    }

    getCoords(){
        return {
            x: this.x,
            y: this.y,
        }
    }

    getDimensions(){
        return {
            x: this.getTrueCoords().x,
            y: this.getTrueCoords().y,
            r: this.r,
        }
    }

    delete(){
        Render.removeFromLayer(this);        
    }
}