import * as App from '../library/app.js';
import * as Util from '../library/utils/utils.js';
import { Platform } from './classes/blocks.js';
import GravityProccessor from '../library/physics/gravity.js';
import Player from './classes/Player.js';
import SpawnPoint from './classes/Spawnpoint.js';

const middleground = document.getElementById('middleground');

let cursorPos;
let player;
let gp;
let floor;
let platform2;
let platform3;
let platform4;
let ceiling;

let sp;

App.start(()=>{
    player = new Player(null,null);
    floor = new Platform(0, 700, 400, 25, 'black');
    floor.isFloor = true;
    platform2 = new Platform( 375, 650, 25, 50, 'red')
    platform3 = new Platform( 300, 600, 25, 50, 'red')
    platform4 = new Platform( 375, 550, 25, 50, 'red')
    ceiling = new Platform(200, 650, 25, 10, 'blue')

    platform2.updateFunctions.push(()=>{
        platform2.vX = -1
    })

    sp = new SpawnPoint(25,25,player);
    sp.load();

    gp = new GravityProccessor(0.05, 5);
    App.createItems(player, floor, platform2, platform3,platform4, ceiling, sp);
    gp.addItem(player);

})

App.update(()=>{
    gp.update();
    player.update();
    platform2.update();
})

document.addEventListener('mousemove', (e)=>{
    cursorPos = Util.getCursorPosition(middleground, e)
})

