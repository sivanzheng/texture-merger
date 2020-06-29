"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const png_cutter_1 = require("png-cutter");
const Item_1 = require("./Item");
const layout_1 = require("./layout");
;
function merger(urls, verticalGap = 0, horizontalGap = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const mergeImages = (block, ctx) => {
            if (block.img) {
                ctx.drawImage(block.img, block.x, block.y, block.img.width, block.img.height);
                result.push({ image: block.img, x: block.x, y: block.y, width: block.img.width, height: block.img.height });
            }
            if (block.down)
                mergeImages(block.down, ctx);
            if (block.right)
                mergeImages(block.right, ctx);
        };
        Item_1.default.setGap(verticalGap, horizontalGap);
        const app = document.getElementById('app');
        const items = [];
        for (const url of urls) {
            const image = new Image();
            image.setAttribute('crossOrigin', 'Anonymous');
            if (url.match(/(\/|\.)png/)) {
                const cutted = yield png_cutter_1.pngCutter(url);
                image.src = cutted.dataUrl;
            }
            else {
                image.src = url;
            }
            yield new Promise((r) => image.onload = () => r());
            app === null || app === void 0 ? void 0 : app.appendChild(image);
            // console.log(cutted, image.width, image.height)
            const item = new Item_1.default(image);
            items.push(item);
        }
        const root = layout_1.default(items);
        console.log(root);
        const canvas = document.createElement('canvas');
        canvas.width = root.width - horizontalGap;
        canvas.height = root.height - verticalGap;
        const ctx = canvas.getContext('2d');
        mergeImages(root, ctx);
        const dataUrl = canvas.toDataURL();
        const resultImage = new Image();
        resultImage.src = dataUrl;
        yield new Promise((r) => resultImage.onload = () => r());
        app === null || app === void 0 ? void 0 : app.appendChild(resultImage);
        console.log(result);
    });
}
exports.default = merger;
