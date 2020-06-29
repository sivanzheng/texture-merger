"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(img) {
        this.img = img;
        this.width = img.width + Item.horizontalGap;
        this.height = img.height + Item.verticalGap;
    }
    static setGap(verticalGap, horizontalGap) {
        Item.verticalGap = verticalGap;
        Item.horizontalGap = horizontalGap;
    }
}
exports.default = Item;
Item.verticalGap = 0;
Item.horizontalGap = 0;
