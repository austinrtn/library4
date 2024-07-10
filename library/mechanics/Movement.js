import { inject } from "./Mechanics.js";
import { SideDetection } from "../classes/DetectionObj.js";
import { getDistance, containsPointInSquare } from "../utils/utils.js";


export class Movement {
    static Name = 'Movement';
    
    static DefaultData = {
        acc: 0.1,
        friction: 0.1,
        maxVX: 2,
        maxVY: 2,
    }
    
    static Injections = {
        vX: 0,
        vY: 0,
        beingMoved: false,

        updateMovement: Movement.Update,
        move: Movement.Move,
        applyFriction: Movement.ApplyFriction,
        moveTo: Movement.MoveTo,

    }

    static Detections = [SideDetection]
    
    static Inject(obj, data){
        inject(obj, data, Movement)
    }

    static Update(obj){
        obj.move(obj);
        if(obj.friction) obj.applyFriction(obj)
        if(obj.target) obj.moveTo(obj);
    }

    static Move(obj){
        if(obj.maxVX && obj.vX >= obj.maxVX) obj.vX = obj.maxVX;
        if(obj.maxVX && obj.vX <= -obj.maxVX) obj.vX = -obj.maxVX;

        if(obj.maxVY && obj.vY >= obj.maxVY) obj.vY = obj.maxVY;
        if(obj.maxVY && obj.vY <= -obj.maxVY) obj.vY = -obj.maxVY;


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
        let dist = getDistance(obj.getCenter(), target);
        
        let xPer = -dist.x / dist.total; 
        let yPer = -dist.y / dist.total;
        
        if(obj.sides.top || obj.sides.left || obj.sides.right || obj.sides.bottom) return;
        
        obj.vX += obj.acc * xPer;
        obj.vY += obj.acc * yPer;

        if(containsPointInSquare(obj, target)){
            obj.target = null;
        }
    }
}