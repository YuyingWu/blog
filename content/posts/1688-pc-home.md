---
title: 这！就是1688 PC首页
categories: [tech]
tags: [puppeteer]
date: 2019-09-24 23:14:18
---

在2019.09.06，20财年版的1688 PC 首页终于全量发布了！

> 新版1688 PC首页传送门 >> <a href="https://www.1688.com/" target="_blank">www.1688.com</a>


除了UI上透传的1688品牌心智的变化，在数据对比上，新版首页的业务指标的转化率（UV点击率、L-D、L-O、引导搜索效率等等），整体有了较大的提升。（由于数据敏感，这里就不po具体的数据对比了）

这次改版，技术给1688PC首页带来了什么？更智能 + 更快 = 效能更高。

下文主要分两块给大家介绍新版的1688 pc首页（简称“新版首页”）。

第一部分，新版首页在产品和视觉设计、数据投放与分流策略上发生了什么改变，是怎么变得更智能的。<br />第二部分，站在体验技术的角度，在新版首页的前端技术实现上，我们做了什么小创新，让新版首页的技术更现代、性能更好、质量更有保障。


## 一、新版首页的变化

来，先感受一下新旧版首页的UI对比。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/1.png)



### 1. 提升业务效能，打造源头厂货通天下和品牌心智

先给大家讲讲背景，新版首页有着非凡的使命。

- 今年1688的核心战略是无限接近源头厂货，源头厂货通天下，打造用户的心智，更丰富的品类市场及1688超级产地日活动的透出；
- 打造品牌心智，我们不仅做工厂白牌，还有越来越多的品牌商入驻；
- 强化搜索与场景中控，对于老版首页需要大量的人肉配置（更新频率极低），新版首页大部分模块利用算法推出更接近用户需求的场景和商品，低运营成本的同时，带来更好的转化效率；
- 首页不仅仅是个流量分发渠道，也是未来营收增长可能性的布局。



### 2. 更高效更精准的投放与分流

首页不仅是网站的门面，也是一个大型用户流量分流器，首页的转化效率起到非常关键的作用。新旧版首页很明显的一个改进点在于页面的数据投放与分流策略上。

在旧版首页中，如首屏的营销活动（小焦）和占据234屏的横向区域，由于是大量的人肉配置，会造成配置频率很低，且出的商品或场景，是人肉挑选，不会根据用户偏好展示，这会让转化效率大打折扣，首页的用户流量过来了，但是接不住，不能实现进一步的转化。



#### I. 大富翁：统一活动资源管理

大富翁，是CBU全站活动资源投放管理平台。支持的模块包括首焦（首屏轮播）的营销活动资源投放、小焦（非消和消费品的营销活动）的营销场景投放、KA品牌墙、底部资源位、大促氛围（顶通、首屏背景、N连珠）等。

大富翁平台的优势有以下几点：

1. 首页的活动资源统一在大富翁配置和投放，运营同学来投活动再也不是不知道找谁了，统一管理投放，同一个时间段同一个坑位只有一个活动，定时切换；
1. 首页研发只需要对接大富翁平台的数据源，不用对接千千万万个不同行业、横向的运营小二，也避免人肉切配置数据和多个活动在同一个坑位冲突的问题；
1. 大富翁的封神榜，统一收集资源相关的数据统计，让投放的资源数据可跟踪。



#### II. 智能脸谱：智能分流策略，场景中控的千人千面

智能脸谱，着力于解决CBU各资源位的流量运营问题，旨在提升运营的流量运营能力以及cbu整体流量更精准更高效的分发。支持8个横向业务的模块分流，第一行是厂货通、淘货源、跨境、微供、第二行是工业品、消费品、进口、企业汇采。

智能脸谱的优势有以下几点：

1. 运营产出一个业务的业务池，每个业务展示3个场景，其中每个场景的offer图是个性化产出的；
1. 目前业务池中，只有以上8个横向模块，所以业务的坑位暂时是确定的，在未来这个区域的业务更丰富，可通过智谱，根据用户的偏好（核身身份、主营类目或采购等）展示不同的业务模块中的不同场景，希望更高效更精准地做流量分发。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/2.png)



#### III. 猜你喜欢

