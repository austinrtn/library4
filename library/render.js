const backgroundCanvas = document.getElementById("background");
const middlegroundCanvas = document.getElementById("middleground");
const foregroundCanvas = document.getElementById("foreground");

let width = middlegroundCanvas.width;
let height = middlegroundCanvas.height;

export default class Render{
  static background = {
    name: "background",
    ctx: backgroundCanvas.getContext("2d"),
    items: [],
    delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
    };

  static middleground = {
    name: "middleground",
    ctx: middlegroundCanvas.getContext("2d"),
    items: [],
    delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
    }

  static foreground = {
    name: "foreground",
    ctx: foregroundCanvas.getContext("2d"),
    items: [],
    delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
  }

  static layers = [this.background, this.middleground, this.foreground];

  static getArrayFromLayer(targetLayer){
    for(var layer of this.layers){
      if(layer.name == targetLayer) return layer;
    }
    return null;
  }

  static addToLayer(item, layer){
    if(!layer && item.renderLayer) layer = item.renderLayer;
    else if(!layer && !item.renderLayer) layer = 'middleground';
    if(!item.renderLayer) item.renderLayer = layer;
    
    item.moveToLayer = this.moveToLayer;
    this.getArrayFromLayer(layer).items.push(item);
  }

  static removeFromLayer(item){  
    this.getArrayFromLayer(item.renderLayer).delete(item);
    item.moveToLayer = null;
    item.renderLayer = null;
  }

  static moveToLayer(item, layer){  
    Render.removeFromLayer(item);
    Render.addToLayer(item, layer);  
  }

  static update(){
    for (const layer of this.layers) {
      this.renderItems(layer.ctx, layer);
    }
  }

    
  static renderItems(ctx, layer){
    ctx.clearRect(0,0,width,height)
    for(let item of layer.items){
      if(!item.isVisible) continue;

      ctx.beginPath();

      if(item.opacity) ctx.globalAlpha = item.opacity;
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
      
      if(item.stroke){
        ctx.lineWidth = item.strokeWidth;
        ctx.strokeStyle = item.strokeColor;
        ctx.stroke();
      }
      
      if(item.fill){
        ctx.fillStyle = item.color;
        ctx.fill();
      }
      ctx.closePath();
    }
  }

  static renderLine(item, ctx){
    ctx.moveTo(item.x1, item.y1);
    ctx.lineTo(item.x2, item.y2);
    ctx.lineWidth = item.size;
    ctx.strokeStyle = item.color;
    ctx.stroke();
    ctx.closePath();
  }
  
  static renderText(item, ctx){
    ctx.font = item.font;
    ctx.fillStyle = item.color;
    ctx.textAlign = item.align;
    ctx.textBaseline = item.baseLine;
    ctx.lineWidth = item.strokeWidth;
    
    if(item.stroke) ctx.strokeText(item.text, item.x, item.y);
    if(item.fill) ctx.fillText(item.text, item.x, item.y)
    ctx.closePath();
  }
}