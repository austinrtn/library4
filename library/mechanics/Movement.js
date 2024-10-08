import { inject } from "./Mechanics.js";
import GameEngine from "../GameEngine.js";
import { SideDetection } from "../classes/DetectionObj.js";
import { getDistance, containsPointInSquare, point } from "../utils/utils.js";


export class Movement {
    static Name = 'Movement';
    
    static DefaultData = {
        vX: 0,
        vY: 0,

        accelerate: true,
        accelerationSpeed: 0.01,
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
        moveTo: Movement.MoveTo,
        stopMoving: Movement.StopMoving,
        applyFriction: Movement.ApplyFriction,
        setMaxVel: Movement.setMaxVel,
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
        if(!GameEngine.MainEngine.deltaMulti) return;
        
        if(obj.maxVels.right && obj.vX >= obj.maxVels.right) obj.vX = obj.maxVels.right;
        else if(obj.maxVels.left && obj.vX <= -obj.maxVels.left) obj.vX = -obj.maxVels.left;
        else if(obj.maxVels.down && obj.vY >= obj.maxVels.down) obj.vY = obj.maxVels.down;
        else if(obj.maxVels.up && obj.vY <= -obj.maxVels.up) obj.vY = -obj.maxVels.up;
        

        obj.x += obj.vX * GameEngine.MainEngine.deltaMulti;
        obj.y += obj.vY * GameEngine.MainEngine.deltaMulti;

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
        let center;
        if(target && !obj.target) obj.target = target;
        else if(!target && obj.target) target = obj.target;

        if(obj.shape === 'rectangle'){
            center = obj.getCenter();
            if(obj.sides.top || obj.sides.left || obj.sides.right || obj.sides.bottom) return;
        } else if(obj.shape === 'circle'){
            center = {x:obj.x, y:obj.y}
        }

        let dist = getDistance(center, target);
        let xPer = -dist.x / dist.total; 
        let yPer = -dist.y / dist.total;
        
        obj.vX = obj.currentAcceleration * xPer;
        obj.vY = obj.currentAcceleration * yPer;


        if(obj.currentAcceleration < obj.maxAccele) obj.currentAcceleration += obj.accelerationSpeed

        console.log(obj.currentAcceleration);
        
        
        if(dist.total < 1){
          obj.stopMoving(obj);
        }
    }

    static StopMoving(obj){
        if(obj.target) obj.target = null;
        obj.vX = 0;
        obj.vY = 0;
        obj.currentAcceleration = 0;
    }

    static setMaxVel(obj, maxVel){
        for(let key in obj.maxVels) obj.maxVels[key] = maxVel
    }
}