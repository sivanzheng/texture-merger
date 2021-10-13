import { randomInt, randomColor, generator } from './generator'
import merger from '../src/index';

(async () => {
    const mainEl = document.getElementById('main');
    if (!mainEl) return;

    const appEl = document.getElementById('app') as HTMLElement;

    let urls: string[] = [];
    const cached = localStorage.getItem('blocks');
    if (cached) {
        urls = cached.split('$');
    }
    if (!urls.length) {
        for (let i = 0; i < 15; i++) {
            const width = randomInt(10, 50);
            const height = randomInt(10, 50);
            const color = randomColor();
            const block = generator(width, height, color);
            urls.push(block.canvas.toDataURL('image/png'))
        }
        localStorage.setItem('blocks', urls.join('$'))
    }

    const results = await merger(urls);
    const mergingEl = document.getElementById('merging');
    mergingEl && mainEl.removeChild(mergingEl);

    const itemsContainerEl = document.getElementById('items-container');
    if (!itemsContainerEl) return;

    for (const result of results) {
        const pEl = document.createElement('p');
        pEl.innerText = `${result.key} Layout Info: `;
        itemsContainerEl.appendChild(pEl);

        const containerEl = document.createElement('div');
        containerEl.className = 'container';
        for (const layout of result.layout) {
            const innerEl = document.createElement('div');
            innerEl.className = 'item-container';
            layout.image.style.width = layout.width + 'px';
            layout.image.style.height = layout.height + 'px';
            const img = layout.image.cloneNode();
            innerEl.appendChild(img);

            const infoEl = document.createElement('p');
            infoEl.innerText = `w: ${layout.width} h: ${layout.height} x: ${layout.x} y: ${layout.y}`
            innerEl.appendChild(infoEl);
            containerEl.appendChild(innerEl);
            itemsContainerEl.appendChild(containerEl);
        }

        const imageUrl = window.URL.createObjectURL(result.blob);
        const imageEl = document.createElement('img');
        imageEl.src = imageUrl;

        const divEl = document.createElement('div');
        divEl.style.display = 'flex';

        const labelEl = document.createElement('p');
        labelEl.innerText = `${result.key} Merged: ${imageEl.clientWidth} * ${imageEl.clientHeight}`

        divEl.appendChild(labelEl);
        divEl.appendChild(imageEl);
        appEl.appendChild(divEl);   
    }
})();

