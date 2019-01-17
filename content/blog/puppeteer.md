---
title: puppeteer调研
tags:
  - front-end
  - testing
date: 2018-07-10 22:37:18
---

## Puppeteer Intro

Puppeteer金字塔

!["Puppeteer Pyramid"](http://sinacloud.net/woodysblog/img/puppeteer-pyramid.png)

无需再通过Chrome的开发协议，写冗长复杂的代码，轻松调用Chrome API。

!["puppeteer-devtools-protocol"](http://sinacloud.net/woodysblog/img/puppeteer-devtools-protocol.png)

Puppeteer的使用场景。

!["Puppeteer use case"](http://sinacloud.net/woodysblog/img/puppeteer-use-cases.png)

## Demo - screenshot

### setup

```
npm i puppeteer --save
```

### demo

打开`example.com`，截屏，生成文件`example.png`。

```
// screenshot.js
const puppeteer = require('puppeteer');

puppeteer.launch({
  headless: false
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
});

// run the demo
// node screenshot.js
```

!["screenshot-puppeteer"](http://sinacloud.net/woodysblog/img/screenshot-puppeteer.gif)

## Links

* [Getting Started with Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
* [Try Puppeteer](https://try-puppeteer.appspot.com/)
* [Puppeteer as a service](https://pptraas.com/)
* [puppeteer-examples](https://github.com/GoogleChromeLabs/puppeteer-examples)
* [Puppeteer Docs](https://developers.google.com/web/tools/puppeteer/)

Youtube Video:
["Intro of Puppeteer - Chrome Dev Summit 2017"](https://youtu.be/7-XnEMrQnn4?t=986)
["The power of Headless Chrome and browser automation (Google I/O '18)"](https://www.youtube.com/watch?v=lhZOFUY1weo)
