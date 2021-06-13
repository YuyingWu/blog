---
title: 'Hi,fontmin'
categories: [tech]
tags: []
date: 2015-05-27 23:38:54
---

相信FE同学们在日常开发中，经常遇到爱用特殊字体的UE，有时候偷偷改成微软雅黑会被发现（笑），被拆穿后只能乖乖切图，不过这样真的很不好，因为多一张图片（常常还是banner上的大文字）就多一个请求，哪怕用CSSsprite打包图片也占地儿，是不是？

于是前阵子关注到baidu EFE的一个东东：[Fontmin](http://ecomfe.github.io/fontmin/)，具体介绍大家可以点过去看看哈。

Fontmin做的事情简单来说，引用字体文件弄成fontface，然后在font-family中引用该自定义字体，最赞的一点是，不需要引进该字体完整的字形，只取你自己需要的文字产出的定制化的字符文件，譬如最近一个项目用到的思源黑体（bold），完整的字符文件22.6MB，其实我只要几个字，产出的ttf只有7KB，真心牛，给32个赞！
<!--more-->

我用的是OS版的fontmin-app（可以点[这里](https://github.com/ecomfe/fontmin-app/releases)下载哈），可视化界面，拖进字体文件（tff格式），输入目标文字，点击“生成”，然后帮你生成css文件（fontface声明）和相关格式的字体文件eot/svg/ttf/woff（多种格式应该是出于浏览器兼容的考虑吧~）

![](https://cdn.sinacloud.net/woodysblog/fontmin/1.jpg "fontmin-app")

    @font-face {
        font-family: "SourceHanSansK-Bold";
        src: url("SourceHanSansK-Bold.eot"); /* IE9 */
        src: url("SourceHanSansK-Bold.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */

        url("SourceHanSansK-Bold.woff") format("woff"), /* chrome、firefox */
        url("SourceHanSansK-Bold.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */

        url("SourceHanSansK-Bold.svg#SourceHanSansK-Bold") format("svg"); /* iOS 4.1- */
        font-style: normal;
        font-weight: normal; }
    `</pre>
    引用很简单~
    <pre>`font-family: "SourceHanSansK-Bold";
    font-size: 36px;

但是问题来了，思源黑体网上下载的一般是otf格式的文件，而fontmin只支持tff，怎么破？

都12点了，先这样吧，后续再记录一下怎么在OS上把字体文件的格式从otf转成tff。

* * *

/** 我是华丽的分割线 **/

* * *

好，下面讲一下在MAC上怎么把otf转成ttf。

推荐一个app：Fontographer

![](https://cdn.sinacloud.net/woodysblog/fontmin/2.jpg "Fontographer")

步骤：

*   准备好字体文件（otf格式）
*   在Fontographer中打开otf文件【 file -&gt; open 】
*   转换格式 【 file -&gt; generate font files -&gt; ttf】
![](https://cdn.sinacloud.net/woodysblog/fontmin/3.jpg "generate font files")
