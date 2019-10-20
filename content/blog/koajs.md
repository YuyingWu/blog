---
title: Koa.js
categories: [tech]
tags: [note]
date: 2019-06-23 14:23:38
---

## 概念

### 中间件 middleware

```js
app.use(async (ctx, next) => {
  // ctx, context, 上下文
  console.log(`${ctx.method} ${ctx.url} ${new Date()}`);

  // next, promise，下一步
  return await next();
});
```

### 调试

#### VSCode

VS Code侧边栏的“调试”，在代码中设置断点。

#### Chrome

```bash
node --inspect server.js
```

1. chrome打开`chrome://inspect`
2. Remote Target 选择对应的页面
3. Source - add folder to workspace，在`server.js`中添加断点

## 附录

* [Koa.js](https://koajs.com/)