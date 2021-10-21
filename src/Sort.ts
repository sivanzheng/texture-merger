import Item from './Item';

const methods = {
    max: (a: Item, b: Item) => Math.max(b.width, b.height) - Math.max(a.width, a.height),
    min: (a: Item, b: Item) => Math.min(b.width, b.height) - Math.min(a.width, a.height),
    h: (a: Item, b: Item) => b.height - a.height,
    w: (a: Item, b: Item) => b.width - a.width,
    a: (a: Item, b: Item) => b.width * b.height - a.width * a.height,
}

const sort = (a: Item, b: Item, funcs: (keyof typeof methods)[]) => {
    let diff = null;
    const len = funcs.length;
    for (let i = 0; i < len; i++) {
        diff = methods[funcs[i]](a, b);
        if (diff !== 0) return diff;
    }
    return 0;
}

export const heightPrioritySort = (a: Item, b: Item) => sort(a, b, ['h', 'w']);
export const widthPrioritySort = (a: Item, b: Item) => sort(a, b, ['w', 'h']);
export const areaSort = (a: Item, b: Item) => sort(a, b, ['a', 'h', 'w']);
export const maxSideSort = (a: Item, b: Item) => sort(a, b, ['max', 'min', 'h', 'w']);