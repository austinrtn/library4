import { inject } from "./Mechanics.js";
import { SideDetection } from "../classes/DetectionObj.js";

export class Movement {
    static Name = 'Movement';
    
    static DefaultData = {
        acc: 0.1,
        friction: 0.1,
        maxVX: 2,
    }
    
    static Injections = {
        vX: 0,
        vY: 0,
        beingMoved: false,

        updateMovement: Movement.Update,
        move: Movement.Move,
        applyFriction: Movement.ApplyFriction,
    }

    static Detections = [SideDetection]
    
    static Inject(obj, data){
        inject(obj, data, Movement)
    }

    static Update(obj){
        obj.move(obj);
        if(obj.friction) obj.applyFriction(obj)
    }

    static Move(obj){
        if(obj.maxVX && obj.vX >= obj.maxVX) obj.vX = obj.maxVX;
        if(obj.maxVX && obj.vX <= -obj.maxVX) obj.vX = -obj.maxVX;

        if(obj.maxVY && obj.vY >= obj.maxVY) obj.vY = obj.maxVY;
        if(obj.maxVY && obj.vY <= -obj.maxVY) obj.vY = -obj.maxVY;


        obj.x += obj.vX;
        obj.y += obj.vY;

        if(obj.touchingWall && !obj.falling) obj.vX = 0;
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
}