import { randomInt, randomColor, generator } from './generator'
import merger from '../src/index';
(async () => {
    const pEl = document.createElement('p');
    pEl.innerText = 'Merging Texture';
    const mainEl = document.getElementById('main');
    if (!mainEl) return;
    mainEl.appendChild(pEl);

    const appEl = document.getElementById('app') as HTMLElement;

    let urls: string[] = [];
    const cached = localStorage.getItem('blocks');
    if (cached) {
        urls = cached.split('$');
    }
    if (!urls.length) {
        for (let i = 0; i < 30; i++) {
            const width = randomInt(10, 50);
            const height = randomInt(10, 50);
            const color = randomColor();
            const block = generator(width, height, color);
            urls.push(block.canvas.toDataURL('image/png'))
        }
        localStorage.setItem('blocks', urls.join('$'))
    }

    const res = await merger(urls);
    mainEl.removeChild(pEl);
    const itemsContainerEl = document.getElementById('items-container');
    if (!itemsContainerEl) return;
    for (const layout of res.layout) {
        const div = document.createElement('div');
        layout.image.style.width = layout.width + 'px';
        layout.image.style.height = layout.height + 'px';
        div.appendChild(layout.image);

        const infoEl = document.createElement('p');
        infoEl.innerText = `w: ${layout.width} h: ${layout.height} x: ${layout.x} y: ${layout.y}`
        div.appendChild(infoEl);
        itemsContainerEl.appendChild(div);
    }
    const imageUrl = window.URL.createObjectURL(res.blob);
    const imageEl = document.createElement('img');
    imageEl.src = imageUrl;

    const divEl = document.createElement('div');
    divEl.style.display = 'flex';

    const labelEl = document.createElement('p');
    labelEl.innerText = 'Merged: '

    divEl.appendChild(labelEl);
    divEl.appendChild(imageEl);
    appEl.appendChild(divEl);
})();

