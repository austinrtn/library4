import GameEngine from '../library/GameEngine.js';
import * as Util from '../library/utils.js';

let cursorPos;

GameEngine.start(()=>{
    alert("Thank you for using Austin's Library!");   
});

GameEngine.update(()=>{

})

document.addEventListener('mousemove', (e)=>{
    cursorPos = Util.getCursorPosition(middleground, e);
})
