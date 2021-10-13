interface Block {
    canvas: HTMLCanvasElement
    info: {
        width: number
        height: number
        color: string
    }
}

export const randomInt = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min)) + min;
}

export const randomColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
}

export const generator = (width: number, height: number, color: string): Block => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        ctx.fill();
    }
    return { canvas, info: { width, height, color } };
}

// const saveBlock = (block: Block) => {
//     const { width, height, color } = block.info
//     const downloadLink = document.createElement('a');
//     downloadLink.download = `${width}_${height}_${color}_${(+new Date()).toString()}.png`;
//     downloadLink.href = block.canvas.toDataURL('image/png')
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
// }

// for (let i = 0; i < 15; i++) {
//     const width = randomInt(10, 50);
//     const height = randomInt(10, 50);
//     const color = randomColor();
//     console.log(width, height, color)
//     const block = generator(width, height, color)
//     saveBlock(block)
// }