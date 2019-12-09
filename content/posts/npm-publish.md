---
title: 悄悄发布一个hexo的npm模块
date: 2017-04-03 11:52:02
categories: [tech]
tags: [blog,hexo]
---

**hexo-generator-index-plus**，这是什么东东？其实就是hexo博客生成器的一个文章排序插件，基于默认插件fork的，添加按文章**置顶**和**二次编辑的更新时间**排序的功能。

沙发留给github和npmjs~

Github: [YuyingWu/hexo-generator-index-plus](https://github.com/YuyingWu/hexo-generator-index-plus)
npm: [hexo-generator-index-plus](https://www.npmjs.com/package/hexo-generator-index-plus)

最简单粗暴的Installation：
```
$ npm install hexo-generator-index-plus --save
```

<!-- more -->

当然要完全替换掉默认的index生成器还不止这一步啦，还要干掉默认的npm模块和更新hexo-cli里面assets的引用~具体还是看看[readMe](https://www.npmjs.com/package/hexo-generator-index-plus#installation)啰。

## 怎么实现？

基于默认的hexo-generator-index的fork~所以大致跟原生的一致，config不一样，内部实现不一样。

实现代码还是不聊了，原理是利用数组处理的sort函数来做升降序排列而已啦，献丑献丑。

而关键字的优先级是这么排的，让文章按照`top`（置顶） -> `updateDate`（二次更新时间） -> `date`的降序排列~ 为什么我们需要`top`或者`updateDate`呢？

```
title: Blog Log
date: 2015-04-23 00:35:45
updateDate: 2017-04-02 15:13:00
top: 1
```

### top【No.1 Priority】

所谓的“置顶”，越大的数值排得越前，写了一篇棒棒的文章当然想让它永远在前排 ^0^

### updateDate【No.2 Priority】

默认按创建时间`date`排序，但达不到针对偶尔编辑的某篇文章，希望把它顶上来的需求（但不是置顶，还是按修改时间排序就好了）。

所以我添加了针对**二次编辑更新时间**的排序，添加了一个`updateDate`，跟原生的`updated`区分开。我看默认有个`updated`属性，但是貌似是系统记录文章编辑保存的时间，人肉编辑也没有效，所以还是自己加一个吧。

### date【Default】

原生generator支持的创建日期排序。

### more to do

* 目前只按照各个关键属性的默认降序，后续会加一个order_by支持自定义升降序的配置。
* 完成代码测试

## 发布npm模块

好惭愧，第一次在社区发布module，把这些步骤记录下来，方便以后给自己备忘，嘻嘻。

### 事前准备

1. 去[npm社区](https://www.npmjs.com)注册一个账号
2. github创建repository
3. 初始化模块，执行`npm init`，系统会有很多提示的，不想输入一直按回车就可以，初始化成功后，会生成`package.json`

### 发布

i. 设置npm用户

这个账号会被添加到npm本地的配置中，用来发布module用，成功后用户信息会被存到`~/.npmrc`。

```
$ npm adduser

Username: your name
Password: your password
Email: your email address

// 执行下面命令可以查看当前用户
$ npm whoami
```

ii. 设定版本号

`package.json`里有个字段`version`，设定模块版本号

```
$ npm publish
```

那么版本号规则一般是怎样的呢？npm社区有语义化版本的规则的~

版本格式：**主版号.次版号.修订号**，递增规则如下：

> 主版号：当你做了不相容的 API 修改，
> 次版号：当你做了向下相容的功能性新增，
> 修订号：当你做了向下相容的问题修正。

由于时间关系，在`npm publish`后，我们的模块就发布成功了，快到没朋友，到[npm社区](https://www.npmjs.com)自己的主页上就能看到啦~ 

还蛮好玩的有木有，大家积极分享自己的模块吧 ：）
