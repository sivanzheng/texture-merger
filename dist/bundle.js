/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/png-cutter/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/png-cutter/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.pngCutter = void 0;\nfunction pngCutter(path) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const canvas = document.createElement('canvas');\n        if (canvas && canvas.getContext) {\n            const ctx = canvas.getContext('2d');\n            const image = new Image();\n            image.crossOrigin = 'Anonymous';\n            image.src = path;\n            yield new Promise(resolve => image.onload = () => resolve());\n            const sourceW = image.width;\n            const sourceH = image.height;\n            const xSpaces = Array(sourceW).fill(true);\n            const ySpaces = Array(sourceH).fill(true);\n            canvas.width = sourceW;\n            canvas.height = sourceH;\n            ctx.drawImage(image, 0, 0);\n            for (let x = 0; x < sourceW; x++) {\n                for (let y = 0; y < sourceH; y++) {\n                    const imgData = ctx.getImageData(x, y, 1, 1);\n                    const alpha = imgData.data[3];\n                    if (alpha !== 0) {\n                        xSpaces[x] = false;\n                        ySpaces[y] = false;\n                    }\n                }\n            }\n            const offsetX = xSpaces.indexOf(false);\n            const offsetY = ySpaces.indexOf(false);\n            const w = xSpaces.lastIndexOf(false) - offsetX;\n            const h = ySpaces.lastIndexOf(false) - offsetY;\n            const canvas2 = document.createElement('canvas');\n            canvas2.width = w;\n            canvas2.height = h;\n            const ctx2 = canvas2.getContext('2d');\n            ctx2.drawImage(image, offsetX, offsetY, w, h, 0, 0, w, h);\n            const dataUrl = canvas2.toDataURL('image/png');\n            return {\n                w,\n                h,\n                offsetX,\n                offsetY,\n                sourceW,\n                sourceH,\n                dataUrl,\n            };\n        }\n        else {\n            throw Error('needs canvas');\n        }\n    });\n}\nexports.pngCutter = pngCutter;\n\n\n//# sourceURL=webpack:///./node_modules/png-cutter/lib/index.js?");

/***/ }),

/***/ "./src/Block.ts":
/*!**********************!*\
  !*** ./src/Block.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Block {\n    constructor(width, height, used, index) {\n        this.width = width;\n        this.height = height;\n        this.used = used;\n        this.index = index;\n        this.x = 0;\n        this.y = 0;\n    }\n}\nexports.default = Block;\n\n\n//# sourceURL=webpack:///./src/Block.ts?");

/***/ }),

/***/ "./src/Item.ts":
/*!*********************!*\
  !*** ./src/Item.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Item {\n    constructor(width, height, index) {\n        this.width = width + Item.horizontalGap;\n        this.height = height + Item.verticalGap;\n        this.index = index;\n    }\n    static setGap(verticalGap, horizontalGap) {\n        Item.verticalGap = verticalGap;\n        Item.horizontalGap = horizontalGap;\n    }\n}\nexports.default = Item;\nItem.verticalGap = 0;\nItem.horizontalGap = 0;\n\n\n//# sourceURL=webpack:///./src/Item.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.searchBlock = exports.layout = exports.Block = exports.Item = void 0;\nconst Item_1 = __webpack_require__(/*! ./Item */ \"./src/Item.ts\");\nexports.Item = Item_1.default;\nconst Block_1 = __webpack_require__(/*! ./Block */ \"./src/Block.ts\");\nexports.Block = Block_1.default;\nconst merger_1 = __webpack_require__(/*! ./merger */ \"./src/merger.ts\");\nconst layout_1 = __webpack_require__(/*! ./layout */ \"./src/layout.ts\");\nexports.layout = layout_1.default;\nconst searchBlock_1 = __webpack_require__(/*! ./searchBlock */ \"./src/searchBlock.ts\");\nexports.searchBlock = searchBlock_1.default;\nexports.default = merger_1.default;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/layout.ts":
