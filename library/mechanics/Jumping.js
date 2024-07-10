import { inject } from "./Mechanics.js";

export class Jumping {
    static Name = 'Jumping';
    
    static DefaultData = {
        jumping: false,
        jumpHeight: 2,
        doWallJump: true,
        doDoubleJump: false,
    }
    
    static Injections = {
       updateJumping: Jumping.Update, 
       jump: Jumping.Jump,
       wallJump: Jumping.WallJump
    }

    static Dependencies = ['Movement', 'Gravity']

    static Inject(obj, data){
        inject(obj, data, Jumping)
    }

    static Update(obj){
        if(obj.vY >= 0) obj.jumping = false;
        if(obj.jumping && obj.touchingCeiling) obj.vY = 0;
    }
    
    static Jump(obj){
        obj.jumping = true;
        
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
}