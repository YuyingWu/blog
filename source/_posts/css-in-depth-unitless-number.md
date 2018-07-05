---
title: 无单位数字和行高 —— 别说你懂CSS相对单位
date: 2018-07-05 13:28:03
tags:
- front-end
- css
---

前段时间试译了Keith J.Grant的CSS好书《CSS in Depth》，其中的第二章《Working with relative units》，书中对relative units的讲解和举例可以说相当全面，看完之后发现自己并不太懂CSS相对单位，也希望分享给大家，所以有了这个译文系列。（若有勘误或翻译建议，欢迎 [Github PR](https://github.com/YuyingWu/blog/tree/dev/source/_posts) ^_^）

《别说你懂CSS相对单位》系列译文：

* [如何更愉快地使用em和rem](/blog/archives/css-in-depth-relative-units/)
* [停止使用像素思维去思考](/blog/archives/css-in-depth-stop-thinking-in-px/)
* [视口相关单位的应用](/blog/archives/css-in-depth-viewport-relative-units/)
* [无单位数字和行高](/blog/archives/css-in-depth-unitless-number/) [本文]
* [CSS自定义属性](/blog/archives/css-in-depth-css-variables/)

本文对应的章节目录：

* 2.5 不带单位的数字（unitless number）和行高（line-height）

***

## 2.5 无单位数字（unitless number）和行高（line-height）

有一些属性可以接收不带单位的数值（意思就是一个不带长度单位的数字），如`line-height`、`z-index`和`font-weight`（700等于bold，400等于normal，如此类推）。你也可以在需要长度单位的地方（如px、em、rem）使用一个不带单位的`0`，因为长度已经是0了，带不带单位也无所谓了 —— 0px 等于 0% 等于 0em。

> 警告
> 
> 不带单位的0只可以表示长度单位和百分比的值，譬如padding、border和width。而对于一些特殊的情况，如度数（degrees）或者像秒这样基于时间的值（time-based values），是不可以使用不带单位的0的。

`line-height`属性最特别的地方，在于同时支持带单位和不带单位的值。你应该保持使用不带单位的数值，因为这样就可以从父元素继承。我们在页面上写点文字，看看它是怎么表现的吧。把下面代码添加到你的样式表。

[ 代码片段 2.20 继承`line-height`的模板 ]

```
<body>
  <p class="about-us">
    We have built partnerships with small farms around the world to
    hand-select beans at the peak of season. We then carefully roast in
    small batches to maximize their potential.
  </p>
</body>
```

给body声明一个line-height，然后文档的其他元素会从这里继承。页面的展示符合预期，不管你对页面的其他元素的字号大小做了什么改变。

[ 图 2.11 不带单位的行高，会在每个后代元素下重新计算出实际值 ]

!["图 2.11"](http://sinacloud.net/woodysblog/css-in-depth/02fig11.jpg?KID=sina,sy81111wENh9pWSnk4Ev&Expires=1530702088&ssig=2WgcfHJiZT)

把代码片段2.21的内容添加到你的样式表。段落（`<p>`）继承了1.2的行高。因为字号是32px（2em * 16px，浏览器默认字号大小），所以本地的行高计算值是38.4px（32px * 1.2）。这会给段落的行间距留下比较合适的空间。

[ 代码片段 2.21 对line-height使用不带单位的值 ]

```
body {
  line-height: 1.2;               1
}

.about-us {
  font-size: 2em;
}
```

* 1 后代元素继承不带单位的值

如果你给行高设定了一个带单位的值，你可能会得到意想不到的结果，如图2.12那样，行间文字互相重叠了，代码片段2.22则是造成这个结果的CSS代码。

[ 图 2.12 继承行高造成的行间互叠 ]
!["图 2.12"](http://sinacloud.net/woodysblog/css-in-depth/02fig12.jpg?KID=sina,sy81111wENh9pWSnk4Ev&Expires=1530702131&ssig=vjrNtToK7C)

[ 代码片段 2.22 带单位的行高值造成意外的结果 ]

```
body {
  line-height: 1.2em;             1
}

.about-us {
  font-size: 2em;                 2
}
```

* 1 后代元素继承了计算值（19.2px）
* 2 等于32px

这样的结果源于一次奇怪的继承：当一个元素是用带单位的值声明的，那么它的后代元素会继承计算结果值。当行高属性是用类似em来声明时，它的值会先被计算，然后计算后的值会传到任何继承它的后代元素。对于`line-height`这个属性来说，如果子元素有跟父元素不一样字号大小的情况，就会导致意想不到的结果，譬如文字间的遮挡。

> 长度 —— CSS中用来描述距离测量的正式用语。它是一个带单位的数字，如5px。长度有两种类型：绝对的和相对的。百分比跟长度很类似，但严格来说，百分比不能叫长度。

当你（对某个属性）使用不带单位的数字，声明的值会被继承，也就是说这个值会在子元素中用来重新计算子元素域下的值，而这个通常是你想要的效果。使用不带单位的数字，可以让你在body上设定一个行高，然后什么都不用管，页面上其他元素会默认继承，除非在某个特定的地方你想要做一个额外的样式。

***

《别说你懂CSS相对单位》系列译文：

* [如何更愉快地使用em和rem](/blog/archives/css-in-depth-relative-units/)
* [停止使用像素思维去思考](/blog/archives/css-in-depth-stop-thinking-in-px/)
* [视口相关单位的应用](/blog/archives/css-in-depth-viewport-relative-units/)
* [无单位数字和行高](/blog/archives/css-in-depth-unitless-number/) [本文]
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
  * 2.3.3 让这个面板变得“响应式”
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

***

原著版权信息：

作者：Keith J.Grant  
书籍：CSS in Depth  
章节：[Working with relative units](https://livebook.manning.com/#!/book/css-in-depth/chapter-2)  

*** 

笔者 @Yuying Wu，前端爱好者 / 鼓励师 / 新西兰打工度假 / 铲屎官。目前就职于某大型电商的B2B前端团队。

感谢你读到这里，对上文若有任何疑问或建议，欢迎留言。

如果你和我一样喜欢前端，喜欢捣腾独立博客或者前沿技术，或者有什么职业疑问，欢迎关注我以及各种交流哈。

独立博客：[wuyuying.com](http://wuyuying.com/)  
知乎ID：[@Yuying Wu](https://www.zhihu.com/people/yuying_wu/posts)  
Github：[Yuying Wu](https://github.com/YuyingWu)