import { createId } from "../uid.js";

class Item {
    static inject(item, type){
        item.type = type
        item.id = createId();
    }
}

export default Item;