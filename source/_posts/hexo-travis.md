---
title: 基于HEXO的博客的持续集成
date: 2018-05-26 14:35:18
---

用了一段时间HEXO搭建个人的博客，但每次发布文章，都需要打开电脑`hexo g`编译之后，再提交到服务器上，确实挺麻烦的，和小伙伴聊完他的日志发布方式之后，痛定思痛，**快捷发布日志**这个问题需要解决一下了！CI搞起来！

<!-- more -->

前几天，跟小伙伴Pipe一起参加个分享会，看到他做了笔记，结束后我说你发给我呀，他说直接看我博客（[《工作思维方式简记》](https://zhoukekestar.github.io/notes/2018/05/25/better-me.html)）呀！我的天，写完瞬间就发到站点去了！Pipe非常高产，去看看他的博客，用“高产似母猪”来描述都不足为过，5月份还没有过完，发布了7篇日志。

我问他，怎么做到那么高产？  
Pipe说，第一点是他的日志是碎片化的偏记录的，不一定要憋出大文章才发，然后就是博客系统要方便，随写随发。

By the way，Pipe用的是`jekyll`，跟github的持续集成是天生的，而HEXO没有这样的优势。

反观我的博客，更新频率真的很低，一方面是喜欢憋专题文章（拖着拖着，文章就没有了），另一方面也是发布确实麻烦，电脑编辑好markdown，还要执行各种命令，最后push到github和自己的服务器，文章才能被大家看到，一开始觉得还好蛮geek的，但后来确实由于这些门槛，有打击到那些随时来的写作思绪。

## HEXO的开发分支（dev）与生产分支（gh-pages）

讲到HEXO，先安利一下。

反观我的博客，更新频率真的很低，一方面是喜欢憋专题文章（拖着拖着，文章就没有了），另一方面也是发布确实麻烦，电脑编辑好markdown，还要执行各种命令，最后push到github和自己的服务器，文章才能被大家看到，一开始觉得还好蛮geek的，但后来确实由于这些门槛，有打击到那些随时来的写作思绪。

博客分支：[github blog](https://github.com/YuyingWu/blog)

[hexo-generator-index-plus](https://github.com/YuyingWu/hexo-generator-index-plus/blob/master/README.md)：hexo小插件，首页排序生成器，和原生的index-generator比较显著的区别是加了置顶功能，可以在front-matter添加`top`属性即可。

[hexo-theme-fresh](https://github.com/YuyingWu/hexo-theme-fresh)：hexo博客主题，绿色小清新，Medium风格。

!["hexo-theme-fresh效果截屏"](https://github.com/YuyingWu/blog/blob/dev/source/_images/screenshot.gif)

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

当我们在github里把github-pages服务打开，并渲染`gh-pages`分支，我们就能访问自己的博客了（[https://yuyingwu.github.io/blog/](https://yuyingwu.github.io/blog/)）。

!["看看我的博客"](https://github.com/YuyingWu/blog/blob/dev/source/_images/hexo-travis-screenshot.png)

## Travis CLI

在大致了解HEXO的开发流程之后，我们可以开始考虑，引入持续集成，是要做什么？  
`User Story`：**希望可以在github上写一篇文章，提交之后，可以直接在我的线上博客看到**。

在这里我们用到的持续集成（CI, Continuous Integration）服务是[Travis CI](https://travis-ci.org/)，据[github 2017年CI市场份额统计](https://blog.github.com/2017-11-07-github-welcomes-all-ci-tools/)，Travis CI是市场份额最大的CI工具。

噢，还有些事前准备：

* 先在`dev`分支里，创建`.travis.yml`
* 在[Travis CLI](https://travis-ci.org/)平台上打开这个分支的CI开关

那直接上我的CI配置代码吧。

```yml
language: node_js
node_js: stable

addons: # Travis CI建议加的，自动更新api
  apt:
    update: true

cache:
  directories: 
  - node_modules # 缓存 node_modules

install:
- npm install # 初次安装，在CI环境中，执行安装npm依赖

# before_script: 

script:
- hexo g # 执行 hexo generate，把文章编译到public中

after_success: # 执行script成功后，进入到public，把里面的代码提交到博客的gh-pages分支
- cd ./public
- git init
- git config user.name "Yuying Wu"
- git config user.email "wuyuying1128@gmail.com"
- git add .
- git commit -m "Update site"
- git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages

branches:
  only:
  - dev # CI 只针对分支 dev

env:
  global: # 全局变量，上面的提交到github的命令有用到
  - GH_REF: github.com/YuyingWu/blog.git
  - secure: 
# secure是自动生成的，执行`travis encrypt 'GH_TOKEN=${your_github_personal_access_token}' --add`
```

相信代码和注释写得很清楚了，有个地方需要进一步解释的，github提交那part，涉及github access token的生成和加密。

1. 生成github的[Personal Access Tokens](https://github.com/settings/tokens)（打开分支提交的权限）
2. 安装Travis CLI `gem install travis`（如果登录遇到环境问题，可以看看下面参考文章里面的解决方案）
3. 进入到本地`dev`目录下（带有`.travis.yml`），执行`travis login`登录，再执行`travis encrypt 'GH_TOKEN=${your_github_personal_access_token}' --add`加密你的personal access token（也就是后来`.travis.yml`的`env.global.secure`的值）

把`.travis.yml`提交之后，看看Travis CLI上，开始持续集成了哈。

!["开始准备"](https://github.com/YuyingWu/blog/blob/dev/source/_images/hexo-travis-1.png)
!["after_success把代码部署到gh-pages"](https://github.com/YuyingWu/blog/blob/dev/source/_images/hexo-travis-2.png)

大功告成，集成之后，在github pages的页面上也能看到文章的更新。

## to-do：

到现在，还有一part没有做 —— 怎么把代码部署到自己的服务器上？ To be continued :)

## 参考文章：

* [如何快速搭建一个有域名且持续集成的hexo博客(2.0版)](https://juejin.im/post/596e39916fb9a06baf2ed273) - runner_yue
* [Hexo 自动部署到 Github](http://lotabout.me/2016/Hexo-Auto-Deploy-to-Github/) - [三点水](http://lotabout.me/)
* ["no implicit conversion of nil into String" when logging in](https://github.com/travis-ci/travis.rb/issues/190) - 在执行`travis login`遇到的问题的解决方案
* [Deploy to GitHub pages from Travis CI](https://iamstarkov.com/deploy-gh-pages-from-travis/)
