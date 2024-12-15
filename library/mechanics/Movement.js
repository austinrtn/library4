import { inject } from "./Mechanics.js";
import GameEngine from "../GameEngine.js";
import { SideDetection } from "../classes/DetectionObj.js";
import * as Util from "../utils.js";


export class Movement {
    static Name = 'Movement';
    
    static DefaultData = {
        vx: 0,
        vy: 0,

        accelerate: true,
        accelerationSpeed: 0.01,
        magnitude: 1,
        maxAccele: 5,
        currentAcceleration: 0,
        friction: 0,
        
        maxVel: null,

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
        moveToPoint: Movement.MoveToPoint,
 //       stopMoving: Movement.StopMoving,
        applyFriction: Movement.ApplyFriction,
        setMaxVel: Movement.setMaxVel,
        stopAtTarget: Movement.StopAtTarget,
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
        if(!GameEngine.deltaTimeMultiplier) return;
   
        obj.x += obj.vx * GameEngine.deltaTimeMultiplier;
        obj.y += obj.vy * GameEngine.deltaTimeMultiplier;

        if(obj.touchingWall && !obj.falling) obj.vx = 0;
        if((obj.touchingFloor || obj.touchCeiling) && !obj.falling) obj.vy = 0;
    }

    static ApplyFriction(obj){
        if(obj.beingMoved || obj.vx == 0) return;
        
        if(obj.vx < 0) obj.vx += obj.friction;
        else obj.vx -= obj.friction;
        
        if(obj.vx < 0.1 && obj.vx > -0.1){
            obj.vx = 0;
            return;
        }
    }

    static MoveToPoint(obj, target, magnitude){
        if(!magnitude) magnitude = obj.magnitude;
        let vector = Util.vector(magnitude, Util.getAngleByPoints(obj, target));
        
        obj.vx = vector.dx;
        obj.vy = vector.dy
    }

    static StopAtTarget(obj){
        console.log(Util.getDistance(obj, obj.target).total);
        
        if(Util.getDistance(obj, obj.target).total < 3) {
            console.log(1);
            obj.stopMoving();
        }
    }

    static StopMoving(obj){
        if(obj.target) obj.target = null;
        obj.vx = 0;
        obj.vy = 0;
        obj.currentAcceleration = 0;
    }

    static setMaxVel(obj, maxVel){
        for(let key in obj.maxVels) obj.maxVels[key] = maxVel
    }
}