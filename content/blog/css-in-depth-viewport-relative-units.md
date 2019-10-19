---
title: 视口相关单位的应用 —— 别说你懂CSS相对单位
date: 2018-07-05 13:28:02
tags:
- front-end
- css
---

前段时间试译了Keith J.Grant的CSS好书《CSS in Depth》，其中的第二章[《Working with relative units》](https://livebook.manning.com/#!/book/css-in-depth/chapter-2)，书中对relative units的讲解和举例可以说相当全面，看完之后发现自己并不太懂CSS相对单位，也希望分享给大家，所以有了这个译文系列。（若有勘误或翻译建议，欢迎 [Github PR](https://github.com/YuyingWu/blog/tree/dev/source/_posts) ^_^）

《别说你懂CSS相对单位》系列译文：

* [如何更愉快地使用em](/blog/archives/css-in-depth-relative-units/)
* [如何更愉快地使用rem](/blog/archives/css-in-depth-stop-thinking-in-px/)
* [视口相关单位的应用](/blog/archives/css-in-depth-viewport-relative-units/) [本文]
* [无单位数字和行高](/blog/archives/css-in-depth-unitless-number/)
* [CSS自定义属性](/blog/archives/css-in-depth-css-variables/)

本文对应的章节目录：

* 2.4 视口相关单位（viewport-relative units）
  * CSS3
  * 2.4.1 在font-size上使用vw
  * 2.4.2 在font-size上使用calc()

***

## 2.4 视口相关单位（viewport-relative units）

你已经学完em和rem了，它们都是以`font-size`为基准值的，但相对单位不只它们。还有视口相关单位，依赖浏览器的视口大小来定义长度的。

> 视口（viewport） —— 在浏览器窗口中用来渲染页面的可视区域，这不包括浏览器的地址栏、工具栏、状态栏等（如果有的话）。

如果你不熟悉视口相关单位的话，在这里简单介绍一下。

* vh —— 视口高度的1/100
* vw —— 视口宽度的1/100
* vmin —— 视区宽度或高度较小值的1/100（IE9支持的是vm）
* vmax —— 视区宽度或高度较大值的1/100（在写本书时，IE或者Edge都不支持）

举个例子，50vw等于视口宽度的一半，而25vh等于视口高度的25%。vmin依赖两者（宽或高）的较小值，如果我们需要确保一个元素不管在横屏还是竖屏下适应屏幕展示的话，这个属性会很有帮助：如果是横屏，vmin的基准值是屏幕的高度，如果是竖屏，它的基准值是屏幕的宽度。

图2.10展示了一个正方形的元素在不同屏幕尺寸下的视口的情况。宽和高的值都声明为90vmin，也就是宽高较小值的90%。边长的值等于，横屏情况下高度的90%，或者竖屏情况下宽度的90%。

[ 图 2.10 如果把一个元素的宽高定义成90vmin，它总会展示成一个正方形，边长稍小于屏幕的视口，不管它的尺寸或方向怎样。 ]

!["图 2.10"](http://sinacloud.net/woodysblog/css-in-depth/02fig10_alt.jpg)

在代码片段2.18可以看到这个元素的样式，渲染了一个适应屏幕尺寸的大正方形，不管浏览器的尺寸是多少。你可以通过添加`<div class="square">`，再看看页面效果。

[ 代码片段 2.18 边长使用`vmin`的正方形元素 ]

```
.square {
  width: 90vmin;
  height: 90vmin;
  background-color: #369;
}
```

如果想做一个大英雄图片充满屏幕的效果，视口相关长度最合适不过。你的图片可以在一个长条形的容器内，把图片的高度设为100vh，那它的高度就会跟视口高度一样。

> ### 笔记  
> 
> 视口相关单位对于大多数浏览器还是一项比较新的特性，所以当你试图把这个特性和其他样式混搭时，有可能会有一些很奇怪的bug。详情参考[http://caniuse.com/#feat=viewport-units](http://caniuse.com/#feat=viewport-units)列表中的“已知问题（Known Issues）”

> ### CSS3
> 
> 本章提到的很多单位类型，其实并不在早期的CSS版本里（尤其是rem和视口相关单位）。在这门语言一系列的更新迭代过程中，它们慢慢被加进来，我们将最新的版本称作CSS3。  
> 
> 在二十世纪末二十一世纪初，在CSS规范的初版发布之后的很长一段时间，只有很小的改动。在1998年5月份，W3C（World Wide Web Consortium）发布了CSS 2规范。不久之后，修正版本2中问题和缺陷的2.1版本开始了，CSS 2.1的工作持续了好多年，但并没有添加什么令人印象深刻的特性。直到2011年4月份，版本2.1终于被确认为“提议推荐标准”（Proposed Recommendation）。到这个时候，大多数浏览器对CSS 2.1的特性已经支持得很好了，在此基础上，浏览器又努力地添加一些新的特性。这就是新规范CSS 3。  
> 
> “3”是个非正式的版本号，实际上并没有CSS3规范。相反，这个规范被拆成多个独立的模块，分别有独立的版本号。background和border的规范已经从盒模型（box model）以及层叠与继承（cascading and inheritance）规范中独立出来。通过这种方式，W3C就可以针对CSS某个模块进行更新迭代，而不用同时更新其他不相关的模块的内容。在这些模块规范里，很多还停留在第3版本（现在叫“第3级”），但有的模块（比如选择器规范（selectors specification））已经到第4级，而其他的模块（比如flexbox）还在第1级。  
> 
> 这些新特性进入了人们的视野。我们可以看到在2009到2013年间，大量新的CSS特性涌进浏览器中。其中有现在比较出名的rem和视口相关单位，以及新的选择器（new selectors）、媒体查询（media queries）、网页文字（web fonts）、圆形边框（rounded borders）、动画（animation）、变换（transitions）、变形（transformations）以及定义颜色的不同方式。然而，每年的新特性的数量还在逐年稳定增长。  
> 
> 这意味着，我们不再只跟一个特定版本的CSS规范打交道。这是一套有生命的标准，每个浏览器也在持续地支持新的特性，开发者会开始使用然后渐渐习惯它们。CSS4大概不会出现了，如果有的话，应该也只是个用于市场营销的名词。尽管这本书也会提到CSS3的新特性，但没有必要把它们都搬出来，就整个网页而言，这些都是CSS。

### 2.4.1 在font-size上使用vw

一个应用如果使用了视口相关单位，可能效果最不明显的地方就是用在字号大小上。事实上，我发现把vh和vw用在字号上比元素的宽或者高更实用。

试想一下，如果把元素的font-size声明为2vm，会怎么样？台式机屏幕宽是1200px，2vm等于24px（1200 * 2%）。而平板电脑的屏幕宽768px，2vm约等于15px（768 * 2%）。很棒的是，元素在两个尺寸下缩放自如。这意味着这里并没有一个突然的断点，元素会随着视口尺寸的增大而平滑增大。

不幸的是，24px对于大屏幕来说有点太大了。而更糟糕的是，在iPhone6它直接缩小到7.5px。好消息是缩放生效了，而坏消息是极限情况的处理有点差。你可以通过CSS的方法`calc()`解决这个问题。

### 2.4.2 在font-size上使用calc()

`calc()`函数支持对2个或者更多个数值进行基础的运算。这个函数对不同类型的单位间的运算尤其有用。这个函数支持加（+）、减（-）、乘（*）和除以（/）。其中，加和减运算符左右必须留有空格，所以我建议我们来培养一个习惯，总是在四个运算符的两侧都写上空格，譬如`calc(1em + 10px)`。

你会在下一个代码片段中，使用`calc()`来计算vh单位和em单位的值。把你的样式表中的上一段设定基础字号大小的代码去掉（及相关的媒体查询代码），添加以下代码。

[ 代码片段 2.19 在font-size中使用em和vh单位进行calc()运算 ]

```
:root {
  font-size: calc(0.5em + 1vw);
}
```

现在，打开页面，缓慢地改变浏览器的大小。你会发现，字号改变的过渡很平滑。0.5em在这里代表的是字号的最小值，1vm则代表着响应式地往上累加。这样基础字号大小就在iPhone6的11.75px和1200px宽浏览器窗口的20px间缩放。你可以根据自己的喜好改变这些值。

你现在可以实现响应式策略的核心逻辑而不需要添加一行媒体查询的代码。页面上的所有元素可以根据视口大小平滑缩放，不再需要3或4个硬编码的断点。

***

《别说你懂CSS相对单位》系列译文：

* [如何更愉快地使用em](/blog/archives/css-in-depth-relative-units/)
* [如何更愉快地使用rem](/blog/archives/css-in-depth-stop-thinking-in-px/)
* [视口相关单位的应用](/blog/archives/css-in-depth-viewport-relative-units/) [本文]
* [无单位数字和行高](/blog/archives/css-in-depth-unitless-number/)
* [CSS自定义属性](/blog/archives/css-in-depth-css-variables/)

章节：

* 2.1 相对单位值的魔力
  * 2.1.1 完美像素设计（pixel-perfect design）的挣扎
  * 2.1.2 完美像素网页的终结
  * 像素（pixel）、点（point）和pc（pica）
* 2.2 em和rem
  * 2.2.1 对font-size使用em
    * 当我们在一个元素内用em同时声明font-size和其他属性
    * 字号收缩问题
  * 2.2.2 对font-size使用rem
    * 可用性：对font-size使用相对长度单位
* 2.3 停止使用像素思维去思考
  * 2.3.1 设置一个合理的字号默认值
  * 2.3.2 让这个面板变得“响应式”
  * 2.3.3 调整单个组件的大小
* 2.4 视口相关单位（viewport-relative units）
  * CSS3
  * 2.4.1 在font-size上使用vw
  * 2.4.2 在font-size上使用calc()
* 2.5 不带单位的数字（unitless number）和行高（line-height）
* 2.6 自定义属性（也叫“CSS变量”）
  * 2.6.1 动态改变自定义属性的值
  * 2.6.2 通过JavaScript改变自定义属性的值
  * 2.6.3 初探自定义属性
* 总结

> 原著版权信息：
> 
> 作者：Keith J.Grant  
> 书籍：CSS in Depth  
> 章节：[Working with relative units](https://livebook.manning.com/#!/book/css-in-depth/chapter-2)  

*** 

笔者 @Yuying Wu，前端爱好者 / 鼓励师 / 铲屎官。目前就职于某大型电商的B2B前端团队。

感谢你读到这里，对上文若有任何疑问或建议，欢迎留言。

如果你和我一样喜欢前端，喜欢捣腾独立博客或者前沿技术，或者有什么职业疑问，欢迎关注我以及各种交流哈。

独立博客：[wuyuying.com](http://wuyuying.com/)  
知乎ID：[@Yuying Wu](https://www.zhihu.com/people/yuying_wu/posts)  
Github：[Yuying Wu](https://github.com/YuyingWu)