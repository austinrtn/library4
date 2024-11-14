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
        this.setFont(size, font)
        
        this.text = text;

        this.color = 'black';
        this.strokeColor = 'black';
        this.fill = true;
        this.stroke = true;
        this.strokeWidth = 1;
        
        this.opacity = 1;
        this.baseLine = 'middle';
        this.align = 'center';
        this.isVisible = true;
    }

    setFont(size, font){
        if(!size) size = this.size;
        this.font = size + "px " + font;        
    }
}