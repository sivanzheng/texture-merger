import { pngCutter } from 'png-cutter';
import Item from './Item';
import Block from './Block';
import layout from './layout';
import multipleSort from './multipleSort';

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

    const resultLayout: Layout[] = [];
    const images: HTMLImageElement[] = [];
    
    const mergeImages = (block: Block, ctx: CanvasRenderingContext2D) => {
        if (block.index !== undefined) {
            const image = images[block.index];
            ctx.drawImage(image, block.x, block.y, image.width, image.height);
            resultLayout.push({ image, x: block.x, y: block.y, width: image.width, height: image.height });
        }
        if (block.down) mergeImages(block.down, ctx);
        if (block.right) mergeImages(block.right, ctx);
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

    items.sort((a, b) => multipleSort(a, b))

    const root = layout(items);
    
    const canvas = document.createElement('canvas');
    canvas.width = root.width - horizontalGap;
    canvas.height = root.height - verticalGap;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    mergeImages(root, ctx);

    const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b as Blob)));

    return {
        blob,
        layout: resultLayout,
    }
}