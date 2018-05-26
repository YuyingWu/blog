---
title: 博客优化之路：从WordPress到Hexo
tags:
  - tech
  - blog
date: 2016-04-06 17:43:19
---
经历了WordPress、jekyll、Hexo、WordPress，前几天我还是把博客迁回到Hexo，因为WordPress太庞大了，想修改主题优化下页面性能或者加些个性化的小组件吧，也没折腾出一个前端构建的流程，开发起来很麻烦，放弃治疗啦，于是又回归到**静态博客**的怀抱。

最近在公司做一些性能优化的工作，重构历史代码和优化打包策略啥的，每次看到优化效果都会觉得很爽，那些数字太漂亮，弄上瘾了，于是拿自己的博客接着改！

虽然从WordPress到Hexo，我啥也没做，只是做了个“系统选型”的抉择，从重量级到轻量级选手，但是从数据看来，我觉得改得还是非常对的，以后站点会有更多的可玩性 :)

<!--more-->

## 改造后的性能优化：
* 请求数，22 -> 7，减少了**68%**
* 传输容量，1.3M -> 745K，减少了**44%**
* Load时间，2.64s -> 1.10s，减少了**58%**

### Hexo（官方主题[Landscape](https://github.com/hexojs/hexo-theme-landscape))
  
![Hexo首页加载情况](http://cdn.sinacloud.net/woodysblog/blog-opt/hexo-request.png)

### WordPress（2016年官方主题twenty-sixteen）
  
![WordPress首页加载情况](http://cdn.sinacloud.net/woodysblog/blog-opt/wp-request.png)

***

从WordPress迁到Hexo，其实很简单。

## 1. 导出WordPress数据

仪表盘（wp-admin） -> 工具 -> 导出

!["WordPress数据导出"](http://cdn.sinacloud.net/woodysblog/blog-opt/wp-export.png)

## 2. 搭建Hexo

i.安装Node.js、npm  
ii.安装Hexo
    
    npm install -g hexo-cli 
    
iii. Hexo初始化
    
    hexo init <folder> // 初始化某个目录  
    cd <folder> // 进入该目录    
    npm install // 安装所需npm依赖文件
    
## 3.WordPress到Hexo的迁移

i.安装迁移插件

    npm install hexo-migrator-WordPress --save

ii.把WordPress数据导出文件放进Hexo的安装目录  
iii.执行命令迁移文章：source是数据导出文件
    
    hexo migrate wordpress <source>
    
## 4. 媒体文件存在哪？

虽然很方便的迁移了所有WP文章，但是我们可以发现，文章中有些格式可能会包括很多div等多余的html标签，需要人肉调整。

然后文中引用的媒体文件尤其是图片，还在使用WP数据库中的文件，假如我想彻底脱离WP，我需要把这些媒体资源整理出来，那么问题来了，存在哪？

目前我在用新浪云的[云存储SCS](http://open.sinastorage.com)服务，访问速度很快，按访问量计费，不过目前像我的博客访问量不大，基本免费。

新浪云存储SCS服务的价格详情[传送门 >>](http://www.sinacloud.com/index/price.html)

另外也可以考虑：

[百度云BOS](https://bce.baidu.com/product/bos.html)，度厂很多内部产品线都在使用，按需计费，不过我没使用过，不清楚具体收费情况怎样，感兴趣的朋友可以来[价格表这儿](https://bce.baidu.com/doc/Pricing/BOS.html)看看。



## Reference

* [Hexo官网](https://hexo.io/zh-cn/docs/migration.html)
* [Hexo迁移文档](https://hexo.io/zh-cn/docs/migration.html)：RSS/Jekyll/Octopress/WordPress/Joomla
* [百度开放云](https://bce.baidu.com/index.html)
* [新浪云](http://www.sinacloud.com)
