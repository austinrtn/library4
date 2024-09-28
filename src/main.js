import GameEngine from '../library/GameEngine.js';
import * as Util from '../library/utils/utils.js';

const ge = new GameEngine();
let cursorPos;

ge.start(()=>{
    alert('hello wrld')
});

ge.update(()=>{
    console.log(Date.now());
})

document.addEventListener('mousemove', (e)=>{
    cursorPos = Util.getCursorPosition(middleground, e)
})