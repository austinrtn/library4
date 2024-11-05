import { getDistance } from "../../utils.js";

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
            if(obj1.shape == 'rectangle' && obj2.shape == 'rectangle') colCheck = rectangleCollisionCheck(obj1, obj2);
            else if(obj1.shape == 'circle' && obj2.shape == 'circle') colCheck =circleCollisionCheck(obj1, obj2);
            else if((obj1.shape == 'rectangle' && obj2.shape == 'circle') || 
                        obj1.shape == 'circle' && obj2.shape == 'rectangle') colCheck =rectCircleCollisionCheck(obj1, obj2);
            
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

export function rectangleCollisionCheck(obj1, obj2){
    return !(
        obj1.x > obj2.x + obj2.width ||
        obj1.x + obj1.width < obj2.x ||
        obj1.y > obj2.y + obj2.height || 
        obj1.y + obj1.height < obj2.y
    );
}

function circleCollisionCheck(obj1,obj2){
    let a = obj1.x - obj2.x;
    let b = obj1.y - obj2.y;
    let c = Math.sqrt(a * a + b *b)

    let radii = obj1.r + obj2.r;
    return radii >= c;
}

function rectCircleCollisionCheck(obj1, obj2){
    let rect;
    let circle; 

    if(obj1.shape == 'rectangle') {
        rect = obj1;
        circle = obj2;
    } else {
        rect = obj2;
        circle = obj1;
    }

    
    let distance = getDistance(circle, rect.getCenter());
    let distX = Math.abs(distance.x);
    let distY = Math.abs(distance.y);
    let cornerDist;

    if(distX > (rect.width/2 + circle.r)) return false;
    if(distY > (rect.height/2 + circle.r)) return false;

    if(distX <= rect.width/2) return true;
    if(distY <= rect.height/2) return true; 

    cornerDist = Math.sqrt(distX - rect.width/2);
    cornerDist += Math.sqrt(distY - rect.height/2);

    return (cornerDist <= ((circle.r/2)));
}