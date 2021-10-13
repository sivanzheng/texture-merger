import Item from '../Item'
import layout from '../layout';
import { widthPrioritySort } from '../Sort';

// Main process pointer
const webWorker: Worker = self as any; 

webWorker.onmessage = (event: MessageEvent) => { 
    const items = event.data as Item[];
    items.sort((a, b) => widthPrioritySort(a, b));

    const root = layout(items);
    webWorker.postMessage(root);
};

// Avoid mistakes like this xx.worker.ts is not a module
export default null as any; 