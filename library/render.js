import GameEngine from "./GameEngine.js";
const backgroundCanvas = document.getElementById("background");
const middlegroundCanvas = document.getElementById("middleground");
const foregroundCanvas = document.getElementById("foreground");

let width = middlegroundCanvas.width;
let height = middlegroundCanvas.height;

export default class Render{
  static background = {
    name: "background",
    canvas: backgroundCanvas,
    ctx: backgroundCanvas.getContext("2d"),
    items: [],
    delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
    };

  static middleground = {
    name: "middleground",
    canvas: middlegroundCanvas,
    ctx: middlegroundCanvas.getContext("2d"),
    items: [],
    delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
    }

  static foreground = {
    name: "foreground",
    canvas: foregroundCanvas,
    ctx: foregroundCanvas.getContext("2d"),
    items: [],
    delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
  }

  static layers = [this.background, this.middleground, this.foreground];

  static init(){
    for(let layer of this.layers) this.setDemensions(layer);
  }

  static getArrayFromLayer(targetLayer){
    for(var layer of this.layers){
      if(layer.name == targetLayer) return layer;
    }
    return null;
  }

  static addToLayer(item, layer){
    if(!layer && item.render.layer) layer = item.render.layer;
    else if(!layer && !item.render.layer) layer = 'middleground';
    if(!item.render.layer) item.render.layer = layer;
    
    item.render.moveToLayer = this.moveToLayer;
    this.getArrayFromLayer(layer).items.push(item);
  }

  static removeFromLayer(item){  
    this.getArrayFromLayer(item.render.layer).delete(item);
    item.render.moveToLayer = null;
    item.render.layer = null;
  }

  static moveToLayer(item, layer){  
    Render.removeFromLayer(item);
    Render.addToLayer(item, layer);  
  }

  static update(){
    for (const layer of this.layers) {
      this.renderItems(layer);
    }
  }
    
  static renderItems(layer){
    let ctx = layer.ctx;
    this.setDemensions(layer.canvas);
    ctx.clearRect(0,0,width,height)

    for(let item of layer.items){
      if(!item.render.visible) continue;      
      ctx.beginPath();

      if(item.render.opacity) ctx.globalAlpha = item.render.opacity;
      else ctx.globalAlpha = 1;

      if(item.shape == "line"){
        this.renderLine(item, ctx);
        continue;
      }else if(item.type == 'text') {        
        this.renderText(item,ctx);
        continue;
      }
      else if(item.shape == "rectangle") ctx.rect(item.x, item.y, item.width, item.height)
      else if(item.shape == "circle") ctx.arc(item.x, item.y, item.r, 0, (2 * Math.PI));
      
      if(item.render.stroke){
        ctx.lineWidth = item.render.strokeWidth;
        ctx.strokeStyle = item.render.strokeColor;
        ctx.stroke();
      }
      
      if(item.render.fill){
        ctx.fillStyle = item.render.color;
        ctx.fill();
      }
      ctx.closePath();
    }
  }

  static setDemensions(canvas){
    canvas.width = GameEngine.canvasDimenions.width ;
    canvas.height = GameEngine.canvasDimenions.height;
  }

  static renderLine(item, ctx){
    ctx.moveTo(item.x1, item.y1);
    ctx.lineTo(item.x2, item.y2);
    ctx.lineWidth = item.size;
    ctx.strokeStyle = item.render.color;
    ctx.stroke();
    ctx.closePath();
  }
  
  static renderText(item, ctx){
    ctx.font = item.font;
    ctx.fillStyle = item.render.color;
    ctx.textAlign = item.align;
    ctx.textBaseline = item.baseLine;
    ctx.lineWidth = item.render.strokeWidth;
    
    if(item.render.stroke) ctx.strokeText(item.text, item.x, item.y);
    if(item.render.fill) ctx.fillText(item.text, item.x, item.y)
    ctx.closePath();
  }
}