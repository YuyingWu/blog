---
title: Mac使用记录
tags:
  - life
  - mac
  - study
id: 58
categories:
  - study
date: 2014-10-26 23:24:50
updateDate: 2017-04-21 17:02:00
type: title
---

慢慢记录Mac OS那些好用的东东~

## 程序员的那些软件/使用技巧

### iTerm —— oh-my-zsh

> Oh My Zsh will not make you a 10x developer...but you might feel like one.

又一个程序员的装B神器~ 目前对我最有用的是可以直接看到git branch的信息，更重要的是很好看，哈哈 ：）

![](http://sinacloud.net/woodysblog/articles/oh-my-zsh.png)

```sh
git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
chsh -s /bin/zsh

// 重启iTerm
```

更多详见[github](https://github.com/robbyrussell/oh-my-zsh)。

### Sip
超好用的取色小软件，在切图时尤其好用。附上[官网地址](http://sipapp.io)。

### MWeb Lite
也就是本文编辑的markdown IDE，UI挺漂亮的，有免费版和[付费版](http://zh.mweb.im/index.html)，嘿嘿，我在用免费版，使用外部模式，md文档同步百度云，也可以达到同步文档效果啦~


## 实用小软件

### Caffeine
这杯小咖啡可以让你的Mac不会自动锁屏，有时候在写东西，走神一段时间，回神一看，屏幕锁了，多不开心呀，可以要把屏幕hold住~ 附上[官网](http://lightheadsw.com/caffeine/)。

## OS使用技巧：

写于2014年。

入了mac pro，摸索了接近2个月，平时工作、生活上的使用基本ok；

对于习惯使用windows的同学们，学习OS还是有点成本的，导致有的朋友把mac刷成windows了；

在猩爷的带领下，学习[唠科](http://www.weibo.com/laotech?from=feed&amp;loc=nickname)大神的mac入门视频，有条理，入门很快，推荐一下[《深入浅出OS X》](http://v.youku.com/v_show/id_XNDk1NTA0OTU2.html?from=y1.2-1-105.3.10-2.1-1-1-9)

期间也看过两本关于OS的书：

1.  [《MacTalk 人生元编程》](http://book.douban.com/subject/25826578/)
不是一本纯粹讲os技巧的书，更像文集，推荐的app和使用技巧挺有用的；
2.  [《Mac功夫》](http://book.douban.com/subject/20256399/)
300+条使用技巧，个人觉得太细了，很多功能其实用不上，在读书过程中整理出来的技巧，在唠科的视频教程中也有覆盖到~

* 右键
  * 选中目标，两根手指同时点到触摸板，唤出菜单栏
* 移动
  * 选中目标，三根手指点到触摸板，移动
* 文件重命名
  * 选中文件，按回车（return键），就可以rename
* 显示桌面
  * cmd + F3
* 锁屏
  * 系统偏好设置 - 安全性 - 通用，进入睡眠或者屏保，要求密码
  * 键盘控制：control + shift + 开关键
  * 触摸角
    * 屏保设置：偏好设置 - mission control - 触发角 - 左下角（自定义） - 启动屏幕保护
    * 触发：触摸板滑到自定义的触摸角锁屏
* 剪切文件
  * 复制 cmd + c
  * 粘贴 cmd + v
  * 剪切 cmd + option + v
* 切换  
  * 应用程序切换 cmd + tab
  * 标签切换 control + shift + tab
* 查看多个文件的信息（容量等）
  * 选中多个文件
  * option + cmd + i
* 查看磁盘容量
  * finder - 显示 - 显示状态栏
* 缩放dock
  * 上下拉动dock上的"斑马线"
* 强行退出程序
  * 命令：cmd + shift + esc
  * 活动监视器：应用程序 - 实用工具 - 活动监视器，把没有响应的程序关闭
* 保持mac的活动状态
  * pmset noidle
* 截屏
  * 截图复制到粘贴板 cmd + shift + control + 4
  * 截图并保存到桌面 cmd + shift + 4
  * 截屏，到粘贴板或者保存到桌面，以上命令改为3
* 滚动到顶/底部
  * 按住option，点击滚动条的顶/底部