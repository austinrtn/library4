import { Movement } from "./Movement.js";
import { Gravity } from "./Gravity.js";
import { Jumping } from "./Jumping.js";

export const Mechanics = {
    Movement: Movement,
    Gravity: Gravity, 
    Jumping: Jumping,
}

export function inject(obj, data, mechanism){
    if(obj.injections.find(injection => injection === mechanism.Name)) return; //Check if dependency already injected

    if(mechanism.Dependencies){ //INSTALL DEPENDENCIES
        for(let dependency of mechanism.Dependencies)
            if(mechanism.Dependencies && !obj.injections.find(injection => injection == dependency)) Mechanics[dependency].Inject(obj, data)
    }

    if(!data) data = mechanism.DefaultData;
        
        for(let key in mechanism.Injections) obj[key] = mechanism.Injections[key];
        obj.updateFunctions.push(obj['update' + mechanism.name]);
        
        for(let key in mechanism.DefaultData){
            let value;
            if(!data[key]) value = mechanism.DefaultData[key];
            else value = data[key];
            obj[key] = value
        };
        
        if(mechanism.Detections) for(let det of mechanism.Detections) obj.loadDetections(det);
        obj.injections.push(mechanism.name);
}

/******TEMPLATE*******
 * 
import { inject } from "./mechanics.js";

export class ClassName {
    static ClassName = '';

    static DefaultData = {
     
    };
    
    static Injections = {
      updateClassName: ClassName.update,
    };

    static Detections = [];
    static Dependencies = [];

    static Inject(obj, data){
        inject(obj, data, ClassName)
    }

    static Update(obj){

    }
}

*/