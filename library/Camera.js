import { getDistance } from "./utils.js";

export default class Camera{
    constructor(zoomScale, panSensitivity){
        if(!zoomScale) zoomScale = 1;
        if(!panSensitivity) panSensitivity = 1;

        this.zoomScale = zoomScale;
        this.panSensitivity = panSensitivity;
        this.items = [];

        this.zoomAmount = 0;
        this.panAmount = {x: 0, y: 0}
    }

    scale(point, inverted){        
        let zoomScale = this.zoomScale;
        if(inverted) zoomScale = -zoomScale;

        this.items.forEach(item => {            
            let distance = getDistance(item, point);
            if(!inverted) item.r += (zoomScale) * item.r;
            //else item.r += (-zoomScale) * item.r;

            if(item.color == 'green') console.log('Green r: ' + item.r);
            
            if((distance.x < 0 && zoomScale > 0) || (distance.x > 0 && zoomScale < 0)) item.x -= Math.abs(distance.x * (zoomScale));           
            else if((distance.x > 0 && zoomScale > 0) || (distance.x < 0 && zoomScale < 0)) item.x += Math.abs(distance.x * (zoomScale));  
            
            if((distance.y < 0 && zoomScale > 0) || (distance.y > 0 && zoomScale < 0)) item.y -= Math.abs(distance.y * (zoomScale));  
            else if((distance.y > 0 && zoomScale > 0) || (distance.y < 0 && zoomScale < 0)) item.y += Math.abs(distance.y * (zoomScale));  
            
        });
        
        this.zoomAmount += zoomScale;
    }

    scale2(point, inverted){        
        let zoomScale = this.zoomScale;
        if(inverted) zoomScale = -zoomScale;

        this.items.forEach(item => {            
            let distance = getDistance(item, point);
            item.r += zoomScale/2
            if(item.color == 'green') console.log('Green r: ' + item.r);
            
            if((distance.x < 0 && zoomScale > 0) || (distance.x > 0 && zoomScale < 0)) item.x -= Math.abs( (zoomScale));           
            else if((distance.x > 0 && zoomScale > 0) || (distance.x < 0 && zoomScale < 0)) item.x += Math.abs( (zoomScale));  
            
            if((distance.y < 0 && zoomScale > 0) || (distance.y > 0 && zoomScale < 0)) item.y -= Math.abs( (zoomScale));  
            else if((distance.y > 0 && zoomScale > 0) || (distance.y < 0 && zoomScale < 0)) item.y += Math.abs( (zoomScale));  
            
        });
        console.log(zoomScale);
        
        this.zoomAmount += zoomScale;
    }

    scaleReset(){
        console.log(this.zoomAmount);
        
        this.items.forEach(item => {
             item.r -= item.r * this.zoomAmount;
            
           if(item.color == 'green') console.log(item.r);
           
           
        })
        this.zoomAmount = 0;
    }

    pan(){

    }

    addItem(...items){
       items.forEach(item => {
        item.camera = {
            radius: item.r,
        }
        this.items.push(item);
       })
    }

    deleteItem(item){
        this.items = this.items.filter(selected => selected !== item);
    }
}