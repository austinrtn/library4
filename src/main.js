import GameEngine from '../library/GameEngine.js';
import * as Util from '../library/utils/utils.js';

const ge = new GameEngine();
let cursorPos;

let rects = [];
let rectSize = 25;
let grid = {x: 8, y: 8}

ge.start(()=>{
    alert("Thank you for using Austin's Library!");   
});

ge.update(()=>{

})

document.addEventListener('mousemove', (e)=>{
    cursorPos = Util.getCursorPosition(middleground, e);
})