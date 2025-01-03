import Render from "../Render.js";
import { createId } from "../uid.js";

class Item {
    static inject(item, type){
        item.type = type
        item.id = createId();
        
        return item;
    }
}

export default Item;