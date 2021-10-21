import Item from '../Item'
import layout from '../layout';
import { widthPrioritySort } from '../Sort';

// Main process pointer
const webWorker = self as any as Worker; 

webWorker.onmessage = (event: MessageEvent) => { 
    const items = event.data as Item[];
    items.sort((a, b) => widthPrioritySort(a, b));

    const root = layout(items);
    webWorker.postMessage(root);
    self.close();
};