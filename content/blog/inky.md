---
title: 再手写table做EDM你就out啦
tags:
  - tech
date: 2016-05-18 18:20:18
---
工作期间，有接触过产品线发的[EDM](http://baike.baidu.com/subview/1212416/8602812.htm#viewPageContent)(Email Direct Marketing 电子邮件营销)，也就是大家经常说的“垃圾邮件”，可能发EDM的账户会进部分邮箱的黑名单，有时候我自己测试发的邮件可能要到垃圾箱找 >3< 

不过EDM对于用户召回确实有非常显著的效果，偶尔来一发，也不失为一个重新激活目标用户的好办法。

不小心扯远了，由于邮件浏览器可能会过滤掉对外部的CSS或者JS文件的引用，加上对很多css特性不支持（邮件商的兼容性也是个坑），所以很多时候我们会把整个psd垂直分成几张图片，采用**table** + **inline CSS** + **img** 的方式去弄。

<!-- more -->

好处：

* 简单方便，直接切图，塞进img的src就好了，切图+拼html一般不超过半小时；

缺点：

* 没有所谓的样式，只是个写满style属性的table，很凌乱不便维护；
* 纯图片拼接，对于一些默认屏蔽图片的邮件商，会白屏；图片太大，可能会加载比较久；
* 不符合响应式设计，没法做pc和移动页面自适应

***
前几天，项目评审时说要发EDM，我上网搜了下，偶然看到一篇文章，介绍[Inky](http://foundation.zurb.com/emails/docs/index.html)，一个号称支持响应式设计、兼容各个email client的邮件模板编译工具。

玩了一下下，发现还真的不错！看了下他们的[change log](https://github.com/zurb/foundation-emails/releases)，2013年11月的初版，今年3月都发了2.0啦，我是有多out，现在才知道，所以有了本文，希望更多不知道的小伙伴也可以enjoy这个方便的工具。

## 零、Inky简介

Inky的技术栈：-> [传送门](http://foundation.zurb.com/emails/docs/zurb-stack.html)

* Gulp
* Sass
* Inlining
* Panini
* BrowserSync
* Image Compression

它能为我们带来什么？下面是自带的组件列表：

* The Grid：栅格化
* Global Styles：核心的框架样式和Sass变量
* Alignment Classes：对齐的CSS类（文本对齐和块元素对齐）
* Buttons：一些默认样式、大小的button
* Menu：菜单
* Spacer：通过传入高度，自动生成定高的空白块
* Wrapper：邮件正文100%宽的自定义背景块
* Typography：默认排版（样式）
* Visibility Classes：可以根据需求，设定在不同尺寸设备下（pc/wap）是否可见

## 一、初始化步骤：

传送门：[官方教程](http://foundation.zurb.com/emails/docs/sass-guide.html)

### I. 安装fundation命令行工具

```
sudo npm install --global foundation-cli
```

### II. 初始化email开发环境

进入你的项目目录内，执行初始化命令，如执行 cd my-project 后再执行：

```
foundation new --framework emails
```

### III. 本地运行&调试

执行完后，会自动打开浏览器窗口：

```
npm start
```

### IV. 编译产出

当你在本地调得差不多之后，就可以产出压缩、样式inline的html文件啦

```
npm run build
```

## 二、看个demo
下面看个demo，你就知道inky有多棒，不需要再手写table和inline css啦！

* container是大容器
* row代表一行，满宽栅格是12
* small代表小屏，large代表大屏，可以分别设置在不同屏幕下的栅格比例，达到响应式设计

```
---
subject: My Email Subject
---
<container class="marine-container">
    <row class="info-area"> 
        <columns small="12" large="9">
            <div class="info">
                <h3>View...</h3>
                <p>bala bala...</p>
            </div>
        </columns>
        <columns small="12" large="3">
            <a href="xxx" class="btn-guide">Click<br/>For Guide</a>
        </columns>
    </row>
    <row>
        <columns small="12" large="12">
            <div class="person-area">
                <a href="">Search...</a><br/>
                <img src="http://cdn.sinacloud.net/mailchimp/marine.jpg">
                <p>
                    Kate Carter<br/>
                    Y...<br/>
                    mobile: xxxx<br/>
                    ...
                </p>
            </div>
        </columns>
    </row>
    <row>
        <columns small="12" large="12">
            <div class="footer">
                <a href="">xxxx</a>
                <span>|</span>
                <a href="">xxxx</a>
                <!-- 省略一万字 -->
            </div>
        </columns>
    </row>
</container>

```

![pc和wap对比图](http://cdn.sinacloud.net/woodysblog/inky/marine-pc-wap.jpg)

## 三、相关链接：

### 1. demo：  
* 原始文件：[marine-original.html](http://cdn.sinacloud.net/woodysblog/inky/marine-original.html)  
* 编译后文件：[marine-dist.html](http://cdn.sinacloud.net/woodysblog/inky/marine-dist.html)

### 2. 官网

* [Getting Started with Sass](http://foundation.zurb.com/emails/docs/sass-guide.html)  
* [Foundation for Email](http://foundation.zurb.com/emails.html)
