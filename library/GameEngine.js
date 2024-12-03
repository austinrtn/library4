import * as Controller from "./controller.js";
import CollisionDetection from "./CollisionDetection.js"
import Render from "./Render.js";

const middleground = document.getElementById('middleground');

export default class GameEngine {
    static looping = true;
    static logFps = false;

    static totalElapsed = 0;
    static lastTimeStamp = 0;
    static fps = 0;

    static fpsTarget = 1000 / 70;
    static deltaTime = 0;
    static deltaTimeMultiplier = 0;

    static items = [];

    static updateFunc = null;

    static collisionType = 'CLASSIC'
    static canvas = middleground;
    static canvasDimenions = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    
    static sendWelcomeMsg(){
        let sentMsg = localStorage.getItem('message');
        let msg = "Austin's Platforming Library v0.05";

        if(!sentMsg){ 
            localStorage.setItem('message', true);
            console.log(msg);   
        }
    }

    static getWidth(){
        return canvas.width
    }

    static getHeight(){
        return canvas.height;
    }
   
    static start(func){
        this.sendWelcomeMsg();
        this.setCanavsDimenions(null, null, 0);
        if(func) func();
        window.requestAnimationFrame(this.loop);
    }

    static setCanavsDimenions(width, height, margin){
        if(!width) width = this.canvasDimenions.width;
        if(!height) height = this.canvasDimenions.height;
        if(!margin) margin = 0;

        this.canvasDimenions.width = width - margin;
        this.canvasDimenions.height = height - margin;
        Render.init();
    }

    static getCanavsDimenions(){
        return this.canvasDimenions;
    }

    static update(func){
        if(func) this.updateFunc = func;
    }

    static pause(){
        if(!this.looping) this.looping = true;
        else this.looping = false;
    }

    static loop(timeStamp){
        let gm = GameEngine;
        gm.totalElapsed += timeStamp
        gm.deltaTime = (timeStamp - gm.lastTimeStamp);
        gm.deltaTimeMultiplier = gm.deltaTime / gm.fpsTarget
        gm.lastTimeStamp = timeStamp;
        gm.fps = Math.round(1000 / Number(gm.deltaTime))

        if(!gm.looping){  
            window.requestAnimationFrame(gm.loop);
            return;
        }

        if(gm.updateFunc) gm.updateFunc();

        Controller.update();
        if(gm.collisionType == 'QUADTREE') qtp.update();
        else if(gm.collisionType == 'CLASSIC') CollisionDetection.update();
        
        Render.update();
        
        window.requestAnimationFrame(gm.loop);
    }

    static createItems(collidable, ...items){
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

    static removeItems(...items) {
        if(!items || !items[0]) return;
        if(items[0].length > 1) items = items[0];

        for(var item of items){
            this.items = this.items.filter(removeItem => removeItem != item);
            Render.removeFromLayer(item)
            if(this.collisionType == 'quadtree') qtp.removeItem(item);
            else if(this.collisionType == 'CLASSIC' && item.collidable) CollisionDetection.removeItem(item);
    
            if(item.controllable) Controller.removeFromController(item);
        }
    }

    static addCollision(item){
        CollisionDetection.addItem(item)
    }

    static removeCollision(item){
        CollisionDetection.removeItem(item)
    }
}