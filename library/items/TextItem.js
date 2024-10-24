import Item from "./Item.js";

export default class Text extends Item{
    static defaultSize = 12;
    static defaultFont = 'Ariel';

    constructor(x,y,size,font,text){
        super('text')
        if(!size) size = Text.defaultSize;
        if(!font) font = Text.defaultFont;

        this.x = x;
        this.y = y;
        this.font = size + "px " + font;
        this.text = text;

        this.color = 'black';
        this.stroke = false;
        this.isVisible = true;
    }
}