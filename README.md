# TEXTURE-MERGER

### Install 
`npm install texture-merger`

### Usage
```javascript
    import merger from 'texture-merger';
    /**
     *  Return a collection of sprites merged by four different algorithms, (Max Side, Area, Width Priority, Height Priority)
     *  @typedef {{ x: Number, y: Number, height: Number, width: Number, image: HTMLImageElement }} Layout
     *  @param {Array<String>} dataUrls - Pictures URL or Base64
     *  @param {Number} verticalGap - default 0
     *  @param {Number} horizontalGap - default 0
     *  @returns {Array<{ key: string, layout: Array<Layout>, blob: Blob }>}
     */
    const merged = await merger(dataUrls, verticalGap, horizontalGap);
```
### Document

https://github.com/sivanzheng/Share/blob/master/Sprite/README.md

### Demo online

https://sivanzheng.github.io/texture-merger-test/dist/index.html
