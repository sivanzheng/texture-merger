import Block from './Block';

export default function searchBlock(block: Block, width: number, height: number): Block | null {
    if (!block) return null;
    if (block.used) {
        const b = searchBlock(block.down as Block, width, height);
        if (b) return b;
        return searchBlock(block.right as Block, width, height);
    } else {
        if (block.width >= width && block.height >= height) return block;
        return null;
    }
}