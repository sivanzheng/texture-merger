"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function searchBlock(block, width, height) {
    if (!block)
        return null;
    if (block.used) {
        const b = searchBlock(block.down, width, height);
        if (b)
            return b;
        return searchBlock(block.right, width, height);
    }
    else {
        if (block.width >= width && block.height >= height)
            return block;
        return null;
    }
}
exports.default = searchBlock;