猜你喜欢模块是基于算法根据用户偏好向用户推送最匹配需求的高效分发场景，从数据可以看到，猜你模块是除了首屏外，点击率最高的模块，本次改版中该模块从原本的“5_4行”20个坑位到现在的“5_40行”200个坑位，猜你模块的UV点击率比翻倍还要多一点。

除了区域的扩展以外，信息架构上，在原来一些核心信息（标题、图片、已售、价格）的基础上，添加了“镇店之宝”“实力商家”等展示商品实力的标，以及“包邮”、“满减”等利益点的透传，让买家对供应商更有信心以及对营销的利益点更清晰，在原有个性化推品的基础上，以上的信息透传也是增加了L-D的转化的因素之一。

在未来，首页在猜你模块也会进行迭代，添加卡片的混排，进一步在商品中推场景，提升转化效率。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/3.png)



## 二、前端技术的小创新

首页的改版，在业务上，透传出更多今天1688的核心战略源头厂货通天下的心智，同时把大量以前需要人肉配置但更新得很低频的模块，升级为由数据驱动、千人千面的智能模块，每个模块的转化效能更高、维护成本更低。下面我画了一个结构图，大家可以更清晰地了解新版首页的整体内容框架、前端做了什么改造以及依赖哪些CBU基础服务和平台。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/4.png)



### I. 首页的前端技术方案的小变化



#### a. 搭建模式新尝试，assets+源码模板+纯数据组件

PC首页转型成智能化的流量分发渠道，整张页面需要人肉配置的地方已经很少（导航、公告等），而首页用到的组件一般是定制的，在其他导购页面的复用率也低。出于大促氛围需要全局配置的考虑，如果继续使用原有多个组件的搭建方式，大促氛围实现和维护成本会较高。

首页在性能和质量保障上，需要定制化的处理。常规的搭建页面，组件独立开发和配置，性能优化的手段是由搭建平台统一提供的，较难针对某一场景，对整个页面做定制化的性能优化动作。

前端的小私心，想要在前台导购场景中落地React 16.x。由于历史问题，已有的页面很难往React16和Fusion Next 1.x做升级，需要兼容页面中其他的组件的技术体系，首页作为PC端流量大头，如果在首页试点成功，其他导购场景也可以hold得住，首页前端项目组决定往前走一步，整个页面用React 16.x & Fusion Next 1.x开发。

因此，首页的构成，从多个基于jQuery组件的组件式搭建，到1个基于React 16.x的assets应用+纯数据配置的源码页面式搭建。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/5.png)



#### b. 当奇美拉遇上puppeteer，SSR get √

一开始首页就像普通的assets页面一样，一个 `<div id="app"></div>` 加上静态资源，整个模板就结束了。但后来发现，首页的首屏性能还是很关键的，毕竟是出来卖的嘛（捂脸），我们得在性能上下点功夫。

如上图，打通了奇美拉的发布系统，做了一个assets页面静态化的puppeteer服务，在页面发布时，先通过headless chrome渲染一次页面，再把渲染后的模板content注入到同一个pageid的内容中，所以新版首页其实是服务端渲染的，加载后根据请求的最新数据内容，做最小颗粒度的dom diff和更新。

用puppeteer做了什么？一图胜千言。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/6.png)



#### c. 性能对比

新旧版首页在同样网络环境下的性能录制对比，左边是新版首页，右边是旧版首页。 `first paint` 到 `onload event` ，从原本的3295ms到现在的1217ms，而可交互时间（TTI，DCL&&加载85%内容）预估大概是从原来的1900s到现在的1000ms。看习惯旧版首页的同学在我边上，第一次看到新版首页，说是肉眼可见的快了，首屏快了，对业务的价值是首屏搜索、活动或广告的点击率的潜在上涨。

首页性能谈不上快吧，由于业务节奏的问题抓紧先上了一版，在Main里可以看到很多小红旗提示有可能的性能瓶颈，预加载、pwa、code splitting等等，还有很多的优化空间，性能优化之路仍需持续进行。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/7.png)

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/8.png)



### II. 首页的大促氛围

一般来说，PC首页的大促氛围会包括以下部分：

- 顶通，alibar下面的顶部通栏
- logo位置，大促倒计时 或 动态gif
- 首屏的氛围大背景
- 首屏五连珠
- 第二屏的会场智能分流器
- 全页的大促氛围主题色以及各个日常区块在大促下的配色调整等

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/9.png)




#### a. 首页大促氛围 之 研发的痛

