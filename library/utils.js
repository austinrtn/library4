export function getDistance(point1,point2){
    let a = (point1.x - point2.x);
    let b = (point1.y - point2.y);
    let c = Math.sqrt(a*a + b*b);

    return {
        x: a,
        y: b, 
        total: c
    };
}

export function getDistanceRect(rect1, rect2){
    return getDistance(rect1.getCenter(), rect2.getCenter());
}

export function getRelativePosition(mainItem, subItem){
    let xPos = 'centered';
    let yPos = 'centered';

    if(mainItem.x < subItem.x) xPos = 'left';
    else if(mainItem.x > subItem.x) xPos = 'right';

    if(mainItem.y < subItem.y) yPos = 'above';
    else if(mainItem.y > subItem.y) yPos = 'below';

    return {
        xPos: xPos,
        yPos: yPos
    }
}   

export function getDiagnalVelocity(point1, point2, velocity){
    let dist = getDistance(point1, point2);
    let xForce = dist.x / dist.total;
    let yForce = dist.y / dist.total;

    return {
        x: -(velocity * xForce), 
        y: -(velocity * yForce)
    }
}

export function removeFromArray(item, arrObj){
    arrObj.arr = arrObj.arr.filter(removeItem => removeItem !== item);
    return arrObj.arr;
}

export function rand(int1, int2){
    return Math.floor(int1 + Math.random() * int2);
}

export function randRange(int1, int2){
    return Math.floor(int1 + Math.random() * (int2 - int1));
}

export function randNeg(int, chance){
    if(!chance) chance = 50;
    if(rand(0,99) < chance) int *= -1;
    return int;
} 

export function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x:x, y:y};
}

export function containsPointInSquare(point, obj){
    return (
        point.x >= obj.x &&
        point.x < obj.x + obj.width &&
        point.y >= obj.y &&
        point.y < obj.y + obj.height
    );
}


export function containsPointInCircle(obj, point){
    let d = Math.pow((point.x - obj.x), 2) + Math.pow((point.y - obj.y), 2);
    return d <= (obj.r * obj.r);
}

export function circleIntersects(obj1, obj2){
    let dist = getDistance(obj1, obj2);
    let radii = obj1.r + obj2.r;
    return Math.pow(radii,2) >= dist;
}

export function point(x,y){
    return {
        x: x,
        y: y
    }
}

export function getAngleByPoints(point1, point2){
    let dy = point2.y - point1.y;
    let dx = point2.x - point1.x;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    
    return theta;
}

export function vector(mag, angle){
    angle = (angle * Math.PI) / 180;

    return {
        dx: mag * Math.cos(angle),
        dy: mag * Math.sin(angle)
    }
}

export function getSymetricalPointsInCircle(amount, circle){
    let degree = 360/amount
    let current = 0;
    let points = [];
    for(let i = 0; i < amount; i++){
        let x = circle.r * Math.cos(current * (Math.PI/180)) + circle.x;
        let y = circle.r * Math.sin(current * (Math.PI/180)) + circle.y;

        points.push(point(x,y));
        current += degree;        
    }

    return points;
}
