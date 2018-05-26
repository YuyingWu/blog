---
title: 基于HEXO的博客的持续集成
date: 2018-05-26 14:35:18
---

前几天，跟小伙伴Pipe一起参加个分享会，看到他做了笔记，结束后我说你发给我呀，他说直接看我博客（[《工作思维方式简记》](https://zhoukekestar.github.io/notes/2018/05/25/better-me.html)）呀！我的天，写完瞬间就发到站点去了！Pipe非常高产，去看看他的博客，用“高产似母猪”来描述都不足为过，5月份还没有过完，发布了7篇日志。

我问他，怎么可以那么高产？
Pipe说，第一点是他的日志是碎片化的偏记录的，不一定要憋出大文章才发，然后就是博客系统要方便，随写随发。

反观我的博客，更新频率真的很低，一方面是喜欢憋专题文章（拖着拖着，文章就没有了），另一方面也是发布确实麻烦，电脑编辑好markdown，还要执行各种命令，最后push到github和自己的服务器，文章才能被大家看到，一开始觉得还好蛮geek的，但后来确实由于这些门槛，有打击到那些随时来的写作思绪。

## HEXO的开发分支（dev）与生产分支（gh-pages）



### 开发分支

在我的博客里，开发分支是`dev`，目录结构就是一开始`hexo init`后的结构。

```
- scaffolds // 页面的模板，包括草稿（draft.md）、页面（page.md）、文章（post.md）以及其他自定义模板
- source // 放页面和文章markdown文档
- themes // 博客主题
- _config.yml // 配置文件
- package.json
- .travis.yml // 持续集成服务travis的文件
```

本地开发流程一般是这样。

```
// hexo server, 启动本地服务器，预览我的文章
hexo s 

// hexo generate，编译文章，把 `source` 里面的页面和文章编译成 `public` 里面的html文件
hexo g

// hexo deploy，如果 _config.yml 有配置deploy的内容，执行该命令是会执行相应的部署逻辑
hexo d
```

HEXO的详细科普和指令在这里就不写了哈，官方文档里都有 [>> 传送门](https://hexo.io/docs/)。

### 生产分支（自动生成）

在`dev`分支里，执行了`hexo g`编译之后，编译后的静态文件会存在`public`文件夹里，而我们就把里面的内容挪到最终的生产环境分支`gh-pages`里，也就是最终我们看到的静态博客。

当我们在github里把github-pages服务打开，并渲染`gh-pages`分支，我们就能访问自己的博客了。

## Travis CLI

## 参考文章：

* [如何快速搭建一个有域名且持续集成的hexo博客(2.0版)](https://juejin.im/post/596e39916fb9a06baf2ed273) - runner_yue
* [Hexo 自动部署到 Github](http://lotabout.me/2016/Hexo-Auto-Deploy-to-Github/) - [三点水](http://lotabout.me/)
* ["no implicit conversion of nil into String" when logging in](https://github.com/travis-ci/travis.rb/issues/190) - 在执行`travis login`遇到的问题的解决方案
* [Deploy to GitHub pages from Travis CI](https://iamstarkov.com/deploy-gh-pages-from-travis/)