/*!***********************!*\
  !*** ./src/layout.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Block_1 = __webpack_require__(/*! ./Block */ \"./src/Block.ts\");\nconst searchBlock_1 = __webpack_require__(/*! ./searchBlock */ \"./src/searchBlock.ts\");\nfunction layout(items) {\n    const rootItem = items[0];\n    let root = new Block_1.default(rootItem.width, rootItem.height, true, rootItem.index);\n    const len = items.length;\n    for (let i = 1; i < len; i++) {\n        const item = items[i];\n        if (!item.width || !item.height)\n            continue;\n        const block = searchBlock_1.default(root, item.width, item.height);\n        // The current canvas has an available area\n        if (block) {\n            block.used = true;\n            block.index = item.index;\n            if (block.width > item.width) {\n                block.right = new Block_1.default(block.width - item.width, item.height, false);\n                block.right.x = block.x + item.width;\n                block.right.y = block.y;\n            }\n            if (block.height > item.height) {\n                block.down = new Block_1.default(block.width, block.height - item.height, false);\n                block.down.x = block.x;\n                block.down.y = block.y + item.height;\n            }\n        }\n        else {\n            // Not enough area\n            // Make sure to form a square as much as possible\n            if (root.width > root.height) {\n                // Scale down\n                const newBlock = new Block_1.default(root.width, item.height, true, item.index);\n                newBlock.x = 0;\n                newBlock.y = root.height;\n                // \n                if (root.width > item.width) {\n                    newBlock.right = new Block_1.default(root.width - item.width, item.height, false);\n                    newBlock.right.y = root.height;\n                    newBlock.right.x = item.width;\n                }\n                else {\n                    newBlock.width = item.width;\n                }\n                const newRoot = new Block_1.default(newBlock.width, item.height + root.height, true);\n                newRoot.down = root;\n                newRoot.right = newBlock;\n                root = newRoot;\n            }\n            else {\n                // scale right\n                const newBlock = new Block_1.default(item.width, root.height, true, item.index);\n                newBlock.x = root.width;\n                newBlock.y = 0;\n                if (root.height > item.height) {\n                    newBlock.down = new Block_1.default(item.width, root.height - item.height, false);\n                    newBlock.down.y = item.height;\n                    newBlock.down.x = root.width;\n                }\n                else {\n                    newBlock.height = item.height;\n                }\n                const newRoot = new Block_1.default(root.width + item.width, newBlock.height, true);\n                newRoot.down = root;\n                newRoot.right = newBlock;\n                root = newRoot;\n            }\n        }\n    }\n    return root;\n}\nexports.default = layout;\n\n\n//# sourceURL=webpack:///./src/layout.ts?");

/***/ }),

/***/ "./src/merger.ts":
/*!***********************!*\
  !*** ./src/merger.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst png_cutter_1 = __webpack_require__(/*! png-cutter */ \"./node_modules/png-cutter/lib/index.js\");\nconst Item_1 = __webpack_require__(/*! ./Item */ \"./src/Item.ts\");\nconst layout_1 = __webpack_require__(/*! ./layout */ \"./src/layout.ts\");\nconst multipleSort_1 = __webpack_require__(/*! ./multipleSort */ \"./src/multipleSort.ts\");\n;\nfunction merger(urls, verticalGap = 0, horizontalGap = 0) {\n    return __awaiter(this, void 0, void 0, function* () {\n        Item_1.default.setGap(verticalGap, horizontalGap);\n        const resultLayout = [];\n        const images = [];\n        const mergeImages = (block, ctx) => {\n            if (block.index !== undefined) {\n                const image = images[block.index];\n                ctx.drawImage(image, block.x, block.y, image.width, image.height);\n                resultLayout.push({ image, x: block.x, y: block.y, width: image.width, height: image.height });\n            }\n            if (block.down)\n                mergeImages(block.down, ctx);\n            if (block.right)\n                mergeImages(block.right, ctx);\n        };\n        const items = [];\n        const len = urls.length;\n        for (let i = 0; i < len; i++) {\n            const image = new Image();\n            image.setAttribute('crossOrigin', 'Anonymous');\n            const url = urls[i];\n            if (url.match(/(\\/|\\.)png/)) {\n                const cutted = yield png_cutter_1.pngCutter(url);\n                image.src = cutted.dataUrl;\n            }\n            else {\n                image.src = url;\n            }\n            yield new Promise((r) => image.onload = () => r(null));\n            const item = new Item_1.default(image.width, image.height, i);\n            items.push(item);\n            images.push(image);\n        }\n        items.sort((a, b) => multipleSort_1.default(a, b));\n        const root = layout_1.default(items);\n        const canvas = document.createElement('canvas');\n        canvas.width = root.width - horizontalGap;\n        canvas.height = root.height - verticalGap;\n        const ctx = canvas.getContext('2d');\n        mergeImages(root, ctx);\n        const blob = yield new Promise((r) => canvas.toBlob((b) => r(b)));\n        return {\n            blob,\n            layout: resultLayout,\n        };\n    });\n}\nexports.default = merger;\n\n\n//# sourceURL=webpack:///./src/merger.ts?");

/***/ }),

/***/ "./src/multipleSort.ts":
/*!*****************************!*\
  !*** ./src/multipleSort.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst max = (a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height);\nconst min = (a, b) => Math.min(b.width, b.height) - Math.min(a.width, a.height);\nconst h = (a, b) => b.height - a.height;\nconst w = (a, b) => b.width - a.width;\nconst multipleSort = (a, b) => {\n    let diff = null;\n    diff = max(a, b);\n    if (diff != 0)\n        return diff;\n    diff = min(a, b);\n    if (diff != 0)\n        return diff;\n    diff = h(a, b);\n    if (diff != 0)\n        return diff;\n    diff = w(a, b);\n    if (diff != 0)\n        return diff;\n    return 0;\n};\nexports.default = multipleSort;\n\n\n//# sourceURL=webpack:///./src/multipleSort.ts?");

/***/ }),

