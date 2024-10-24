import GameEngine from '../library/GameEngine.js';
import * as Util from '../library/utils.js';

const ge = new GameEngine('circle');
let cursorPos;


ge.start(()=>{
    alert("Thank you for using Austin's Library!");   
});

ge.update(()=>{

})

document.addEventListener('mousemove', (e)=>{
    cursorPos = Util.getCursorPosition(middleground, e);
})
