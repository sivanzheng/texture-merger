import * as Q from 'q';
import { pngCutter } from 'png-cutter';
import Item from './Item';
import Block from './Block';
import AreaSortWorker from './Wokers/areaSort.worker';
import WidthPrioritySortWorker from './Wokers/widthSort.worker';
import HeightPrioritySortWorker from './Wokers/heightSort.worker';
import MaxSideSortWorker from './Wokers/maxSideSort.worker';

interface SortResult {
    key: string;
    data: Block;
}

let maxSideSortDefer: Q.Deferred<SortResult>;
const maxSideSortWorker = new MaxSideSortWorker();
maxSideSortWorker.onmessage = (event: MessageEvent) => {
    if (maxSideSortDefer) maxSideSortDefer.resolve({ key: 'Max Side', data: event.data });
    maxSideSortWorker.terminate();
};

let areaSortDefer: Q.Deferred<SortResult>;
const areaSortWorker = new AreaSortWorker();
areaSortWorker.onmessage = (event: MessageEvent) => {
    if (areaSortDefer) areaSortDefer.resolve({ key: 'Area', data: event.data });
    areaSortWorker.terminate();
};

let widthPrioritySortDefer: Q.Deferred<SortResult>;
const widthPrioritySortWorker = new WidthPrioritySortWorker();
widthPrioritySortWorker.onmessage = (event: MessageEvent) => {
    if (widthPrioritySortDefer) widthPrioritySortDefer.resolve({ key: 'Width Priority', data: event.data });
    widthPrioritySortWorker.terminate();
};

let heightPrioritySortDefer: Q.Deferred<SortResult>;
const heightPrioritySortWorker = new HeightPrioritySortWorker();
heightPrioritySortWorker.onmessage = (event: MessageEvent) => {
    if (heightPrioritySortDefer) heightPrioritySortDefer.resolve({ key: 'Height Priority', data: event.data });
    heightPrioritySortWorker.terminate();
};

const allWorkers = [areaSortWorker, widthPrioritySortWorker, heightPrioritySortWorker, maxSideSortWorker];

export interface Layout {
    image: HTMLImageElement,
    x: number,
    y: number,
    height: number,
    width: number,
};

export default async function merger(
    urls: string[],
    verticalGap = 0,
    horizontalGap = 0,
) {
    Item.setGap(verticalGap, horizontalGap);

    const images: HTMLImageElement[] = [];
    
    const mergeImages = (block: Block, ctx: CanvasRenderingContext2D, resultLayout: Layout[]) => {
        if (block.index !== undefined) {
            const image = images[block.index];
            ctx.drawImage(image, block.x, block.y, image.width, image.height);
            resultLayout.push({ image, x: block.x, y: block.y, width: image.width, height: image.height });
        }
        if (block.down) mergeImages(block.down, ctx, resultLayout);
        if (block.right) mergeImages(block.right, ctx, resultLayout);
    };

    const items: Item[] = [];

    const len = urls.length;
    for (let i = 0; i < len; i++) {
        const image = new Image();
        image.setAttribute('crossOrigin', 'Anonymous');
        const url = urls[i];
        if (url.match(/(\/|\.)png/)) {
            const cutted = await pngCutter(url);
            image.src = cutted.dataUrl;
        } else {
            image.src = url;
        }
        await new Promise((r) => image.onload = () => r(null));
        const item = new Item(image.width, image.height, i);
        items.push(item);
        images.push(image);
    }

    areaSortDefer = Q.defer();
    widthPrioritySortDefer = Q.defer();
    heightPrioritySortDefer = Q.defer();
    maxSideSortDefer = Q.defer();

    const allDefer = [
        areaSortDefer.promise,
        widthPrioritySortDefer.promise,
        heightPrioritySortDefer.promise,
        maxSideSortDefer.promise,
    ];
    for (const worker of allWorkers) {
        worker.postMessage(items);
    }

    const sortResults = await Promise.all(allDefer);
    const results: { key: string; blob: Blob; layout: Layout[]}[] = [];
    for (const sortResult of sortResults) {
        const rootBlock = sortResult.data;
        const canvas = document.createElement('canvas');
        canvas.width = rootBlock.width - horizontalGap;
        canvas.height = rootBlock.height - verticalGap;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const resultLayout: Layout[] = [];
        mergeImages(rootBlock, ctx, resultLayout);
        const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b as Blob)));
        results.push({
            blob,
            key: sortResult.key,
            layout: resultLayout, 
        })
    }

    return results;
}