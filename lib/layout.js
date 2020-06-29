"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = require("./Block");
const searchBlock_1 = require("./searchBlock");
function layout(items) {
    const item = items[0];
    let root = new Block_1.default(item.width, item.height, true, item.img);
    for (let i = 1; i < items.length; i++) {
        const item = items[i];
        if (!item.width || !item.height)
            continue;
        const block = searchBlock_1.default(root, item.width, item.height);
        if (block) {
            block.used = true;
            block.img = item.img;
            if (block.width > item.width) {
                block.right = new Block_1.default(block.width - item.width, item.height, false);
                block.right.x = block.x + item.width;
                block.right.y = block.y;
            }
            if (block.height > item.height) {
                block.down = new Block_1.default(block.width, block.height - item.height, false);
                block.down.x = block.x;
                block.down.y = block.y + item.height;
            }
        }
        else {
            if (root.width > root.height) {
                // scale down
                const newBlock = new Block_1.default(root.width, item.height, true, item.img);
                newBlock.x = 0;
                newBlock.y = root.height;
                if (root.width > item.width) {
                    newBlock.right = new Block_1.default(root.width - item.width, item.height, false);
                    newBlock.right.y = root.height;
                    newBlock.right.x = item.width;
                }
                else {
                    newBlock.width = item.width;
                }
                const newRoot = new Block_1.default(newBlock.width, item.height + root.height, true);
                newRoot.down = root;
                newRoot.right = newBlock;
                root = newRoot;
            }
            else {
                // scale right
                const newBlock = new Block_1.default(item.width, root.height, true, item.img);
                newBlock.x = root.width;
                newBlock.y = 0;
                if (root.height > item.height) {
                    newBlock.down = new Block_1.default(item.width, root.height - item.height, false);
                    newBlock.down.y = item.height;
                    newBlock.down.x = root.width;
                }
                else {
                    newBlock.height = item.height;
                }
                const newRoot = new Block_1.default(root.width + item.width, newBlock.height, true);
                newRoot.down = root;
                newRoot.right = newBlock;
                root = newRoot;
            }
        }
    }
    return root;
}
exports.default = layout;
