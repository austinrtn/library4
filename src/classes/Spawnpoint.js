import { Rectangle } from "../../library/classes/shapes.js";

export default class SpawnPoint extends Rectangle{
    constructor(x,y,player){
        super(x,y,10,10,'light-blue', 'spawnpoint');
        this.player = player;

        this.opacity = .3;
        this.collidable = false;
    }

    load(){
        this.player.x = this.x;
        this.player.y = this.y;
    }
}