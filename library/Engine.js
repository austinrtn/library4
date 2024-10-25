import * as Controller from "./controller.js";
import * as Collision from "./physics/collision_detection/classicCollisionDetection.js"
import * as Render from "./render.js";

class Engine {
    static Message(){
        let sentMsg = localStorage.getItem('message');
        let msg = "Austin's Platforming Library v0.05";

        if(!sentMsg){ 
            localStorage.setItem('message', true);
            console.log(msg);
        }
    }

    constructor(collisionType){
        if(collisionType != 'rectangle' && collisionType != 'circle')
            alert("Please pass valid arguement for 'collisionType' for new Engine object ('rectangle' || 'circle)'")
        
        Collision.setCollisionType(collisionType);

        this.looping = true;
        this.logFps = false;

        this.totalElapsed = 0;
        this.lastTimeStamp = 0;
        this.fps = 0;

        this.fpsTarget = 1000 / 70;
        this.deltaTime = 0;
        this.deltaTimeMultiplier = 0;

        this.items = [];

        this.autoDelete = true;
        this.updateFunc = null;

        this.collisionType = 'CLASSIC'
    }

    start(func){
        Engine.Message();
        
        if(func) func();
        window.requestAnimationFrame(this.loop);
    }

    update(func){
        if(func) this.updateFunc = func;
    }

    loop(timeStamp){
        let engine = getGameEngine();

        if(!engine.looping){  
            window.requestAnimationFrame(engine.loop);
            return;
        }

        if(engine.logFps) console.log(engine.fps);

        engine.totalElapsed += timeStamp
        engine.deltaTime = (timeStamp - engine.lastTimeStamp);
        engine.deltaTimeMultiplier = engine.deltaTime / engine.fpsTarget
        engine.lastTimeStamp = timeStamp;
        engine.fps = Math.round(1000 / Number(engine.deltaTime))

        if(engine.updateFunc) engine.updateFunc();
        if(engine.autoDelete) for(let i = 0; i < engine.items.length; i++) if(engine.items[i].markForDeletion) engine.removeItems(allItems[i])

        Controller.update();
        if(engine.collisionType == 'QUADTREE') qtp.update();
        else if(engine.collisionType == 'CLASSIC') Collision.update();
        
        Render.update();
        
        window.requestAnimationFrame(engine.loop);
    }

    createItems(collidable, ...items){
        if(!items || !items[0]) return;
        if(items[0].length > 1) items = items[0];
        
        for(var item of items){
            this.items.push(item)
            Render.addToLayer(item);
            if(item.type == 'text') continue;
            
            if(this.collisionType == 'quadtree') qtp.addItem(item);
            else if(this.collisionType == 'CLASSIC' && collidable) this.addCollision(item);

            if(item.controllable) Controller.addToController(item);
        }
    }

    removeItems(...items) {
        if(!items || !items[0]) return;
        if(items[0].length > 1) items = items[0];

        for(var item of items){
            this.items = this.items.filter(removeItem => removeItem != item);
            Render.removeFromLayer(item)
            if(this.collisionType == 'quadtree') qtp.removeItem(item);
            else if(this.collisionType == 'CLASSIC' && item.collidable) Collision.removeItem(item);
    
            if(item.controllable) Controller.removeFromController(item);
        }
    }

    addCollision(item){
        Collision.addItem(item)
    }

    removeCollision(item){
        Collision.removeItem(item)
    }
}

const GameEngine = new Engine('circle');

function getGameEngine(){
    return GameEngine;
}

export default GameEngine;
