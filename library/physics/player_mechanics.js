import { SideDetection } from "../classes/DetectionObj.js";

export class Movement {
    static getDefaults(){
        return {
            acc: 0.1,
            friction: 0.1,
            maxVX: 2,
        }
    }

    static Update(obj){
        Movement.Move(obj);
        if(obj.friction) Movement.ApplyFriction(obj)
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

    constructor(obj, data){
        obj.injections.push('movement')
        this.obj = obj;

        if(!data) data = Movement.getDefaults();
        this.data = data;

        this.inject();
    }

    inject(){
        let obj = this.obj;

        obj.vX = 0;
        obj.vY = 0;
        obj.beingMoved = false;

        for(let key in Movement.getDefaults()){
            let value;
            if(!this.data[key]) value = Movement.getDefaults()[key];
            else value = this.data[key];
            obj[key] = value
        };
      
        obj.loadDetections(SideDetection);

        obj.updateFunctions.push(Movement.Update)

        let bar =()=>{
            console.log(obj);
        }

        obj.bar = bar;

    }
}

export class Jumping {
    static getDefaults(){
        return {
            jumpHeight: 2,
            doWallJump: true,
            doDoubleJump: false,
        }
    }

    static Update(obj){
        if(obj.touchingCeiling) obj.vY = 0;
    }

    static Jump(obj){
        if(obj.doWallJump && !obj.touchingFloor && obj.touchingWall) Jumping.WallJump(obj);
        if(obj.falling) return false;

        obj.vY = -obj.jumpHeight;
    }

    static WallJump(obj){
        if(obj.sides.right){
            obj.vX = -2;
        } else if(obj.sides.left){
            obj.vX = 2;
        } 
        obj.vY = -obj.jumpHeight;
    }
    
    constructor(obj, data){
        obj.injections.push('jumping')

        if(!obj.injections.find(injection => injection == 'movement')) new Movement(obj, null);
        if(!data) data = Jumping.getDefaults();

        this.obj = obj;
        this.data = data;
        
        this.inject(obj);
    }

    inject(obj){
        for(let key in Jumping.getDefaults()){
            let value;
            if(!this.data[key]) value = Jumping.getDefaults()[key];
            else value = this.data[key];
            obj[key] = value
        };

        obj.updateFunctions.push(Jumping.Update)

    }
}