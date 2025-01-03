import Render from "./Render.js";
import GameEngine from "./GameEngine.js";
import GameItem from "./items/GameItem.js";

export default class RenderClone extends GameItem{
    constructor(parent){
        console.log(parent.x);
        
        super(
            parent.shape,
            [parent.x, parent.y, parent.r],
            true, 
            null,
            false, 
            'renderClone'
        );

        this.parent = parent;

        if(!parent.render || (parent.render && !parent.render.injected)) Render.inject(parent);

        this.xOffset = 0;
        this.yOffset = 0;

        this.x = parent.x;
        this.y = parent.y;
        this.shape = parent.shape;
        
        if(this.shape == 'circle'){
            this.r = parent.r;
        } else if(this.shape == 'rectangle'){
            this.width = parent.width;
            this.height = parent.height;
        }
        
        parent.renderClone = this;
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