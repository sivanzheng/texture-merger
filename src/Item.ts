export default class Item {
    public width: number;
    public height: number;

    static verticalGap = 0;
    static horizontalGap = 0;
    static setGap(verticalGap: number, horizontalGap: number) {
        Item.verticalGap = verticalGap;
        Item.horizontalGap = horizontalGap;
    }

    constructor(
        public img: HTMLImageElement,
    ) {
        this.width = img.width + Item.horizontalGap;
        this.height = img.height + Item.verticalGap;
    }
}
