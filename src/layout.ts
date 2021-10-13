import Item from './Item';
import Block from './Block';
import searchBlock from './searchBlock';

export default function layout(items: Item[]) {
    const rootItem = items[0];
    let root = new Block(rootItem.width, rootItem.height, true, rootItem.index);

    const len = items.length;
    for (let i = 1; i < len; i++) {
        const item = items[i];
        if (!item.width || !item.height) continue;
        const block = searchBlock(root, item.width, item.height);
        // The current canvas has an available area
        if (block) {
            block.used = true;
            block.index = item.index;
            if (block.width > item.width) {
                block.right = new Block(block.width - item.width, item.height, false);
                block.right.x = block.x + item.width;
                block.right.y = block.y;
            }
            
            if (block.height > item.height) {
                block.down = new Block(block.width, block.height - item.height, false);
                block.down.x = block.x;
                block.down.y = block.y + item.height;
            }
        } else {
            // Not enough area
            // Make sure to form a square as much as possible
            if (root.width > root.height) {
                // Scale down
                const newBlock = new Block(root.width, item.height, true, item.index);
                newBlock.x = 0;
                newBlock.y = root.height;

                // 
                if (root.width > item.width) {
                    newBlock.right = new Block(root.width - item.width, item.height, false);
                    newBlock.right.y = root.height;
                    newBlock.right.x = item.width;
                } else {
                    newBlock.width = item.width;
                }

                const newRoot = new Block(newBlock.width, item.height + root.height, true);
                newRoot.down = root;
                newRoot.right = newBlock;
                root = newRoot;
            } else {
                // scale right
                const newBlock = new Block(item.width, root.height, true, item.index);
                newBlock.x = root.width;
                newBlock.y = 0;
                if (root.height > item.height) {
                    newBlock.down = new Block(item.width, root.height - item.height, false);
                    newBlock.down.y = item.height;
                    newBlock.down.x = root.width;
                } else {
                    newBlock.height = item.height;
                }

                const newRoot = new Block(root.width + item.width, newBlock.height, true);
                newRoot.down = root;
                newRoot.right = newBlock;
                root = newRoot;
            }
        }
    }
    return root;
}