/***/ "./src/searchBlock.ts":
/*!****************************!*\
  !*** ./src/searchBlock.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction searchBlock(block, width, height) {\n    if (!block)\n        return null;\n    if (block.used) {\n        const b = searchBlock(block.down, width, height);\n        if (b)\n            return b;\n        return searchBlock(block.right, width, height);\n    }\n    else {\n        if (block.width >= width && block.height >= height)\n            return block;\n        return null;\n    }\n}\nexports.default = searchBlock;\n\n\n//# sourceURL=webpack:///./src/searchBlock.ts?");

/***/ }),

/***/ "./test/generator.ts":
/*!***************************!*\
  !*** ./test/generator.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.generator = exports.randomColor = exports.randomInt = void 0;\nexports.randomInt = (min, max) => {\n    return Math.round(Math.random() * (max - min)) + min;\n};\nexports.randomColor = () => {\n    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');\n};\nexports.generator = (width, height, color) => {\n    const canvas = document.createElement('canvas');\n    canvas.width = width;\n    canvas.height = height;\n    const ctx = canvas.getContext('2d');\n    if (ctx) {\n        ctx.fillStyle = color;\n        ctx.fillRect(0, 0, width, height);\n        ctx.fill();\n    }\n    return { canvas, info: { width, height, color } };\n};\n// const saveBlock = (block: Block) => {\n//     const { width, height, color } = block.info\n//     const downloadLink = document.createElement('a');\n//     downloadLink.download = `${width}_${height}_${color}_${(+new Date()).toString()}.png`;\n//     downloadLink.href = block.canvas.toDataURL('image/png')\n//     document.body.appendChild(downloadLink);\n//     downloadLink.click();\n//     document.body.removeChild(downloadLink);\n// }\n// for (let i = 0; i < 15; i++) {\n//     const width = randomInt(10, 50);\n//     const height = randomInt(10, 50);\n//     const color = randomColor();\n//     console.log(width, height, color)\n//     const block = generator(width, height, color)\n//     saveBlock(block)\n// }\n\n\n//# sourceURL=webpack:///./test/generator.ts?");

/***/ }),

/***/ "./test/index.ts":
/*!***********************!*\
  !*** ./test/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst generator_1 = __webpack_require__(/*! ./generator */ \"./test/generator.ts\");\nconst index_1 = __webpack_require__(/*! ../src/index */ \"./src/index.ts\");\n(() => __awaiter(void 0, void 0, void 0, function* () {\n    const pEl = document.createElement('p');\n    pEl.innerText = 'Merging Texture';\n    const mainEl = document.getElementById('main');\n    if (!mainEl)\n        return;\n    mainEl.appendChild(pEl);\n    const appEl = document.getElementById('app');\n    let urls = [];\n    const cached = localStorage.getItem('blocks');\n    if (cached) {\n        urls = cached.split('$');\n    }\n    if (!urls.length) {\n        for (let i = 0; i < 30; i++) {\n            const width = generator_1.randomInt(10, 50);\n            const height = generator_1.randomInt(10, 50);\n            const color = generator_1.randomColor();\n            const block = generator_1.generator(width, height, color);\n            urls.push(block.canvas.toDataURL('image/png'));\n        }\n        localStorage.setItem('blocks', urls.join('$'));\n    }\n    const res = yield index_1.default(urls);\n    mainEl.removeChild(pEl);\n    const itemsContainerEl = document.getElementById('items-container');\n    if (!itemsContainerEl)\n        return;\n    for (const layout of res.layout) {\n        const div = document.createElement('div');\n        layout.image.style.width = layout.width + 'px';\n        layout.image.style.height = layout.height + 'px';\n        div.appendChild(layout.image);\n        const infoEl = document.createElement('p');\n        infoEl.innerText = `w: ${layout.width} h: ${layout.height} x: ${layout.x} y: ${layout.y}`;\n        div.appendChild(infoEl);\n        itemsContainerEl.appendChild(div);\n    }\n    const imageUrl = window.URL.createObjectURL(res.blob);\n    const imageEl = document.createElement('img');\n    imageEl.src = imageUrl;\n    const divEl = document.createElement('div');\n    divEl.style.display = 'flex';\n    const labelEl = document.createElement('p');\n    labelEl.innerText = 'Merged: ';\n    divEl.appendChild(labelEl);\n    divEl.appendChild(imageEl);\n    appEl.appendChild(divEl);\n}))();\n\n\n//# sourceURL=webpack:///./test/index.ts?");

/***/ })

/******/ });