在老版首页中，以前走的是搭建体系，首页的每个模块是一个独立的组件，配置都是单独配置的。大促氛围让前端同学相当头疼，大促是一个整体的氛围配置，但老版首页每个模块都是独立配置的，想要把几个模块共用一张氛围背景，变得相当困难，搭建平台本身不开放这样的副作用设置，前端同学可能需要通过比较hack的方式来完成，甚至准备2份组件（如带logo和searchbox的头部组件），一份是日常版，一份是大促版，这会造成配置的混乱以及较大的维护成本。

另外，之前的大促氛围配置，是静态的、人肉的，PC首页的氛围发布，需要人肉蹲点完成。运营或者前端同学先收集好大促氛围的资源，在氛围切换前把组件配置保存好，切换的00:00，人肉点一下发布。由于PC首页还有出于性能考虑的源站缓存机制（24小时），每次页面发布后，需要人工刷新下CDN缓存，让用户访问的页面重新回源到最新的页面版本。



#### b. 首页大促氛围 之 痛定思痛

都9102年了，我们认为，这样的人肉蹲点切氛围的方式，该退出历史的舞台了，在新版首页的大促氛围需要上点现代武器~



##### 武器1：添加氛围全局控制，支持自动切换

关键字：大促氛围实现不再难难难，日常/大促氛围不再需要前端同学蹲点人肉切换

上文也提到，基于以前的模块式搭建方式，首页配氛围时特别痛苦，尤其是一行N列布局，需要通用一张背景图时，需要前端把1张图切割成N份，分别配置到不同的组件中，假装是一张通图。又或者某些复杂的模块，需要维护日常和大促两份组件。

考虑到PC首页转型成智能化的流量分发渠道，整个页面需要人肉配置的地方已经很少（导航、公告等），而首页用到的组件一般是定制的，在其他导购页面的复用率也低。

新版首页的搭建方式是源码模板+少量数据配置，算是一个“大组件”，针对像大促氛围这样全局的控制，实现效率更高，维护成本更低。

同时支持大促氛围，不再需要前端同学在准点发布页面后，再人肉蹲点清理用户访问资源的缓存。

- on（手动开）
- off（手动关）
- auto（自动，识别大促数据源中的开关字段判断开关）

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/10.png)



##### 武器2：氛围数据的统一管理，排期定时投放

关键字：定时定资源自动投放，资源不再冲突，资源配置不再需要运营同学蹲点人肉更新

氛围资源配置不再写死在每个组件的静态配置中，由大富翁统一管理，如下图，顶通banner、动态logo、五连珠素材，针对不同的阶段氛围场景（日常、预热、爆发、返场等等），同一个时间段投放对应的资源，定时自动切换数据。这解决了蹲点更新数据的问题。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/11.png)



### III. 首页的灰度方案



#### a. www.1688.com 的灰度方案

在做每次页面级别的大改版时，我们需要预先考虑好灰度的方案，包括分桶逻辑和灰度期间的数据对比，往往落地比想象中稍微复杂一些，下面给大家分享一下 www.1688.com 的灰度方案。

新旧版首页的灰度时间其实非常短，因为要赶在9月份大促之前发布，在新版首页直接上大促的氛围。

- 08.26-08.29，灰度10%；
- 08.30-09.05，灰度50%；
- 09.06，全量发布。

可能你会好奇为什么是10到50再直接开100，是不是跨度稍微大了一些。Um，也是有原因的，因为当时跟CDN同学写上，提供的CDN侧的分桶方案，只有pt5（10%）、pt20（40%）、null（其他）三个桶，所以我们切流的时候，第一次是 `pt5` 命中新版，第二次是 `pt5 || pt20` 命中新版，第三次是全量铺开新版。



##### 要素1：流量分桶

> 1688PC首页的源站由于历史原因是一个Java应用(cbu-static)，需要做灰度的频率比较低。采用的做法是，创建两个页面，这两个页面都在cbu_static上承载，CDN节点依然部署了上述的分桶逻辑，当回源到cbu_static时，在tengine层面可以根据请求头中的x-air-pt来proxy_pass到不同的路径上，以实现灰度的效果。


![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/12.png)

结合CDN+源站的灰度多版本缓存机制，www.1688.com的灰度流程如下：

