import GameEngine from '../library/GameEngine.js';
import * as Util from '../library/utils/utils.js';
import  COLORS  from '../library/classes/ColorList.js';
const ge = new GameEngine();
let cursorPos;

ge.start(()=>{
    alert(COLORS.random())
});

ge.update(()=>{
    console.log(Date.now());
})

document.addEventListener('mousemove', (e)=>{
    cursorPos = Util.getCursorPosition(middleground, e)
})