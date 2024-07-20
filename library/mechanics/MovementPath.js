import { inject } from "./Mechanics.js";

export class MovementPath {
    static MovementPath = '';

    static DefaultData = {
        looping: true,
        path: [],
        pathIndex: 0,
        defaultPathTimeout: 0,
    };
    
    static Injections = {
      updateMovementPath: MovementPath.Update,
      selectNextTarget: MovementPath.SelectNextTarget,
    };

    static Dependencies = ['Movement'];

    static Inject(obj, data){
        if(Array.isArray(obj)) for(let o of obj) inject(o, data, MovementPath);
        else inject(obj, data, MovementPath);
    }

    static Update(obj){
        obj.selectNextTarget(obj);
    }

    static SelectNextTarget(obj){
        if(!obj.path || obj.path.length == 0 || obj.target || obj.waitingNextPath) return;
        let target = obj.path[obj.pathIndex];
        
        let timeout;
        if(target.timeout) timeout = target.timeout;
        else timeout = obj.defaultPathTimeout;

        obj.waitingNextPath = true;

        setTimeout(()=>{ 
            obj.target = target;
            obj.pathIndex++;
            
            if(obj.pathIndex >= obj.path.length) obj.pathIndex = 0;
            obj.waitingNextPath = false;
        }, timeout)
    }
}