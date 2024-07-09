import { Rectangle } from "../../library/classes/shapes.js";
import { Movement } from "../../library/physics/player_mechanics.js";

export class Platform extends Rectangle{
    constructor(x,y, width, height, color){
        super(x,y,width,height,color,'platform');
        this.isFloor = true;
        this.isWall = true;
        this.isCeiling = true;

        new Movement(this, null);
        
       
    }

}