1. 用户流量进来，访问CDN上的静态资源
1. CDN根据用户的cna或utdid（用户身份唯一标识），进行灰度分桶计算，判断用户进入了哪个分桶
1. 在 www.1688.com 的访问header中，打入 `x-air-pt` 的头
1. 源站根据 x-air-pt 的值，返回灰度版本对应的首页版本（新首页 或 旧首页）。用户访问的 www.1688.com 页面资源到源站回源，利用 header 中 vary 参数的值 `x-air-pt`  回源到多个副本
1. 用户最终看到命中的首页版本



##### 要素2：查看灰度数据

分桶成功之后，同是通过 www.1688.com 进来的流量，我们需要区分进入哪个版本的流量以及各个区块的曝光、点击等业务指标，方便做AB版本的数据的对比和产品方案上的调优。最终，我们是通过 `A+的AB Test` 服务进行新旧版本首页数据的对比。

一开始，由于新旧版首页的源页面本来就不是一张页面，我们是打算直接使用两个不同的spmB来做数据观察的，PD同学只需在A+中输入不同的spmA.spmB就可以。但是首页作为PC的流量大头，广告、搜索等核心业务的数据依赖旧版首页的spm（ `a260k.dacugeneral` ），对新首页灰度的数据侧需求是spm的B位需要跟旧版的保持一致，目的是在灰度期间首页的业务数据不会出现断层。

所以，在首页的灰度方案中，新老页面的spm是一致的，在此基础上加上spm b位的版本号，其中新版本的是 `a260k.dacugeneral/new` ，旧版本的是 `a260k.dacugeneral/default` 。灰度的数据统计使用的是 A+ 的AB Test，支持离线和实时的数据统计。除了页面概况，也可以通过搜索spm c位，查询某个页面版本的某个区块的数据情况。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/13.png)

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/14.png)



### IV. 首页的质量保障

新首页的质量保障目前主要做了什么？

- `Plan A` ：首屏的前端静态数据兜底，保证在极端情况下，譬如服务接口全挂了，1688首页首屏仍能正常展示，下面的模块按需隐藏或兜底；
- `Plan B` ：React 16的错误边界，解除一个组件搞挂整个页面的风险；
- `Plan C` ：Retcode埋点上报（常规埋点和主动上报），通过页面数据监控和优化；
- `Plan D` ：在发布时接入自动化测试，做页面模块接口的有效性校验，甚至页面的UI差异比对。待自动化测试同学介入。[ to do]



#### I. 容错 —— error boundaries

新版首页是个“大组件”，一个 `index.jsx` 中引入子目录下的各种 `components` ，初期开发阶段，整个应用处于“裸奔”的状态，一个组件抛错误，整个页面都会挂掉。日常抛JS error的情况包括但不限于代码逻辑没注意写错了、数据接口挂了或者返回结构不如预期、多层数据获取的容错等。首页有19个组件和一些公用的函数，如果其中一处报错，会把整个页面搞挂，风险太大。

据了解，常规的搭建页面中，每个组件在渲染前会逐个加入try-catch的容错判断。<br />此处掌声给React 16的Error Boundaries。

> 部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。
> 错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。


做了一个ErrorHandle的HOC，隔离每个component，并根据模块特性，决定抛错时整块隐藏或展示什么占位。

1. 通过 `getDerivedStateFromError` 捕获报错；
1. 利用声明周期中的 `componentDidCatch` 做抛出错误后的处理，如Retcode错误上报；
1. 当有错误抛出时，可以通过state控制该渲染什么。



#### II. Retcode 监控与上报

新版首页接入了Retcode，监控页面日常的js报错（error boundary也会对抛错的错误信息进行主动上报），针对有服务端接口的模块，做主动上报，类型包括服务系统错误、没有数据、数据不符合预期等。

把首页retcode监控与GOC监控打通，尽早发现和解决线上问题，避免线上质量问题响应速度慢，持续扩散问题的影响面。

![](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/15.png)



## 写在最后

首页改版的第一阶段算是结束了，但发布并不等于结束了，持续优化迭代的路仍然很长。后续1688 PC首页还会作为我们团队同学目前在研究的SSR、搭建的灰度能力、B类特色数据编排、场景的A/B实验与效能分析等等技术解决方案的落地场景，还会给大家带来B系前端技术的更多技术深度好文，敬请期待哟~

这！就是CBU体验技术团队。
