const backgroundCanvas = document.getElementById("background");
const middlegroundCanvas = document.getElementById("middleground");
const foregroundCanvas = document.getElementById("foreground");

let width = middlegroundCanvas.width;
let height = middlegroundCanvas.height;

const background = {
  name: "background",
  ctx: backgroundCanvas.getContext("2d"),
  items: [],
  delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
}
const middleground = {
  name: "middleground",
  ctx: middlegroundCanvas.getContext("2d"),
  items: [],
  delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
}
const foreground = {
  name: "foreground",
  ctx: foregroundCanvas.getContext("2d"),
  items: [],
  delete: function(item){this.items = this.items.filter(removeObj => removeObj !== item)}
}

const layers = [background, middleground, foreground];

function getArrayFromLayer(targetLayer){
  for(var layer of layers){
    if(layer.name == targetLayer) return layer;
  }
  return null;
}

export function addToLayer(item, layer){
  if(!layer && item.renderLayer) layer = item.renderLayer;
  else if(!layer && !item.renderLayer) layer = 'middleground';
  if(!item.renderLayer) item.renderLayer = layer;
  
  item.moveToLayer = moveToLayer;
  getArrayFromLayer(layer).items.push(item);
}

export function removeFromLayer(item){  
  getArrayFromLayer(item.renderLayer).delete(item);
  item.moveToLayer = null;
  item.renderLayer = null;
}

export function moveToLayer(item, layer){  
  removeFromLayer(item);
  addToLayer(item, layer);  
}

export function update(){
  for (const layer of layers) {
    renderItems(layer.ctx, layer);
  }
}

function renderItems(ctx, layer){
    ctx.clearRect(0,0,width,height)
    for(let item of layer.items){
      if(!item.isVisible) continue;

      ctx.beginPath();

      if(item.shape == "line"){
        renderLine(item, ctx);
        continue;
      }else if(item.type == 'text') {        
        renderText(item,ctx);
        continue;
      }
      else if(item.shape == "rectangle") ctx.rect(item.x, item.y, item.width, item.height)
      else if(item.shape == "circle") ctx.arc(item.x, item.y, item.r, 0, (2 * Math.PI));
      
      ctx.lineWidth = 1;
      if(item.stroke){
        ctx.stroke();
        ctx.strokeStyle = item.strokeColor;
      }
      if(item.opacity) ctx.globalAlpha = item.opacity;
      else ctx.globalAlpha = 1;
      
      if(item.fill){
        ctx.fillStyle = item.color;
        ctx.fill();
      }
      ctx.closePath();
      }
  }

  function renderLine(item, ctx){
    ctx.moveTo(item.x1, item.y1);
    ctx.lineTo(item.x2, item.y2);
    ctx.lineWidth = item.size;
    ctx.strokeStyle = item.color;
    ctx.stroke();
    ctx.closePath();
  }

  function renderText(item, ctx){
    ctx.font = item.font;
    ctx.fillStyle = item.color;
    if(item.stroke) ctx.strokeText(item.text, item.x, item.y);
    else ctx.fillText(item.text, item.x, item.y)
    ctx.closePath();
  }

  function renderCircles(ctx,items){
    for (const item of items) {
      if(!item.isVisible) continue;
      ctx.beginPath();
      ctx.arc(100, 75, 50, 0, 2 * Math.PI);

      if(item.stroke) ctx.stroke();
      if(item.opacity) ctx.globalAlpha = item.opacity;
      else ctx.globalAlpha = 1;
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.closePath();

    }

  }