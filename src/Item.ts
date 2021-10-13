export default class Item {
    public width: number;
    public height: number;
    public index: number;

    static verticalGap = 0;
    static horizontalGap = 0;
    static setGap(verticalGap: number, horizontalGap: number) {
        Item.verticalGap = verticalGap;
        Item.horizontalGap = horizontalGap;
    }

    constructor(
        width: number,
        height: number,
        index: number,
    ) {
        this.width = width + Item.horizontalGap;
        this.height = height + Item.verticalGap;
        this.index = index;
    }
}
