import * as App from '../library/app.js';
import * as Util from '../library/utils/utils.js';
import {Mechanics} from "../library/mechanics/Mechanics.js";

import SpawnPoint from './classes/Spawnpoint.js';
import Player from './classes/Player.js';
import { Button, Platform } from './classes/blocks.js';

const middleground = document.getElementById('middleground');

let cursorPos;
let player;
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
    platform3 = new Platform( 300, 600, 25, 100, 'red', )
    platform4 = new Platform( 375, 550, 25, 50, 'red', true)
    ceiling = new Platform(200, 650, 25, 10, 'blue')

    Mechanics.Movement.Inject([platform4],{
        acc:.1
    })
    platform4.moveTo(platform4, {x: 200, y: 200})
    console.log(platform4.maxVels);
    let button = new Button(210, 630, platform3)

    sp = new SpawnPoint(25,600,player);
    sp.load();
    App.createItems(player, floor, platform2, platform3, platform4, ceiling, sp, button);
})

App.update(()=>{
    player.update();
    for(let block of Platform.Blocks) block.update();
})

document.addEventListener('mousemove', (e)=>{
    cursorPos = Util.getCursorPosition(middleground, e)
})

