---
title: 开箱即用，Hexo博客的github+server自动部署
date: 2018-05-26 14:35:18
tags:
  - blog
  - travisCI
  - CI
  - hexo
---

!["Travis CI"](http://lc-wpyqjumv.cn-n1.lcfile.com/9fb19e9b112f127c1adc.jpg)

用了一段时间HEXO搭建个人的博客，但每次发布文章，都需要打开电脑`hexo g`编译之后，再提交到服务器上，确实挺麻烦的，和小伙伴聊完他的日志发布方式之后，痛定思痛，**快捷发布日志**这个问题需要解决一下了！Travis CLI搞起来！

## 闲聊日志的快捷发布

前几天，跟小伙伴Pipe一起参加个分享会，看到他做了笔记，结束后我说你发给我呀，他说直接看我博客（[《工作思维方式简记》](https://zhoukekestar.github.io/notes/2018/05/25/better-me.html)）呀！我的天，写完瞬间就发到站点去了！Pipe非常高产，去看看他的[博客](https://zhoukekestar.github.io/notes)，用“高产似母猪”来描述都不足为过，5月份还没有过完，发布了7篇日志。

我问他，怎么做到那么高产？Pipe说，第一点是他的日志是碎片化的偏记录的，不一定要憋出大文章才发，然后就是博客系统要方便，随写随发。

反观我的博客，更新频率真的很低，一方面是喜欢憋专题文章，拖着拖着，然后就没有然后了。另一方面也是发布确实麻烦，电脑编辑好markdown，还要执行各种命令，最后push到github和自己的服务器，文章才能被大家看到，一开始觉得还好蛮geek的，但后来确实由于这些门槛，有打击到那些随时来的写作思绪。

By the way，Pipe用的是`jekyll`，跟github的持续集成是天生的，而HEXO没有这样的优势。从Hexo换到Jekyll吧，也不是很麻烦，但是我在Hexo生态做了一些东西，还是有点不舍哈。

* [github blog](https://github.com/YuyingWu/blog)：我的博客分支
* [hexo-generator-index-plus](https://github.com/YuyingWu/hexo-generator-index-plus/blob/master/README.md)：hexo小插件，首页排序生成器，和原生的index-generator比较显著的区别是加了置顶功能，可以在front-matter添加`top`属性即可。
* [hexo-theme-fresh](https://github.com/YuyingWu/hexo-theme-fresh)：hexo博客主题，绿色小清新，Medium风格。

!["hexo-theme-fresh效果截屏"](//lc-wpyqjumv.cn-n1.lcfile.com/3061dbf0241049f3b646.gif)

## HEXO的开发分支与生产分支

仓库分成2个分支，主开发开支dev，以及生产环境的gh-pages分支。
查看博客可以通过访问[github pages](https://yuyingwu.github.io/blog/)，又或者直接访问我的域名 [wuyuying.com/blog](http://www.wuyuying.com/blog/archives/hexo-travis/)。

### 开发分支 dev

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

### 生产分支 gh-pages

在`dev`分支里，执行了`hexo g`编译之后，编译后的静态文件会存在`public`文件夹里，而我们就把里面的内容挪到最终的生产环境分支`gh-pages`里，也就是最终我们看到的静态博客。

当我们在github里把github-pages服务打开，并渲染`gh-pages`分支，我们就能访问自己的博客了（[https://yuyingwu.github.io/blog/](https://yuyingwu.github.io/blog/)）。

!["看看我的博客"](//lc-wpyqjumv.cn-n1.lcfile.com/d3ebf243ea2b0dfd9dd1.png)

## Travis CI

在大致了解HEXO的开发流程之后，我们可以开始考虑，如果要实现快捷发布，是要做什么？  
`User Story`：**希望可以在github上写一篇文章，提交之后，可以直接在我的线上博客看到**。

在这里，我们用到了提供持续集成（CI, Continuous Integration）服务的[Travis CI](https://travis-ci.org/)，但其实用到的不是它提供的CI服务，而更多的是通过监听分支提交的动态，在集成成功后去执行我们自定义的部署逻辑。

> 持续集成是一种软件开发实践，即团队开发成员经常集成他们的工作，通过每个成员每天至少集成一次，也就意味着每天可能会发生多次集成。每次集成都通过自动化的构建（包括编译，发布，自动化测试）来验证，从而尽早地发现集成错误。

噢，还有些事前准备：

* 先在`dev`分支里，创建`.travis.yml`
* 在[Travis CLI](https://travis-ci.org/)平台上打开这个分支的CI开关

### 1. 编译并同步到gh-pages

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

!["开始准备"](//lc-wpyqjumv.cn-n1.lcfile.com/cbf00765c8f94a151965.png)
!["after_success把代码部署到gh-pages"](//lc-wpyqjumv.cn-n1.lcfile.com/b82303e0f85deb2088ce.png)

大功告成，集成之后，在github pages的页面上也能看到文章的更新。

### 2. CI到我的服务器

我的服务器是DO家（Digital Ocean）的，那一开始服务器初始化的过程，大家可以参考各个server商提供的setup文档哈，总的来说，在本地有个服务器信任的`id_rsa`的ssh文件，我们是可以通过`ssh user@ip_address`登录到服务器的。

```
# 这个命令会自动把 id_rsa 加密传送到 .git 指定的仓库对应的 travis 中去（在我本地这个文件叫qq_rsa，不是默认的id_rsa）
travis encrypt-file ~/.ssh/id_rsa --add
```

执行这个命令后，`.travis.yml`多了一行代码：（注意把其中的转义符`\`干掉哈），也会在分支目录下生成一个`id_rsa.enc`的加密文件，记得把这个文件也提交上去哟。

```
before_install:
- openssl aes-256-cbc -K $encrypted_3cf6c1fd150f_key -iv $encrypted_3cf6c1fd150f_iv
  -in qq_rsa.enc -out ~/.ssh/id_rsa -d
```

然后为了保证在Travis里面能正常执行，我们处理下运行环境的rsa文件权限和输出提示信息，before_install如下。

```
before_install:
- openssl aes-256-cbc -K $encrypted_3cf6c1fd150f_key -iv $encrypted_3cf6c1fd150f_iv
  -in qq_rsa.enc -out ~/.ssh/id_rsa -d
- chmod 600 ~/.ssh/id_rsa
- echo -e "Host 主机IP地址\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
```

最后，在`after_success`里添加**拷贝目标文件到服务器目标目录**的操作，就大功告成了！

```
after_success
# other actions
- scp -o stricthostkeychecking=no -r ./* root@138.68.161.48:/home/wyyNode/public/blog/
```

## 参考文章

* [如何快速搭建一个有域名且持续集成的hexo博客(2.0版)](https://juejin.im/post/596e39916fb9a06baf2ed273) - [Eva-Yue](https://github.com/zytx121)
* [Hexo 自动部署到 Github](http://lotabout.me/2016/Hexo-Auto-Deploy-to-Github/) - [三点水](http://lotabout.me/)
* [持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html) - 阮一峰
* ["no implicit conversion of nil into String" when logging in](https://github.com/travis-ci/travis.rb/issues/190) - 在执行`travis login`遇到的问题的解决方案
* [Deploy to GitHub pages from Travis CI](https://iamstarkov.com/deploy-gh-pages-from-travis/)
* [使用 Travis 将 GitHub 文件上传传至服务器](https://segmentfault.com/a/1190000009093621) - [Godi13](https://github.com/Godi13)
