---
title: 怎么给微信分享页面添加配图呢？
categories: [tech]
tags: []
date: 2016-04-29 15:44:19
---
怎么给我们漂亮的移动页面添加微信分享的配图呢？  
请看大屏幕：


```
<body>
    <div id="wx_pic" style="display:none;">
        <img src="http://jingyan.baidu.com/event/img/bdjy.png" />
    </div>
    ...
</body>
```

注意：

* 用块元素标签（如p、div）包裹img标签
* 图片大小限制，一般使用300*300(px)，太小了貌似也出不来

<!-- more -->
那么怎么检查页面在微信上的分享效果呢？

1. 发布页面，在微信APP中访问（缺点没法实时调试）
2. 微信开发神器 **微信web开发者工具**，熟悉的Chrome Devtools，棒棒哒~终于不用一直用微信扫扫扫啦！ 

![微信添加图片](https://cdn.sinacloud.net/woodysblog/wx-developer/wx-share.png)

* [微信web开发者工具文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455784140&token=&lang=zh_CN)
* 下载地址：
    * [Mac版本](https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/download?from=mpwiki&os=darwin)    
    * [Windows 64位版本](https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/download?from=mpwiki&os=x64)
    * [Windows 32位版本](https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/download?from=mpwiki&os=x86)
