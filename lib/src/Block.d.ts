export default class Block {
    width: number;
    height: number;
    used: boolean;
    img?: HTMLImageElement | undefined;
    x: number;
    y: number;
    right?: Block;
    down?: Block;
    constructor(width: number, height: number, used: boolean, img?: HTMLImageElement | undefined);
}
