import { inject } from "./Mechanics.js";

export class Gravity {
    static Name = 'Gravity';

    static DefaultData = {
        falling: true, 
        applyGravity: true,
        rateOfGravity: 0.05,
        maxGravity: 7,
    };
    
    static Injections = {
      updateGravity: Gravity.Update,
      checkIfFalling: Gravity.CheckIfFalling
    };

    static Dependencies = ['Movement'];

    static Inject(obj, data){
        if(Array.isArray(obj)) for(let o of obj) inject(o, data, Gravity);
        else inject(obj, data, Gravity);

        obj.maxVels.down = obj.maxGravity;
    }

    static Update(obj){
        obj.checkIfFalling(obj);
        if(obj.falling && obj.vY < obj.maxGravity) obj.vY += obj.rateOfGravity;
    }

    static CheckIfFalling(obj){
        if(obj.falling && obj.touchingFloor) obj.vY = 0;
        if(!obj.touchingFloor && obj.applyGravity) obj.falling = true;
        else obj.falling = false;
    }
}
