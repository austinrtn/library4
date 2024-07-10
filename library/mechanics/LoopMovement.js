import { inject } from "./Mechanics.js";

export class LoopMovement {
    static LoopMovement = '';

    static DefaultData = {
        looping: true,
        coords: [],
        coordIndex: 0,
    };
    
    static Injections = {
      updateLoopMovement: LoopMovement.Update,
    };

    static Detections = [];
    static Dependencies = ['Movement'];

    static Inject(obj, data){
        inject(obj, data, LoopMovement)
    }

    static Update(obj){

    }

    static loopMovement(obj){
        let target = obj.coords[obj.coordIndex];
        if(!target.x) target.x = obj.x;
        if(!target.y) target.y = obj.y;

        if(containsPointInSquare(obj, target)){
            if(obj.coordIndex <= obj.coords.lenght) obj.coordIndex++;
            else obj.coordIndex = 0;
            return;
        }
    }
}