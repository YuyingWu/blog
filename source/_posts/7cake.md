---
title: 7cake的那些事儿
tags:
  - tech
  - work
id: 178
categories:
  - tech
  - work
date: 2015-12-04 23:48:19
---

最近在帮七姐姐的蛋糕小作坊**7Cake**做[wap页面](http://wuyuyingsvn.sinaapp.com/7cake/index.html#/)，方便日常给客户推广和在微信等平台传播。

该项目放在github上面，直接开源，嘎嘎，有问题也欢迎fork：[hi5-studio/7cake](https://github.com/hi5-studio/7cake)
<!--more-->
![](http://cdn.sinacloud.net/woodysblog/7cake/7cake.png "7cake-设计稿") Designed By @猩爷

废话不多说，简单聊一下7cake站点的一些技术设计吧。

* * *

## 前端架构（FIS3 Angular + Zepto.js）

作为FEX的粉丝，7cake必须用fis架构，想用single page application，于是选用了fis3 + angular，FIS团队还对angular的静态资源做了优化，支持了异步加载的静态文件，访问页面时才加载所需静态资源，棒！不过平时用fis2比较多，fis3的配置比较不一样，一直也没花时间仔细看fis3配置的官方文档，目前7cake的配置还用的fis3 angular demo的简单配置，后续再加上相关文件打包、图片合并策略吧。

## 后端

第一次用传说中的BaaS，毫无违和感，使用了[LeanCloud](https://leancloud.cn)的服务，提供了[javascript SDK](https://leancloud.cn/docs/js_guide.html)，只需要注册个账号，在页面引用他们家的库再初始化些token啥的，就可以用api增删改查各种数据，管理后台用着也蛮不错的，跟自己平时写的mis差不多。

唯一不够流畅的，可能是后台风格偏geek，直接给数据库写字符串、object、上传文件，给没有编程背景的小伙伴讲解用法时稍稍费劲了点，不过也不难，嘿嘿，小成本页面直接用这个，免费的流量够用了（每个开发者账户每月享有100万次免费请求，超出后0.50元/万次），节省不少工作量，新项目快速搞起！

* * *

[![](http://cdn.sinacloud.net/woodysblog/7cake/Cake-structure.png "数据结构")](http://cdn.sinacloud.net/woodysblog/7cake/Cake-structure.png)

之前做过知道/经验的商城、百度师傅的项目，对偏电商类型的页面逻辑有一点点了解，对于简单的页面实现和数据库设计，没有什么问题，不过后面还有以下的问题需要考虑：

*   配置问题：静态资源请求优化、图片合并（现在pack图片会错乱 Orz~）、代码上线/部署自动化
*   价格模板：3种类型的价格模板，根据type来区别渲染模板（前端模板baidutemplate），每添加一种type都是人肉添加相应模板结构，扩展性怎么破？
*   模板渲染：由于用的是leancloud的JS SDK，所有数据都来自异步接口，网速情况差时，页面加载速度会很慢；另外，query获取全部的蛋糕信息列表，目前还在用js先拿到全部的数据，遍历根据cid赋值给N个数组，再利用对应数据遍历渲染模板，SDK应该有提供类似sort的接口，再看看文档吧，不要在js里做这件事啦~
