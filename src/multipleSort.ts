import Item from './Item';

const max = (a: Item, b: Item) => Math.max(b.width, b.height) - Math.max(a.width, a.height);
const min = (a: Item, b: Item) => Math.min(b.width, b.height) - Math.min(a.width, a.height);
const h = (a: Item, b: Item) => b.height - a.height;
const w = (a: Item, b: Item) => b.width - a.width;

const multipleSort = (a: Item, b: Item) => {
    let diff = null;
    diff = max(a, b);
    if (diff != 0) return diff;
    diff = min(a, b);
    if (diff != 0) return diff;
    diff = h(a, b);
    if (diff != 0) return diff;
    diff = w(a, b);
    if (diff != 0) return diff;
    return 0;
}

export default multipleSort;