import { squareIntersects } from "../../utils.js";
let collisionType = "";
let collisionObjs = [];

export function setCollisionType(type){
    collisionType = type
}

export function getCollisionType(){
    return collisionType;
}

export function addItem(item){
    if(!item) return;
    if(item.shape == "line") return;
    if( collisionObjs.find(colItem => colItem == item)){
        throw ('Item Id: ' +item.id+ " had already been added to collisions");
        console.log(find);
        
        debugger
        return;    
    }
    collisionObjs.push(item);
}

export function removeItem(item){
    collisionObjs = collisionObjs.filter(removeObj => removeObj != item);
}

export function update(){    
    if(!collisionType) throw "Set propper render type in 'collision_detection.js'";
    for(var i = 0; i < collisionObjs.length; i++){
            for(var j = 0; j < collisionObjs.length; j++){
            if(i == j) continue;
            
            let obj1 = collisionObjs[i];
            let obj2 = collisionObjs[j];
            
            let colCheck;
            if(collisionType == "rectangle") colCheck = squareIntersects(obj1, obj2);
            else if(collisionType == "circle") colCheck = circleCollisionCheck(obj1,obj2);
            
            if(colCheck) obj1.onCollision(obj2);
          
            if(obj1.collisions){
                let foundItem = obj1.collisions.find(item => item == obj2)
                if(colCheck && !foundItem){
                    obj1.collisions.push(obj2);
                }
                else if(!colCheck && foundItem) obj1.collisions = obj1.collisions.filter(item => item != obj2);
            }
        }
    }
}

function circleCollisionCheck(obj1,obj2){
    let a = obj1.x - obj2.x;
    let b = obj1.y - obj2.y;
    let c = Math.sqrt(a * a + b *b)

    let radii = obj1.r + obj2.r;
    return radii >= c;
}