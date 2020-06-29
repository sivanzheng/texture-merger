export default class Item {
    img: HTMLImageElement;
    width: number;
    height: number;
    static verticalGap: number;
    static horizontalGap: number;
    static setGap(verticalGap: number, horizontalGap: number): void;
    constructor(img: HTMLImageElement);
}
