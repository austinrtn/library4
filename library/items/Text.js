import Item from "./Item.js";

export default class Text extends Item{
    static defaultSize = 12;
    static defaultFont = 'Serif';

    constructor(x,y,size,font,text){
        super('text')
        if(!size) size = Text.defaultSize;
        if(!font) font = Text.defaultFont;

        this.x = x;
        this.y = y;
        this.size = size;
        this.text = text;
        this.setFont(size, font) 

        this.baseLine = 'middle';
        this.align = 'center';

        this.render = {};
        this.render.visible = true;
        this.render.color = 'black';
        this.render.strokeColor = 'black';
        this.render.fill = true;
        this.render.stroke = true;
        this.render.strokeWidth = 1;
        this.render.opacity = 1;
    }

    setFont(size, font){
        if(!size) size = this.size;
        this.font = size + "px " + font;        
    }
}