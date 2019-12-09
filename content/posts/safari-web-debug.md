---
title: Safari调试无线页面
categories: [tech]
tags: []
date: 2016-02-25 13:36:54
---

进行无线开发时，很多时候会发现，有些bug是在电脑浏览器如chrome模拟时无法复现的，得在真机上调试。无奈手机浏览器没有PC的功能那么完善，不设断点很难调试，于是以前我会使用比较傻的方式是，用原生的alert输出我想得到的信息（人肉断点）。

后来还是QA同学告诉我，可以用Safari连接mobile和PC，在PC Safari中打开调试界面，console设断点或者执行各种命令进行调试，在mobile Safari中浏览效果，非常方便，在这记录一下 :)

<!--more-->

准备：

1. 一台Macbook
2. 一台iPhone

没有mac和iPhone怎么破？没事，看看姐妹篇[《UC浏览器调试无线页面》](/archives/uc-web-debug/)

* * *

## Mac OS Safari设置

Safari - 偏好设置 - 高级 - 在菜单栏中显示“开发”菜单

![](http://cdn.sinacloud.net/woodysblog/safari-web-debug/1.png "OS Safari 设置")

## iPhone iOS Safari 设置：

设置 - Safari - 高级 - web检查器 - 打开

[![](http://cdn.sinacloud.net/woodysblog/safari-web-debug/2.png "iOS Safari 设置")](http://cdn.sinacloud.net/woodysblog/safari-web-debug/2.png)

* * *

okay，所有设置都好啦，接下来可以开始调试啦~~~

### Step 1:

把手机连接到电脑上~

### Step 2:

打开 Mac Safari

### Step 3:

Mac Safari - 菜单“开发” - xxx's iPhone （找到你连接的iPhone的名字） - 选择你要调试的页面

![](http://cdn.sinacloud.net/woodysblog/safari-web-debug/3.png "safari 菜单选择iPhone")
  
选中调试页面后，Safari会自动打开一个调试窗口，在里面就可以开始查看各种元素和断点的设置等等，跟PC调试页面一样啦，很方便~
  
![](http://cdn.sinacloud.net/woodysblog/safari-web-debug/4.png "Safari web检查器")
  
譬如在这，我在console命令行执行一个alert，手机屏幕上就会响应这个命令。
  
![](http://cdn.sinacloud.net/woodysblog/safari-web-debug/5.jpg "mobile Safari alert")
