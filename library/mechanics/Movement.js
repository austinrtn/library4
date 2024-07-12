import { inject } from "./Mechanics.js";
import { SideDetection } from "../classes/DetectionObj.js";
import { getDistance, containsPointInSquare } from "../utils/utils.js";


export class Movement {
    static Name = 'Movement';
    
    static DefaultData = {
        vX: 0,
        vY: 0,

        acc: 0.1,
        friction: 0.1,
        
        maxVels: {
            up: 2,
            right: 2,
            down: 2,
            left: 2,
        },
                  
        beingMoved: false,
        directionX: null,
        directionY: null,
    }
    
    static Injections = {
        updateMovement: Movement.Update,
        move: Movement.Move,
        moveTo: Movement.MoveTo,
        applyFriction: Movement.ApplyFriction,
    }

    static Detections = [SideDetection]
    
    static Inject(obj, data){
        if(Array.isArray(obj)) for(let o of obj) inject(o, data, Movement);
        else inject(obj, data, Movement);
    }

    static Update(obj){
        obj.move(obj);
        if(obj.target) obj.moveTo(obj);
        if(obj.friction) obj.applyFriction(obj)
    }

    static Move(obj){
        if(obj.maxVels.right && obj.vX >= obj.maxVels.right) obj.vX = obj.maxVels.right;
        else if(obj.maxVels.left && obj.vX <= -obj.maxVels.left) obj.vX = -obj.maxVels.left;
        else if(obj.maxVels.down && obj.vY >= obj.maxVels.down) obj.vY = obj.maxVels.down;
        else if(obj.maxVels.up && obj.vY <= -obj.maxVels.up) obj.vY = -obj.maxVels.up;

        obj.x += obj.vX;
        obj.y += obj.vY;

        if(obj.touchingWall && !obj.falling) obj.vX = 0;
        if((obj.touchingFloor || obj.touchCeiling) && !obj.falling) obj.vY = 0;
    }

    static ApplyFriction(obj){
        if(obj.beingMoved || obj.vX == 0) return;
        
        if(obj.vX < 0) obj.vX += obj.friction;
        else obj.vX -= obj.friction;
        
        if(obj.vX < 0.1 && obj.vX > -0.1){
            obj.vX = 0;
            return;
        }
    }

    static MoveTo(obj, target){
        if(target && !obj.target) obj.target = target;
        else if(!target && obj.target) target = obj.target;

        if(obj.sides.top || obj.sides.left || obj.sides.right || obj.sides.bottom) return;

        let dist = getDistance(obj.getCenter(), target);
        let xPer = -dist.x / dist.total; 
        let yPer = -dist.y / dist.total;
        
        obj.vX += obj.acc * xPer;
        obj.vY += obj.acc * yPer;
        
        if(dist.total < 1){
            obj.target = null;
            this.vX = 0;
            this.vY = 0;
        }
    }
}