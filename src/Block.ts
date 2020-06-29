export default class Block {
    public x = 0;
    public y = 0;
    public right?: Block;
    public down?: Block;

    constructor(
        public width: number,
        public height: number,
        public used: boolean,
        public img?: HTMLImageElement,
    ) { }
}