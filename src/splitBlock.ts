import Item from './Item';
import Block from './Block';

const splitBlock = (block: Block, item: Item) => {
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
}

export default splitBlock;