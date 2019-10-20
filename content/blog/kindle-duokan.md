---
title: Kindle从5.6.1到5.4.4的降级+ 刷多看（Paperwhite 1代）
date: 2017-01-15 15:00:20
categories: [tech]
tags: []
---
Kindle自动升级到5.6.1.1后，多看阅读就没办法装了，貌似是2年前就说在研发，但一直没有下文……最近多看出了本《S.》的电子本，特别想看，于是上网搜了下，咦，终于降级成功，在这简单分享一下吧。

<!-- more -->

## 准备材料：

* Kindle 一台
* Kindle 5.4.4 [降级包](https://pan.baidu.com/s/1c2by8cK)
* 多看阅读 for kindle [安装包](http://www.miui.com/thread-2558456-1-1.html)（下载对应版本）

## 降级
1. Kindle连接电脑；
2. 降级包（不要更改文件名）放到Kindle的根目录，即与document同级；
3. **千万不要弹出Kindle（不要拔usb线）**，长按电源键，按到Kindle在电脑显示弹出状态为止。

降级就那么轻松愉快地结束了！

## 给Kindle刷多看阅读
1. Kindle连接电脑；
2. 安装包的文件（DK_System、update_kindle_巴拉巴拉）放在Kindle的根目录；
3. 拷贝完成后，弹出Kindle（拔线）
4. Kindle回到主目录，菜单/menu -> 设置/setting -> 更新你的Kindle/update your Kindle

于是你的Kindle就开始自己玩，闪呀闪，重启呀重启，然后多看就这样在重启中装好了 ：）

## 防止Kindle自动更新
如果Kindle不小心连上了WiFi，又不小心自动升级到最新版的系统，那降级和多看都白刷了~所以我们想要把自动升级这个进程堵住。

新建一个名叫**update.bin.tmp.partial**的文件，放在Kindle的根目录，这是半下载状态的升级包名字，打断系统自动下载新的升级包~



