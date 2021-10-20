import Item from './Item';
import Block from './Block';
import splitBlock from './splitBlock';
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
            splitBlock(block, item);
        } else {
            // Not enough area
            // Make sure to form a square as much as possible
            if (root.width > root.height) {
                // Scale down
                const block = new Block(root.width, item.height, false);
                block.x = 0;
                block.y = root.height;

                const newRoot = new Block(root.width, root.height + item.height, true);
                newRoot.x = 0;
                newRoot.y = 0;
                newRoot.down = block;
                newRoot.right = root;
                root = newRoot;
            } else {
                // Scale right
                const block = new Block(item.width, root.height, false);
                block.x = root.width;
                block.y = 0;

                const newRoot = new Block(root.width + item.width, root.height, true);
                newRoot.x = 0;
                newRoot.y = 0;
                newRoot.down = root;
                newRoot.right = block;
                root = newRoot;
            }
            const block = searchBlock(root, item.width, item.height);
            if (block) splitBlock(block, item);
        }
    }
    return root;
}