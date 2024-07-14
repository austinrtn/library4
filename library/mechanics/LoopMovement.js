import { inject } from "./Mechanics.js";

export class LoopMovement {
    static LoopMovement = '';

    static DefaultData = {
        looping: true,
        path: [],
        pathIndex: 0,
    };
    
    static Injections = {
      updateLoopMovement: LoopMovement.Update,
    };

    static Dependencies = ['Movement'];

    static Inject(obj, data){
        if(Array.isArray(obj)) for(let o of obj) inject(o, data, LoopMovement);
        else inject(obj, data, LoopMovement);
    }

    static Update(obj){

    }

    static loopMovement(obj){
        if(!obj.path || obj.path.length == 0) return;

        if(!obj.target){

        } else {
            
        }
        let target = obj.path[obj.pathIndex];
        
        obj.moveTo(obj,target);
    }
}