import * as Controller from "./controller.js";
import * as Collision from "./physics/collision_detection/classicCollisionDetection.js"
import * as Util from "./utils/utils.js";
import * as Render from "./render.js";

export default class GameEngine {
    constructor(){
        this.looping = true;
        this.logFps = false;

        this.timePassed = 0;
        this.totalElapsed = 0;
        this.lastTimeStamp = 0;
        this.fps = 0;

        this.items = [];

        this.autoDelete = true;
        this.updateFunc = null;

        this.collisionType = 'CLASSIC'
    }

    start(func){
        if(func) func();
        window.requestAnimationFrame(this.loop);
    }

    update(func){
        if(func) this.updateFunc = func;
    }

    loop(timeStamp){
        if(!this.looping){  
            window.requestAnimationFrame(this.loop);
            return;
        }

        if(this.logFps) console.log(this.fps);

        this.totalElapsed += timeStamp
        this.timePassed = (timeStamp - this.lastTimestamp);
        this.lastTimestamp = timeStamp;
        this.fps = Math.round(1000 / Number(this.timePassed))

        if(updateFunc) this.updateFunc();
        if(this.autoDelete) for(let i = 0; i < this.items.length; i++) if(this.items[i].markForDeletion) this.removeItems(allItems[i])

        Controller.update();
        if(this.collisionType == 'QUADTREE') qtp.update();
        else if(this.collisionType == 'CLASSIC') Collision.update();
        
        Render.update();
        
        window.requestAnimationFrame(this.loop);
    }

    createItems(...items){
        if(!items || !items[0]) return;
        if(items[0].length > 1) items = items[0];
        
        for(var item of items){
            allItems.push(item)
            Render.addToLayer(item);
            if(collisionType == COLLISION_TYPES.QUADTREE) qtp.addItem(item);
            else if(collisionType == COLLISION_TYPES.CLASSIC && item.collidable) Collision.addItem(item);

            if(item.controllable) Controller.addToController(item);
        }
    }
}