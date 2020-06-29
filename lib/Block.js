"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(width, height, used, img) {
        this.width = width;
        this.height = height;
        this.used = used;
        this.img = img;
        this.x = 0;
        this.y = 0;
    }
}
exports.default = Block;
