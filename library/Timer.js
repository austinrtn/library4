export default class Timer{
    static items = [];

    constructor(targetTime, endFunc){
        this.targetTime = targetTime;
        this.endFunc = endFunc;

        this.lastTime = null;
        this.time = 0;
        this.active = true;
        this.finished = false;  
        this.deleteWhenFinished = false;
    }

    update(){
        if(!this.active) return;

        if(this.lastTime) this.time += Date.now() - this.lastTime;
        this.lastTime = Date.now();
        
        if(this.time >= this.targetTime) this.end();
    }

    end(){        
        if(this.endFunc) this.endFunc();
        this.active = false;
        this.finished = true; 

        if(this.deleteWhenFinished) this.delete();
    }

    reset(){
        this.lastTime = null;
        this.time = 0;
        this.active = true;
        this.finished = false;
    }

    delete(){
        Timer.items = Timer.items.filter(deletedItem => deletedItem !== this);
    }
}