export default class GravityProccessor {
    constructor(rateOfGravity, maxGravity){
        this.rateOfGravity = rateOfGravity;
        this.maxGravity = maxGravity;

        this.items = [];
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(item){
        this.items = this.items.filter(removeItem => item =! removeItem)
    }

    update(){
        for(let item of this.items){
            this.checkIfFalling(item);
            if(item.falling && item.vY < this.maxGravity) item.vY += this.rateOfGravity;
        }
    }

    checkIfFalling(item){
        if(item.falling && item.touchingFloor) item.vY = 0;
        if(!item.touchingFloor && item.applyGravity) item.falling = true;
        else item.falling = false;
    }
}

export function checkIfTouchingFloor(fallingItem, platform){
    if(platform.type == 'floor' || platform.isFloor) {
        return true;
    }
    else return false;
    //put in updateCollision function of item
}