import * as Controller from "./controller.js";
import * as Collision from "./physics/collision_detection/classicCollisionDetection.js"
import * as Util from "./utils/utils.js";
import * as Render from "./render.js";

export default class GameEngine {
    static MainEngine = null;

    static SetGameEngine(engine){
        GameEngine.MainEngine = engine;
    }

    static GetGameEngine(){
        return GameEngine.MainEngine;
    }

    static Message(){
        let sentMsg = localStorage.setItem('intro-message');

    }

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
        GameEngine.Message();
        GameEngine.SetGameEngine(this);
        if(func) func();
        window.requestAnimationFrame(this.loop);
    }

    update(func){
        if(func) this.updateFunc = func;
    }

    loop(timeStamp){
        let engine = GameEngine.GetGameEngine();

        if(!engine.looping){  
            window.requestAnimationFrame(engine.loop);
            return;
        }

        if(engine.logFps) console.log(engine.fps);

        engine.totalElapsed += timeStamp
        engine.timePassed = (timeStamp - engine.lastTimestamp);
        engine.lastTimestamp = timeStamp;
        engine.fps = Math.round(1000 / Number(engine.timePassed))

        if(engine.updateFunc) engine.updateFunc();
        if(engine.autoDelete) for(let i = 0; i < engine.items.length; i++) if(engine.items[i].markForDeletion) engine.removeItems(allItems[i])

        Controller.update();
        if(engine.collisionType == 'QUADTREE') qtp.update();
        else if(engine.collisionType == 'CLASSIC') Collision.update();
        
        Render.update();
        
        window.requestAnimationFrame(engine.loop);
    }

    createItems(...items){
        if(!items || !items[0]) return;
        if(items[0].length > 1) items = items[0];
        
        for(var item of items){
            this.items.push(item)
            Render.addToLayer(item);
            if(this.collisionType == 'quadtree') qtp.addItem(item);
            else if(this.collisionType == 'CLASSIC' && item.collidable) Collision.addItem(item);

            if(item.controllable) Controller.addToController(item);
        }
    }

    removeItems(...items) {
        if(!items || !items[0]) return;
        if(items[0].length > 1) items = items[0];

        for(var item of items){
            this.items = this.items.filter(removeItem => removeItem != item);
            Render.removeFromLayer(item)
            if(collisionType == COLLISION_TYPES.QUADTREE) qtp.removeItem(item);
            else if(collisionType == COLLISION_TYPES.CLASSIC) Collision.removeItem(item);
    
            if(item.controllable) Controller.removeFromController(item);
        }
    }
}