---
title: 怎么把Moves数据（.gpx）导入到Google Map
tags:
  - Google Map
  - gpx
date: 2016-11-19 20:06:18
type: photo
cover: http://cdn.sinacloud.net/woodysblog/gpx/8show.jpg
---

装逼我们是认真的，论怎样高逼格的暴露自己的行踪~

<!-- more -->

所以本文的目标，说到底只是想暴露一下我的第一次9小时的雪山穿越~

!["Tongariro Alpine Crossing in Tongariro Nation Park"](http://cdn.sinacloud.net/woodysblog/gpx/8show.jpg)

不打算介绍高逼格、记录行踪神器[Moves](https://www.moves-app.com/)和[Google Map](https://www.google.co.nz/maps/)了~所以本文只适合已经知道这些的盆友们。

## 从Moves导出定位数据 —— gpx文件

1. 进入Moves相关应用 —— Moves Export的页面
2. 点击”GET STARTED”获取Moves授权的PIN码
3. PIN码页面上有授权提示啦，其实就是在手机上的Moves输入PIN码完成授权过程
4. 页面自动跳转，在Moves Export的菜单栏，选择”Your Storylines“，看到某天某个时间段的行踪了吧~
5. 选好日期，在右侧一堆按钮里选择绿色”GPX”，把GPX文件保存到本地。

![](http://cdn.sinacloud.net/woodysblog/gpx/1getGpx.jpg)

## 在Google Map创建自己的地图

菜单 -> 您的地点 -> 地图 -> 创建地图 -> 导入GPX文件

!["创建地图"](http://cdn.sinacloud.net/woodysblog/gpx/2createMap.jpg)

!["导入gpx数据"](http://cdn.sinacloud.net/woodysblog/gpx/3import.jpg)

## 地图编辑

1.新增标记、绘制线条、添加路线等

![](http://cdn.sinacloud.net/woodysblog/gpx/4create.jpg)

2.图层数据编辑(重命名、编辑原始数据表、删除图层)

![](http://cdn.sinacloud.net/woodysblog/gpx/5layer.jpg)

3.某个点的图标、定义编辑

![](http://cdn.sinacloud.net/woodysblog/gpx/6pointEdit.jpg)

4.在编辑菜单拉到最下面的“基本地图”，是要选择你想怎样显示地图，包括默认视图、卫星、地形等等。本文例子的穿越高山主题，所以地图我选择了”地形”展示。

![](http://cdn.sinacloud.net/woodysblog/gpx/6map.jpg)

## 分享

1.设置地图的访问权限：共享 - “私密” -> “在网络公开”

!["共享"](http://cdn.sinacloud.net/woodysblog/gpx/7share1.jpg)

!["私密"](http://cdn.sinacloud.net/woodysblog/gpx/7share2.jpg)

!["公开"](http://cdn.sinacloud.net/woodysblog/gpx/7share3.jpg)

2.分享

![](http://cdn.sinacloud.net/woodysblog/gpx/7share4.jpg)

![](http://cdn.sinacloud.net/woodysblog/gpx/7share5.jpg)

i. 图片（自行截图或打印）

![](http://cdn.sinacloud.net/woodysblog/gpx/8show.jpg)

ii. 分享链接

```
https://drive.google.com/open?id=1O9TyJoQQ3lCV3lh9pAJkMoHYyiU&usp=sharing
```

iii.嵌入到网站(具体以官方代码为准哈，此处为适应博客主题，iframe样式有调整过)

```
<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1O9TyJoQQ3lCV3lh9pAJkMoHYyiU" width="640" height="480"></iframe>
```

下面是Google Map的iframe~可能没有翻墙会看不到 T_T

<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1O9TyJoQQ3lCV3lh9pAJkMoHYyiU" width="100%" height="480"></iframe>
