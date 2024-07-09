class DetectionObj{
    constructor(detections, func){
        this.detections = detections;
        this.func = func;
    }
}

export const SideDetection = new DetectionObj({
    touchingFloor: false,
    touchingWall: false,
    touchingCeiling: false,
    sides: {
        top: false,
        right: false,
        bottom: false,
        left: false
    }
}, (detections, item, mainObj)=> {
    if(item.type == 'platform' || item.isPlatform){
        let side = mainObj.getSideOfCollision(item).side;

        if(side == 'top') {
            detections.touchingCeiling = true;
            detections.sides.top = true;
        } else if(side == 'right'){
            detections.touchingWall = true;
            detections.sides.right = true;
        } else if(side == 'bottom'){
            detections.touchingFloor = true;
            detections.sides.bottom = true;
        } else if(side == 'left'){
            detections.touchingWall = true;
            detections.sides.left = true;
        }
    }
});